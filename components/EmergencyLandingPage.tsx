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
          <span className="current">{locale === 'ko' ? '긴급상황 안내' : 'Emergency Info'}</span>
        </div>

        {/* Hero Title Box */}
        <div className="emergencyHeaderBox">
          <div className="emergencyEyebrow">EMERGENCY & SAFETY GUIDE</div>
          <h1 className="emergencyTitle">
            {locale === 'ko' ? '푸꾸옥 남부 긴급상황 안내' : 'Southern Phu Quoc Emergency Guide'}
          </h1>
          <p className="emergencySubtitle">
            {locale === 'ko'
              ? '선셋타운(Sunset Town) · 켐비치(Khem Beach) · 안터이(An Thới) 구역 여행자를 위한 응급 의료 및 안전 연락망'
              : 'Official emergency contact numbers and medical resources for Sunset Town & Khem Beach travelers.'}
          </p>
        </div>

        {/* 1. Official Emergency Numbers (3 cards) */}
        <section className="emergencySection">
          <h2 className="emergencySectionTitle">
            {locale === 'ko' ? '🚨 국가 공식 긴급 전화' : '🚨 Official Emergency Hotlines'}
          </h2>
          <div className="emergencyHotlineGrid">
            <div className="hotlineCard police">
              <div className="hotlineBadge">POLICE · 경찰</div>
              <div className="hotlineNumber">113</div>
              <div className="hotlineDesc">
                {locale === 'ko' ? '범죄 · 사건 · 도난 사고 신고' : 'Crime, theft & police report'}
              </div>
            </div>
            <div className="hotlineCard fire">
              <div className="hotlineBadge">FIRE · 소방/구조</div>
              <div className="hotlineNumber">114</div>
              <div className="hotlineDesc">
                {locale === 'ko' ? '화재 · 해상 조난 · 인명 구조' : 'Fire & emergency rescue'}
              </div>
            </div>
            <div className="hotlineCard ambulance">
              <div className="hotlineBadge">AMBULANCE · 구급</div>
              <div className="hotlineNumber">115</div>
              <div className="hotlineDesc">
                {locale === 'ko' ? '국공립 앰뷸런스 응급 환자' : 'Public ambulance service'}
              </div>
            </div>
          </div>
          <p className="emergencyTip">
            {locale === 'ko'
              ? '💡 팁: 현지 유심 이용 시 번호 세 자리(113, 114, 115)만 누르면 연결됩니다. 언어 소통이 어려울 경우 투숙 중인 호텔 프론트 데스크(객실 0번) 또는 영사콜센터 무료 3자 통역을 이용하세요.'
              : '💡 Tip: Dial 3 digits directly with local SIM. If language is an issue, ask your hotel front desk or consular service for assistance.'}
          </p>
        </section>

        {/* 2. Medical Facilities */}
        <section className="emergencySection">
          <h2 className="emergencySectionTitle">
            {locale === 'ko' ? '🏥 주요 병원 및 의료기관' : '🏥 Medical Facilities & Hospitals'}
          </h2>
          <div className="hospitalList">
            {/* An Thoi Polyclinic */}
            <div className="hospitalCard">
              <div className="hospitalHeader">
                <span className="hospitalTag primary">
                  {locale === 'ko' ? '남부 1차 응급 (차로 5분)' : 'Nearest 1st Aid Clinic (5 mins)'}
                </span>
                <span className="hospitalStatus">24시간 응급실 운영</span>
              </div>
              <h3 className="hospitalName">안터이 종합의원 (Phòng khám Đa khoa An Thới)</h3>
              <p className="hospitalDesc">
                {locale === 'ko'
                  ? '단순 외상 봉합, 급성 장염·식중독 수액 처치, 해파리 쏘임 1차 처치 가능. 심혈관/중증 수술은 상급 병원 이송 필요.'
                  : 'Basic trauma treatment, wound dressing, dehydration IV, jellyfish sting care.'}
              </p>
              <div className="hospitalMeta">
                <div>📍 Khu phố 1, Phường An Thới, TP. Phú Quốc (ĐT46 도로변)</div>
                <div>📞 대표: +84 297 3898 888 / 응급핫라인: +84 977 460 389</div>
              </div>
            </div>

            {/* Vinmec International Hospital */}
            <div className="hospitalCard">
              <div className="hospitalHeader">
                <span className="hospitalTag international">
                  {locale === 'ko' ? '최상급 국제병원 (북부, 차로 1시간)' : 'Tertiary International Hospital (1 hr)'}
                </span>
                <span className="hospitalStatus">JCI 인증 · 24시간 응급실</span>
              </div>
              <h3 className="hospitalName">빈멕 푸꾸옥 국제병원 (Vinmec International Hospital)</h3>
              <p className="hospitalDesc">
                {locale === 'ko'
                  ? '24시간 영어 진료 전문의 상주, MRI/CT/중환자실 완비, 주요 해외여행자보험 다이렉트 빌링(직접 청구) 지원.'
                  : '24/7 English-speaking medical staff, modern ICU/CT/MRI, international direct billing available.'}
              </p>
              <div className="hospitalMeta">
                <div>📍 Khu Bãi Dài, Gành Dầu, TP. Phú Quốc</div>
                <div>📞 응급실 직통: +84 297 398 5515 / 대표: +84 297 398 5588</div>
              </div>
            </div>

            {/* Sun Serenia Note */}
            <div className="hospitalCard noticeOnly">
              <div className="hospitalHeader">
                <span className="hospitalTag warning">
                  {locale === 'ko' ? '미개원 안내' : 'Not Yet Open'}
                </span>
              </div>
              <h3 className="hospitalName">선 세레니아 병원 (Sun Serenia Hospital)</h3>
              <p className="hospitalDesc">
                {locale === 'ko'
                  ? '선셋타운 인근에 계획된 선그룹 의료 프로젝트로, 현재 미개원 상태(공사/계획 진행 중)이므로 진료가 불가합니다. 안터이 종합의원 또는 빈멕 국제병원을 이용해 주시기 바랍니다.'
                : 'Currently under development and not yet open. Please visit An Thoi Clinic or Vinmec Hospital.'}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Consular Support Channels */}
        <section className="emergencySection">
          <h2 className="emergencySectionTitle">
            {locale === 'ko' ? '🇰🇷 재외국민 영사 지원 채널' : '🌐 Consular & Support Channels'}
          </h2>
          <div className="consularGrid">
            <div className="consularCard">
              <div className="consularTitle">주호치민 대한민국 총영사관</div>
              <div className="consularSubtitle">푸꾸옥 관할 공관 (여권 분실·범죄 피해 지원)</div>
              <div className="consularHotline">긴급전화: +84 90 850 6371</div>
              <div className="consularInfo">대표안내: +84 28 3822 5931</div>
            </div>
            <div className="consularCard">
              <div className="consularTitle">대한민국 외교부 영사콜센터</div>
              <div className="consularSubtitle">24시간 연중무휴 · 실시간 3자 무료 통역 지원</div>
              <div className="consularHotline">전화: +82 2 3210 0404</div>
              <div className="consularInfo">카카오톡 채널: '외교부 영사콜센터' 1:1 상담</div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="emergencyDisclaimerBox">
          <div className="disclaimerTitle">
            {locale === 'ko' ? '안내 고지 및 면책 사항' : 'Disclaimer'}
          </div>
          <p className="disclaimerText">
            {locale === 'ko'
              ? '본 안내는 여행자의 안전을 위해 공공 정보와 현장 확인을 바탕으로 작성된 참고 자료입니다. 의료 시설 운영 상황은 사전 예고 없이 변동될 수 있으며, 응급 상황 시 즉시 현지 전문 의료진과 응급 기관의 지시에 따르시기 바랍니다.'
              : 'This emergency guide is for informational purposes only. Facilities and availability may change without notice.'}
          </p>
        </div>
      </main>
    </div>
  )
}
