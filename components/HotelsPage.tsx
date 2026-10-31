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
import type { HotelItem } from '@/lib/hotels'
import '@/app/hotels/hotels.css'

interface HotelsPageProps {
  hotels: HotelItem[]
  locale?: Locale
}

function getLocalizedSummary(hotel: HotelItem, locale?: Locale): string {
  if (locale === 'en' && hotel.summary_en) return hotel.summary_en
  if (locale === 'zh' && hotel.summary_zh) return hotel.summary_zh
  if (locale === 'ja' && hotel.summary_ja) return hotel.summary_ja
  if (locale === 'ru' && hotel.summary_ru) return hotel.summary_ru
  if (locale === 'vi' && hotel.summary_vi) return hotel.summary_vi
  return hotel.summary
}

/* =========================================================================
   1. Unified Hotel Card Component (공통 호텔 카드 컴포넌트)
   - 모든 호텔(더 룸 호텔 및 일반 26곳)이 완벽히 동일한 틀·순서·디자인
   - 차이: 더 룸 호텔만 '마이 푸꾸옥 추천 호텔' 배지 및 구글맵 5.0 평점 추가
   ========================================================================= */
interface HotelCardProps {
  hotel: HotelItem
  t: HotelUiDictionary
  locale?: Locale
  isFeatured?: boolean
  onOpenModal: (hotel: HotelItem) => void
}

