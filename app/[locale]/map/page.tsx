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
import { tUi } from '@/lib/i18n/uiStrings'

interface MapPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: MapPageProps): Promise<Metadata> {
  const { locale } = await params
  const isKo = locale === 'ko'
  return {
    title: isKo
      ? '선셋타운 안내 지도 — 거리별 명소 & 12대 랜드마크 안내 | My Phu Quoc'
      : tUi('Sunset Town Guide Map — Street Navigation & 12 Iconic Landmarks | My Phu Quoc', locale),
    description: isKo
      ? '선셋타운 마스터플랜 일러스트 지도를 기반으로 키스브릿지, 75m 시계탑, 해상 케이블카, 부이페스트 야시장, 6대 구역 및 주요 거리를 한눈에 탐색하세요.'
      : tUi('Explore Sunset Town with our illustrated guide map, featuring Kiss Bridge, Clock Tower, 3-rope Cable Car, Vui-Fest Bazaar and 6 distinct quarters.', locale),
  }
}

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
      eyebrow: tUi('SUNSET TOWN ILLUSTRATED GUIDE MAP', 'zh'),
      title: '日落小镇街道与12大核心地标互动导览图',
      subtitle: '基于日落小镇手绘全景地图，精准标注亲吻桥、海上大秀烟花、跨海缆车等12大核心景点位置与实用贴士。',
      zoneBannerTitle: '探索日落小镇6大特色街区',
      zoneBannerDesc: '在街区专页中全面了解威尼斯、索伦托、阿玛菲、中心区、波西塔诺与山腰区的地中海风情。',
      zoneBannerBtn: '前往6大街区全景指南 →',
    },
    ja: {
      eyebrow: tUi('SUNSET TOWN ILLUSTRATED GUIDE MAP', 'ja'),
      title: 'サンセットタウン ストリート＆12大ランドマーク案内マップ',
      subtitle: 'イラストマップ上でキスブリッジ、花火ショー、ロープウェイ駅など12大名所のピン位置と旅行者のヒントをチェックできます。',
      zoneBannerTitle: 'サンセットタウン6大エリア詳細ガイドを見る',
      zoneBannerDesc: 'ヴェネツィア、ソレント、アマルフィ、セントラル、ポジターノ、ヒルサイドの6大エリアの魅力を詳しく紹介。',
      zoneBannerBtn: '6大エリアガイドを見る →',
    },
    ru: {
      eyebrow: tUi('SUNSET TOWN ILLUSTRATED GUIDE MAP', 'ru'),
      title: 'Карта Сансет-Тауна и 12 главных достопримечательностей',
      subtitle: 'Интерактивная иллюстрированная карта с точным расположением Моста поцелуев, канатной дороги и 12 ключевых мест с советами.',
      zoneBannerTitle: 'Гид по 6 районам Сансет-Тауна',
      zoneBannerDesc: 'Узнайте об особенностях районов Венеция, Сорренто, Амальфи, Центральный, Позитано и Хиллсайд.',
      zoneBannerBtn: 'Перейти к гиду по районам →',
    },
    hi: {
      eyebrow: tUi('SUNSET TOWN ILLUSTRATED GUIDE MAP', 'hi'),
      title: 'सनसेट टाउन 12 प्रमुख दर्शनीय स्थल गाइड नक्शा',
      subtitle: 'किस ब्रिज, आतिशबाजी शो और 12 प्रमुख स्थलों के सटीक पिन और उपयोगी सुझावों के साथ सचित्र इंटरैक्टिव नक्शा।',
      zoneBannerTitle: 'सनसेट टाउन के 6 प्रमुख क्षेत्र देखें',
      zoneBannerDesc: 'वेनिस, सोरेंटो, अमाल्फी, सेंट्रल, पॉसिटानो और हिलसाइड क्षेत्रों का विशेष गाइड देखें।',
      zoneBannerBtn: '6 प्रमुख क्षेत्र गाइड देखें →',
    },
  }

  const t = pageTexts[locale] || pageTexts.en

  return (
    <div className="siteRoot" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* 사이트 상단 공통 헤더 */}
      <header className="siteHeader" style={{ background: '#12333B', color: '#ffffff' }}>
        <Logo locale={locale} />
        <nav className="desktopNav">
          <Link href={localePath(locale, '/')}>Home</Link>
          <Link href={localePath(locale, '/map')} style={{ color: '#C86D2D', fontWeight: 800 }}>
            {isKo ? '🗺️ 선셋타운 지도' : locale === 'vi' ? '🗺️ Bản đồ thị trấn' : tUi('🗺️  Town Map', locale)}
          </Link>
          {DIRECTORY_CATEGORY_KEYS.slice(0, 5).map((key) => (
            <Link href={localePath(locale, `/directory/${key}`)} key={key}>
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

        {/* 1. 상단 인터랙티브 지도 & 2. 12대 명소 아코디언 카드 목록 */}
        <SunsetTownMap locale={locale} />

        {/* 3. 하단 구역 전용 페이지(/zones/sunset-town) 링크 배너 (중복 제거 및 연계 연결) */}
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
      </main>
    </div>
  )
}
