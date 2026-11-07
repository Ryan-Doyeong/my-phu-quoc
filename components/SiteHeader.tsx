import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { PillMenu, type PillMenuGroup } from '@/components/PillMenu'
import { DIRECTORY_CATEGORY_KEYS, getCategoryPublishedCount, categoryLabel } from '@/lib/directory'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import {
  QUICK_CARD_ACTIVITIES,
  QUICK_CARD_BUGGY,
  QUICK_CARD_EMERGENCY,
  QUICK_CARD_EVENTS,
  QUICK_CARD_EXCHANGE,
  QUICK_CARD_ITINERARIES,
  QUICK_CARD_TAXI,
} from '@/lib/quickCardLabels'

const SUNSET: Record<string, string> = { ko: '선셋타운 (Sunset Town)' }
const KHEM: Record<string, string> = { ko: '켐비치 (Khem Beach)' }
const MAP_LABEL: Record<string, string> = {
  ko: '선셋타운 지도',
  en: 'Town Map',
  zh: '镇区地图',
  ru: 'Карта города',
  ja: 'タウンマップ',
  hi: 'टाउन मैप',
  vi: 'Bản đồ khu phố',
}
const SERVICES_TITLE: Record<string, string> = {
  ko: '여행 서비스',
  en: 'Travel Services',
  zh: '旅行服务',
  ru: 'Услуги',
  ja: '旅行サービス',
  hi: 'यात्रा सेवाएँ',
  vi: 'Dịch vụ du lịch',
}

const SHOWS_LABEL: Record<string, string> = {
  ko: '공연 시간표',
  en: 'Show Schedule',
  zh: '演出时间表',
  ru: 'Расписание шоу',
  ja: 'ショー時間表',
  hi: 'शो का समय',
  vi: 'Lịch diễn',
}

const pick = (m: Record<string, string>, l: string) => m[l] || m.en

/** 모든 공개 페이지가 같이 쓰는 헤더: 로고 + 검색 + 언어 + 알약형 드롭다운 메뉴 */
export function SiteHeader({ locale = 'en' }: { locale?: Locale }) {
  const dict = getDictionary(locale)
  const P = (path: string) => localePath(locale, path)

  const groups: PillMenuGroup[] = [
    {
      title: dict.nav.discover,
      items: [
        { href: P('/about'), label: dict.nav.about || 'About' },
        { href: P('/zones/sunset-town'), label: SUNSET[locale] || 'Sunset Town' },
        { href: P('/zones/khem-beach'), label: KHEM[locale] || 'Khem Beach' },
        { href: P('/map'), label: pick(MAP_LABEL, locale) },
        { href: P('/news'), label: dict.nav.newsAndBlog },
        { href: P('/events'), label: pick(QUICK_CARD_EVENTS, locale) },
        { href: P('/sunset-town-shows'), label: pick(SHOWS_LABEL, locale) },
      ],
    },
    {
      title: pick(SERVICES_TITLE, locale),
      items: [
        { href: P('/activities'), label: pick(QUICK_CARD_ACTIVITIES, locale) },
        { href: P('/buggy-tour'), label: pick(QUICK_CARD_BUGGY, locale) },
        { href: P('/taxi-tour'), label: pick(QUICK_CARD_TAXI, locale) },
        { href: P('/itineraries'), label: pick(QUICK_CARD_ITINERARIES, locale) },
        { href: P('/directory/banking'), label: pick(QUICK_CARD_EXCHANGE, locale) },
        { href: P('/emergency'), label: pick(QUICK_CARD_EMERGENCY, locale) },
      ],
    },
    {
      title: dict.nav.directory,
      items: DIRECTORY_CATEGORY_KEYS.filter(
        (key) => key !== 'activities' && getCategoryPublishedCount(key) > 0,
      ).map((key) => ({
        href: key === 'hotels' ? P('/hotels') : P(`/directory/${key}`),
        label: categoryLabel(key, locale),
      })),
    },
  ]

  return (
    <header className="detailNav siteHeaderCommon">
      <Logo locale={locale} />
      <div className="detailNavRight">
        <Link href={P('/search')} className="siteHeaderSearch" aria-label={dict.nav.search}>
          ⌕
        </Link>
        <LanguageSwitcher locale={locale} variant="light" />
        <PillMenu label={dict.nav.menu} groups={groups} />
      </div>
    </header>
  )
}
