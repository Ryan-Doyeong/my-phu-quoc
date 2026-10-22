-- 017: parity fixes found while testing Staging (safe to run on production: all idempotent)
alter table public.businesses add column if not exists is_good_life_member boolean not null default false;

drop policy if exists "businesses staff write" on public.businesses;
create policy "businesses staff write" on public.businesses
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
