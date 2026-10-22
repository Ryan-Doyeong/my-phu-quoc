alter table public.businesses
  add column if not exists listing_checked_at timestamptz,
  add column if not exists listing_checked_by uuid,
  add column if not exists rating_source text;

comment on column public.businesses.listing_checked_at is 'When an editor/admin last manually checked the public listing information.';
comment on column public.businesses.listing_checked_by is 'Auth user who last manually checked the public listing information.';
comment on column public.businesses.rating_source is 'Optional human-readable source label for a manually entered rating/review count.';
