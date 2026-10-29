"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import styles from './SunsetIllustMap.module.css'
import mapDataJson from '@/data/sunset-illust-map-data.json'

export type MapLanguage = 'ko' | 'en' | 'zh' | 'ru' | 'ja' | 'hi'

export interface MapDataPayload {
  summary: any
  blocks: Block[]
  venues: Venue[]
  outside?: Venue[]
}

interface SunsetIllustMapProps {
  initialLocale?: string
  showLanguageSwitcher?: boolean
  initialMapData?: MapDataPayload
}

interface Venue {
  name: string
  slug: string
  cat: 'dining' | 'bars'
  cat_label: string
  addr: string | null
  lat?: number | null
  lng?: number | null
  level: string
  anchor_key: string
  reason?: string
  walk_dist_m?: number | null
  walk_time_min?: number | null
}

interface Block {
  id: string
  x: number
  y: number
  name: string
  name_en?: string
  name_zh?: string
  name_ru?: string
  name_ja?: string
  name_hi?: string
  desc: string
  justification?: string
  venues: Venue[]
}

const getBlockName = (block: Block, lang: MapLanguage): string => {
  if (lang === 'ko') {
    return block.name
  }
  const langKey = `name_${lang}` as keyof Block
  const val = block[langKey]
  if (typeof val === 'string' && val.trim().length > 0) {
    return val
  }
  return block.name_en || block.name
}

const IMG_W = 887
const IMG_H = 1774
const FOCUS_Y = 550 // Central Clock Tower & town center anchor in canvas coordinates

// Rule 2-a: Minimum scale is cover = max(vpW / IMG_W, vpH / IMG_H). Never drops below this.
const getMinScale = (vpW: number, vpH: number) => {
  if (vpW <= 0 || vpH <= 0) return 0.44
  return Math.max(vpW / IMG_W, vpH / IMG_H)
}

const getMaxScale = (minScale: number) => {
  return Math.max(minScale * 3.2, 2.5)
}

// 6 supported languages map background paths
const MAP_IMAGES: Record<MapLanguage, string> = {
  ko: '/map/sunset-town-map-ko-v3.webp',
  en: '/map/sunset-town-map-en-v2.webp',
  zh: '/map/sunset-town-map-zh-v2.webp',
  ru: '/map/sunset-town-map-ru-v2.webp',
  ja: '/map/sunset-town-map-ja-v2.webp',
  hi: '/map/sunset-town-map-hi-v2.webp',
}

