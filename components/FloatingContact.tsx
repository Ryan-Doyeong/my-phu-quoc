'use client'

import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'
import { buildWhatsAppLink, buildZaloLink } from '@/lib/contactLinks'
import { FLOATING_CONTACT_LABELS, WHATSAPP_PREFILL, pickLocale } from '@/lib/i18n/uiStrings'
import './floating-contact.css'

const LOCALE_PREFIX = /^\/(ko|zh|ru|ja|hi|vi)(?=\/|$)/
const HIDDEN_PREFIXES = ['/admin', '/editor', '/login', '/account', '/auth', '/api', '/buggy-tour', '/taxi-tour']

function localeOf(pathname: string): string {
  const m = pathname.match(LOCALE_PREFIX)
  return m ? m[1] : 'en'
}

function buildMessage(locale: string): string {
  const title = typeof document !== 'undefined' ? document.title : ''
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return pickLocale(WHATSAPP_PREFILL, locale).replace('{title}', title).replace('{url}', url)
}

export function FloatingContact() {
  const pathname = usePathname() || '/'
  const bare = pathname.replace(LOCALE_PREFIX, '') || '/'
  if (HIDDEN_PREFIXES.some((p) => bare === p || bare.startsWith(`${p}/`))) return null

  const locale = localeOf(pathname)
  // Refresh the prefilled message with the live page title/URL right before navigation.
  const refreshWhatsApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = buildWhatsAppLink(buildMessage(locale))
  }

  return (
    <div className="floatingContact" role="complementary" aria-label={pickLocale(FLOATING_CONTACT_LABELS.open, locale)}>
      <a
        href={buildZaloLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="floatingContactBtn zalo"
        aria-label="Zalo"
        data-cta="zalo"
        data-cta-source="floating"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.879 1.442 5.467 3.738 7.159V22l3.473-1.905c.895.247 1.834.382 2.789.382 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 12.355h-4.39v-1.348l2.673-3.238H8.847V8.419h4.258v1.303l-2.673 3.284h2.664v1.349zm3.504 0h-1.528V8.419h1.528v6.336z" />
        </svg>
      </a>
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="floatingContactBtn whatsapp"
        aria-label="WhatsApp"
        data-cta="whatsapp"
        data-cta-source="floating"
        onClick={refreshWhatsApp}
       
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.031 2c-5.509 0-9.989 4.479-9.989 9.988 0 1.758.459 3.473 1.332 4.988L2 22l5.176-1.357a9.96 9.96 0 0 0 4.855 1.258h.004c5.508 0 9.987-4.48 9.987-9.989 0-2.668-1.039-5.176-2.926-7.063A9.924 9.924 0 0 0 12.031 2zm0 18.293c-1.492 0-2.955-.401-4.23-1.159l-.303-.18-3.143.824.839-3.064-.198-.315a8.272 8.272 0 0 1-1.268-4.398c0-4.57 3.719-8.289 8.303-8.289 2.217 0 4.301.864 5.869 2.433a8.243 8.243 0 0 1 2.43 5.87c0 4.57-3.719 8.282-8.307 8.282zm4.555-6.208c-.25-.125-1.479-.73-1.708-.813-.23-.083-.396-.125-.563.125s-.646.813-.792.98c-.146.166-.292.187-.542.062s-1.058-.39-2.016-1.244c-.744-.664-1.246-1.485-1.392-1.735s-.016-.385.109-.51c.112-.112.25-.292.375-.438s.167-.25.25-.417.042-.313-.021-.438c-.063-.125-.563-1.354-.771-1.854-.203-.487-.409-.42-.563-.428-.146-.008-.313-.01-.479-.01s-.438.063-.667.313c-.23.25-.875.855-.875 2.084s.896 2.417 1.021 2.584c.125.166 1.764 2.693 4.274 3.777.597.258 1.063.412 1.427.528.6.19 1.146.163 1.577.099.48-.072 1.479-.604 1.688-1.188s.208-1.083.146-1.188c-.063-.104-.23-.166-.48-.291z" />
        </svg>
      </a>
    </div>
  )
}
