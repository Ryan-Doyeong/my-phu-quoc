import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { defaultSettings, type SiteSettings } from '@/lib/types'
import { HomePage } from '@/components/HomePage'
import { mergeDirectoryCategoryAppearance } from '@/lib/directory'
import { mergeHomeSections } from '@/lib/homeSections'
import { buildAlternates, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { DEFAULT_SPONSOR_BANNERS } from '@/lib/banners'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { JsonLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/supabase/config'
import { SUNSET_LANDMARKS } from '@/lib/sunsetMapData'
import { INTER_ZONE_TRANSIT } from '@/lib/zones'
import { HOME_DESCRIPTION, HOME_FAQ_Q, HOME_TITLE } from '@/lib/seo/meta'
import { faqJsonLd, graph, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'

export async function generateHomeMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const alternates = buildAlternates('/')
  const canonicalUrl = localeUrl(locale, '/')
  const title = HOME_TITLE[locale] || HOME_TITLE.en
  const description = HOME_DESCRIPTION[locale] || HOME_DESCRIPTION.en
  const ogImage = `${SITE_URL}/hero/02_kiss_bridge_aerial_1920.webp`
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'My Phu Quoc',
      type: 'website',
      locale: ogLocaleFor(locale),
      images: [{ url: ogImage, width: 1920, height: 1080, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

function buildHomeJsonLd(locale: Locale) {
  const lm = (id: string) => SUNSET_LANDMARKS.find((l) => l.id === id)
  const pickL = (m: Record<string, string> | undefined) => (m ? m[locale] || m.en : '')
  const faq: { q: string; a: string }[] = []
  faq.push({
    q: pickL(HOME_FAQ_Q.distance),
    a: `${pickL(INTER_ZONE_TRANSIT.headline as Record<string, string>)}. ${pickL(INTER_ZONE_TRANSIT.description as Record<string, string>)}`,
  })
  const show = lm('kiss-of-the-sea')
  if (show) {
    faq.push({
      q: pickL(HOME_FAQ_Q.fireworks),
      a: `${pickL(show.tips as Record<string, string>)} (${pickL({ en: 'Check the official schedule before you go.', ko: '방문 전 공식 일정을 확인하세요.', zh: '出行前请确认官方演出时间。', ru: 'Перед визитом уточните официальное расписание.', ja: '訪問前に公式日程をご確認ください。', hi: 'जाने से पहले आधिकारिक समय-सारिणी देखें।' })})`,
    })
  }
  const cable = lm('cable-car-station')
  if (cable) faq.push({ q: pickL(HOME_FAQ_Q.cable), a: pickL(cable.description as Record<string, string>) })
  const bridge = lm('kiss-bridge')
  if (bridge) faq.push({ q: pickL(HOME_FAQ_Q.bridge), a: pickL(bridge.description as Record<string, string>) })
  return graph(
    websiteJsonLd(locale),
    organizationJsonLd(),
    faqJsonLd(faq, locale)
  )
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
  ] = await Promise.all([
    supabase.from('site_settings').select('value').eq('key', 'appearance').maybeSingle(),
    supabase.from('site_settings').select('value').eq('key', 'directory_categories').maybeSingle(),
    supabase.from('site_settings').select('value').eq('key', 'home_sections').maybeSingle(),
    supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .neq('content_type', 'event')
      .order('published_at', { ascending: false })
      .limit(4),
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
  ])
  const settings = { ...defaultSettings, ...((settingRow?.value || {}) as Partial<SiteSettings>) }
  const categoryAppearance = mergeDirectoryCategoryAppearance(categorySettingRow?.value)
  const homeSections = mergeHomeSections(homeSectionsRow?.value)
  const effectiveBanners = banners && banners.length > 0 ? banners : DEFAULT_SPONSOR_BANNERS
  const defaultSunsetEvent = PUBLISHED_EVENTS.find((e) => e.slug === 'phu-quoc-halloween-sunset-town-hon-thom') || PUBLISHED_EVENTS[0]
  const effectiveEvent = eventRows?.[0] || defaultSunsetEvent || null

  return (
    <>
      <JsonLd data={buildHomeJsonLd(locale)} />
      <HomePage
        settings={settings}
        categoryAppearance={categoryAppearance}
        stories={stories || []}
        banners={effectiveBanners}
        event={effectiveEvent}
        homeSections={homeSections}
        locale={locale}
      />
    </>
  )
}
