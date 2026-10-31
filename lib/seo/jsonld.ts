import { SITE_URL } from '@/lib/supabase/config'
import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { HREFLANG, localeUrl, type Locale } from '@/lib/i18n/config'

type Json = Record<string, unknown>

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const PHU_QUOC_PLACE = { '@type': 'Place', name: 'Phu Quoc, Vietnam' }

export function absUrl(u?: string | null): string | undefined {
  if (!u) return undefined
  if (/^https?:\/\//i.test(u)) return u
  return `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`
}

export function inLanguage(locale: Locale): string {
  return HREFLANG[locale] || 'en'
}

/** Drop undefined / null / empty-string / empty-array fields so output stays clean. */
export function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clean).filter((v) => v !== undefined) as unknown as T
  if (value && typeof value === 'object') {
    const out: Json = {}
    for (const [k, v] of Object.entries(value as Json)) {
      const c = clean(v)
      if (c === undefined || c === null || c === '') continue
      if (Array.isArray(c) && c.length === 0) continue
      out[k] = c
    }
    return out as T
  }
  return value
}

export function organizationRef(): Json {
  return { '@type': 'Organization', '@id': ORG_ID, name: 'My Phu Quoc', url: SITE_URL }
}

export function organizationJsonLd(): Json {
  return clean({
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'My Phu Quoc',
    url: SITE_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84907994188',
      contactType: 'customer service',
    },
  })
}

export function websiteJsonLd(locale: Locale): Json {
  return clean({
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'My Phu Quoc',
    url: SITE_URL,
    inLanguage: inLanguage(locale),
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  })
}

export function faqJsonLd(items: { q: string; a: string }[], locale: Locale): Json | null {
  if (!items.length) return null
  return {
    '@type': 'FAQPage',
    inLanguage: inLanguage(locale),
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

/** Wrap several nodes in a single @graph script. */
export function graph(...nodes: (Json | null | undefined)[]): Json {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean).map((n) => clean(n as Json)) }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function serviceJsonLd(opts: {
  name: string
  description: string
  url: string
  image?: string
  locale: Locale
  serviceType?: string
}): Json {
  return clean({
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: absUrl(opts.image),
    serviceType: opts.serviceType,
    inLanguage: inLanguage(opts.locale),
    provider: organizationRef(),
    areaServed: 'Sunset Town, Phu Quoc',
    availableChannel: [
      { '@type': 'ServiceChannel', name: 'WhatsApp', serviceUrl: CONTACT_CONFIG.whatsappUrl },
      { '@type': 'ServiceChannel', name: 'Zalo', serviceUrl: CONTACT_CONFIG.zaloUrl },
    ],
  })
}

export function pageUrl(locale: Locale, barePath: string): string {
  return localeUrl(locale, barePath)
}
