import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/config'
import { CONTEXT_CTA_STRINGS, pickLocale, type ContextCtaKey } from '@/lib/i18n/uiStrings'
import { buildWhatsAppLink } from '@/lib/contactLinks'

export interface ContextCtaProps {
  locale: Locale
  variant: 'business' | 'hotel' | 'news' | 'zone'
  contextName?: string
  zone?: 'sunset-town' | 'khem-beach'
}

/** Compact contextual conversion card (buggy tour / transfer / WhatsApp). Server-safe. */
export function ContextCta({ locale, variant, contextName, zone = 'sunset-town' }: ContextCtaProps) {
  const key: ContextCtaKey =
    variant === 'zone' ? (zone === 'khem-beach' ? 'zoneKhem' : 'zoneSunset') : variant
  const c = CONTEXT_CTA_STRINGS[key]
  const isKhem = (variant === 'zone' && zone === 'khem-beach')

  let primaryHref = localePath(locale, '/buggy-tour')
  if (variant === 'hotel' || isKhem) primaryHref = localePath(locale, '/taxi-tour')

  const source = `context-${variant}`
  let secondary: React.ReactNode
  if (variant === 'news') {
    secondary = (
      <Link href={localePath(locale, '/itineraries')} className="contextCtaBtn ghost" data-cta-source={source}>
        {pickLocale(c.secondary, locale)}
      </Link>
    )
  } else {
    const prefill = c.prefill ? pickLocale(c.prefill, locale).replace('{name}', contextName || '') : undefined
    secondary = (
      <a
        href={buildWhatsAppLink(prefill)}
        target="_blank"
        rel="noopener noreferrer"
        className="contextCtaBtn ghost"
        data-cta="whatsapp"
        data-cta-source={source}
      >
        {pickLocale(c.secondary, locale)}
      </a>
    )
  }

  return (
    <aside className={`contextCta${isKhem ? ' khem' : ''}`} data-cta-source={source}>
      <p className="contextCtaEyebrow">{pickLocale(c.eyebrow, locale)}</p>
      <h2 className="contextCtaTitle">{pickLocale(c.headline, locale)}</h2>
      <p className="contextCtaBody">{pickLocale(c.body, locale)}</p>
      <div className="contextCtaActions">
        <Link href={primaryHref} className="contextCtaBtn primary" data-cta-source={source}>
          {pickLocale(c.primary, locale)}
        </Link>
        {secondary}
      </div>
    </aside>
  )
}

export default ContextCta
