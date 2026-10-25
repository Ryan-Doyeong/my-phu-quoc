-- ===== 001_initial.sql =====
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user','business','editor','admin','owner')),
  preferred_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,email,full_name)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name'))
  on conflict(id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  public_name text not null,
  slug text unique not null,
  category text not null,
  subcategory text,
  description_en text,
  description_vi text,
  description_ko text,
  address text,
  google_maps_name text,
  google_maps_url text,
  tax_code text,
  phone text,
  website_url text,
  instagram_url text,
  opening_hours jsonb default '{}'::jsonb,
  amenities jsonb default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','submitted','review','published','rejected','needs_update','archived')),
  verification_status text not null default 'unverified' check (verification_status in ('unverified','ai_checked','manual_review','verified','rejected')),
  verification_note text,
  last_verified_at timestamptz,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_submissions (
  id uuid primary key default gen_random_uuid(),
  contact_name text,
  contact_email text not null,
  public_name text not null,
  google_maps_name text not null,
  google_maps_url text not null,
  tax_code text not null,
  category text not null,
  subcategory text,
  address text,
  maps_check_status text not null default 'pending',
  tax_check_status text not null default 'pending',
  relationship_check_status text not null default 'pending',
  status text not null default 'submitted' check (status in ('submitted','approved','rejected','manual_review')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.business_claims (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending', note text,
  created_at timestamptz not null default now(), reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id)
);

create table if not exists public.verification_checks (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  check_type text not null,status text not null,source_url text,source_payload jsonb,confidence numeric,
  checked_at timestamptz not null default now(),reviewed_by uuid references public.profiles(id),reviewed_at timestamptz,review_note text
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),business_id uuid references public.businesses(id) on delete set null,
  title text not null,body text,placement text not null,starts_at timestamptz,ends_at timestamptz,
  status text not null default 'draft',sponsored_label_required boolean not null default true,revenue_amount numeric,impact_note text,
  created_by uuid references public.profiles(id),created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);

create table if not exists public.impact_programs (
  id uuid primary key default gen_random_uuid(),title text not null,slug text unique not null,category text not null,summary text,description text,image_url text,
  status text not null default 'active',created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),title text not null,slug text unique not null,category text,excerpt text,body_en text,body_vi text,body_ko text,cover_image_url text,
  status text not null default 'draft',author_id uuid references public.profiles(id),published_at timestamptz,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);

create table if not exists public.community_suggestions (
  id uuid primary key default gen_random_uuid(),name text,email text,suggestion_type text,message text not null,status text not null default 'new',created_at timestamptz not null default now(),reviewed_by uuid references public.profiles(id),reviewed_at timestamptz,review_note text
);

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),name text,email text,area text,message text,status text not null default 'new',created_at timestamptz not null default now(),reviewed_by uuid references public.profiles(id),reviewed_at timestamptz,review_note text
);

create table if not exists public.saved_businesses (
  user_id uuid not null references public.profiles(id) on delete cascade,business_id uuid not null references public.businesses(id) on delete cascade,created_at timestamptz not null default now(),primary key(user_id,business_id)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,actor_id uuid references public.profiles(id),action text not null,entity_type text not null,entity_id text,metadata jsonb,created_at timestamptz not null default now()
);

create or replace function public.is_staff() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('editor','admin','owner')); $$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('admin','owner')); $$;

alter table public.profiles enable row level security; alter table public.site_settings enable row level security; alter table public.businesses enable row level security; alter table public.business_submissions enable row level security; alter table public.business_claims enable row level security; alter table public.verification_checks enable row level security; alter table public.promotions enable row level security; alter table public.impact_programs enable row level security; alter table public.stories enable row level security; alter table public.community_suggestions enable row level security; alter table public.volunteer_applications enable row level security; alter table public.saved_businesses enable row level security; alter table public.audit_logs enable row level security;

create policy "profiles read own" on public.profiles for select to authenticated using (auth.uid()=id or public.is_staff());
create policy "profiles update own" on public.profiles for update to authenticated using (auth.uid()=id) with check (auth.uid()=id);
create policy "site settings public read" on public.site_settings for select to anon,authenticated using (true);
create policy "site settings admin write" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "published businesses public read" on public.businesses for select to anon,authenticated using (status='published' or public.is_staff() or created_by=auth.uid());
create policy "business submissions public insert" on public.business_submissions for insert to anon,authenticated with check (true);
create policy "business submissions staff read" on public.business_submissions for select to authenticated using (public.is_staff());
create policy "business submissions staff update" on public.business_submissions for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "live promotions public read" on public.promotions for select to anon,authenticated using (status='live' or public.is_staff());
create policy "active impact public read" on public.impact_programs for select to anon,authenticated using (status in ('active','completed') or public.is_staff());
create policy "published stories public read" on public.stories for select to anon,authenticated using (status='published' or public.is_staff());
create policy "suggestions public insert" on public.community_suggestions for insert to anon,authenticated with check (true);
create policy "suggestions staff read" on public.community_suggestions for select to authenticated using (public.is_staff());
create policy "suggestions staff update" on public.community_suggestions for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "volunteers public insert" on public.volunteer_applications for insert to anon,authenticated with check (true);
create policy "volunteers staff read" on public.volunteer_applications for select to authenticated using (public.is_staff());
create policy "volunteers staff update" on public.volunteer_applications for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "saved own all" on public.saved_businesses for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "audit staff read" on public.audit_logs for select to authenticated using (public.is_staff());
create policy "audit staff insert" on public.audit_logs for insert to authenticated with check (public.is_staff());
create policy "verification staff only" on public.verification_checks for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "promotions staff write" on public.promotions for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "impact staff write" on public.impact_programs for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "stories staff write" on public.stories for all to authenticated using (public.is_staff()) with check (public.is_staff());

insert into public.site_settings(key,value) values ('appearance',jsonb_build_object(
  'hero_image_url','/images/hero-phuquoc.jpg','hero_topline','PEOPLE · PLACES · A BRIGHTER PHU QUOC','hero_title',E'Good life\nin Phu Quoc','hero_subtitle','Live well. Grow together. Feel at home.','hero_description','A local guide for better everyday living in Phu Quoc.','hero_primary_cta','Explore','hero_secondary_cta','Join the community','hero_note',E'A kinder\nbrighter\nPhu Quoc ♥','hero_blur',2,'hero_overlay',0.18,'accent_color','#556f58','bg_color','#f5f2ea','paper_color','#fffdf8','radius',28
)) on conflict(key) do nothing;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('site-media','site-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif']) on conflict(id) do nothing;
create policy "site media public read" on storage.objects for select to anon,authenticated using (bucket_id='site-media');
create policy "site media admin insert" on storage.objects for insert to authenticated with check (bucket_id='site-media' and public.is_admin());
create policy "site media admin update" on storage.objects for update to authenticated using (bucket_id='site-media' and public.is_admin()) with check (bucket_id='site-media' and public.is_admin());
create policy "site media admin delete" on storage.objects for delete to authenticated using (bucket_id='site-media' and public.is_admin());

-- ===== 002_online_features.sql =====
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

insert into public.sponsor_banners(slot_key,size,title,subtitle,image_url,target_url,is_active,sort_order) values
('main-1','main','Neighborhood Partner','Main sponsor banner 1','/images/food-dining.jpg','#',true,1),
('main-2','main','Wellness Partner','Main sponsor banner 2','/images/wellness-gym.jpg','#',true,2),
('main-3','main','Local Cafe Partner','Main sponsor banner 3','/images/food-brunch.jpg','#',true,3),
('small-1','small','Community Partner',null,'/images/news-community.jpg','#',true,1),
('small-2','small','Local Partner',null,'/images/cat-food.jpg','#',true,2),
('small-3','small','Wellness Partner',null,'/images/cat-wellness.jpg','#',true,3),
('small-4','small','Neighborhood Partner',null,'/images/news-living.jpg','#',true,4)
on conflict(slot_key) do nothing;

insert into public.stories(title,slug,category,excerpt,body_en,cover_image_url,status,content_type,event_date,event_location,is_featured,published_at) values
('Phu Quoc Community Weekend','thao-dien-community-weekend','Events','A sample neighborhood event announcement for the launch edition.','This sample event demonstrates the event banner and event-news flow. Replace it with a verified local event before public launch.','/images/news-community.jpg','published','event','2026-10-03T09:00:00+07','Phu Quoc, Thu Duc City',true,now())
on conflict(slug) do nothing;

