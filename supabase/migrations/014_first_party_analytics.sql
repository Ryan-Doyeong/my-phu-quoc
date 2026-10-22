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
