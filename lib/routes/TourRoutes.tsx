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
import { JsonLd } from '@/components/JsonLd'
import { TOUR_TITLE, withKeyword, clip } from '@/lib/seo/meta'
import { breadcrumbJsonLd, graph, serviceJsonLd } from '@/lib/seo/jsonld'

export function generateTourMetadata(
  type: 'buggy' | 'taxi',
  locale: Locale = 'en'
): Metadata {
  const dict = getDictionary(locale)
  const isBuggy = type === 'buggy'
  const tourData = isBuggy ? dict.buggyTour : dict.taxiTour
  const path = isBuggy ? '/buggy-tour' : '/taxi-tour'

  const title = TOUR_TITLE[type][locale] || TOUR_TITLE[type].en
  const description = isBuggy ? withKeyword(tourData.heroSubtitle, locale) : clip(tourData.heroSubtitle)
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        isBuggy
          ? `${SITE_URL}/banners/phu_quoc_buggy_tour_v5.webp`
          : `${SITE_URL}/banners/phu_quoc_taxi_tour_v5.webp`,
      ],
    },
  }
}

export function renderTourRoute(type: 'buggy' | 'taxi', locale: Locale = 'en') {
  const dict = getDictionary(locale)
  const isBuggy = type === 'buggy'
  const tourData = isBuggy ? dict.buggyTour : dict.taxiTour
  const path = isBuggy ? '/buggy-tour' : '/taxi-tour'
  const url = localeUrl(locale, path)
  const jsonLd = graph(
    serviceJsonLd({
      name: tourData.pageTitle,
      description: tourData.heroSubtitle,
      url,
      image: isBuggy ? '/banners/phu_quoc_buggy_tour_v5.webp' : '/banners/phu_quoc_taxi_tour_v5.webp',
      locale,
      serviceType: isBuggy ? 'Buggy tour' : 'Vehicle tour',
    }),
    breadcrumbJsonLd([
      { name: dict.nav.home, url: localeUrl(locale, '/') },
      { name: tourData.pageTitle, url },
    ])
  )
  return (
    <>
      <JsonLd data={jsonLd} />
      <TourLandingPage type={type} locale={locale} />
    </>
  )
}
