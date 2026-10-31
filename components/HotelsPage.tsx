'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { MobileMenu } from '@/components/MobileMenu'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SiteFooter } from '@/components/SiteFooter'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryLabel } from '@/lib/directory'
import { HOTEL_TRANSLATIONS } from '@/lib/i18n/hotelTranslations'
import type { HotelItem } from '@/lib/hotels'
import '@/app/hotels/hotels.css'

interface HotelsPageProps {
  hotels: HotelItem[]
  locale?: Locale
}

function HotelsPageInner({ hotels, locale = 'en' }: HotelsPageProps) {
  const dict = getDictionary(locale)
  const t = HOTEL_TRANSLATIONS[locale] || HOTEL_TRANSLATIONS.en

  const [activeStar, setActiveStar] = useState<'ALL' | 5 | 4 | 3>('ALL')
  const [activeSort, setActiveSort] = useState<'nearest' | 'rating' | 'reviews'>('nearest')
  const [featuredPhotoIdx, setFeaturedPhotoIdx] = useState(0)
  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null)
  const [modalPhotoIdx, setModalPhotoIdx] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const searchParams = useSearchParams()
  const hotelQuery = searchParams.get('hotel')

  // Auto-open modal if hotel query parameter exists
  useEffect(() => {
    if (hotelQuery) {
      const match = hotels.find(h => h.slug === hotelQuery)
      if (match) {
        setSelectedHotel(match)
        setModalPhotoIdx(0)
      }
    }
  }, [hotelQuery, hotels])
  const featuredHotel = useMemo(() => {
    return hotels.find(h => h.isFeatured) || hotels[0]
  }, [hotels])

  // Filtered & sorted hotels (excluding the featured hotel from general listing)
  const displayHotels = useMemo(() => {
    let list = hotels.filter(h => !h.isFeatured)

    if (activeStar !== 'ALL') {
      list = list.filter(h => h.star === activeStar)
    }

    return list.sort((a, b) => {
      if (activeSort === 'nearest') {
        return a.cable_m - b.cable_m
      } else if (activeSort === 'rating') {
        return b.rating - a.rating
      } else {
        return b.reviewsCount - a.reviewsCount
      }
    })
  }, [hotels, activeStar, activeSort])

  const openModal = (hotel: HotelItem) => {
    setSelectedHotel(hotel)
    setModalPhotoIdx(0)
  }

  const closeModal = () => {
    setSelectedHotel(null)
    setModalPhotoIdx(0)
  }

  return (
    <div className="hotelsPageWrap">
      {/* Site Header */}
      <header className="siteHeader heroHeader">
        <Logo locale={locale} />
        <nav className="desktopNav">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <Link href={localePath(locale, '/zones/sunset-town')}>선셋타운</Link>
          <Link href={localePath(locale, '/zones/khem-beach')}>켐비치</Link>
          <Link href={localePath(locale, '/directory/dining')}>{categoryLabel('dining', locale)}</Link>
          <Link href={localePath(locale, '/directory/bars')}>{categoryLabel('bars', locale)}</Link>
          <Link href={localePath(locale, '/hotels')} className="active" style={{ color: '#f59e0b', fontWeight: 700 }}>
            호텔·리조트
          </Link>
          <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
        </nav>
        <div className="headerActions">
          <Link
            href={localePath(locale, '/search')}
            className="searchGlyph"
            aria-label={dict.nav.search}
          >
            ⌕
          </Link>
          <LanguageSwitcher locale={locale} variant="hero" />
          <MobileMenu locale={locale} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hotelsHero">
        <div className="hotelsHeroOverlay" />
        <div className="hotelsHeroContent">
          <div className="hotelsHeroBadge">
            <span>✨</span>
            <span>Sunset Town Hotels & Resorts</span>
          </div>
          <h1 className="hotelsHeroTitle">{t.pageTitle}</h1>
          <p className="hotelsHeroSubtitle">{t.pageSubtitle}</p>
        </div>
      </section>

      {/* Filter and Sort Control Bar */}
      <div className="hotelsControlBar">
        <div className="hotelsControlBox">
          <div className="filterGroup">
            <button
              type="button"
              className={`filterBtn ${activeStar === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveStar('ALL')}
            >
              {t.filterAll}
            </button>
            <button
              type="button"
              className={`filterBtn ${activeStar === 5 ? 'active' : ''}`}
              onClick={() => setActiveStar(5)}
            >
              ★ 5성급
            </button>
            <button
              type="button"
              className={`filterBtn ${activeStar === 4 ? 'active' : ''}`}
              onClick={() => setActiveStar(4)}
            >
              ★ 4성급
            </button>
            <button
              type="button"
              className={`filterBtn ${activeStar === 3 ? 'active' : ''}`}
              onClick={() => setActiveStar(3)}
            >
              ★ 3성급
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
        {/* Featured Hotel: The Room Hotel */}
        {featuredHotel && (
          <section className="featuredHotelCard" id="featured-hotel">
            <div className="featuredHeader">
              <span className="featuredBadge">
                👑 {featuredHotel.badgeText || '마이푸꾸옥 운영 호텔'}
              </span>
              <span className="featuredTitleTag">{t.featuredTitle}</span>
            </div>

            <div className="featuredBody">
              {/* Left: Gallery */}
              <div className="featuredGallery">
                <div className="mainImageWrap">
                  <img
                    src={featuredHotel.photos[featuredPhotoIdx] || featuredHotel.photos[0]}
                    alt={featuredHotel.name_ko}
                    loading="eager"
                  />
                  <a
                    href={featuredHotel.agodaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="photoSourceTag"
                    title="Agoda 페이지에서 보기"
                  >
                    <span>{t.photoSource} ↗</span>
                  </a>
                </div>

                <div className="thumbRow">
                  {featuredHotel.photos.slice(0, 5).map((photo, idx) => (
                    <div
                      key={idx}
                      className={`thumbWrap ${featuredPhotoIdx === idx ? 'active' : ''}`}
                      onClick={() => setFeaturedPhotoIdx(idx)}
                    >
                      <img src={photo} alt={`${featuredHotel.name_ko} ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Info */}
              <div className="featuredInfo">
                <div>
                  <div className="hotelTitleRow">
                    <div className="starRating">
                      {'★'.repeat(featuredHotel.star)}
                      <span style={{ fontSize: '0.8125rem', color: '#64748b', marginLeft: '4px' }}>
                        {featuredHotel.star}성급 부티크
                      </span>
                    </div>
                    <h2 className="hotelNameKo">{featuredHotel.name_ko}</h2>
                    <div className="hotelNameEn">{featuredHotel.name_en}</div>
                  </div>

                  <div className="scoreRow">
                    <div className="ratingBadge">{featuredHotel.rating.toFixed(1)} ★</div>
                    <div className="reviewCountText">
                      Agoda {featuredHotel.reviewsCount.toLocaleString()}{t.reviews} · 구글맵 5.0 ★
                    </div>
                    <div className="cableBadge">
                      🚡 케이블카 {featuredHotel.cable_m}m
                    </div>
                  </div>

                  {/* Highlights Summary */}
                  {featuredHotel.highlightSummary && (
                    <div className="highlightBanner">
                      <div className="highlightBannerTitle">{t.highlightTitle}</div>
                      <div className="highlightBannerText">{featuredHotel.highlightSummary}</div>
                    </div>
                  )}

                  {/* Facilities */}
                  <div className="facilitiesTagList">
                    {featuredHotel.coreFacilities.map((f, i) => (
                      <span key={i} className="facilityTag">✓ {f}</span>
                    ))}
                  </div>
                </div>

                <div className="featuredActionRow">
                  <button
                    type="button"
                    className="btnDetail"
                    onClick={() => openModal(featuredHotel)}
                  >
                    {t.viewDetails}
                  </button>
                  <a
                    href={featuredHotel.agodaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btnAgoda"
                  >
                    <span>{t.bookOnAgoda}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* The Room Hotel Extra Content: Room Table & Google Reviews */}
            <div className="theRoomExtras">
              {/* Room Table */}
              {featuredHotel.rooms && featuredHotel.rooms.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <div className="extraSectionTitle">
                    <span>🛏️</span>
                    <span>{t.roomInfoTitle}</span>
                  </div>
                  <div className="roomsTableWrap">
                    <table className="roomsTable">
                      <thead>
                        <tr>
                          <th>{t.roomName}</th>
                          <th>{t.roomSize}</th>
                          <th>{t.roomBed}</th>
                          <th>{t.roomView}</th>
                          <th>{t.roomFeatures}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {featuredHotel.rooms.map((room, idx) => (
                          <tr key={idx}>
                            <td className="roomNameHighlight">{room.name}</td>
                            <td>{room.size}</td>
                            <td>{room.bed}</td>
                            <td>{room.view}</td>
                            <td>{room.features}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Google Reviews */}
              {featuredHotel.googleReviews && featuredHotel.googleReviews.length > 0 && (
                <div>
                  <div className="extraToggleHeader">
                    <div>
                      <div className="extraSectionTitle">
                        <span>💬</span>
                        <span>{t.googleReviewsTitle}</span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '2px' }}>
                        {t.googleReviewsSubtitle}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #d1d5db',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#374151',
                        cursor: 'pointer'
                      }}
                    >
                      {showAllReviews ? '접기 ▲' : '전체 10건 보기 ▼'}
                    </button>
                  </div>

                  <div className="reviewsGrid">
                    {(showAllReviews ? featuredHotel.googleReviews : featuredHotel.googleReviews.slice(0, 4)).map((rev, idx) => (
                      <div key={idx} className="reviewCard">
                        <div>
                          <div className="reviewAuthorRow">
                            <span className="reviewAuthor">{rev.author}</span>
                            <span className="reviewSourceTag">{rev.source}</span>
                          </div>
                          <div className="reviewStars">{'★'.repeat(rev.rating || 5)}</div>
                          <p className="reviewText">{rev.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Hotel Grid Section (26 Hotels) */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a' }}>
            선셋타운 호텔 목록 <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>({displayHotels.length}곳)</span>
          </h2>
        </div>

        <div className="hotelsGrid">
          {displayHotels.map(hotel => (
            <div key={hotel.slug} className="hotelCard">
              <div className="cardImageWrap">
                <img
                  src={hotel.photos[0] || '/images/default-hotel.jpg'}
                  alt={hotel.name_ko}
                  loading="lazy"
                />
                <div className="cardStarBadge">
                  {'★'.repeat(hotel.star)} {hotel.star}성급
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

              <div className="cardBody">
                <div className="cardMetaRow">
                  <div className="cardRatingBox">
                    <span className="cardScore">{hotel.rating.toFixed(1)} ★</span>
                    <span className="cardReviews">({hotel.reviewsCount.toLocaleString()})</span>
                  </div>
                  <span className="cableBadge">🚡 {hotel.cable_m}m</span>
                </div>

                <h3 className="cardTitle">{hotel.name_ko}</h3>
                <div className="cardTitleEn">{hotel.name_en}</div>

                <p className="cardSummary">{hotel.summary || hotel.description}</p>

                <div className="cardFacilities">
                  {hotel.coreFacilities.slice(0, 4).map((f, i) => (
                    <span key={i} className="cardFacilityTag">✓ {f}</span>
                  ))}
                </div>

                <div className="cardActionRow">
                  <button
                    type="button"
                    className="cardBtnDetail"
                    onClick={() => openModal(hotel)}
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
          ))}
        </div>

        {/* Directory Link */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            href={localePath(locale, '/directory/hotels')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '9999px',
              color: '#0f172a',
              fontSize: '0.9375rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>🏨</span>
            <span>{t.viewAllDirectory}</span>
          </Link>
        </div>

        {/* Bottom Notice */}
        <div className="bottomNoticeWrap">
          <p>{t.footerNotice}</p>
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedHotel && (
        <div className="modalBackdrop" onClick={closeModal}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <button type="button" className="modalCloseBtn" onClick={closeModal} aria-label={t.close}>
              ✕
            </button>

            {/* Modal Gallery */}
            <div className="modalGalleryWrap">
              <img
                src={selectedHotel.photos[modalPhotoIdx] || selectedHotel.photos[0]}
                alt={selectedHotel.name_ko}
              />
              {selectedHotel.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="modalNavBtn modalNavPrev"
                    onClick={() => setModalPhotoIdx((modalPhotoIdx - 1 + selectedHotel.photos.length) % selectedHotel.photos.length)}
                    aria-label={t.prevPhoto}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="modalNavBtn modalNavNext"
                    onClick={() => setModalPhotoIdx((modalPhotoIdx + 1) % selectedHotel.photos.length)}
                    aria-label={t.nextPhoto}
                  >
                    ›
                  </button>
                </>
              )}
              <a
                href={selectedHotel.agodaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="photoSourceTag"
              >
                <span>{t.photoSource} ↗</span>
              </a>
            </div>

            {/* Modal Body */}
            <div className="modalBody">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 800 }}>{'★'.repeat(selectedHotel.star)}</span>
                <span className="cableBadge">🚡 케이블카 {selectedHotel.cable_m}m</span>
                {selectedHotel.isFeatured && (
                  <span className="featuredBadge">👑 {selectedHotel.badgeText}</span>
                )}
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {selectedHotel.name_ko}
              </h2>
              <div style={{ fontSize: '0.9375rem', color: '#64748b', marginBottom: '16px' }}>
                {selectedHotel.name_en}
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span className="ratingBadge">{selectedHotel.rating.toFixed(1)} ★</span>
                <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                  Agoda 후기 {selectedHotel.reviewsCount.toLocaleString()}건
                </span>
                <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                  📍 {selectedHotel.address}
                </span>
              </div>

              {/* Checkin / Checkout / Year */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '10px', marginBottom: '24px' }}>
                {selectedHotel.checkIn && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.checkIn}</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedHotel.checkIn}</div>
                  </div>
                )}
                {selectedHotel.checkOut && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.checkOut}</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedHotel.checkOut}</div>
                  </div>
                )}
                {selectedHotel.builtYear && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.builtYear}</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedHotel.builtYear}년</div>
                  </div>
                )}
                {selectedHotel.floors && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.floors}</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedHotel.floors}층</div>
                  </div>
                )}
              </div>

              {/* Overview Description */}
              <div className="modalSectionTitle">호텔 소개</div>
              <div style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {selectedHotel.description || selectedHotel.summary}
              </div>
              {selectedHotel.isAiGeneratedIntro && (
                <div className="aiNoticeText">※ {t.aiIntroNotice}</div>
              )}

              {/* Facilities */}
              {selectedHotel.facilityCategories && selectedHotel.facilityCategories.length > 0 && (
                <>
                  <div className="modalSectionTitle">{t.hotelFacilitiesTitle}</div>
                  <div className="modalFacilityGrid">
                    {selectedHotel.facilityCategories.map((cat, idx) => (
                      <div key={idx} className="modalFacilityCat">
                        <div className="modalCatTitle">{cat.name}</div>
                        <ul className="modalCatItems">
                          {cat.items.slice(0, 6).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Policy */}
              {selectedHotel.policies?.childPolicy && (
                <>
                  <div className="modalSectionTitle">{t.policiesTitle}</div>
                  <div style={{ fontSize: '0.875rem', color: '#475569', background: '#f8fafc', padding: '14px', borderRadius: '8px' }}>
                    <strong>{t.childPolicy}:</strong> {selectedHotel.policies.childPolicy}
                  </div>
                </>
              )}

              {/* Modal Footer CTA */}
              <div className="modalFooterCta">
                <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  요금 및 빈 객실은 Agoda 실시간 예약 페이지에서 바로 확인 가능합니다.
                </div>
                <a
                  href={selectedHotel.agodaUrl}
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
