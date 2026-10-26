"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { DIRECTORY_CATEGORY_KEYS, categoryLabel } from '@/lib/directory'
import { localePath, stripLocalePrefix } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export function SiteFooter() {
  const pathname = usePathname()
  if (!pathname) return null

  if (pathname.startsWith('/admin') || pathname.startsWith('/editor')) {
    return null
  }

  const { locale } = stripLocalePrefix(pathname)
  const dict = getDictionary(locale)

  return (
    <footer>
      <Logo locale={locale} />
      <nav>
        {DIRECTORY_CATEGORY_KEYS.map((key) => (
          <Link href={localePath(locale, `/directory/${key}`)} key={key}>
            {categoryLabel(key, locale)}
          </Link>
        ))}
        <Link href={localePath(locale, '/map')}>🗺️ {locale === 'ko' ? '선셋타운 지도' : 'Town Map'}</Link>
        <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
        <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
        <Link href={localePath(locale, '/for-businesses')}>{dict.nav.forBusinesses}</Link>
        <Link href={localePath(locale, '/partners')}>{dict.nav.partners}</Link>
      </nav>
      <div className="footerLegal">
        <p>
          {dict.footer.taglineLine1}
          <br />
          {dict.footer.taglineLine2}
        </p>
        <p className="osm-attribution">
          {dict.footer.osmPrefix}{' '}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            {dict.footer.osmLink}
          </a>
        </p>
      </div>
    </footer>
  )
}
