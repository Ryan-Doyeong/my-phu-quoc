import { MetadataRoute } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { DIRECTORY_CATEGORY_KEYS } from '@/lib/directory'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { storyAvailableLocales } from '@/lib/i18n/dictionaries'
import { LOCALES, buildAlternates, localeUrl, type Locale } from '@/lib/i18n/config'

// Rebuild hourly so newly published stories appear without a redeploy
export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPaths = [
    '/',
    '/zones/sunset-town',
    '/zones/khem-beach',
    ...DIRECTORY_CATEGORY_KEYS.map((key) => `/directory/${key}`),
    '/news',
    '/events',
    '/for-businesses',
    '/partners',
  ]

  const routes: MetadataRoute.Sitemap = []

  // 1) Static & Category routes exist in all all 7 locales
  for (const barePath of staticPaths) {
    const alternates = buildAlternates(barePath, LOCALES)
    for (const loc of LOCALES) {
      routes.push({
        url: localeUrl(loc, barePath),
        lastModified: now,
        alternates: {
          languages: alternates.languages,
        },
      })
    }
  }

  try {
    const supabase = await createPublicClient()

    // 2) Published businesses exist in all all 7 locales with localized UI/curation
    const { data: businesses } = await supabase
      .from('businesses')
      .select('slug, updated_at')
      .eq('status', 'published')

    if (businesses) {
      businesses.forEach((b: any) => {
        let bSlug = b.slug
        if (bSlug === "sunset-house-phu-quoc-buggy-sevices") bSlug = "sunset-house-phu-quoc-buggy-services"
        if (bSlug === "l-a-hillside-aparment-sunset-town-phu-quoc") bSlug = "l-a-hillside-apartment-sunset-town-phu-quoc"
        if (bSlug) {
          const barePath = `/business/${bSlug}`
          const lastModified = b.updated_at ? new Date(b.updated_at) : now
          const alternates = buildAlternates(barePath, LOCALES)
          for (const loc of LOCALES) {
            routes.push({
              url: localeUrl(loc, barePath),
              lastModified,
              alternates: {
                languages: alternates.languages,
              },
            })
          }
        }
      })
    }

    // 3) Published stories: ONLY include a translated URL if body_<locale> is actually populated!
    // Untranslated fallback pages (/<locale>/news/[slug]) have noindex and MUST NOT be in sitemap or hreflang.
    const { data: stories } = await supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')

    const dbStorySlugs = new Set((stories || []).map((s: any) => s.slug))
    const allStories = [
      ...(stories || []),
      ...PUBLISHED_EVENTS.filter((e) => !dbStorySlugs.has(e.slug)),
    ]

    const DELETED_SLUGS = new Set([
      'spooky-halloween-mask-making-kids-thao-dien',
      'sample-thao-dien-weekend-farmers-craft-market',
      'sample-riverside-morning-yoga-breathwork-session',
    ])

    if (allStories.length > 0) {
      allStories.forEach((s: any) => {
        if (DELETED_SLUGS.has(s.slug)) return
        if (s.slug) {
          const barePath = `${s.content_type === 'event' ? '/events' : '/news'}/${s.slug}`
          const lastModified = s.updated_at ? new Date(s.updated_at) : now
          const availableLocales: Locale[] = storyAvailableLocales(s)
          const alternates = buildAlternates(barePath, availableLocales)
          for (const loc of availableLocales) {
            routes.push({
              url: localeUrl(loc, barePath),
              lastModified,
              alternates: {
                languages: alternates.languages,
              },
            })
          }
        }
      })
    }
  } catch (error) {
    console.error('Sitemap generation error, falling back to static routes:', error)
  }

  return routes
}
