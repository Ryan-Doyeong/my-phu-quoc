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

export default function SunsetTownMap({ locale }: Props) {
  const loc = (locale as string) || 'ko'
  const isKo = loc === 'ko'
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // 언어별 지도 이미지 가져오기 (현재 제공된 영어 지도 기본 매핑)
  const mapImage = getSunsetMapImage(locale)

  // 다국어 라벨 사전
  const t = {
    badge: isKo ? 'MyPhuQuoc.NET 공식 안내' : 'MyPhuQuoc.NET OFFICIAL GUIDE',
    title: isKo
      ? '선셋타운 전체 안내 지도 (Sunset Town Map)'
      : 'Sunset Town Official Illustrated Map',
    subtitle: isKo
      ? '선셋타운의 주요 거리와 12대 핵심 명소를 담은 고해상도 인포그래픽 지도입니다. 아래 다운로드 버튼을 통해 고화질 원본을 저장하여 확대해 보실 수 있으며, 각 명소 카드의 구글맵 링크로 실시간 위치와 길찾기를 확인하세요.'
      : 'High-resolution illustrated guide map featuring the iconic landmarks and walking routes of Sunset Town. Download the full image to zoom in, or use Google Maps links below for instant navigation.',
    downloadBtn: isKo ? '고화질 지도 다운로드 (JPG)' : 'Download Full Map (JPG)',
    viewOriginalBtn: isKo ? '새 창에서 원본 크게 보기' : 'Open Full Image',
    placesHeader: isKo ? '선셋타운 12대 핵심 명소 상세 가이드' : '12 Iconic Landmarks Guide',
    placesSub: isKo
      ? '지도 번호(No. 1 ~ 12)와 일치하는 각 명소의 상세 설명, 여행자 꿀팁, 도보 거리 및 구글맵 바로가기입니다.'
      : 'Explore each landmark matching map pins No. 1 to 12 with insider tips, walking times, and Google Maps directions.',
    openGoogleMaps: isKo ? 'Google Maps 길찾기' : 'Get Directions (Google Maps)',
    bookTicket: isKo ? '공식 티켓 할인가 예매' : 'Book Discount Tickets',
    tipLabel: isKo ? '여행자 추천 꿀팁' : 'Traveler Tip',
    aboutLabel: isKo ? '명소 소개' : 'About this place',
    bestTimeLabel: isKo ? '추천 시간' : 'Best Time',
    walkLabel: isKo ? '도보 거리' : 'Walking distance',
    categories: {
      all: isKo ? '전체 보기 (12)' : 'All Places (12)',
      attraction: isKo ? '핵심 명소' : 'Landmarks',
      show: isKo ? '공연 & 불꽃쇼' : 'Shows & Fireworks',
      shopping: isKo ? '야시장 & 쇼핑' : 'Night Market',
      transport: isKo ? '케이블카 & 마리나' : 'Transit & Marina',
      beach: isKo ? '해변 & 비치' : 'Beach',
      culture: isKo ? '예술 & 역사' : 'Culture & Ruins',
    },
  }

  // 필터링된 랜드마크 목록
  const filteredLandmarks = SUNSET_LANDMARKS.filter((lm) => {
    if (selectedCategory === 'all') return true
    return lm.category === selectedCategory
  })

  return (
    <div className="w-full flex flex-col gap-10">
      {/* 1. 지도 뷰어 카드 (사용자 제공 인포그래픽 지도 렌더링) */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden">
        {/* 헤더 및 다운로드 액션 바 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
              <span>🗺️</span>
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* 다운로드 & 새 창에서 크게 보기 버튼 */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mapImage.jpg}
              download={mapImage.filename}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
            >
              <span>📥</span>
              <span>{t.downloadBtn}</span>
            </a>
            <a
              href={mapImage.jpg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              <span>🔍</span>
              <span>{t.viewOriginalBtn}</span>
            </a>
          </div>
        </div>

        {/* 지도 이미지 액자 (고화질 고정형 인포그래픽 뷰) */}
        <div className="mt-6 w-full flex justify-center bg-slate-950/70 rounded-2xl p-2 sm:p-5 border border-slate-800/90">
          <div className="relative w-full max-w-3xl aspect-[1039/1514] rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
            <Image
              src={mapImage.webp}
              alt={t.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* 2. 각 장소 소개 - 세련된 텍스트 박스 형태 구분 (Styled Cards) */}
      <div className="w-full">
        {/* 섹션 타이틀 & 카테고리 필터 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🏛️</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.placesHeader}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              {t.placesSub}
            </p>
          </div>

          {/* 카테고리 빠른 필터 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {(t.categories as Record<string, string>)[cat.key]}
              </button>
            ))}
          </div>
        </div>

        {/* 12대 명소 예쁜 텍스트 박스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLandmarks.map((lm: MapLandmark) => {
            const name = lm.name[locale] || lm.name.en || lm.name.ko
            const desc = lm.description[locale] || lm.description.en || lm.description.ko
            const tip = lm.tips[locale] || lm.tips.en || lm.tips.ko
            const mapUrl =
              lm.lat && lm.lng
                ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}`
                : lm.googleMapsUrl

            return (
              <article
                key={lm.id}
                className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* 상단 컬러풀 인포 바 */}
                <div className="p-5 sm:p-6 pb-0">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    {/* 번호 뱃지 */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 text-amber-400 font-black text-sm shadow-md">
                        {lm.number}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        SPOT {String(lm.number).padStart(2, '0')}
                      </span>
                    </div>

                    {/* 도보 거리 및 소요 시간 태그 */}
                    {lm.walkingDistance && lm.walkingTime && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                        <span>🚶</span>
                        <span>{lm.walkingDistance} · {lm.walkingTime}</span>
                      </span>
                    )}
                  </div>

                  {/* 장소 이름 헤더 */}
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug group-hover:text-amber-800 transition-colors">
                    {name}
                  </h4>
                  <p className="text-xs font-medium text-amber-700 mt-1 flex items-center gap-1">
                    <span>📍</span>
                    <span className="truncate">{lm.address}</span>
                  </p>

                  {/* 1. 소개 텍스트 박스 (About Box) */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1.5 text-xs">
                      <span>📖</span>
                      <span>{t.aboutLabel}</span>
                    </div>
                    <p>{desc}</p>
                  </div>

                  {/* 2. 꿀팁 텍스트 박스 (Traveler Tip Box) */}
                  {tip && (
                    <div className="mt-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-center gap-1.5 font-black text-amber-900 mb-1.5 text-xs">
                        <span>💡</span>
                        <span>{t.tipLabel}</span>
                      </div>
                      <p className="text-amber-900/90">{tip}</p>
                    </div>
                  )}

                  {/* 메타 정보 칩 (추천 시간대, 운영시간) */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    {lm.bestTime && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                        <span>⏰</span>
                        <span>{t.bestTimeLabel}: {lm.bestTime}</span>
                      </div>
                    )}
                    {lm.operatingHours && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                        <span>🕒</span>
                        <span>{lm.operatingHours}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 하단 액션 버튼 그룹 */}
                <div className="p-5 sm:p-6 pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <span>🧭</span>
                    <span>{t.openGoogleMaps}</span>
                  </a>

                  {lm.ticketUrl && (
                    <a
                      href={lm.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all transform active:scale-95"
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
    </div>
  )
}

export { SunsetTownMap }
