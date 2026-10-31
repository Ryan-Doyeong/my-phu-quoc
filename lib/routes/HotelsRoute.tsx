import type { Metadata } from 'next'
import { getAllHotels, type HotelArea } from '@/lib/hotels'
import { HotelsPage } from '@/components/HotelsPage'
import { JsonLd } from '@/components/JsonLd'
import { buildAlternates, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { HOTEL_TRANSLATIONS } from '@/lib/i18n/hotelTranslations'
import { HOTELS_TITLE, withZoneKeyword } from '@/lib/seo/meta'
import { hotelsJsonLd } from '@/lib/seo/hotelsJsonld'
import { SITE_URL } from '@/lib/supabase/config'

export function generateHotelsMetadata(locale: Locale = 'en', searchParams?: { area?: string }): Metadata {
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en
  const isKhem = searchParams?.area === 'khem-beach'
  const zoneKey = isKhem ? 'khem-beach' : 'sunset-town'
  const title = HOTELS_TITLE[zoneKey][locale] || HOTELS_TITLE[zoneKey].en
  const description = withZoneKeyword(isKhem ? t.pageSubtitleKhemBeach : t.pageSubtitleSunsetTown, zoneKey, locale)
  const canonical = localeUrl(locale, '/hotels') + (isKhem ? '?area=khem-beach' : '')
  const image = `${SITE_URL}${
    isKhem
      ? '/zones/khem-beach/images/jw-marriott-phu-quoc-emerald-bay/jw-marriott-overview.jpg'
      : '/images/hotels/the-room-hotel/photo_01.jpg'
  }`

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(isKhem ? {} : { languages: buildAlternates('/hotels').languages }),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'My Phu Quoc',
      type: 'website',
      locale: ogLocaleFor(locale),
      images: [
        {
          url: image,
          width: 1024,
          height: 768,
          alt: isKhem ? 'Khem Beach Resorts Phu Quoc' : 'Sunset Town Hotels Phu Quoc',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export function renderHotelsRoute(locale: Locale = 'en', initialArea?: HotelArea) {
  const hotels = getAllHotels()
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en
  const dict = getDictionary(locale)
  const area: HotelArea = initialArea === 'khem-beach' ? 'khem-beach' : 'sunset-town'
  const listName = area === 'khem-beach' ? t.pageTitleKhemBeach : t.pageTitleSunsetTown
  return (
    <>
      <JsonLd data={hotelsJsonLd(locale, area, listName, dict.nav.home)} />
      <HotelsPage hotels={hotels} locale={locale} initialArea={initialArea} />
    </>
  )
}
