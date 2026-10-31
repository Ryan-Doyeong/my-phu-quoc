import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface ItinerariesLandingPageProps {
  locale?: Locale
}

interface ItineraryThemeItem {
  id: string
  icon: string
  title: Record<string, string>
  desc: Record<string, string>
}

/* 4 Theme Itinerary Categories (Planned 2026-10-26: 커플, 가족, 싱글, 친구) */
/* Korean confirmed; other languages temporary English awaiting ChatGPT review */
/* ChatGPT 검수 대기 */
const ITINERARY_THEMES: ItineraryThemeItem[] = [
  {
    id: 'couples',
    icon: '🌅',
    title: {
      ko: '커플',
      en: 'Couples',
      vi: 'Couples',
      zh: 'Couples',
      ru: 'Couples',
      ja: 'Couples',
      hi: 'Couples',
    },
    desc: {
      ko: '로맨틱 석양과 키스브릿지, 분위기 좋은 오션뷰 다이닝 코스',
      en: 'Romantic sunset, Kiss Bridge, ocean-view dining course',
      vi: 'Romantic sunset, Kiss Bridge, ocean-view dining course',
      zh: 'Romantic sunset, Kiss Bridge, ocean-view dining course',
      ru: 'Romantic sunset, Kiss Bridge, ocean-view dining course',
      ja: 'Romantic sunset, Kiss Bridge, ocean-view dining course',
      hi: 'Romantic sunset, Kiss Bridge, ocean-view dining course',
    },
  },
  {
    id: 'families',
    icon: '👨‍👩‍👧‍👦',
    title: {
      ko: '가족',
      en: 'Families',
      vi: 'Families',
      zh: 'Families',
      ru: 'Families',
      ja: 'Families',
      hi: 'Families',
    },
    desc: {
      ko: '아이·부모님과 함께하는 편안한 휴양 & 케이블카 워터파크 코스',
      en: 'Relaxing family resort stay & cable car water park course',
      vi: 'Relaxing family resort stay & cable car water park course',
      zh: 'Relaxing family resort stay & cable car water park course',
      ru: 'Relaxing family resort stay & cable car water park course',
      ja: 'Relaxing family resort stay & cable car water park course',
      hi: 'Relaxing family resort stay & cable car water park course',
    },
  },
  {
    id: 'solo',
    icon: '🎒',
    title: {
      ko: '싱글',
      en: 'Solo',
      vi: 'Solo',
      zh: 'Solo',
      ru: 'Solo',
      ja: 'Solo',
      hi: 'Solo',
    },
    desc: {
      ko: '여유로운 골목 카페 탐방과 나만의 사진 스폿 산책 코스',
      en: 'Leisurely cafe hopping and scenic photo walking course',
      vi: 'Leisurely cafe hopping and scenic photo walking course',
      zh: 'Leisurely cafe hopping and scenic photo walking course',
      ru: 'Leisurely cafe hopping and scenic photo walking course',
      ja: 'Leisurely cafe hopping and scenic photo walking course',
      hi: 'Leisurely cafe hopping and scenic photo walking course',
    },
  },
  {
    id: 'friends',
    icon: '🍹',
    title: {
      ko: '친구',
      en: 'Friends',
      vi: 'Friends',
      zh: 'Friends',
      ru: 'Friends',
      ja: 'Friends',
      hi: 'Friends',
    },
    desc: {
      ko: '켐비치 펍 나이트라이프와 활기찬 해양 액티비티 코스',
      en: 'Khem Beach pub nightlife and vibrant ocean activity course',
      vi: 'Khem Beach pub nightlife and vibrant ocean activity course',
      zh: 'Khem Beach pub nightlife and vibrant ocean activity course',
      ru: 'Khem Beach pub nightlife and vibrant ocean activity course',
      ja: 'Khem Beach pub nightlife and vibrant ocean activity course',
      hi: 'Khem Beach pub nightlife and vibrant ocean activity course',
    },
  },
]

export function ItinerariesLandingPage({ locale = 'ko' }: ItinerariesLandingPageProps) {
  const dict = getDictionary(locale)

  return (
    <div className="itinerariesPageRoot">
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
            <Link href={localePath(locale, '/activities')}>
              {locale === 'ko' ? '액티비티' : 'Activities'}
            </Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container (White MyRealTrip style, 12px frame, 8px tiles) */}
      <main className="itinerariesContainer">
        {/* Breadcrumb */}
        <div className="itinerariesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{locale === 'ko' ? '추천 테마 일정' : 'Theme Itineraries'}</span>
        </div>

        {/* Hero Title Box (12px rounded, white background) */}
        <div className="itinerariesHeaderBox">
          <div className="itinerariesEyebrow">CURATED ITINERARIES</div>
          <h1 className="itinerariesTitle">
            {locale === 'ko' ? '추천 테마 일정' : 'Recommended Theme Itineraries'}
          </h1>
          <p className="itinerariesSubtitle">
            {locale === 'ko'
              ? '푸꾸옥 남부 선셋타운과 켐비치를 가장 알차게 즐길 수 있는 여행 스타일별 맞춤 추천 코스 안내입니다.'
              : 'Curated travel courses tailored for couples, families, solo travelers, and friends in Southern Phu Quoc.'}
          </p>
          <div className="itinerariesNoticeTag">
            <span className="noticeDot" />
            <span>
              {locale === 'ko'
                ? '콘텐츠 준비 중입니다. 현장 동선 및 테마별 세부 일정 안내가 순차적으로 업데이트됩니다.'
                : 'Content is being prepared. Verified travel routes and detailed schedules will be published soon.'}
            </span>
          </div>
        </div>

        {/* 4 Planned Theme Tiles (8px rounded, link-free empty state) */}
        <section className="itinerariesTilesSection">
          <h2 className="itinerariesSectionTitle">
            {locale === 'ko' ? '테마별 여행 코스' : 'Themes'}
          </h2>
          <div className="itinerariesTilesGrid">
            {ITINERARY_THEMES.map((theme) => {
              const themeTitle = theme.title[locale] || theme.title.en
              const themeDesc = theme.desc[locale] || theme.desc.en
              return (
                <div key={theme.id} className="itineraryCategoryTile">
                  <div className="tileTopRow">
                    <span className="tileIcon" aria-hidden="true">
                      {theme.icon}
                    </span>
                    <span className="tileStatusPill">
                      {locale === 'ko' ? '준비 중' : 'Coming Soon'}
                    </span>
                  </div>
                  <h3 className="tileTitle">{themeTitle}</h3>
                  <p className="tileDesc">{themeDesc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Editorial Notice Callout (12px rounded) */}
        <div className="itinerariesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">
              {locale === 'ko' ? '일정 안내 원칙' : 'Itinerary Editorial Policy'}
            </div>
            <div className="calloutText">
              {locale === 'ko'
                ? '마이 푸꾸옥의 추천 일정은 임의의 가상 데이터나 추측성 정보를 배제하고, 실제 이동 소요 시간과 현장 동선 검증을 마친 최적의 코스만을 선별하여 제공할 예정입니다.'
                : 'My Phu Quoc publishes thoroughly verified travel courses based on actual on-site transit times and official venue hours. Fabricated schedules are strictly prohibited.'}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
