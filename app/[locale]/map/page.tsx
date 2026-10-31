import React from 'react'
import type { Metadata } from 'next'
import { SunsetTownMap } from '@/components/SunsetTownMapClient'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MobileMenu } from '@/components/MobileMenu'
import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import { DIRECTORY_CATEGORY_KEYS, categoryLabel } from '@/lib/directory'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { createPublicClient } from '@/lib/supabase/public'
import baseMapJson from '@/data/sunset-illust-map-data.json'
import type { MapDataPayload } from '@/components/map/SunsetIllustMap'
import { MapTabContainer } from '@/components/map/MapTabContainer'
import { JsonLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/supabase/config'
import { buildAlternates, localeUrl, ogLocaleFor } from '@/lib/i18n/config'
import { MAP_DESCRIPTION, MAP_TITLE } from '@/lib/seo/meta'
import { mapPageJsonLd } from '@/lib/seo/mapJsonld'

// Ryan 지시: Next.js ISR 300초(5분) 캐시 갱신
export const revalidate = 300

interface MapPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: MapPageProps): Promise<Metadata> {
  const { locale } = await params
  const title = MAP_TITLE[locale] || MAP_TITLE.en
  const description = MAP_DESCRIPTION[locale] || MAP_DESCRIPTION.en
  const canonical = localeUrl(locale, '/map')
  const image = `${SITE_URL}/tickets/kiss-bridge.webp`
  return {
    title,
    description,
    alternates: { canonical, languages: buildAlternates('/map').languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'My Phu Quoc',
      type: 'website',
      locale: ogLocaleFor(locale),
      images: [{ url: image, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

/**
 * [업무 지시 · Ryan] SUNSET TOWN 6 QUARTERS 배너 조건부 숨김 처리
 * 사유: 아직 사용 계획이 없으므로 화면에서 비노출.
 * 규칙: 코드 삭제 금지, 설정 플래그(SHOW_6_QUARTERS_BANNER)로 조건부 숨김 처리하여 추후 용이하게 복구 가능.
 * 복구 필요 시: SHOW_6_QUARTERS_BANNER = true 로 변경하면 즉시 원상 복구됩니다.
 */
const SHOW_6_QUARTERS_BANNER = false

export default async function MapPage({ params }: MapPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isKo = locale === 'ko'

  // 다국어 텍스트 대응
  const pageTexts: Record<Locale, {
    eyebrow: string
    title: string
    subtitle: string
    zoneBannerTitle: string
    zoneBannerDesc: string
    zoneBannerBtn: string
  }> = {
    ko: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: '선셋타운 거리 & 12대 랜드마크 인터랙티브 가이드 맵',
      subtitle: '선셋타운 마스터플랜 일러스트를 기반으로 키스 브릿지·불꽃쇼·케이블카 등 12대 핵심 관광 랜드마크의 실시간 위치와 관람 꿀팁을 제공합니다.',
      zoneBannerTitle: '선셋타운 6대 구역 상세 가이드 둘러보기',
      zoneBannerDesc: '베니스(Venice), 소렌토(Sorrento), 아말피(Amalfi), 센트럴(Central), 포지타노(Positano), 힐사이드(Hillside) 등 각 구역의 역사, 건축 양식 및 특색을 확인하세요.',
      zoneBannerBtn: '6대 구역 전용 가이드 바로가기 →',
    },
    en: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: 'Sunset Town Street & 12 Iconic Landmarks Guide Map',
      subtitle: 'Interactive master plan map pinpointing Kiss Bridge, the nightly fireworks amphitheater, cable car terminal, and all 12 key landmarks with insider tips.',
      zoneBannerTitle: 'Explore Sunset Town 6 Distinct Quarters',
      zoneBannerDesc: 'Discover the architecture, vibe, and stories of Venice, Sorrento, Amalfi, Central, Positano, and Hillside in our dedicated quarters guide.',
      zoneBannerBtn: 'View 6 Quarters Guide →',
    },
    vi: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: 'Bản đồ minh họa & 12 Điểm đến biểu tượng Sunset Town',
      subtitle: 'Bản đồ tương tác chỉ dẫn chính xác vị trí Cầu Hôn, tháp đồng hồ 75m, bến cáp treo và 12 điểm đến hàng đầu cùng mẹo tham quan.',
      zoneBannerTitle: 'Khám phá 6 Phân khu đặc trưng Thị trấn Hoàng Hôn',
      zoneBannerDesc: 'Tìm hiểu kiến trúc Địa Trung Hải và trải nghiệm tại Venice, Sorrento, Amalfi, Central, Positano và Hillside.',
      zoneBannerBtn: 'Xem cẩm nang 6 Phân khu →',
    },
    zh: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: '日落小镇街道与12大核心地标互动导览图',
      subtitle: '基于日落小镇手绘全景地图，精准标注亲吻桥、海上大秀烟花、跨海缆车等12大核心景点位置与实用贴士。',
      zoneBannerTitle: '探索日落小镇6大特色街区',
      zoneBannerDesc: '在街区专页中全面了解威尼斯、索伦托、阿玛菲、中心区、波西塔诺与山腰区的地中海风情。',
      zoneBannerBtn: '前往6大街区全景指南 →',
    },
    ja: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: 'サンセットタウン ストリート＆12大ランドマーク案内マップ',
      subtitle: 'イラストマップ上でキスブリッジ、花火ショー、ロープウェイ駅など12大名所のピン位置と旅行者のヒントをチェックできます。',
      zoneBannerTitle: 'サンセットタウン6大エリア詳細ガイドを見る',
      zoneBannerDesc: 'ヴェネツィア、ソレント、アマルフィ、セントラル、ポジターノ、ヒルサイドの6大エリアの魅力を詳しく紹介。',
      zoneBannerBtn: '6大エリアガイドを見る →',
    },
    ru: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: 'Карта Сансет-Тауна и 12 главных достопримечательностей',
      subtitle: 'Интерактивная иллюстрированная карта с точным расположением Моста поцелуев, канатной дороги и 12 ключевых мест с советами.',
      zoneBannerTitle: 'Гид по 6 районам Сансет-Тауна',
      zoneBannerDesc: 'Узнайте об особенностях районов Венеция, Сорренто, Амальфи, Центральный, Позитано и Хиллсайд.',
      zoneBannerBtn: 'Перейти к гиду по районам →',
    },
    hi: {
      eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
      title: 'सनसेट टाउन 12 प्रमुख दर्शनीय स्थल गाइड नक्शा',
      subtitle: 'किस ब्रिज, आतिशबाजी शो और 12 प्रमुख स्थलों के सटीक पिन और उपयोगी सुझावों के साथ सचित्र इंटरैक्टिव नक्शा।',
      zoneBannerTitle: 'सनसेट टाउन के 6 प्रमुख क्षेत्र देखें',
      zoneBannerDesc: 'वेनिस, सोरेंटो, अमाल्फी, सेंट्रल, पॉसिटानो और हिलसाइड क्षेत्रों का विशेष गाइड देखें।',
      zoneBannerBtn: '6 प्रमुख क्षेत्र गाइड देखें →',
    },
  }

  const t = pageTexts[locale] || pageTexts.en

  // 1. Supabase businesses 테이블에서 published 상태인 F&B 업체 목록 조회
  // [안전 보강 · Ryan 지시]: DB 통신 오류 또는 0건 반환 시 전체가 노출되는 취약점 원천 방어
  const supabase = createPublicClient()
  const { data: dbBusinesses, error: dbError } = await supabase
    .from('businesses')
    .select('slug, status, category')
    .eq('status', 'published')
    .in('category', ['dining', 'bars'])

  if (dbError || !dbBusinesses || dbBusinesses.length === 0) {
    console.error('[MapPage] Supabase fetch error or empty results:', dbError)
    throw new Error(
      `[MapPage] Supabase query failed or returned 0 items: ${dbError?.message || '0 items'}`
    )
  }

  const publishedSlugs = new Set<string>()
  dbBusinesses.forEach((b: any) => {
    publishedSlugs.add(b.slug)
  })

  // 2. 보조 정적 JSON 데이터와 DB published 목록 순수 결합 (화이트리스트 방식)
  const rawBase = baseMapJson as any
  const filteredVenues = (rawBase.venues || []).filter((v: any) => publishedSlugs.has(v.slug))
  const filteredOutside = (rawBase.outside || []).filter((ov: any) => publishedSlugs.has(ov.slug))
  const filteredBlocks = (rawBase.blocks || []).map((b: any) => ({
    ...b,
    venues: (b.venues || []).filter((v: any) => publishedSlugs.has(v.slug)),
  }))

  const diningInside = filteredVenues.filter((v: any) => v.cat === 'dining').length
  const barsInside = filteredVenues.filter((v: any) => v.cat === 'bars').length

  const dynamicMapData: MapDataPayload = {
    summary: {
      ...rawBase.summary,
      total_live_union: filteredVenues.length + filteredOutside.length,
      inside_map: filteredVenues.length,
      outside_map: filteredOutside.length,
      dining_inside: diningInside,
      bars_inside: barsInside,
      dining_outside: filteredOutside.filter((v: any) => v.cat === 'dining').length,
      bars_outside: filteredOutside.filter((v: any) => v.cat === 'bars').length,
    },
    blocks: filteredBlocks,
    venues: filteredVenues,
    outside: filteredOutside,
  }

  return (
    <div className="siteRoot" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <JsonLd data={mapPageJsonLd(locale, dict.nav.home)} />
      {/* 사이트 상단 공통 헤더 */}
      <header className="siteHeader" style={{ background: '#12333B', color: '#ffffff' }}>
        <Logo locale={locale} />
        <nav className="desktopNav">
          <Link href={localePath(locale, '/')}>Home</Link>
          <Link href={localePath(locale, '/map')} style={{ color: '#C86D2D', fontWeight: 800 }}>
            🗺️ {isKo ? '선셋타운 지도' : 'Town Map'}
          </Link>
          {DIRECTORY_CATEGORY_KEYS.slice(0, 5).map((key) => (
            <Link
              href={key === 'hotels' ? localePath(locale, '/hotels') : localePath(locale, `/directory/${key}`)}
              key={key}
            >
              {categoryLabel(key, locale)}
            </Link>
          ))}
          <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
        </nav>
        <div className="headerActions">
          <LanguageSwitcher locale={locale} variant="hero" />
          <MobileMenu locale={locale} />
        </div>
      </header>

      {/* 지도 메인 컨텐츠 영역 */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(200, 109, 45, 0.12)',
              color: '#C86D2D',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            {t.eyebrow}
          </span>
          <h1 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 800, color: '#12333B', margin: '0 0 12px' }}>
            {t.title}
          </h1>
          <p style={{ fontSize: '15.5px', color: '#527982', maxWidth: '780px', margin: '0 auto', lineHeight: 1.65 }}>
            {t.subtitle}
          </p>
        </div>

        {/* 2대 탭 컨테이너 (탭1: 12대 관광 명소 / 탭2: 맛집 지도 85곳) */}
        <MapTabContainer
          locale={locale}
          dynamicMapData={dynamicMapData}
          landmarksChild={
            <>
              {/* 1. 상단 인터랙티브 지도 & 2. 12대 명소 아코디언 카드 목록 */}
              <SunsetTownMap locale={locale} />

              {/* 3. 하단 구역 전용 페이지(/zones/sunset-town) 링크 배너 (Ryan 지시: 미사용 계획으로 조건부 숨김 처리) */}
              {SHOW_6_QUARTERS_BANNER && (
                <section style={{ marginTop: '60px' }}>
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '32px 28px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '24px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ maxWidth: '720px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          color: '#C86D2D',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          display: 'inline-block',
                          marginBottom: '6px',
                        }}
                      >
                        SUNSET TOWN 6 QUARTERS
                      </span>
                      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#12333B', margin: '0 0 8px' }}>
                        🏛️ {t.zoneBannerTitle}
                      </h2>
                      <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
                        {t.zoneBannerDesc}
                      </p>
                    </div>
                    <Link
                      href={localePath(locale, '/zones/sunset-town')}
                      className="primaryButton"
                      style={{
                        background: '#12333B',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '999px',
                        fontWeight: 700,
                        fontSize: '14px',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>{t.zoneBannerBtn}</span>
                    </Link>
                  </div>
                </section>
              )}
            </>
          }
        />
      </main>
    </div>
  )
}
