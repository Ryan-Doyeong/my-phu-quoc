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

const ZONE_NAV_LABELS: {
  sunset: Record<string, string>
  khem: Record<string, string>
} = {
  sunset: {
    ko: '선셋타운',
    en: 'Sunset Town',
    zh: '日落小镇',
    ru: 'Сансет-Таун',
    ja: 'サンセットタウン',
    hi: 'सनसेट टाउन',
  },
  khem: {
    ko: '켐비치',
    en: 'Khem Beach',
    zh: '凯姆海滩',
    ru: 'Пляж Кхем',
    ja: 'ケムビーチ',
    hi: 'खेम बीच',
  },
}

function getOverviewTitle(locale: Locale): string {
  switch (locale) {
    case 'ko': return '구역 소개'
    case 'zh': return '区域概览'
    case 'ru': return 'Обзор района'
    case 'ja': return 'エリア概要'
    case 'hi': return 'क्षेत्र का परिचय'
    default: return 'Zone Overview'
  }
}

function getLocalNameBadge(local: string, locale: Locale): string {
  switch (locale) {
    case 'ko': return `현지명: ${local}`
    case 'zh': return `当地名称：${local}`
    case 'ru': return `Местное название: ${local}`
    case 'ja': return `現地名：${local}`
    case 'hi': return `स्थानीय नाम: ${local}`
    default: return `Local name: ${local}`
  }
}

function getTopAttractionsTitle(locale: Locale): string {
  switch (locale) {
    case 'ko': return '대표 장소'
    case 'zh': return '主要景点'
    case 'ru': return 'Основные достопримечательности'
    case 'ja': return '主な観光スポット'
    case 'hi': return 'प्रमुख दर्शनीय स्थल'
    default: return 'Top Attractions'
  }
}

function getKeyHighlightsBadge(isSunset: boolean, locale: Locale): string {
  if (locale === 'ko') return isSunset ? '주요 명소 4선' : '대표 장소 4선'
  switch (locale) {
    case 'zh': return '重点地点'
    case 'ru': return 'Ключевые места'
    case 'ja': return '主要スポット'
    case 'hi': return 'प्रमुख स्थान'
    default: return 'Key Highlights'
  }
}

function getCategoriesSectionTitle(name: string, isSunset: boolean, locale: Locale): string {
  if (locale === 'ko') return isSunset ? '선셋타운 카테고리' : '켐비치 카테고리'
  switch (locale) {
    case 'zh': return `${name}分类`
    case 'ru': return `${name}: категории`
    case 'ja': return `${name}のカテゴリー`
    case 'hi': return `${name} की श्रेणियाँ`
    default: return `${name} Categories`
  }
}

function getVenuesCountText(count: number, locale: Locale): string {
  if (locale === 'ko') return `${count}개소`
  switch (locale) {
    case 'zh': return `${count} 处`
    case 'ru': return `${count} объектов`
    case 'ja': return `${count}か所`
    case 'hi': return `${count} स्थान`
    default: return `${count} venues`
  }
}

function getTransportLabel(locale: Locale): string {
  switch (locale) {
    case 'ko': return '이동 안내:'
    case 'zh': return '交通指南：'
    case 'ru': return 'Как добраться:'
    case 'ja': return 'アクセス案内：'
    case 'hi': return 'आवागमन की जानकारी:'
    default: return 'Transport:'
  }
}

function getCrossZoneLinkText(isSunset: boolean, locale: Locale): string {
  if (isSunset) {
    switch (locale) {
      case 'ko': return '→ 켐비치(Bãi Khem) 상세 안내 보기'
      case 'zh': return '→ 查看凯姆海滩（Bãi Khem）详细信息'
      case 'ru': return '→ Подробнее о пляже Кхем (Bãi Khem)'
      case 'ja': return '→ ケムビーチ（Bãi Khem）の詳細を見る'
      case 'hi': return '→ खेम बीच (Bãi Khem) की विस्तृत जानकारी देखें'
      default: return '→ Explore Khem Beach Details'
    }
  } else {
    switch (locale) {
      case 'ko': return '→ 선셋타운(Sunset Town) 상세 안내 보기'
      case 'zh': return '→ 查看日落小镇（Sunset Town）详细信息'
      case 'ru': return '→ Подробнее о Сансет-Тауне (Sunset Town)'
      case 'ja': return '→ サンセットタウン（Sunset Town）の詳細を見る'
      case 'hi': return '→ सनसेट टाउन (Sunset Town) की विस्तृत जानकारी देखें'
      default: return '→ Explore Sunset Town Details'
    }
  }
}

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
              {ZONE_NAV_LABELS.sunset[locale] || ZONE_NAV_LABELS.sunset.en}
            </Link>
            <Link
              href={localePath(locale, '/zones/khem-beach')}
              className={slug === 'khem-beach' ? 'active' : ''}
            >
              {ZONE_NAV_LABELS.khem[locale] || ZONE_NAV_LABELS.khem.en}
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
          {/* Top Bar (User-facing only: Zone name & approved badge) */}
          <div className="frameTopBar">
            <span className="frameTopBarTitle">{name}</span>
            <span className="frameTopBarBadge">{badge}</span>
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
                <span>{getOverviewTitle(locale)}</span>
                <span className="badge">
                  {getLocalNameBadge(zone.nameLocal, locale)}
                </span>
              </div>
              <p className="zoneOverviewText">{overview}</p>
            </div>

            {/* Section 2: Top Attractions */}
            <div>
              <div className="contentSectionTitle">
                <span>{getTopAttractionsTitle(locale)}</span>
                <span className="badge">
                  {getKeyHighlightsBadge(isSunset, locale)}
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
                <span>{getCategoriesSectionTitle(name, isSunset, locale)}</span>
                <span className="badge">{categoryBadge}</span>
              </div>
              <div className="categoryGridSmall">
                {zone.categories
                  .filter((cat) => cat.count > 0)
                  .map((cat, idx) => (
                  <Link
                    href={`${localePath(locale, `/directory/${cat.categoryKey}`)}?zone=${slug}`}
                    key={idx}
                    className="catBtn"
                  >
                    <span className="icon">{cat.icon}</span>
                    <span>{cat.name[locale] || cat.name.en}</span>
                    <small>
                      {getVenuesCountText(cat.count, locale)}
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
                  <strong>{getTransportLabel(locale)}</strong> {transitDescription}
                </li>
              </ul>
              <div style={{ marginTop: '10px' }}>
                <Link
                  href={localePath(locale, `/zones/${otherZoneSlug}`)}
                  className="otherZoneLink"
                >
                  {getCrossZoneLinkText(isSunset, locale)}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