// Translations for UI text across 6 languages
const I18N: Record<MapLanguage, {
  langName: string
  title: string
  subtitle: string
  tabAll: string
  tabDining: string
  tabBars: string
  noticeTag: string
  noticeText: string
  seeAll: string
  recommendedHeading: string
  districtListHeading: string
  venueCountSuffix: string
  showMore: string
  showLess: string
  walkPrefix: string
  walkSuffix: string
  walkCarOnly: string
  detailBtn: string
  outsideTitle: string
  levelExact: string
  levelEst: string
  levelUnconfirmed: string
  diningBadge: string
  barsBadge: string
}> = {
  ko: {
    langName: '한국어',
    title: '선셋타운 F&B 일러스트 지도',
    subtitle: '추천 식당·카페 & 바 (블록별 클러스터 맵)',
    tabAll: '전체',
    tabDining: '식당',
    tabBars: '바 & 펍',
    noticeTag: '안내',
    noticeText: '일러스트 지도의 축척 막대는 참고용이며 실제 거리와 다릅니다',
    seeAll: '전체 보기',
    recommendedHeading: '선셋타운 추천 맛집·바',
    districtListHeading: '선셋타운 구역별 추천 맛집·바',
    venueCountSuffix: '곳',
    showMore: '더 보기',
    showLess: '접기',
    walkPrefix: '시계탑 도보 ',
    walkSuffix: '분',
    walkCarOnly: '도보 이동 불가 (차량 이용)',
    detailBtn: '상세보기 →',
    outsideTitle: '선셋타운 외곽 / 안터이 구도심 매장',
    levelExact: '확실',
    levelEst: '추정',
    levelUnconfirmed: '미확인',
    diningBadge: '식당',
    barsBadge: '바 & 펍',
  },
  en: {
    langName: 'English',
    title: 'Sunset Town F&B Illustrated Map',
    subtitle: 'Curated Restaurants, Cafes & Bars by Block',
    tabAll: 'All',
    tabDining: 'Dining',
    tabBars: 'Bars & Pubs',
    noticeTag: 'Notice',
    noticeText: 'The scale bar on the illustration map is for reference only and differs from actual distance',
    seeAll: 'See All',
    recommendedHeading: 'Sunset Town Dining & Bars',
    districtListHeading: 'Sunset Town Venues by District',
    venueCountSuffix: ' venues',
    showMore: 'Show More',
    showLess: 'Show Less',
    walkPrefix: '',
    walkSuffix: ' min walk from Clock Tower',
    walkCarOnly: 'Vehicles required (outside town)',
    detailBtn: 'Details →',
    outsideTitle: 'Outskirts / An Thoi Old Town Venues',
    levelExact: 'Verified',
    levelEst: 'Estimated',
    levelUnconfirmed: 'Unconfirmed',
    diningBadge: 'Dining',
    barsBadge: 'Bar & Pub',
  },
  zh: {
    langName: '中文',
    title: '日落小镇美食手绘插画地图',
    subtitle: '精选餐厅·咖啡与酒吧（街区聚合分布）',
    tabAll: '全部',
    tabDining: '餐厅',
    tabBars: '酒吧',
    noticeTag: '说明',
    noticeText: '插画地图的比例尺仅供参考，与实际距离有所差异',
    seeAll: '查看全部',
    recommendedHeading: '日落小镇推荐美食·酒吧',
    districtListHeading: '日落小镇分区美食、咖啡馆与酒吧推荐',
    venueCountSuffix: '家',
    showMore: '展开更多',
    showLess: '收起',
    walkPrefix: '距钟楼步行 ',
    walkSuffix: '分钟',
    walkCarOnly: '需乘车前往（小镇外围）',
    detailBtn: '查看详情 →',
    outsideTitle: '日落小镇外围 / 安泰老街商户',
    levelExact: '确切',
    levelEst: '推定',
    levelUnconfirmed: '未确认',
    diningBadge: '餐厅',
    barsBadge: '酒吧',
  },
  ru: {
    langName: 'Русский',
    title: 'Иллюстрированная карта гастрономии Sunset Town',
    subtitle: 'Лучшие рестораны, кафе и бары по кварталам',
    tabAll: 'Все',
    tabDining: 'Рестораны',
    tabBars: 'Бары и пабы',
    noticeTag: 'Инфо',
    noticeText: 'Масштабная линейка на карте носит справочный характер и отличается от фактического расстояния',
    seeAll: 'Показать все',
    recommendedHeading: 'Рестораны и бары Sunset Town',
    districtListHeading: 'Рестораны, кафе и бары по районам Сансет Таун',
    venueCountSuffix: ' заведений',
    showMore: 'Показать ещё',
    showLess: 'Свернуть',
    walkPrefix: '',
    walkSuffix: ' мин пешком от башни',
    walkCarOnly: 'На транспорте (за пределами городка)',
    detailBtn: 'Подробнее →',
    outsideTitle: 'За пределами Сансет Тауна / Старый город Ан Тхой',
    levelExact: 'Точно',
    levelEst: 'Оценка',
    levelUnconfirmed: 'Не подтверждено',
    diningBadge: 'Ресторан',
    barsBadge: 'Бар',
  },
  ja: {
    langName: '日本語',
    title: 'サンセットタウン グルメイラストマップ',
    subtitle: '厳選店舗のレストラン・カフェ・バー（ブロック別）',
    tabAll: 'すべて',
    tabDining: 'レストラン',
    tabBars: 'バー＆パブ',
    noticeTag: 'ご案内',
    noticeText: 'イラストマップの縮尺バーは参考用であり、実際の距離とは異なります',
    seeAll: 'すべて表示',
    recommendedHeading: 'サンセットタウンおすすめグルメ・バー',
    districtListHeading: 'サンセットタウンのエリア別おすすめ飲食店・カフェ・バー',
    venueCountSuffix: '店舗',
    showMore: 'もっと見る',
    showLess: '閉じる',
    walkPrefix: '時計塔から徒歩',
    walkSuffix: '分',
    walkCarOnly: '徒歩移動不可（車両利用）',
    detailBtn: '詳細を見る →',
    outsideTitle: 'サンセットタウン郊外・アントイ旧市街',
    levelExact: '確定',
    levelEst: '推定',
    levelUnconfirmed: '未確認',
    diningBadge: '食事',
    barsBadge: 'バー',
  },
  hi: {
    langName: 'हिन्दी',
    title: 'सनसेट टाउन एफ एंड बी इलस्ट्रेटेड मैप',
    subtitle: 'ब्लॉक द्वारा क्यूरेटेड रेस्तरां, कैफे और बार',
    tabAll: 'सभी',
    tabDining: 'रेस्तरां',
    tabBars: 'बार और पब',
    noticeTag: 'सूचना',
    noticeText: 'सचित्र नक्शे पर स्केल bar केवल संदर्भ के लिए है और वास्तविक दूरी से भिन्न है',
    seeAll: 'सभी देखें',
    recommendedHeading: 'सनसेट टाउन अनुशंसित भोजन और बार',
    districtListHeading: 'सनसेट टाउन में क्षेत्रवार सुझाए गए रेस्तरां, कैफ़े और बार',
    venueCountSuffix: ' स्थान',
    showMore: 'और देखें',
    showLess: 'कम दिखाएं',
    walkPrefix: 'घंटाघर से ',
    walkSuffix: ' मिनट पैदल',
    walkCarOnly: 'वाहन आवश्यक (कस्बे के बाहर)',
    detailBtn: 'विवरण देखें →',
    outsideTitle: 'सनसेट टाउन के बाहर / अन थोई पुराना शहर',
    levelExact: 'सत्यापित',
    levelEst: 'अनुमानित',
    levelUnconfirmed: 'अपुष्ट',
    diningBadge: 'रेस्तरां',
    barsBadge: 'बार',
  },
}

