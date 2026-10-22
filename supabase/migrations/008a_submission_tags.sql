alter table public.business_submissions add column if not exists tags text[] not null default '{}';
alter table public.business_submissions add column if not exists price_level text;
