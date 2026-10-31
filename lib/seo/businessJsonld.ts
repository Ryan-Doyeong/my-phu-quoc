import { localeUrl, type Locale } from '@/lib/i18n/config'
import { absUrl, breadcrumbJsonLd, clean, graph, inLanguage } from '@/lib/seo/jsonld'

const CUISINE: Record<string, string> = {
  korean: 'Korean',
  vietnamese: 'Vietnamese',
  seafood: 'Seafood',
  western: 'Western',
  international: 'International',
}

export function schemaTypeFor(category: string, subcategory?: string | null): string {
  const sub = (subcategory || '').toLowerCase()
  switch (category) {
    case 'dining':
      return sub === 'cafe' ? 'CafeOrCoffeeShop' : 'Restaurant'
    case 'bars':
      return sub === 'cafe' ? 'CafeOrCoffeeShop' : 'BarOrPub'
    case 'hotels':
      return 'LodgingBusiness'
    case 'wellness':
      return 'HealthAndBeautyBusiness'
    case 'shopping':
      return 'Store'
    default:
      return 'LocalBusiness'
  }
}

/** Split a raw address string into a PostalAddress. Strips Vietnam / 베트남 and the locality tail. */
export function buildPostalAddress(raw?: string | null) {
  if (!raw) return undefined
  let addr = raw.replace(/베트남/g, '').replace(/\(.*?\)\s*$/, '').trim()
  const parts = addr.split(',').map((p) => p.trim()).filter(Boolean)
  let postalCode: string | undefined
  while (parts.length > 1) {
    const last = parts[parts.length - 1]
    const m = last.match(/(\d{5,6})\s*$/)
    if (/^(vietnam|việt nam)$/i.test(last)) { parts.pop(); continue }
    if (/^(an giang|phú quốc|phu quoc|thành phố phú quốc)(\s+\d{5,6})?$/i.test(last)) {
      if (m) postalCode = m[1]
      parts.pop()
      continue
    }
    break
  }
  const streetAddress = parts.join(', ')
  if (!streetAddress) return undefined
  return {
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality: 'Phu Quoc',
    addressRegion: 'An Giang',
    postalCode,
    addressCountry: 'VN',
  }
}

export function businessJsonLd(opts: {
  b: any
  locale: Locale
  name: string
  description?: string
  imageUrl?: string | null
  openingHours?: string[]
  categoryLabel: string
  homeLabel: string
}) {
  const { b, locale, name } = opts
  const pageUrl = localeUrl(locale, `/business/${b.slug}`)
  const lat = Number(b.lat ?? b.latitude)
  const lng = Number(b.lng ?? b.longitude)
  const hasGeo = b.lat != null && b.lng != null && Number.isFinite(lat) && Number.isFinite(lng)
  const sameAs = [b.website_url, b.facebook_url, b.instagram_url, b.tiktok_url]
    .filter((u): u is string => typeof u === 'string' && /^https?:\/\//i.test(u))
  const cuisine = b.category === 'dining' ? CUISINE[String(b.subcategory || '').toLowerCase()] : undefined
  const node = {
    '@type': schemaTypeFor(b.category, b.subcategory),
    '@id': `${pageUrl}#business`,
    name,
    description: opts.description,
    url: pageUrl,
    image: absUrl(opts.imageUrl),
    telephone: b.phone || undefined,
    address: buildPostalAddress(b.address),
    geo: hasGeo ? { '@type': 'GeoCoordinates', latitude: lat, longitude: lng } : undefined,
    hasMap: b.google_maps_url || undefined,
    openingHours: opts.openingHours,
    servesCuisine: cuisine,
    sameAs,
    inLanguage: inLanguage(locale),
  }
  return graph(
    node,
    breadcrumbJsonLd([
      { name: opts.homeLabel, url: localeUrl(locale, '/') },
      { name: opts.categoryLabel, url: localeUrl(locale, `/directory/${b.category}`) },
      { name, url: pageUrl },
    ])
  )
}

export { clean }
