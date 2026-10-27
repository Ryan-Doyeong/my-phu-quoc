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

const PRACTICAL_LABELS = {
  businessType: {
    ko: '업종 및 카테고리',
    vi: 'Loại hình kinh doanh',
    en: 'Business type',
    zh: '商家类型与分类',
    ru: 'Тип заведения и категория',
    ja: '業種・カテゴリー',
    hi: 'व्यवसाय का प्रकार और श्रेणी',
  },
  services: {
    ko: '서비스 및 편의',
    vi: 'Dịch vụ & Tiện ích',
    en: 'Services & Dining',
    zh: '服务与便利设施',
    ru: 'Услуги и удобства',
    ja: 'サービス・利便設備',
    hi: 'सेवाएँ और सुविधाएँ',
  },
  updated: {
    ko: '정보 업데이트',
    vi: 'Cập nhật thông tin',
    en: 'Details updated',
    zh: '信息更新',
    ru: 'Обновление информации',
    ja: '情報更新',
    hi: 'जानकारी अपडेट',
  },
  sourceDefault: {
    ko: '선셋타운 시설 안내 DB',
    vi: 'Dữ liệu thông tin Thị trấn Hoàng Hôn',
    en: 'Sunset Town Directory DB',
    zh: '日落小镇设施信息数据库',
    ru: 'База данных объектов Сансет-Тауна',
    ja: 'サンセットタウン施設案内データベース',
    hi: 'सनसेट टाउन की सुविधाओं का डेटाबेस',
  },
  claimNotice: {
    ko: '본 정보는 여행자와 지역 주민을 위해 공개된 데이터를 종합한 것입니다. 매장 점주나 관리자는 언제든지 정보 수정 또는 페이지 관리를 요청하실 수 있습니다.',
    vi: 'Thông tin được tổng hợp từ dữ liệu công khai phục vụ du khách. Chủ cơ sở kinh doanh có thể yêu cầu xác nhận quyền quản lý hoặc cập nhật thông tin bất cứ lúc nào.',
    en: 'Summarized from public information for visitors. Business owners or managers may request listing claims, updates, or edits at any time.',
    zh: '本信息汇总了面向游客和当地居民的公开数据。商家店主或管理人员可随时申请修改信息或管理页面。',
    ru: 'Эта информация составлена на основе общедоступных данных для туристов и местных жителей. Владельцы и управляющие заведений могут в любое время запросить изменение информации или управление страницей.',
    ja: 'この情報は、旅行者や地域住民向けに公開されているデータをまとめたものです。店舗のオーナーや管理者は、いつでも情報の修正やページ管理を申請できます。',
    hi: 'यह जानकारी यात्रियों और स्थानीय निवासियों के लिए सार्वजनिक रूप से उपलब्ध डेटा को संकलित करके तैयार की गई है। व्यवसाय के मालिक या प्रबंधक किसी भी समय जानकारी में बदलाव या पेज के प्रबंधन का अनुरोध कर सकते हैं।',
  },
  header: {
    zh: '基本信息',
    ru: 'Основная информация',
    ja: '基本情報',
    hi: 'बुनियादी जानकारी',
  },
  address: {
    zh: '地址',
    ru: 'Адрес',
    ja: '住所',
    hi: 'पता',
  },
  phone: {
    zh: '电话号码',
    ru: 'Телефон',
    ja: '電話番号',
    hi: 'फ़ोन नंबर',
  },
  hours: {
    zh: '营业时间',
    ru: 'Часы работы',
    ja: '営業時間',
    hi: 'खुलने का समय',
  },
  price: {
    zh: '价格区间',
    ru: 'Ценовая категория',
    ja: '価格帯',
    hi: 'मूल्य श्रेणी',
  },
  amenities: {
    zh: '便利设施',
    ru: 'Удобства',
    ja: '設備・アメニティ',
    hi: 'सुविधाएँ',
  },
  googleMaps: {
    zh: '在 Google 地图中查看',
    ru: 'Посмотреть на Google Картах',
    ja: 'Google マップで見る',
    hi: 'Google मैप्स पर देखें',
  },
  claimLink: {
    zh: '申请修改或管理此商家信息',
    ru: 'Запросить изменение или управление страницей заведения',
    ja: 'この店舗情報の修正・管理を申請',
    hi: 'इस व्यवसाय की जानकारी में बदलाव या प्रबंधन का अनुरोध करें',
  },
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

  const businessTypeLabel =
    (PRACTICAL_LABELS.businessType as Record<string, string>)[locale] || PRACTICAL_LABELS.businessType.en
  const servicesLabel =
    (PRACTICAL_LABELS.services as Record<string, string>)[locale] || PRACTICAL_LABELS.services.en
  const updatedLabel =
    (PRACTICAL_LABELS.updated as Record<string, string>)[locale] || PRACTICAL_LABELS.updated.en
  const sourceDefault =
    (PRACTICAL_LABELS.sourceDefault as Record<string, string>)[locale] || PRACTICAL_LABELS.sourceDefault.en

  const claimNotice =
    (PRACTICAL_LABELS.claimNotice as Record<string, string>)[locale] || PRACTICAL_LABELS.claimNotice.en

  return (
    <aside id="practical-info" className="detailCard stickyInfo practicalInfoCard">
      <h3>
        <span aria-hidden="true">📋</span>
        <span>
          {(PRACTICAL_LABELS.header as Record<string, string>)[locale] ||
            dict.business.practicalInfo ||
            (isVi ? 'Thông tin thực tế' : 'Practical information')}
        </span>
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
              <div className="practicalInfoLabel">
                {(PRACTICAL_LABELS.address as Record<string, string>)[locale] ||
                  dict.business.address ||
                  (isVi ? 'Địa chỉ' : 'Address')}
              </div>
              <div className="practicalInfoValue">{formatLocalizedAddress(b.address, locale)}</div>
            </div>
          </div>
        )}

        {/* 3. Phone */}
        {b.phone && (
          <div className="practicalInfoRow">
            <div className="practicalInfoIcon">📞</div>
            <div className="practicalInfoBody">
              <div className="practicalInfoLabel">
                {(PRACTICAL_LABELS.phone as Record<string, string>)[locale] ||
                  dict.business.phone ||
                  (isVi ? 'Số điện thoại' : 'Phone')}
              </div>
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
              <div className="practicalInfoLabel">
                {(PRACTICAL_LABELS.hours as Record<string, string>)[locale] ||
                  dict.business.hours ||
                  (isVi ? 'Giờ mở cửa' : 'Hours')}
              </div>
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
              <div className="practicalInfoLabel">
                {(PRACTICAL_LABELS.price as Record<string, string>)[locale] ||
                  dict.business.price ||
                  (isVi ? 'Mức giá' : 'Price level')}
              </div>
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
                  {(PRACTICAL_LABELS.amenities as Record<string, string>)[locale] ||
                    dict.business.amenities ||
                    (isVi ? 'Tiện nghi' : 'Amenities')}
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
          <span>
            {(PRACTICAL_LABELS.googleMaps as Record<string, string>)[locale] ||
              dict.business.viewOnGoogleMaps ||
              (isVi ? 'Xem trên Google Maps' : 'View on Google Maps')}
          </span>
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
          {((PRACTICAL_LABELS.claimLink as Record<string, string>)[locale] ||
            dict.business.claimListingLink ||
            (isVi ? 'Đăng ký quản lý hoặc chỉnh sửa trang' : 'Claim or update this listing'))} →
        </Link>
      </div>
    </aside>
  )
}
