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
