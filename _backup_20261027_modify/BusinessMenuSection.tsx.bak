'use client'

import React from 'react'
import type { BusinessMenuData } from '@/lib/menus'
import { GRADE_INFO } from '@/lib/menus'
import type { Locale } from '@/lib/i18n/config'
import { enrichDishDescription } from '@/lib/foodKnowledge'

interface BusinessMenuSectionProps {
  menuData: BusinessMenuData | null
  locale?: Locale
  menuImages?: { url: string; label: string }[]
}

export function BusinessMenuSection({
  menuData,
  locale = 'ko',
  menuImages,
}: BusinessMenuSectionProps) {
  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

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
            {isKo ? 'Grade D · 미확인' : isVi ? 'Hạng D · Chưa xác nhận' : 'Grade D · Unconfirmed'}
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

      {/* Grade badge & Explanation */}
      <div style={{ marginTop: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span className={`menuBadge grade${menuData.grade}`}>{gradeLabel}</span>
        {menuData.totalItems > 0 && (
          <span style={{ fontSize: '13px', color: 'var(--muted, #6b7280)', fontWeight: 600 }}>
            {isKo
              ? `${menuData.totalItems}개 품목 실측 등록`
              : isVi
              ? `Đã xác thực ${menuData.totalItems} món`
              : `${menuData.totalItems} verified items`}
          </span>
        )}
      </div>

      <p style={{ fontSize: '13.5px', color: '#55655a', margin: '0 0 16px', lineHeight: 1.5 }}>
        {gradeDesc}
      </p>

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
        <div className="menuGroupsWrapper">
          {menuData.sections.map((section, sIdx) => {
            const sectionTitle = isKo
              ? section.title_ko || section.title
              : isVi
              ? section.title_vi || section.title_en || section.title
              : section.title_en || section.title

            return (
              <div key={sIdx} className="menuGroup">
                <h3>
                  <span>{sectionTitle}</span>
                  {sIdx === 0 && <span className="menuBadge best">SIGNATURE</span>}
                </h3>
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
