'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryLabel } from '@/lib/directory'
import {
  BANKING_PLACES,
  BANKING_UI_STRINGS,
  type BankingItem,
} from '@/lib/banking'

interface BankingDirectoryProps {
  locale: Locale
}

function BankingCard({ item, locale }: { item: BankingItem; locale: Locale }) {
  const ui = BANKING_UI_STRINGS[locale] || BANKING_UI_STRINGS.en
  const name = item.name[locale] || item.name.en || item.name.ko
  const location = item.location[locale] || item.location.en || item.location.ko
  const googleMapsUrl = item.googleMapsUrl

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        boxSizing: 'border-box',
      }}
    >
      <div>
        {/* 상호명 */}
        <h3
          style={{
            margin: '0 0 6px 0',
            fontSize: '16px',
            fontWeight: 700,
            color: '#111827',
            letterSpacing: '-0.01em',
            lineHeight: 1.35,
          }}
        >
          {name}
        </h3>

        {/* 한 줄 위치 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#4B5563',
            marginBottom: item.type === 'atm' ? '10px' : '14px',
            lineHeight: 1.4,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, color: '#9CA3AF' }}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </div>

        {/* ATM 전용 카드 칩 줄 */}
        {item.type === 'atm' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              fontSize: '12px',
              marginBottom: '14px',
              paddingTop: '6px',
              borderTop: '1px dashed #F3F4F6',
            }}
          >
            <span style={{ color: '#6B7280', fontWeight: 500 }}>
              {ui.cardLabel}:
            </span>
            {item.cards && item.cards.length > 0 ? (
              item.cards.map((card) => (
                <span
                  key={card}
                  style={{
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  {card}
                </span>
              ))
            ) : (
              <span
                style={{
                  color: '#9CA3AF',
                  fontSize: '12px',
                  fontStyle: 'normal',
                }}
              >
                {ui.unconfirmed}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 구글맵 버튼 (CID 링크) */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          width: '100%',
          padding: '8px 12px',
          borderRadius: '6px',
          backgroundColor: '#F9FAFB',
          border: '1px solid #E5E7EB',
          color: '#2563EB',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          boxSizing: 'border-box',
          transition: 'background-color 0.15s ease, border-color 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#EFF6FF'
          e.currentTarget.style.borderColor = '#BFDBFE'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#F9FAFB'
          e.currentTarget.style.borderColor = '#E5E7EB'
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
        <span>{ui.googleMapsBtn}</span>
      </a>
    </div>
  )
}

export function BankingDirectory({ locale }: BankingDirectoryProps) {
  const dict = getDictionary(locale)
  const ui = BANKING_UI_STRINGS[locale] || BANKING_UI_STRINGS.en

  // 구역별 그룹핑 (비공개 private 항목 제외)
  const sunsetAtms = BANKING_PLACES.filter(
    (b) => b.zone === 'sunset-town' && b.type === 'atm' && b.status !== 'private'
  )
  const sunsetExchanges = BANKING_PLACES.filter(
    (b) => b.zone === 'sunset-town' && b.type === 'exchange' && b.status !== 'private'
  )

  const khemAtms = BANKING_PLACES.filter(
    (b) => b.zone === 'khem-beach' && b.type === 'atm' && b.status !== 'private'
  )
  const khemExchanges = BANKING_PLACES.filter(
    (b) => b.zone === 'khem-beach' && b.type === 'exchange' && b.status !== 'private'
  )

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* 헤더 네비게이션 */}
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
            <Link href={localePath(locale, '/hotels')}>
              {categoryLabel('hotels', locale)}
            </Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* 가로로 길고 얇은 띠 배너 (데스크톱 약 56~60px, 모바일 약 48px) */}
      <section
        style={{
          backgroundColor: '#FFF7ED',
          borderBottom: '1px solid #FFEDD5',
          padding: '12px 20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '8px 12px',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 800,
              color: '#9A3412',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {ui.bannerTitle}
          </h1>
          <span
            style={{
              fontSize: '13px',
              color: '#9A3412',
              opacity: 0.85,
              lineHeight: 1.2,
            }}
          >
            {ui.bannerSubtitle}
          </span>
        </div>
      </section>

      {/* 메인 리스트 컨테이너 (위아래 여백을 대폭 줄여 카드가 즉시 보이도록) */}
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '24px 20px 60px',
          boxSizing: 'border-box',
        }}
      >
        {/* ==================== 구역 1: 선셋타운 ==================== */}
        <section style={{ marginBottom: '40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingBottom: '10px',
              borderBottom: '2px solid #E5E7EB',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '21px',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.02em',
              }}
            >
              {ui.sunsetTownTitle}
            </h2>
          </div>

          {/* 선셋타운 ATM 3곳 */}
          {sunsetAtms.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '14px' }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {ui.atmSectionTitle(sunsetAtms.length)}
                </h3>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '14px',
                }}
              >
                {sunsetAtms.map((atm) => (
                  <BankingCard key={atm.id} item={atm} locale={locale} />
                ))}
              </div>
            </div>
          )}

          {/* 선셋타운 환전소 5곳 */}
          {sunsetExchanges.length > 0 && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {ui.exchangeSectionTitle(sunsetExchanges.length)}
                </h3>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '14px',
                }}
              >
                {sunsetExchanges.map((item) => (
                  <BankingCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ==================== 구역 2: 켐비치 ==================== */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingBottom: '10px',
              borderBottom: '2px solid #E5E7EB',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '21px',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.02em',
              }}
            >
              {ui.khemBeachTitle}
            </h2>
          </div>

          {/* 켐비치 ATM 1곳 */}
          {khemAtms.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '14px' }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {ui.atmSectionTitle(khemAtms.length)}
                </h3>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '14px',
                }}
              >
                {khemAtms.map((atm) => (
                  <BankingCard key={atm.id} item={atm} locale={locale} />
                ))}
              </div>
            </div>
          )}

          {/* 켐비치 환전소 1곳 */}
          {khemExchanges.length > 0 && (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {ui.exchangeSectionTitle(khemExchanges.length)}
                </h3>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '14px',
                }}
              >
                {khemExchanges.map((item) => (
                  <BankingCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
