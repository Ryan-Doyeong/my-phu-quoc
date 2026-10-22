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
  'hero_image_url','/images/hero-thaodien.jpg','hero_topline','PEOPLE · PLACES · A BRIGHTER THAO DIEN','hero_title',E'Good life\nin Thaodien','hero_subtitle','Live well. Grow together. Feel at home.','hero_description','A local guide for better everyday living in Thao Dien.','hero_primary_cta','Explore','hero_secondary_cta','Join the community','hero_note',E'A kinder\nbrighter\nThaodien ♥','hero_blur',2,'hero_overlay',0.18,'accent_color','#556f58','bg_color','#f5f2ea','paper_color','#fffdf8','radius',28
)) on conflict(key) do nothing;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('site-media','site-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif']) on conflict(id) do nothing;
create policy "site media public read" on storage.objects for select to anon,authenticated using (bucket_id='site-media');
create policy "site media admin insert" on storage.objects for insert to authenticated with check (bucket_id='site-media' and public.is_admin());
create policy "site media admin update" on storage.objects for update to authenticated using (bucket_id='site-media' and public.is_admin()) with check (bucket_id='site-media' and public.is_admin());
create policy "site media admin delete" on storage.objects for delete to authenticated using (bucket_id='site-media' and public.is_admin());
