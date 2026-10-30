import type { Metadata } from 'next'
import { TourLandingPage } from '@/components/TourLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { SITE_URL } from '@/lib/supabase/config'

export function generateTourMetadata(
  type: 'buggy' | 'taxi',
  locale: Locale = 'en'
): Metadata {
  const dict = getDictionary(locale)
  const isBuggy = type === 'buggy'
  const tourData = isBuggy ? dict.buggyTour : dict.taxiTour
  const path = isBuggy ? '/buggy-tour' : '/taxi-tour'

  const title = `${tourData.pageTitle} | My Phu Quoc`
  const description = tourData.heroSubtitle
  const canonical = localeUrl(locale, path)
  const alternates = buildAlternates(path)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'My Phu Quoc',
      locale: ogLocaleFor(locale),
      type: 'website',
      images: [
        {
          url: isBuggy
            ? `${SITE_URL}/banners/phu_quoc_buggy_tour_v5.webp`
            : `${SITE_URL}/banners/phu_quoc_taxi_tour_v5.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  }
}

export function renderTourRoute(type: 'buggy' | 'taxi', locale: Locale = 'en') {
  return <TourLandingPage type={type} locale={locale} />
}
