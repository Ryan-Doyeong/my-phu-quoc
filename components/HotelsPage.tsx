'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SiteFooter } from '@/components/SiteFooter'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryLabel } from '@/lib/directory'
import { HOTEL_TRANSLATIONS, type HotelUiDictionary } from '@/lib/i18n/hotelTranslations'
import type { HotelItem, HotelArea } from '@/lib/hotels'
import '@/app/hotels/hotels.css'

interface HotelsPageProps {
  hotels: HotelItem[]
  locale?: Locale
  initialArea?: HotelArea
}

function getLocalizedSummary(hotel: HotelItem, locale?: Locale): string {
  if (locale === 'en' && hotel.summary_en) return hotel.summary_en
  if (locale === 'zh' && hotel.summary_zh) return hotel.summary_zh
  if (locale === 'ja' && hotel.summary_ja) return hotel.summary_ja
  if (locale === 'ru' && hotel.summary_ru) return hotel.summary_ru
  if (locale === 'vi' && hotel.summary_vi) return hotel.summary_vi
  return hotel.summary
}

function getKhemDistanceBadge(hotel: HotelItem, t: HotelUiDictionary): string {
  const baseBadge = t.khemDistanceBadge
  const mins = hotel.driveMinutesToSunsetTown != null ? String(hotel.driveMinutesToSunsetTown).replace('분', '') : '10'
  if (mins !== '10') {
    return baseBadge.replace('10', mins)
  }
  return baseBadge
}

function formatReviewLabel(count: number, locale?: Locale): string {
  if (locale === 'en') return `${count.toLocaleString()} reviews`
  if (locale === 'zh') return `${count.toLocaleString()}条评价`
  if (locale === 'ja') return `${count.toLocaleString()}件のレビュー`
  if (locale === 'ru') return `${count.toLocaleString()} отзывов`
  if (locale === 'hi') return `${count.toLocaleString()} समीक्षाएं`
  if (locale === 'vi') return `${count.toLocaleString()} đánh giá`
  return `후기 ${count.toLocaleString()}건`
}

/* =========================================================================
   1. Unified Hotel Card Component (공통 호텔 카드 컴포넌트)
   - 모든 호텔(선셋타운 27곳 + 켐 비치 7곳)이 일관된 공통 컴포넌트 구조
   - 차이점:
     - 탑 그레이드(라 페스타): '탑 그레이드' + '마이 푸꾸옥 추천 호텔' 배지 2개 노출
     - 추천 호텔(더 룸 호텔): '마이 푸꾸옥 추천 호텔' 배지 1개 노출
     - 공식 5성급: '5성급' 배지 노출 (미확인 성급은 비노출)
     - 켐 비치: '선셋타운 차량 15분' 배지 (케이블카 배지와 분리)
   ========================================================================= */
interface HotelCardProps {
  hotel: HotelItem
  t: HotelUiDictionary
  locale?: Locale
  isFeatured?: boolean
  isTopGrade?: boolean
  onOpenModal: (hotel: HotelItem) => void
}

