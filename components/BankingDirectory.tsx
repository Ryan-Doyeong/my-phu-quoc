'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryLabel } from '@/lib/directory'
import {
  BANKING_ATMS,
  BANKING_EXCHANGES,
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
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <div>
        {/* 상호명 */}
        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '17px',
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
            fontSize: '13.5px',
            color: '#4B5563',
            marginBottom: item.type === 'atm' ? '12px' : '16px',
            lineHeight: 1.4,
          }}
        >
          <svg
            width="15"
            height="15"
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
              marginBottom: '16px',
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
                    fontSize: '11.5px',
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

      {/* 구글맵 버튼 (좌표 링크) */}
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
          padding: '9px 14px',
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
          width="14"
          height="14"
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

      {/* 단색 연한 오렌지 배너 */}
      <section
        style={{
          backgroundColor: '#FFF7ED',
          borderBottom: '1px solid #FFEDD5',
          padding: '36px 20px',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: 800,
              color: '#9A3412',
              letterSpacing: '-0.02em',
            }}
          >
            {ui.bannerTitle}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '15px',
              color: '#7C2D12',
              opacity: 0.9,
              lineHeight: 1.5,
            }}
          >
            {ui.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* 메인 리스트 컨테이너 */}
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '36px 20px 80px',
          boxSizing: 'border-box',
        }}
      >
        {/* 섹션 1: ATM 3곳 */}
        <section style={{ marginBottom: '44px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.015em',
              }}
            >
              {ui.atmSectionTitle}
            </h2>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#EA580C',
                backgroundColor: '#FFEDD5',
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              {BANKING_ATMS.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {BANKING_ATMS.map((atm) => (
              <BankingCard key={atm.id} item={atm} locale={locale} />
            ))}
          </div>
        </section>

        {/* 섹션 2: 환전소 5곳 */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.015em',
              }}
            >
              {ui.exchangeSectionTitle}
            </h2>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#EA580C',
                backgroundColor: '#FFEDD5',
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              {BANKING_EXCHANGES.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {BANKING_EXCHANGES.map((item) => (
              <BankingCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
