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

const PRICE_ON_REQUEST: Record<string, string> = {
  ko: '현장 문의',
  vi: 'Giá tại quán',
  zh: '请向店家咨询价格',
  ru: 'Уточняйте цену на месте',
  ja: '料金は店舗にお問い合わせください',
  hi: 'कीमत के लिए मौके पर पूछें',
  en: 'Price on Request',
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

const MENU_TITLE: Record<string, string> = {
  ko: '메뉴 & 가격 안내',
  vi: 'Thực đơn & Bảng giá',
  en: 'Menu & Prices',
  zh: '菜单与价格信息',
  ru: 'Меню и цены',
  ja: 'メニュー・料金案内',
  hi: 'मेन्यू और कीमतों की जानकारी',
}

const MENU_EYEBROW: Record<string, string> = {
  ko: '메뉴',
  vi: 'Thực đơn',
  en: 'Menu',
  zh: '菜单',
  ru: 'Меню',
  ja: 'メニュー',
  hi: 'मेन्यू',
}

const MENU_UPDATING_BADGE: Record<string, string> = {
  ko: '메뉴 정보 준비 중',
  vi: 'Đang cập nhật',
  en: 'Menu Updating',
  zh: '菜单信息整理中',
  ru: 'Информация о меню готовится',
  ja: 'メニュー情報を準備中',
  hi: 'मेन्यू की जानकारी तैयार की जा रही है',
}

const MENU_EMPTY_NOTICE: Record<string, string> = {
  ko: '현재 온라인에 등록된 공식 메뉴판이 없습니다. 방문 시 현장에서 메뉴판을 확인해 주세요.',
  vi: 'Chưa có thực đơn chính thức trực tuyến. Quý khách vui lòng kiểm tra trực tiếp tại quán.',
  en: 'Official menu board is not yet registered online. Please check on site.',
  zh: '目前尚无在线发布的官方菜单。请到店查看菜单。',
  ru: 'Официальное меню пока не опубликовано онлайн. Пожалуйста, ознакомьтесь с ним на месте.',
  ja: '現在、公式メニューはオンラインに掲載されていません。ご来店時に店頭でご確認ください。',
  hi: 'फ़िलहाल आधिकारिक मेन्यू ऑनलाइन उपलब्ध नहीं है। कृपया वहाँ जाकर मेन्यू देखें।',
}

const MENU_NOTICE_TEXT: Record<string, string> = {
  ko: '가격은 현장 사정 및 환율·물가 변동에 따라 상이할 수 있습니다. (2026-10 기준)',
  vi: 'Giá có thể thay đổi tùy theo chương trình khuyến mãi hoặc thời điểm. (Tháng 10/2026)',
  en: 'Prices may vary on site due to seasonal updates and inflation. (As of 2026-10)',
  zh: '价格可能因现场情况、汇率及物价变化而有所不同。（截至2026-10）',
  ru: 'Цены на месте могут отличаться в зависимости от текущих условий, обменного курса и цен. (По состоянию на 2026-10)',
  ja: '価格は現地の状況や為替レート・物価の変動により異なる場合があります。（2026-10時点）',
  hi: 'स्थानीय परिस्थितियों, विनिमय दर और महँगाई में बदलाव के कारण कीमतें अलग हो सकती हैं। (2026-10 के अनुसार)',
}

const MENU_DETAILED_COLLECTING: Record<string, string> = {
  ko: '공식 메뉴판 세부 항목을 수집 중입니다. 대표 메뉴는 현장 주문 시 확인해 주세요.',
  vi: 'Đang cập nhật chi tiết các món ăn. Vui lòng kiểm tra khi đến quán.',
  en: 'Detailed items are being gathered. Please confirm on site.',
  zh: '正在收集官方菜单的详细信息。主要推荐菜品请在店内点餐时确认。',
  ru: 'Подробная информация из официального меню ещё собирается. Основные фирменные позиции уточняйте при заказе на месте.',
  ja: '公式メニューの詳細項目を収集中です。代表的なメニューは店頭でのご注文時にご確認ください。',
  hi: 'आधिकारिक मेन्यू की विस्तृत जानकारी जुटाई जा रही है। प्रमुख व्यंजनों की जानकारी ऑर्डर करते समय वहीं पुष्टि करें।',
}

const MENU_PARTIAL_NOTICE: Record<string, string> = {
  ko: '※ 본 매장은 주요 대표 메뉴 및 가격대가 등록되어 있습니다. 전체 메뉴 및 계절 특선은 매장 방문 시 확인하실 수 있습니다.',
  vi: '※ Đây là danh sách các món đặc trưng được ghi nhận. Quý khách vui lòng xem toàn bộ thực đơn tại quán.',
  en: '※ Representative menu items and prices are listed. Full menu available on site.',
  zh: '※ 本店已收录主要代表菜品及价格区间。完整菜单和季节限定菜品请到店查看。',
  ru: '※ Здесь указаны основные блюда и диапазон цен. Полное меню и сезонные предложения можно уточнить на месте.',
  ja: '※ この店舗の主な代表メニューと価格帯を掲載しています。全メニューや季節限定メニューはご来店時にご確認ください。',
  hi: '※ इस स्थान के प्रमुख व्यंजन और उनकी मूल्य सीमा दर्ज हैं। पूरा मेन्यू और मौसमी विशेष व्यंजन वहाँ जाकर देख सकते हैं।',
}

const SIGNATURE_BADGE: Record<string, string> = {
  ko: 'SIGNATURE',
  vi: 'SIGNATURE',
  en: 'SIGNATURE',
  zh: '招牌',
  ru: 'Фирменное',
  ja: 'シグネチャー',
  hi: 'सिग्नेचर',
}

function formatMenuMetaHeader(date: string, source: string, loc: string): string {
  switch (loc) {
    case 'ko':
      return `메뉴 기준일: ${date || '2026-10'}, 출처: ${source || '공식 메뉴판'}`
    case 'vi':
      return `Cập nhật: ${date || '10/2026'}, Nguồn: ${source || 'Thực đơn chính thức'}`
    case 'zh':
      return `菜单参考日期：${date || '2026-10'}，来源：${source || '官方菜单'}`
    case 'ru':
      return `Дата меню: ${date || '2026-10'}, источник: ${source || 'Официальное меню'}`
    case 'ja':
      return `メニュー基準日：${date || '2026-10'}、出典：${source || '公式メニュー'}`
    case 'hi':
      return `मेन्यू की संदर्भ तिथि: ${date || '2026-10'}, स्रोत: ${source || 'आधिकारिक मेन्यू'}`
    case 'en':
    default:
      return `Menu as of: ${date || '2026-10'}, Source: ${source || 'Official Menu'}`
  }
}

function formatMenuFooter(date: string, source: string, loc: string): string {
  switch (loc) {
    case 'ko':
      return `메뉴 기준일: ${date} · 출처: ${source}`
    case 'vi':
      return `Ngày cập nhật: ${date} · Nguồn: ${source}`
    case 'zh':
      return `菜单参考日期：${date} · 来源：${source}`
    case 'ru':
      return `Дата меню: ${date} · Источник: ${source}`
    case 'ja':
      return `メニュー基準日：${date} · 出典：${source}`
    case 'hi':
      return `मेन्यू की संदर्भ तिथि: ${date} · स्रोत: ${source}`
    case 'en':
    default:
      return `Menu updated: ${date} · Source: ${source}`
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

  const title = MENU_TITLE[locale] || MENU_TITLE.en
  const eyebrow = MENU_EYEBROW[locale] || MENU_EYEBROW.en

  if (!menuData) {
    return (
      <section className="detailCard businessMenuCard unconfirmedBox" id="menu">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <div style={{ marginTop: '12px' }}>
          <span className="menuBadge gradeD">
            {MENU_UPDATING_BADGE[locale] || MENU_UPDATING_BADGE.en}
          </span>
        </div>
        <p className="menuNote" style={{ marginTop: '12px' }}>
          {MENU_EMPTY_NOTICE[locale] || MENU_EMPTY_NOTICE.en}
        </p>
      </section>
    )
  }

  const gradeInfo = GRADE_INFO[menuData.grade] || GRADE_INFO.C
  const gradeLabel = isKo ? gradeInfo.labelKo : gradeInfo.labelEn
  const gradeDesc = isKo ? gradeInfo.descKo : gradeInfo.descEn

  const noticeText = MENU_NOTICE_TEXT[locale] || MENU_NOTICE_TEXT.en

  return (
    <section className="detailCard businessMenuCard" id="menu">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>

      {/* 메뉴 출처 및 기준일 메타 정보 표기 (여행자 친화적 표기, 내부 관리 등급 문구 노출 금지) */}
      <div style={{ marginTop: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', color: '#527982', fontWeight: 600 }}>
          {formatMenuMetaHeader(menuData.verifiedDate, menuData.sourcesSummary, locale)}
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
            {MENU_DETAILED_COLLECTING[locale] || MENU_DETAILED_COLLECTING.en}
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
                    {sIdx === 0 && <span className="menuBadge best">{SIGNATURE_BADGE[locale] || SIGNATURE_BADGE.en}</span>}
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
                                : item.price_text || (PRICE_ON_REQUEST[locale] || PRICE_ON_REQUEST.en)}
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
                {MENU_PARTIAL_NOTICE[locale] || MENU_PARTIAL_NOTICE.en}
              </small>
            </div>
          )}
        </div>
      )}

      {/* Menu boards (원본 메뉴판 이미지 갤러리 섹션) */}
      {menuImages && menuImages.length > 0 && (
        <div className="menuFiles">
          <h3>{isKo ? '메뉴판 이미지' : isVi ? 'Hình ảnh bảng giá thực tế' : 'Menu Boards'}</h3>
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
        {formatMenuFooter(menuData.verifiedDate, menuData.sourcesSummary, locale)}
      </p>
    </section>
  )
}
