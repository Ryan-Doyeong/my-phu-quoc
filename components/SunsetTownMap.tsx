'use client'

import React from 'react'
import Image from 'next/image'
import { SUNSET_LANDMARKS, type MapLandmark } from '@/lib/sunsetMapData'
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

  // 다국어 라벨
  const t = {
    badge: isKo ? '선그룹 공식 선셋타운 지도' : 'SUN GROUP OFFICIAL MAP',
    title: isKo
      ? '선셋타운 전체 안내 지도'
      : 'Sunset Town Official Illustrated Map',
    subtitle: isKo
      ? '선그룹 공식 선셋타운 일러스트 지도입니다. 고화질 지도를 다운로드하여 편리하게 확대해 보실 수 있으며, 아래 명소 목록에서 구글맵으로 정확한 위치를 바로 확인하실 수 있습니다.'
      : 'Official illustrated map of Sunset Town by Sun Group. Download the high-resolution map to zoom in freely, or use Google Maps below for exact landmark navigation.',
    downloadBtn: isKo ? '고화질 지도 다운로드 (JPG)' : 'Download High-Res Map (JPG)',
    viewOriginalBtn: isKo ? '새 창에서 원본 보기' : 'View Full Image',
    placesHeader: isKo ? '선셋타운 12대 핵심 명소 (구글맵 연결)' : '12 Iconic Attractions & Google Maps',
    placesSub: isKo
      ? '각 명소의 위치와 길찾기는 구글맵 버튼을 클릭하여 확인하세요.'
      : 'Click Google Maps button on any attraction to open instant directions.',
    openGoogleMaps: isKo ? 'Google Maps에서 위치 보기' : 'Open in Google Maps',
    bookTicket: isKo ? '공식 티켓 예매' : 'Book Official Tickets',
    bestTime: isKo ? '추천 시간' : 'Best Time',
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. 지도 영역 카드 */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden">
        {/* 상단 타이틀 & 다운로드 바 */}
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

          {/* 다운로드 & 원본 보기 액션 버튼 */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/map/sunset-town-official-map.jpg"
              download="Sunset-Town-Official-Map.jpg"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
            >
              <span>📥</span>
              <span>{t.downloadBtn}</span>
            </a>
            <a
              href="/map/sunset-town-official-map.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              <span>🔍</span>
              <span>{t.viewOriginalBtn}</span>
            </a>
          </div>
        </div>

        {/* 고정 지도 이미지 뷰어 (복잡한 오버레이 선 제거, 순수 공식 일러스트 렌더링) */}
        <div className="mt-6 w-full flex justify-center bg-slate-950/60 rounded-2xl p-2 sm:p-4 border border-slate-800/80">
          <div className="relative w-full max-w-4xl aspect-[2000/2914] rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            <Image
              src="/map/sunset-town-official-map.webp"
              alt={isKo ? '선그룹 공식 선셋타운 일러스트 지도' : 'Sun Group Sunset Town Official Map'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* 2. 구체적인 관광 명소 12선 카드 그리드 (구글맵 직결) */}
      <div className="w-full">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.placesHeader}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.placesSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUNSET_LANDMARKS.map((lm: MapLandmark) => {
            const name = lm.name[locale] || lm.name.en || lm.name.ko
            const desc = lm.description[locale] || lm.description.en || lm.description.ko
            // 구글맵 길찾기/위치 URL (정확한 좌표 우선)
            const mapUrl = lm.lat && lm.lng
              ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}`
              : lm.googleMapsUrl

            return (
              <div
                key={lm.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* 명소 대표 사진 */}
                  <div className="relative w-full h-48 bg-slate-100">
                    <Image
                      src={lm.image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-lg text-xs shadow-md">
                      No. {lm.number}
                    </div>
                  </div>

                  {/* 텍스트 내용 */}
                  <div className="p-4 sm:p-5">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {name}
                    </h4>
                    <p className="text-xs text-amber-700 font-medium mt-1">
                      📍 {lm.address}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>

                    {lm.bestTime && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs">
                        <span>⏰</span>
                        <span>{t.bestTime}: {lm.bestTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 하단 액션 버튼 (Google Maps 및 티켓 예매) */}
                <div className="p-4 sm:p-5 pt-0 flex flex-col gap-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <span>🧭</span>
                    <span>{t.openGoogleMaps}</span>
                  </a>

                  {lm.ticketUrl && (
                    <a
                      href={lm.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                    >
                      <span>🎟️</span>
                      <span>{t.bookTicket}</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { SunsetTownMap }