// 결함 2 수정: 하드코딩된 '92'를 제거하고 실제 노출되는 총 업체 수로 동적 생성
const getDynamicSubtitle = (lang: MapLanguage, count: number): string => {
  switch (lang) {
    case 'ko':
      return `${count}개 추천 식당·카페 & 바 (블록별 클러스터 맵)`
    case 'en':
      return `${count} Curated Restaurants, Cafes & Bars by Block`
    case 'zh':
      return `${count}家精选餐厅·咖啡与酒吧（街区聚合分布）`
    case 'ru':
      return `${count} лучших ресторанов, кафе и баров по кварталам`
    case 'ja':
      return `厳選${count}店舗のレストラン・カフェ・バー（ブロック別）`
    case 'hi':
      return `ब्लॉक द्वारा ${count} क्यूरेटेड रेस्तरां, कैफे और बार`
    default:
      return `${count} Curated Restaurants, Cafes & Bars by Block`
  }
}

const getDynamicOutsideTitle = (lang: MapLanguage, count: number): string => {
  switch (lang) {
    case 'ko':
      return `선셋타운 외곽 / 안터이 구도심 매장 (${count}곳)`
    case 'en':
      return `Outskirts / An Thoi Old Town Venues (${count} places)`
    case 'zh':
      return `日落小镇外围 / 安泰老街商户（${count}家）`
    case 'ru':
      return `За пределами Сансет Тауна / Старый город Ан Тхой (${count} мест)`
    case 'ja':
      return `サンセットタウン郊外・アントイ旧市街（${count}軒）`
    case 'hi':
      return `सनसेट टाउन के बाहर / अन थोई पुराना शहर (${count} स्थान)`
    default:
      return `Outskirts / An Thoi Old Town Venues (${count} places)`
  }
}

// 러시아어 복수형 문법: 1·21 등 → заведение, 2~4 → заведения, 5~20 및 0 → заведений (11~14는 заведений)
const renderVenueCountSuffix = (count: number, lang: MapLanguage, defaultSuffix: string): string => {
  if (lang === 'ru') {
    const mod10 = count % 10
    const mod100 = count % 100
    if (mod100 >= 11 && mod100 <= 14) {
      return ' заведений'
    }
    if (mod10 === 1) {
      return ' заведение'
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return ' заведения'
    }
    return ' заведений'
  }
  return defaultSuffix
}

