import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'

export function Logo({ href, locale = 'en' }: { href?: string; locale?: Locale }) {
  const target = href ?? localePath(locale, '/')
  return (
    <Link href={target} className="brandLockup" aria-label="Hello Sunset Town home">
      <svg className="sunMark" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="21" r="9" fill="#C86D2D" />
        <path d="M4 30c5-3 9-3 14 0s9 3 14 0 9-3 12 0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M6 37c5-3 9-3 14 0s9 3 14 0 8-3 8-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".6" />
      </svg>
      <span className="brandText">
        Hello <span>Sunset Town</span>
      </span>
    </Link>
  )
}
