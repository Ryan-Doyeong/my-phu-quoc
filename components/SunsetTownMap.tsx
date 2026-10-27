'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n/config'
import {
  SUNSET_LANDMARKS,
  getSunsetMapImage,
  type MapLandmark,
} from '@/lib/sunsetMapData'

interface Props {
  locale?: Locale
  initialSelectedId?: string
  height?: string
  showSidebar?: boolean
}

// 7개 언어 UI 라벨
const UI_TEXTS: Record<
  Locale,
  {
    eyebrow: string
    title: string
    subtitle: string
    viewOriginalBtn: string
    downloadBtn: string
    placesHeader: string
    placesSub: string
    openGoogleMaps: string
    bookTicket: string
    tipLabel: string
    aboutLabel: string
    bestTimeLabel: string
    walkLabel: string
    showMore: string
    showLess: string
    mapPinTapHint: string
    toggleDetails: string
    toggleDetailsClose: string
    categories: Record<string, string>
  }
> = {
  en: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: 'Sunset Town Guide Map',
    subtitle: 'High-resolution illustrated guide map featuring the 12 iconic landmarks and walking routes across Sunset Town.',
    viewOriginalBtn: 'Enlarge Map',
    downloadBtn: 'Download HD Map',
    placesHeader: '12 Iconic Landmarks Guide',
    placesSub: 'Numbered to match the map pins (No. 1 ~ 12). Click any card to expand visitor tips, walking times, and direct Google Maps navigation.',
    openGoogleMaps: 'Google Maps Directions',
    bookTicket: 'Book Discount Tickets',
    tipLabel: 'Traveler Tip',
    aboutLabel: 'About Place',
    bestTimeLabel: 'Best Time',
    walkLabel: 'Walking',
    showMore: 'Read More ▾',
    showLess: 'Show Less ▴',
    mapPinTapHint: 'Tap pin to jump to landmark',
    toggleDetails: 'View Details & Tips ▾',
    toggleDetailsClose: 'Close Details ▴',
    categories: {
      all: 'All Places (12)',
      attraction: 'Landmarks',
      show: 'Shows & Fireworks',
      shopping: 'Night Market',
      transport: 'Cable Car & Marina',
      beach: 'Beach',
      culture: 'Culture & Ruins',
    },
  },
  ko: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: '선셋타운 전체 안내 지도',
    subtitle: '선셋타운의 주요 거리와 12대 핵심 명소를 한눈에 파악할 수 있는 고해상도 인포그래픽 가이드 지도입니다.',
    viewOriginalBtn: '지도 크게 보기',
    downloadBtn: '고화질 다운로드',
    placesHeader: '선셋타운 12대 핵심 명소 상세 가이드',
    placesSub: '지도 번호(No. 1 ~ 12) 핀과 대응하는 각 명소 목록입니다. 카드를 누르면 상세 설명, 여행자 팁 및 구글맵 길찾기가 펼쳐집니다.',
    openGoogleMaps: '구글맵 길찾기',
    bookTicket: '할인 티켓 예매',
    tipLabel: '여행자 팁',
    aboutLabel: '명소 소개',
    bestTimeLabel: '추천 시간',
    walkLabel: '도보 거리',
    showMore: '더 보기 ▾',
    showLess: '접기 ▴',
    mapPinTapHint: '핀을 누르면 해당 명소 가이드로 이동합니다',
    toggleDetails: '상세 가이드 & 팁 보기 ▾',
    toggleDetailsClose: '상세 가이드 접기 ▴',
    categories: {
      all: '전체 보기 (12)',
      attraction: '핵심 명소',
      show: '공연 & 불꽃쇼',
      shopping: '야시장 & 쇼핑',
      transport: '케이블카 & 마리나',
      beach: '해변 & 비치',
      culture: '예술 & 역사',
    },
  },
  zh: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: '日落小镇全景导览图',
    subtitle: '高清手绘导览图，展示日落小镇主要街道网络、核心景点与沿海打卡步道。',
    viewOriginalBtn: '查看大图',
    downloadBtn: '下载高清地图',
    placesHeader: '日落小镇12大核心地标详细指南',
    placesSub: '对应地图序号(No. 1 ~ 12)景点的详细指南。点击卡片可展开游玩建议、步行时间与一键导航。',
    openGoogleMaps: '谷歌地图导航',
    bookTicket: '优惠门票预订',
    tipLabel: '游玩贴士',
    aboutLabel: '景点介绍',
    bestTimeLabel: '推荐时段',
    walkLabel: '步行距离',
    showMore: '展开更多 ▾',
    showLess: '收起 ▴',
    mapPinTapHint: '点击图钉直达地标指南',
    toggleDetails: '查看详情与贴士 ▾',
    toggleDetailsClose: '收起详情 ▴',
    categories: {
      all: '全部查看 (12)',
      attraction: '核心地标',
      show: '大秀与烟花',
      shopping: '夜市与购物',
      transport: '缆车站与码头',
      beach: '海滩漫步',
      culture: '艺术与古迹',
    },
  },
  ja: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: 'サンセットタウン イラスト案内マップ',
    subtitle: 'サンセットタウンの主要ストリートと12大名所を網羅した高解像度イラストマップです。',
    viewOriginalBtn: '大きく見る',
    downloadBtn: '高画質ダウンロード',
    placesHeader: 'サンセットタウン 12大名所詳細ガイド',
    placesSub: 'マップ番号(No. 1〜12)に対応する各名所一覧です。カードを押すと詳細見どころ、旅のヒント、Googleマップ案内が展開されます。',
    openGoogleMaps: 'Googleマップ案内',
    bookTicket: '割引チケットを予約',
    tipLabel: '旅のヒント',
    aboutLabel: 'スポット概要',
    bestTimeLabel: 'おすすめ時間',
    walkLabel: '徒歩目安',
    showMore: 'もっと見る ▾',
    showLess: '閉じる ▴',
    mapPinTapHint: 'ピンをタップで名所ガイドへ移動',
    toggleDetails: '詳細＆ヒントを見る ▾',
    toggleDetailsClose: '詳細を閉じる ▴',
    categories: {
      all: 'すべて表示 (12)',
      attraction: '主要名所',
      show: 'ショー＆花火',
      shopping: '夜市＆ショッピング',
      transport: 'ロープウェイ＆港',
      beach: 'ビーチ',
      culture: 'アート＆遺跡',
    },
  },
  ru: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: 'Иллюстрированная карта Сансет-Тауна',
    subtitle: 'Высококачественная иллюстрированная карта Сансет-Тауна с 12 главными достопримечательностями и пешеходными маршрутами.',
    viewOriginalBtn: 'Увеличить карту',
    downloadBtn: 'Скачать карту',
    placesHeader: '12 главных достопримечательностей',
    placesSub: 'Список точек No. 1–12 на карте. Нажмите на карточку, чтобы открыть подробное описание, советы и навигацию.',
    openGoogleMaps: 'Маршрут в Google Maps',
    bookTicket: 'Купить билеты',
    tipLabel: 'Совет путешественнику',
    aboutLabel: 'О месте',
    bestTimeLabel: 'Лучшее время',
    walkLabel: 'Пешком',
    showMore: 'Читать далее ▾',
    showLess: 'Свернуть ▴',
    mapPinTapHint: 'Нажмите на пин для перехода',
    toggleDetails: 'Подробнее и советы ▾',
    toggleDetailsClose: 'Свернуть ▴',
    categories: {
      all: 'Все места (12)',
      attraction: 'Достопримечательности',
      show: 'Шоу и салюты',
      shopping: 'Рынок и покупки',
      transport: 'Канатная дорога',
      beach: 'Пляж',
      culture: 'Культура и руины',
    },
  },
  hi: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: 'सनसेट टाउन सचित्र गाइड नक्शा',
    subtitle: 'सनसेट टाउन के 12 प्रमुख स्थलों और पैदल मार्गों को दर्शाने वाला सचित्र गाइड नक्शा।',
    viewOriginalBtn: 'बड़ा करके देखें',
    downloadBtn: 'हाई-रेज़ नक्शा डाउनलोड करें',
    placesHeader: '12 प्रमुख दर्शनीय स्थल गाइड',
    placesSub: 'मानचित्र संख्या 1 से 12 के अनुरूप स्थल। विवरण, सुझाव और नेविगेशन देखने के लिए कार्ड पर टैप करें।',
    openGoogleMaps: 'Google Maps दिशा-निर्देश',
    bookTicket: 'रियायती टिकट बुक करें',
    tipLabel: 'यात्री सुझाव',
    aboutLabel: 'स्थान के बारे में',
    bestTimeLabel: 'सर्वोत्तम समय',
    walkLabel: 'पैदल दूरी',
    showMore: 'और देखें ▾',
    showLess: 'कम देखें ▴',
    mapPinTapHint: 'गाइड देखने के लिए पिन पर टैप करें',
    toggleDetails: 'विवरण और सुझाव देखें ▾',
    toggleDetailsClose: 'विवरण बंद करें ▴',
    categories: {
      all: 'सभी स्थल (12)',
      attraction: 'प्रमुख स्थल',
      show: 'शो और आतिशबाजी',
      shopping: 'नाइट मार्केट',
      transport: 'केबल कार और मरीना',
      beach: 'समुद्र तट',
      culture: 'संस्कृति और कला',
    },
  },
  vi: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: 'Bản đồ minh họa Thị trấn Hoàng Hôn',
    subtitle: 'Bản đồ minh họa độ phân giải cao giới thiệu các tuyến đường chính và 12 điểm đến nổi bật tại Sunset Town.',
    viewOriginalBtn: 'Xem ảnh lớn',
    downloadBtn: 'Tải bản đồ gốc',
    placesHeader: 'Cẩm nang chi tiết 12 điểm đến biểu tượng',
    placesSub: 'Danh sách tương ứng số 1 đến 12 trên bản đồ. Nhấn vào thẻ để mở rộng cẩm nang du lịch, thời gian đi bộ và chỉ đường.',
    openGoogleMaps: 'Chỉ đường Google Maps',
    bookTicket: 'Đặt vé ưu đãi',
    tipLabel: 'Mẹo du lịch',
    aboutLabel: 'Giới thiệu điểm đến',
    bestTimeLabel: 'Thời gian lý tưởng',
    walkLabel: 'Khoảng cách đi bộ',
    showMore: 'Xem thêm ▾',
    showLess: 'Thu gọn ▴',
    mapPinTapHint: 'Chạm ghim để xem chi tiết địa danh',
    toggleDetails: 'Xem chi tiết & Mẹo ▾',
    toggleDetailsClose: 'Thu gọn chi tiết ▴',
    categories: {
      all: 'Tất cả (12)',
      attraction: 'Điểm biểu tượng',
      show: 'Show & Pháo hoa',
      shopping: 'Chợ đêm & Mua sắm',
      transport: 'Cáp treo & Bến tàu',
      beach: 'Bãi biển',
      culture: 'Nghệ thuật & Di tích',
    },
  },
}

