import React from 'react'
import type { Locale } from '@/lib/i18n/config'
import { SUNSET_TOWN_TICKETS } from '@/lib/tickets'
import { tUi } from '@/lib/i18n/uiStrings'

interface SunsetTownTicketsProps {
  locale?: Locale
}

const UI_TEXT = {
  sectionEyebrow: {
    en: 'ATTRACTIONS & KLOOK TICKETS',
    vi: 'ĐIỂM ĐẾN & VÉ KLOOK',
    hi: 'आकर्षण और KLOOK टिकट',
    zh: '景点与 KLOOK 特惠门票',
    ru: 'РАЗВЛЕЧЕНИЯ И БИЛЕТЫ KLOOK',
    ko: '어트랙션 & KLOOK 예매 안내',
    ja: 'アトラクション＆KLOOK チケット',
  },
  sectionTitle: {
    en: 'Sunset Town & Sun World Attractions',
    vi: 'Điểm Đến & Trò Chơi Tại Sunset Town',
    hi: 'सनसेट टाउन और सन वर्ल्ड आकर्षण',
    zh: '日落小镇与太阳世界核心游乐',
    ru: 'Развлечения в Сансет-Тауне и Sun World',
    ko: '선셋타운 & 썬월드 핵심 어트랙션 할인 예매',
    ja: 'サンセットタウン＆サンワールド主要アトラクション',
  },
  sectionDesc: {
    en: 'Compare official gate prices with Klook discounted rates for the top sights in South Phu Quoc. (Verified: October 2026)',
    vi: 'So sánh giá vé niêm yết và giá ưu đãi Klook cho các điểm tham quan nổi tiếng nhất phía Nam đảo. (Cập nhật: Tháng 10/2026)',
    hi: 'दक्षिण फू क्वोक के शीर्ष स्थलों के लिए आधिकारिक कीमतों की Klook छूट से तुलना करें। (सत्यापन: अक्टूबर 2026)',
    zh: '对比富国岛南部最热门景点的现场官方价与 Klook 在线优惠价。（核实日期：2026年10月）',
    ru: 'Сравните официальные цены с тарифами Klook со скидкой для лучших мест юга Фукуока. (Проверено: октябрь 2026)',
    ko: '현장 매표소 정가와 온라인 할인 혜택, 관람 안내를 비교 확인하세요. (기준일: 2026년 10월)',
    ja: '現地窓口価格とKlook割引価格を比較して、お得に南フーコックを満喫。（確認日：2026年10月）',
  },
  klookBadge: {
    en: 'Klook Discount',
    vi: 'Ưu đãi Klook',
    hi: 'Klook छूट',
    zh: 'Klook 特惠',
    ru: 'Цена Klook',
    ko: 'Klook 특가',
    ja: 'Klook割引価格',
  },
  officialGate: {
    en: 'Gate Price:',
    vi: 'Giá tại quầy:',
    hi: 'गेट मूल्य:',
    zh: '现场原价:',
    ru: 'В кассе:',
    ko: '현장 정가:',
    ja: '窓口定価:',
  },
  bookOnKlook: {
    en: 'Check & Book on Klook →',
    vi: 'Đặt Vé Trên Klook →',
    hi: 'Klook पर बुक करें →',
    zh: '前往 Klook 预订 →',
    ru: 'Забронировать на Klook →',
    ko: 'Klook 할인가로 예매하기 →',
    ja: 'Klookで予約する →',
  },
  officialSite: {
    en: 'Official Info',
    vi: 'Trang chính thức',
    hi: 'आधिकारिक जानकारी',
    zh: '官网详情',
    ru: 'Официальный сайт',
    ko: '선그룹 공식 안내',
    ja: '公式サイト案内',
  },
}

