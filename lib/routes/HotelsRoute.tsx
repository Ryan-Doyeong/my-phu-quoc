import type { Metadata } from 'next'
import { getAllHotels } from '@/lib/hotels'
import { HotelsPage } from '@/components/HotelsPage'
import type { Locale } from '@/lib/i18n/config'
import { HOTEL_TRANSLATIONS } from '@/lib/i18n/hotelTranslations'
import { SITE_URL } from '@/lib/supabase/config'

export function generateHotelsMetadata(locale: Locale = 'en'): Metadata {
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en
  const title = `${t.pageTitle} | MyPhuQuoc.NET`
  const description = t.pageSubtitle

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/hotels`,
      images: [
        {
          url: '/images/hotels/the-room-hotel/photo_01.jpg',
          width: 1024,
          height: 768,
          alt: 'Sunset Town Hotels Phu Quoc',
        },
      ],
    },
  }
}

export function renderHotelsRoute(locale: Locale = 'en') {
  const hotels = getAllHotels()
  return <HotelsPage hotels={hotels} locale={locale} />
}