-- ===== 003_seed_80_businesses.sql =====
-- Approx. 80 launch sample listings. All were selected from current public Phu Quoc Google Maps-derived lists using a 4.0+ source filter. Exact live fields should be refreshed with Google Places API before final verification.
insert into public.businesses(public_name,slug,category,subcategory,description_en,address,google_maps_name,google_maps_url,google_rating,google_review_count,gallery_urls,status,verification_status,verification_note,last_verified_at,published_at,source_label) values
('XLIII Specialty Coffee','xliii-specialty-coffee','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','19 Đ. Số 2, Phu Quoc','XLIII Specialty Coffee','https://www.google.com/maps/search/?api=1&query=XLIII%20Specialty%20Coffee%2019%20Đ.%20Số%202,%20Thao%20Dien',5.0,3400,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Take Five Cafe','take-five-cafe','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','51/6 Lê Văn Miến, Phu Quoc','Take Five Cafe','https://www.google.com/maps/search/?api=1&query=Take%20Five%20Cafe%2051/6%20Lê%20Văn%20Miến,%20Thao%20Dien',5.0,142,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('The Snap Cafe','the-snap-cafe','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','32 Trần Ngọc Diện, Phu Quoc','The Snap Cafe','https://www.google.com/maps/search/?api=1&query=The%20Snap%20Cafe%2032%20Trần%20Ngọc%20Diện,%20Thao%20Dien',null,1600,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Kashew Cheese Deli','kashew-cheese-deli','food','Healthy Food','A Phu Quoc food & dining listing imported for the launch directory. Healthy Food venue details are shown as a sample and should be refreshed from Google Places before final verification.','14 Trần Ngọc Diện, Phu Quoc','Kashew Cheese Deli','https://www.google.com/maps/search/?api=1&query=Kashew%20Cheese%20Deli%2014%20Trần%20Ngọc%20Diện,%20Thao%20Dien',null,863,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Cheesecake Ngon','cheesecake-ngon','food','Cafe & Dessert','A Phu Quoc food & dining listing imported for the launch directory. Cafe & Dessert venue details are shown as a sample and should be refreshed from Google Places before final verification.','23B Lê Văn Miến, Phu Quoc','Cheesecake Ngon','https://www.google.com/maps/search/?api=1&query=Cheesecake%20Ngon%2023B%20Lê%20Văn%20Miến,%20Thao%20Dien',null,536,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Bagel Brothers','bagel-brothers','food','Brunch','A Phu Quoc food & dining listing imported for the launch directory. Brunch venue details are shown as a sample and should be refreshed from Google Places before final verification.','23B Lê Văn Miến, Phu Quoc','Bagel Brothers','https://www.google.com/maps/search/?api=1&query=Bagel%20Brothers%2023B%20Lê%20Văn%20Miến,%20Thao%20Dien',null,270,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Ristreet','ristreet','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','36 Thái Ly, Phu Quoc','Ristreet','https://www.google.com/maps/search/?api=1&query=Ristreet%2036%20Thái%20Ly,%20Thao%20Dien',null,302,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Dolphy Cafe','dolphy-cafe','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','23 Nguyễn Văn Hưởng, Phu Quoc','Dolphy Cafe','https://www.google.com/maps/search/?api=1&query=Dolphy%20Cafe%2023%20Nguyễn%20Văn%20Hưởng,%20Thao%20Dien',null,500,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('MAMA BARBAR','mama-barbar','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','39B Nguyễn Duy Hiệu, Phu Quoc','MAMA BARBAR','https://www.google.com/maps/search/?api=1&query=MAMA%20BARBAR%2039B%20Nguyễn%20Duy%20Hiệu,%20Thao%20Dien',null,576,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Timber Bistro','timber-bistro','food','Cafe & Bistro','A Phu Quoc food & dining listing imported for the launch directory. Cafe & Bistro venue details are shown as a sample and should be refreshed from Google Places before final verification.','104 Trần Não, Thu Duc City','Timber Bistro','https://www.google.com/maps/search/?api=1&query=Timber%20Bistro%20104%20Trần%20Não,%20Thu%20Duc%20City',null,373,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('LOST & SOUGHT - BAKERY CAFE','lost-sought-bakery-cafe','food','Bakery & Cafe','A Phu Quoc food & dining listing imported for the launch directory. Bakery & Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','6A Đường Số 05, Phu Quoc','LOST & SOUGHT - BAKERY CAFE','https://www.google.com/maps/search/?api=1&query=LOST%20%26%20SOUGHT%20-%20BAKERY%20CAFE%206A%20Đường%20Số%2005,%20Thao%20Dien',null,313,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('No Honey, No Monkey','no-honey-no-monkey','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','30 Đ. Số 10, Phu Quoc','No Honey, No Monkey','https://www.google.com/maps/search/?api=1&query=No%20Honey,%20No%20Monkey%2030%20Đ.%20Số%2010,%20Thao%20Dien',null,235,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Haru Object','haru-object','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','31 Đường số 54, Phu Quoc','Haru Object','https://www.google.com/maps/search/?api=1&query=Haru%20Object%2031%20Đường%20số%2054,%20Thao%20Dien',null,177,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Dulce de Saigon','dulce-de-saigon','food','Bakery & Cafe','A Phu Quoc food & dining listing imported for the launch directory. Bakery & Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','16 Đường số 54, Phu Quoc','Dulce de Saigon','https://www.google.com/maps/search/?api=1&query=Dulce%20de%20Saigon%2016%20Đường%20số%2054,%20Thao%20Dien',null,119,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Guum cafe','guum-cafe','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','51/6 Lê Văn Miến, Phu Quoc','Guum cafe','https://www.google.com/maps/search/?api=1&query=Guum%20cafe%2051/6%20Lê%20Văn%20Miến,%20Thao%20Dien',null,90,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Shiba Cafe & Matcha - Thảo Điền','shiba-cafe-matcha-thao-ien','food','Cafe','A Phu Quoc food & dining listing imported for the launch directory. Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','14 Đ. Số 38, Phu Quoc','Shiba Cafe & Matcha - Thảo Điền','https://www.google.com/maps/search/?api=1&query=Shiba%20Cafe%20%26%20Matcha%20-%20Thảo%20Điền%2014%20Đ.%20Số%2038,%20Thao%20Dien',null,88,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('MAME Shiba Cafe','mame-shiba-cafe','food','Pet Cafe','A Phu Quoc food & dining listing imported for the launch directory. Pet Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','29 Tống Hữu Định, Thu Duc City','MAME Shiba Cafe','https://www.google.com/maps/search/?api=1&query=MAME%20Shiba%20Cafe%2029%20Tống%20Hữu%20Định,%20Thu%20Duc%20City',4.9,1900,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Kin Neko Dog & Cat Cafe','kin-neko-dog-cat-cafe','food','Pet Cafe','A Phu Quoc food & dining listing imported for the launch directory. Pet Cafe venue details are shown as a sample and should be refreshed from Google Places before final verification.','29 Tống Hữu Định, Thu Duc City','Kin Neko Dog & Cat Cafe','https://www.google.com/maps/search/?api=1&query=Kin%20Neko%20Dog%20%26%20Cat%20Cafe%2029%20Tống%20Hữu%20Định,%20Thu%20Duc%20City',4.9,1900,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('L'' Apella Cafe & Lounge','l-apella-cafe-lounge','food','Cafe & Lounge','A Phu Quoc food & dining listing imported for the launch directory. Cafe & Lounge venue details are shown as a sample and should be refreshed from Google Places before final verification.','01 Đường Số 16, Phu Quoc','L'' Apella Cafe & Lounge','https://www.google.com/maps/search/?api=1&query=L''%20Apella%20Cafe%20%26%20Lounge%2001%20Đường%20Số%2016,%20Thao%20Dien',4.8,1500,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('XVI Phu Quoc','xvi-thao-dien','food','Brunch','A Phu Quoc food & dining listing imported for the launch directory. Brunch venue details are shown as a sample and should be refreshed from Google Places before final verification.','Nguyễn Văn Hưởng, Phu Quoc','XVI Phu Quoc','https://www.google.com/maps/search/?api=1&query=XVI%20Thao%20Dien%20Nguyễn%20Văn%20Hưởng,%20Thao%20Dien',4.9,341,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Dì Mai Thảo Điền','di-mai-thao-ien','food','Vietnamese','A Phu Quoc food & dining listing imported for the launch directory. Vietnamese venue details are shown as a sample and should be refreshed from Google Places before final verification.','50 Xuân Thủy, Phu Quoc','Dì Mai Thảo Điền','https://www.google.com/maps/search/?api=1&query=Dì%20Mai%20Thảo%20Điền%2050%20Xuân%20Thủy,%20Thao%20Dien',null,79,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Trạm Hầm Thảo Điền','tram-ham-thao-ien','food','Vietnamese','A Phu Quoc food & dining listing imported for the launch directory. Vietnamese venue details are shown as a sample and should be refreshed from Google Places before final verification.','1 Đường số 65, Phu Quoc','Trạm Hầm Thảo Điền','https://www.google.com/maps/search/?api=1&query=Trạm%20Hầm%20Thảo%20Điền%201%20Đường%20số%2065,%20Thao%20Dien',null,1900,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Hidden Charm Restaurant','hidden-charm-restaurant','food','Vietnamese','A Phu Quoc food & dining listing imported for the launch directory. Vietnamese venue details are shown as a sample and should be refreshed from Google Places before final verification.','101 Xuân Thủy, Phu Quoc','Hidden Charm Restaurant','https://www.google.com/maps/search/?api=1&query=Hidden%20Charm%20Restaurant%20101%20Xuân%20Thủy,%20Thao%20Dien',null,1500,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Nhà Hàng Chay KIM SA - Thảo Điền','nha-hang-chay-kim-sa-thao-ien','food','Vegetarian','A Phu Quoc food & dining listing imported for the launch directory. Vegetarian venue details are shown as a sample and should be refreshed from Google Places before final verification.','15 Nguyễn Đăng Giai, Phu Quoc','Nhà Hàng Chay KIM SA - Thảo Điền','https://www.google.com/maps/search/?api=1&query=Nhà%20Hàng%20Chay%20KIM%20SA%20-%20Thảo%20Điền%2015%20Nguyễn%20Đăng%20Giai,%20Thao%20Dien',null,1100,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('NÚC Kitchen & Bar','nuc-kitchen-bar','food','Restaurant','A Phu Quoc food & dining listing imported for the launch directory. Restaurant venue details are shown as a sample and should be refreshed from Google Places before final verification.','08 Nguyễn Đăng Giai, Phu Quoc','NÚC Kitchen & Bar','https://www.google.com/maps/search/?api=1&query=NÚC%20Kitchen%20%26%20Bar%2008%20Nguyễn%20Đăng%20Giai,%20Thao%20Dien',null,659,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('ZAO - Vietnamese Rooted Eatery - Saigon','zao-vietnamese-rooted-eatery-saigon','food','Vietnamese','A Phu Quoc food & dining listing imported for the launch directory. Vietnamese venue details are shown as a sample and should be refreshed from Google Places before final verification.','81 Quốc Hương, Phu Quoc','ZAO - Vietnamese Rooted Eatery - Saigon','https://www.google.com/maps/search/?api=1&query=ZAO%20-%20Vietnamese%20Rooted%20Eatery%20-%20Saigon%2081%20Quốc%20Hương,%20Thao%20Dien',4.9,362,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Dieu Thien Vegetarian Restaurant','dieu-thien-vegetarian-restaurant','food','Vegetarian','A Phu Quoc food & dining listing imported for the launch directory. Vegetarian venue details are shown as a sample and should be refreshed from Google Places before final verification.','130 Trần Lựu, Thu Duc City','Dieu Thien Vegetarian Restaurant','https://www.google.com/maps/search/?api=1&query=Dieu%20Thien%20Vegetarian%20Restaurant%20130%20Trần%20Lựu,%20Thu%20Duc%20City',null,343,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Bon - Asian Soul Kitchen','bon-asian-soul-kitchen','food','Asian','A Phu Quoc food & dining listing imported for the launch directory. Asian venue details are shown as a sample and should be refreshed from Google Places before final verification.','20 Tống Hữu Định, Thu Duc City','Bon - Asian Soul Kitchen','https://www.google.com/maps/search/?api=1&query=Bon%20-%20Asian%20Soul%20Kitchen%2020%20Tống%20Hữu%20Định,%20Thu%20Duc%20City',4.9,193,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('NONG - Farm To Grill Xuân Thuỷ','nong-farm-to-grill-xuan-thuy','food','Grill','A Phu Quoc food & dining listing imported for the launch directory. Grill venue details are shown as a sample and should be refreshed from Google Places before final verification.','48 Xuân Thủy, Phu Quoc','NONG - Farm To Grill Xuân Thuỷ','https://www.google.com/maps/search/?api=1&query=NONG%20-%20Farm%20To%20Grill%20Xuân%20Thuỷ%2048%20Xuân%20Thủy,%20Thao%20Dien',null,4100,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Madame Lam - Vietnamese Contemporary Cuisine','madame-lam-vietnamese-contemporary-cuisine','food','Vietnamese','A Phu Quoc food & dining listing imported for the launch directory. Vietnamese venue details are shown as a sample and should be refreshed from Google Places before final verification.','10 Trần Ngọc Diện, Phu Quoc','Madame Lam - Vietnamese Contemporary Cuisine','https://www.google.com/maps/search/?api=1&query=Madame%20Lam%20-%20Vietnamese%20Contemporary%20Cuisine%2010%20Trần%20Ngọc%20Diện,%20Thao%20Dien',null,1800,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Nam Mê Saigon','nam-me-saigon','food','Vietnamese','A Phu Quoc food & dining listing imported for the launch directory. Vietnamese venue details are shown as a sample and should be refreshed from Google Places before final verification.','7 Trần Văn Sắc, Thu Duc City','Nam Mê Saigon','https://www.google.com/maps/search/?api=1&query=Nam%20Mê%20Saigon%207%20Trần%20Văn%20Sắc,%20Thu%20Duc%20City',null,1600,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Pizza 4P''s Trần Ngọc Diện','pizza-4p-s-tran-ngoc-dien','food','Pizza','A Phu Quoc food & dining listing imported for the launch directory. Pizza venue details are shown as a sample and should be refreshed from Google Places before final verification.','44 Trần Ngọc Diện, Phu Quoc','Pizza 4P''s Trần Ngọc Diện','https://www.google.com/maps/search/?api=1&query=Pizza%204P''s%20Trần%20Ngọc%20Diện%2044%20Trần%20Ngọc%20Diện,%20Thao%20Dien',null,2300,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('365º Napoli Pizza','365o-napoli-pizza','food','Pizza','A Phu Quoc food & dining listing imported for the launch directory. Pizza venue details are shown as a sample and should be refreshed from Google Places before final verification.','50 Ngô Quang Huy, Phu Quoc','365º Napoli Pizza','https://www.google.com/maps/search/?api=1&query=365º%20Napoli%20Pizza%2050%20Ngô%20Quang%20Huy,%20Thao%20Dien',null,8500,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Today With You','today-with-you','food','Italian','A Phu Quoc food & dining listing imported for the launch directory. Italian venue details are shown as a sample and should be refreshed from Google Places before final verification.','99 Thảo Điền, Phu Quoc','Today With You','https://www.google.com/maps/search/?api=1&query=Today%20With%20You%2099%20Thảo%20Điền,%20Thao%20Dien',null,1600,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Pasta Fresca Thảo Điền','pasta-fresca-thao-ien','food','Italian','A Phu Quoc food & dining listing imported for the launch directory. Italian venue details are shown as a sample and should be refreshed from Google Places before final verification.','28 Thảo Điền, Phu Quoc','Pasta Fresca Thảo Điền','https://www.google.com/maps/search/?api=1&query=Pasta%20Fresca%20Thảo%20Điền%2028%20Thảo%20Điền,%20Thao%20Dien',null,847,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Thai Street','thai-street','food','Thai','A Phu Quoc food & dining listing imported for the launch directory. Thai venue details are shown as a sample and should be refreshed from Google Places before final verification.','32 Trần Ngọc Diện, Phu Quoc','Thai Street','https://www.google.com/maps/search/?api=1&query=Thai%20Street%2032%20Trần%20Ngọc%20Diện,%20Thao%20Dien',null,538,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('KHAP KHAP Thai Bistro - Thảo Điền','khap-khap-thai-bistro-thao-ien','food','Thai','A Phu Quoc food & dining listing imported for the launch directory. Thai venue details are shown as a sample and should be refreshed from Google Places before final verification.','52 Xuân Thủy, Phu Quoc','KHAP KHAP Thai Bistro - Thảo Điền','https://www.google.com/maps/search/?api=1&query=KHAP%20KHAP%20Thai%20Bistro%20-%20Thảo%20Điền%2052%20Xuân%20Thủy,%20Thao%20Dien',4.9,1000,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Sticky Rice - Thai Restaurant','sticky-rice-thai-restaurant','food','Thai','A Phu Quoc food & dining listing imported for the launch directory. Thai venue details are shown as a sample and should be refreshed from Google Places before final verification.','55A Ngô Quang Huy, Phu Quoc','Sticky Rice - Thai Restaurant','https://www.google.com/maps/search/?api=1&query=Sticky%20Rice%20-%20Thai%20Restaurant%2055A%20Ngô%20Quang%20Huy,%20Thao%20Dien',null,446,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Yakiuo Ishikawa Saigon - Thảo Điền','yakiuo-ishikawa-saigon-thao-ien','food','Japanese','A Phu Quoc food & dining listing imported for the launch directory. Japanese venue details are shown as a sample and should be refreshed from Google Places before final verification.','79 Thảo Điền, Phu Quoc','Yakiuo Ishikawa Saigon - Thảo Điền','https://www.google.com/maps/search/?api=1&query=Yakiuo%20Ishikawa%20Saigon%20-%20Thảo%20Điền%2079%20Thảo%20Điền,%20Thao%20Dien',null,301,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Mikado Sushi Thảo Điền','mikado-sushi-thao-ien','food','Japanese','A Phu Quoc food & dining listing imported for the launch directory. Japanese venue details are shown as a sample and should be refreshed from Google Places before final verification.','Nguyễn Văn Hưởng, Phu Quoc','Mikado Sushi Thảo Điền','https://www.google.com/maps/search/?api=1&query=Mikado%20Sushi%20Thảo%20Điền%20Nguyễn%20Văn%20Hưởng,%20Thao%20Dien',4.8,3133,array['/images/cat-food.jpg','/images/food-dining.jpg','/images/food-brunch.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Golden Lotus Oriental Organic Spa Q2','golden-lotus-oriental-organic-spa-q2','wellness','Spa','A Phu Quoc wellness listing imported for the launch directory. Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','16A Đ. Số 10, Phu Quoc','Golden Lotus Oriental Organic Spa Q2','https://www.google.com/maps/search/?api=1&query=Golden%20Lotus%20Oriental%20Organic%20Spa%20Q2%2016A%20Đ.%20Số%2010,%20Thao%20Dien',5.0,1916,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Mầm Gạo Spa - Thảo Điền Branch','mam-gao-spa-thao-ien-branch','wellness','Massage & Recovery','A Phu Quoc wellness listing imported for the launch directory. Massage & Recovery venue details are shown as a sample and should be refreshed from Google Places before final verification.','33/24 Quốc Hương, Phu Quoc','Mầm Gạo Spa - Thảo Điền Branch','https://www.google.com/maps/search/?api=1&query=Mầm%20Gạo%20Spa%20-%20Thảo%20Điền%20Branch%2033/24%20Quốc%20Hương,%20Thao%20Dien',4.9,1574,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Phu Quoc Spa','thao-dien-spa','wellness','Massage','A Phu Quoc wellness listing imported for the launch directory. Massage venue details are shown as a sample and should be refreshed from Google Places before final verification.','33/5 Quốc Hương, Phu Quoc','Phu Quoc Spa','https://www.google.com/maps/search/?api=1&query=Thao%20Dien%20Spa%2033/5%20Quốc%20Hương,%20Thao%20Dien',4.5,214,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Léa Beauty Quận 2','lea-beauty-quan-2','wellness','Beauty & Spa','A Phu Quoc wellness listing imported for the launch directory. Beauty & Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','37 Số 20, Thu Duc City','Léa Beauty Quận 2','https://www.google.com/maps/search/?api=1&query=Léa%20Beauty%20Quận%202%2037%20Số%2020,%20Thu%20Duc%20City',null,832,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('MỘC NẮNG SPA - Chi Nhánh 2','moc-nang-spa-chi-nhanh-2','wellness','Spa','A Phu Quoc wellness listing imported for the launch directory. Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','86A Song Hành, Thu Duc City','MỘC NẮNG SPA - Chi Nhánh 2','https://www.google.com/maps/search/?api=1&query=MỘC%20NẮNG%20SPA%20-%20Chi%20Nhánh%202%2086A%20Song%20Hành,%20Thu%20Duc%20City',null,611,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Euphorea Salon and Spa - Signature','euphorea-salon-and-spa-signature','wellness','Salon & Spa','A Phu Quoc wellness listing imported for the launch directory. Salon & Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','685/5 Điện Biên Phủ, Thu Duc City','Euphorea Salon and Spa - Signature','https://www.google.com/maps/search/?api=1&query=Euphorea%20Salon%20and%20Spa%20-%20Signature%20685/5%20Điện%20Biên%20Phủ,%20Thu%20Duc%20City',null,609,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('9ROUND FITNESS THAODIEN','9round-fitness-thaodien','wellness','Fitness','A Phu Quoc wellness listing imported for the launch directory. Fitness venue details are shown as a sample and should be refreshed from Google Places before final verification.','235 Nguyễn Văn Hưởng, Phu Quoc','9ROUND FITNESS THAODIEN','https://www.google.com/maps/search/?api=1&query=9ROUND%20FITNESS%20THAODIEN%20235%20Nguyễn%20Văn%20Hưởng,%20Thao%20Dien',null,334,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Nail By Mỳ - Gội đầu dưỡng sinh','nail-by-my-goi-au-duong-sinh','wellness','Beauty & Wellness','A Phu Quoc wellness listing imported for the launch directory. Beauty & Wellness venue details are shown as a sample and should be refreshed from Google Places before final verification.','60 Nguyễn Quý Đức, Thu Duc City','Nail By Mỳ - Gội đầu dưỡng sinh','https://www.google.com/maps/search/?api=1&query=Nail%20By%20Mỳ%20-%20Gội%20đầu%20dưỡng%20sinh%2060%20Nguyễn%20Quý%20Đức,%20Thu%20Duc%20City',null,267,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Ace Nails & Beauty','ace-nails-beauty','wellness','Beauty','A Phu Quoc wellness listing imported for the launch directory. Beauty venue details are shown as a sample and should be refreshed from Google Places before final verification.','37 Nguyễn Bá Huân, Thu Duc City','Ace Nails & Beauty','https://www.google.com/maps/search/?api=1&query=Ace%20Nails%20%26%20Beauty%2037%20Nguyễn%20Bá%20Huân,%20Thu%20Duc%20City',null,251,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Skin Lab By K','skin-lab-by-k','wellness','Skin Care','A Phu Quoc wellness listing imported for the launch directory. Skin Care venue details are shown as a sample and should be refreshed from Google Places before final verification.','47/1/13 Quốc Hương, Phu Quoc','Skin Lab By K','https://www.google.com/maps/search/?api=1&query=Skin%20Lab%20By%20K%2047/1/13%20Quốc%20Hương,%20Thao%20Dien',null,206,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Dilys Clinic & Spa Thảo Điền','dilys-clinic-spa-thao-ien','wellness','Clinic & Spa','A Phu Quoc wellness listing imported for the launch directory. Clinic & Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','25 Đ. Số 38, Phu Quoc','Dilys Clinic & Spa Thảo Điền','https://www.google.com/maps/search/?api=1&query=Dilys%20Clinic%20%26%20Spa%20Thảo%20Điền%2025%20Đ.%20Số%2038,%20Thao%20Dien',null,197,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Meadow Nails - Thảo Điền','meadow-nails-thao-ien','wellness','Beauty','A Phu Quoc wellness listing imported for the launch directory. Beauty venue details are shown as a sample and should be refreshed from Google Places before final verification.','106/3A Quốc Hương, Phu Quoc','Meadow Nails - Thảo Điền','https://www.google.com/maps/search/?api=1&query=Meadow%20Nails%20-%20Thảo%20Điền%20106/3A%20Quốc%20Hương,%20Thao%20Dien',null,196,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('CL K BEAUTY','cl-k-beauty','wellness','Beauty & Therapy','A Phu Quoc wellness listing imported for the launch directory. Beauty & Therapy venue details are shown as a sample and should be refreshed from Google Places before final verification.','48A Trần Ngọc Diện, Phu Quoc','CL K BEAUTY','https://www.google.com/maps/search/?api=1&query=CL%20K%20BEAUTY%2048A%20Trần%20Ngọc%20Diện,%20Thao%20Dien',null,121,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Mộc An Spa Dưỡng Sinh','moc-an-spa-duong-sinh','wellness','Wellness Spa','A Phu Quoc wellness listing imported for the launch directory. Wellness Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','BCAS, Thu Duc City','Mộc An Spa Dưỡng Sinh','https://www.google.com/maps/search/?api=1&query=Mộc%20An%20Spa%20Dưỡng%20Sinh%20BCAS,%20Thu%20Duc%20City',null,110,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Lotus Beauty Spa','lotus-beauty-spa','wellness','Beauty & Spa','A Phu Quoc wellness listing imported for the launch directory. Beauty & Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','42 Đ. Số 7, Thu Duc City','Lotus Beauty Spa','https://www.google.com/maps/search/?api=1&query=Lotus%20Beauty%20Spa%2042%20Đ.%20Số%207,%20Thu%20Duc%20City',null,92,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('HD Beauty Spa','hd-beauty-spa','wellness','Skin Care','A Phu Quoc wellness listing imported for the launch directory. Skin Care venue details are shown as a sample and should be refreshed from Google Places before final verification.','24 Đ. Số 2, Thu Duc City','HD Beauty Spa','https://www.google.com/maps/search/?api=1&query=HD%20Beauty%20Spa%2024%20Đ.%20Số%202,%20Thu%20Duc%20City',null,91,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('MaySpa','mayspa','wellness','Spa','A Phu Quoc wellness listing imported for the launch directory. Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','58/2 Đ. Số 47, Phu Quoc','MaySpa','https://www.google.com/maps/search/?api=1&query=MaySpa%2058/2%20Đ.%20Số%2047,%20Thao%20Dien',null,90,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('EMPO waxing Thảo Điền','empo-waxing-thao-ien','wellness','Waxing','A Phu Quoc wellness listing imported for the launch directory. Waxing venue details are shown as a sample and should be refreshed from Google Places before final verification.','9 Đường số 49B, Phu Quoc','EMPO waxing Thảo Điền','https://www.google.com/maps/search/?api=1&query=EMPO%20waxing%20Thảo%20Điền%209%20Đường%20số%2049B,%20Thao%20Dien',null,73,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('The Privé Spa','the-prive-spa','wellness','Spa','A Phu Quoc wellness listing imported for the launch directory. Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','40 Thái Ly, Phu Quoc','The Privé Spa','https://www.google.com/maps/search/?api=1&query=The%20Privé%20Spa%2040%20Thái%20Ly,%20Thao%20Dien',null,619,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('SHAN HEALTH Quận 2','shan-health-quan-2','wellness','Therapy','A Phu Quoc wellness listing imported for the launch directory. Therapy venue details are shown as a sample and should be refreshed from Google Places before final verification.','46 Quốc Hương, Phu Quoc','SHAN HEALTH Quận 2','https://www.google.com/maps/search/?api=1&query=SHAN%20HEALTH%20Quận%202%2046%20Quốc%20Hương,%20Thao%20Dien',null,314,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('MYSS by Dr. Anna Clinic & Spa District 2','myss-by-dr-anna-clinic-spa-district-2','wellness','Clinic & Spa','A Phu Quoc wellness listing imported for the launch directory. Clinic & Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','Phu Quoc, Thu Duc City','MYSS by Dr. Anna Clinic & Spa District 2','https://www.google.com/maps/search/?api=1&query=MYSS%20by%20Dr.%20Anna%20Clinic%20%26%20Spa%20District%202%20Thao%20Dien,%20Thu%20Duc%20City',null,307,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Ginger Spa','ginger-spa','wellness','Massage','A Phu Quoc wellness listing imported for the launch directory. Massage venue details are shown as a sample and should be refreshed from Google Places before final verification.','16 đường 49B, Phu Quoc','Ginger Spa','https://www.google.com/maps/search/?api=1&query=Ginger%20Spa%2016%20đường%2049B,%20Thao%20Dien',4.8,85,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Healing Skin Therapy Spa & Massage - Phu Quoc','healing-skin-therapy-spa-massage-thao-dien','wellness','Skin Care & Massage','A Phu Quoc wellness listing imported for the launch directory. Skin Care & Massage venue details are shown as a sample and should be refreshed from Google Places before final verification.','41 Thái Ly, Phu Quoc','Healing Skin Therapy Spa & Massage - Phu Quoc','https://www.google.com/maps/search/?api=1&query=Healing%20Skin%20Therapy%20Spa%20%26%20Massage%20-%20Thao%20Dien%2041%20Thái%20Ly,%20Thao%20Dien',4.9,41,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Sơn Cước Spa Thảo Điền','son-cuoc-spa-thao-ien','wellness','Spa','A Phu Quoc wellness listing imported for the launch directory. Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','204/3 Nguyễn Văn Hưởng, Phu Quoc','Sơn Cước Spa Thảo Điền','https://www.google.com/maps/search/?api=1&query=Sơn%20Cước%20Spa%20Thảo%20Điền%20204/3%20Nguyễn%20Văn%20Hưởng,%20Thao%20Dien',5.0,33,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Mandarin Spa@Massage','mandarin-spa-massage','wellness','Massage','A Phu Quoc wellness listing imported for the launch directory. Massage venue details are shown as a sample and should be refreshed from Google Places before final verification.','12 Thảo Điền, Phu Quoc','Mandarin Spa@Massage','https://www.google.com/maps/search/?api=1&query=Mandarin%20Spa@Massage%2012%20Thảo%20Điền,%20Thao%20Dien',4.4,855,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Saigon Dep Clinic & Spa Thảo Điền','saigon-dep-clinic-spa-thao-ien','wellness','Clinic & Spa','A Phu Quoc wellness listing imported for the launch directory. Clinic & Spa venue details are shown as a sample and should be refreshed from Google Places before final verification.','79 Xuân Thủy, Phu Quoc','Saigon Dep Clinic & Spa Thảo Điền','https://www.google.com/maps/search/?api=1&query=Saigon%20Dep%20Clinic%20%26%20Spa%20Thảo%20Điền%2079%20Xuân%20Thủy,%20Thao%20Dien',4.6,472,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('BODY SHAPE - gym Phu Quoc','body-shape-gym-thao-dien','wellness','Gym','A Phu Quoc wellness listing imported for the launch directory. Gym venue details are shown as a sample and should be refreshed from Google Places before final verification.','49G Quốc Hương, Phu Quoc','BODY SHAPE - gym Phu Quoc','https://www.google.com/maps/search/?api=1&query=BODY%20SHAPE%20-%20gym%20Thao%20Dien%2049G%20Quốc%20Hương,%20Thao%20Dien',4.8,174,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Lecao Athletic Base (LAB) Gym Phu Quoc','lecao-athletic-base-lab-gym-thao-dien','wellness','Gym','A Phu Quoc wellness listing imported for the launch directory. Gym venue details are shown as a sample and should be refreshed from Google Places before final verification.','129 Quốc Hương, Phu Quoc','Lecao Athletic Base (LAB) Gym Phu Quoc','https://www.google.com/maps/search/?api=1&query=Lecao%20Athletic%20Base%20(LAB)%20Gym%20Thao%20Dien%20129%20Quốc%20Hương,%20Thao%20Dien',5.0,108,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Train With Primal','train-with-primal','wellness','Fitness','A Phu Quoc wellness listing imported for the launch directory. Fitness venue details are shown as a sample and should be refreshed from Google Places before final verification.','13 Nguyễn Duy Hiệu, Phu Quoc','Train With Primal','https://www.google.com/maps/search/?api=1&query=Train%20With%20Primal%2013%20Nguyễn%20Duy%20Hiệu,%20Thao%20Dien',4.8,457,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('MOVE Fitness','move-fitness','wellness','Fitness','A Phu Quoc wellness listing imported for the launch directory. Fitness venue details are shown as a sample and should be refreshed from Google Places before final verification.','27E Võ Trường Toản, Phu Quoc','MOVE Fitness','https://www.google.com/maps/search/?api=1&query=MOVE%20Fitness%2027E%20Võ%20Trường%20Toản,%20Thao%20Dien',5.0,140,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Move B Wellness','move-b-wellness','wellness','Sports Stretching','A Phu Quoc wellness listing imported for the launch directory. Sports Stretching venue details are shown as a sample and should be refreshed from Google Places before final verification.','33 Nguyễn Quý Đức, Thu Duc City','Move B Wellness','https://www.google.com/maps/search/?api=1&query=Move%20B%20Wellness%2033%20Nguyễn%20Quý%20Đức,%20Thu%20Duc%20City',5.0,46,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('LAVA Fitness Studio Vietnam | 25 FIT - Thảo Điền','lava-fitness-studio-vietnam-25-fit-thao-ien','wellness','Fitness','A Phu Quoc wellness listing imported for the launch directory. Fitness venue details are shown as a sample and should be refreshed from Google Places before final verification.','33 Thảo Điền, Phu Quoc','LAVA Fitness Studio Vietnam | 25 FIT - Thảo Điền','https://www.google.com/maps/search/?api=1&query=LAVA%20Fitness%20Studio%20Vietnam%20|%2025%20FIT%20-%20Thảo%20Điền%2033%20Thảo%20Điền,%20Thao%20Dien',4.9,82,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('California Fitness & Yoga Thảo Điền Pearl','california-fitness-yoga-thao-ien-pearl','wellness','Gym & Yoga','A Phu Quoc wellness listing imported for the launch directory. Gym & Yoga venue details are shown as a sample and should be refreshed from Google Places before final verification.','12 Quốc Hương, Phu Quoc','California Fitness & Yoga Thảo Điền Pearl','https://www.google.com/maps/search/?api=1&query=California%20Fitness%20%26%20Yoga%20Thảo%20Điền%20Pearl%2012%20Quốc%20Hương,%20Thao%20Dien',4.2,554,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Phu Quoc Eco Wellness','thao-dien-eco-wellness','wellness','Yoga & Wellness','A Phu Quoc wellness listing imported for the launch directory. Yoga & Wellness venue details are shown as a sample and should be refreshed from Google Places before final verification.','8C Đ. Số 12, Phu Quoc','Phu Quoc Eco Wellness','https://www.google.com/maps/search/?api=1&query=Thao%20Dien%20Eco%20Wellness%208C%20Đ.%20Số%2012,%20Thao%20Dien',4.8,58,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Yoga Pod','yoga-pod','wellness','Yoga','A Phu Quoc wellness listing imported for the launch directory. Yoga venue details are shown as a sample and should be refreshed from Google Places before final verification.','Hẻm 28 Thảo Điền, Phu Quoc','Yoga Pod','https://www.google.com/maps/search/?api=1&query=Yoga%20Pod%20Hẻm%2028%20Thảo%20Điền,%20Thao%20Dien',4.6,162,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('The Vista Gym','the-vista-gym','wellness','Gym','A Phu Quoc wellness listing imported for the launch directory. Gym venue details are shown as a sample and should be refreshed from Google Places before final verification.','628C Võ Nguyên Giáp, Thu Duc City','The Vista Gym','https://www.google.com/maps/search/?api=1&query=The%20Vista%20Gym%20628C%20Võ%20Nguyên%20Giáp,%20Thu%20Duc%20City',4.3,112,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('TXT GYM','txt-gym','wellness','Gym','A Phu Quoc wellness listing imported for the launch directory. Gym venue details are shown as a sample and should be refreshed from Google Places before final verification.','193 Lương Định Của, Thu Duc City','TXT GYM','https://www.google.com/maps/search/?api=1&query=TXT%20GYM%20193%20Lương%20Định%20Của,%20Thu%20Duc%20City',4.4,91,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Cá Hồi Sauna & Ice Bath Social Club','ca-hoi-sauna-ice-bath-social-club','wellness','Recovery','A Phu Quoc wellness listing imported for the launch directory. Recovery venue details are shown as a sample and should be refreshed from Google Places before final verification.','120/29 Nguyễn Văn Hưởng, Phu Quoc','Cá Hồi Sauna & Ice Bath Social Club','https://www.google.com/maps/search/?api=1&query=Cá%20Hồi%20Sauna%20%26%20Ice%20Bath%20Social%20Club%20120/29%20Nguyễn%20Văn%20Hưởng,%20Thao%20Dien',4.8,149,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('LyLyn by Linh - The Best Beauty Spa in Phu Quoc','lylyn-by-linh-the-best-beauty-spa-in-thao-dien','wellness','Skin Care','A Phu Quoc wellness listing imported for the launch directory. Skin Care venue details are shown as a sample and should be refreshed from Google Places before final verification.','104 Quốc Hương, Phu Quoc','LyLyn by Linh - The Best Beauty Spa in Phu Quoc','https://www.google.com/maps/search/?api=1&query=LyLyn%20by%20Linh%20-%20The%20Best%20Beauty%20Spa%20in%20Thao%20Dien%20104%20Quốc%20Hương,%20Thao%20Dien',4.8,null,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import'),
('Golden Lotus Healing World','golden-lotus-healing-world','wellness','Spa & Sauna','A Phu Quoc wellness listing imported for the launch directory. Spa & Sauna venue details are shown as a sample and should be refreshed from Google Places before final verification.','16A Street No. 10, Phu Quoc','Golden Lotus Healing World','https://www.google.com/maps/search/?api=1&query=Golden%20Lotus%20Healing%20World%2016A%20Street%20No.%2010,%20Thao%20Dien',4.7,423,array['/images/cat-wellness.jpg','/images/wellness-gym.jpg','/images/wellness-recovery.jpg']::text[],'published','ai_checked','Imported from current public Google Maps-derived Phu Quoc listings. Human verification and live Places refresh recommended before launch.','2026-09-21T00:00:00+00'::timestamptz,'2026-09-21T00:00:00+00'::timestamptz,'Google Maps 4.0+ sample import')
on conflict(slug) do update set google_maps_url=excluded.google_maps_url, google_rating=coalesce(excluded.google_rating,public.businesses.google_rating), google_review_count=coalesce(excluded.google_review_count,public.businesses.google_review_count), gallery_urls=excluded.gallery_urls, source_label=excluded.source_label;

-- ===== 004_public_business_intake_storage.sql =====
-- Allow public business owners to upload only to the business-intake folder.
create policy "site media public business intake insert" on storage.objects
for insert to anon, authenticated
with check (
  bucket_id='site-media'
  and (storage.foldername(name))[1]='business-intake'
);

-- ===== 005_editorial_media_storage.sql =====
create policy "site media editorial staff insert" on storage.objects
for insert to authenticated
with check (
  bucket_id='site-media'
  and public.is_staff()
  and (storage.foldername(name))[1] in ('editorial','editorial-gallery')
);

-- ===== 006_v7_search_categories_samples.sql =====
-- v7: searchable category taxonomy, illustrative media disclosure, richer demo profiles
alter table public.businesses add column if not exists tags text[] not null default '{}';
alter table public.businesses add column if not exists media_note text;
alter table public.businesses add column if not exists is_sample boolean not null default false;

-- Preserve existing specialty/cuisine labels as searchable tags before normalizing the main type.
update public.businesses
set tags = array_remove(array[
  case when subcategory is not null and btrim(subcategory)<>'' then subcategory end,
  case when category='food' and subcategory in ('Japanese','Korean','Vietnamese','Thai','Italian','Asian') then subcategory end,
  case when category='food' and subcategory='Pizza' then 'Italian' end,
  case when category='food' and subcategory='Vegetarian' then 'Vegetarian' end,
  case when category='wellness' and subcategory is not null then subcategory end
], null)
where coalesce(array_length(tags,1),0)=0;

-- Food & Dining: main venue type in subcategory, cuisine/specialty in tags.
update public.businesses set subcategory='Restaurant' where category='food' and subcategory in ('Japanese','Korean','Vietnamese','Thai','Italian','Asian','Pizza','Grill','Restaurant');
update public.businesses set subcategory='Cafe' where category='food' and subcategory in ('Cafe','Cafe & Lounge','Cafe & Bistro','Pet Cafe');
update public.businesses set subcategory='Bakery' where category='food' and subcategory='Bakery & Cafe';
update public.businesses set subcategory='Healthy Food' where category='food' and subcategory in ('Healthy Food','Healthy Breakfast','Vegetarian');
update public.businesses set subcategory='Brunch' where category='food' and subcategory='Brunch';
update public.businesses set tags=array_cat(tags,array['Japanese']) where category='food' and (public_name ilike '%sushi%' or public_name ilike '%yakiuo%' or public_name ilike '%mikado%') and not ('Japanese'=any(tags));
update public.businesses set tags=array_cat(tags,array['Korean']) where category='food' and (public_name ilike '%korean%' or public_name ilike '%kimchi%') and not ('Korean'=any(tags));
update public.businesses set tags=array_cat(tags,array['Cafe']) where category='food' and subcategory='Cafe' and not ('Cafe'=any(tags));
update public.businesses set tags=array_cat(tags,array['Brunch']) where category='food' and subcategory='Brunch' and not ('Brunch'=any(tags));
update public.businesses set tags=array_cat(tags,array['Healthy']) where category='food' and subcategory='Healthy Food' and not ('Healthy'=any(tags));

-- Wellness: practical browsing taxonomy.
update public.businesses set subcategory='Circuit Training', tags=array_cat(tags,array['Boxing Fitness','Circuit Training']) where category='wellness' and public_name ilike '%9ROUND%';
update public.businesses set subcategory='Circuit Training', tags=array_cat(tags,array['Circuit Training','Strength']) where category='wellness' and public_name ilike '%LAVA Fitness%';
update public.businesses set subcategory='Functional Training', tags=array_cat(tags,array['Functional Training','Strength']) where category='wellness' and (public_name ilike '%MOVE Fitness%' or public_name ilike '%Train With Primal%');
update public.businesses set subcategory='Gym' where category='wellness' and subcategory in ('Gym','Fitness','Gym & Yoga','Gym & Training');
update public.businesses set subcategory='Yoga' where category='wellness' and subcategory in ('Yoga','Yoga & Wellness');
update public.businesses set subcategory='Pilates' where category='wellness' and subcategory='Pilates';
update public.businesses set subcategory='Massage' where category='wellness' and subcategory in ('Massage','Massage & Recovery','Skin Care & Massage');
update public.businesses set subcategory='Recovery' where category='wellness' and subcategory in ('Recovery','Sports Stretching','Therapy');
update public.businesses set subcategory='Spa' where category='wellness' and subcategory in ('Spa','Spa & Sauna','Salon & Spa','Beauty & Spa','Wellness Spa');
update public.businesses set subcategory='Clinic' where category='wellness' and subcategory='Clinic & Spa';
update public.businesses set subcategory='Beauty' where category='wellness' and subcategory in ('Beauty','Beauty & Therapy','Skin Care','Beauty & Wellness');
update public.businesses set tags=array_cat(tags,array['Waxing']) where category='wellness' and subcategory='Waxing' and not ('Waxing'=any(tags));

-- Use high-resolution category visuals for launch-import rows. These are explicitly labeled as illustrative.
update public.businesses set gallery_urls=case
  when category='food' and ('Japanese'=any(tags)) then array['/images/v7/japanese-hq.jpg','/images/v7/restaurant-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='food' and ('Korean'=any(tags)) then array['/images/v7/korean-hq.jpg','/images/v7/restaurant-hq.jpg','/images/v7/brunch-hq.jpg']
  when category='food' and ('Italian'=any(tags) or 'Pizza'=any(tags)) then array['/images/v7/italian-hq.jpg','/images/v7/restaurant-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='food' and subcategory='Cafe' then array['/images/v7/cafe-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/restaurant-hq.jpg']
  when category='food' and subcategory='Brunch' then array['/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg','/images/v7/healthy-food-hq.jpg']
  when category='food' and subcategory='Healthy Food' then array['/images/v7/healthy-food-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='food' then array['/images/v7/restaurant-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg']
  when category='wellness' and subcategory='Yoga' then array['/images/v7/yoga-hq.jpg','/images/v7/pilates-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Pilates' then array['/images/v7/pilates-hq.jpg','/images/v7/yoga-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Circuit Training' then array['/images/v7/circuit-hq.jpg','/images/v7/gym-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Functional Training' then array['/images/v7/crossfit-hq.jpg','/images/v7/gym-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Massage' then array['/images/v7/massage-hq.jpg','/images/v7/spa-hq.jpg','/images/v7/recovery-hq.jpg']
  when category='wellness' and subcategory='Recovery' then array['/images/v7/recovery-hq.jpg','/images/v7/massage-hq.jpg','/images/v7/gym-hq.jpg']
  when category='wellness' and subcategory='Clinic' then array['/images/v7/clinic-hq.jpg','/images/v7/spa-hq.jpg','/images/v7/community-hq.jpg']
  when category='wellness' and subcategory in ('Spa','Beauty','Waxing') then array['/images/v7/spa-hq.jpg','/images/v7/massage-hq.jpg','/images/v7/recovery-hq.jpg']
  else array['/images/v7/gym-hq.jpg','/images/v7/crossfit-hq.jpg','/images/v7/recovery-hq.jpg'] end,
  media_note='Illustrative category imagery is used for this launch profile until venue-supplied or appropriately licensed photography is added.'
where source_label='Google Maps 4.0+ sample import';

-- Rich illustrative profiles: deliberately marked as sample data, not statements about real venues.
update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A bright neighborhood movement studio designed for residents who want practical, coach-led training without a large-club atmosphere. The sample profile demonstrates how a real listing can explain training style, facilities, schedule, pricing context and who the venue may suit.',
  subcategory='Functional Training',tags=array['Functional Training','Strength','Small Group','Beginner Friendly'],price_level='₫₫',
  services='["Strength & conditioning","Small-group training","Mobility sessions","Personal coaching"]'::jsonb,
  highlights='["Small class format","English-friendly coaching","Beginner onboarding","Morning and evening sessions"]'::jsonb,
  amenities='{"changing_area":"Available","showers":"Available","water_refill":"Available","motorbike_parking":"Nearby"}'::jsonb,
  opening_hours='{"Mon–Fri":"06:00–21:00","Sat":"07:00–18:00","Sun":"08:00–14:00"}'::jsonb,
  gallery_urls=array['/images/v7/gym-hq.jpg','/images/v7/crossfit-hq.jpg','/images/v7/recovery-hq.jpg']
where slug='movement-studio-thao-dien';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A calm reformer Pilates concept with a focus on controlled movement, posture and sustainable training. This demo page shows how instructors, class formats, first-visit guidance and practical booking details can be presented clearly.',
  subcategory='Pilates',tags=array['Pilates','Reformer','Private Sessions','Beginner Friendly'],price_level='₫₫₫',
  services='["Reformer classes","Private Pilates","Introductory sessions","Mobility-focused practice"]'::jsonb,
  highlights='["Small classes","Quiet studio setting","Beginner introduction","English-friendly instruction"]'::jsonb,
  amenities='{"changing_area":"Available","towels":"Available","water":"Available","booking":"Recommended"}'::jsonb,
  opening_hours='{"Mon–Fri":"07:00–21:00","Sat–Sun":"08:00–18:00"}'::jsonb,
  gallery_urls=array['/images/v7/pilates-hq.jpg','/images/v7/yoga-hq.jpg','/images/v7/recovery-hq.jpg']
where slug='river-pilates';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A recovery-focused concept for active residents and desk workers, combining assisted mobility, sports-style bodywork and post-training reset sessions. The demo profile illustrates how treatment focus, session length and facilities can be explained.',
  subcategory='Recovery',tags=array['Recovery','Sports Massage','Mobility','Stretching'],price_level='₫₫',
  services='["Assisted stretching","Sports-style massage","Mobility reset","Post-training recovery"]'::jsonb,
  highlights='["Active-lifestyle focus","Private treatment space","Appointment based","Short recovery sessions available"]'::jsonb,
  amenities='{"private_rooms":"Available","towels":"Available","water":"Available","motorbike_parking":"Nearby"}'::jsonb,
  opening_hours='{"Daily":"09:00–21:00"}'::jsonb,
  gallery_urls=array['/images/v7/recovery-hq.jpg','/images/v7/massage-hq.jpg','/images/v7/gym-hq.jpg']
where slug='tropic-recovery';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A leafy neighborhood brunch concept for coffee, breakfast plates and relaxed weekend catch-ups. This demo listing shows how a café can present atmosphere, meal style, family suitability, booking expectations and practical visit information.',
  subcategory='Brunch',tags=array['Brunch','Cafe','Family Friendly','Outdoor Seating'],price_level='₫₫',
  services='["Breakfast","Brunch","Specialty coffee","Dessert","Takeaway"]'::jsonb,
  highlights='["Outdoor seating","Good for weekend brunch","Family-friendly layout","Casual group dining"]'::jsonb,
  amenities='{"wifi":"Available","air_conditioning":"Available","outdoor_seating":"Available","pet_friendly":"Selected outdoor seats"}'::jsonb,
  opening_hours='{"Daily":"08:00–22:00"}'::jsonb,
  gallery_urls=array['/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg','/images/v7/restaurant-hq.jpg']
where slug='courtyard-brunch';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A light all-day food concept built around breakfast bowls, eggs, fruit, coffee and easy weekday meals. The sample page demonstrates how dietary options, takeaway, price context and family-friendly details can be displayed.',
  subcategory='Healthy Food',tags=array['Healthy','Breakfast','Coffee','Takeaway'],price_level='₫₫',
  services='["Breakfast bowls","Egg dishes","Salads","Coffee","Takeaway"]'::jsonb,
  highlights='["Quick breakfast","Lighter meal options","Casual weekday stop","Family friendly"]'::jsonb,
  amenities='{"wifi":"Available","air_conditioning":"Available","takeaway":"Available","street_level_access":"Yes"}'::jsonb,
  opening_hours='{"Daily":"07:00–17:00"}'::jsonb,
  gallery_urls=array['/images/v7/healthy-food-hq.jpg','/images/v7/brunch-hq.jpg','/images/v7/cafe-hq.jpg']
where slug='morning-bowl';

update public.businesses set
  is_sample=true,source_label='Illustrative sample profile',verification_status='manual_review',
  media_note='Sample profile: descriptions, amenities, hours and images are illustrative and are shown to demonstrate the finished directory experience.',
  description_en='A modern Vietnamese neighborhood dining concept for lunch and dinner, with familiar flavors presented in a comfortable setting. The demo page shows how cuisine, group suitability, atmosphere, price range and booking details can be structured.',
  subcategory='Restaurant',tags=array['Vietnamese','Restaurant','Dinner','Groups'],price_level='₫₫₫',
  services='["Vietnamese lunch","Dinner","Shared dishes","Group dining"]'::jsonb,
  highlights='["Modern Vietnamese style","Good for small groups","Comfortable dining room","Dinner reservations accepted"]'::jsonb,
  amenities='{"air_conditioning":"Available","group_tables":"Available","card_payment":"Available","motorbike_parking":"Nearby"}'::jsonb,
  opening_hours='{"Daily":"11:00–22:30"}'::jsonb,
  gallery_urls=array['/images/v7/restaurant-hq.jpg','/images/v7/korean-hq.jpg','/images/v7/brunch-hq.jpg']
where slug='lotus-table';

-- Replace sponsor placeholders with the new high-resolution visual set and fill all seven main slots.
insert into public.sponsor_banners(slot_key,size,title,subtitle,image_url,target_url,is_active,sort_order) values
('main-1','main','Local Living Partner','A featured space for neighborhood brands that support the community.','/images/v7/sponsor-main-1.jpg','#',true,1),
('main-2','main','Wellness Community Partner','Move, recover and live well in Phu Quoc.','/images/v7/sponsor-main-2.jpg','#',true,2),
('main-3','main','Food & Dining Partner','A spotlight for restaurants and hospitality partners.','/images/v7/sponsor-main-3.jpg','#',true,3),
('main-4','main','Active Life Partner','Supporting healthier everyday routines.','/images/v7/sponsor-main-4.jpg','#',true,4),
('main-5','main','Neighborhood Café Partner','Good coffee, local stories and community connection.','/images/v7/sponsor-main-5.jpg','#',true,5),
('main-6','main','Recovery & Care Partner','Wellbeing services for everyday life.','/images/v7/sponsor-main-6.jpg','#',true,6),
('main-7','main','Community Partner','Local support for a brighter Phu Quoc.','/images/v7/sponsor-main-7.jpg','#',true,7),
('small-1','small','Food Partner',null,'/images/v7/sponsor-small-1.jpg','#',true,1),
('small-2','small','Fitness Partner',null,'/images/v7/sponsor-small-2.jpg','#',true,2),
('small-3','small','Café Partner',null,'/images/v7/sponsor-small-3.jpg','#',true,3),
('small-4','small','Community Partner',null,'/images/v7/sponsor-small-4.jpg','#',true,4)
on conflict(slot_key) do update set title=excluded.title,subtitle=excluded.subtitle,image_url=excluded.image_url,target_url=excluded.target_url,is_active=excluded.is_active,sort_order=excluded.sort_order,updated_at=now();

-- ===== 007_v7_taxonomy_cleanup.sql =====
-- v7 taxonomy cleanup: normalize one remaining food subtype and de-duplicate searchable tags.
update public.businesses
set tags=array_cat(tags,array['Dessert'])
where category='food' and subcategory='Cafe & Dessert' and not ('Dessert'=any(tags));

update public.businesses
set subcategory='Cafe'
where category='food' and subcategory='Cafe & Dessert';

update public.businesses b
set tags=(select coalesce(array_agg(distinct x order by x),'{}'::text[]) from unnest(b.tags) as x)
where coalesce(array_length(tags,1),0)>0;

-- ===== 008a_submission_tags.sql =====
alter table public.business_submissions add column if not exists tags text[] not null default '{}';
alter table public.business_submissions add column if not exists price_level text;

-- ===== 008b_v74_five_category_directory.sql =====
-- v7.4 five-category directory and editorial emphasis badges.
alter table public.businesses add column if not exists badges text[] not null default '{}'::text[];
create index if not exists businesses_category_subcategory_idx on public.businesses(category, subcategory);

update public.businesses
set category='cafe',
    subcategory=case
      when lower(coalesce(subcategory,''))='brunch' then 'Brunch Cafe'
      when lower(coalesce(subcategory,''))='bakery' then 'Bakery Cafe'
      when lower(array_to_string(tags,' ')) like '%pet cafe%' or lower(public_name) like '%pet cafe%' then 'Pet Cafe'
      when lower(array_to_string(tags,' ')) like '%specialty%' or lower(public_name) like '%specialty coffee%' then 'Specialty Coffee'
      when lower(array_to_string(tags,' ')) like '%dessert%' then 'Dessert Cafe'
      else 'Cafe'
    end,
    updated_at=now()
where category='food' and subcategory in ('Cafe','Brunch','Bakery');

update public.businesses
set category='workout',
    subcategory=case
      when lower(array_to_string(tags,' ')) like '%boxing fitness%' then 'Boxing Fitness'
      when subcategory='Gym' then 'Public Gym'
      else subcategory
    end,
    updated_at=now()
where category='wellness' and subcategory in ('Gym','CrossFit','Circuit Training','Functional Training','Yoga','Pilates');

update public.businesses
set subcategory=case
      when subcategory='Beauty' then 'Beauty & Skin'
      when subcategory='Recovery' and (lower(array_to_string(tags,' ')) like '%sauna%' or lower(public_name) like '%sauna%' or lower(public_name) like '%ice bath%') then 'Sauna & Ice Bath'
      when subcategory='Recovery' and lower(array_to_string(tags,' ')) like '%therapy%' then 'Therapy'
      else subcategory
    end,
    updated_at=now()
where category='wellness';

update public.businesses
set subcategory=case
      when lower(array_to_string(tags,' ')) like '%korean%' then 'Korean'
      when lower(array_to_string(tags,' ')) like '%japanese%' or lower(array_to_string(tags,' ')) like '%sushi%' then 'Japanese'
      when lower(array_to_string(tags,' ')) like '%chinese%' then 'Chinese'
      when lower(array_to_string(tags,' ')) like '%vietnamese%' then 'Vietnamese'
      when lower(array_to_string(tags,' ')) like '%thai%' then 'Thai'
      when lower(array_to_string(tags,' ')) like '%italian%' then 'Italian'
      when lower(array_to_string(tags,' ')) like '%indian%' then 'Indian'
      when lower(array_to_string(tags,' ')) like '%vegetarian%' then 'Vegetarian'
      when lower(array_to_string(tags,' ')) like '%salad%' then 'Salad Bar'
      when lower(array_to_string(tags,' ')) like '%healthy%' then 'Healthy Restaurant'
      when lower(array_to_string(tags,' ')) like '%grill%' then 'Grill'
      when lower(array_to_string(tags,' ')) like '%pizza%' then 'Pizza'
      when lower(array_to_string(tags,' ')) like '%asian%' then 'Asian'
      when subcategory='Healthy Food' then 'Healthy Restaurant'
      else 'Restaurant'
    end,
    updated_at=now()
where category='food';

-- ===== 009_expand_submission_verification.sql =====
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

-- ===== 010_editorial_fields.sql =====
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

-- ===== 013_manual_directory_data_review.sql =====
alter table public.businesses
  add column if not exists listing_checked_at timestamptz,
  add column if not exists listing_checked_by uuid,
  add column if not exists rating_source text;

comment on column public.businesses.listing_checked_at is 'When an editor/admin last manually checked the public listing information.';
comment on column public.businesses.listing_checked_by is 'Auth user who last manually checked the public listing information.';
comment on column public.businesses.rating_source is 'Optional human-readable source label for a manually entered rating/review count.';

-- ===== 014_first_party_analytics.sql =====
create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  visitor_id uuid not null,
  session_id uuid not null,
  event_type text not null check (event_type in ('page_view','click')),
  path text not null check (char_length(path) <= 500),
  target text check (target is null or char_length(target) <= 700),
  entity_type text check (entity_type is null or char_length(entity_type) <= 80),
  entity_id text check (entity_id is null or char_length(entity_id) <= 200),
  referrer_host text check (referrer_host is null or char_length(referrer_host) <= 255),
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);
create index if not exists analytics_events_event_type_idx on public.analytics_events(event_type, created_at desc);
create index if not exists analytics_events_entity_idx on public.analytics_events(entity_type, entity_id, created_at desc);
create index if not exists analytics_events_path_idx on public.analytics_events(path, created_at desc);

alter table public.analytics_events enable row level security;

drop policy if exists "analytics public insert" on public.analytics_events;
create policy "analytics public insert" on public.analytics_events
for insert to anon, authenticated
with check (
  event_type in ('page_view','click')
  and path not like '/admin%'
  and path not like '/editor%'
  and path not like '/login%'
  and path not like '/account%'
  and path not like '/auth%'
  and path not like '/api%'
);

drop policy if exists "analytics admin read" on public.analytics_events;
create policy "analytics admin read" on public.analytics_events
for select to authenticated
using (public.is_admin());

create or replace function public.analytics_summary(p_days integer default 30)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_days integer := greatest(1, least(coalesce(p_days,30),365));
  v_since timestamptz := now() - ((greatest(1, least(coalesce(p_days,30),365)))::text || ' days')::interval;
  v_result jsonb;
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;

  select jsonb_build_object(
    'days', v_days,
    'page_views', (select count(*) from public.analytics_events where created_at >= v_since and event_type='page_view'),
    'clicks', (select count(*) from public.analytics_events where created_at >= v_since and event_type='click'),
    'visits', (select count(distinct session_id) from public.analytics_events where created_at >= v_since and event_type='page_view'),
    'visitors', (select count(distinct visitor_id) from public.analytics_events where created_at >= v_since and event_type='page_view'),
    'top_pages', coalesce((
      select jsonb_agg(jsonb_build_object('path',x.path,'views',x.views,'visits',x.visits) order by x.views desc)
      from (
        select path, count(*)::bigint as views, count(distinct session_id)::bigint as visits
        from public.analytics_events
        where created_at >= v_since and event_type='page_view'
        group by path
        order by views desc
        limit 10
      ) x
    ), '[]'::jsonb),
    'top_clicks', coalesce((
      select jsonb_agg(jsonb_build_object('target',x.target,'clicks',x.clicks) order by x.clicks desc)
      from (
        select target, count(*)::bigint as clicks
        from public.analytics_events
        where created_at >= v_since and event_type='click' and target is not null
        group by target
        order by clicks desc
        limit 10
      ) x
    ), '[]'::jsonb),
    'top_businesses', coalesce((
      select jsonb_agg(jsonb_build_object('id',x.id,'name',x.name,'clicks',x.clicks) order by x.clicks desc)
      from (
        select b.id::text as id, b.public_name as name, count(*)::bigint as clicks
        from public.analytics_events e
        join public.businesses b on b.id::text=e.entity_id
        where e.created_at >= v_since and e.event_type='click' and e.entity_type in ('business','business-map','business-booking','business-social')
        group by b.id,b.public_name
        order by clicks desc
        limit 10
      ) x
    ), '[]'::jsonb),
    'top_sponsors', coalesce((
      select jsonb_agg(jsonb_build_object('slot',x.slot,'name',x.name,'clicks',x.clicks) order by x.clicks desc)
      from (
        select e.entity_id as slot, coalesce(s.title,e.entity_id) as name, count(*)::bigint as clicks
        from public.analytics_events e
        left join public.sponsor_banners s on s.slot_key=e.entity_id
        where e.created_at >= v_since and e.event_type='click' and e.entity_type='sponsor'
        group by e.entity_id,s.title
        order by clicks desc
        limit 10
      ) x
    ), '[]'::jsonb),
    'daily', coalesce((
      select jsonb_agg(jsonb_build_object('day',x.day,'views',x.views,'visits',x.visits,'clicks',x.clicks) order by x.day)
      from (
        select d::date as day,
          count(*) filter (where e.event_type='page_view')::bigint as views,
          count(distinct e.session_id) filter (where e.event_type='page_view')::bigint as visits,
          count(*) filter (where e.event_type='click')::bigint as clicks
        from generate_series(date_trunc('day',v_since),date_trunc('day',now()),interval '1 day') d
        left join public.analytics_events e on e.created_at >= d and e.created_at < d + interval '1 day'
        group by d
        order by d
      ) x
    ), '[]'::jsonb)
  ) into v_result;

  return v_result;
end;
$$;

revoke all on function public.analytics_summary(integer) from public;
grant execute on function public.analytics_summary(integer) to authenticated;


-- ===== 016_business_metadata.sql =====
-- Add metadata fields for bulk data ingestion (OSM, etc.) and verification
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS source_id text,
  ADD COLUMN IF NOT EXISTS lat numeric(10, 7),
  ADD COLUMN IF NOT EXISTS lng numeric(10, 7),
  ADD COLUMN IF NOT EXISTS data_confidence text CHECK (data_confidence IN ('low', 'medium', 'high')),
  ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS hours_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS photo_permission boolean DEFAULT false;

ALTER TABLE public.business_submissions
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS source_id text,
  ADD COLUMN IF NOT EXISTS lat numeric(10, 7),
  ADD COLUMN IF NOT EXISTS lng numeric(10, 7),
  ADD COLUMN IF NOT EXISTS data_confidence text CHECK (data_confidence IN ('low', 'medium', 'high')),
  ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS hours_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS photo_permission boolean DEFAULT false;
