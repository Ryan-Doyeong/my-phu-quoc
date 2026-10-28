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
  name_vi?: string | null
  price_vnd: number | null
  price_text: string | null
  grade: MenuGrade
  description_original?: string | null
  description_ko?: string | null
  description_en?: string | null
  source?: string | null
  verified_date?: string | null
}

export interface MenuSection {
  title: string
  title_ko?: string
  title_en?: string
  title_vi?: string
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
  menuImages?: { url: string; label: string }[]
}

export const GRADE_INFO: Record<
  MenuGrade,
  { labelKo: string; labelEn: string; descKo: string; descEn: string; color: string }
> = {
  A: {
    labelKo: 'Grade A · 전체 메뉴 확인',
    labelEn: 'Grade A · Full Menu Verified',
    descKo: '실제 메뉴판 전수 조사 및 한글 번역, 최신 가격(VND) 정보가 등록된 업체입니다.',
    descEn: 'Comprehensive menu verified with official prices and multilingual translations.',
    color: '#0B7A8A', // Ocean Teal
  },
  B: {
    labelKo: 'Grade B · 주요 메뉴 확인',
    labelEn: 'Grade B · Core Menu Verified',
    descKo: '대표 메뉴와 시그니처 요금 정보가 확인된 업체입니다.',
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

function splitViEn(text: string): { vi: string; en: string } {
  if (!text) return { vi: '', en: '' }
  const trimmed = text.trim()
  if (trimmed.includes('|')) {
    const parts = trimmed.split('|')
    return { vi: parts[0].trim(), en: parts[1].trim() }
  }
  const match = trimmed.match(/^(.*?)\s*[\(\（]([A-Za-z0-9\s,&'\-\.\/]+)[\)\）]$/)
  if (match) {
    return { vi: match[1].trim(), en: match[2].trim() }
  }
  return { vi: trimmed, en: trimmed }
}

export function cleanSourcesSummaryNonKo(src: string): string {
  if (!src) return 'Official Menu'

  // 1. Remove Hangul
  let s = src.replace(/[\uac00-\ud7a3]+/g, '')

  // Letter regex (Latin, Vietnamese diacritics, CJK, Cyrillic, Hindi)
  const letterRe = /[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9\u4e00-\u9fa5\u0400-\u04FF\u0900-\u097F]/

  // 2. Iteratively remove brackets containing NO letters & clean inside brackets
  for (let i = 0; i < 3; i++) {
    s = s.replace(/\([^()]*\)/g, (match) => (letterRe.test(match) ? match : ''))
    s = s.replace(/\[[^\[\]]*\]/g, (match) => (letterRe.test(match) ? match : ''))
    s = s.replace(/\([\s,;:\-_/.]+/g, '(')
    s = s.replace(/[\s,;:\-_/.]+\)/g, ')')
    s = s.replace(/\[[\s,;:\-_/.]+/g, '[')
    s = s.replace(/[\s,;:\-_/.]+\]/g, ']')
    s = s.replace(/\(\s*\)/g, '')
    s = s.replace(/\[\s*\]/g, '')
  }

  // 3. Clean unbalanced brackets
  const openCount = (s.match(/\(/g) || []).length
  const closeCount = (s.match(/\)/g) || []).length
  if (openCount > closeCount) {
    let diff = openCount - closeCount
    s = s.replace(/\(/g, (m) => (diff-- > 0 ? '' : m))
  } else if (closeCount > openCount) {
    let diff = closeCount - openCount
    s = s.replace(/\)/g, (m) => (diff-- > 0 ? '' : m))
  }

  // 4. Clean delimiters & symbols
  s = s.replace(/\s*([,;:])\s*([,;:])+/g, '$1 ')
  s = s.replace(/\s*,\s*/g, ', ')
  s = s.replace(/\s*-\s*-\s*/g, ' - ')
  s = s.replace(/,\s*-\s*/g, ', ')
  s = s.replace(/-\s*,\s*/g, ', ')
  s = s.replace(/\s*&\s*,\s*/g, ', ')
  s = s.replace(/\s*,\s*&\s*/g, ', ')
  s = s.replace(/\s{2,}/g, ' ')

  // 5. Trim leading/trailing punctuation & symbols
  s = s.replace(/^[,\s\-_/.:;+&|~]+|[,\s\-_/.:;+&|~]+$/g, '').trim()

  // 6. Unwrap single surrounding parens/brackets
  if (s.startsWith('(') && s.endsWith(')') && (s.match(/\(/g) || []).length === 1 && (s.match(/\)/g) || []).length === 1) {
    s = s.slice(1, -1).trim()
  }
  if (s.startsWith('[') && s.endsWith(']') && (s.match(/\[/g) || []).length === 1 && (s.match(/\]/g) || []).length === 1) {
    s = s.slice(1, -1).trim()
  }

  // 7. Check if meaningful name remains (at least 2 letters, not price/noise)
  const letters = s.match(new RegExp(letterRe.source, 'g'))
  if (!letters || letters.length < 2) {
    return 'Official Menu'
  }

  // Filter residual prices like '2 299, 000 VND' or internal codes 's1', '3F', 'SNS'
  if (/^[\d\s,.~]+(?:VND|USD|VND\/USD)?$/i.test(s)) {
    return 'Official Menu'
  }
  if (['s1', '3f', 'sns'].includes(s.toLowerCase())) {
    return 'Official Menu'
  }

  s = s.replace(/^[,\s\-_/.:;+&|~]+|[,\s\-_/.:;+&|~]+$/g, '').trim()
  return s || 'Official Menu'
}

export const SECTION_CANONICAL_EN_MAP: Record<string, string> = {
  '20 minutes preparation': 'Soups (20-Minute Preparation)',
  '48h Rise Dough': 'Pizza with 48-Hour Fermented Dough',
  'Afternoon Tea & Artisanal Pastries / 애프터눈 티 & 디저트': 'Afternoon Tea & Artisanal Pastries',
  'Appetizer': 'Appetizers',
  'Appetizer & Salad': 'Appetizers & Salads',
  'Barbecued': 'Barbecued Dishes',
  'Beer & Drink': 'Beer & Drinks',
  'Beer / Soft Drinks / Water': 'Beer, Soft Drinks & Water',
  'Beverage, Coffee & Teas': 'Beverages, Coffee & Tea',
  'Bia Tươi & Thức Uống / Draft Beer': 'Draft Beer & Craft Beer',
  'Bia thủ công & Đồ uống / Craft Beer Selection': 'Craft Beer & Drinks',
  'Bia thủ công Sun KraftBeer / German Craft Beer': 'Sun KraftBeer – German Craft Beer',
  'Bingsu & Mango Dessert / 빙수 & 망고 디저트': 'Bingsu & Mango Desserts',
  'Breakfast (07:00 - 11:00)': 'Breakfast (07:00–11:00)',
  'Bunsik & Noodles / 분식 & 면류': 'Korean Street Food & Noodles',
  'Burger, Pasta & Sourdough Pizza': 'Burgers, Pasta & Sourdough Pizza',
  'Burgers & Starters / 수제 버거 & 스타터': 'Burgers & Starters',
  'Bánh canh ghẹ Phú Quốc / Phu Quoc Flower Crab Noodles': 'Phu Quoc Flower Crab Banh Canh Noodles',
  'Bánh mì & Pastries / Bakery': 'Banh Mi & Pastries',
  'Bò & Món nướng than hoa / Beef & Grill': 'Beef & Charcoal Grills',
  'Bữa sáng tự chọn / Daily Breakfast Buffet': 'Daily Breakfast Buffet',
  'Café & Boissons / Coffee & Drinks': 'Coffee & Drinks',
  'Café & Tropical Drinks / 오션뷰 음료': 'Café & Tropical Drinks',
  'Classic & Fancy': 'Classic & Fancy Cocktails',
  'Cocktails & Craft Beers / 칵테일 & 주류': 'Cocktails & Craft Beers',
  'Cocktails & Spirits / 클럽 칵테일 & 음료': 'Cocktails & Spirits',
  'Craft Beer & Promotions / 수제 크래프트 맥주': 'Craft Beer & Promotions',
  'Crispy Bites & Snacks / 핑거푸드 & 안주': 'Crispy Bites & Snacks',
  'Cà phê & Đồ uống nghệ thuật RuNam / Signature Coffee & Drinks': 'RuNam Signature Coffee & Drinks',
  'Cà phê Phin truyền thống / Traditional Phin Coffee': 'Traditional Vietnamese Phin Coffee',
  'Cơm & Mì ăn kèm / Rice & Noodles': 'Rice & Noodles',
  'Cơm niêu & Canh truyền thống / Claypot Rice & Soups': 'Claypot Rice & Traditional Soups',
  'Dessert': 'Desserts',
  'Dinner Menu (17:00-22:00) - Starter': 'Dinner Menu (17:00–22:00) – Starters',
  'Dinner Menu - Main Dishes': 'Dinner Menu – Main Courses',
  'Döner Kebab & Turkish Specialties / 터키식 케밥': 'Döner Kebab & Turkish Specialties',
  'Extra Topping': 'Extra Pizza Toppings',
  'Homemade Pastas': 'Homemade Pasta',
  'Hải Sản Phú Quốc & Món Nướng / Seafood & Grills': 'Phu Quoc Seafood & Grills',
  'Hải sản cố định giá / Fixed Price Seafood': 'Fixed-Price Seafood',
  'Hải sản tươi sống & Đĩa lớn / Fresh Seafood Platters': 'Fresh Seafood & Sharing Platters',
  'Kem & Trà / Ice Cream & Tea': 'Ice Cream & Tea',
  'Kids Menu': "Kids' Menu",
  'Kids Menu & Desserts': "Kids' Menu & Desserts",
  'Kimbap / 김밥류': 'Kimbap',
  'Lunch Menu (11:00-16:00)': 'Lunch Menu (11:00–16:00)',
  'Lẩu bò Hoàng Hôn / Sunset Town Beef Hot Pot': 'Sunset Town Beef Hot Pot',
  'Meal & Stew / 식사 & 찌개류': 'Rice Meals & Korean Stews',
  'Mixed Juice & Smoothie': 'Mixed Juices & Smoothies',
  'Mocktail': 'Mocktails',
  'Mì kéo thủ công Kungfu / Hand-pulled Chinese Noodles': 'Kungfu Hand-Pulled Noodles',
  'Món chính & Bò nướng đá núi lửa / Western Mains & Stone Grill': 'Western Main Courses & Hot Stone Grills',
  'Món mặn ăn cơm / Savory Main Dishes for Rice': 'Savory Vietnamese Dishes to Accompany Rice',
  'Món ăn kèm & Tráng miệng / Sides & Add-ons': 'Sides, Add-ons & Desserts',
  'Món ăn Đức truyền thống & Hải sản / German Dishes & Seafood': 'Traditional German Dishes & Seafood',
  'Noodles / Rice / Congee': 'Noodles, Rice & Congee',
  'Nước ép & Healthy Drinks': 'Fresh Juices & Healthy Drinks',
  'Phu Quoc Flavors & Vietnamese Heritage': 'Phu Quoc Specialties & Traditional Vietnamese Cuisine',
  'Phở truyền thống Hà Nội / Traditional Hanoi Pho': 'Traditional Hanoi Pho',
  'Pizza delights': 'Pizza',
  'Risotto Selections': 'Risotto',
  'Robatayaki & Grilled Fish / 참숯 생선구이': 'Robatayaki & Charcoal-Grilled Fish',
  'Sandwich & Burger': 'Sandwiches & Burgers',
  'Side Dishes & Extra': 'Side Dishes & Extras',
  'Signature & Classic Cocktail': 'Signature & Classic Cocktails',
  'Skyline Cocktails / 스카이라인 선셋 칵테일': 'Skyline Sunset Cocktails',
  'Smoked BBQ Ribs & Steaks / 참나무 훈제 바비큐': 'Smoked BBQ Ribs & Steaks',
  'Smoothie': 'Smoothies',
  'Smoothies & Ice Blended': 'Smoothies & Ice-Blended Drinks',
  'Smoothies & Juice': 'Smoothies & Juices',
  'Soft Drink / Water / Beer': 'Soft Drinks, Water & Beer',
  'Spanish Indulgence (07:00-16:00) - set': 'Spanish Indulgence Brunch Set (07:00–16:00)',
  'Speakeasy Cocktails / 스피크이지 칵테일': 'Speakeasy Cocktails',
  'Starter (Spanish & Italian Influenced)': 'Starters (Spanish & Italian Influences)',
  'Sushi, Sashimi & Ramen / 스시, 사시미 & 식사': 'Sushi, Sashimi & Ramen',
  'Tapas Evening (Fri-Sun 18:00-21:00)': 'Tapas Evening (Fri–Sun, 18:00–21:00)',
  'The Charcoal & Mains': 'Charcoal Grills & Main Courses',
  'Trà & Freeze / Tea & Blended Ice': 'Tea & Ice-Blended Drinks',
  'Vegetarian': 'Vegetarian Dishes',
  'Viennoiserie & Artisanal Bread / 프랑스 정통 페이스트리 & 빵': 'Viennoiserie & Artisanal Bread',
  'Vietnamese Set Menu (2 Pax)': 'Vietnamese Set Menu (2 People)',
  'Virgin Cocktails': 'Non-Alcoholic Cocktails',
  'Western Mains & Grill': 'Western Main Courses & Grills',
  'Wine by Bottle': 'Wine by the Bottle',
  'Wine by Glass': 'Wine by the Glass',
  'glass / bottle': 'Spirits (Glass / Bottle)',
  'set': "Chef Victor Ho's Recommended Set",
  'shot / bottle': 'Spirits (Shot / Bottle)',
  'subject to availability': 'Soups (Subject to Availability)',
  'Điểm tâm & Món Việt tinh hoa / Premium Vietnamese Classics': 'Premium Vietnamese Classics',
  'Đồ uống giải khát / Refreshing Drinks': 'Refreshing Drinks',
  '김밥류': 'Kimbap',
  '분식 & 면류': 'Korean Street Food & Noodles',
  '생망고 눈꽃빙수 & 디저트': 'Bingsu & Mango Desserts',
  '선셋 루프탑 시그니처 칵테일': 'Skyline Sunset Cocktails',
  '수제 버거 & 사이드 요리': 'Burgers & Starters',
  '스시, 사시미 & 라멘': 'Sushi, Sashimi & Ramen',
  '시그니처 칵테일 & 스피릿': 'Cocktails & Spirits',
  '식사 & 찌개류': 'Rice Meals & Korean Stews',
  '애프터눈 티 & 이탈리안 페이스트리': 'Afternoon Tea & Artisanal Pastries',
  '재즈 & 장인정신 칵테일': 'Speakeasy Cocktails',
  '정통 터키식 도네르 케밥': 'Döner Kebab & Turkish Specialties',
  '참나무 훈제 바비큐': 'Smoked BBQ Ribs & Steaks',
  '참숯 생선구이 (로바타야키)': 'Robatayaki & Charcoal-Grilled Fish',
  '카페 & 트로피컬 음료': 'Café & Tropical Drinks',
  '크래프트 비어 & 무제한 프로모션': 'Craft Beer & Promotions',
  '크리스피 치킨 & 수제 안주': 'Crispy Bites & Snacks',
  '트로피컬 칵테일 & 하이볼': 'Cocktails & Craft Beers',
  '프랑스 정통 페이스트리 & 베이커리': 'Viennoiserie & Artisanal Bread',
}

export function loadMenuForPlace(
  placeId: string | null | undefined,
  locale: string = 'ko'
): BusinessMenuData | null {
  if (!placeId) return null

  try {
    const raw = (menusRegistry as Record<string, any>)[placeId]
    if (!raw) {
      return null
    }

    const grade: MenuGrade = (raw.info_level || 'C').toUpperCase() as MenuGrade
    const info = GRADE_INFO[grade] || GRADE_INFO.C
    const verifiedDate = raw.menu_date || (raw.sources && raw.sources[0]?.accessed) || '2026-10'
    let sourcesSummary =
      (raw.sources || [])
        .map((s: any) => s.note || s.url)
        .filter(Boolean)
        .join(', ') || 'Sunset Town Master Menu DB'

    if (locale !== 'ko') {
      sourcesSummary = cleanSourcesSummaryNonKo(sourcesSummary)
    }

    const sections: MenuSection[] = []

    // 1. Process sections if present
    if (raw.sections && raw.sections.length > 0) {
      for (const sec of raw.sections) {
        const secKo = sec.section_ko || sec.name_ko || null
        const secOrig = sec.section_original || sec.name_original || ''
        const splitSec = splitViEn(secOrig)

        const title_ko = secKo || secOrig || '기타 메뉴'
        const raw_title_en = splitSec.en || secOrig || secKo || 'Menu'
        const title_en =
          SECTION_CANONICAL_EN_MAP[raw_title_en] ||
          SECTION_CANONICAL_EN_MAP[secOrig] ||
          SECTION_CANONICAL_EN_MAP[title_ko] ||
          raw_title_en
        const title_vi = splitSec.vi || secOrig || 'Thực đơn'

        const items: MenuItem[] = (sec.items || []).map((it: any) => {
          const orig = it.name_original || it.name_ko || 'Dish'
          const splitItem = splitViEn(orig)
          return {
            name_original: orig,
            name_ko: it.name_ko || null,
            name_en: splitItem.en || orig,
            name_vi: splitItem.vi || orig,
            price_vnd: it.price_vnd ? Number(it.price_vnd) : null,
            price_text:
              it.price_note || (it.price_vnd ? `${Number(it.price_vnd).toLocaleString()} VND` : null),
            grade,
            description_original: it.description_original || null,
            description_ko: it.description_ko || null,
            description_en: it.description_en || it.description_original || null,
          }
        })

        if (items.length > 0) {
          sections.push({
            title: title_ko,
            title_ko,
            title_en,
            title_vi,
            items,
          })
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
        const orig = kd.name_original || kd.name_ko || 'Recommended'
        const splitItem = splitViEn(orig)
        return {
          name_original: orig,
          name_ko: kd.name_ko || null,
          name_en: splitItem.en || orig,
          name_vi: splitItem.vi || orig,
          price_vnd: vnd,
          price_text: kd.price_approx || null,
          grade,
        }
      })
      sections.push({
        title: '대표 추천 메뉴 (Signatures)',
        title_ko: '대표 추천 메뉴 (시그니처)',
        title_en: 'Signature Dishes & Recommendations',
        title_vi: 'Món đặc trưng nổi bật',
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
      menuImages: raw.menu_images || undefined,
    }
  } catch (e) {
    return null
  }
}
