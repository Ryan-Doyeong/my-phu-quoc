'use client'

import React, { useState } from 'react'
import type { Locale } from '@/lib/i18n/config'
import type { BusinessMenuData } from '@/lib/menus'
import { BusinessMenuSection } from '@/components/BusinessMenuSection'

interface EnrichedBusinessAccordionsProps {
  business: any
  menuData: BusinessMenuData | null
  locale?: Locale
  cultureGuide?: any
  photos?: string[]
}

const SECTION_TITLES = {
  menu: {
    ko: '메뉴 & 가격',
    en: 'Menu & Prices',
    vi: 'Thực đơn & Giá cả',
    zh: '菜单与价格',
    ja: 'メニュー・料金',
    ru: 'Меню и цены',
    hi: 'मेन्यू और कीमतें',
  },
  culture: {
    ko: '이 음식 알고 먹기',
    en: 'Food Culture & Dining Guide',
    vi: 'Tìm hiểu món ăn & Văn hóa ẩm thực',
    zh: '美食文化与吃法指南',
    ja: '食の知識と味わい方ガイド',
    ru: 'Кулинарная культура и гид по блюдам',
    hi: 'भोजन संस्कृति और स्वाद गाइड',
  },
  photos: {
    ko: '사진 더 보기',
    en: 'View Photos & Gallery',
    vi: 'Xem thêm hình ảnh',
    zh: '查看更多照片',
    ja: '写真をもっと見る',
    ru: 'Смотреть больше фото',
    hi: 'और तस्वीरें देखें',
  },
}

const PHOTO_CREDIT_TEXT: Record<string, string> = {
  ko: '사진: Google Maps 기준 재편집',
  en: 'Photo: Google Maps (Retouched)',
  vi: 'Ảnh: Tái biên tập từ Google Maps',
  zh: '图片：根据Google Maps重新编辑',
  ja: '写真：Google Maps基準で再編集',
  ru: 'Фото: Отредактировано на основе Google Maps',
  hi: 'फ़ोटो: Google Maps के आधार पर संपादित',
}

