import type { Metadata } from 'next'
import { getAllHotels, type HotelArea } from '@/lib/hotels'
import { HotelsPage } from '@/components/HotelsPage'
import type { Locale } from '@/lib/i18n/config'
import { HOTEL_TRANSLATIONS } from '@/lib/i18n/hotelTranslations'
import { SITE_URL } from '@/lib/supabase/config'

export function generateHotelsMetadata(locale: Locale = 'en', searchParams?: { area?: string }): Metadata {
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en
  const isKhem = searchParams?.area === 'khem-beach'
  const title = `${isKhem ? t.pageTitleKhemBeach : t.pageTitleSunsetTown} | MyPhuQuoc.NET`
  const description = isKhem ? t.pageSubtitleKhemBeach : t.pageSubtitleSunsetTown

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/hotels${isKhem ? '?area=khem-beach' : ''}`,
      images: [
        {
          url: isKhem
            ? '/zones/khem-beach/images/jw-marriott-phu-quoc-emerald-bay/jw-marriott-overview.jpg'
            : '/images/hotels/the-room-hotel/photo_01.jpg',
          width: 1024,
          height: 768,
          alt: isKhem ? 'Khem Beach Resorts Phu Quoc' : 'Sunset Town Hotels Phu Quoc',
        },
      ],
    },
  }
}

export function renderHotelsRoute(locale: Locale = 'en', initialArea?: HotelArea) {
  const hotels = getAllHotels()
  return <HotelsPage hotels={hotels} locale={locale} initialArea={initialArea} />
}
