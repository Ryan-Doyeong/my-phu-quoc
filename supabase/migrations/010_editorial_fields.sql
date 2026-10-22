-- v7.3 editorial management expansion
alter table public.stories add column if not exists subtitle text;
alter table public.stories add column if not exists author_name text;
alter table public.stories add column if not exists tags text[] not null default '{}';
alter table public.stories add column if not exists key_points text[] not null default '{}';
alter table public.stories add column if not exists callout text;
alter table public.stories add column if not exists hero_caption text;
alter table public.stories add column if not exists source_published_at timestamptz;
alter table public.stories add column if not exists effective_date timestamptz;
alter table public.stories add column if not exists seo_title text;
alter table public.stories add column if not exists seo_description text;
alter table public.stories add column if not exists newsletter_ready boolean not null default false;
alter table public.stories add column if not exists editor_note text;
