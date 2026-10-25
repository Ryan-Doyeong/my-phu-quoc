import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { defaultSettings, type SiteSettings } from '@/lib/types'
import { HomePage } from '@/components/HomePage'
import { mergeDirectoryCategoryAppearance } from '@/lib/directory'
import { mergeHomeSections } from '@/lib/homeSections'
import { buildAlternates, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function generateHomeMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const alternates = buildAlternates('/')
  const canonicalUrl = localeUrl(locale, '/')
  const siteTitle = 'Good life in Phu Quoc'
  return {
    title: siteTitle,
    description: dict.home.heroDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: siteTitle,
      description: dict.home.heroDescription,
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
  return (
    <HomePage
      settings={settings}
      categoryAppearance={categoryAppearance}
      stories={stories || []}
      banners={banners || []}
      event={eventRows?.[0] || null}
      homeSections={homeSections}
      locale={locale}
    />
  )
}
