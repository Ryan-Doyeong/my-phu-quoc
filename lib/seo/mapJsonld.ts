import { SUNSET_LANDMARKS } from '@/lib/sunsetMapData'
import { localeUrl, type Locale } from '@/lib/i18n/config'
import { absUrl, breadcrumbJsonLd, graph, inLanguage, PHU_QUOC_PLACE } from '@/lib/seo/jsonld'
import { sunsetKeyword } from '@/lib/seo/meta'

export function mapPageJsonLd(locale: Locale, homeLabel: string) {
  const url = localeUrl(locale, '/map')
  return graph(
    {
      '@type': 'ItemList',
      name: `${sunsetKeyword(locale)} – 12 landmarks`,
      url,
      inLanguage: inLanguage(locale),
      numberOfItems: SUNSET_LANDMARKS.length,
      itemListElement: SUNSET_LANDMARKS.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'TouristAttraction',
          name: l.name[locale] || l.name.en,
          description: l.description[locale] || l.description.en,
          image: absUrl(l.image),
          containedInPlace: PHU_QUOC_PLACE,
          geo: Number.isFinite(l.lat) && Number.isFinite(l.lng)
            ? { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng }
            : undefined,
          hasMap: l.googleMapsUrl,
        },
      })),
    },
    breadcrumbJsonLd([
      { name: homeLabel, url: localeUrl(locale, '/') },
      { name: sunsetKeyword(locale), url },
    ])
  )
}
