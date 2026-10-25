-- Online production feature expansion
alter table public.businesses add column if not exists facebook_url text;
alter table public.businesses add column if not exists tiktok_url text;
alter table public.businesses add column if not exists booking_url text;
alter table public.businesses add column if not exists google_rating numeric;
alter table public.businesses add column if not exists google_review_count integer;
alter table public.businesses add column if not exists gallery_urls text[] not null default '{}';
alter table public.businesses add column if not exists price_level text;
alter table public.businesses add column if not exists highlights jsonb not null default '[]'::jsonb;
alter table public.businesses add column if not exists services jsonb not null default '[]'::jsonb;
alter table public.businesses add column if not exists source_label text;

alter table public.business_submissions add column if not exists description_en text;
alter table public.business_submissions add column if not exists phone text;
alter table public.business_submissions add column if not exists website_url text;
alter table public.business_submissions add column if not exists facebook_url text;
alter table public.business_submissions add column if not exists instagram_url text;
alter table public.business_submissions add column if not exists tiktok_url text;
alter table public.business_submissions add column if not exists photo_urls text[] not null default '{}';

alter table public.stories add column if not exists content_type text not null default 'story';
alter table public.stories add column if not exists gallery_urls text[] not null default '{}';
alter table public.stories add column if not exists source_name text;
alter table public.stories add column if not exists source_url text;
alter table public.stories add column if not exists event_date timestamptz;
alter table public.stories add column if not exists event_location text;
alter table public.stories add column if not exists impact_topic text;
alter table public.stories add column if not exists is_featured boolean not null default false;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  consent boolean not null default true,
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "newsletter public insert" on public.newsletter_subscribers for insert to anon,authenticated with check (consent=true);
create policy "newsletter staff read" on public.newsletter_subscribers for select to authenticated using (public.is_staff());
create policy "newsletter staff update" on public.newsletter_subscribers for update to authenticated using (public.is_staff()) with check (public.is_staff());

create table if not exists public.sponsor_banners (
  slot_key text primary key,
  size text not null check (size in ('main','small')),
  title text,
  subtitle text,
  image_url text not null,
  target_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
alter table public.sponsor_banners enable row level security;
create policy "sponsor banners public read" on public.sponsor_banners for select to anon,authenticated using (is_active or public.is_staff());
create policy "sponsor banners admin write" on public.sponsor_banners for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.backup_snapshots (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  snapshot jsonb not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.backup_snapshots enable row level security;
create policy "backup snapshots admin only" on public.backup_snapshots for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] insert into public.sponsor_banners(slot_key,size,title,subtitle,image_url,target_url,is_active,sort_order) values
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-1','main','Neighborhood Partner','Main sponsor banner 1','/images/food-dining.jpg','#',true,1),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-2','main','Wellness Partner','Main sponsor banner 2','/images/wellness-gym.jpg','#',true,2),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-3','main','Local Cafe Partner','Main sponsor banner 3','/images/food-brunch.jpg','#',true,3),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-1','small','Community Partner',null,'/images/news-community.jpg','#',true,1),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-2','small','Local Partner',null,'/images/cat-food.jpg','#',true,2),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-3','small','Wellness Partner',null,'/images/cat-wellness.jpg','#',true,3),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-4','small','Neighborhood Partner',null,'/images/news-living.jpg','#',true,4)
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] on conflict(slot_key) do nothing;
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] 
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] insert into public.stories(title,slug,category,excerpt,body_en,cover_image_url,status,content_type,event_date,event_location,is_featured,published_at) values
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('Phu Quoc Community Weekend','thao-dien-community-weekend','Events','A sample neighborhood event announcement for the launch edition.','This sample event demonstrates the event banner and event-news flow. Replace it with a verified local event before public launch.','/images/news-community.jpg','published','event','2026-10-03T09:00:00+07','Phu Quoc, Thu Duc City',true,now())
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] on conflict(slug) do nothing;
