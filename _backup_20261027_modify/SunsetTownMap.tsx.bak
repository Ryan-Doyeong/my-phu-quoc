'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  SUNSET_LANDMARKS,
  getSunsetMapImage,
  type MapLandmark,
} from '@/lib/sunsetMapData'
import type { Locale } from '@/lib/i18n/config'

interface Props {
  locale: Locale
  initialSelectedId?: string
  height?: string
  showSidebar?: boolean
}

const UI_TEXTS: Record<string, {
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
  categories: Record<string, string>
}> = {
  en: {
    eyebrow: 'SUNSET TOWN ILLUSTRATED GUIDE MAP',
    title: 'Sunset Town Illustrated Map & Landmarks Guide',
    subtitle: 'High-resolution illustrated guide map featuring the iconic landmarks, walking routes, and scenic viewpoints of Sunset Town.',
    viewOriginalBtn: 'View Fullscreen',
    downloadBtn: 'Download High-Res Map',
    placesHeader: '12 Iconic Landmarks Guide',
    placesSub: 'Detailed walking routes, traveler tips, and Google Maps directions for spots No. 1 to 12.',
    openGoogleMaps: 'Google Maps Directions',
    bookTicket: 'Book Discount Tickets',
    tipLabel: 'Traveler Tip',
    aboutLabel: 'About this place',
    bestTimeLabel: 'Best Time',
    walkLabel: 'Walking',
    showMore: 'Read More ▾',
    showLess: 'Show Less ▴',
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
    viewOriginalBtn: '크게 보기',
    downloadBtn: '고화질 다운로드',
    placesHeader: '선셋타운 12대 핵심 명소 상세 가이드',
    placesSub: '지도 번호(No. 1 ~ 12)와 시각적으로 대응하는 각 명소의 상세 설명, 추천 시간, 여행자 팁 및 구글맵 바로가기입니다.',
    openGoogleMaps: '구글맵 길찾기',
    bookTicket: '할인 티켓 예매',
    tipLabel: '여행자 팁',
    aboutLabel: '명소 소개',
    bestTimeLabel: '추천 시간',
    walkLabel: '도보 거리',
    showMore: '더 보기 ▾',
    showLess: '접기 ▴',
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
    placesSub: '探索地图对应序号(No. 1 ~ 12)景点的详细介绍、游玩建议、步行时间与一键导航。',
    openGoogleMaps: '谷歌地图导航',
    bookTicket: '优惠门票预订',
    tipLabel: '游玩贴士',
    aboutLabel: '景点介绍',
    bestTimeLabel: '推荐时段',
    walkLabel: '步行距离',
    showMore: '展开更多 ▾',
    showLess: '收起 ▴',
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
    placesSub: 'マップ番号(No. 1〜12)に対応する各名所の見どころ、旅行者のヒント、徒歩時間、Googleマップ案内です。',
    openGoogleMaps: 'Googleマップ案内',
    bookTicket: '割引チケットを予約',
    tipLabel: '旅のヒント',
    aboutLabel: 'スポット概要',
    bestTimeLabel: 'おすすめ時間',
    walkLabel: '徒歩目安',
    showMore: 'もっと見る ▾',
    showLess: '閉じる ▴',
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
    placesSub: 'Подробная информация о точках No. 1–12 с советами для путешественников и навигацией Google Maps.',
    openGoogleMaps: 'Маршрут в Google Maps',
    bookTicket: 'Купить билеты',
    tipLabel: 'Совет путешественнику',
    aboutLabel: 'О месте',
    bestTimeLabel: 'Лучшее время',
    walkLabel: 'Пешком',
    showMore: 'Читать далее ▾',
    showLess: 'Свернуть ▴',
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
    placesSub: 'मानचित्र संख्या 1 से 12 के अनुरूप प्रत्येक स्थल का विवरण, सुझाव और गूगल मैप्स दिशा-निर्देश।',
    openGoogleMaps: 'Google Maps दिशा-निर्देश',
    bookTicket: 'रियायती टिकट बुक करें',
    tipLabel: 'यात्री सुझाव',
    aboutLabel: 'स्थान के बारे में',
    bestTimeLabel: 'सर्वोत्तम समय',
    walkLabel: 'पैदल दूरी',
    showMore: 'और देखें ▾',
    showLess: 'कम देखें ▴',
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
    placesSub: 'Khám phá từng địa danh tương ứng số 1 đến 12 trên bản đồ cùng mẹo du lịch, thời gian đi bộ và chỉ đường Google Maps.',
    openGoogleMaps: 'Chỉ đường Google Maps',
    bookTicket: 'Đặt vé ưu đãi',
    tipLabel: 'Mẹo du lịch',
    aboutLabel: 'Giới thiệu điểm đến',
    bestTimeLabel: 'Thời gian lý tưởng',
    walkLabel: 'Khoảng cách đi bộ',
    showMore: 'Xem thêm ▾',
    showLess: 'Thu gọn ▴',
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

export default function SunsetTownMap({ locale }: Props) {
  const loc = locale || 'en'
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

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
  const mapImage = getSunsetMapImage(locale)

  // 다국어 라벨 사전
  const t = UI_TEXTS[loc] || UI_TEXTS.en

  // 설명 펼치기 / 접기 토글
  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 필터링된 랜드마크 목록
  const filteredLandmarks = SUNSET_LANDMARKS.filter((lm) => {
    if (selectedCategory === 'all') return true
    return lm.category === selectedCategory
  })

  return (
    <div className="sunsetTownMapWrapper">
      {/* 섹션 타이틀: 사이트 공통 .sectionIntro 스타일 */}
      <div className="sectionIntro" style={{ marginBottom: 24 }}>
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
        </div>
        <p>{t.subtitle}</p>
      </div>

      {/* 1. 지도 표현: 밝은 종이톤 카드 안에서 비율 유지(object-fit: contain) + 하단 버튼 2개 */}
      <div className="mapPhotoCard">
        <div
          className="mapPhotoFrame"
          onClick={() => setIsLightboxOpen(true)}
          title={t.viewOriginalBtn}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsLightboxOpen(true)
            }
          }}
        >
          <Image
            src={mapImage.webp}
            alt={t.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1100px"
            style={{ objectFit: 'contain' }}
          />
          <div className="mapPhotoFrameHint">
            <span>🔍 {t.viewOriginalBtn}</span>
          </div>
        </div>

        {/* 지도 아래 버튼 2개: 「크게 보기」(outlineDark), 「고화질 다운로드」(primaryButton) */}
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
      <div className="landmarksGuideSection">
        <div className="landmarksHeader">
          <div>
            <h3>{t.placesHeader}</h3>
            <p className="landmarksHeaderSub">{t.placesSub}</p>
          </div>
        </div>

        {/* 카테고리 필터: 알약형 칩 (선택 시 바다색 채움, 비선택은 outline, 모바일 가로 스크롤) */}
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

        {/* 12대 명소 그리드 (데스크톱 2열 / 모바일 1열) */}
        <div className="landmarksGrid">
          {filteredLandmarks.map((lm: MapLandmark) => {
            const isExpanded = !!expandedCards[lm.id]
            const primaryName = lm.name[locale] || lm.name.en || lm.name.ko
            const secondaryName =
              locale === 'en' ? (lm.name.vi || '') : (lm.name.en || '')
            const desc =
              lm.description[locale] || lm.description.en || lm.description.ko
            const tip = lm.tips[locale] || lm.tips.en || lm.tips.ko
            const mapUrl =
              lm.lat && lm.lng
                ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}`
                : lm.googleMapsUrl

            return (
              <article key={lm.id} className="landmarkCard">
                <div className="landmarkCardBody">
                  {/* 상단: 번호 배지(바다색 원형) + 이름(현지어 크게 / 영문 작게) */}
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
                  </div>

                  {/* 한 줄 요약: 카테고리 태그 및 주소 */}
                  <div className="landmarkSummaryLine">
                    <span className="landmarkCategoryTag">
                      {t.categories[lm.category] || lm.category}
                    </span>
                    <span className="landmarkAddressText">📍 {lm.address}</span>
                  </div>

                  {/* 추천 시간 · 도보 거리 두 칸 */}
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

                  {/* 긴 설명: 2~3줄 보이고 「더 보기」로 펼침 */}
                  <div className={`landmarkDesc ${isExpanded ? 'isExpanded' : 'isClamped'}`}>
                    {desc}
                  </div>
                  {desc && desc.length > 70 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(lm.id)}
                      className="landmarkMoreBtn"
                    >
                      {isExpanded ? t.showLess : t.showMore}
                    </button>
                  )}

                  {/* 여행자 팁 (연한 amber-soft 박스) */}
                  {tip && (
                    <div className="landmarkTipBox">
                      <strong className="landmarkTipLabel">💡 {t.tipLabel}:</strong> {tip}
                    </div>
                  )}
                </div>

                {/* 카드 액션: 「구글맵 길찾기」(primaryButton 작은 크기) + 「할인 티켓 예매」(outlineDark) */}
                <div className="landmarkCardActions">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primaryButton landmarkCardBtn"
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
                    >
                      <span>🎟️</span>
                      <span>{t.bookTicket}</span>
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* 라이트박스 팝업 확대 모달 (ESC, 바깥 클릭, 닫기 버튼) */}
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

export { SunsetTownMap }
