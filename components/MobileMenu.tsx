import Link from 'next/link'
import { DIRECTORY_CATEGORY_KEYS, categoryLabel } from '@/lib/directory'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

const SUNSET_MENU_LABELS: Record<string, string> = {
  ko: '선셋타운 (Sunset Town)',
  en: 'Sunset Town',
  zh: 'Sunset Town',
  ru: 'Sunset Town',
  ja: 'Sunset Town',
  hi: 'Sunset Town',
}

const KHEM_MENU_LABELS: Record<string, string> = {
  ko: '켐비치 (Khem Beach)',
  en: 'Khem Beach',
  zh: 'Khem Beach',
  ru: 'Khem Beach',
  ja: 'Khem Beach',
  hi: 'Khem Beach',
}

export function MobileMenu({ locale = 'en' }: { locale?: Locale }) {
  const dict = getDictionary(locale)
  return (
    <details className="mobileMenu">
      <summary aria-label={dict.nav.menu}>
        <span>☰</span>
        <em>{dict.nav.menu}</em>
      </summary>
      <div className="mobileMenuPanel">
        <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
        <Link href={localePath(locale, '/zones/sunset-town')}>
          {SUNSET_MENU_LABELS[locale] || SUNSET_MENU_LABELS.en}
        </Link>
        <Link href={localePath(locale, '/zones/khem-beach')}>
          {KHEM_MENU_LABELS[locale] || KHEM_MENU_LABELS.en}
        </Link>
        <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
        {DIRECTORY_CATEGORY_KEYS.map((key) => (
          <Link href={localePath(locale, `/directory/${key}`)} key={key}>
            {categoryLabel(key, locale)}
          </Link>
        ))}
        <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
        <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
        <Link href={localePath(locale, '/for-businesses')}>{dict.nav.submitBusiness}</Link>
        <Link href={localePath(locale, '/partners')}>{dict.nav.partners}</Link>
      </div>
    </details>
  )
}