function HotelCard({ hotel, t, locale, isFeatured = false, isTopGrade = false, onOpenModal }: HotelCardProps) {
  const summaryText = getLocalizedSummary(hotel, locale)
  const isKhem = hotel.area === 'khem-beach'
  const isLuxuryResort = isKhem && (hotel.officialStar === 5 || ['jw-marriott-phu-quoc-emerald-bay', 'premier-village-phu-quoc-resort', 'premier-residences-phu-quoc-emerald-bay', 'new-world-phu-quoc-resort'].includes(hotel.slug))
  const isRecommendedResort = isKhem && (hotel.slug === 'jw-marriott-phu-quoc-emerald-bay' || hotel.tier === 'recommended')

  return (
    <div className={`hotelCard ${isTopGrade ? 'hotelCardTopGrade' : ''} ${(isFeatured || isRecommendedResort) && !isTopGrade ? 'hotelCardFeatured' : ''}`}>
      {/* Featured Header Badges */}
      {(isTopGrade || isFeatured || isRecommendedResort) && (
        <div className="cardFeaturedHeader">
          {isTopGrade && (
            <span className="topGradeBadge">
              🏆 {t.badgeTopGrade}
            </span>
          )}
          {isRecommendedResort ? (
            <span className="featuredBadge">
              👑 {t.recommendedResortBadge}
            </span>
          ) : isFeatured ? (
            <span className="featuredBadge">
              👑 {t.featuredBadge}
            </span>
          ) : null}
        </div>
      )}

      {/* 1. 대표 사진 1장 (아고다 출처 표기) */}
      <div className="cardImageWrap">
        <img
          src={hotel.photos[0] || '/images/default-hotel.jpg'}
          alt={hotel.name_ko}
          loading={isTopGrade || isFeatured ? 'eager' : 'lazy'}
        />
        {/* 공식 5성급 확인된 호텔만 5성급 표기, 켐 비치 4곳은 '5성 특급 리조트', 더 룸 호텔은 부티크 호텔, 기타 미확인 성급은 숨김 */}
        {isLuxuryResort ? (
          <div className="cardStarBadge luxuryResortStarBadge">
            ⭐ {t.luxuryResortBadge}
          </div>
        ) : hotel.officialStar === 5 ? (
          <div className="cardStarBadge">
            {t.fiveStar}
          </div>
        ) : hotel.slug === 'the-room-hotel' || hotel.tier === 'recommended' ? (
          <div className="cardStarBadge">
            {t.boutiqueHotel}
          </div>
        ) : null}
        <a
          href={hotel.agodaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="photoSourceTag"
          title="Agoda 페이지에서 보기"
        >
          <span>{t.photoSource} ↗</span>
        </a>
      </div>

      {/* 2. 카드 본문 */}
      <div className="cardBody">
        {/* 평점, 후기 수, 이동 거리 */}
        <div className="cardMetaRow">
          <div className="cardRatingBox">
            <span className="cardScore">{hotel.rating.toFixed(1)} ★</span>
            <span className="cardReviews">({formatReviewLabel(hotel.reviewsCount, locale)})</span>
            {hotel.googleRating && (
              <span className="googleScoreBadge">구글맵 {hotel.googleRating.toFixed(1)} ★ ({hotel.googleReviewsCount || 18})</span>
            )}
          </div>
          {isKhem ? (
            <span className="khemDistBadge">🚗 {getKhemDistanceBadge(hotel, t)}</span>
          ) : (
            <span className="cableBadge">🚡 {hotel.cable_m}m</span>
          )}
        </div>

        {/* 호텔명 (한글 / 영문) */}
        <h3 className="cardTitle">{hotel.name_ko}</h3>
        <div className="cardTitleEn">{hotel.name_en}</div>

        {/* 위치·전망 핵심 한 줄 (데이터 있는 호텔만 노출) */}
        {hotel.insight && (hotel.insight.location || hotel.insight.view) && (
          <div className="cardInsightLine">
            {hotel.insight.location && (
              <div className="cardInsightItem">
                <span className="insightIcon">📍</span>
                <span className="insightText">{hotel.insight.location}</span>
              </div>
            )}
            {hotel.insight.view && (
              <div className="cardInsightItem">
                <span className="insightIcon">🌅</span>
                <span className="insightText">{hotel.insight.view}</span>
              </div>
            )}
          </div>
        )}

        {/* 한 줄 요약 (최대 40자) */}
        {summaryText && (
          <p className="cardSummary">
            {summaryText.length > 40 ? `${summaryText.slice(0, 39)}…` : summaryText}
          </p>
        )}

        {/* 고객 리뷰 핵심 한 줄 */}
        {hotel.reviewHighlight && (
          <div className={`cardReviewHighlight ${isFeatured || isTopGrade ? 'featuredReviewHighlight' : ''}`}>
            <span className="reviewHighlightIcon">💬</span>
            <span className="reviewHighlightText">{hotel.reviewHighlight}</span>
          </div>
        )}

        {/* 시설 아이콘 (최대 4개) */}
        <div className="cardFacilities">
          {hotel.coreFacilities.slice(0, 4).map((f, i) => (
            <span key={i} className="cardFacilityTag">✓ {f}</span>
          ))}
        </div>

        {/* 상세 보기 / 구글맵 / Agoda에서 예약 버튼 */}
        <div className="cardActionRow">
          <button
            type="button"
            className="cardBtnDetail"
            onClick={() => onOpenModal(hotel)}
          >
            {t.viewDetails}
          </button>
          {hotel.googleMapsUrl && (
            <a
              href={hotel.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cardBtnGoogleMaps"
              title={t.viewOnGoogleMaps}
            >
              <span>🗺️</span>
              <span>{t.viewOnGoogleMapsShort}</span>
            </a>
          )}
          <a
            href={hotel.agodaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cardBtnAgoda"
          >
            <span>{t.bookOnAgoda}</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   2. Unified Hotel Detail Modal Component (공통 호텔 상세 모달)
   - 사진 갤러리(펼침) → 고객 후기(펼침) → 한눈에 보는 장단점(펼침) → 객실 요약 → 위치·주변 → 시설·서비스
   ========================================================================= */
interface HotelDetailModalProps {
  hotel: HotelItem
  t: HotelUiDictionary
  locale?: Locale
  onClose: () => void
}

function HotelDetailModal({ hotel, t, locale, onClose }: HotelDetailModalProps) {
  const [modalPhotoIdx, setModalPhotoIdx] = useState(0)
  const summaryText = getLocalizedSummary(hotel, locale)

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gallery: true,
    reviews: true,
    insights: true,
    rooms: false,
    location: false,
    facilities: false,
  })

  // The Room Hotel 구글맵 리뷰 전문 토글
  const [showFullReviews, setShowFullReviews] = useState(false)

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const hasRooms = Boolean(hotel.rooms && hotel.rooms.length > 0)
  const hasFacilities = Boolean(
    (hotel.facilityCategories && hotel.facilityCategories.length > 0) ||
    (hotel.coreFacilities && hotel.coreFacilities.length > 0)
  )

  const insight = hotel.insight
  const hasInsights = Boolean(
    insight && (
      insight.location || insight.view || insight.condition || insight.staff ||
      (insight.pros && insight.pros.length > 0) ||
      (insight.cons && insight.cons.length > 0)
    )
  )

  const isKhem = hotel.area === 'khem-beach'
  const isLuxuryResort = isKhem && (hotel.officialStar === 5 || ['jw-marriott-phu-quoc-emerald-bay', 'premier-village-phu-quoc-resort', 'premier-residences-phu-quoc-emerald-bay', 'new-world-phu-quoc-resort'].includes(hotel.slug))
  const isRecommendedResort = isKhem && (hotel.slug === 'jw-marriott-phu-quoc-emerald-bay' || hotel.tier === 'recommended')

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <button type="button" className="modalCloseBtn" onClick={onClose} aria-label={t.close}>
          ✕
        </button>

        {/* 상단 대표 사진 1장 */}
        <div className="modalTopPhotoWrap">
          <img
            src={hotel.photos[modalPhotoIdx] || hotel.photos[0] || '/images/default-hotel.jpg'}
            alt={hotel.name_ko}
          />
          <div className="modalTopPhotoBadges">
            {isKhem ? (
              <>
                {isRecommendedResort && (
                  <span className="featuredBadge">👑 {t.recommendedResortBadge}</span>
                )}
                {isLuxuryResort && (
                  <span className="cardStarBadge luxuryResortStarBadge">⭐ {t.luxuryResortBadge}</span>
                )}
              </>
            ) : (
              <>
                {hotel.officialStar === 5 && (
                  <span className="cardStarBadge">{t.fiveStar}</span>
                )}
                {hotel.tier === 'top' && (
                  <span className="topGradeBadge">🏆 {t.badgeTopGrade}</span>
                )}
                {(hotel.slug === 'the-room-hotel' || hotel.tier === 'recommended') && (
                  <span className="cardStarBadge">{t.boutiqueHotel}</span>
                )}
              </>
            )}
          </div>
          <a
            href={hotel.agodaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="photoSourceTag"
            title="Agoda 페이지에서 보기"
          >
            <span>{t.photoSource} ↗</span>
          </a>
        </div>

        {/* 모달 본문 */}
        <div className="modalBody">
          {/* 모달 헤더 */}
          <div className="modalHeaderBlock">
            <div className="modalHeaderMeta">
              <div className="modalRating">
                <span className="modalScore">{hotel.rating.toFixed(1)} ★</span>
                <span className="modalScoreDivider" style={{ margin: '0 6px', color: '#cbd5e1' }}>·</span>
                <span className="modalReviews">{formatReviewLabel(hotel.reviewsCount, locale)}</span>
                {hotel.googleRating && (
                  <span className="googleScoreBadge">구글맵 {hotel.googleRating.toFixed(1)} ★ ({hotel.googleReviewsCount || 18})</span>
                )}
              </div>
              {isKhem ? (
                <span className="khemDistBadge" style={{ fontSize: '0.85rem', padding: '4px 10px' }}>
                  🚗 {getKhemDistanceBadge(hotel, t)}
                </span>
              ) : (
                <span className="cableBadge" style={{ fontSize: '0.85rem' }}>
                  🚡 {t.cableCarDistance} {hotel.cable_m}m
                </span>
              )}
            </div>

            <h2 className="modalHotelTitle">{hotel.name_ko}</h2>
            <div className="modalHotelTitleEn">{hotel.name_en}</div>

            {/* 1~2줄 요약 (화면에는 summary만 사용, description 필드 절대 비노출) */}
            {summaryText && (
              <p className="modalShortIntro">{summaryText}</p>
            )}
          </div>

          {/* 6개 아코디언 드롭다운 */}
          <div className="modalAccordionGroup">
            {/* ① 사진 갤러리 */}
            {hotel.photos && hotel.photos.length > 0 && (
              <div className={`accordionItem ${openSections.gallery ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordionHeader"
                  onClick={() => toggleSection('gallery')}
                  aria-expanded={openSections.gallery}
                >
                  <div className="accordionTitle">
                    <span className="accordionIcon">📸</span>
                    <span>{t.accordionGallery}</span>
                    <span className="accordionBadge">{hotel.photos.length}장</span>
                  </div>
                  <span className="accordionChevron">{openSections.gallery ? '▲' : '▼'}</span>
                </button>

                {openSections.gallery && (
                  <div className="accordionBody">
                    <div className="galleryScrollWrap">
                      {hotel.photos.map((src, idx) => (
                        <div
                          key={idx}
                          className={`galleryThumbItem ${modalPhotoIdx === idx ? 'active' : ''}`}
                          onClick={() => setModalPhotoIdx(idx)}
                        >
                          <img src={src} alt={`${hotel.name_ko} ${idx + 1}`} loading="lazy" />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                      <a
                        href={hotel.agodaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.8125rem', color: '#0B7A8A', fontWeight: 600, textDecoration: 'none' }}
                      >
                        Agoda에서 고화질 사진 더보기 ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ② 고객 후기 요약 */}
            <div className={`accordionItem ${openSections.reviews ? 'open' : ''}`}>
              <button
                type="button"
                className="accordionHeader"
                onClick={() => toggleSection('reviews')}
                aria-expanded={openSections.reviews}
              >
                <div className="accordionTitle">
                  <span className="accordionIcon">⭐</span>
                  <span>{t.accordionReviews}</span>
                  <span className="accordionBadge">{hotel.rating.toFixed(1)} / 10</span>
                </div>
                <span className="accordionChevron">{openSections.reviews ? '▲' : '▼'}</span>
              </button>

              {openSections.reviews && (
                <div className="accordionBody">
                  {/* 총평 & 세부 평점 막대 그래프 */}
                  <div className="reviewSummaryTop">
                    <div className="overallScoreBox">
                      <span className="scoreBig">{hotel.rating.toFixed(1)}</span>
                      <span className="scoreTotal">/ 10</span>
                      <div className="scoreCount">{formatReviewLabel(hotel.reviewsCount, locale)} (Agoda)</div>
                    </div>

                    {hotel.subRatings && (
                      <div className="subRatingsList">
                        {hotel.subRatings.cleanliness && (
                          <div className="subRatingRow">
                            <span className="subRatingLabel">{t.subCleanliness}</span>
                            <div className="subRatingBar">
                              <div className="subRatingFill" style={{ width: `${(hotel.subRatings.cleanliness / 10) * 100}%` }} />
                            </div>
                            <span className="subRatingNum">{hotel.subRatings.cleanliness.toFixed(1)}</span>
                          </div>
                        )}
                        {hotel.subRatings.service && (
                          <div className="subRatingRow">
                            <span className="subRatingLabel">{t.subService}</span>
                            <div className="subRatingBar">
                              <div className="subRatingFill" style={{ width: `${(hotel.subRatings.service / 10) * 100}%` }} />
                            </div>
                            <span className="subRatingNum">{hotel.subRatings.service.toFixed(1)}</span>
                          </div>
                        )}
                        {hotel.subRatings.facilities && (
                          <div className="subRatingRow">
                            <span className="subRatingLabel">{t.subFacilities}</span>
                            <div className="subRatingBar">
                              <div className="subRatingFill" style={{ width: `${(hotel.subRatings.facilities / 10) * 100}%` }} />
                            </div>
                            <span className="subRatingNum">{hotel.subRatings.facilities.toFixed(1)}</span>
                          </div>
                        )}
                        {hotel.subRatings.location && (
                          <div className="subRatingRow">
                            <span className="subRatingLabel">{t.subLocation}</span>
                            <div className="subRatingBar">
                              <div className="subRatingFill" style={{ width: `${(hotel.subRatings.location / 10) * 100}%` }} />
                            </div>
                            <span className="subRatingNum">{hotel.subRatings.location.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 투숙객이 자주 언급한 장점 */}
                  {hotel.reviewPros && hotel.reviewPros.length > 0 && (
                    <div className="reviewProsBox">
                      <div className="reviewProsTitle">👍 {t.prosTitle}</div>
                      <div className="reviewProsTags">
                        {hotel.reviewPros.map((pro, idx) => (
                          <span key={idx} className="reviewProTag">✓ {pro}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 대표 투숙객 한 줄 평 */}
                  {hotel.reviewQuote && (
                    <div className="reviewQuoteCard">
                      <div className="reviewQuoteIcon">“</div>
                      <div className="reviewQuoteText">{hotel.reviewQuote.text}</div>
                      <div className="reviewQuoteSource">- {hotel.reviewQuote.source}</div>
                    </div>
                  )}

                  {/* The Room Hotel 전용: 구글맵 리뷰 전문 토글 */}
                  {hotel.googleReviews && hotel.googleReviews.length > 0 && (
                    <div className="googleReviewsDropdownWrap">
                      <button
                        type="button"
                        className="btnToggleGoogleReviews"
                        onClick={() => setShowFullReviews(!showFullReviews)}
                      >
                        <span>📝 {showFullReviews ? t.collapseReviews : `${t.viewFullReviews} (${hotel.googleReviews.length}건)`}</span>
                        <span>{showFullReviews ? '▲' : '▼'}</span>
                      </button>

                      {showFullReviews && (
                        <div className="googleReviewsFullList">
                          {hotel.googleReviews.map((rev, idx) => (
                            <div key={idx} className="googleReviewItem">
                              <div className="googleReviewHeader">
                                <span className="googleReviewAuthor">{rev.author}</span>
                                <span className="googleReviewStars">{'★'.repeat(rev.rating || 5)}</span>
                              </div>
                              <p className="googleReviewText">{rev.text}</p>
                              <span className="googleReviewSourceTag">{rev.source}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ③ 한눈에 보는 장단점 */}
            {hasInsights && insight && (
              <div className={`accordionItem ${openSections.insights ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordionHeader"
                  onClick={() => toggleSection('insights')}
                  aria-expanded={openSections.insights}
                >
                  <div className="accordionTitle">
                    <span className="accordionIcon">⚖️</span>
                    <span>{t.accordionInsights}</span>
                  </div>
                  <span className="accordionChevron">{openSections.insights ? '▲' : '▼'}</span>
                </button>

                {openSections.insights && (
                  <div className="accordionBody">
                    <div className="insightsSummaryBox">
                      <div className="insightsGrid">
                        {insight.location && (
                          <div className="insightItemCard">
                            <div className="insightItemLabel">
                              <span>📍</span>
                              <span>{t.insightLocation}</span>
                            </div>
                            <div className="insightItemValue">{insight.location}</div>
                          </div>
                        )}
                        {insight.view && (
                          <div className="insightItemCard">
                            <div className="insightItemLabel">
                              <span>🌅</span>
                              <span>{t.insightView}</span>
                            </div>
                            <div className="insightItemValue">{insight.view}</div>
                          </div>
                        )}
                        {insight.condition && (
                          <div className="insightItemCard">
                            <div className="insightItemLabel">
                              <span>✨</span>
                              <span>{t.insightCondition}</span>
                            </div>
                            <div className="insightItemValue">{insight.condition}</div>
                          </div>
                        )}
                        {insight.staff && (
                          <div className="insightItemCard">
                            <div className="insightItemLabel">
                              <span>🛎️</span>
                              <span>{t.insightStaff}</span>
                            </div>
                            <div className="insightItemValue">{insight.staff}</div>
                          </div>
                        )}
                      </div>

                      {(insight.pros?.length || insight.cons?.length) ? (
                        <div className="prosConsWrap" style={{ marginTop: '16px' }}>
                          {insight.pros && insight.pros.length > 0 && (
                            <div className="prosBox">
                              <div className="prosBoxTitle">👍 {t.prosLabel}</div>
                              <ul className="prosListItems">
                                {insight.pros.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {insight.cons && insight.cons.length > 0 && (
                            <div className="consBox">
                              <div className="consBoxTitle">💡 {t.consLabel}</div>
                              <ul className="consListItems">
                                {insight.cons.map((c, idx) => (
                                  <li key={idx}>{c}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ④ 객실 요약 */}
            {hasRooms && (
              <div className={`accordionItem ${openSections.rooms ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordionHeader"
                  onClick={() => toggleSection('rooms')}
                  aria-expanded={openSections.rooms}
                >
                  <div className="accordionTitle">
                    <span className="accordionIcon">🛏️</span>
                    <span>{t.accordionRooms}</span>
                    <span className="accordionBadge">{hotel.rooms!.length}종</span>
                  </div>
                  <span className="accordionChevron">{openSections.rooms ? '▲' : '▼'}</span>
                </button>

                {openSections.rooms && (
                  <div className="accordionBody">
                    <div className="roomsTableWrap">
                      <table className="roomsTable">
                        <thead>
                          <tr>
                            <th>{t.roomName}</th>
                            <th>{t.roomSize}</th>
                            <th>{t.roomBed}</th>
                            <th>{t.roomView}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hotel.rooms!.map((room, idx) => (
                            <tr key={idx}>
                              <td className="roomNameHighlight">{room.name}</td>
                              <td>{room.size || '-'}</td>
                              <td>{room.bed || '-'}</td>
                              <td>{room.view || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '0.8125rem', color: '#64748b' }}>
                      ※ {t.roomCheckAgoda}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ⑤ 위치·주변 */}
            <div className={`accordionItem ${openSections.location ? 'open' : ''}`}>
              <button
                type="button"
                className="accordionHeader"
                onClick={() => toggleSection('location')}
                aria-expanded={openSections.location}
              >
                <div className="accordionTitle">
                  <span className="accordionIcon">📍</span>
                  <span>{t.accordionLocation}</span>
                </div>
                <span className="accordionChevron">{openSections.location ? '▲' : '▼'}</span>
              </button>

              {openSections.location && (
                <div className="accordionBody">
                  <div className="locationDetailsBox">
                    <div style={{ marginBottom: '8px' }}>
                      <strong>📍 {t.accordionLocation}:</strong> {hotel.address}
                    </div>
                    {isKhem ? (
                      <div style={{ marginBottom: '8px' }}>
                        <strong>🚗 {t.travelToSunsetTown}:</strong> {t.khemDistanceBadge} (약 6.5km)
                      </div>
                    ) : (
                      <div style={{ marginBottom: '8px' }}>
                        <strong>🚡 {t.cableCarStationDistance}:</strong> {hotel.cable_m}m
                      </div>
                    )}
                    <div style={{ marginBottom: '12px', color: '#0f172a', fontWeight: 600 }}>
                      🕒 {t.checkIn} {hotel.checkIn || '14:00'} · {t.checkOut} {hotel.checkOut || '12:00'}
                    </div>
                    {hotel.landmarks && hotel.landmarks.length > 0 && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                        <div style={{ fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                          {t.landmarksTitle}
                        </div>
                        <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                          {hotel.landmarks.slice(0, 4).map((lm, idx) => (
                            <li key={idx}>{lm.name}: {lm.distance}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 구글맵에서 위치 보기 버튼 */}
                    {hotel.googleMapsUrl && (
                      <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <a
                          href={hotel.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btnGoogleMapsLocation"
                        >
                          <span>🗺️</span>
                          <span>{t.viewOnGoogleMaps}</span>
                          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ⑥ 시설·서비스 */}
            {hasFacilities && (
              <div className={`accordionItem ${openSections.facilities ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordionHeader"
                  onClick={() => toggleSection('facilities')}
                  aria-expanded={openSections.facilities}
                >
                  <div className="accordionTitle">
                    <span className="accordionIcon">✨</span>
                    <span>{t.accordionFacilities}</span>
                  </div>
                  <span className="accordionChevron">{openSections.facilities ? '▲' : '▼'}</span>
                </button>

                {openSections.facilities && (
                  <div className="accordionBody">
                    <div className="facilitiesTagList">
                      {hotel.coreFacilities.slice(0, 10).map((f, i) => (
                        <span key={i} className="facilityTag">✓ {f}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                      <a
                        href={hotel.agodaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btnAgodaFacilities"
                      >
                        {t.viewAllFacilitiesAgoda}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 모달 하단 CTA */}
          <div className="modalFooterCta">
            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              요금 및 빈 객실은 Agoda 실시간 예약 페이지에서 바로 확인 가능합니다.
            </div>
            <a
              href={hotel.agodaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btnAgoda"
              style={{ padding: '12px 28px', fontSize: '1rem' }}
            >
              <span>{t.bookOnAgoda}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   3. Main HotelsPage Component
   - 2개 구역 탭 선택 (선셋타운 | 켐 비치) + 딥링크 (?area=sunset-town, ?area=khem-beach)
   - 선셋타운:
     ① 탑 그레이드(라 페스타 힐튼) 큰 카드 노출
     ② 마이 푸꾸옥 추천 호텔(더 룸 호텔) 추천 칸 노출
     ③ 일반 호텔(25곳) 평점 필터 및 거리순/평점순/후기순 정렬 독립 적용
   - 켐 비치:
     - 7곳 바이켐 럭셔리 리조트 & 부티크 호텔
     - 기본 등급순(order) 정렬 + 평점순 / 후기순 정렬
   ========================================================================= */
function HotelsPageInner({ hotels, locale = 'en', initialArea }: HotelsPageProps) {
  const dict = getDictionary(locale)
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en

  const searchParams = useSearchParams()
  const areaParam = searchParams.get('area')
  const hotelQuery = searchParams.get('hotel')

  // Initial area from prop, URL or default to 'sunset-town'
  const [activeArea, setActiveArea] = useState<HotelArea>(
    initialArea || (areaParam === 'khem-beach' ? 'khem-beach' : 'sunset-town')
  )

  // Sunset Town Filter & Sort state
  const [activeRatingST, setActiveRatingST] = useState<'ALL' | 9.0 | 8.5>('ALL')
  const [activeSortST, setActiveSortST] = useState<'nearest' | 'rating' | 'reviews'>('nearest')

  // Khem Beach Filter & Sort state
  const [activeRatingKB, setActiveRatingKB] = useState<'ALL' | 9.0 | 8.5>('ALL')
  const [activeSortKB, setActiveSortKB] = useState<'grade' | 'rating' | 'reviews'>('grade')

  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null)

  // Sync state if URL query parameter changes
  useEffect(() => {
    if (areaParam === 'khem-beach') {
      setActiveArea('khem-beach')
    } else if (areaParam === 'sunset-town') {
      setActiveArea('sunset-town')
    }
  }, [areaParam])

  // Handle area switch with shallow URL update (supports deep linking)
  const handleAreaChange = (newArea: HotelArea) => {
    setActiveArea(newArea)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('area', newArea)
      window.history.pushState({}, '', url.toString())
    }
  }

  // Auto-open modal if hotel query parameter exists
  useEffect(() => {
    if (hotelQuery) {
      const match = hotels.find(h => h.slug === hotelQuery)
      if (match) {
        setSelectedHotel(match)
        if (match.area && match.area !== activeArea) {
          setActiveArea(match.area)
        }
      }
    }
  }, [hotelQuery, hotels])

  // Dynamically update document.title based on selected area
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const pageTitle = activeArea === 'khem-beach' ? t.pageTitleKhemBeach : t.pageTitleSunsetTown
      document.title = `${pageTitle} | MyPhuQuoc.NET`
    }
  }, [activeArea, t])

  // Partition Sunset Town hotels
  const sunsetHotels = useMemo(() => {
    return hotels.filter(h => h.area === 'sunset-town' || !h.area)
  }, [hotels])

  const sunsetTopHotel = useMemo(() => {
    return sunsetHotels.find(h => h.tier === 'top')
  }, [sunsetHotels])

  const sunsetRecommendedHotels = useMemo(() => {
    return sunsetHotels.filter(h => h.tier === 'recommended')
  }, [sunsetHotels])

  const sunsetStandardHotels = useMemo(() => {
    return sunsetHotels.filter(h => h.tier !== 'top' && h.tier !== 'recommended')
  }, [sunsetHotels])

  // Filtered & Sorted Sunset Town Standard Hotels
  const displaySunsetStandardHotels = useMemo(() => {
    let list = [...sunsetStandardHotels]

    if (activeRatingST === 9.0) {
      list = list.filter(h => h.rating >= 9.0)
    } else if (activeRatingST === 8.5) {
      list = list.filter(h => h.rating >= 8.5)
    }

    list.sort((a, b) => {
      if (activeSortST === 'nearest') return a.cable_m - b.cable_m
      if (activeSortST === 'rating') return b.rating - a.rating
      if (activeSortST === 'reviews') return b.reviewsCount - a.reviewsCount
      return 0
    })

    return list
  }, [sunsetStandardHotels, activeRatingST, activeSortST])

  // Partition Khem Beach hotels
  const khemHotels = useMemo(() => {
    return hotels.filter(h => h.area === 'khem-beach')
  }, [hotels])

  // Filtered & Sorted Khem Beach Hotels
  const displayKhemHotels = useMemo(() => {
    let list = [...khemHotels]

    if (activeRatingKB === 9.0) {
      list = list.filter(h => h.rating >= 9.0)
    } else if (activeRatingKB === 8.5) {
      list = list.filter(h => h.rating >= 8.5)
    }

    list.sort((a, b) => {
      if (activeSortKB === 'grade') return (a.order || 99) - (b.order || 99)
      if (activeSortKB === 'rating') return b.rating - a.rating
      if (activeSortKB === 'reviews') return b.reviewsCount - a.reviewsCount
      return 0
    })

    return list
  }, [khemHotels, activeRatingKB, activeSortKB])

  return (
    <div className="hotelsPageWrap">
      {/* 0. Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {locale === 'ko' ? '선셋타운' : 'Sunset Town'}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {locale === 'ko' ? '켐비치' : 'Khem Beach'}
            </Link>
            <Link href={localePath(locale, '/directory/dining')}>
              {categoryLabel('dining', locale)}
            </Link>
            <Link href={localePath(locale, '/directory/bars')}>
              {categoryLabel('bars', locale)}
            </Link>
            <Link href={localePath(locale, '/hotels')} style={{ fontWeight: 800, color: '#0f172a' }}>
              {categoryLabel('hotels', locale)}
            </Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hotelsHero">
        <div className="hotelsHeroOverlay" />
        <div className="hotelsHeroContent">
          <div className="hotelsHeroBadge">
            <span>✨</span>
            <span>{activeArea === 'khem-beach' ? t.badgeKhemBeach : t.badgeSunsetTown}</span>
          </div>
          <h1 className="hotelsHeroTitle">
            {activeArea === 'khem-beach' ? t.pageTitleKhemBeach : t.pageTitleSunsetTown}
          </h1>
          <p className="hotelsHeroSubtitle">
            {activeArea === 'khem-beach' ? t.pageSubtitleKhemBeach : t.pageSubtitleSunsetTown}
          </p>
        </div>
      </section>

      {/* Area Selector Tabs (선셋타운 | 켐 비치) */}
      <div className="areaSelectorWrap">
        <div className="areaSelectorInner">
          <button
            type="button"
            className={`areaTabBtn ${activeArea === 'sunset-town' ? 'active' : ''}`}
            onClick={() => handleAreaChange('sunset-town')}
          >
            <span className="areaTabIcon">🌅</span>
            <span className="areaTabName">{t.areaSunsetTown}</span>
            <span className="areaTabCount">{sunsetHotels.length}</span>
          </button>
          <button
            type="button"
            className={`areaTabBtn ${activeArea === 'khem-beach' ? 'active' : ''}`}
            onClick={() => handleAreaChange('khem-beach')}
          >
            <span className="areaTabIcon">🏖️</span>
            <span className="areaTabName">{t.areaKhemBeach}</span>
            <span className="areaTabCount">{khemHotels.length}</span>
          </button>
        </div>
      </div>

      <div className="hotelsContainer">
        {/* =========================================================================
            SECTION 1: SUNSET TOWN VIEW
            ========================================================================= */}
        {activeArea === 'sunset-town' && (
          <>
            {/* ① 선셋타운 최상단: 라 페스타 푸꾸옥 힐튼 (탑 그레이드 + 추천 호텔 + 5성급) */}
            {sunsetTopHotel && (
              <div className="sectionBlock topGradeSection">
                <div className="sectionHeaderRow">
                  <h2 className="sectionTitle">
                    🏆 {t.sectionTopGrade}
                  </h2>
                </div>
                <HotelCard
                  hotel={sunsetTopHotel}
                  t={t}
                  locale={locale}
                  isFeatured={true}
                  isTopGrade={true}
                  onOpenModal={setSelectedHotel}
                />
              </div>
            )}

            {/* ② 마이 푸꾸옥 추천 호텔 섹션: 더 룸 호텔 */}
            {sunsetRecommendedHotels.length > 0 && (
              <div className="sectionBlock recommendedSection">
                <div className="sectionHeaderRow">
                  <h2 className="sectionTitle">
                    👑 {t.sectionRecommended}
                  </h2>
                </div>
                {sunsetRecommendedHotels.map(h => (
                  <HotelCard
                    key={h.slug}
                    hotel={h}
                    t={t}
                    locale={locale}
                    isFeatured={true}
                    isTopGrade={false}
                    onOpenModal={setSelectedHotel}
                  />
                ))}
              </div>
            )}

            {/* ③ 일반 호텔 섹션: 25곳 + 필터 및 정렬 */}
            <div className="sectionBlock standardSection">
              <div className="sectionHeaderRow">
                <h2 className="sectionTitle">
                  {t.sectionStandard} <span className="sectionCount">({displaySunsetStandardHotels.length}{t.countSuffix})</span>
                </h2>
              </div>

              {/* 필터 및 정렬 컨트롤 (일반 호텔에만 적용) */}
              <div className="filterControlsWrap" style={{ margin: '0 0 24px 0' }}>
                <div className="filterControlsInner">
                  <div className="starFilterGroup">
                    <button
                      type="button"
                      className={`filterPill ${activeRatingST === 'ALL' ? 'active' : ''}`}
                      onClick={() => setActiveRatingST('ALL')}
                    >
                      {t.filterAll} ({sunsetStandardHotels.length})
                    </button>
                    <button
                      type="button"
                      className={`filterPill ${activeRatingST === 9.0 ? 'active' : ''}`}
                      onClick={() => setActiveRatingST(9.0)}
                    >
                      ⭐ {t.filterRating9}
                    </button>
                    <button
                      type="button"
                      className={`filterPill ${activeRatingST === 8.5 ? 'active' : ''}`}
                      onClick={() => setActiveRatingST(8.5)}
                    >
                      ⭐ {t.filterRating85}
                    </button>
                  </div>

                  <div className="sortGroup">
                    <button
                      type="button"
                      className={`sortBtn ${activeSortST === 'nearest' ? 'active' : ''}`}
                      onClick={() => setActiveSortST('nearest')}
                    >
                      🚡 {t.sortNearest}
                    </button>
                    <button
                      type="button"
                      className={`sortBtn ${activeSortST === 'rating' ? 'active' : ''}`}
                      onClick={() => setActiveSortST('rating')}
                    >
                      ⭐ {t.sortRating}
                    </button>
                    <button
                      type="button"
                      className={`sortBtn ${activeSortST === 'reviews' ? 'active' : ''}`}
                      onClick={() => setActiveSortST('reviews')}
                    >
                      💬 {t.sortReviews}
                    </button>
                  </div>
                </div>
              </div>

              <div className="hotelsGrid">
                {displaySunsetStandardHotels.map(hotel => (
                  <HotelCard
                    key={hotel.slug}
                    hotel={hotel}
                    t={t}
                    locale={locale}
                    isFeatured={false}
                    isTopGrade={false}
                    onOpenModal={setSelectedHotel}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            SECTION 2: KHEM BEACH VIEW (7곳 리조트 & 부티크 호텔)
            ========================================================================= */}
        {activeArea === 'khem-beach' && (
          <div className="sectionBlock khemSection">
            <div className="sectionHeaderRow">
              <h2 className="sectionTitle">
                🏖️ {t.sectionKhemResorts} <span className="sectionCount">({displayKhemHotels.length}{t.countSuffix})</span>
              </h2>
            </div>
            <p className="sectionSubtitle">{t.pageSubtitleKhemBeach}</p>

            {/* 켐 비치 필터 및 정렬 컨트롤 */}
            <div className="filterControlsWrap" style={{ margin: '0 0 24px 0' }}>
              <div className="filterControlsInner">
                <div className="starFilterGroup">
                  <button
                    type="button"
                    className={`filterPill ${activeRatingKB === 'ALL' ? 'active' : ''}`}
                    onClick={() => setActiveRatingKB('ALL')}
                  >
                    {t.filterAll} ({khemHotels.length})
                  </button>
                  <button
                    type="button"
                    className={`filterPill ${activeRatingKB === 9.0 ? 'active' : ''}`}
                    onClick={() => setActiveRatingKB(9.0)}
                  >
                    ⭐ {t.filterRating9}
                  </button>
                  <button
                    type="button"
                    className={`filterPill ${activeRatingKB === 8.5 ? 'active' : ''}`}
                    onClick={() => setActiveRatingKB(8.5)}
                  >
                    ⭐ {t.filterRating85}
                  </button>
                </div>

                <div className="sortGroup">
                  <button
                    type="button"
                    className={`sortBtn ${activeSortKB === 'grade' ? 'active' : ''}`}
                    onClick={() => setActiveSortKB('grade')}
                  >
                    🏆 {t.sortResortGrade}
                  </button>
                  <button
                    type="button"
                    className={`sortBtn ${activeSortKB === 'rating' ? 'active' : ''}`}
                    onClick={() => setActiveSortKB('rating')}
                  >
                    ⭐ {t.sortRating}
                  </button>
                  <button
                    type="button"
                    className={`sortBtn ${activeSortKB === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveSortKB('reviews')}
                  >
                    💬 {t.sortReviews}
                  </button>
                </div>
              </div>
            </div>

            <div className="hotelsGrid">
              {displayKhemHotels.map(hotel => (
                <HotelCard
                  key={hotel.slug}
                  hotel={hotel}
                  t={t}
                  locale={locale}
                  isFeatured={hotel.slug === 'jw-marriott-phu-quoc-emerald-bay' || hotel.tier === 'recommended'}
                  isTopGrade={false}
                  onOpenModal={setSelectedHotel}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Notice */}
        <div className="bottomNoticeWrap">
          <p>{t.footerNotice}</p>
        </div>
      </div>

      {/* Unified Detail Modal (선셋타운 & 켐 비치 호텔 공통 컴포넌트) */}
      {selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotel}
          t={t}
          locale={locale}
          onClose={() => setSelectedHotel(null)}
        />
      )}

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}

export function HotelsPage(props: HotelsPageProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#091e3a' }} />}>
      <HotelsPageInner {...props} />
    </Suspense>
  )
}