function HotelCard({ hotel, t, locale, isFeatured = false, onOpenModal }: HotelCardProps) {
  const summaryText = getLocalizedSummary(hotel, locale)
  return (
    <div className={`hotelCard ${isFeatured ? 'hotelCardFeatured' : ''}`}>
      {/* Featured Header Badge (더 룸 호텔만 노출 - 단일 문구로 통일) */}
      {isFeatured && (
        <div className="cardFeaturedHeader">
          <span className="featuredBadge">
            👑 {t.featuredBadge}
          </span>
        </div>
      )}

      {/* 1. 대표 사진 1장 (아고다 출처 표기) */}
      <div className="cardImageWrap">
        <img
          src={hotel.photos[0] || '/images/default-hotel.jpg'}
          alt={hotel.name_ko}
          loading={isFeatured ? 'eager' : 'lazy'}
        />
        {/* 성급 표기 규칙: 공식 5성급인 라 페스타 힐튼만 '5성급' 표기, 더 룸 호텔은 '부티크 호텔', 기타 일반 호텔은 미검증 성급 숨김 */}
        {hotel.slug === 'la-festa-phu-quoc-curio-collection-by-hilton' ? (
          <div className="cardStarBadge">
            {t.fiveStar}
          </div>
        ) : isFeatured ? (
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

      {/* 2. 카드 본문 (동일한 틀·간격·버튼) */}
      <div className="cardBody">
        {/* 평점, 후기 수, 케이블카 거리 */}
        <div className="cardMetaRow">
          <div className="cardRatingBox">
            <span className="cardScore">{hotel.rating.toFixed(1)} ★</span>
            <span className="cardReviews">({hotel.reviewsCount.toLocaleString()})</span>
            {hotel.googleRating && (
              <span className="googleScoreBadge">구글맵 {hotel.googleRating.toFixed(1)} ★ ({hotel.googleReviewsCount || 18})</span>
            )}
          </div>
          <span className="cableBadge">🚡 {hotel.cable_m}m</span>
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
          <div className={`cardReviewHighlight ${isFeatured ? 'featuredReviewHighlight' : ''}`}>
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

        {/* 상세 보기 / Agoda에서 예약 버튼 */}
        <div className="cardActionRow">
          <button
            type="button"
            className="cardBtnDetail"
            onClick={() => onOpenModal(hotel)}
          >
            {t.viewDetails}
          </button>
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
   - 3줄 이내 요약 + 6개 드롭다운 (고객 리뷰 요약[기본 펼침], 객실, 시설, 위치, 정책, 사진)
   - 정보 없는 항목(미확인 객실, 구글맵 리뷰 부재 등)은 자동 숨김
   ========================================================================= */
interface HotelDetailModalProps {
  hotel: HotelItem
  t: HotelUiDictionary
  locale?: Locale
  onClose: () => void
}

function HotelDetailModal({ hotel, t, locale, onClose }: HotelDetailModalProps) {
  const [modalPhotoIdx, setModalPhotoIdx] = useState(0)

  // Accordion state:
  // ① 사진 갤러리(기본 펼침) ② 고객 후기(기본 펼침) ③ 한눈에 보는 장단점(기본 펼침)
  // ④ 객실 요약(접힘) ⑤ 위치·주변(접힘) ⑥ 시설·서비스(접힘)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gallery: true,
    reviews: true,
    insights: true,
    rooms: false,
    location: false,
    facilities: false,
  })

  // The Room Hotel 구글맵 10건 리뷰 전문 토글
  const [showFullReviews, setShowFullReviews] = useState(false)

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // 객실 정보 확인 여부 (미확인 시 객실 드롭다운 숨김)
  const hasRooms = Boolean(hotel.rooms && hotel.rooms.length > 0)

  // 부대시설 확인 여부
  const hasFacilities = Boolean(
    (hotel.facilityCategories && hotel.facilityCategories.length > 0) ||
    (hotel.coreFacilities && hotel.coreFacilities.length > 0)
  )

  // 한눈에 보는 장단점 확인 여부 (미확인 시 드롭다운 숨김)
  const insight = hotel.insight
  const hasInsights = Boolean(
    insight && (
      insight.location || insight.view || insight.condition || insight.staff ||
      (insight.pros && insight.pros.length > 0) ||
      (insight.cons && insight.cons.length > 0)
    )
  )

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <button type="button" className="modalCloseBtn" onClick={onClose} aria-label={t.close}>
          ✕
        </button>

        {/* 상단 대표 사진 1장 (아고다 출처 표기) */}
        <div className="modalTopPhotoWrap">
          <img
            src={hotel.photos[modalPhotoIdx] || hotel.photos[0] || '/images/default-hotel.jpg'}
            alt={hotel.name_ko}
          />
          <div className="modalTopPhotoBadges">
            {/* 공식 5성급인 라 페스타 힐튼만 '5성급' 표기, 더 룸 호텔은 '부티크 호텔', 기타 일반 호텔은 미검증 성급 숨김 */}
            {hotel.slug === 'la-festa-phu-quoc-curio-collection-by-hilton' && (
              <span className="cardStarBadge">{t.fiveStar}</span>
            )}
            {hotel.isFeatured && (
              <span className="cardStarBadge">{t.boutiqueHotel}</span>
            )}
            <span className="cableBadge">🚡 {t.cableCarDistance} {hotel.cable_m}m</span>
            {hotel.isFeatured && (
              <span className="featuredBadge">👑 {t.featuredBadge}</span>
            )}
          </div>
          <a
            href={hotel.agodaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="photoSourceTag"
          >
            <span>{t.photoSource} ↗</span>
          </a>
        </div>

        {/* 모달 본문 */}
        <div className="modalBody">
          {/* 호텔명 및 3줄 이내 핵심 요약 */}
          <div className="modalHeaderInfo">
            <h2 className="modalHotelTitle">{hotel.name_ko}</h2>
            <div className="modalHotelSubtitle">{hotel.name_en}</div>

            <p className="modalTopSummary">
              {getLocalizedSummary(hotel, locale)}
            </p>
            {hotel.isAiGeneratedIntro && (
              <div className="aiNoticeText">※ {t.aiIntroNotice}</div>
            )}
          </div>

          {/* 6개 드롭다운 (아코디언) 그룹: ① 사진 갤러리 ② 고객 후기 ③ 한눈에 보는 장단점 ④ 객실 요약 ⑤ 위치·주변 ⑥ 시설·서비스 */}
          <div className="accordionGroup">
            {/* ① 사진 갤러리 (맨 위, 기본 펼침) */}
            {hotel.photos && hotel.photos.length > 0 && (
              <div className={`accordionItem ${openSections.gallery ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordionHeader"
                  onClick={() => toggleSection('gallery')}
                  aria-expanded={openSections.gallery}
                >
                  <div className="accordionTitle">
                    <span className="accordionIcon">🖼️</span>
                    <span>{t.accordionGallery}</span>
                    <span className="accordionBadge">{hotel.photos.length}장</span>
                  </div>
                  <span className="accordionChevron">{openSections.gallery ? '▲' : '▼'}</span>
                </button>

                {openSections.gallery && (
                  <div className="accordionBody">
                    <div className="galleryGridWrap">
                      {hotel.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className={`galleryThumbBox ${modalPhotoIdx === idx ? 'active' : ''}`}
                          onClick={() => setModalPhotoIdx(idx)}
                        >
                          <img src={photo} alt={`${hotel.name_ko} ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '12px', textAlign: 'right' }}>
                      <a
                        href={hotel.agodaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="photoSourceTag"
                        style={{ position: 'static', display: 'inline-flex' }}
                      >
                        <span>{t.photoSource} ↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ② 고객 후기 (요약 + 더 룸 호텔은 구글맵 리뷰 전문 드롭다운, 기본 펼침) */}
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
                  <span className="accordionBadge">
                    {hotel.rating.toFixed(1)} ★ ({hotel.reviewsCount.toLocaleString()})
                  </span>
                </div>
                <span className="accordionChevron">{openSections.reviews ? '▲' : '▼'}</span>
              </button>

              {openSections.reviews && (
                <div className="accordionBody">
                  {/* 평점 요약 카드 */}
                  <div className="reviewSummaryScoreCard">
                    <div className="scoreBadgeRow">
                      <span className="bigRatingBadge">{hotel.rating.toFixed(1)} ★</span>
                      <div>
                        <div className="scoreSourceTitle">
                          Agoda {hotel.reviewsCount.toLocaleString()}{t.reviews}
                        </div>
                        {hotel.googleRating && (
                          <div className="googleRatingSubText">
                            구글맵 {hotel.googleRating.toFixed(1)} ★ · 리뷰 {hotel.googleReviewsCount || 18}건 ({t.featuredBadge})
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 세부 평점 막대 (아고다 데이터 기반) */}
                    {hotel.subRatings && (
                      <div className="subRatingsGrid">
                        {hotel.subRatings.cleanliness !== undefined && (
                          <div className="subRatingItem">
                            <div className="subRatingLabelRow">
                              <span>{t.subCleanliness}</span>
                              <span className="subRatingVal">{hotel.subRatings.cleanliness.toFixed(1)}</span>
                            </div>
                            <div className="subRatingTrack">
                              <div
                                className="subRatingFill"
                                style={{ width: `${(hotel.subRatings.cleanliness / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {hotel.subRatings.service !== undefined && (
                          <div className="subRatingItem">
                            <div className="subRatingLabelRow">
                              <span>{t.subService}</span>
                              <span className="subRatingVal">{hotel.subRatings.service.toFixed(1)}</span>
                            </div>
                            <div className="subRatingTrack">
                              <div
                                className="subRatingFill"
                                style={{ width: `${(hotel.subRatings.service / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {hotel.subRatings.facilities !== undefined && (
                          <div className="subRatingItem">
                            <div className="subRatingLabelRow">
                              <span>{t.subFacilities}</span>
                              <span className="subRatingVal">{hotel.subRatings.facilities.toFixed(1)}</span>
                            </div>
                            <div className="subRatingTrack">
                              <div
                                className="subRatingFill"
                                style={{ width: `${(hotel.subRatings.facilities / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {hotel.subRatings.valueForMoney !== undefined && (
                          <div className="subRatingItem">
                            <div className="subRatingLabelRow">
                              <span>{t.subValue}</span>
                              <span className="subRatingVal">{hotel.subRatings.valueForMoney.toFixed(1)}</span>
                            </div>
                            <div className="subRatingTrack">
                              <div
                                className="subRatingFill"
                                style={{ width: `${(hotel.subRatings.valueForMoney / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {hotel.subRatings.location !== undefined && (
                          <div className="subRatingItem">
                            <div className="subRatingLabelRow">
                              <span>{t.subLocation}</span>
                              <span className="subRatingVal">{hotel.subRatings.location.toFixed(1)}</span>
                            </div>
                            <div className="subRatingTrack">
                              <div
                                className="subRatingFill"
                                style={{ width: `${(hotel.subRatings.location / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 투숙객이 자주 언급한 장점 3~4개 (사실 기반) */}
                  {hotel.reviewPros && hotel.reviewPros.length > 0 && (
                    <div className="prosSectionWrap">
                      <div className="prosSectionTitle">✓ {t.prosTitle}</div>
                      <div className="prosList">
                        {hotel.reviewPros.map((pro, idx) => (
                          <div key={idx} className="prosItem">
                            <span className="prosCheck">✓</span>
                            <span className="prosText">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 대표 투숙객 한 줄 평 */}
                  {hotel.reviewQuote && (
                    <div className="quoteSectionWrap">
                      <div className="quoteSectionTitle">💬 {t.representativeQuoteTitle}</div>
                      <blockquote className="quoteCard">
                        <p className="quoteText">“{hotel.reviewQuote.text}”</p>
                        <footer className="quoteSource">— 출처: {hotel.reviewQuote.source}</footer>
                      </blockquote>
                    </div>
                  )}

                  {/* 구글맵 리뷰 전문 10건 서브 드롭다운 (구글맵 리뷰가 있는 더 룸 호텔만 노출, 기타 호텔은 숨김) */}
                  {hotel.googleReviews && hotel.googleReviews.length > 0 && (
                    <div className="subAccordionSection">
                      <button
                        type="button"
                        className="subAccordionToggle"
                        onClick={() => setShowFullReviews(!showFullReviews)}
                        aria-expanded={showFullReviews}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>💬</span>
                          <strong>{showFullReviews ? t.collapseReviews : t.viewFullReviews}</strong>
                        </span>
                        <span>{showFullReviews ? '▲' : '▼'}</span>
                      </button>

                      {showFullReviews && (
                        <div className="subAccordionReviews">
                          <div className="googleReviewsNote">
                            ※ 출처: Google 리뷰 (10건 전문 수록, 작성자 표시명 기준)
                          </div>
                          <div className="reviewsGrid">
                            {hotel.googleReviews.map((rev, idx) => (
                              <div key={idx} className="reviewCard">
                                <div className="reviewAuthorRow">
                                  <span className="reviewAuthor">{rev.author}</span>
                                  <span className="reviewSourceTag">{rev.source}</span>
                                </div>
                                <div className="reviewStars">{'★'.repeat(rev.rating || 5)}</div>
                                <p className="reviewText">{rev.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ③ '한눈에 보는 장단점' (위치·전망·컨디션·직원 4항목 + pros/cons, 기본 펼침) */}
            {hasInsights && (
              <div className={`accordionItem ${openSections.insights ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordionHeader"
                  onClick={() => toggleSection('insights')}
                  aria-expanded={openSections.insights}
                >
                  <div className="accordionTitle">
                    <span className="accordionIcon">🔍</span>
                    <span>{t.accordionInsights}</span>
                  </div>
                  <span className="accordionChevron">{openSections.insights ? '▲' : '▼'}</span>
                </button>

                {openSections.insights && (
                  <div className="accordionBody">
                    {/* 4 핵심 항목 (위치, 전망, 컨디션, 직원 수준) - 값이 있는 항목만 표시, 없는 항목은 숨김 */}
                    <div className="insightsGrid">
                      {insight?.location && (
                        <div className="insightItemCard">
                          <div className="insightItemLabel">📍 {t.insightLocation}</div>
                          <div className="insightItemValue">{insight.location}</div>
                        </div>
                      )}
                      {insight?.view && (
                        <div className="insightItemCard">
                          <div className="insightItemLabel">🌅 {t.insightView}</div>
                          <div className="insightItemValue">{insight.view}</div>
                        </div>
                      )}
                      {insight?.condition && (
                        <div className="insightItemCard">
                          <div className="insightItemLabel">🛏️ {t.insightCondition}</div>
                          <div className="insightItemValue">{insight.condition}</div>
                        </div>
                      )}
                      {insight?.staff && (
                        <div className="insightItemCard">
                          <div className="insightItemLabel">👥 {t.insightStaff}</div>
                          <div className="insightItemValue">{insight.staff}</div>
                        </div>
                      )}
                    </div>

                    {/* 장단점 목록 */}
                    {((insight?.pros && insight.pros.length > 0) ||
                      (insight?.cons && insight.cons.length > 0)) && (
                      <div className="prosConsWrap">
                        {insight?.pros && insight.pros.length > 0 && (
                          <div className="prosBox">
                            <div className="prosBoxTitle">✓ {t.prosLabel}</div>
                            <ul className="prosListItems">
                              {insight.pros.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {insight?.cons && insight.cons.length > 0 && (
                          <div className="consBox">
                            <div className="consBoxTitle">⚠️ {t.consLabel}</div>
                            <ul className="consListItems">
                              {insight.cons.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ④ 객실 요약 (아고다에서 확인된 객실 유형만 이름·면적·침대·전망 정도로 짧게, 접힘; 정보 없으면 숨김) */}
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

            {/* ⑤ 위치·주변 (케이블카 거리, 주요 명소 거리 3개 이내, 체크인/아웃 한 줄, 접힘) */}
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
                    <div style={{ marginBottom: '8px' }}>
                      <strong>🚡 케이블카 거리:</strong> 혼똔섬 케이블카 탑승장까지 {hotel.cable_m}m
                    </div>
                    <div style={{ marginBottom: '12px', color: '#0f172a', fontWeight: 600 }}>
                      🕒 {t.checkIn} {hotel.checkIn || '14:00'} · {t.checkOut} {hotel.checkOut || '12:00'}
                    </div>
                    {hotel.landmarks && hotel.landmarks.length > 0 && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                        <div style={{ fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                          {t.landmarksTitle}
                        </div>
                        <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                          {hotel.landmarks.slice(0, 3).map((lm, idx) => (
                            <li key={idx}>{lm.name}: {lm.distance}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ⑥ 시설·서비스 (맨 마지막, 접힘, 핵심 시설만 최대 8~10개 태그, 상세 목록은 '아고다에서 전체 시설 보기' 링크) */}
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
   ========================================================================= */
function HotelsPageInner({ hotels, locale = 'en' }: HotelsPageProps) {
  const dict = getDictionary(locale)
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en

  const [activeRating, setActiveRating] = useState<'ALL' | 9.0 | 8.5>('ALL')
  const [activeSort, setActiveSort] = useState<'nearest' | 'rating' | 'reviews'>('nearest')
  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null)

  const searchParams = useSearchParams()
  const hotelQuery = searchParams.get('hotel')

  // Auto-open modal if hotel query parameter exists
  useEffect(() => {
    if (hotelQuery) {
      const match = hotels.find(h => h.slug === hotelQuery)
      if (match) {
        setSelectedHotel(match)
      }
    }
  }, [hotelQuery, hotels])

  // Filter & Sort for standard grid
  const displayHotels = useMemo(() => {
    let list = hotels.filter(h => !h.isFeatured)

    if (activeRating === 9.0) {
      list = list.filter(h => h.rating >= 9.0)
    } else if (activeRating === 8.5) {
      list = list.filter(h => h.rating >= 8.5)
    }

    list.sort((a, b) => {
      if (activeSort === 'nearest') return a.cable_m - b.cable_m
      if (activeSort === 'rating') return b.rating - a.rating
      if (activeSort === 'reviews') return b.reviewsCount - a.reviewsCount
      return 0
    })

    return list
  }, [hotels, activeRating, activeSort])

  const featuredHotel = useMemo(() => {
    return hotels.find(h => h.isFeatured)
  }, [hotels])

  const standardHotelsCount = useMemo(() => {
    return hotels.filter(h => !h.isFeatured).length
  }, [hotels])

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
            <span>Sunset Town Hotels &amp; Resorts</span>
          </div>
          <h1 className="hotelsHeroTitle">{t.pageTitle}</h1>
          <p className="hotelsHeroSubtitle">{t.pageSubtitle}</p>
        </div>
      </section>

      {/* Filter & Sort Controls */}
      <div className="filterControlsWrap">
        <div className="filterControlsInner">
          <div className="starFilterGroup">
            <button
              type="button"
              className={`filterPill ${activeRating === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveRating('ALL')}
            >
              {t.filterAll} ({standardHotelsCount})
            </button>
            <button
              type="button"
              className={`filterPill ${activeRating === 9.0 ? 'active' : ''}`}
              onClick={() => setActiveRating(9.0)}
            >
              ⭐ {t.filterRating9}
            </button>
            <button
              type="button"
              className={`filterPill ${activeRating === 8.5 ? 'active' : ''}`}
              onClick={() => setActiveRating(8.5)}
            >
              ⭐ {t.filterRating85}
            </button>
          </div>

          <div className="sortGroup">
            <button
              type="button"
              className={`sortBtn ${activeSort === 'nearest' ? 'active' : ''}`}
              onClick={() => setActiveSort('nearest')}
            >
              🚡 {t.sortNearest}
            </button>
            <button
              type="button"
              className={`sortBtn ${activeSort === 'rating' ? 'active' : ''}`}
              onClick={() => setActiveSort('rating')}
            >
              ⭐ {t.sortRating}
            </button>
            <button
              type="button"
              className={`sortBtn ${activeSort === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveSort('reviews')}
            >
              💬 {t.sortReviews}
            </button>
          </div>
        </div>
      </div>

      <div className="hotelsContainer">
        {/* Featured Hotel: The Room Hotel (동일한 HotelCard 구조 사용) */}
        {featuredHotel && (
          <div style={{ marginBottom: '36px' }}>
            <HotelCard
              hotel={featuredHotel}
              t={t}
              locale={locale}
              isFeatured={true}
              onOpenModal={setSelectedHotel}
            />
          </div>
        )}

        {/* 26 Standard Hotels Grid (동일한 HotelCard 구조 사용) */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a' }}>
            {t.hotelListTitle} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>({displayHotels.length}{t.countSuffix})</span>
          </h2>
        </div>

        <div className="hotelsGrid">
          {displayHotels.map(hotel => (
            <HotelCard
              key={hotel.slug}
              hotel={hotel}
              t={t}
              locale={locale}
              isFeatured={false}
              onOpenModal={setSelectedHotel}
            />
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="bottomNoticeWrap">
          <p>{t.footerNotice}</p>
        </div>
      </div>

      {/* Unified Detail Modal (모든 호텔 공통 컴포넌트) */}
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
