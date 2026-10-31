import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { ActivityYachtSection } from '@/components/ActivityYachtSection'

interface ActivitiesLandingPageProps {
  locale?: Locale
}

interface ActivityCategoryItem {
  id: string
  icon: string
  title: Record<string, string>
  desc: Record<string, string>
}

/* Category definitions for Southern Phu Quoc Activities */
/* Korean confirmed; other languages temporary English awaiting ChatGPT review */
/* ChatGPT 검수 대기 */
const ACTIVITY_CATEGORIES: ActivityCategoryItem[] = [
  {
    id: 'hon-thom',
    icon: '🚡',
    title: {
      ko: '혼똔섬 아일랜드',
      en: 'Hon Thom Island',
      vi: 'Hon Thom Island',
      zh: 'Hon Thom Island',
      ru: 'Hon Thom Island',
      ja: 'Hon Thom Island',
      hi: 'Hon Thom Island',
    },
    desc: {
      ko: '해상 케이블카 · 아쿠아토피아 워터파크 · 테마파크',
      en: 'Cable Car · Aquatopia Water Park · Theme Park',
      vi: 'Cable Car · Aquatopia Water Park · Theme Park',
      zh: 'Cable Car · Aquatopia Water Park · Theme Park',
      ru: 'Cable Car · Aquatopia Water Park · Theme Park',
      ja: 'Cable Car · Aquatopia Water Park · Theme Park',
      hi: 'Cable Car · Aquatopia Water Park · Theme Park',
    },
  },
  {
    id: 'hopping-tour',
    icon: '⛵',
    title: {
      ko: '호핑 투어',
      en: 'Hopping Tour',
      vi: 'Hopping Tour',
      zh: 'Hopping Tour',
      ru: 'Hopping Tour',
      ja: 'Hopping Tour',
      hi: 'Hopping Tour',
    },
    desc: {
      ko: '남부 3섬·4섬 스노클링 · 선셋 크루즈',
      en: 'Southern Island Snorkeling · Sunset Cruise',
      vi: 'Southern Island Snorkeling · Sunset Cruise',
      zh: 'Southern Island Snorkeling · Sunset Cruise',
      ru: 'Southern Island Snorkeling · Sunset Cruise',
      ja: 'Southern Island Snorkeling · Sunset Cruise',
      hi: 'Southern Island Snorkeling · Sunset Cruise',
    },
  },
  {
    id: 'private-yacht',
    icon: '🛥️',
    title: {
      ko: '프라이빗 요트 투어',
      en: 'Private Yacht Tour',
      vi: 'Private Yacht Tour',
      zh: 'Private Yacht Tour',
      ru: 'Private Yacht Tour',
      ja: 'Private Yacht Tour',
      hi: 'Private Yacht Tour',
    },
    desc: {
      ko: '단독 대절 요트 · 일몰 세일링 · 프라이빗 파티',
      en: 'Charter Yacht · Sunset Sailing · Private Event',
      vi: 'Charter Yacht · Sunset Sailing · Private Event',
      zh: 'Charter Yacht · Sunset Sailing · Private Event',
      ru: 'Charter Yacht · Sunset Sailing · Private Event',
      ja: 'Charter Yacht · Sunset Sailing · Private Event',
      hi: 'Charter Yacht · Sunset Sailing · Private Event',
    },
  },
  {
    id: 'fishing',
    icon: '🎣',
    title: {
      ko: '낚시',
      en: 'Fishing',
      vi: 'Fishing',
      zh: 'Fishing',
      ru: 'Fishing',
      ja: 'Fishing',
      hi: 'Fishing',
    },
    desc: {
      ko: '야간 오징어 낚시 · 바다 낚시 체험',
      en: 'Night Squid Fishing · Sea Fishing Experience',
      vi: 'Night Squid Fishing · Sea Fishing Experience',
      zh: 'Night Squid Fishing · Sea Fishing Experience',
      ru: 'Night Squid Fishing · Sea Fishing Experience',
      ja: 'Night Squid Fishing · Sea Fishing Experience',
      hi: 'Night Squid Fishing · Sea Fishing Experience',
    },
  },
  {
    id: 'others',
    icon: '🏄',
    title: {
      ko: '기타',
      en: 'Other Activities',
      vi: 'Other Activities',
      zh: 'Other Activities',
      ru: 'Other Activities',
      ja: 'Other Activities',
      hi: 'Other Activities',
    },
    desc: {
      ko: '패러세일링 · 제트스키 · 카약 · 해양 스포츠',
      en: 'Parasailing · Jet Ski · Kayak · Water Sports',
      vi: 'Parasailing · Jet Ski · Kayak · Water Sports',
      zh: 'Parasailing · Jet Ski · Kayak · Water Sports',
      ru: 'Parasailing · Jet Ski · Kayak · Water Sports',
      ja: 'Parasailing · Jet Ski · Kayak · Water Sports',
      hi: 'Parasailing · Jet Ski · Kayak · Water Sports',
    },
  },
]

