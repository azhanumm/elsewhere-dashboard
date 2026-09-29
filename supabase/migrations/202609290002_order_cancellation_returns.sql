-- Add an auditable cancellation reason while keeping the existing terminal
-- `cancelled` status, so every existing stock/capacity rule remains compatible.
begin;

alter table public.orders
  add column if not exists cancellation_type text;

update public.orders
set cancellation_type = 'unpaid'
where status = 'cancelled'
  and cancellation_type is null;

alter table public.orders
  drop constraint if exists orders_cancellation_type_check;

alter table public.orders
  add constraint orders_cancellation_type_check
  check (cancellation_type is null or cancellation_type in ('unpaid','return'));

create or replace function public.commerce_cancel_order(
  p_order_id uuid,
  p_mode text
) returns void language plpgsql security definer set search_path = '' as $$
declare
  o public.orders;
  has_verified_payment boolean;
begin
  if not public.commerce_editor() then
    raise exception 'Akses ditolak: hanya owner/editor';
  end if;

  select * into o from public.orders where id = p_order_id for update;
  if o.id is null then raise exception 'Pesanan tidak ditemukan'; end if;
  if o.status in ('cancelled','completed') then raise exception 'Pesanan sudah ditutup'; end if;
  if p_mode not in ('unpaid','return') then raise exception 'Jenis pembatalan tidak valid'; end if;

  select exists(
    select 1 from public.order_payments
    where order_id = o.id and verified_at is not null
  ) into has_verified_payment;

  if p_mode = 'unpaid' then
    if o.status <> 'new' or has_verified_payment then
      raise exception 'Cancelled hanya untuk pesanan Placed tanpa pembayaran terverifikasi';
    end if;
  elsif not has_verified_payment and o.status = 'new' then
    raise exception 'Gunakan Cancelled untuk pesanan Placed tanpa pembayaran terverifikasi';
  end if;

  update public.orders
  set status = 'cancelled',
      cancellation_type = p_mode,
      updated_at = now()
  where id = o.id;
end $$;

revoke all on function public.commerce_cancel_order(uuid,text) from public, anon, authenticated;
grant execute on function public.commerce_cancel_order(uuid,text) to authenticated;

notify pgrst, 'reload schema';
commit;
