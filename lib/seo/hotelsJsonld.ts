import { getAllHotels, getHotelsByArea, type HotelArea, type HotelItem } from '@/lib/hotels'
import { localeUrl, type Locale } from '@/lib/i18n/config'
import { absUrl, breadcrumbJsonLd, graph, inLanguage } from '@/lib/seo/jsonld'

function hotelNode(h: HotelItem) {
  // Strip the Korean parenthetical zone note, e.g. "(선셋타운 베니스 거리)"
  const address = (h.address || '').replace(/\s*\([^)]*\)\s*$/, '').replace(/,?\s*Vietnam\b/i, '').trim()
  return {
    '@type': 'Hotel',
    name: h.name_en || h.name_ko,
    image: absUrl(h.photos?.[0]),
    url: h.agodaUrl,
    address: address
      ? { '@type': 'PostalAddress', streetAddress: address, addressLocality: 'Phu Quoc', addressRegion: 'An Giang', addressCountry: 'VN' }
      : undefined,
    checkinTime: h.checkIn,
    checkoutTime: h.checkOut,
  }
}

export function hotelsJsonLd(locale: Locale, area: HotelArea | undefined, listName: string, homeLabel: string) {
  const hotels = area ? getHotelsByArea(area) : getAllHotels()
  const url = localeUrl(locale, '/hotels') + (area === 'khem-beach' ? '?area=khem-beach' : '')
  return graph(
    {
      '@type': 'ItemList',
      name: listName,
      url,
      inLanguage: inLanguage(locale),
      numberOfItems: hotels.length,
      itemListElement: hotels.map((h, i) => ({ '@type': 'ListItem', position: i + 1, item: hotelNode(h) })),
    },
    breadcrumbJsonLd([
      { name: homeLabel, url: localeUrl(locale, '/') },
      { name: listName, url },
    ])
  )
}
