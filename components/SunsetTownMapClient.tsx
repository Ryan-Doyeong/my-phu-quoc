'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n/config'

const InnerSunsetTownMap = dynamic(
  () => import('@/components/SunsetTownMap').then((m) => m.SunsetTownMap),
  { ssr: false }
)

const LOADING_TEXT: Record<Locale, { title: string; subtitle: string }> = {
  en: {
    title: 'Loading Sunset Town Guide Map...',
    subtitle: 'Initializing walking routes & 12 iconic landmarks',
  },
  ko: {
    title: '선셋타운 가이드 지도를 불러오는 중입니다...',
    subtitle: '거리망 및 12대 핵심 랜드마크 정보 초기화 중',
  },
  zh: {
    title: '正在加载日落小镇导览地图...',
    subtitle: '正在初始化街道网络与12大核心地标',
  },
  ja: {
    title: 'サンセットタウン案内マップを読み込み中...',
    subtitle: 'ストリート情報と12大ランドマークを初期化中',
  },
  ru: {
    title: 'Загрузка карты-путеводителя по Сансет-Тауну...',
    subtitle: 'Инициализация маршрутов и 12 ключевых достопримечательностей',
  },
  hi: {
    title: 'सनसेट टाउन गाइड मैप लोड हो रहा है...',
    subtitle: 'पैदल मार्गों और 12 प्रमुख स्थलों की जानकारी तैयार हो रही है',
  },
  vi: {
    title: 'Đang tải bản đồ hướng dẫn Thị trấn Hoàng Hôn...',
    subtitle: 'Đang khởi tạo các tuyến đường và 12 điểm đến biểu tượng',
  },
}

export function SunsetTownMap(props: {
  locale?: Locale
  initialSelectedId?: string
  height?: string
  showSidebar?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const loc = props.locale || 'en'
  const text = LOADING_TEXT[loc] || LOADING_TEXT.en

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          height: props.height || '650px',
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
        <strong style={{ fontSize: '15px', color: '#12333B' }}>{text.title}</strong>
        <span style={{ fontSize: '12.5px', color: '#64748B' }}>{text.subtitle}</span>
      </div>
    )
  }

  return <InnerSunsetTownMap {...props} locale={loc} />
}
