import React from 'react'
import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { SunsetIllustMap, type MapDataPayload } from '@/components/map/SunsetIllustMap'
import { createPublicClient } from '@/lib/supabase/public'
import baseMapJson from '@/data/sunset-illust-map-data.json'
import styles from './map-preview.module.css'

// Ryan 지시: Next.js ISR 300초(5분) 캐시 갱신
export const revalidate = 300

interface MapPreviewPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: MapPreviewPageProps): Promise<Metadata> {
  const { locale } = await params
  const isKo = locale === 'ko'
  return {
    title: isKo
      ? '선셋타운 F&B 일러스트 지도 | My Phu Quoc'
      : 'Sunset Town F&B Illustrated Map | My Phu Quoc',
    description: isKo
      ? '선셋타운 일러스트 지도를 기반으로 추천 식당·카페·바의 블록별 위치와 시계탑 기준 도보 이동 시간을 한눈에 탐색하세요.'
      : 'Explore dining, cafe, and bar venues in Sunset Town with our interactive illustrated map and walking times.',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function MapPreviewPage({ params }: MapPreviewPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)

  const supabase = createPublicClient()

  // 1. Supabase businesses 테이블에서 published 상태인 F&B 업체 목록 조회
  // [안전 보강 · Ryan 지시]: DB 통신 오류 또는 0건 반환 시 전체가 노출되는 취약점 원천 방어
  const { data: dbBusinesses, error: dbError } = await supabase
    .from('businesses')
    .select('slug, status, category')
    .eq('status', 'published')
    .in('category', ['dining', 'bars'])

  if (dbError || !dbBusinesses || dbBusinesses.length === 0) {
    console.error('[MapPreview] Supabase fetch error or empty results:', dbError)
    // Next.js ISR(revalidate=300) 환경에서 에러를 던져 직전의 정상 ISR 캐시를 유지하고 미검증 노출 차단
    throw new Error(
      `[MapPreview] Supabase query failed or returned 0 items: ${dbError?.message || '0 items'}`
    )
  }

  const publishedSlugs = new Set<string>()
  dbBusinesses.forEach((b: any) => {
    publishedSlugs.add(b.slug)
  })

  // 2. 보조 정적 JSON 데이터와 DB published 목록 순수 결합
  // [안전 보강 · 화이트리스트 방식]: publishedSlugs에 명시적으로 존재하는 항목만 통과
  const rawBase = baseMapJson as any

  // DB published에 명시적으로 존재하는 내부 업체만 유지
  const filteredVenues = (rawBase.venues || []).filter((v: any) => publishedSlugs.has(v.slug))

  // DB published에 명시적으로 존재하는 외곽 매장만 유지
  const filteredOutside = (rawBase.outside || []).filter((ov: any) => publishedSlugs.has(ov.slug))

  // 블록별 venues 갱신
  const filteredBlocks = (rawBase.blocks || []).map((b: any) => ({
    ...b,
    venues: (b.venues || []).filter((v: any) => publishedSlugs.has(v.slug))
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
    outside: filteredOutside
  }

  return (
    <div className={styles.previewPage}>
      {/* Top Header Navigation - Cleanly adapted for mobile */}
      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}>
            <Logo locale={locale} />
          </div>

          <div className={styles.navGroup}>
            {/* Desktop Navigation Links */}
            <nav className={styles.desktopNav}>
              <Link href={localePath(locale, '/')} className={styles.navLink}>
                {dict.nav.home}
              </Link>
              <Link href={localePath(locale, '/directory/dining')} className={styles.navLink}>
                {locale === 'ko' ? '식당' : 'Dining'}
              </Link>
              <Link href={localePath(locale, '/directory/bars')} className={styles.navLink}>
                {locale === 'ko' ? '바 & 펍' : 'Bars'}
              </Link>
            </nav>

            {/* Mobile Home Button (prevents letter wrapping) */}
            <Link href={localePath(locale, '/')} className={styles.mobileHomeBtn}>
              🏠 {dict.nav.home}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area - Full width edge-to-edge on mobile */}
      <main className={styles.mainContainer}>
        <SunsetIllustMap initialLocale={locale} showLanguageSwitcher={true} initialMapData={dynamicMapData} />
      </main>

      {/* Footer */}
      <footer className={styles.siteFooter}>
        <p>MyPhuQuoc.NET · Sunset Town Illustrated F&B Map · Local Implementation</p>
      </footer>
    </div>
  )
}
