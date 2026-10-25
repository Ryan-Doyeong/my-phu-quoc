'use client'

import React, { useState } from 'react'
import type { BusinessMenuData } from '@/lib/menus'
import { GRADE_INFO } from '@/lib/menus'
import type { Locale } from '@/lib/i18n/config'

function CollapsibleDishDescription({ text, isKo }: { text: string; isKo: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 80

  if (!isLong) {
    return <p className="dishDescription">{text}</p>
  }

  return (
    <div className="dishDescriptionWrapper">
      <p className={`dishDescription ${expanded ? 'isExpanded' : 'isClamped'}`}>{text}</p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="dishDescExpandBtn"
      >
        {expanded ? (isKo ? '접기 ▲' : 'Show less ▲') : (isKo ? '더 보기 ▼' : 'Show more ▼')}
      </button>
    </div>
  )
}

interface BusinessMenuSectionProps {
  menuData: BusinessMenuData | null
  locale?: Locale
}

export function BusinessMenuSection({ menuData, locale = 'en' }: BusinessMenuSectionProps) {
  const isKo = locale === 'ko'

  if (!menuData) {
    return (
      <section className="businessMenuSection unconfirmedBox">
        <div className="menuHeader">
          <div className="gradeBadgeRow">
            <span className="gradeBadge gradeD">Grade D · 미확인</span>
            <span className="menuStatusTag">현장 확인 필요</span>
          </div>
          <h3>{isKo ? '메뉴 및 가격 정보' : 'Menu & Pricing'}</h3>
        </div>
        <div className="unconfirmedNotice">
          <p>
            {isKo
              ? '현재 온라인에 등록된 공식 메뉴판이 없습니다. 방문 시 현장에서 메뉴판을 확인해 주세요.'
              : 'Official menu is not yet registered online. Please check on site.'}
          </p>
          <small className="priceDisclaimer">
            {isKo
              ? '※ 현장 사정 및 물가 변동에 따라 실제 가격과 다를 수 있습니다. (2026-10 기준)'
              : '※ Actual prices and availability may differ on site. (As of 2026-10)'}
          </small>
        </div>
      </section>
    )
  }

  const gradeInfo = GRADE_INFO[menuData.grade] || GRADE_INFO.C
  const gradeLabel = isKo ? gradeInfo.labelKo : gradeInfo.labelEn
  const gradeDesc = isKo ? gradeInfo.descKo : gradeInfo.descEn

  return (
    <section className="businessMenuSection">
      <div className="menuHeader">
        <div className="gradeBadgeRow">
          <span className={`gradeBadge grade${menuData.grade}`}>{gradeLabel}</span>
          {menuData.totalItems > 0 && (
            <span className="menuCountTag">
              {isKo ? `${menuData.totalItems}개 품목 등록됨` : `${menuData.totalItems} items listed`}
            </span>
          )}
        </div>
        <h3>{isKo ? '선셋타운 검증 메뉴판' : 'Verified Menu & Prices'}</h3>
        <p className="gradeExplanation">{gradeDesc}</p>
      </div>

      <div className="priceNoticeBanner">
        <span>⚠️</span>
        <p>
          {isKo
            ? '가격은 현장과 다를 수 있으며, 프로모션 및 시즌에 따라 변동될 수 있습니다. (2026-10 기준)'
            : 'Prices may differ on site and fluctuate by season or promotion. (As of 2026-10)'}
        </p>
      </div>

      {menuData.isUnconfirmed && menuData.sections.length === 0 ? (
        <div className="unconfirmedNotice">
          <p>
            {isKo
              ? '공식 메뉴판 세부 항목을 수집 중입니다. 대표 메뉴는 현장 주문 시 확인해 주세요.'
              : 'Detailed items are being collected. Please confirm on site.'}
          </p>
        </div>
      ) : (
        <div className="menuSectionsContainer">
          {menuData.sections.map((section, sIdx) => (
            <div key={sIdx} className="menuSectionBlock">
              <h4 className="menuSectionTitle">{section.title}</h4>
              <div className="menuItemsGrid">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="menuItemCard">
                    <div className="menuItemHeader">
                      <strong className="dishName">
                        {isKo && item.name_ko ? item.name_ko : item.name_original}
                      </strong>
                      <span className="dishPrice">
                        {item.price_vnd !== null
                          ? `${item.price_vnd.toLocaleString()} VND`
                          : item.price_text || (isKo ? '가격 미확인' : 'Unconfirmed')}
                      </span>
                    </div>

                    {isKo && item.name_ko && item.name_original !== item.name_ko && (
                      <span className="dishSubName">{item.name_original}</span>
                    )}

                    {(item.description_ko || item.description_original) && (
                      <CollapsibleDishDescription
                        text={
                          isKo && item.description_ko
                            ? item.description_ko
                            : item.description_original || ''
                        }
                        isKo={isKo}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {menuData.grade !== 'A' && (
            <div className="menuPartialNotice">
              <small>
                {isKo
                  ? '※ 본 매장은 일부 주요 메뉴만 확인되었습니다. 전체 메뉴는 매장 방문 시 확인하실 수 있습니다.'
                  : '※ Only signature dishes are currently verified. Full menu available on site.'}
              </small>
            </div>
          )}
        </div>
      )}

      <div className="menuSourceFooter">
        <small>
          {isKo ? '출처' : 'Source'}: {menuData.sourcesSummary} ({menuData.verifiedDate})
        </small>
      </div>
    </section>
  )
}
