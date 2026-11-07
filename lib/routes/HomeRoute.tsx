import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { defaultSettings, type SiteSettings } from '@/lib/types'
import { HomePage } from '@/components/HomePage'
import { mergeDirectoryCategoryAppearance } from '@/lib/directory'
import { mergeHomeSections } from '@/lib/homeSections'
import { buildAlternates, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { DEFAULT_SPONSOR_BANNERS } from '@/lib/banners'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { JsonLd } from '@/components/JsonLd'
import { homeJsonLd } from '@/lib/seo/homeJsonld'
import { HOME_TITLE, HOME_DESCRIPTION } from '@/lib/seo/meta'

export async function generateHomeMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const alternates = buildAlternates('/')
  const canonicalUrl = localeUrl(locale, '/')
  // 2026-11-07 SEO: 홈 title/description에 검색 키워드 반영 (lib/seo/meta.ts 값 사용, 없으면 기존 값)
  const siteTitle = HOME_TITLE[locale] || HOME_TITLE.en
  const siteDescription = HOME_DESCRIPTION[locale] || dict.home.heroDescription
  return {
    title: { absolute: siteTitle },
    description: siteDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export async function renderHomeRoute(locale: Locale = 'en') {
  const supabase = createPublicClient()
  const [
    { data: settingRow },
    { data: categorySettingRow },
    { data: homeSectionsRow },
    { data: stories },
    { data: banners },
    { data: eventRows },
    { data: latestEventRows },
  ] = await Promise.all([
    supabase.from('site_settings').select('value').eq('key', 'appearance').maybeSingle(),
    supabase.from('site_settings').select('value').eq('key', 'directory_categories').maybeSingle(),
    supabase.from('site_settings').select('value').eq('key', 'home_sections').maybeSingle(),
    supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .not('content_type', 'in', '(event,guide)')
      .order('published_at', { ascending: false })
      .limit(3),
    supabase
      .from('sponsor_banners')
      .select('slot_key,title,subtitle,image_url,target_url,size,sort_order')
      .eq('is_active', true)
      .order('sort_order'),
    supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .eq('content_type', 'event')
      .order('event_date', { ascending: true })
      .limit(1),
    supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .eq('content_type', 'event')
      .order('published_at', { ascending: false })
      .limit(3),
  ])
  // 홈 하단 피드: DB + 저장소 내 게시물을 합쳐 최신순 3개
  const latestOf = (rows: any[] | null, inRepo: (t: string) => boolean) => {
    const dbRows = rows || []
    const slugs = new Set(dbRows.map((r: any) => r.slug))
    return [
      ...dbRows,
      ...PUBLISHED_EVENTS.filter((e) => e.status === 'published' && inRepo(e.content_type) && !slugs.has(e.slug)),
    ]
      .sort((a: any, b: any) => +new Date(b.published_at || 0) - +new Date(a.published_at || 0))
      .slice(0, 3)
  }
  const homeNews = latestOf(stories, (t) => t !== 'event' && t !== 'guide')
  const homeEvents = latestOf(latestEventRows, (t) => t === 'event')
  const settings = { ...defaultSettings, ...((settingRow?.value || {}) as Partial<SiteSettings>) }
  const categoryAppearance = mergeDirectoryCategoryAppearance(categorySettingRow?.value)
  const homeSections = mergeHomeSections(homeSectionsRow?.value)
  const effectiveBanners = banners && banners.length > 0 ? banners : DEFAULT_SPONSOR_BANNERS
  const defaultSunsetEvent = PUBLISHED_EVENTS.find((e) => e.slug === 'phu-quoc-halloween-sunset-town-hon-thom') || PUBLISHED_EVENTS[0]
  const effectiveEvent = eventRows?.[0] || defaultSunsetEvent || null

  return (
    <>
      <JsonLd data={homeJsonLd(locale, getDictionary(locale).home.heroDescription)} />
      <HomePage
        settings={settings}
        categoryAppearance={categoryAppearance}
        stories={homeNews}
        events={homeEvents}
        banners={effectiveBanners}
        event={effectiveEvent}
        homeSections={homeSections}
        locale={locale}
      />
    </>
  )
}
