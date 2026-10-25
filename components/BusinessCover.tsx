'use client'

import React from 'react'

export interface BusinessCoverProps {
  name: string
  googleName?: string | null
  category: string
  subcategory?: string | null
  className?: string
  aspectRatio?: 'card' | 'hero'
}

/**
 * 카테고리별 브랜드 단색 배경 팔레트 (docs/00_사이트_정의서.md 및 docs/design 기준)
 * - Ocean #0B7A8A 계열 (Activities, Beach, Wellness, Essentials, Hotels)
 * - Sunset Amber #C86D2D 계열 (Dining, Bars, Shopping)
 */
export const CATEGORY_COVER_COLORS: Record<string, { bg: string; text: string }> = {
  dining: { bg: '#C86D2D', text: '#FFFFFF' }, // Sunset Amber
  bars: { bg: '#B85C1E', text: '#FFFFFF' }, // Deep Sunset Amber
  hotels: { bg: '#0A4F5C', text: '#FFFFFF' }, // Deep Ocean
  shopping: { bg: '#D47A3A', text: '#FFFFFF' }, // Warm Amber
  activities: { bg: '#0B7A8A', text: '#FFFFFF' }, // Ocean Teal
  beach: { bg: '#189BAE', text: '#FFFFFF' }, // Turquoise Ocean
  wellness: { bg: '#0D6674', text: '#FFFFFF' }, // Spa Deep Teal
  essentials: { bg: '#164E59', text: '#FFFFFF' }, // Muted Deep Teal
}

/**
 * 상호명에서 순수 영문 상호만 정제 추출
 * 괄호 안 한글, 부가 설명 등을 완전히 제거하여 깨끗한 타이포그래피 상호명 반환
 */
export function extractEnglishName(name: string, googleName?: string | null): string {
  let raw = googleName || name || ''

  // 괄호 안에 영문이 있는 경우 (예: '세타 (Seta - La Festa Hilton...)') -> 괄호 안의 영문 추출
  if (/[\uac00-\ud7a3]/.test(raw)) {
    const latinMatch = raw.match(/\(([^)]*[a-zA-Z]{2,}[^)]*)\)/)
    if (latinMatch) {
      raw = latinMatch[1]
    }
  }

  // 한글 자모 및 완성형 완전 제거
  let clean = raw.replace(/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/g, '').trim()

  // 양 끝 특수문자 및 공백 정리
  clean = clean.replace(/^[-–—\s(/]+|[-–—\s)/]+$/g, '').trim()

  // 부가 설명 분리 기호( | 또는 - ) 정리
  if (clean.includes(' | ')) {
    clean = clean.split(' | ')[0].trim()
  }

  return clean || 'Sunset Town'
}

export function BusinessCover({
  name,
  googleName,
  category,
  subcategory,
  className = '',
  aspectRatio = 'card',
}: BusinessCoverProps) {
  const englishName = extractEnglishName(name, googleName)
  const palette = CATEGORY_COVER_COLORS[category] || CATEGORY_COVER_COLORS.dining

  // 글자 수에 따른 유동적 폰트 크기 계산 (박스 폭의 약 60~70% 점유)
  const len = englishName.length
  let fontSize = '22px'
  if (aspectRatio === 'hero') {
    if (len <= 14) fontSize = '44px'
    else if (len <= 26) fontSize = '36px'
    else fontSize = '30px'
  } else {
    // card mode
    if (len <= 12) fontSize = '28px'
    else if (len <= 22) fontSize = '24px'
    else fontSize = '20px'
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: palette.bg,
    color: palette.text,
    width: '100%',
    height: aspectRatio === 'hero' ? '280px' : '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: aspectRatio === 'hero' ? '32px 40px' : '20px 24px',
    boxSizing: 'border-box',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: aspectRatio === 'hero' ? '16px' : '12px 12px 0 0',
  }

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Noto Sans', sans-serif)",
    fontSize,
    fontWeight: 800,
    lineHeight: 1.25,
    letterSpacing: '-0.025em',
    textAlign: 'center',
    color: '#FFFFFF',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.25)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: aspectRatio === 'hero' ? '85%' : '90%',
  }

  return (
    <div
      className={`businessTypoCover ${aspectRatio === 'hero' ? 'heroCover' : 'cardCover'} ${className}`}
      style={containerStyle}
      aria-label={englishName}
    >
      <span style={textStyle}>{englishName}</span>
    </div>
  )
}
