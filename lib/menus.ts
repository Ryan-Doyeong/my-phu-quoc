/**
 * lib/menus.ts
 * 비즈니스 메뉴 데이터 로더 및 등급 판정
 */

import menusRegistry from '@/data/menus-registry.json'

export type MenuGrade = 'A' | 'B' | 'C' | 'D'

export interface MenuItem {
  name_original: string
  name_ko: string | null
  name_en: string | null
  price_vnd: number | null
  price_text: string | null
  grade: MenuGrade
  description_original?: string | null
  description_ko?: string | null
  source?: string | null
  verified_date?: string | null
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

export interface BusinessMenuData {
  placeId: string
  grade: MenuGrade
  gradeLabel: string
  gradeDescription: string
  sections: MenuSection[]
  totalItems: number
  isUnconfirmed: boolean
  sourcesSummary: string
  verifiedDate: string
}

export const GRADE_INFO: Record<
  MenuGrade,
  { labelKo: string; labelEn: string; descKo: string; descEn: string; color: string }
> = {
  A: {
    labelKo: 'Grade A · 전체 메뉴 확인',
    labelEn: 'Grade A · Full Menu Verified',
    descKo: '실제 메뉴판 전수 조사 및 한글 번역, 최신 가격(VND)이 완벽하게 등록된 업체입니다.',
    descEn: 'Comprehensive menu verified with official prices and multilingual translations.',
    color: '#0B7A8A', // Ocean Teal
  },
  B: {
    labelKo: 'Grade B · 주요 메뉴 확인',
    labelEn: 'Grade B · Core Menu Verified',
    descKo: '인기 대표 메뉴와 시그니처 요금 정보가 확인된 업체입니다.',
    descEn: 'Core selection of signature dishes and prices verified from menu boards.',
    color: '#C86D2D', // Amber Gold
  },
  C: {
    labelKo: 'Grade C · 대표 메뉴 & 가격대 파악',
    labelEn: 'Grade C · Estimated Signatures',
    descKo: '방문자 후기 및 공인 채널을 통해 대표 메뉴와 예상 가격대가 파악된 곳입니다.',
    descEn: 'Representative dishes and approximate price range based on verified sources.',
    color: '#8A6D3B', // Muted Amber
  },
  D: {
    labelKo: 'Grade D · 현장 확인 필요',
    labelEn: 'Grade D · On-site Verification Needed',
    descKo: '공식 온라인 메뉴판이 등록되지 않은 상태로, 현장 방문 후 주문을 권장합니다.',
    descEn: 'Official menu board not yet published online. Please verify on site.',
    color: '#718096', // Slate Gray
  },
}

export function loadMenuForPlace(placeId: string | null | undefined): BusinessMenuData | null {
  if (!placeId) return null

  try {
    const raw = (menusRegistry as Record<string, any>)[placeId]
    if (!raw) {
      return null
    }

    const grade: MenuGrade = (raw.info_level || 'C').toUpperCase() as MenuGrade
    const info = GRADE_INFO[grade] || GRADE_INFO.C
    const verifiedDate = raw.menu_date || (raw.sources && raw.sources[0]?.accessed) || '2026-10'
    const sourcesSummary =
      (raw.sources || [])
        .map((s: any) => s.note || s.url)
        .filter(Boolean)
        .join(', ') || 'Sunset Town Master Menu DB'

    const sections: MenuSection[] = []

    // 1. Process sections if present
    if (raw.sections && raw.sections.length > 0) {
      for (const sec of raw.sections) {
        const secTitle =
          sec.section_ko || sec.section_original || sec.name_ko || sec.name_original || '기타 메뉴'
        const items: MenuItem[] = (sec.items || []).map((it: any) => ({
          name_original: it.name_original || it.name_ko || 'Dish',
          name_ko: it.name_ko || null,
          name_en: it.name_original || null,
          price_vnd: it.price_vnd ? Number(it.price_vnd) : null,
          price_text:
            it.price_note || (it.price_vnd ? `${Number(it.price_vnd).toLocaleString()} VND` : null),
          grade,
          description_original: it.description_original || null,
          description_ko: it.description_ko || null,
        }))
        if (items.length > 0) {
          sections.push({ title: secTitle, items })
        }
      }
    }

    // 2. Process known_dishes if sections are empty
    if (sections.length === 0 && raw.known_dishes && raw.known_dishes.length > 0) {
      const items: MenuItem[] = raw.known_dishes.map((kd: any) => {
        let vnd = null
        if (kd.price_approx) {
          const match = kd.price_approx.replace(/,/g, '').match(/\d+/)
          if (match) vnd = parseInt(match[0], 10)
        }
        return {
          name_original: kd.name_original || kd.name_ko || 'Recommended',
          name_ko: kd.name_ko || null,
          name_en: kd.name_original || null,
          price_vnd: vnd,
          price_text: kd.price_approx || null,
          grade,
        }
      })
      sections.push({
        title: '대표 추천 메뉴 (Signatures)',
        items,
      })
    }

    const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)
    const isUnconfirmed = grade === 'D' || totalItems === 0

    return {
      placeId,
      grade,
      gradeLabel: info.labelKo,
      gradeDescription: info.descKo,
      sections,
      totalItems,
      isUnconfirmed,
      sourcesSummary,
      verifiedDate,
    }
  } catch (e) {
    return null
  }
}