export function SunsetTownMap({ locale }: Props) {
  const loc = locale || 'en'
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})
  const [activePinId, setActivePinId] = useState<string | null>(null)
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null)

  // ESC 키로 라이트박스 모달 닫기
  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  // 언어별 지도 이미지 가져오기 (.webp 우선)
  const mapImage = getSunsetMapImage(loc)

  // 다국어 라벨 사전
  const t = UI_TEXTS[loc] || UI_TEXTS.en

  // 설명 펼치기 / 접기 토글
  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 핀 클릭 시: 해당 카드로 스크롤 이동 및 자동 펼침
  const handlePinClick = (lm: MapLandmark) => {
    setActivePinId(lm.id)
    setExpandedCards((prev) => ({
      ...prev,
      [lm.id]: true,
    }))
    setHighlightedCardId(lm.id)

    // 카테고리 필터에 걸려있으면 'all'로 리셋
    if (selectedCategory !== 'all' && lm.category !== selectedCategory) {
      setSelectedCategory('all')
    }

    setTimeout(() => {
      const el = document.getElementById(`landmark-card-${lm.id}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)

    setTimeout(() => {
      setHighlightedCardId(null)
    }, 2500)
  }

  // 필터링된 랜드마크 목록
  const filteredLandmarks = SUNSET_LANDMARKS.filter((lm) => {
    if (selectedCategory === 'all') return true
    return lm.category === selectedCategory
  })

  return (
    <div className="sunsetTownMapWrapper">
      {/* 1. 상단 인터랙티브 지도 표현: 핀 오버레이 + 비율 컨테이너 */}
      <div className="mapPhotoCard">
        {/* 모바일/데스크톱 반응형 인터랙티브 핀 프레임 */}
        <div className="mapPinGuideBanner">
          <span>📍 {t.mapPinTapHint}</span>
        </div>

        <div className="mapInteractiveContainer">
          <div className="mapAspectBox">
            <Image
              src={mapImage.webp}
              alt={t.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: 'contain' }}
              className="mapBaseImage"
            />

            {/* 12대 랜드마크 핀 오버레이 (2000 x 2914 원본 좌표계 기준 정밀 비율 배치) */}
            <div className="mapPinsOverlay" aria-label="12 Landmark Pins">
              {SUNSET_LANDMARKS.map((lm) => {
                const leftPercent = (lm.imgX / 2000) * 100
                const topPercent = (lm.imgY / 2914) * 100
                const isActive = activePinId === lm.id
                const primaryName = lm.name[loc] || lm.name.en || lm.name.ko

                return (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => handlePinClick(lm)}
                    className={`mapPinItem ${isActive ? 'isPinActive' : ''}`}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                    }}
                    title={`No.${lm.number} ${primaryName}`}
                    aria-label={`No.${lm.number} ${primaryName}`}
                  >
                    <span className="mapPinBadge">{lm.number}</span>
                    <span className="mapPinTooltip">{primaryName}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 지도 아래 액션 버튼: 「지도 크게 보기」(라이트박스) + 「고화질 다운로드」 */}
        <div className="mapPhotoActions">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="outlineDark mapTopBtn"
          >
            <span>🔍</span>
            <span>{t.viewOriginalBtn}</span>
          </button>
          <a
            href={mapImage.webp}
            download={mapImage.filename}
            className="primaryButton mapTopBtn"
          >
            <span>📥</span>
            <span>{t.downloadBtn}</span>
          </a>
        </div>
      </div>

      {/* 2. 12대 랜드마크 가이드 섹션 */}
      <div className="landmarksGuideSection" id="landmarks-list">
        <div className="landmarksHeader">
          <div>
            <h3>{t.placesHeader}</h3>
            <p className="landmarksHeaderSub">{t.placesSub}</p>
          </div>
        </div>

        {/* 카테고리 필터: 알약형 칩 */}
        <div className="landmarkFilterRow">
          <div className="landmarksFilters">
            {[
              'all',
              'attraction',
              'show',
              'shopping',
              'transport',
              'beach',
              'culture',
            ].map((catKey) => (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`landmarkFilterBtn ${selectedCategory === catKey ? 'active' : ''}`}
              >
                {t.categories[catKey] || catKey}
              </button>
            ))}
          </div>
        </div>

        {/* 12대 명소 카드 목록 (클릭 시 상세 설명이 펼쳐지는 아코디언 방식) */}
        <div className="landmarksGrid">
          {filteredLandmarks.map((lm: MapLandmark) => {
            const isExpanded = !!expandedCards[lm.id]
            const isHighlighted = highlightedCardId === lm.id
            const primaryName = lm.name[loc] || lm.name.en || lm.name.ko
            const secondaryName =
              loc === 'en' ? (lm.name.vi || '') : (lm.name.en || '')
            const desc =
              lm.description[loc] || lm.description.en || lm.description.ko
            const tip = lm.tips[loc] || lm.tips.en || lm.tips.ko
            const mapUrl =
              lm.lat && lm.lng
                ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}`
                : lm.googleMapsUrl

            return (
              <article
                key={lm.id}
                id={`landmark-card-${lm.id}`}
                className={`landmarkCard landmarkCardAccordion ${isExpanded ? 'cardExpanded' : 'cardCollapsed'} ${isHighlighted ? 'cardHighlighted' : ''}`}
              >
                {/* 상단 클릭 가능 영역 (헤더 + 요약 메타 + 펼침 버튼) */}
                <div
                  className="landmarkCardClickable"
                  onClick={() => toggleExpand(lm.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`landmark-detail-${lm.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleExpand(lm.id)
                    }
                  }}
                >
                  <div className="landmarkHeader">
                    <div className="landmarkBadgeGroup">
                      <span className="landmarkNumBadge">{lm.number}</span>
                      <div className="landmarkNameGroup">
                        <h4 className="landmarkPrimaryName">{primaryName}</h4>
                        {secondaryName && secondaryName !== primaryName && (
                          <span className="landmarkSecondaryName">{secondaryName}</span>
                        )}
                      </div>
                    </div>
                    <span className="landmarkAccordionToggleIcon" aria-hidden="true">
                      {isExpanded ? '▴' : '▾'}
                    </span>
                  </div>

                  {/* 한 줄 요약: 카테고리 태그 및 주소 */}
                  <div className="landmarkSummaryLine">
                    <span className="landmarkCategoryTag">
                      {t.categories[lm.category] || lm.category}
                    </span>
                    <span className="landmarkAddressText">📍 {lm.address}</span>
                  </div>

                  {/* 추천 시간 · 도보 거리 요약 */}
                  <div className="landmarkMetaGrid">
                    <div className="landmarkMetaItem">
                      <span className="landmarkMetaLabel">🕒 {t.bestTimeLabel}</span>
                      <span className="landmarkMetaValue">
                        {lm.bestTime || lm.operatingHours || '-'}
                      </span>
                    </div>
                    <div className="landmarkMetaItem">
                      <span className="landmarkMetaLabel">🚶 {t.walkLabel}</span>
                      <span className="landmarkMetaValue">
                        {lm.walkingDistance && lm.walkingTime
                          ? `${lm.walkingDistance} · ${lm.walkingTime}`
                          : lm.walkingDistance || lm.walkingTime || '-'}
                      </span>
                    </div>
                  </div>

                  {/* 펼치기 안내 텍스트 */}
                  <div className="landmarkAccordionHint">
                    <span>{isExpanded ? t.toggleDetailsClose : t.toggleDetails}</span>
                  </div>
                </div>

                {/* 카드를 누르면 부드럽게 펼쳐지는 상세 가이드 본문 (SEO 인덱싱 보존) */}
                <div
                  id={`landmark-detail-${lm.id}`}
                  className={`landmarkCardDetailBody ${isExpanded ? 'detailVisible' : 'detailHidden'}`}
                >
                  {/* 상세 설명 본문 */}
                  <div className="landmarkFullDesc">{desc}</div>

                  {/* 여행자 팁 */}
                  {tip && (
                    <div className="landmarkTipBox">
                      <strong className="landmarkTipLabel">💡 {t.tipLabel}:</strong> {tip}
                    </div>
                  )}

                  {/* 카드 액션: 「구글맵 길찾기」 + 「할인 티켓 예매」 */}
                  <div className="landmarkCardActions">
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primaryButton landmarkCardBtn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>🗺️</span>
                      <span>{t.openGoogleMaps}</span>
                    </a>
                    {lm.ticketUrl && (
                      <a
                        href={lm.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outlineDark landmarkCardBtn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>🎟️</span>
                        <span>{t.bookTicket}</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* 라이트박스 팝업 확대 모달 */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="mapLightboxModal"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="mapLightboxContent" onClick={(e) => e.stopPropagation()}>
            <div className="mapLightboxTop">
              <span className="mapLightboxTitle">🗺️ {t.title}</span>
              <div className="mapLightboxActions">
                <a
                  href={mapImage.webp}
                  download={mapImage.filename}
                  className="primaryButton mapLightboxDownloadBtn"
                >
                  <span>📥</span>
                  <span>{t.downloadBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="mapLightboxClose"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mapLightboxBody">
              <img src={mapImage.webp} alt={t.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SunsetTownMap
