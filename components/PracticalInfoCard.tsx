import React from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { localePath, dateLocaleFor } from '@/lib/i18n/config'
import { getDictionary, translateTerm } from '@/lib/i18n/dictionaries'
import { formatLocalizedAddress } from '@/lib/directory'

interface PracticalInfoCardProps {
  business: any
  locale: Locale
  hours: [string, any][] | null
  nearbyText: string | null
}

export function PracticalInfoCard({
  business: b,
  locale,
  hours,
  nearbyText,
}: PracticalInfoCardProps) {
  const dict = getDictionary(locale)
  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  const lastUpdated = b.listing_checked_at || b.last_verified_at || b.updated_at
  const dateFormatted = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString(dateLocaleFor(locale), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '2026-10-25'

  const businessTypeLabel = isKo ? '업종 및 카테고리' : isVi ? 'Loại hình kinh doanh' : 'Business type'
  const servicesLabel = isKo ? '서비스 및 편의' : isVi ? 'Dịch vụ & Tiện ích' : 'Services & Dining'
  const updatedLabel = isKo ? '정보 업데이트' : isVi ? 'Cập nhật thông tin' : 'Details updated'
  const sourceDefault = isKo
    ? '선셋타운 시설 안내 DB'
    : isVi
    ? 'Dữ liệu thông tin Thị trấn Hoàng Hôn'
    : 'Sunset Town Directory DB'

  const claimNotice = isKo
    ? '본 정보는 여행자와 지역 주민을 위해 공개된 데이터를 종합한 것입니다. 매장 점주나 관리자는 언제든지 정보 수정 또는 페이지 관리를 요청하실 수 있습니다.'
    : isVi
    ? 'Thông tin được tổng hợp từ dữ liệu công khai phục vụ du khách. Chủ cơ sở kinh doanh có thể yêu cầu xác nhận quyền quản lý hoặc cập nhật thông tin bất cứ lúc nào.'
    : 'Summarized from public information for visitors. Business owners or managers may request listing claims, updates, or edits at any time.'

  return (
    <aside id="practical-info" className="detailCard stickyInfo practicalInfoCard">
      <h3>
        <span aria-hidden="true">📋</span>
        <span>{dict.business.practicalInfo || (isVi ? 'Thông tin thực tế' : 'Practical information')}</span>
      </h3>

      <div className="practicalInfoList">
        {/* 1. Business type */}
        <div className="practicalInfoRow">
          <div className="practicalInfoIcon">🍽️</div>
          <div className="practicalInfoBody">
            <div className="practicalInfoLabel">{businessTypeLabel}</div>
            <div className="practicalInfoValue">
              {b.subcategory
                ? translateTerm(b.subcategory, locale)
                : translateTerm(b.category || 'General', locale)}
              {nearbyText ? ` · ${nearbyText}` : ''}
            </div>
          </div>
        </div>

        {/* 2. Address */}
        {b.address && (
          <div className="practicalInfoRow">
            <div className="practicalInfoIcon">📍</div>
            <div className="practicalInfoBody">
              <div className="practicalInfoLabel">{dict.business.address || (isVi ? 'Địa chỉ' : 'Address')}</div>
              <div className="practicalInfoValue">{formatLocalizedAddress(b.address, locale)}</div>
            </div>
          </div>
        )}

        {/* 3. Phone */}
        {b.phone && (
          <div className="practicalInfoRow">
            <div className="practicalInfoIcon">📞</div>
            <div className="practicalInfoBody">
              <div className="practicalInfoLabel">{dict.business.phone || (isVi ? 'Số điện thoại' : 'Phone')}</div>
              <div className="practicalInfoValue">
                <a href={`tel:${b.phone.replace(/[^0-9+]/g, '')}`}>{b.phone}</a>
              </div>
            </div>
          </div>
        )}

        {/* 4. Hours */}
        {hours && hours.length > 0 && (
          <div className="practicalInfoRow">
            <div className="practicalInfoIcon">🕒</div>
            <div className="practicalInfoBody">
              <div className="practicalInfoLabel">{dict.business.hours || (isVi ? 'Giờ mở cửa' : 'Hours')}</div>
              <div className="practicalInfoValue">
                {hours.map(([d, h]) => (
                  <div key={d} style={{ fontSize: '13.5px', marginBottom: '2px' }}>
                    {String(d).toLowerCase() === 'raw' ? (
                      String(h)
                    ) : (
                      <>
                        <span style={{ fontWeight: 600, color: '#445149' }}>
                          {translateTerm(d, locale)}:
                        </span>{' '}
                        <span>{String(h)}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Price range */}
        {b.price_level && (
          <div className="practicalInfoRow">
            <div className="practicalInfoIcon">💰</div>
            <div className="practicalInfoBody">
              <div className="practicalInfoLabel">{dict.business.price || (isVi ? 'Mức giá' : 'Price level')}</div>
              <div className="practicalInfoValue">{b.price_level}</div>
            </div>
          </div>
        )}

        {/* 6. Services & Dining Style */}
        {Array.isArray(b.services) && b.services.length > 0 && (
          <div className="practicalInfoRow">
            <div className="practicalInfoIcon">🛵</div>
            <div className="practicalInfoBody">
              <div className="practicalInfoLabel">{servicesLabel}</div>
              <div className="practicalInfoValue" style={{ fontSize: '13.5px' }}>
                {b.services.map((s: string) => translateTerm(s, locale)).join(' · ')}
              </div>
            </div>
          </div>
        )}

        {/* 7. Amenities */}
        {b.amenities &&
          typeof b.amenities === 'object' &&
          Object.keys(b.amenities).length > 0 && (
            <div className="practicalInfoRow">
              <div className="practicalInfoIcon">💡</div>
              <div className="practicalInfoBody">
                <div className="practicalInfoLabel">
                  {dict.business.amenities || (isVi ? 'Tiện nghi' : 'Amenities')}
                </div>
                <div className="practicalInfoValue" style={{ fontSize: '13px' }}>
                  {Object.entries(b.amenities)
                    .map(
                      ([k, v]) =>
                        `${translateTerm(k.replaceAll('_', ' '), locale)}: ${translateTerm(
                          String(v),
                          locale
                        )}`
                    )
                    .join(' · ')}
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Google Maps Action Button */}
      {b.google_maps_url && (
        <a
          className="practicalMapBtn"
          href={b.google_maps_url}
          target="_blank"
          rel="noreferrer"
          data-analytics-type="business-map"
          data-analytics-id={b.id}
        >
          <span aria-hidden="true">🗺️</span>
          <span>{dict.business.viewOnGoogleMaps || (isVi ? 'Xem trên Google Maps' : 'View on Google Maps')}</span>
        </a>
      )}

      {/* Verification Notice */}
      <div className="practicalVerification">
        <span>
          🔎 {updatedLabel} {dateFormatted} · {b.source_label || b.source || sourceDefault}
        </span>
      </div>

      {/* Claim / Edit Listing Box */}
      <div className="practicalClaimBox">
        <p>ℹ️ {claimNotice}</p>
        <Link
          href={`${localePath(locale, '/for-businesses')}?public_name=${encodeURIComponent(
            b.public_name || ''
          )}&address=${encodeURIComponent(b.address || '')}#claim`}
        >
          {dict.business.claimListingLink || (isVi ? 'Đăng ký quản lý hoặc chỉnh sửa trang' : 'Claim or update this listing')} →
        </Link>
      </div>
    </aside>
  )
}