export function ActivitiesLandingPage({ locale = 'ko' }: ActivitiesLandingPageProps) {
  const dict = getDictionary(locale)

  return (
    <div className="activitiesPageRoot">
      {/* 0. Top Header (White background matching detailNav style) */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {locale === 'ko' ? '선셋타운' : 'Sunset Town'}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {locale === 'ko' ? '켐비치' : 'Khem Beach'}
            </Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container (White MyRealTrip style, 12px frame, 8px tiles) */}
      <main className="activitiesContainer">
        {/* Breadcrumb */}
        <div className="activitiesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{locale === 'ko' ? '액티비티' : 'Activities'}</span>
        </div>

        {/* Hero Title Box (12px rounded, white background) */}
        <div className="activitiesHeaderBox">
          <div className="activitiesEyebrow">EXPERIENCES & TOURS</div>
          <h1 className="activitiesTitle">
            {locale === 'ko' ? '액티비티' : 'Activities'}
          </h1>
          <p className="activitiesSubtitle">
            {locale === 'ko'
              ? '푸꾸옥 남부 선셋타운과 켐비치에서 즐길 수 있는 대표 해양 액티비티 및 투어 프로그램 안내입니다.'
              : 'Discover top ocean activities and tour experiences across Southern Phu Quoc.'}
          </p>
          <div className="activitiesNoticeTag">
            <span className="noticeDot" />
            <span>
              {locale === 'ko'
                ? '콘텐츠 준비 중입니다. 공식 일정 및 세부 프로그램 정보가 순차적으로 업데이트됩니다.'
                : 'Content is being prepared. Verified program schedules and details will be updated soon.'}
            </span>
          </div>
        </div>

        <ActivityYachtSection locale={locale} />

        {/* 5 Planned Category Tiles (8px rounded) */}
        <section className="activitiesTilesSection">
          <h2 className="activitiesSectionTitle">
            {locale === 'ko' ? '주요 카테고리' : 'Categories'}
          </h2>
          <div className="activitiesTilesGrid">
            {ACTIVITY_CATEGORIES.map((cat) => {
              const catTitle = cat.title[locale] || cat.title.en
              const catDesc = cat.desc[locale] || cat.desc.en
              return (
                <div key={cat.id} className="activityCategoryTile">
                  <div className="tileTopRow">
                    <span className="tileIcon" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <span className="tileStatusPill">
                      {locale === 'ko' ? '준비 중' : 'Coming Soon'}
                    </span>
                  </div>
                  <h3 className="tileTitle">{catTitle}</h3>
                  <p className="tileDesc">{catDesc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Information & Partnership Callout (12px rounded) */}
        <div className="activitiesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">
              {locale === 'ko' ? '투어 및 액티비티 안내 기준' : 'Activity Information Policy'}
            </div>
            <div className="calloutText">
              {locale === 'ko'
                ? '마이 푸꾸옥은 공식 확인된 검증 정보만을 제공합니다. 임의의 가격이나 일정을 게시하지 않으며, 제휴 및 정식 운영 프로그램이 확정되는 대로 정식 오픈될 예정입니다.'
                : 'My Phu Quoc publishes verified official information only. Confirmed partner programs and verified schedules will be published upon official confirmation.'}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