export function SunsetIllustMap({
  initialLocale = 'ko',
  showLanguageSwitcher = true,
  initialMapData,
}: SunsetIllustMapProps) {
  // Normalize initial locale (only 6 supported languages, fall back to 'ko')
  const validLocales: MapLanguage[] = ['ko', 'en', 'zh', 'ru', 'ja', 'hi']
  const defaultLang: MapLanguage = validLocales.includes(initialLocale as MapLanguage)
    ? (initialLocale as MapLanguage)
    : 'ko'

  const [lang, setLang] = useState<MapLanguage>(defaultLang)
  const [filter, setFilter] = useState<'all' | 'dining' | 'bars'>('all')
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null)
  const [outsideOpen, setOutsideOpen] = useState(false)

  // Ryan 지침: 시계탑에서 가장 가까운 센트럴 구역(CENTRAL_CLOCK)만 기본 열림, 다중 열기 지원
  const [openBlockIds, setOpenBlockIds] = useState<Set<string>>(() => new Set(['CENTRAL_CLOCK']))
  // 6곳 초과 구역 페이징(더 보기) 상태 관리
  const [expandedBlockVenues, setExpandedBlockVenues] = useState<Set<string>>(() => new Set())

  const t = I18N[lang]

  // Viewport transform states
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.44)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(-95)

  // Dragging state refs
  const isDragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startPan = useRef({ x: 0, y: 0 })

  const activeData = initialMapData || (mapDataJson as any)
  const blocks: Block[] = (activeData.blocks as unknown) as Block[]
  const allVenues: Venue[] = (activeData.venues as unknown) as Venue[]
  const outsideVenues: Venue[] = ((activeData.outside || []) as unknown) as Venue[]
  const totalCount = activeData.summary?.total_live_union || (allVenues.length + outsideVenues.length) || 85

  // Clamp function
  const clamp = useCallback(
    (val: number, min: number, max: number) => Math.min(Math.max(val, min), max),
    []
  )

  // Calculate clamp boundaries so image edges NEVER enter inside the viewport (Rule 2-b)
  const getBounds = useCallback(
    (curScale: number) => {
      const el = viewportRef.current
      const vpW = el?.clientWidth || 390
      const vpH = el?.clientHeight || 460

      const imgW = IMG_W * curScale
      const imgH = IMG_H * curScale

      // If imgW >= vpW, allow panning between vpW - imgW and 0.
      // If imgW < vpW (safety fallback), center horizontally.
      const minX = imgW >= vpW ? vpW - imgW : (vpW - imgW) / 2
      const maxX = imgW >= vpW ? 0 : (vpW - imgW) / 2

      // If imgH >= vpH, allow panning between vpH - imgH and 0.
      // If imgH < vpH (safety fallback), center vertically.
      const minY = imgH >= vpH ? vpH - imgH : (vpH - imgH) / 2
      const maxY = imgH >= vpH ? 0 : (vpH - imgH) / 2

      return { minX, maxX, minY, maxY, vpW, vpH, imgW, imgH }
    },
    []
  )

  // Initial centered view calculation (Rules 2-a, 2-c, 2-d)
  const getInitialView = useCallback(
    (vpW: number, vpH: number) => {
      const minScale = getMinScale(vpW, vpH)
      const initScale = minScale

      const imgW = IMG_W * initScale
      const imgH = IMG_H * initScale

      // Horizontal centering: (vpW - imgW) / 2
      // PC: imgW === vpW -> initPanX = 0 (exact full-width coverage, 0 left/right gap).
      // Tall viewports: imgW > vpW -> initPanX < 0 (centered horizontally with no gaps).
      const minX = imgW >= vpW ? vpW - imgW : (vpW - imgW) / 2
      const maxX = imgW >= vpW ? 0 : (vpW - imgW) / 2
      const initPanX = clamp((vpW - imgW) / 2, minX, maxX)

      // Vertical: center around FOCUS_Y (550, Central Clock Tower & town), clamped to [minY, maxY]
      const minY = imgH >= vpH ? vpH - imgH : (vpH - imgH) / 2
      const maxY = imgH >= vpH ? 0 : (vpH - imgH) / 2
      const desiredPanY = vpH / 2 - FOCUS_Y * initScale
      const initPanY = clamp(desiredPanY, minY, maxY)

      return { initScale, initPanX, initPanY }
    },
    [clamp]
  )

  const isInitialized = useRef(false)
  const lastVpDims = useRef({ w: 0, h: 0 })

  // ResizeObserver for initial entry, tab switch (#food), and window resize
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const handleResize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return

      const prevW = lastVpDims.current.w
      const prevH = lastVpDims.current.h
      lastVpDims.current = { w, h }

      const minScale = getMinScale(w, h)
      const maxScale = getMaxScale(minScale)

      if (!isInitialized.current || prevW === 0 || prevH === 0) {
        // Initial setup or container became visible (tab switch)
        isInitialized.current = true
        const { initScale, initPanX, initPanY } = getInitialView(w, h)
        setScale(initScale)
        setPanX(initPanX)
        setPanY(initPanY)
      } else {
        // Window resized
        setScale((prevScale) => {
          // If previous scale dropped below the new minScale, raise it to minScale
          const wasAtMinScale = prevScale <= minScale + 0.05
          const nextScale = wasAtMinScale ? minScale : clamp(prevScale, minScale, maxScale)

          const imgW = IMG_W * nextScale
          const imgH = IMG_H * nextScale

          const minX = imgW >= w ? w - imgW : (w - imgW) / 2
          const maxX = imgW >= w ? 0 : (w - imgW) / 2
          const minY = imgH >= h ? h - imgH : (h - imgH) / 2
          const maxY = imgH >= h ? 0 : (h - imgH) / 2

          setPanX((prevPanX) => {
            if (wasAtMinScale) {
              return clamp((w - imgW) / 2, minX, maxX)
            }
            return clamp(prevPanX, minX, maxX)
          })

          setPanY((prevPanY) => {
            if (wasAtMinScale) {
              return clamp(h / 2 - FOCUS_Y * nextScale, minY, maxY)
            }
            return clamp(prevPanY, minY, maxY)
          })

          return nextScale
        })
      }
    }

    if (el.clientWidth > 0 && el.clientHeight > 0) {
      handleResize(el.clientWidth, el.clientHeight)
    }

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect
          const w = cr.width || el.clientWidth
          const h = cr.height || el.clientHeight
          if (w > 0 && h > 0) {
            handleResize(w, h)
          }
        }
      })
      ro.observe(el)
    }

    const onWindowResize = () => {
      if (el.clientWidth > 0 && el.clientHeight > 0) {
        handleResize(el.clientWidth, el.clientHeight)
      }
    }
    window.addEventListener('resize', onWindowResize)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', onWindowResize)
    }
  }, [getInitialView, clamp])

  // Zoom handlers (Rules 2-a, 2-b)
  const handleZoom = (factor: number) => {
    const el = viewportRef.current
    const vpW = el?.clientWidth || 390
    const vpH = el?.clientHeight || 460
    const minScale = getMinScale(vpW, vpH)
    const maxScale = getMaxScale(minScale)

    setScale((prevScale) => {
      const targetScale = prevScale * factor
      const nextScale = clamp(targetScale, minScale, maxScale)

      const imgW = IMG_W * nextScale
      const imgH = IMG_H * nextScale

      const minX = imgW >= vpW ? vpW - imgW : (vpW - imgW) / 2
      const maxX = imgW >= vpW ? 0 : (vpW - imgW) / 2
      const minY = imgH >= vpH ? vpH - imgH : (vpH - imgH) / 2
      const maxY = imgH >= vpH ? 0 : (vpH - imgH) / 2

      setPanX((prevPanX) => {
        if (Math.abs(nextScale - minScale) < 0.001) {
          // At max zoom out, center horizontally
          return clamp((vpW - imgW) / 2, minX, maxX)
        }
        // Zoom relative to viewport center
        const newPanX = vpW / 2 - (vpW / 2 - prevPanX) * (nextScale / prevScale)
        return clamp(newPanX, minX, maxX)
      })

      setPanY((prevPanY) => {
        if (Math.abs(nextScale - minScale) < 0.001) {
          // At max zoom out, center vertically on town center
          return clamp(vpH / 2 - FOCUS_Y * nextScale, minY, maxY)
        }
        const newPanY = vpH / 2 - (vpH / 2 - prevPanY) * (nextScale / prevScale)
        return clamp(newPanY, minY, maxY)
      })

      return nextScale
    })
  }

  // Reset button returns to centered initial state (Rule 2-d)
  const handleReset = () => {
    const el = viewportRef.current
    if (el) {
      const vpW = el.clientWidth
      const vpH = el.clientHeight
      if (vpW > 0 && vpH > 0) {
        const { initScale, initPanX, initPanY } = getInitialView(vpW, vpH)
        setScale(initScale)
        setPanX(initPanX)
        setPanY(initPanY)
      }
      setActiveBlockId(null)
    }
  }

  // Pointer drag interactions with strict edge clamp (Rule 2-b)
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startPos.current = { x: e.clientX, y: e.clientY }
    startPan.current = { x: panX, y: panY }
    if (e.target instanceof HTMLElement) {
      try {
        e.target.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    const { minX, maxX, minY, maxY } = getBounds(scale)
    setPanX(clamp(startPan.current.x + dx, minX, maxX))
    setPanY(clamp(startPan.current.y + dy, minY, maxY))
  }

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    try {
      if (e.target instanceof HTMLElement && e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId)
      }
    } catch {}
  }

  // 아코디언 열림/닫힘 토글 (다중 열림 지원)
  const toggleBlock = (blockId: string) => {
    setOpenBlockIds((prev) => {
      const next = new Set(prev)
      if (next.has(blockId)) {
        next.delete(blockId)
      } else {
        next.add(blockId)
      }
      return next
    })
  }

  // 6곳 초과 시 '더 보기' 토글
  const toggleShowMore = (blockId: string) => {
    setExpandedBlockVenues((prev) => {
      const next = new Set(prev)
      if (next.has(blockId)) {
        next.delete(blockId)
      } else {
        next.add(blockId)
      }
      return next
    })
  }

  // Select block handler (지도 핀 클릭 시)
  const handleSelectBlock = (blockId: string) => {
    setActiveBlockId(blockId)
    const block = blocks.find((b) => b.id === blockId)
    if (block) {
      const { minX, maxX, minY, maxY, vpW, vpH } = getBounds(scale)
      const targetX = vpW / 2 - block.x * scale
      const targetY = vpH / 2 - block.y * scale
      setPanX(clamp(targetX, minX, maxX))
      setPanY(clamp(targetY, minY, maxY))
    }
    // 지시사항: 지도의 구역 핀을 누르면 해당 구역 드랍다운이 열리고 그 헤더 위치로 부드럽게 스크롤
    setOpenBlockIds((prev) => new Set(prev).add(blockId))
    setTimeout(() => {
      const el = document.getElementById(`accordion-block-${blockId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 120)
  }

  // Filtered venues to display in bottom card slider
  const displayedVenues = useMemo(() => {
    if (activeBlockId) {
      const block = blocks.find((b) => b.id === activeBlockId)
      if (!block) return []
      return block.venues.filter((v) => filter === 'all' || v.cat === filter)
    }
    return allVenues.filter((v) => filter === 'all' || v.cat === filter)
  }, [activeBlockId, filter, blocks, allVenues])

  const activeBlock = blocks.find((b) => b.id === activeBlockId)

  // Walk text helper
  const renderWalkText = (v: Venue) => {
    if (v.walk_time_min && v.walk_dist_m) {
      return (
        <span>
          🚶 {t.walkPrefix}
          <strong>{v.walk_time_min}</strong>
          {t.walkSuffix} ({v.walk_dist_m}m)
        </span>
      )
    }
    return <span>🚗 {t.walkCarOnly}</span>
  }

  return (
    <div className={styles.mapContainer}>
      {/* Header with Title and Language Switcher */}
      <header className={styles.mapHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitleGroup}>
            <h2>{t.title}</h2>
            <p>{getDynamicSubtitle(lang, totalCount)}</p>
          </div>
          {showLanguageSwitcher && (
            <div className={styles.langBar}>
              {validLocales.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`${styles.langBtn} ${lang === l ? styles.langBtnActive : ''}`}
                  onClick={() => setLang(l)}
                >
                  {I18N[l].langName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filters: All (92) / Dining (82) / Bars (10) */}
        <div className={styles.filterRow}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('all')}
          >
            {`${t.tabAll.split(' (')[0]} (${allVenues.length})`}
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'dining' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('dining')}
          >
            <span className={styles.tabIcon}>🍴</span>
            <span>{`${t.tabDining.split(' (')[0]} (${allVenues.filter(v => v.cat === 'dining').length})`}</span>
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'bars' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('bars')}
          >
            <span className={styles.tabIcon}>🍸</span>
            <span>{`${t.tabBars.split(' (')[0]} (${allVenues.filter(v => v.cat === 'bars').length})`}</span>
          </button>
        </div>
      </header>

      {/* Map Viewport Area */}
      <div
        className={styles.mapViewport}
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={styles.mapCanvas}
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
          }}
        >
          {/* Map Base Image for Selected Language */}
          <img
            src={MAP_IMAGES[lang]}
            alt={t.title}
            className={styles.mapBgImg}
            draggable={false}
          />

          {/* Block Cluster Markers */}
          {blocks.map((block) => {
            const count = block.venues.filter(
              (v) => filter === 'all' || v.cat === filter
            ).length
            if (count === 0) return null

            const isActive = activeBlockId === block.id

            return (
              <div
                key={block.id}
                className={`${styles.blockMarker} ${isActive ? styles.markerActive : ''}`}
                style={{ left: `${block.x}px`, top: `${block.y}px` }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectBlock(block.id)
                }}
              >
                <div className={styles.markerBubble}>{count}</div>
                {isActive && (
                  <div className={styles.markerTooltip}>
                    📍 {getBlockName(block, lang)} ({count})
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Map Controls */}
        <div className={styles.mapControls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => handleZoom(1.25)}
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => handleZoom(0.8)}
            title="Zoom Out"
          >
            -
          </button>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={handleReset}
            style={{ fontSize: '11px' }}
            title="Reset View"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Informational Banner: Outside Map Viewport, protecting SUNSET TOWN logo */}
      <div className={styles.noticeBar}>
        <span className={styles.noticeTag}>{t.noticeTag}</span>
        <span className={styles.noticeText}>{t.noticeText}</span>
      </div>

      {/* Bottom Dropdown / Accordion Panel (Ryan 지침: 가로 스크롤 카드 -> 세로 아코디언 전환) */}
      <div className={styles.bottomPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            🏛️ {t.districtListHeading}
          </div>
        </div>

        {/* 구역(블록)별 세로 아코디언 목록 */}
        <div className={styles.districtAccordionList}>
          {blocks.map((block) => {
            // 상단 필터(전체/식당/바&펍) 반영
            const blockVenues = block.venues.filter((v) => filter === 'all' || v.cat === filter)
            // 지시사항: 업체가 0곳이 된 구역은 숨긴다
            if (blockVenues.length === 0) return null

            const isOpen = openBlockIds.has(block.id)
            const isExpanded = expandedBlockVenues.has(block.id)
            const visibleVenues = isExpanded ? blockVenues : blockVenues.slice(0, 6)
            const remainingCount = blockVenues.length - 6
            const isPinActive = activeBlockId === block.id
            const blockName = getBlockName(block, lang)

            return (
              <section
                key={block.id}
                id={`accordion-block-${block.id}`}
                className={`${styles.districtAccordionItem} ${
                  isPinActive ? styles.districtAccordionItemActive : ''
                }`}
              >
                {/* 구역마다 헤더 한 줄: 구역 이름 + 업체 수 + 펼침 화살표 */}
                <button
                  type="button"
                  id={`accordion-header-${block.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${block.id}`}
                  className={`${styles.districtHeaderBtn} ${
                    isOpen ? styles.districtHeaderBtnOpen : ''
                  }`}
                  onClick={() => toggleBlock(block.id)}
                >
                  <div className={styles.districtHeaderTitleGroup}>
                    <span className={styles.districtHeaderPin}>📍</span>
                    <span className={styles.districtHeaderName}>{blockName}</span>
                    <span className={styles.districtHeaderBadge}>
                      {blockVenues.length}
                      {renderVenueCountSuffix(blockVenues.length, lang, t.venueCountSuffix)}
                    </span>
                  </div>
                  <span
                    className={`${styles.districtHeaderArrow} ${
                      isOpen ? styles.districtHeaderArrowOpen : ''
                    }`}
                  >
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>

                {/* 구역 안 업체 세로 카드 목록 (모바일 390px 한 줄에 하나, 가로 스크롤 완전 금지) */}
                {isOpen && (
                  <div
                    id={`accordion-panel-${block.id}`}
                    role="region"
                    aria-labelledby={`accordion-header-${block.id}`}
                    className={styles.districtBody}
                  >
                    <div className={styles.verticalVenuesList}>
                      {visibleVenues.map((v) => {
                        const isDining = v.cat === 'dining'
                        const isExact = (v.level || '').includes('확실')
                        const levelLabel = isExact ? t.levelExact : t.levelEst

                        return (
                          <Link
                            key={v.slug}
                            href={`/${lang}/business/${v.slug}`}
                            className={styles.verticalVenueCard}
                          >
                            <div className={styles.cardMain}>
                              <div className={styles.cardTop}>
                                <div className={styles.cardTitle}>{v.name}</div>
                                <span
                                  className={`${styles.cardBadge} ${
                                    isDining ? styles.badgeDining : styles.badgeBars
                                  }`}
                                >
                                  {isDining ? t.diningBadge : t.barsBadge}
                                </span>
                              </div>
                              {v.addr && <div className={styles.cardAddr}>{v.addr}</div>}
                              <div className={styles.cardWalkTime}>{renderWalkText(v)}</div>
                            </div>
                            <div className={styles.cardBottom}>
                              <span
                                className={`${styles.cardLevelBadge} ${
                                  isExact ? styles.levelExact : styles.levelEst
                                }`}
                              >
                                {levelLabel}
                              </span>
                              <span className={styles.cardBtn}>{t.detailBtn}</span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    {/* 구역 안 업체가 6곳을 넘으면 "더 보기 (N곳)" / "접기" 버튼 */}
                    {blockVenues.length > 6 && (
                      <button
                        type="button"
                        className={styles.showMoreBtn}
                        onClick={() => toggleShowMore(block.id)}
                      >
                        {isExpanded
                          ? `${t.showLess} ▴`
                          : `${t.showMore} (${remainingCount}${renderVenueCountSuffix(
                              remainingCount,
                              lang,
                              t.venueCountSuffix
                            )}) ▾`}
                      </button>
                    )}
                  </div>
                )}
              </section>
            )
          })}
        </div>

        {/* Outside Venues Accordion (6 places) */}
        <div className={styles.outsideSection}>
          <button
            type="button"
            className={styles.outsideToggle}
            onClick={() => setOutsideOpen(!outsideOpen)}
          >
            <span>{getDynamicOutsideTitle(lang, outsideVenues.length)}</span>
            <span>{outsideOpen ? '▲' : '▼'}</span>
          </button>
          <div
            className={`${styles.outsideContent} ${
              outsideOpen ? styles.outsideOpen : ''
            }`}
          >
            {outsideVenues.map((ov) => (
              <Link
                key={ov.slug}
                href={`/${lang}/business/${ov.slug}`}
                className={styles.outsideCard}
              >
                <div>
                  <div className={styles.cardTitle}>{ov.name}</div>
                  <div className={styles.cardAddr}>{ov.addr || ''}</div>
                </div>
                <div className={styles.cardBottom}>
                  <span
                    className={`${styles.cardLevelBadge} ${styles.levelEst}`}
                  >
                    {t.levelEst}
                  </span>
                  <span className={styles.cardBtn}>{t.detailBtn}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