export function SunsetTownTickets({ locale = 'en' }: SunsetTownTicketsProps) {
  const t = (map: Record<Locale, string>) => map[locale] || map.en

  return (
    <section className="shell ticketSection" id="tickets" style={{ padding: '60px 20px', margin: '0 auto', maxWidth: 1200 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#0B7A8A',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {t(UI_TEXT.sectionEyebrow)}
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#12333B', margin: '0 0 12px' }}>
          {t(UI_TEXT.sectionTitle)}
        </h2>
        <p style={{ fontSize: '1rem', color: '#527982', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
          {t(UI_TEXT.sectionDesc)}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {SUNSET_TOWN_TICKETS.map((ticket) => {
          const name = t(ticket.name)
          const badge = t(ticket.badge)
          const features = ticket.features[locale] || ticket.features.en
          const tips = t(ticket.tips)

          return (
            <article
              key={ticket.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(11, 122, 138, 0.08)',
                border: '1px solid #E1ECEB',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img
                  src={ticket.imageUrl}
                  alt={name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: '#C86D2D',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 999,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  {badge}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: '#0B7A8A',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: 6,
                  }}
                >
                  {tUi(ticket.discount, locale)}
                </span>
              </div>

              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#12333B', margin: '0 0 12px' }}>
                  {name}
                </h3>

                <div
                  style={{
                    backgroundColor: '#F3F8F7',
                    padding: '12px 14px',
                    borderRadius: 10,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.8rem', color: '#0B7A8A', fontWeight: 700 }}>
                      {t(UI_TEXT.klookBadge)}
                    </span>
                    <div>
                      <strong style={{ fontSize: '1.25rem', color: '#C86D2D', fontWeight: 800 }}>
                        {locale === 'ko' ? ticket.klookPrice.krw : ticket.klookPrice.vnd}
                      </strong>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7D9D9F', marginTop: 4 }}>
                    {t(UI_TEXT.officialGate)}{' '}
                    <span style={{ textDecoration: 'line-through' }}>
                      {locale === 'ko' ? ticket.officialPrice.krw : ticket.officialPrice.vnd}
                    </span>
                  </div>
                </div>

                <ul style={{ margin: '0 0 16px', paddingLeft: 18, fontSize: '0.85rem', color: '#3A5B63', lineHeight: 1.5, flexGrow: 1 }}>
                  {features.map((f, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>{f}</li>
                  ))}
                </ul>

                <div
                  style={{
                    fontSize: '0.78rem',
                    backgroundColor: '#FDF7F2',
                    borderLeft: '3px solid #C86D2D',
                    padding: '8px 10px',
                    borderRadius: '0 6px 6px 0',
                    color: '#7C431B',
                    marginBottom: 20,
                    lineHeight: 1.4,
                  }}
                >
                  {tips}
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <a
                    href={ticket.klookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 2,
                      textAlign: 'center',
                      backgroundColor: '#0B7A8A',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: 8,
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {t(UI_TEXT.bookOnKlook)}
                  </a>
                  <a
                    href={ticket.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      backgroundColor: '#EBF4F3',
                      color: '#0B7A8A',
                      padding: '10px 8px',
                      borderRadius: 8,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    {t(UI_TEXT.officialSite)}
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <p style={{ marginTop: 24, textAlign: 'center', fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
        {locale === 'ko'
          ? 'ℹ️ ※ 티켓 요금, 운영 시간 및 포함 사항은 선월드(Sun World) 및 운영사의 현장 정책, 시즌 프로모션에 따라 변동될 수 있습니다. (검증 기준일: 2026년 10월)'
          : locale === 'vi'
          ? 'ℹ️ ※ Giá vé, lịch hoạt động và các dịch vụ đi kèm có thể thay đổi theo chính sách của Sun World và các đối tác. Đã xác minh tháng 10/2026.'
          : tUi('ℹ️  ※ Gate prices, operating schedules, and bundle inclusions are subject to change by Sun World and operating partners. Verified October 2026.', locale)}
      </p>
    </section>
  )
}
