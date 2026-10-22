alter table public.business_submissions
  add column if not exists photo_check_status text not null default 'pending',
  add column if not exists editorial_check_status text not null default 'pending',
  add column if not exists google_place_id text,
  add column if not exists google_rating numeric,
  add column if not exists google_review_count integer,
  add column if not exists legal_name text,
  add column if not exists tax_registered_address text,
  add column if not exists verification_note text,
  add column if not exists requested_changes text;

create index if not exists business_submissions_status_created_idx
  on public.business_submissions(status, created_at desc);
