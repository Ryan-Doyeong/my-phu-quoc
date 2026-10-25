-- My Phu Quoc: Phase 0 schema (001~019 combined, Phu Quoc samples disabled). Run once in a NEW Supabase project's SQL Editor.

-- ===== migrations/001_initial.sql =====
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
  'hero_image_url','/images/hero-thaodien.jpg','hero_topline','PEOPLE · PLACES · A BRIGHTER PHU QUOC','hero_title',E'Good life\nin Phu Quoc','hero_subtitle','Live well. Grow together. Feel at home.','hero_description','A local guide for better everyday living in Phu Quoc.','hero_primary_cta','Explore','hero_secondary_cta','Join the community','hero_note',E'A kinder\nbrighter\nPhu Quoc ♥','hero_blur',2,'hero_overlay',0.18,'accent_color','#556f58','bg_color','#f5f2ea','paper_color','#fffdf8','radius',28
)) on conflict(key) do nothing;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('site-media','site-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif']) on conflict(id) do nothing;
create policy "site media public read" on storage.objects for select to anon,authenticated using (bucket_id='site-media');
create policy "site media admin insert" on storage.objects for insert to authenticated with check (bucket_id='site-media' and public.is_admin());
create policy "site media admin update" on storage.objects for update to authenticated using (bucket_id='site-media' and public.is_admin()) with check (bucket_id='site-media' and public.is_admin());
create policy "site media admin delete" on storage.objects for delete to authenticated using (bucket_id='site-media' and public.is_admin());


-- ===== migrations/002_online_features.sql =====
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


-- ===== migrations/004_public_business_intake_storage.sql =====
-- Allow public business owners to upload only to the business-intake folder.
create policy "site media public business intake insert" on storage.objects
for insert to anon, authenticated
with check (
  bucket_id='site-media'
  and (storage.foldername(name))[1]='business-intake'
);


-- ===== migrations/005_editorial_media_storage.sql =====
create policy "site media editorial staff insert" on storage.objects
for insert to authenticated
with check (
  bucket_id='site-media'
  and public.is_staff()
  and (storage.foldername(name))[1] in ('editorial','editorial-gallery')
);


-- ===== migrations/006_v7_search_categories_samples.sql =====
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
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] insert into public.sponsor_banners(slot_key,size,title,subtitle,image_url,target_url,is_active,sort_order) values
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-1','main','Local Living Partner','A featured space for neighborhood brands that support the community.','/images/v7/sponsor-main-1.jpg','#',true,1),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-2','main','Wellness Community Partner','Move, recover and live well in Phu Quoc.','/images/v7/sponsor-main-2.jpg','#',true,2),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-3','main','Food & Dining Partner','A spotlight for restaurants and hospitality partners.','/images/v7/sponsor-main-3.jpg','#',true,3),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-4','main','Active Life Partner','Supporting healthier everyday routines.','/images/v7/sponsor-main-4.jpg','#',true,4),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-5','main','Neighborhood Café Partner','Good coffee, local stories and community connection.','/images/v7/sponsor-main-5.jpg','#',true,5),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-6','main','Recovery & Care Partner','Wellbeing services for everyday life.','/images/v7/sponsor-main-6.jpg','#',true,6),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('main-7','main','Community Partner','Local support for a brighter Phu Quoc.','/images/v7/sponsor-main-7.jpg','#',true,7),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-1','small','Food Partner',null,'/images/v7/sponsor-small-1.jpg','#',true,1),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-2','small','Fitness Partner',null,'/images/v7/sponsor-small-2.jpg','#',true,2),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-3','small','Café Partner',null,'/images/v7/sponsor-small-3.jpg','#',true,3),
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] ('small-4','small','Community Partner',null,'/images/v7/sponsor-small-4.jpg','#',true,4)
-- [MyPhuQuoc Phase0 disabled: Phu Quoc sample] on conflict(slot_key) do update set title=excluded.title,subtitle=excluded.subtitle,image_url=excluded.image_url,target_url=excluded.target_url,is_active=excluded.is_active,sort_order=excluded.sort_order,updated_at=now();


-- ===== migrations/007_v7_taxonomy_cleanup.sql =====
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


-- ===== migrations/008a_submission_tags.sql =====
alter table public.business_submissions add column if not exists tags text[] not null default '{}';
alter table public.business_submissions add column if not exists price_level text;


-- ===== migrations/008b_v74_five_category_directory.sql =====
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


-- ===== migrations/009_expand_submission_verification.sql =====
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


-- ===== migrations/010_editorial_fields.sql =====
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


-- ===== migrations/013_manual_directory_data_review.sql =====
alter table public.businesses
  add column if not exists listing_checked_at timestamptz,
  add column if not exists listing_checked_by uuid,
  add column if not exists rating_source text;

comment on column public.businesses.listing_checked_at is 'When an editor/admin last manually checked the public listing information.';
comment on column public.businesses.listing_checked_by is 'Auth user who last manually checked the public listing information.';
comment on column public.businesses.rating_source is 'Optional human-readable source label for a manually entered rating/review count.';


-- ===== migrations/014_first_party_analytics.sql =====
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


-- ===== migrations/016_business_metadata.sql =====
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


-- ===== migrations/017_staging_parity.sql =====
-- 017: parity fixes found while testing Staging (safe to run on production: all idempotent)
alter table public.businesses add column if not exists is_good_life_member boolean not null default false;

drop policy if exists "businesses staff write" on public.businesses;
create policy "businesses staff write" on public.businesses
  for all to authenticated using (public.is_staff()) with check (public.is_staff());


