"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { DIRECTORY_CATEGORY_KEYS, getCategoryPublishedCount, categoryLabel } from '@/lib/directory'
import { localePath, stripLocalePrefix } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { tUi } from '@/lib/i18n/uiStrings'
import { SITE_CONTACT } from '@/lib/siteAgent'

const SHOWS_LABEL: Record<string, string> = {
  ko: '공연 시간표',
  en: 'Show Schedule',
  zh: '演出时间表',
  ru: 'Расписание шоу',
  ja: 'ショー時間表',
  hi: 'शो का समय',
  vi: 'Lịch diễn',
}

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
        {DIRECTORY_CATEGORY_KEYS.filter((key) => getCategoryPublishedCount(key) > 0).map((key) => (
          <Link
            href={
              key === 'hotels'
                ? localePath(locale, '/hotels')
                : key === 'activities'
                ? localePath(locale, '/activities')
                : localePath(locale, `/directory/${key}`)
            }
            key={key}
          >
            {categoryLabel(key, locale)}
          </Link>
        ))}
        <Link href={localePath(locale, '/map')}>{locale === 'ko' ? '🗺️ 선셋타운 지도' : locale === 'vi' ? '🗺️ Bản đồ thị trấn' : tUi('🗺️  Town Map', locale)}</Link>
        <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
        <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
        <Link href={localePath(locale, '/sunset-town-shows')}>{SHOWS_LABEL[locale] || SHOWS_LABEL.en}</Link>
        <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
        <Link href={localePath(locale, '/contact')}>{locale === 'ko' ? '문의하기' : 'Contact'}</Link>
        <Link href={localePath(locale, '/terms')}>{locale === 'ko' ? '이용약관' : 'Terms'}</Link>
      </nav>
      <div className="footerLegal">
        <p>
          {dict.footer.taglineLine1}
          <br />
          {dict.footer.taglineLine2}
        </p>
        <p>
          <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
          {' · '}
          <a href={`tel:${SITE_CONTACT.telephone}`}>{SITE_CONTACT.telephoneDisplay}</a>
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
