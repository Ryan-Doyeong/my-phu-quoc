import type { Metadata } from 'next'
import { getAllHotels } from '@/lib/hotels'
import { HotelsPage } from '@/components/HotelsPage'
import { buildAlternates, localeUrl, type Locale } from '@/lib/i18n/config'
import { HOTEL_TRANSLATIONS, localizeHotel } from '@/lib/i18n/hotelTranslations'

export function generateHotelsMetadata(locale: Locale = 'en'): Metadata {
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en
  const title = `${t.pageTitle} | MyPhuQuoc.NET`
  const description = t.pageSubtitle

  // 2026-11-07 SEO: 호텔 페이지에 canonical + hreflang 추가 (기존엔 둘 다 없었음), OG url도 언어별로
  const alternates = buildAlternates('/hotels')
  const canonicalUrl = localeUrl(locale, '/hotels')
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: '/images/hotels/the-room-hotel/the-room-hotel-oceanview-room.jpg',
          width: 1024,
          height: 768,
          alt: 'Sunset Town Hotels Phu Quoc',
        },
      ],
    },
  }
}

export function renderHotelsRoute(locale: Locale = 'en') {
  const hotels = getAllHotels().map(h => localizeHotel(h, locale))
  return <HotelsPage hotels={hotels} locale={locale} />
}
