'use client'

import React, { useState, useEffect } from 'react'
import type { Locale } from '@/lib/i18n/config'
import { SunsetIllustMap, type MapDataPayload } from '@/components/map/SunsetIllustMap'

export interface MapTabLabels {
  landmarks: string
  dining: string
  diningNeedsReview?: boolean
}

export const MAP_TAB_LABELS: Record<Locale, MapTabLabels> = {
  ko: {
    landmarks: '12대 관광 명소',
    dining: '맛집 지도',
  },
  en: {
    landmarks: '12 Iconic Landmarks',
    dining: 'Dining Map',
  },
  zh: {
    landmarks: '12大核心地标',
    dining: 'Dining Map', // Ryan 지시: 번역 미확정 언어는 영어로 보존 후 보고서에 '번역 검수 필요' 표시
    diningNeedsReview: true,
  },
  ja: {
    landmarks: '12大ランドマーク',
    dining: 'Dining Map', // 번역 검수 필요
    diningNeedsReview: true,
  },
  ru: {
    landmarks: '12 достопримечательностей',
    dining: 'Dining Map', // 번역 검수 필요
    diningNeedsReview: true,
  },
  hi: {
    landmarks: '12 प्रमुख दर्शनीय स्थल',
    dining: 'Dining Map', // 번역 검수 필요
    diningNeedsReview: true,
  },
  vi: {
    landmarks: '12 điểm đến biểu tượng',
    dining: 'Dining Map', // 번역 검수 필요
    diningNeedsReview: true,
  },
}

interface MapTabContainerProps {
  locale: Locale
  dynamicMapData: MapDataPayload
  landmarksChild: React.ReactNode
}

export function MapTabContainer({
  locale,
  dynamicMapData,
  landmarksChild,
}: MapTabContainerProps) {
  const [activeTab, setActiveTab] = useState<'landmarks' | 'dining'>('landmarks')
  const [mounted, setMounted] = useState(false)

  // URL 해시(#food) 감지 및 연동
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && window.location.hash === '#food') {
      setActiveTab('dining')
    }

    const handleHashChange = () => {
      if (window.location.hash === '#food') {
        setActiveTab('dining')
      } else {
        setActiveTab('landmarks')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleTabChange = (tab: 'landmarks' | 'dining') => {
    setActiveTab(tab)
    if (typeof window !== 'undefined') {
      if (tab === 'dining') {
        window.history.replaceState(null, '', `${window.location.pathname}#food`)
      } else {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }
  }

  const tabLabels = MAP_TAB_LABELS[locale] || MAP_TAB_LABELS.en
  const totalVenues = dynamicMapData.summary.total_live_union || 85

  return (
    <div style={{ width: '100%' }}>
      {/* 2대 탭 네비게이션 세그먼트 컨트롤 (모바일 390px 친화적 디자인) */}
      <div
        role="tablist"
        aria-label="Map Mode Tabs"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          maxWidth: '520px',
          margin: '0 auto 28px',
          padding: '5px',
          background: '#E2E8F0',
          borderRadius: '16px',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* 탭 1: 12대 관광 명소 */}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'landmarks'}
          onClick={() => handleTabChange('landmarks')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px 12px',
            fontSize: '14px',
            fontWeight: activeTab === 'landmarks' ? 800 : 600,
            color: activeTab === 'landmarks' ? '#12333B' : '#64748B',
            background: activeTab === 'landmarks' ? '#FFFFFF' : 'transparent',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.18s ease-in-out',
            boxShadow:
              activeTab === 'landmarks'
                ? '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)'
                : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>🏛️</span>
          <span>{tabLabels.landmarks}</span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '999px',
              background: activeTab === 'landmarks' ? '#F1F5F9' : 'rgba(100, 116, 139, 0.12)',
              color: activeTab === 'landmarks' ? '#0F766E' : '#64748B',
              fontWeight: 700,
            }}
          >
            12
          </span>
        </button>

        {/* 탭 2: 맛집 지도 */}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'dining'}
          onClick={() => handleTabChange('dining')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px 12px',
            fontSize: '14px',
            fontWeight: activeTab === 'dining' ? 800 : 600,
            color: activeTab === 'dining' ? '#12333B' : '#64748B',
            background: activeTab === 'dining' ? '#FFFFFF' : 'transparent',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.18s ease-in-out',
            boxShadow:
              activeTab === 'dining'
                ? '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)'
                : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>🍽️</span>
          <span>{tabLabels.dining}</span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '999px',
              background: activeTab === 'dining' ? '#FFF1E8' : 'rgba(100, 116, 139, 0.12)',
              color: activeTab === 'dining' ? '#C86D2D' : '#64748B',
              fontWeight: 700,
            }}
          >
            {totalVenues}
          </span>
        </button>
      </div>

      {/* 탭 1 컨텐츠: 기존 12대 명소 가이드 맵 (기존 UI 100% 보존) */}
      <div style={{ display: activeTab === 'landmarks' ? 'block' : 'none' }}>
        {landmarksChild}
      </div>

      {/* 탭 2 컨텐츠: 맛집 & 편의시설 일러스트 지도 (85곳 DB 연동) */}
      <div style={{ display: activeTab === 'dining' ? 'block' : 'none' }}>
        <SunsetIllustMap
          initialLocale={locale}
          showLanguageSwitcher={false}
          initialMapData={dynamicMapData}
        />
      </div>
    </div>
  )
}
