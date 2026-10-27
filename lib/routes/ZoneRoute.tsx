import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  MAIN_ZONES,
  type MainZoneSlug,
  type MainZoneInfo,
} from '@/lib/zones'
import { buildAlternates, localePath, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { SITE_URL } from '@/lib/supabase/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryLabel } from '@/lib/directory'

export async function generateZoneMetadata(
  slug: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  const zone = MAIN_ZONES[slug as MainZoneSlug]
  if (!zone) return {}

  const name = zone.name[locale] || zone.name.en
  const summary = zone.summary[locale] || zone.summary.en
  const title =
    locale === 'ko'
      ? `${name} 여행 가이드 | 마이 푸꾸옥 (My Phu Quoc)`
      : `${name} Travel Guide | My Phu Quoc`

  const barePath = `/zones/${slug}`
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  const heroAbsoluteUrl = zone.heroImage.startsWith('http')
    ? zone.heroImage
    : `${SITE_URL}${zone.heroImage}`

  return {
    title,
    description: summary,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description: summary,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
      images: [
        {
          url: heroAbsoluteUrl,
          width: 1280,
          height: 720,
          alt: zone.heroAlt[locale] || zone.heroAlt.en,
        },
      ],
    },
  }
}

export async function renderZoneRoute(slug: string, locale: Locale = 'en') {
  const zone = MAIN_ZONES[slug as MainZoneSlug]
  if (!zone) notFound()

  const dict = getDictionary(locale)
  const name = zone.name[locale] || zone.name.en
  const summary = zone.summary[locale] || zone.summary.en
  const overview = zone.overview[locale] || zone.overview.en
  const badge = zone.badge[locale] || zone.badge.en
  const categoryBadge = zone.categoryBadge[locale] || zone.categoryBadge.en
  const noteBanner = zone.noteBanner ? (zone.noteBanner[locale] || zone.noteBanner.en) : null
  const transitHeadline = zone.transitHeadline[locale] || zone.transitHeadline.en
  const transitDescription = zone.transitDescription[locale] || zone.transitDescription.en
  const otherZoneSlug: MainZoneSlug = slug === 'sunset-town' ? 'khem-beach' : 'sunset-town'

  // JSON-LD structured data (Verified data only, no unverified place IDs or coordinates)
  const canonicalUrl = localeUrl(locale, `/zones/${slug}`)
  const heroAbsoluteUrl = zone.heroImage.startsWith('http')
    ? zone.heroImage
    : `${SITE_URL}${zone.heroImage}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: name,
    alternateName: zone.nameLocal,
    description: summary,
    url: canonicalUrl,
    image: heroAbsoluteUrl,
    touristType: slug === 'sunset-town' ? 'Nightlife and Cultural Tourism' : 'Beach and Wellness Tourism',
    includesAttraction: zone.attractions.map((attr) => ({
      '@type': 'TouristAttraction',
      name: attr.name[locale] || attr.name.en,
      description: attr.description[locale] || attr.description.en,
    })),
  }

  const isSunset = slug === 'sunset-town'

  return (
    <main className="zoneDetailPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link
              href={localePath(locale, '/zones/sunset-town')}
              className={slug === 'sunset-town' ? 'active' : ''}
            >
              {locale === 'ko' ? '선셋타운' : 'Sunset Town'}
            </Link>
            <Link
              href={localePath(locale, '/zones/khem-beach')}
              className={slug === 'khem-beach' ? 'active' : ''}
            >
              {locale === 'ko' ? '켐비치' : 'Khem Beach'}
            </Link>
            <Link href={localePath(locale, '/directory/dining')}>
              {categoryLabel('dining', locale)}
            </Link>
            <Link href={localePath(locale, '/directory/bars')}>
              {categoryLabel('bars', locale)}
            </Link>
            <Link href={localePath(locale, '/directory/hotels')}>
              {categoryLabel('hotels', locale)}
            </Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container */}
      <div className="zoneDetailContainer">
        <div className="zonePageFrame">
          {/* Top Bar */}
          <div className="frameTopBar">
            <span>{name}</span>
            <code>/zones/{slug}</code>
          </div>

          {/* Hero Banner */}
          <div
            className={`zoneHeroBanner ${!isSunset ? 'khemHeroBanner' : ''}`}
            style={{
              backgroundImage: `url('${zone.heroImage}')`,
            }}
          >
            <span className={`heroTagPill ${isSunset ? 'sunsetTag' : 'khemTag'}`}>
              {badge}
            </span>
            <h1>{name}</h1>
            <p>{summary}</p>
          </div>

          {/* Content Body */}
          <div className="zonePageContent">
            {/* Section 1: Overview */}
            <div>
              <div className="contentSectionTitle">
                <span>{locale === 'ko' ? '구역 소개' : 'Zone Overview'}</span>
                <span className="badge">
                  {locale === 'ko' ? `현지명: ${zone.nameLocal}` : `Local name: ${zone.nameLocal}`}
                </span>
              </div>
              <p className="zoneOverviewText">{overview}</p>
            </div>

            {/* Section 2: Top Attractions */}
            <div>
              <div className="contentSectionTitle">
                <span>{locale === 'ko' ? '대표 장소' : 'Top Attractions'}</span>
                <span className="badge">
                  {locale === 'ko' ? (isSunset ? '주요 명소 4선' : '대표 장소 4선') : 'Key Highlights'}
                </span>
              </div>
              <div className="attractionList">
                {zone.attractions.map((attr) => (
                  <div className="attrCard" key={attr.number}>
                    <div className="attrLeft">
                      <div className="attrNum">{attr.number}</div>
                      <div>
                        <strong>{attr.name[locale] || attr.name.en}</strong>
                        <em>{attr.description[locale] || attr.description.en}</em>
                      </div>
                    </div>
                    <span className="attrTag">{attr.tag[locale] || attr.tag.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Categories Filter Grid (Approved 8 tiles layout v9) */}
            <div>
              <div className="contentSectionTitle">
                <span>
                  {locale === 'ko'
                    ? (isSunset ? '선셋타운 카테고리' : '켐비치 카테고리')
                    : `${name} Categories`}
                </span>
                <span className="badge">{categoryBadge}</span>
              </div>
              <div className="categoryGridSmall">
                {zone.categories.map((cat, idx) => (
                  <Link
                    href={`${localePath(locale, `/directory/${cat.categoryKey}`)}?zone=${slug}`}
                    key={idx}
                    className="catBtn"
                  >
                    <span className="icon">{cat.icon}</span>
                    <span>{cat.name[locale] || cat.name.en}</span>
                    <small>
                      {locale === 'ko' ? `${cat.count}개소` : `${cat.count} venues`}
                    </small>
                  </Link>
                ))}
              </div>

              {/* Informational Note Banner */}
              {noteBanner ? (
                <div className={`zoneNoteBanner ${isSunset ? 'amberNotice' : 'greenNotice'}`}>
                  {noteBanner}
                </div>
              ) : null}
            </div>

            {/* Section 4: Inter-Zone Transit Guide */}
            <div className={`transitGuideBox ${!isSunset ? 'oceanBorder' : ''}`}>
              <div className="transitTitle">{transitHeadline}</div>
              <ul className="transitList">
                <li>
                  <strong>{locale === 'ko' ? '이동 안내:' : 'Transport:'}</strong> {transitDescription}
                </li>
              </ul>
              <div style={{ marginTop: '10px' }}>
                <Link
                  href={localePath(locale, `/zones/${otherZoneSlug}`)}
                  className="otherZoneLink"
                >
                  {isSunset
                    ? (locale === 'ko' ? '→ 켐비치(Bãi Khem) 상세 안내 보기' : '→ Explore Khem Beach Details')
                    : (locale === 'ko' ? '→ 선셋타운(Sunset Town) 상세 안내 보기' : '→ Explore Sunset Town Details')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
