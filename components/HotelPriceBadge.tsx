import React from 'react'
import { HotelPriceRange, getPriceTierLevel, getPriceTierBand } from '@/lib/hotels'
import { getHotelCategoryLabels } from '@/lib/i18n/hotelCategoryLabels'
import type { Locale } from '@/lib/i18n/config'

export interface HotelPriceRangeTextProps {
  priceRange?: HotelPriceRange | string | null
  locale?: Locale
  /** 요금대가 없을 때 '요금 미확인' 표시 여부 (기본 true) */
  showUnverified?: boolean
  className?: string
}

const fmtVnd = (v: number) => `₫${v.toLocaleString('en-US')}`

/**
 * 아고다 5단계 요금대 → 실제 1박 가격 범위 텍스트.
 * 예) "1박 약 $49~69 · ₫1,250,000~1,750,000" / "1박 약 $39 이하" / "1박 약 $83 이상"
 */
export function HotelPriceRangeText({ priceRange, locale = 'ko', showUnverified = true, className = 'cardPriceRange' }: HotelPriceRangeTextProps) {
  const labels = getHotelCategoryLabels(locale)
  const band = getPriceTierBand(priceRange)
  if (!band) {
    if (!showUnverified) return null
    return <span className={`${className} cardPriceRangeUnverified`}>💲 {labels.priceUnverified}</span>
  }
  let usd: string
  let vnd: string
  if (band.minVnd == null && band.maxVnd != null) {
    usd = `$${band.maxUsd} ${labels.orLess}`
    vnd = `${fmtVnd(band.maxVnd)} ${labels.orLess}`
  } else if (band.maxVnd == null && band.minVnd != null) {
    usd = `$${band.minUsd} ${labels.orMore}`
    vnd = `${fmtVnd(band.minVnd)} ${labels.orMore}`
  } else {
    usd = `$${band.minUsd}~${band.maxUsd}`
    vnd = `${fmtVnd(band.minVnd as number)}~${fmtVnd(band.maxVnd as number)}`
  }
  return (
    <span className={className} title={labels.priceNote}>
      <span className="cardPriceRangeMain">💲 {labels.perNight} {usd}</span>
      <span className="cardPriceRangeSub">{vnd}</span>
    </span>
  )
}

export interface HotelPriceBadgeProps {
  priceRange?: HotelPriceRange | string | null
  className?: string
  style?: React.CSSProperties
  /** Optional custom date string for tooltip, default '2026-11-01' */
  checkDate?: string
  locale?: string
}

const TOOLTIP_BY_LOCALE: Record<string, (level: number, date: string) => string> = {
  ko: (level, date) => `아고다 기준 1박 요금대 (5단계 중 ${level}단계), 조회일: ${date}`,
  en: (level, date) => `Agoda nightly rate tier (Tier ${level} of 5), checked: ${date}`,
  vi: (level, date) => `Mức giá 1 đêm theo Agoda (Mức ${level}/5), cập nhật: ${date}`,
  zh: (level, date) => `Agoda每晚房价档位（5档中第${level}档），查询日期：${date}`,
  ja: (level, date) => `アゴダ基準1泊料金帯（5段階中${level}段階）、確認日：${date}`,
  ru: (level, date) => `Ценовая категория за 1 ночь по Agoda (${level} из 5), проверено: ${date}`,
  hi: (level, date) => `Agoda प्रति रात मूल्य स्तर (5 में से स्तर ${level}), जांच तिथि: ${date}`,
}

/**
 * Reusable Agoda 5-tier price badge ($ ~ $$$$$).
 * Hidden when priceRange is missing/undefined (미확인 시 숨김).
 */
export function HotelPriceBadge({
  priceRange,
  className = 'cardPriceBadge',
  style,
  checkDate = '2026-11-01',
  locale = 'ko',
}: HotelPriceBadgeProps) {
  if (!priceRange) return null
  const level = getPriceTierLevel(priceRange) || priceRange.length
  const fn = TOOLTIP_BY_LOCALE[locale] || TOOLTIP_BY_LOCALE.en
  return (
    <span
      className={className}
      style={style}
      title={fn(level, checkDate)}
    >
      {priceRange}
    </span>
  )
}
