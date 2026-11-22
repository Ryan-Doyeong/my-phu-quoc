import type { Metadata } from 'next'
import { getAllHotels } from '@/lib/hotels'
import { HotelsPage } from '@/components/HotelsPage'
import { buildAlternates, localeUrl, type Locale } from '@/lib/i18n/config'
import { HOTEL_TRANSLATIONS, localizeHotel } from '@/lib/i18n/hotelTranslations'

const HOTELS_SEO: Partial<Record<Locale, { title: string; description: string }>> = {
  ko: {
    title: '푸꾸옥 선셋타운·켐비치 호텔 한눈에 비교 | 마이 푸꾸옥',
    description: '푸꾸옥 남부 선셋타운의 호텔과 켐비치 리조트를 한눈에 비교해 보세요.',
  },
  en: {
    title: 'Sunset Town & Khem Beach Hotels, Phu Quoc at a Glance | My Phu Quoc',
    description: 'Compare hotels in Sunset Town and resorts at Khem Beach in southern Phu Quoc at a glance.',
  },
}

export function generateHotelsMetadata(locale: Locale = 'en'): Metadata {
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en
  const seo = HOTELS_SEO[locale]
  const titleText = seo ? seo.title : `${t.pageTitle} | MyPhuQuoc.NET`
  const title = seo ? { absolute: seo.title } : titleText
  const description = seo ? seo.description : t.pageSubtitle

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
      title: titleText,
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
