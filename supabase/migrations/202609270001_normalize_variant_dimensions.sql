-- Finish moving legacy variants into the option model. Some old clients saved
-- empty strings rather than NULL, so the earlier backfill did not see them.
begin;

update public.product_variants
set option1_value = nullif(trim(option1_value), ''),
    option2_value = nullif(trim(option2_value), '')
where option1_value is distinct from nullif(trim(option1_value), '')
   or option2_value is distinct from nullif(trim(option2_value), '');

update public.product_variants
set option1_value = trim(name)
where option1_value is null
  and option2_value is null
  and nullif(trim(name), '') is not null;

update public.products p
set option1_label = 'Pilihan'
where nullif(trim(p.option1_label), '') is null
  and exists (
    select 1
    from public.product_variants v
    where v.product_id = p.id
      and v.option1_value is not null
  );

commit;
