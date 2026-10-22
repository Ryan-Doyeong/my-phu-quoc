import { MetadataRoute } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { DIRECTORY_CATEGORY_KEYS } from '@/lib/directory'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { LOCALES, buildAlternates, localeUrl, type Locale } from '@/lib/i18n/config'

// Rebuild hourly so newly published stories appear without a redeploy
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPaths = [
    '/',
    ...DIRECTORY_CATEGORY_KEYS.map((key) => `/directory/${key}`),
    '/news',
    '/news/events',
    '/impact',
    '/member',
    '/for-businesses',
    '/partners',
  ]

  const routes: MetadataRoute.Sitemap = []

  // 1) Static & Category routes exist in all 3 locales (EN, VI, KO)
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

    // 2) Published businesses exist in all 3 locales (EN, VI, KO) with localized UI/curation
    const { data: businesses } = await supabase
      .from('businesses')
      .select('slug, updated_at')
      .eq('status', 'published')

    if (businesses) {
      businesses.forEach((b: any) => {
        if (b.slug) {
          const barePath = `/business/${b.slug}`
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

    // 3) Published stories: ONLY include VI/KO URLs if body_vi / body_ko is actually populated!
    // Untranslated fallback pages (/vi/news/[slug], /ko/news/[slug]) have noindex and MUST NOT be in sitemap or hreflang.
    const { data: stories } = await supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')

    const dbStorySlugs = new Set((stories || []).map((s: any) => s.slug))
    const allStories = [
      ...(stories || []),
      ...PUBLISHED_EVENTS.filter((e) => !dbStorySlugs.has(e.slug)),
    ]

    if (allStories.length > 0) {
      allStories.forEach((s: any) => {
        if (s.slug) {
          const barePath = `/news/${s.slug}`
          const lastModified = s.updated_at ? new Date(s.updated_at) : now
          const availableLocales: Locale[] = ['en']
          if (typeof s.body_vi === 'string' && s.body_vi.trim().length > 0) {
            availableLocales.push('vi')
          }
          if (typeof s.body_ko === 'string' && s.body_ko.trim().length > 0) {
            availableLocales.push('ko')
          }
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
