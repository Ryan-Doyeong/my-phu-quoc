import React from 'react'
import { HotelPriceRange, getPriceTierLevel } from '@/lib/hotels'

export interface HotelPriceBadgeProps {
  priceRange?: HotelPriceRange | string | null
  className?: string
  style?: React.CSSProperties
  /** Optional custom date string for tooltip, default '2026-11-01' */
  checkDate?: string
}

/**
 * Reusable Agoda 5-tier price badge ($ ~ $$$$$).
 * Hidden when priceRange is missing/undefined (미확인 시 숨김).
 * Tooltip: '아고다 기준 1박 요금대 (5단계 중 ○단계), 조회일: 2026-11-01'
 */
export function HotelPriceBadge({
  priceRange,
  className = 'cardPriceBadge',
  style,
  checkDate = '2026-11-01',
}: HotelPriceBadgeProps) {
  if (!priceRange) return null
  const level = getPriceTierLevel(priceRange) || priceRange.length
  return (
    <span
      className={className}
      style={style}
      title={`아고다 기준 1박 요금대 (5단계 중 ${level}단계), 조회일: ${checkDate}`}
    >
      {priceRange}
    </span>
  )
}
