import Link from 'next/link'
import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'
import { MobileMenu } from '@/components/MobileMenu'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryLabel } from '@/lib/directory'

interface TourPoint {
  order: string
  title: string
  desc: string
  icon: ReactNode
}

interface TourGuideItem {
  label: string
  title: string
  desc: string
  icon: ReactNode
}

interface TourLandingPageProps {
  type: 'buggy' | 'taxi'
  locale?: Locale
}

export function TourLandingPage({ type, locale = 'en' }: TourLandingPageProps) {
  const dict = getDictionary(locale)
  const isBuggy = type === 'buggy'
  const tourData = isBuggy ? dict.buggyTour : dict.taxiTour

  const heroImage = isBuggy
    ? '/banners/phu_quoc_buggy_tour_v5.webp'
    : '/banners/phu_quoc_taxi_tour_v5.webp'

  const points: TourPoint[] = isBuggy
    ? [
        {
          order: tourData.point1Order,
          title: tourData.point1Title,
          desc: tourData.point1Desc,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          ),
        },
        {
          order: tourData.point2Order,
          title: tourData.point2Title,
          desc: tourData.point2Desc,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          ),
        },
        {
          order: tourData.point3Order,
          title: tourData.point3Title,
          desc: tourData.point3Desc,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          ),
        },
      ]
    : [
        {
          order: tourData.point1Order,
          title: tourData.point1Title,
          desc: tourData.point1Desc,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          ),
        },
        {
          order: tourData.point2Order,
          title: tourData.point2Title,
          desc: tourData.point2Desc,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          ),
        },
        {
          order: tourData.point3Order,
          title: tourData.point3Title,
          desc: tourData.point3Desc,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          ),
        },
      ]

  const guides: TourGuideItem[] = isBuggy
    ? [
        {
          label: (tourData as any).guide1Label || '탑승 정원',
          title: (tourData as any).guide1Title || '최대 8명 탑승',
          desc: (tourData as any).guide1Desc || '한 번에 최대 8명까지 여유롭게 함께 탑승하실 수 있습니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide2Label || '미팅 장소',
          title: (tourData as any).guide2Title || '맞춤 승하차 미팅',
          desc: (tourData as any).guide2Desc || '고객님이 계신 장소에 맞춰 편리하게 승하차를 진행합니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide3Label || '결제 방식',
          title: (tourData as any).guide3Title || '현금 · 카드 · 계좌이체',
          desc: (tourData as any).guide3Desc || '현금뿐만 아니라 신용카드 및 계좌이체 결제가 모두 가능합니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide4Label || '날씨 정책',
          title: (tourData as any).guide4Title || '우천 시 변경 및 취소',
          desc: (tourData as any).guide4Desc || '비가 올 경우 예약 일정 변경 및 무료 취소가 가능합니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
              <line x1="8" y1="19" x2="8" y2="21" />
              <line x1="8" y1="13" x2="8" y2="15" />
              <line x1="16" y1="19" x2="16" y2="21" />
              <line x1="16" y1="13" x2="16" y2="15" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="12" y1="15" x2="12" y2="17" />
            </svg>
          ),
        },
      ]
    : [
        {
          label: (tourData as any).guide1Label || '차량 옵션',
          title: (tourData as any).guide1Title || '다양한 차량 제공',
          desc: (tourData as any).guide1Desc || '탑승 인원과 여행 목적에 맞춰 다양한 차량을 제공해 드립니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide2Label || '투어 코스',
          title: (tourData as any).guide2Title || '보편적 코스 & 맞춤 투어',
          desc: (tourData as any).guide2Desc || '보편적인 추천 코스는 물론, 개인 상황과 일정에 맞춘 자유 투어가 가능합니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide3Label || '요금 정책',
          title: (tourData as any).guide3Title || '일괄 포함 요금',
          desc: (tourData as any).guide3Desc || '복잡한 추가 비용 없이 깔끔한 일괄 포함 요금으로 안내해 드립니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide4Label || '소통 안내',
          title: (tourData as any).guide4Title || '편리한 기사 소통',
          desc: (tourData as any).guide4Desc || '기사님이 기본 투어 일정을 잘 이해하고 있으며, 번역기를 사용하여 원활하게 소통합니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          ),
        },
        {
          label: (tourData as any).guide5Label || '날씨 정책',
          title: (tourData as any).guide5Title || '우천 시 변경 및 취소',
          desc: (tourData as any).guide5Desc || '비가 올 경우 예약 일정 변경 및 취소가 가능합니다.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
              <line x1="8" y1="19" x2="8" y2="21" />
              <line x1="8" y1="13" x2="8" y2="15" />
              <line x1="16" y1="19" x2="16" y2="21" />
              <line x1="16" y1="13" x2="16" y2="15" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="12" y1="15" x2="12" y2="17" />
            </svg>
          ),
        },
      ]

  return (
    <div className="tourLandingWrap">
      {/* Site Header (Common) */}
      <header className="siteHeader heroHeader">
        <Logo locale={locale} />
        <nav className="desktopNav">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <Link href={localePath(locale, '/zones/sunset-town')}>선셋타운</Link>
          <Link href={localePath(locale, '/zones/khem-beach')}>켐비치</Link>
          <Link href={localePath(locale, '/directory/dining')}>{categoryLabel('dining', locale)}</Link>
          <Link href={localePath(locale, '/directory/bars')}>{categoryLabel('bars', locale)}</Link>
          <Link href={localePath(locale, '/directory/hotels')}>{categoryLabel('hotels', locale)}</Link>
          <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
        </nav>
        <div className="headerActions">
          <Link
            href={localePath(locale, '/search')}
            className="searchGlyph"
            aria-label={dict.nav.search}
          >
            ⌕
          </Link>
          <LanguageSwitcher locale={locale} variant="hero" />
          <MobileMenu locale={locale} />
        </div>
      </header>

      {/* ① First Screen (Hero Section) */}
      <section className="tourHeroSection">
        <img
          src={heroImage}
          alt={tourData.heroTitle}
          className="tourHeroImg"
          loading="eager"
          decoding="async"
        />
        <div className="tourHeroOverlay" />
        <div className="tourHeroContent">
          <div className="tourHeroBadge">{tourData.heroBadge}</div>
          <h1 className="tourHeroTitle">{tourData.heroTitle}</h1>
          <p className="tourHeroSubtitle">{tourData.heroSubtitle}</p>
        </div>
      </section>

      {/* ② Advantage Cards (3 Highlights) */}
      <section className="tourFeaturesSection">
        <div className="tourSectionHeader">
          <div className="tourSectionEyebrow">{tourData.highlightsEyebrow}</div>
          <h2 className="tourSectionTitle">{tourData.highlightsTitle}</h2>
        </div>

        <div className="tourCardsGrid">
          {points.map((pt, i) => (
            <div className="tourFeatureCard" key={i}>
              <div className="tourCardIconWrap">{pt.icon}</div>
              <div className="tourCardOrder">{pt.order}</div>
              <h3 className="tourCardTitle">{pt.title}</h3>
              <p className="tourCardDesc">{pt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ②-2. Service Guide (이용 안내) */}
      <section className="tourServiceGuideSection">
        <div className="tourSectionHeader">
          <div className="tourSectionEyebrow">{(tourData as any).guideEyebrow || 'Service Guide'}</div>
          <h2 className="tourSectionTitle">{(tourData as any).guideTitle || (isBuggy ? '버기 투어 이용 안내' : '택시 투어 이용 안내')}</h2>
        </div>

        <div className={isBuggy ? 'tourGuideGrid buggyGrid' : 'tourGuideGrid taxiGrid'}>
          {guides.map((g, idx) => (
            <div className="tourGuideCard" key={idx}>
              <div className="tourGuideHeader">
                <div className="tourGuideIconWrap">{g.icon}</div>
                <span className="tourGuideLabel">{g.label}</span>
              </div>
              <h3 className="tourGuideTitle">{g.title}</h3>
              <p className="tourGuideText">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ③ Contact Section (Main Body Box) */}
      <section className="tourContactSection">
        <div className="tourContactBox">
          <span className="tourContactBoxTag">{tourData.contactTag}</span>
          <h2 className="tourContactBoxTitle">{tourData.contactTitle}</h2>
          <p className="tourContactBoxDesc">{tourData.contactDesc}</p>

          <div className="tourContactPhoneRow">
            <svg className="tourPhoneIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a href={`tel:${CONTACT_CONFIG.phoneNumber}`} className="tourPhoneNumber">
              {CONTACT_CONFIG.phoneFormatted}
            </a>
          </div>

          <div className="tourContactButtonsLarge">
            <a
              href={CONTACT_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tourBtnLarge tourBtnWhatsapp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2c-5.509 0-9.989 4.479-9.989 9.988 0 1.758.459 3.473 1.332 4.988L2 22l5.176-1.357a9.96 9.96 0 0 0 4.855 1.258h.004c5.508 0 9.987-4.48 9.987-9.989 0-2.668-1.039-5.176-2.926-7.063A9.924 9.924 0 0 0 12.031 2zm0 18.293c-1.492 0-2.955-.401-4.23-1.159l-.303-.18-3.143.824.839-3.064-.198-.315a8.272 8.272 0 0 1-1.268-4.398c0-4.57 3.719-8.289 8.303-8.289 2.217 0 4.301.864 5.869 2.433a8.243 8.243 0 0 1 2.43 5.87c0 4.57-3.719 8.282-8.307 8.282zm4.555-6.208c-.25-.125-1.479-.73-1.708-.813-.23-.083-.396-.125-.563.125s-.646.813-.792.98c-.146.166-.292.187-.542.062s-1.058-.39-2.016-1.244c-.744-.664-1.246-1.485-1.392-1.735s-.016-.385.109-.51c.112-.112.25-.292.375-.438s.167-.25.25-.417.042-.313-.021-.438c-.063-.125-.563-1.354-.771-1.854-.203-.487-.409-.42-.563-.428-.146-.008-.313-.01-.479-.01s-.438.063-.667.313c-.23.25-.875.855-.875 2.084s.896 2.417 1.021 2.584c.125.166 1.764 2.693 4.274 3.777.597.258 1.063.412 1.427.528.6.19 1.146.163 1.577.099.48-.072 1.479-.604 1.688-1.188s.208-1.083.146-1.188c-.063-.104-.23-.166-.48-.291z" />
              </svg>
              <span>{tourData.whatsappBtn}</span>
            </a>
            <a
              href={CONTACT_CONFIG.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tourBtnLarge tourBtnZalo"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.879 1.442 5.467 3.738 7.159V22l3.473-1.905c.895.247 1.834.382 2.789.382 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 12.355h-4.39v-1.348l2.673-3.238H8.847V8.419h4.258v1.303l-2.673 3.284h2.664v1.349zm3.504 0h-1.528V8.419h1.528v6.336z" />
              </svg>
              <span>{tourData.zaloBtn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ⑤ Fixed Floating Contact Widget (Desktop) */}
      <div className="tourDesktopFixedContact" role="complementary" aria-label="Quick contact">
        <div className="tourFixedCardWidget">
          <div className="tourFixedWidgetHeader">
            <span className="tourFixedWidgetLabel">{tourData.fixedWidgetLabel}</span>
            <span className="tourFixedWidgetPhone">{CONTACT_CONFIG.phoneFormatted}</span>
          </div>
          <div className="tourFixedBtnRow">
            <a
              href={CONTACT_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tourFixedBtn whatsapp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2c-5.509 0-9.989 4.479-9.989 9.988 0 1.758.459 3.473 1.332 4.988L2 22l5.176-1.357a9.96 9.96 0 0 0 4.855 1.258h.004c5.508 0 9.987-4.48 9.987-9.989 0-2.668-1.039-5.176-2.926-7.063A9.924 9.924 0 0 0 12.031 2zm0 18.293c-1.492 0-2.955-.401-4.23-1.159l-.303-.18-3.143.824.839-3.064-.198-.315a8.272 8.272 0 0 1-1.268-4.398c0-4.57 3.719-8.289 8.303-8.289 2.217 0 4.301.864 5.869 2.433a8.243 8.243 0 0 1 2.43 5.87c0 4.57-3.719 8.282-8.307 8.282zm4.555-6.208c-.25-.125-1.479-.73-1.708-.813-.23-.083-.396-.125-.563.125s-.646.813-.792.98c-.146.166-.292.187-.542.062s-1.058-.39-2.016-1.244c-.744-.664-1.246-1.485-1.392-1.735s-.016-.385.109-.51c.112-.112.25-.292.375-.438s.167-.25.25-.417.042-.313-.021-.438c-.063-.125-.563-1.354-.771-1.854-.203-.487-.409-.42-.563-.428-.146-.008-.313-.01-.479-.01s-.438.063-.667.313c-.23.25-.875.855-.875 2.084s.896 2.417 1.021 2.584c.125.166 1.764 2.693 4.274 3.777.597.258 1.063.412 1.427.528.6.19 1.146.163 1.577.099.48-.072 1.479-.604 1.688-1.188s.208-1.083.146-1.188c-.063-.104-.23-.166-.48-.291z" />
              </svg>
              <span>{tourData.whatsappBtn}</span>
            </a>
            <a
              href={CONTACT_CONFIG.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tourFixedBtn zalo"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.879 1.442 5.467 3.738 7.159V22l3.473-1.905c.895.247 1.834.382 2.789.382 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 12.355h-4.39v-1.348l2.673-3.238H8.847V8.419h4.258v1.303l-2.673 3.284h2.664v1.349zm3.504 0h-1.528V8.419h1.528v6.336z" />
              </svg>
              <span>{tourData.zaloBtn}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ⑤ Fixed Bottom Bar (Mobile) */}
      <div className="tourMobileFixedBar" role="region" aria-label="Mobile quick contact">
        <a
          href={CONTACT_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tourMobileFixedBtn whatsapp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2c-5.509 0-9.989 4.479-9.989 9.988 0 1.758.459 3.473 1.332 4.988L2 22l5.176-1.357a9.96 9.96 0 0 0 4.855 1.258h.004c5.508 0 9.987-4.48 9.987-9.989 0-2.668-1.039-5.176-2.926-7.063A9.924 9.924 0 0 0 12.031 2zm0 18.293c-1.492 0-2.955-.401-4.23-1.159l-.303-.18-3.143.824.839-3.064-.198-.315a8.272 8.272 0 0 1-1.268-4.398c0-4.57 3.719-8.289 8.303-8.289 2.217 0 4.301.864 5.869 2.433a8.243 8.243 0 0 1 2.43 5.87c0 4.57-3.719 8.282-8.307 8.282zm4.555-6.208c-.25-.125-1.479-.73-1.708-.813-.23-.083-.396-.125-.563.125s-.646.813-.792.98c-.146.166-.292.187-.542.062s-1.058-.39-2.016-1.244c-.744-.664-1.246-1.485-1.392-1.735s-.016-.385.109-.51c.112-.112.25-.292.375-.438s.167-.25.25-.417.042-.313-.021-.438c-.063-.125-.563-1.354-.771-1.854-.203-.487-.409-.42-.563-.428-.146-.008-.313-.01-.479-.01s-.438.063-.667.313c-.23.25-.875.855-.875 2.084s.896 2.417 1.021 2.584c.125.166 1.764 2.693 4.274 3.777.597.258 1.063.412 1.427.528.6.19 1.146.163 1.577.099.48-.072 1.479-.604 1.688-1.188s.208-1.083.146-1.188c-.063-.104-.23-.166-.48-.291z" />
          </svg>
          <span>{tourData.whatsappBtn}</span>
        </a>
        <a
          href={CONTACT_CONFIG.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tourMobileFixedBtn zalo"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.879 1.442 5.467 3.738 7.159V22l3.473-1.905c.895.247 1.834.382 2.789.382 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 12.355h-4.39v-1.348l2.673-3.238H8.847V8.419h4.258v1.303l-2.673 3.284h2.664v1.349zm3.504 0h-1.528V8.419h1.528v6.336z" />
          </svg>
          <span>{tourData.zaloBtn}</span>
        </a>
      </div>
    </div>
  )
}
