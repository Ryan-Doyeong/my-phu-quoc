'use client'

import React, { useState } from 'react'
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
  badge: string
  title: string
  subtitle: string
  downloadBtn: string
  viewOriginalBtn: string
  placesHeader: string
  placesSub: string
  openGoogleMaps: string
  bookTicket: string
  tipLabel: string
  aboutLabel: string
  bestTimeLabel: string
  walkLabel: string
  categories: Record<string, string>
}> = {
  en: {
    badge: 'MyPhuQuoc.NET GUIDE',
    title: 'Sunset Town Illustrated Map & Photo Box',
    subtitle: 'High-resolution illustrated guide map featuring the iconic landmarks and walking routes of Sunset Town. Click the photo box to open full resolution viewer or download.',
    downloadBtn: 'Download Map (WebP)',
    viewOriginalBtn: 'Open Photo Box (Zoom)',
    placesHeader: '12 Iconic Landmarks Guide',
    placesSub: 'Explore each landmark matching map pins No. 1 to 12 with insider tips, walking times, and Google Maps directions.',
    openGoogleMaps: 'Google Maps Directions',
    bookTicket: 'Book Discount Tickets',
    tipLabel: 'Traveler Tip',
    aboutLabel: 'About this place',
    bestTimeLabel: 'Best Time',
    walkLabel: 'Walking distance',
    categories: {
      all: 'All Places (12)',
      attraction: 'Landmarks',
      show: 'Shows & Fireworks',
      shopping: 'Night Market',
      transport: 'Transit & Marina',
      beach: 'Beach',
      culture: 'Culture & Ruins',
    },
  },
  ko: {
    badge: 'MyPhuQuoc.NET 공식 안내',
    title: '선셋타운 전체 안내 지도 포토 박스',
    subtitle: '선셋타운의 주요 거리와 12대 핵심 명소를 담은 고해상도 인포그래픽 지도입니다. 포토 박스를 클릭하면 고화질 라이트박스 뷰어로 시원하게 확대해 보실 수 있으며, 각 명소 카드의 구글맵 링크로 실시간 길찾기를 확인하세요.',
    downloadBtn: '고화질 지도 다운로드 (WebP)',
    viewOriginalBtn: '포토 박스 크게 보기',
    placesHeader: '선셋타운 12대 핵심 명소 상세 가이드',
    placesSub: '지도 번호(No. 1 ~ 12)와 일치하는 각 명소의 상세 설명, 여행자 꿀팁, 도보 거리 및 구글맵 바로가기입니다.',
    openGoogleMaps: 'Google Maps 길찾기',
    bookTicket: '할인가 티켓 예매',
    tipLabel: '여행자 추천 꿀팁',
    aboutLabel: '명소 소개',
    bestTimeLabel: '추천 시간',
    walkLabel: '도보 거리',
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
    badge: 'MyPhuQuoc.NET 导览',
    title: '日落小镇全景导览图画廊',
    subtitle: '展示日落小镇主要街道网络与12大核心地标的高清手绘地图。点击照片框可大图缩放查看，点击各景点卡片中的谷歌地图链接可一键导航。',
    downloadBtn: '下载高清地图 (WebP)',
    viewOriginalBtn: '画廊放大查看',
    placesHeader: '日落小镇12大核心地标详细指南',
    placesSub: '探索地图对应序号(No. 1 ~ 12)景点的详细介绍、游玩建议、步行时间与一键导航。',
    openGoogleMaps: '谷歌地图导航 (Google Maps)',
    bookTicket: '优惠门票预订',
    tipLabel: '游玩实用贴士',
    aboutLabel: '景点介绍',
    bestTimeLabel: '推荐时段',
    walkLabel: '步行距离',
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
    badge: 'MyPhuQuoc.NET ガイド',
    title: 'サンセットタウン イラスト案内マップ (フォトボックス)',
    subtitle: 'サンセットタウンの主要ストリートと12大名所を網羅した高解像度マップです。フォトボックスをクリックすると全画面で拡大表示できます。',
    downloadBtn: '高画質マップをダウンロード (WebP)',
    viewOriginalBtn: 'フォトボックスを拡大表示',
    placesHeader: 'サンセットタウン 12大名所詳細ガイド',
    placesSub: 'マップ番号(No. 1〜12)に対応する各名所の見どころ、旅行者のヒント、徒歩時間、Googleマップ案内です。',
    openGoogleMaps: 'Google Mapsでルート案内',
    bookTicket: '割引チケットを予約',
    tipLabel: '旅のヒント',
    aboutLabel: 'スポット概要',
    bestTimeLabel: 'おすすめ時間',
    walkLabel: '徒歩目安',
    categories: {
      all: 'すべて表示 (12)',
      attraction: '主要ランドマーク',
      show: 'ショー＆花火',
      shopping: '夜市＆ショッピング',
      transport: 'ロープウェイ＆港',
      beach: 'ビーチ',
      culture: 'アート＆遺跡',
    },
  },
  ru: {
    badge: 'ПУТЕВОДИТЕЛЬ MyPhuQuoc.NET',
    title: 'Иллюстрированная карта Сансет-Тауна (Фото-бокс)',
    subtitle: 'Высококачественная иллюстрированная карта Сансет-Тауна с 12 главными достопримечательностями. Нажмите на фото-бокс для просмотра в полном размере.',
    downloadBtn: 'Скачать карту (WebP)',
    viewOriginalBtn: 'Открыть фото-бокс',
    placesHeader: '12 главных достопримечательностей',
    placesSub: 'Подробная информация о точках No. 1–12 с советами для путешественников и навигацией Google Maps.',
    openGoogleMaps: 'Маршрут в Google Maps',
    bookTicket: 'Купить билеты со скидкой',
    tipLabel: 'Совет путешественнику',
    aboutLabel: 'О месте',
    bestTimeLabel: 'Лучшее время',
    walkLabel: 'Пешком',
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
    badge: 'MyPhuQuoc.NET गाइड',
    title: 'सनसेट टाउन सचित्र नक्शा (फोटो बॉक्स)',
    subtitle: 'सनसेट टाउन के 12 प्रमुख स्थलों को दर्शाने वाला सचित्र गाइड नक्शा। बड़ा करके देखने के लिए फोटो बॉक्स पर क्लिक करें।',
    downloadBtn: 'नक्शा डाउनलोड करें (WebP)',
    viewOriginalBtn: 'फोटो बॉक्स बड़ा करें',
    placesHeader: '12 प्रमुख दर्शनीय स्थल गाइड',
    placesSub: 'मानचित्र संख्या 1 से 12 के अनुरूप प्रत्येक स्थल का विवरण, सुझाव और गूगल मैप्स दिशा-निर्देश।',
    openGoogleMaps: 'Google Maps दिशा-निर्देश',
    bookTicket: 'रियायती टिकट बुक करें',
    tipLabel: 'यात्री सुझाव',
    aboutLabel: 'स्थान के बारे में',
    bestTimeLabel: 'सर्वोत्तम समय',
    walkLabel: 'पैदल दूरी',
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
    badge: 'CẨM NANG MyPhuQuoc.NET',
    title: 'Bản đồ minh họa Thị trấn Hoàng Hôn (Photo Box)',
    subtitle: 'Bản đồ minh họa độ phân giải cao giới thiệu các tuyến đường chính và 12 điểm đến nổi bật tại Sunset Town. Bấm vào khung ảnh để phóng to hoặc tải về bản đồ gốc.',
    downloadBtn: 'Tải bản đồ gốc (WebP)',
    viewOriginalBtn: 'Phóng to khung ảnh (Photo Box)',
    placesHeader: 'Cẩm nang chi tiết 12 điểm đến biểu tượng',
    placesSub: 'Khám phá từng địa danh tương ứng số 1 đến 12 trên bản đồ cùng mẹo du lịch, thời gian đi bộ và chỉ đường Google Maps.',
    openGoogleMaps: 'Chỉ đường qua Google Maps',
    bookTicket: 'Đặt vé ưu đãi trực tuyến',
    tipLabel: 'Mẹo du lịch hữu ích',
    aboutLabel: 'Giới thiệu điểm đến',
    bestTimeLabel: 'Thời gian lý tưởng',
    walkLabel: 'Khoảng cách đi bộ',
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

  // 언어별 지도 이미지 가져오기 (.webp 우선)
  const mapImage = getSunsetMapImage(locale)

  // 다국어 라벨 사전
  const t = UI_TEXTS[loc] || UI_TEXTS.en

  // 필터링된 랜드마크 목록
  const filteredLandmarks = SUNSET_LANDMARKS.filter((lm) => {
    if (selectedCategory === 'all') return true
    return lm.category === selectedCategory
  })

  return (
    <div className="sunsetTownMapWrapper" style={{ width: '100%' }}>
      {/* 1. 포토 박스 (Photo Box) - 화면 전체를 뒤덮지 않는 단정한 갤러리 카드 */}
      <div className="mapPhotoboxSection">
        <div className="mapPhotoboxLayout">
          {/* 포토 박스 액자 */}
          <div>
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="mapFrameCard"
              title={t.viewOriginalBtn}
            >
              <Image
                src={mapImage.webp}
                alt={t.title}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 600px"
              />
              <div className="mapFrameOverlay">
                <div className="mapFrameButton">
                  <span>🔍</span>
                  <span>{t.viewOriginalBtn}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#7D9D9F' }}>
              💡 {loc === 'ko' ? '지도를 클릭하면 팝업 뷰어로 크게 확대해 볼 수 있습니다.' : 'Click to open full high-resolution map viewer.'}
            </div>
          </div>

          {/* 포토 박스 안내 정보 */}
          <div className="mapInfoPanel">
            <div>
              <div className="mapPhotoboxBadge">
                <span>🗺️</span>
                <span>{t.badge}</span>
              </div>
              <h3>{t.title}</h3>
            </div>
            <p>{t.subtitle}</p>

            <div className="mapActionButtons">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="mapBtnPrimary"
              >
                <span>🔍</span>
                <span>{t.viewOriginalBtn}</span>
              </button>
              <a
                href={mapImage.webp}
                download={mapImage.filename}
                className="mapBtnSecondary"
              >
                <span>📥</span>
                <span>{t.downloadBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. 12대 랜드마크 가이드 섹션 */}
        <div className="landmarksHeader">
          <div>
            <h3>{t.placesHeader}</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#527982' }}>{t.placesSub}</p>
          </div>

          {/* 카테고리 필터 버튼 */}
          <div className="landmarksFilters">
            {[
              { key: 'all' },
              { key: 'attraction' },
              { key: 'show' },
              { key: 'shopping' },
              { key: 'transport' },
              { key: 'beach' },
              { key: 'culture' },
            ].map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`landmarkFilterBtn ${selectedCategory === cat.key ? 'active' : ''}`}
              >
                {t.categories[cat.key]}
              </button>
            ))}
          </div>
        </div>

        {/* 12대 명소 그리드 */}
        <div className="landmarksGrid">
          {filteredLandmarks.map((lm: MapLandmark) => {
            const name = lm.name[locale] || lm.name.en || lm.name.ko
            const desc = lm.description[locale] || lm.description.en || lm.description.ko
            const tip = lm.tips[locale] || lm.tips.en || lm.tips.ko
            const mapUrl =
              lm.lat && lm.lng
                ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}`
                : lm.googleMapsUrl

            return (
              <article key={lm.id} className="landmarkCard">
                <div>
                  <div className="landmarkCardTop">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="landmarkNumBadge">{lm.number}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#7D9D9F' }}>
                        SPOT {String(lm.number).padStart(2, '0')}
                      </span>
                    </div>
                    {lm.walkingDistance && lm.walkingTime && (
                      <span className="landmarkWalkTag">
                        🚶 {lm.walkingDistance} · {lm.walkingTime}
                      </span>
                    )}
                  </div>

                  <h4 className="landmarkName">{name}</h4>
                  <div className="landmarkAddress">📍 {lm.address}</div>
                  <p className="landmarkDesc">{desc}</p>

                  {tip && (
                    <div className="landmarkTip">
                      <strong>💡 {t.tipLabel}:</strong> {tip}
                    </div>
                  )}
                </div>

                <div className="landmarkCardFooter">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="landmarkMapsLink"
                  >
                    🗺️ {t.openGoogleMaps}
                  </a>
                  {lm.ticketUrl && (
                    <a
                      href={lm.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="landmarkTicketLink"
                    >
                      🎟️ {t.bookTicket}
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* 라이트박스 팝업 모달 */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <a
                  href={mapImage.webp}
                  download={mapImage.filename}
                  className="mapBtnPrimary"
                  style={{ padding: '6px 14px', fontSize: 12 }}
                >
                  📥 {t.downloadBtn}
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
