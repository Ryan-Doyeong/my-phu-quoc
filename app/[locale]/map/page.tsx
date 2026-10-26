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

interface MapPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: MapPageProps): Promise<Metadata> {
  const { locale } = await params
  const isKo = locale === 'ko'
  return {
    title: isKo
      ? '선셋타운 완벽 여행 지도 — 거리별 명소 & 12대 랜드마크 안내 | My Phu Quoc'
      : 'Sunset Town Guide Map — Street Navigation & 12 Iconic Landmarks | My Phu Quoc',
    description: isKo
      ? '선그룹 공식 선셋타운 일러스트 지도를 기반으로 키스브릿지, 75m 시계탑, 케이블카, 부이페스트 야시장, 6대 구역 및 주요 거리를 한눈에 탐색하세요.'
      : 'Explore Sunset Town with Sun Group official map tiles, featuring Kiss Bridge, Clock Tower, Cable Car Station, Vui-Fest Bazaar and 6 distinct Italian quarters.',
  }
}

export default async function MapPage({ params }: MapPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isKo = locale === 'ko'

  return (
    <div className="siteRoot" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* 헤더 */}
      <header className="siteHeader" style={{ background: '#12333B', color: '#ffffff' }}>
        <Logo locale={locale} />
        <nav className="desktopNav">
          <Link href={localePath(locale, '/')}>Home</Link>
          <Link href={localePath(locale, '/map')} style={{ color: '#C86D2D', fontWeight: 800 }}>
            🗺️ {isKo ? '선셋타운 지도' : 'Town Map'}
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
            SUN GROUP OFFICIAL SUNSET TOWN MAP
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#12333B', margin: '0 0 10px' }}>
            {isKo ? '선셋타운 거리 & 12대 랜드마크 인터랙티브 가이드 맵' : 'Sunset Town Interactive Street & Landmark Guide Map'}
          </h1>
          <p style={{ fontSize: '15.5px', color: '#527982', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {isKo
              ? '선그룹 공식 선셋타운 지도 타일과 연동되어 6대 구역, 8개 주요 거리(베니스, 소렌토, 아말피 등) 및 키스 브릿지·불꽃쇼·케이블카 등 핵심 관광 포인트의 실시간 위치와 관람 꿀팁을 제공합니다.'
              : 'Integrated with Sun Group official Sunset Town map tiles. Discover 6 quarters, 8 main boulevards, and 12 iconic landmarks with insider tips.'}
          </p>
        </div>

        {/* 인터랙티브 지도 컴포넌트 */}
        <SunsetTownMap locale={locale} height="700px" showSidebar={true} />

        {/* 하단 6대 구역 가이드 카드 요약 */}
        <section style={{ marginTop: '50px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#12333B' }}>
              🏛️ {isKo ? '선셋타운 6대 명품 구역 한눈에 보기' : 'Sunset Town 6 Distinct Italian Quarters'}
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                zone: 'venice',
                title: isKo ? '베니스 (Venice)' : 'Venice Quarter',
                badge: '해안 산책로 & 야시장',
                desc: isKo
                  ? '부이페스트 야시장, 롱비치 해변, 바닷가 바로 앞 노을 명당 카페와 낭만적인 부티크 호텔 밀집.'
                  : 'VUI-Fest night market, Sunset beach, romantic waterfront dining and cozy boutique hotels.',
                tag: 'Đường Venice',
              },
              {
                zone: 'sorrento',
                title: isKo ? '소렌토 (Sorrento)' : 'Sorrento Quarter',
                badge: '케이블카 & 개선문',
                desc: isKo
                  ? '개선문 관문부터 폼페이 유적 기둥, 콜로세움 모티브의 썬월드 케이블카 승강장이 있는 활기찬 남측 중심.'
                  : 'Arc de Triomphe, Pompeii Ruins, and the world longest cable car Colosseum gateway.',
                tag: 'Đường Sorrento',
              },
              {
                zone: 'amalfi',
                title: isKo ? '아말피 (Amalfi)' : 'Amalfi Quarter',
                badge: '시계탑 & 오션뷰 테라스',
                desc: isKo
                  ? '75m 센트럴 시계탑, 태양의 분수, 용의 계단, 빌 벤슬리의 썬 시그니처 갤러리가 있는 지중해 절벽 마을.'
                  : '75m Campanile Clock Tower, Sun God Fountain, Dragon Stairs, and cliffside dining terraces.',
                tag: 'Đường Amalfi',
              },
              {
                zone: 'central',
                title: isKo ? '센트럴 (Central)' : 'Central / Kiss Bridge',
                badge: '키스브릿지 & 불꽃쇼',
                desc: isKo
                  ? '세계적인 석양 랜드마크 키스 브릿지와 매일 밤 불꽃놀이가 터지는 키스오브더씨 해상 극장 광장.'
                  : 'Iconic Kiss Bridge over the sea and the nightly Kiss of the Sea fireworks amphitheater.',
                tag: 'Cầu Hôn · Quảng trường',
              },
              {
                zone: 'positano',
                title: isKo ? '포지타노 (Positano)' : 'Positano Quarter',
                badge: '부티크 & 힐링 스파',
                desc: isKo
                  ? '알록달록 파스텔톤 이탈리아풍 숍하우스, 베트남 전통 아로마 스파, 디저트 베이커리 거리.'
                  : 'Vibrant pastel shophouses, serene massage spas, specialty cafes, and local craft shops.',
                tag: 'Đường Positano',
              },
              {
                zone: 'hillside',
                title: isKo ? '힐사이드 (Hillside)' : 'Hillside Quarter',
                badge: '360도 스카이라인 전망',
                desc: isKo
                  ? 'Sun Grand City Hillside 아파트먼트 단지와 루프탑 인피니티 풀에서 내려다보는 선셋타운 파노라마.'
                  : 'Sun Grand City Hillside towers, residential suites, and highest vantage rooftop panoramas.',
                tag: 'Đường Hillside',
              },
            ].map((q) => (
              <div
                key={q.zone}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '18px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#C86D2D', background: '#FDF7F2', padding: '2px 8px', borderRadius: '4px' }}>
                    {q.badge}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{q.tag}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#12333B', margin: '0 0 6px' }}>
                  {q.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  {q.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
