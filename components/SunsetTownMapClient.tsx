'use client'

import dynamic from 'next/dynamic'
import React from 'react'

export const SunsetTownMap = dynamic(
  () => import('@/components/SunsetTownMap').then((m) => m.SunsetTownMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '650px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
          borderRadius: '16px',
          border: '1px solid #E1ECEB',
          gap: '12px',
          color: '#527982',
        }}
      >
        <div style={{ fontSize: '36px' }}>🗺️</div>
        <strong style={{ fontSize: '15px', color: '#12333B' }}>선셋타운 공식 인터랙티브 지도를 불러오는 중입니다...</strong>
        <span style={{ fontSize: '12.5px', color: '#64748B' }}>거리망 및 12대 핵심 랜드마크 정보 초기화 중</span>
      </div>
    ),
  }
)