export function EnrichedBusinessAccordions({
  business,
  menuData,
  locale = 'ko',
  cultureGuide,
  photos = [],
}: EnrichedBusinessAccordionsProps) {
  // 3개 섹션 기본은 모두 접힌 상태 (false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    menu: false,
    culture: false,
    photos: false,
  })

  // 사진 클릭 시 라이트박스 모달 상태
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sec]: !prev[sec],
    }))
  }

  const isKo = locale === 'ko'
  const isEn = locale === 'en'

  // 사진 캡션 헬퍼
  const getImageCaption = (url: string, index: number) => {
    if (url.includes('menu_01')) return isKo ? '셰프 추천 시그니처 메뉴판' : 'Chef’s Recommendations Menu'
    if (url.includes('menu_02')) return isKo ? '새우 & 랍스터 요리 메뉴판' : 'Shrimp & Lobster Dishes Menu'
    if (url.includes('menu_03')) return isKo ? '해산물 전골 핫팟 메뉴판' : 'Seafood Hotpot Menu'
    if (url.includes('menu_04')) return isKo ? '해산물 패밀리/커플 콤보 메뉴판' : 'Seafood Combo Sets Menu'
    if (url.includes('menu_05')) return isKo ? '함닌 꽃게 & 조개 가리비 찜 한 상' : 'Steamed Ham Ninh Crab & Shellfish Platter'
    if (url.includes('menu_06')) return isKo ? '자연산 활 랍스터 버터갈릭 구이' : 'Grilled Lobster with Garlic Butter'
    if (url.includes('menu_07')) return isKo ? '푸꾸옥 함닌 자연산 꽃게 요리' : 'Wild Ham Ninh Flower Crab'
    if (url.includes('menu_08')) return isKo ? '푸꾸옥 대표 해산물 모둠 요리' : 'Phu Quoc Signature Seafood Platter'
    if (url.includes('menu_09')) return isKo ? '살아있는 활 랍스터 및 해산물 수족관' : 'Live Seafood & Lobster Tanks'
    if (url.includes('menu_10')) return isKo ? '선셋타운 바다 전망 야외 테라스 다이닝' : 'Sunset Sea View Outdoor Dining Terrace'
    return isKo ? `사진 ${index + 1}` : `Photo ${index + 1}`
  }

  // 문화 가이드 텍스트 (다국어 지원: locale이 ko면 최상위 필드, 그 외는 translations[locale] 우선)
  const locGuide = locale === 'ko'
    ? cultureGuide
    : (cultureGuide?.translations?.[locale] || cultureGuide)

  const foodStyle =
    (typeof locGuide?.food_style === 'string'
      ? locGuide.food_style
      : locGuide?.food_style?.[locale] || cultureGuide?.food_style?.ko || cultureGuide?.food_style) || ''

  const cultureStory =
    (typeof locGuide?.culture_story === 'string'
      ? locGuide.culture_story
      : locGuide?.culture_story?.[locale] || cultureGuide?.culture_story?.ko || cultureGuide?.culture_story) || ''

  const sauceGuideTitle =
    (typeof locGuide?.sauce_guide === 'string'
      ? locGuide.sauce_guide
      : locGuide?.sauce_guide?.[locale] || cultureGuide?.sauce_guide?.ko || cultureGuide?.sauce_guide) || ''

  const sauceDetails =
    (typeof locGuide?.sauce_details === 'string'
      ? locGuide.sauce_details
      : locGuide?.sauce_details?.[locale] || cultureGuide?.sauce_details?.ko || cultureGuide?.sauce_details) || ''

  const rawEatingTips = locGuide?.eating_tips || cultureGuide?.eating_tips || []
  const eatingTips = typeof rawEatingTips === 'string' ? [{ desc_ko: rawEatingTips, desc_en: rawEatingTips }] : rawEatingTips

  // 수정 1 & 수정 2: 고객용 메뉴 요약줄 계산 (Grade 문자열 완전 제거)
  const getMenuSummaryText = () => {
    if (!menuData || menuData.totalItems === 0) {
      return isKo ? '대표 메뉴 현장 확인 · 가격 미확인' : 'Representative Menu · Price Unconfirmed'
    }
    const hasPrices = menuData.sections?.some(s => s.items?.some(i => i.price_vnd !== null || (i.price_text && !i.price_text.includes('미확인'))))
    const total = menuData.totalItems
    if (hasPrices) {
      return isKo ? `메뉴 ${total}개 확인 · 가격 포함` : `${total} items verified · Official prices`
    } else {
      return isKo ? `대표 메뉴 ${total}개 확인 · 가격 미확인` : `${total} dishes verified · Price unconfirmed`
    }
  }

  const menuSummary = getMenuSummaryText()

  return (
    <div className="enrichedAccordionWrapper" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* ========================================================= */}
      {/* 1. 메뉴 & 가격 아코디언 */}
      {/* ========================================================= */}
      <section
        className={`accordionCard ${openSections.menu ? 'isOpen' : ''}`}
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
        }}
      >
        <button
          type="button"
          onClick={() => toggleSection('menu')}
          aria-expanded={openSections.menu}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🍽️</span>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.01em',
                }}
              >
                {SECTION_TITLES.menu[locale] || SECTION_TITLES.menu.en}
              </h2>
              <span style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px', display: 'block' }}>
                {menuSummary}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: openSections.menu ? '#0B7A8A' : '#6b7280',
                background: openSections.menu ? '#E6F4F6' : '#f3f4f6',
                padding: '4px 10px',
                borderRadius: '999px',
              }}
            >
              {openSections.menu ? (isKo ? '접기' : 'Close') : isKo ? '펼치기' : 'Expand'}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: openSections.menu ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>

        {openSections.menu && (
          <div
            style={{
              padding: '0 20px 22px 20px',
              borderTop: '1px solid #f3f4f6',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div style={{ marginTop: '16px' }}>
              <BusinessMenuSection
                menuData={menuData}
                locale={locale}
                menuImages={menuData?.menuImages}
              />
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 2. 이 음식 알고 먹기 아코디언 */}
      {/* ========================================================= */}
      {cultureStory && (
        <section
          className={`accordionCard ${openSections.culture ? 'isOpen' : ''}`}
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={() => toggleSection('culture')}
            aria-expanded={openSections.culture}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>📖</span>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {SECTION_TITLES.culture[locale] || SECTION_TITLES.culture.en}
                </h2>
                {foodStyle && (
                  <span style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px', display: 'block' }}>
                    {foodStyle}
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: openSections.culture ? '#0B7A8A' : '#6b7280',
                  background: openSections.culture ? '#E6F4F6' : '#f3f4f6',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                {openSections.culture ? (isKo ? '접기' : 'Close') : isKo ? '펼치기' : 'Expand'}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: openSections.culture ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </button>

          {openSections.culture && (
            <div
              style={{
                padding: '16px 20px 24px 20px',
                borderTop: '1px solid #f3f4f6',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              {/* 특색 & 유래 소개글 */}
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  marginBottom: '18px',
                  border: '1px solid #edf2f7',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '14.5px',
                    lineHeight: '1.7',
                    color: '#374151',
                    wordBreak: 'keep-all',
                  }}
                >
                  {cultureStory}
                </p>
              </div>

              {/* 필수 소스 가이드 */}
              {sauceGuideTitle && (
                <div
                  style={{
                    border: '1px solid #e0f2fe',
                    background: '#f0f9ff',
                    borderRadius: '10px',
                    padding: '16px 18px',
                    marginBottom: '18px',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 8px 0',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#0369a1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>🍋</span> {sauceGuideTitle}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: '1.65',
                      color: '#334155',
                      wordBreak: 'keep-all',
                    }}
                  >
                    {sauceDetails}
                  </p>
                </div>
              )}

              {/* 맛있게 즐기는 팁 */}
              {eatingTips.length > 0 && (
                <div>
                  <h3
                    style={{
                      margin: '0 0 12px 0',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1f2937',
                    }}
                  >
                    {isKo ? '💡 현지인처럼 맛있게 먹는 법' : '💡 Tips to Enjoy Like a Local'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {eatingTips.map((tip: any, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          padding: '12px 14px',
                        }}
                      >
                        <h4
                          style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#111827',
                          }}
                        >
                          {tip[`title_${locale}`] || tip.title_ko || tip.title_en}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '13.5px',
                            color: '#4b5563',
                            lineHeight: '1.5',
                            wordBreak: 'keep-all',
                          }}
                        >
                          {tip[`desc_${locale}`] || tip.desc_ko || tip.desc_en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 3. 사진 더 보기 아코디언 */}
      {/* ========================================================= */}
      {photos.length > 0 && (
        <section
          className={`accordionCard ${openSections.photos ? 'isOpen' : ''}`}
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={() => toggleSection('photos')}
            aria-expanded={openSections.photos}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>📸</span>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {SECTION_TITLES.photos[locale] || SECTION_TITLES.photos.en}
                </h2>
                <span style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px', display: 'block' }}>
                  {isKo ? `총 ${photos.length}장의 실측 음식 & 메뉴판 사진` : `${photos.length} verified photos & menu boards`}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: openSections.photos ? '#0B7A8A' : '#6b7280',
                  background: openSections.photos ? '#E6F4F6' : '#f3f4f6',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                {openSections.photos ? (isKo ? '접기' : 'Close') : isKo ? '펼치기' : 'Expand'}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: openSections.photos ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </button>

          {openSections.photos && (
            <div
              style={{
                padding: '16px 20px 24px 20px',
                borderTop: '1px solid #f3f4f6',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              {/* 수정 3: 구글맵 캡처 출처 표기 안내줄 */}
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>ℹ️</span> {PHOTO_CREDIT_TEXT[locale] || PHOTO_CREDIT_TEXT.en}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '14px',
                }}
              >
                {photos.map((url, idx) => {
                  const caption = getImageCaption(url, idx)
                  const isMenuBoard = url.includes('menu_01') || url.includes('menu_02') || url.includes('menu_03') || url.includes('menu_04')
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage({ url, title: caption })}
                      style={{
                        position: 'relative',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        aspectRatio: isMenuBoard ? '3 / 4' : '4 / 3',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <img
                        src={url}
                        alt={caption}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: isMenuBoard ? 'contain' : 'cover',
                          background: isMenuBoard ? '#ffffff' : '#f3f4f6',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                          padding: '16px 10px 8px 10px',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '1.3',
                        }}
                      >
                        {caption}
                      </div>
                      {isMenuBoard && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(11, 122, 138, 0.9)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 7px',
                            borderRadius: '4px',
                          }}
                        >
                          {isKo ? '메뉴판' : 'Menu'}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 이미지 라이트박스 팝업 */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.15s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '85vh',
              background: '#000000',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.6)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                width: '36px',
                height: '36px',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
              }}
            />
            <div
              style={{
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '14px',
                textAlign: 'center',
                width: '100%',
                background: '#111827',
              }}
            >
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
