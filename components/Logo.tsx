import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'

export function Logo({ href, locale = 'en' }: { href?: string; locale?: Locale }) {
  const target = href ?? localePath(locale, '/')
  return (
    <Link href={target} className="brandLockup" aria-label="Good life in Thaodien home">
      <svg className="sproutMark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 41V20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M23.8 22C15.2 22.2 9.8 17.9 8 9.7c8.4-1.1 14.2 2.1 15.8 12.3Z" fill="currentColor" opacity=".9" />
        <path d="M25 18.5C26.5 9.7 32 5.7 40 7c-1.2 8.1-6.2 12.6-15 11.5Z" fill="currentColor" opacity=".72" />
        <path d="M24 28c-4.5-4-8.2-6.2-12.3-7.3M24 24c4.4-4.1 7.9-6.5 12-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".45" />
      </svg>
      <span className="brandText">
        Good life <span>in Thaodien</span>
      </span>
    </Link>
  )
}
