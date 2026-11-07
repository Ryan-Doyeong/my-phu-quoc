import type { Metadata } from 'next'
import { ShowsHubPage } from '@/components/ShowsHubPage'
import { buildAlternates, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getShowsHubCopy } from '@/lib/showsHubCopy'

const BARE_PATH = '/sunset-town-shows'

export function generateShowsMetadata(locale: Locale = 'en'): Metadata {
  const c = getShowsHubCopy(locale)
  const canonical = localeUrl(locale, BARE_PATH)
  const alternates = buildAlternates(BARE_PATH)
  return {
    title: { absolute: c.title },
    description: c.meta,
    alternates: { canonical, languages: alternates.languages },
    openGraph: {
      title: c.title,
      description: c.meta,
      url: canonical,
      siteName: 'My Phu Quoc',
      locale: ogLocaleFor(locale),
      type: 'website',
    },
  }
}

export function renderShowsRoute(locale: Locale = 'en') {
  return <ShowsHubPage locale={locale} />
}
