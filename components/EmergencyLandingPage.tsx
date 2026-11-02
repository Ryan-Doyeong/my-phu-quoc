import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface EmergencyLandingPageProps {
  locale?: Locale
}

export function EmergencyLandingPage({ locale = 'ko' }: EmergencyLandingPageProps) {
  const dict = getDictionary(locale)

  return (
    <div className="emergencyPageRoot">
      {/* 0. Top Header */}
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
            <Link href={localePath(locale, '/itineraries')}>
              {locale === 'ko' ? '추천 테마 일정' : 'Theme Itineraries'}
            </Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container */}
      <main className="emergencyContainer">
        {/* Breadcrumb */}
        <div className="emergencyBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{locale === 'ko' ? '긴급상황' : 'Emergency'}</span>
        </div>

        {/* ① 호텔 프런트 안내 박스 (가장 크게) */}
        <div className="emergencyMainNoticeBox">
          <p className="mainNoticeText">
            위급하면 먼저 묵고 계신 호텔 프런트에 알려 주세요. 앰뷸런스 호출과 가까운 병원 안내를 도와드립니다.
          </p>
        </div>

        {/* ② 병원·약국 찾기 (중심 영역) */}
        <section className="emergencyCentralSection">
          <h1 className="emergencySectionMainTitle">병원·약국 찾기</h1>

          {/* 1) 병원 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">병원</h2>
            <div className="slotGrid3">
              {[1, 2, 3].map((idx) => (
                <div key={`hospital-${idx}`} className="slotCard">
                  <div className="slotCardHeader">
                    <span className="slotBadge">병원 {idx}</span>
                    <span className="slotPlaceholderTag">(공란)</span>
                  </div>
                  <h3 className="slotItemTitle">(공란)</h3>
                  <div className="slotMetaList">
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">주소</span>
                      <span className="slotMetaVal">(공란)</span>
                    </div>
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">전화</span>
                      <span className="slotMetaVal">(공란)</span>
                    </div>
                  </div>
                  <div className="slotBtnRow">
                    <button type="button" className="slotMapBtn" disabled>
                      구글맵 (공란)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2) 약국 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">약국</h2>
            <div className="slotGrid3">
              {[1, 2, 3].map((idx) => (
                <div key={`pharmacy-${idx}`} className="slotCard">
                  <div className="slotCardHeader">
                    <span className="slotBadge">약국 {idx}</span>
                    <span className="slotPlaceholderTag">(공란)</span>
                  </div>
                  <h3 className="slotItemTitle">(공란)</h3>
                  <div className="slotMetaList">
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">주소</span>
                      <span className="slotMetaVal">(공란)</span>
                    </div>
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">전화</span>
                      <span className="slotMetaVal">(공란)</span>
                    </div>
                  </div>
                  <div className="slotBtnRow">
                    <button type="button" className="slotMapBtn" disabled>
                      구글맵 (공란)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ 심각한 상황이면 영사관 박스 */}
        <section className="emergencyConsularBox">
          <h2 className="consularBoxTitle">심각한 상황이면 영사관</h2>
          <div className="consularSlotContent">
            <div className="consularRow">
              <span className="consularLabel">전화번호</span>
              <span className="consularValue">(공란)</span>
            </div>
          </div>
        </section>

        {/* ④ 하단 113/114/115 한 줄 자리 + 면책 문구 자리 */}
        <div className="emergencyBottomWrap">
          <div className="emergencyHotlineSingleLine">
            <span>113 (공란)</span>
            <span className="dotDivider">·</span>
            <span>114 (공란)</span>
            <span className="dotDivider">·</span>
            <span>115 (공란)</span>
          </div>
          <div className="emergencyDisclaimerLine">
            <span>면책 문구: (공란)</span>
          </div>
        </div>
      </main>
    </div>
  )
}
