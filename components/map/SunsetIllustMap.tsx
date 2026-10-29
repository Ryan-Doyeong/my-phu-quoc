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
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

  // Calculate clamp boundaries
  const getBounds = useCallback(
    (curScale: number) => {
      const vpW = viewportRef.current?.clientWidth || 390
      const vpH = viewportRef.current?.clientHeight || 500
      const minX = Math.min(0, vpW - IMG_W * curScale)
      const maxX = 0
      const minY = Math.min(0, vpH - IMG_H * curScale)
      const maxY = 0
      return { minX, maxX, minY, maxY, vpW, vpH }
    },
    []
  )

  // 결함 1 (중대) 수정:
  // 탭 숨김(display: none) 상태에서 폭이 0으로 읽혀 scale이 0이 되는 문제 원천 해결.
  // 1. 폭이 0보다 클 때만 scale을 계산하고, 0이면 절대 scale을 0으로 덮어쓰지 않음.
  // 2. ResizeObserver를 통해 탭 전환, 창 크기 변경, #food 직접 진입 등으로 컨테이너가 화면에 나타나는 즉시 scale 재계산.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const updateScaleFromWidth = (width: number) => {
      if (width <= 0) return
      const nextScale = clamp(width / IMG_W, 0.35, 1.6)
      setScale((prev) => {
        // scale이 0에 가깝거나 크게 변했을 때 안전하게 갱신
        if (prev <= 0.05 || Math.abs(prev - nextScale) > 0.01) {
          const { minX, maxX, minY, maxY } = getBounds(nextScale)
          setPanX((px) => clamp(px, minX, maxX))
          setPanY((py) => clamp(py, minY, maxY))
          return nextScale
        }
        return prev
      })
    }

    // 마운트 시점에 유효한 너비가 있으면 즉시 초기화
    if (el.clientWidth > 0) {
      updateScaleFromWidth(el.clientWidth)
    }

    // 컨테이너 표시 상태 및 크기 변화를 실시간 감지
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect
          const w = cr.width || el.clientWidth
          if (w > 0) {
            updateScaleFromWidth(w)
          }
        }
      })
      ro.observe(el)
    }

    const onWindowResize = () => {
      if (el.clientWidth > 0) {
        updateScaleFromWidth(el.clientWidth)
      }
    }
    window.addEventListener('resize', onWindowResize)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', onWindowResize)
    }
  }, [getBounds])

  // Zoom handlers
  const handleZoom = (factor: number) => {
    setScale((prev) => {
      const nextScale = clamp(prev * factor, 0.35, 1.6)
      const { minX, maxX, minY, maxY } = getBounds(nextScale)
      setPanX((px) => clamp(px, minX, maxX))
      setPanY((py) => clamp(py, minY, maxY))
      return nextScale
    })
  }

  const handleReset = () => {
    if (viewportRef.current) {
      const vpW = viewportRef.current.clientWidth
      if (vpW > 0) {
        const initScale = clamp(vpW / IMG_W, 0.35, 1.6)
        setScale(initScale)
        setPanX(0)
        setPanY(-95)
      }
      setActiveBlockId(null)
    }
  }

  // Pointer drag interactions
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startPos.current = { x: e.clientX, y: e.clientY }
    startPan.current = { x: panX, y: panY }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    const { minX, maxX, minY, maxY } = getBounds(scale)
    setPanX(clamp(startPan.current.x + dx, minX, maxX))
    setPanY(clamp(startPan.current.y + dy, minY, maxY))
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  // Select block handler
  const handleSelectBlock = (blockId: string) => {
    if (activeBlockId === blockId) {
      setActiveBlockId(null)
      return
    }
    setActiveBlockId(blockId)
    const block = blocks.find((b) => b.id === blockId)
    if (block) {
      const { minX, maxX, minY, maxY, vpW, vpH } = getBounds(scale)
      const targetX = -(block.x * scale - vpW / 2)
      const targetY = -(block.y * scale - vpH / 2.2)
      setPanX(clamp(targetX, minX, maxX))
      setPanY(clamp(targetY, minY, maxY))
    }
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

      {/* Bottom Carousel / Cards Panel */}
      <div className={styles.bottomPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            📍{' '}
            {activeBlock
              ? `${getBlockName(activeBlock, lang)} (${displayedVenues.length})`
              : `${t.recommendedHeading} (${displayedVenues.length})`}
          </div>
          {activeBlockId && (
            <button
              type="button"
              className={styles.seeAllBtn}
              onClick={() => setActiveBlockId(null)}
            >
              {t.seeAll}
            </button>
          )}
        </div>

        {/* Venue Cards Slider */}
        <div className={styles.cardsSlider}>
          {displayedVenues.map((v) => {
            const isDining = v.cat === 'dining'
            const isExact = (v.level || '').includes('확실')
            const levelLabel = isExact ? t.levelExact : t.levelEst
            const blockForVenue = blocks.find((b) => b.id === v.anchor_key)
            const blockName = blockForVenue ? getBlockName(blockForVenue, lang) : ''

            return (
              <Link
                key={v.slug}
                href={`/${lang}/business/${v.slug}`}
                className={styles.venueCard}
              >
                <div>
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
                  <div className={styles.cardBlockTag}>
                    🏢 {blockName}
                  </div>
                  <div className={styles.cardAddr}>{v.addr || ''}</div>
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
