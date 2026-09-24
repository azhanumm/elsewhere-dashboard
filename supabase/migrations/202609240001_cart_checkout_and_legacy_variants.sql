-- Keep a whole cart in one order and make pre-option variants editable again.
begin;

-- A legacy variant name is the safest lossless first option: IDs and all
-- operational fields stay untouched, so existing order references still work.
update public.product_variants
set option1_value = name
where option1_value is null
  and option2_value is null;

update public.products p
set option1_label = 'Pilihan'
where p.option1_label is null
  and exists (
    select 1 from public.product_variants v
    where v.product_id = p.id and v.option1_value is not null
  );

create or replace function public.commerce_place_order_items(
  p_request_id uuid,
  p_items jsonb,
  p_name text,
  p_phone text,
  p_address text,
  p_notes text default ''
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  item record;
  v public.product_variants;
  p public.products;
  t public.trips;
  o public.orders;
  price numeric;
  reserved integer;
  order_total numeric := 0;
  order_trip text;
  item_count integer;
begin
  if p_request_id is null then raise exception 'Permintaan tidak valid'; end if;
  perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 0));
  select * into o from public.orders where request_id = p_request_id;
  if found then
    return jsonb_build_object('order_id', o.id, 'order_code', o.order_code, 'total_idr', o.total_idr);
  end if;

  if jsonb_typeof(p_items) is distinct from 'array' then
    raise exception 'Keranjang tidak valid';
  end if;
  item_count := jsonb_array_length(p_items);
  if item_count not between 1 and 20
    or p_name is null or length(trim(p_name)) not between 2 and 100
    or p_phone is null or p_phone !~ '^[0-9]{9,15}$'
    or p_address is null or length(trim(p_address)) not between 10 and 1000
    or length(coalesce(p_notes, '')) > 1000 then
    raise exception 'Lengkapi nama, nomor WhatsApp, alamat, dan keranjang yang valid';
  end if;

  if (select count(distinct value->>'variant_id') from jsonb_array_elements(p_items)) <> item_count then
    raise exception 'Varian yang sama muncul lebih dari sekali';
  end if;

  p_phone := case when left(p_phone, 1) = '0' then '62' || substr(p_phone, 2) else p_phone end;
  if length(p_phone) > 15 then raise exception 'Nomor WhatsApp tidak valid'; end if;

  perform pg_advisory_xact_lock(hashtextextended('elsewhere-checkout-rate-limit', 0));
  if (select count(*) from public.orders where phone = p_phone and created_at > now() - interval '15 minutes') >= 3
    or (select count(*) from public.orders where phone = p_phone and created_at > now() - interval '24 hours') >= 10 then
    raise exception 'Terlalu banyak pesanan dari nomor ini. Tunggu sebentar atau hubungi WhatsApp Elsewhere';
  end if;
  if (select count(*) from public.orders where created_at > now() - interval '1 minute') >= 60 then
    raise exception 'Pesanan sedang ramai. Coba lagi dalam satu menit';
  end if;

  -- Lock in a stable order so concurrent carts cannot oversell or deadlock.
  perform 1
  from public.product_variants
  where id in (
    select (value->>'variant_id')::uuid from jsonb_array_elements(p_items)
  )
  order by id
  for update;

  for item in
    select (value->>'variant_id')::uuid as variant_id,
           (value->>'quantity')::numeric as quantity,
           (value->>'expected_price')::numeric as expected_price
    from jsonb_array_elements(p_items)
    order by value->>'variant_id'
  loop
    if item.quantity is null or item.quantity <> trunc(item.quantity) or item.quantity not between 1 and 20
      or item.expected_price is null or item.expected_price <= 0 then
      raise exception 'Jumlah atau harga keranjang tidak valid';
    end if;

    select * into v from public.product_variants where id = item.variant_id;
    select * into p from public.products where id = v.product_id for update;
    if v.id is null or v.active is not true or p.published is not true
      or p.status is distinct from 'Ready' then
      raise exception 'Produk atau trip sudah tidak menerima pesanan';
    end if;
    if order_trip is null then order_trip := p.trip_code;
    elsif order_trip is distinct from p.trip_code then
      raise exception 'Semua produk harus berasal dari trip yang sama';
    end if;

    select * into t from public.trips where code = p.trip_code for update;
    if t.code is null or t.status is distinct from 'Open PO' then
      raise exception 'Produk atau trip sudah tidak menerima pesanan';
    end if;
    price := public.commerce_price(v.local_price, v.weight_grams, p.category, p.margin_percent,
      public.commerce_current_rate(t.currency_code), t.fashion_cargo_per_kg, t.nonfashion_cargo_per_kg);
    if price is null or price <= 0 then raise exception 'Harga belum siap. Hubungi tim Elsewhere'; end if;
    if price <> item.expected_price then
      raise exception 'Harga berubah. Tutup form dan perbarui katalog sebelum memesan';
    end if;
    select coalesce(sum(i.quantity), 0) into reserved
    from public.order_items i join public.orders x on x.id = i.order_id
    where i.variant_id = v.id and x.status <> 'cancelled';
    if (v.sale_mode = 'stock' or v.preorder_capacity is not null)
      and reserved + item.quantity > (case when v.sale_mode = 'stock' then v.stock else v.preorder_capacity end) then
      raise exception 'Stok atau kuota tidak mencukupi. Perbarui katalog';
    end if;
    order_total := order_total + price * item.quantity;
  end loop;

  insert into public.orders(request_id, trip_code, customer_name, phone, address, notes, total_idr)
  values(p_request_id, order_trip, trim(p_name), p_phone, trim(p_address), trim(coalesce(p_notes, '')), order_total)
  returning * into o;

  for item in
    select (value->>'variant_id')::uuid as variant_id,
           (value->>'quantity')::integer as quantity
    from jsonb_array_elements(p_items)
    order by value->>'variant_id'
  loop
    select * into v from public.product_variants where id = item.variant_id;
    select * into p from public.products where id = v.product_id;
    select * into t from public.trips where code = p.trip_code;
    price := public.commerce_price(v.local_price, v.weight_grams, p.category, p.margin_percent,
      public.commerce_current_rate(t.currency_code), t.fashion_cargo_per_kg, t.nonfashion_cargo_per_kg);
    insert into public.order_items(order_id, product_id, variant_id, product_name, variant_name, quantity, unit_price_idr, sale_mode, pricing_snapshot)
    values(o.id, p.id, v.id, p.name, v.name, item.quantity, price, v.sale_mode,
      jsonb_build_object('local_price', v.local_price, 'weight_grams', v.weight_grams,
        'currency', t.currency_code, 'exchange_rate_idr', public.commerce_current_rate(t.currency_code),
        'category', p.category, 'margin_percent', coalesce(p.margin_percent, case when p.category ~* 'makanan|food|snack|minuman' then 20 else 25 end),
        'fashion_cargo_per_kg', t.fashion_cargo_per_kg, 'nonfashion_cargo_per_kg', t.nonfashion_cargo_per_kg));
  end loop;

  return jsonb_build_object('order_id', o.id, 'order_code', o.order_code, 'total_idr', o.total_idr);
end $$;

revoke all on function public.commerce_place_order_items(uuid,jsonb,text,text,text,text) from public, anon, authenticated;
grant execute on function public.commerce_place_order_items(uuid,jsonb,text,text,text,text) to anon, authenticated;

notify pgrst, 'reload schema';
commit;
