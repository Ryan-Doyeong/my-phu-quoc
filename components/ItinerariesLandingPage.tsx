// Translations: ko source; nav labels en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
// 2026-10-31 추천 테마 일정 → 여행 일정 자동 생성기. 본문은 ko 확정 / 그 외 언어는 en 임시 (ChatGPT 검수 대기)
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { TripPlanner } from '@/components/TripPlanner'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface ItinerariesLandingPageProps {
  locale?: Locale
}

const NAV: Record<string, { sunsetTown: string; khemBeach: string; activities: string }> = {
  ko: { sunsetTown: '선셋타운', khemBeach: '켐비치', activities: '액티비티' },
  en: { sunsetTown: 'Sunset Town', khemBeach: 'Khem Beach', activities: 'Activities' },
  zh: { sunsetTown: '日落小镇', khemBeach: '凯姆海滩', activities: '活动体验' },
  ru: { sunsetTown: 'Сансет Таун', khemBeach: 'Пляж Бай Кхем', activities: 'Активности' },
  ja: { sunsetTown: 'サンセットタウン', khemBeach: 'ケムビーチ', activities: 'アクティビティ' },
  hi: { sunsetTown: 'सनसेट टाउन', khemBeach: 'खेम बीच', activities: 'गतिविधियाँ' },
}

const COPY = {
  ko: {
    breadcrumb: '추천 테마 일정',
    eyebrow: '여행 일정 자동 만들기',
    title: '몇 가지만 고르면, 푸꾸옥 남부 일정이 완성돼요',
    subtitle:
      '선셋타운·켐비치가 있는 푸꾸옥 남부 일정(최대 3박 4일)을 도착 시간, 함께 가는 사람, 여행 목적에 맞춰 시간대별로 짜 드려요. 필요한 픽업과 투어는 담아서 한 번에 문의하세요.',
    points: ['필수 공연 2개 자동 배치', '이른 아침 도착도 체크인 전까지 알차게', '중부·북부는 이동 시간 조언', 'WhatsApp·Zalo로 바로 견적 문의'],
    policyTitle: '일정 안내 원칙',
    policyText:
      '공연 시간·이동 시간은 공식 안내와 현지 기준으로 넣었고, 확인되지 않은 정보는 "확인 필요"로 표시했어요. 가격은 업체 확인 후 안내하며, 예약 전에 저희가 일정과 운영 여부를 다시 확인해 드려요.',
  },
  en: {
    breadcrumb: 'Trip Planner',
    eyebrow: 'TRIP PLANNER',
    title: 'Pick a few things — get your South Phu Quoc plan',
    subtitle:
      'We build an hour-by-hour plan around your flights, companions and interests. Add the pick-ups and tours you need and ask us in one go.',
    points: ['Two must-see shows placed for you', 'First & last day fit your flights', 'Ask for quotes on WhatsApp · Zalo'],
    policyTitle: 'How we plan',
    policyText:
      'Show and travel times follow official and local information; anything unconfirmed is marked. Prices are quoted after we check with operators, and we re-confirm everything before booking.',
  },
}

export function ItinerariesLandingPage({ locale = 'ko' }: ItinerariesLandingPageProps) {
  const dict = getDictionary(locale)
  const nav = NAV[locale] ?? NAV.en
  const c = locale === 'ko' ? COPY.ko : COPY.en

  return (
    <div className="itinerariesPageRoot">
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>{nav.sunsetTown}</Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>{nav.khemBeach}</Link>
            <Link href={localePath(locale, '/activities')}>{nav.activities}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      <main className="itinerariesContainer">
        <div className="itinerariesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{c.breadcrumb}</span>
        </div>

        <div className="itinerariesHeaderBox tpHero">
          <div className="itinerariesEyebrow">{c.eyebrow}</div>
          <h1 className="itinerariesTitle">{c.title}</h1>
          <p className="itinerariesSubtitle">{c.subtitle}</p>
          <ul className="tpHeroPoints">
            {c.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <TripPlanner locale={locale} />

        <div className="itinerariesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">{c.policyTitle}</div>
            <div className="calloutText">{c.policyText}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
