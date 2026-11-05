import { MARMORIS_YACHT_TOURS } from '@/lib/activities/marmorisYacht'
import { localeUrl, type Locale } from '@/lib/i18n/config'
import { SITE_URL } from '@/lib/supabase/config'
import { graph, inLanguage, organizationJsonLd, websiteJsonLd, ORG_ID } from '@/lib/seo/jsonld'

/** 홈 JSON-LD: Organization + WebSite + WebPage + 요금이 공개된 액티비티(Service/Offer) 목록. */
export function homeJsonLd(locale: Locale, description: string) {
  const activitiesUrl = localeUrl(locale, '/activities')
  const tours = MARMORIS_YACHT_TOURS.map((t) => ({
    '@type': 'Service',
    name: t.title.en || t.id,
    serviceType: 'Yacht tour',
    url: activitiesUrl,
    provider: { '@type': 'Organization', name: t.operator },
    areaServed: 'Phu Quoc, Vietnam',
    offers: t.classes.map((c) => ({
      '@type': 'Offer',
      name: c.name.en || c.name.ko,
      price: c.priceVnd,
      priceCurrency: 'VND',
      url: activitiesUrl,
    })),
  }))
  return graph(
    organizationJsonLd(),
    websiteJsonLd(locale),
    {
      '@type': 'WebPage',
      '@id': `${localeUrl(locale, '/')}#webpage`,
      url: localeUrl(locale, '/'),
      name: 'My Phu Quoc',
      description,
      inLanguage: inLanguage(locale),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORG_ID },
    },
    {
      '@type': 'ItemList',
      name: 'Activities with listed prices (VND)',
      url: activitiesUrl,
      itemListElement: tours.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
    }
  )
}
