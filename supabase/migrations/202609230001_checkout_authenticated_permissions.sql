-- Public checkout must keep working when a visitor already has a Supabase
-- session in this browser (for example, an owner previewing the storefront).
-- The RPCs validate order codes and receipt paths internally, so both client
-- roles intentionally receive the same narrowly scoped checkout access.

revoke all on function public.commerce_order_target(text) from public, anon, authenticated;
grant execute on function public.commerce_order_target(text) to anon, authenticated;

revoke all on function public.commerce_submit_payment(uuid,text,numeric,text,text) from public, anon, authenticated;
grant execute on function public.commerce_submit_payment(uuid,text,numeric,text,text) to anon, authenticated;

revoke all on function public.commerce_public_receipt_path(text) from public, anon, authenticated;
grant execute on function public.commerce_public_receipt_path(text) to anon, authenticated;

drop policy if exists commerce_receipts_anon_insert on storage.objects;
drop policy if exists commerce_receipts_customer_insert on storage.objects;
create policy commerce_receipts_customer_insert on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'order-receipts'
    and public.commerce_public_receipt_path(name)
  );

-- The existing restrictive authenticated policy protects both private
-- buckets. Permit only validated receipt INSERT paths for signed-in visitors;
-- all read/update/delete access still requires the existing member policies.
drop policy if exists commerce_storage_guard on storage.objects;
create policy commerce_storage_guard on storage.objects
  as restrictive for all to authenticated
  using (
    bucket_id not in ('order-receipts','product-images')
    or public.commerce_member()
  )
  with check (
    bucket_id not in ('order-receipts','product-images')
    or public.commerce_member()
    or (
      bucket_id = 'order-receipts'
      and public.commerce_public_receipt_path(name)
    )
  );

notify pgrst, 'reload schema';