-- ===== migrations/019_multilingual_en_vi_ko.sql =====
-- 019_multilingual_en_vi_ko.sql
-- 목적: 타오디엔 사이트 다국어(EN·VI·KO) 전환을 위한 비파괴적 컬럼 추가 및 제약 확장
-- 주의: 기존 데이터 삭제·덮어쓰기 없음 (모두 ADD COLUMN IF NOT EXISTS 사용)
-- 상태: 3단계 지시서에 따라 SQL 파일만 작성 (라이브 Supabase 미적용, Ryan 승인 후 적용)

BEGIN;

-- ============================================================================
-- 1. public.stories (뉴스·가이드·이벤트·임팩트 다국어 컬럼 확장)
-- ============================================================================
-- 기존 컬럼: title, subtitle, excerpt, body_en, body_vi, body_ko, seo_title, seo_description, key_points, callout, hero_caption
ALTER TABLE public.stories
  ADD COLUMN IF NOT EXISTS title_vi text,
  ADD COLUMN IF NOT EXISTS title_ko text,
  ADD COLUMN IF NOT EXISTS subtitle_vi text,
  ADD COLUMN IF NOT EXISTS subtitle_ko text,
  ADD COLUMN IF NOT EXISTS excerpt_vi text,
  ADD COLUMN IF NOT EXISTS excerpt_ko text,
  ADD COLUMN IF NOT EXISTS seo_title_vi text,
  ADD COLUMN IF NOT EXISTS seo_title_ko text,
  ADD COLUMN IF NOT EXISTS seo_description_vi text,
  ADD COLUMN IF NOT EXISTS seo_description_ko text,
  ADD COLUMN IF NOT EXISTS key_points_vi text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS key_points_ko text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS callout_vi text,
  ADD COLUMN IF NOT EXISTS callout_ko text,
  ADD COLUMN IF NOT EXISTS hero_caption_vi text,
  ADD COLUMN IF NOT EXISTS hero_caption_ko text,
  -- 내부 검수 상태 표기용 (사이트 방문자에게 노출하지 않음)
  -- 값 예시: 'unverified' | 'ai_reviewed_native_unverified' ('AI 검수 완료 / 원어민 미확인') | 'native_verified' | 'ryan_approved'
  ADD COLUMN IF NOT EXISTS translation_status_vi text NOT NULL DEFAULT 'unverified'
    CHECK (translation_status_vi IN ('unverified', 'ai_reviewed_native_unverified', 'native_verified')),
  ADD COLUMN IF NOT EXISTS translation_status_ko text NOT NULL DEFAULT 'unverified'
    CHECK (translation_status_ko IN ('unverified', 'ryan_approved'));

COMMENT ON COLUMN public.stories.translation_status_vi IS
  '내부 관리용 베트남어 검수 상태 (방문자 비노출): unverified=미확인, ai_reviewed_native_unverified=AI 검수 완료 / 원어민 미확인, native_verified=원어민 확인 완료';
COMMENT ON COLUMN public.stories.translation_status_ko IS
  '내부 관리용 한국어 검수 상태 (방문자 비노출): unverified=미확인, ryan_approved=Ryan 승인 완료';

-- ============================================================================
-- 2. public.business_submissions (업체 직접 신청 시 다국어 소개 및 선택 항목 통합)
-- ============================================================================
-- 업체가 원할 경우 영어(description_en) 외에 베트남어(description_vi)·한국어(description_ko) 소개도 직접 입력 가능
-- 구 /kr/join 의 한국 업체 선택 입력 항목(카카오 오픈채팅, Zalo, 배달 여부 등)을 공통 폼에서 수용하도록 보장
ALTER TABLE public.business_submissions
  ADD COLUMN IF NOT EXISTS description_vi text,
  ADD COLUMN IF NOT EXISTS description_ko text,
  ADD COLUMN IF NOT EXISTS kakao_openchat_url text,
  ADD COLUMN IF NOT EXISTS zalo_phone text,
  ADD COLUMN IF NOT EXISTS messenger_url text,
  ADD COLUMN IF NOT EXISTS preferred_contact text
    CHECK (preferred_contact IS NULL OR preferred_contact IN ('kakao', 'zalo', 'messenger', 'phone')),
  ADD COLUMN IF NOT EXISTS delivery_available boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS delivery_mode text,
  ADD COLUMN IF NOT EXISTS delivery_area text,
  ADD COLUMN IF NOT EXISTS opening_hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS contact_kakao_id text;

-- 세금번호(tax_code) 선택화 보장
ALTER TABLE public.business_submissions
  ALTER COLUMN tax_code DROP NOT NULL;

-- ============================================================================
-- 3. public.sponsor_applications (커뮤니티 파트너 신청 언어 제약 'ko' 추가)
-- ============================================================================
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'sponsor_applications'
  ) THEN
    ALTER TABLE public.sponsor_applications
      DROP CONSTRAINT IF EXISTS sponsor_applications_lang_check;
    ALTER TABLE public.sponsor_applications
      ADD CONSTRAINT sponsor_applications_lang_check
      CHECK (lang IN ('en', 'vi', 'ko'));
  END IF;
END $$;

-- ============================================================================
-- 4. storage.buckets & policies (site-media 버킷 설정)
-- ============================================================================
INSERT INTO storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
VALUES ('site-media', 'site-media', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/avif'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "site media public read" ON storage.objects;
CREATE POLICY "site media public read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "site media admin insert" ON storage.objects;
CREATE POLICY "site media admin insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.is_admin());

DROP POLICY IF EXISTS "site media admin update" ON storage.objects;
CREATE POLICY "site media admin update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'site-media' AND public.is_admin());

DROP POLICY IF EXISTS "site media admin delete" ON storage.objects;
CREATE POLICY "site media admin delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.is_admin());

COMMIT;

