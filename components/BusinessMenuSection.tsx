'use client'

import React, { useState } from 'react'
import type { BusinessMenuData } from '@/lib/menus'
import { GRADE_INFO } from '@/lib/menus'
import type { Locale } from '@/lib/i18n/config'
import { enrichDishDescription } from '@/lib/foodKnowledge'

interface BusinessMenuSectionProps {
  menuData: BusinessMenuData | null
  locale?: Locale
  menuImages?: { url: string; label: string }[]
}

function getItemCountText(count: number, locale: Locale): string {
  switch (locale) {
    case 'ko':
      return `${count}개 품목`
    case 'vi':
      return `${count} món`
    case 'zh':
      return `${count} 项`
    case 'ja':
      return `${count} 品`
    case 'ru':
      return `${count} поз.`
    case 'hi':
      return `${count} आइटम`
    default:
      return `${count} ${count === 1 ? 'item' : 'items'}`
  }
}

export function BusinessMenuSection({
  menuData,
  locale = 'ko',
  menuImages,
}: BusinessMenuSectionProps) {
  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  // 아코디언 상태 관리: 기본은 전부 접힌 상태 (null)
  // 클릭 시 해당 카테고리만 펼쳐짐 (이미 열려있는 것을 클릭하면 다시 접힘)
  const [openSectionIdx, setOpenSectionIdx] = useState<number | null>(null)

  const toggleSection = (idx: number) => {
    setOpenSectionIdx((prev) => (prev === idx ? null : idx))
  }

  const title = isKo
    ? '메뉴 & 가격 안내'
    : isVi
    ? 'Thực đơn & Bảng giá'
    : 'Menu & Prices'

  const eyebrow = isKo ? '메뉴' : isVi ? 'Thực đơn' : 'Menu'

  if (!menuData) {
    return (
      <section className="detailCard businessMenuCard unconfirmedBox" id="menu">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <div style={{ marginTop: '12px' }}>
          <span className="menuBadge gradeD">
            {isKo ? '메뉴 정보 준비 중' : isVi ? 'Đang cập nhật' : 'Menu Updating'}
          </span>
        </div>
        <p className="menuNote" style={{ marginTop: '12px' }}>
          {isKo
            ? '현재 온라인에 등록된 공식 메뉴판이 없습니다. 방문 시 현장에서 메뉴판을 확인해 주세요.'
            : isVi
            ? 'Chưa có thực đơn chính thức trực tuyến. Quý khách vui lòng kiểm tra trực tiếp tại quán.'
            : 'Official menu board is not yet registered online. Please check on site.'}
        </p>
      </section>
    )
  }

  const gradeInfo = GRADE_INFO[menuData.grade] || GRADE_INFO.C
  const gradeLabel = isKo ? gradeInfo.labelKo : gradeInfo.labelEn
  const gradeDesc = isKo ? gradeInfo.descKo : gradeInfo.descEn

  const noticeText = isKo
    ? '가격은 현장 사정 및 환율·물가 변동에 따라 상이할 수 있습니다. (2026-10 기준)'
    : isVi
    ? 'Giá có thể thay đổi tùy theo chương trình khuyến mãi hoặc thời điểm. (Tháng 10/2026)'
    : 'Prices may vary on site due to seasonal updates and inflation. (As of 2026-10)'

  return (
    <section className="detailCard businessMenuCard" id="menu">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>

      {/* 메뉴 출처 및 기준일 메타 정보 표기 (여행자 친화적 표기, 내부 관리 등급 문구 노출 금지) */}
      <div style={{ marginTop: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', color: '#527982', fontWeight: 600 }}>
          {isKo
            ? `메뉴 기준일: ${menuData.verifiedDate || '2026-10'}, 출처: ${menuData.sourcesSummary || '공식 메뉴판'}`
            : isVi
            ? `Cập nhật: ${menuData.verifiedDate || '10/2026'}, Nguồn: ${menuData.sourcesSummary || 'Thực đơn chính thức'}`
            : `Menu as of: ${menuData.verifiedDate || '2026-10'}, Source: ${menuData.sourcesSummary || 'Official Menu'}`}
        </span>
      </div>

      {/* Warning Notice */}
      <div
        style={{
          background: '#fef8ee',
          border: '1px solid #f2ddbe',
          borderRadius: '12px',
          padding: '10px 14px',
          fontSize: '13px',
          color: '#845318',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        <span>⚠️</span>
        <span>{noticeText}</span>
      </div>

      {menuData.isUnconfirmed && menuData.sections.length === 0 ? (
        <div className="unconfirmedNotice">
          <p>
            {isKo
              ? '공식 메뉴판 세부 항목을 수집 중입니다. 대표 메뉴는 현장 주문 시 확인해 주세요.'
              : isVi
              ? 'Đang cập nhật chi tiết các món ăn. Vui lòng kiểm tra khi đến quán.'
              : 'Detailed items are being verified. Please confirm on site.'}
          </p>
        </div>
      ) : (
        <div className="menuGroupsWrapper menuAccordionList">
          {menuData.sections.map((section, sIdx) => {
            const sectionTitle = isKo
              ? section.title_ko || section.title
              : isVi
              ? section.title_vi || section.title_en || section.title
              : section.title_en || section.title

            const isOpen = openSectionIdx === sIdx
            const itemCount = section.items.length
            const itemCountLabel = getItemCountText(itemCount, locale)

            return (
              <div
                key={sIdx}
                className={`menuGroup menuAccordionItem ${isOpen ? 'menuAccordionOpen' : 'menuAccordionClosed'}`}
              >
                <button
                  type="button"
                  id={`menu-btn-${sIdx}`}
                  className="menuAccordionHeader"
                  onClick={() => toggleSection(sIdx)}
                  aria-expanded={isOpen}
                  aria-controls={`menu-panel-${sIdx}`}
                >
                  <div className="menuAccordionTitleWrap">
                    <span className="menuAccordionTitle">{sectionTitle}</span>
                    {sIdx === 0 && <span className="menuBadge best">SIGNATURE</span>}
                  </div>
                  <div className="menuAccordionMetaWrap">
                    <span className="menuItemCountBadge">{itemCountLabel}</span>
                    <span className={`menuAccordionChevron ${isOpen ? 'isExpanded' : ''}`} aria-hidden="true">
                      ▾
                    </span>
                  </div>
                </button>

                {/* HTML에 항상 렌더링되어 검색엔진(SEO)이 읽을 수 있으며 접힘 상태에 따라 CSS로 표시 제어 */}
                <div
                  id={`menu-panel-${sIdx}`}
                  role="region"
                  aria-labelledby={`menu-btn-${sIdx}`}
                  className={`menuAccordionPanel ${isOpen ? 'panelVisible' : 'panelHidden'}`}
                >
                  <ul className="menuItems">
                    {section.items.map((item, iIdx) => {
                      // 접속 언어 1개로만 단일 명칭 노출 (혼란 및 번잡함 제거)
                      const primaryName = isKo
                        ? item.name_ko || item.name_original
                        : isVi
                        ? item.name_vi || item.name_original
                        : item.name_en || item.name_original

                      // 풍부한 일반적 음식 설명 보충 (접속 언어 1개로만 단일 제공)
                      const enriched = enrichDishDescription(
                        item.name_original,
                        item.name_ko,
                        item.description_ko || null,
                        item.description_original || null
                      )
                      const displayDesc = isKo
                        ? enriched.descKo
                        : isVi
                        ? item.description_original || enriched.descEn
                        : enriched.descEn

                      return (
                        <li key={iIdx} className="menuItem">
                          <div className="menuItemHead">
                            <div className="menuItemName">
                              <strong>{primaryName}</strong>
                            </div>
                            <span className="menuPrice">
                              {item.price_vnd !== null
                                ? `${item.price_vnd.toLocaleString()} `
                                : item.price_text || (isKo ? '가격 미확인' : isVi ? 'Chưa rõ giá' : 'Unconfirmed ')}
                              {item.price_vnd !== null && <small>VND</small>}
                            </span>
                          </div>

                          {displayDesc && (
                            <div className="menuDesc">
                              <div>{displayDesc}</div>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}

          {menuData.grade !== 'A' && (
            <div className="menuPartialNotice" style={{ marginTop: '20px', fontSize: '12.5px' }}>
              <small>
                {isKo
                  ? '※ 본 매장은 주요 대표 메뉴 및 가격대가 등록되어 있습니다. 전체 메뉴 및 계절 특선은 매장 방문 시 확인하실 수 있습니다.'
                  : isVi
                  ? '※ Đây là danh sách các món đặc trưng đã xác thực. Quý khách vui lòng xem toàn bộ thực đơn tại quán.'
                  : '※ Representative menu items and prices are verified. Full menu available on site.'}
              </small>
            </div>
          )}
        </div>
      )}

      {/* Menu boards (원본 메뉴판 이미지 갤러리 섹션) */}
      {menuImages && menuImages.length > 0 && (
        <div className="menuFiles">
          <h3>{isKo ? '실측 메뉴판 이미지' : isVi ? 'Hình ảnh bảng giá thực tế' : 'Menu Boards'}</h3>
          <div className="menuFileGrid">
            {menuImages.map((img, idx) => (
              <a
                key={idx}
                href={img.url}
                target="_blank"
                rel="noreferrer"
                className="menuFile"
              >
                <img
                  src={img.url}
                  alt={`Menu board ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                />
                <span>{img.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Footer verification note */}
      <p className="menuNote">
        {isKo ? '메뉴 기준일' : isVi ? 'Ngày cập nhật' : 'Menu updated'}: {menuData.verifiedDate} ·{' '}
        {isKo ? '출처' : isVi ? 'Nguồn' : 'Source'}: {menuData.sourcesSummary}
      </p>
    </section>
  )
}
