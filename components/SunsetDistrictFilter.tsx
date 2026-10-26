'use client'

import Link from 'next/link'
import { SUNSET_ZONES, SUNSET_ZONE_KEYS, zoneLabel, type SunsetZoneKey } from '@/lib/zones'
import { localePath, type Locale } from '@/lib/i18n/config'

interface SunsetDistrictFilterProps {
  locale?: Locale
  selectedZone?: SunsetZoneKey
  onSelectZone?: (zone: SunsetZoneKey) => void
  isInteractive?: boolean
}

export function SunsetDistrictFilter({
  locale = 'en',
  selectedZone = 'all',
  onSelectZone,
  isInteractive = false,
}: SunsetDistrictFilterProps) {
  const isKo = locale === 'ko'

  return (
    <section className="sunsetDistrictSection">
      <div className="sunsetDistrictHeader">
        <span className="sunsetTownEyebrow">
          {isKo ? '선셋타운 6대 명품 구역' : 'Sunset Town 6 Quarters'}
        </span>
        <h2>{isKo ? '취향별 구역으로 만나는 선셋타운' : 'Explore Sunset Town by District'}</h2>
        <p>
          {isKo
            ? '소렌토, 아말피의 지중해 테라스부터 베니스의 낭만, 힐사이드 전망까지 한눈에 비교해 보세요.'
            : 'From cliffside terraces in Amalfi & Sorrento to romantic canals of Venice and Hillside panoramas.'}
        </p>
      </div>

      <div className="sunsetDistrictGrid">
        {SUNSET_ZONE_KEYS.filter((k) => k !== 'all').map((key) => {
          const info = SUNSET_ZONES[key]
          const isSelected = selectedZone === key
          const title = zoneLabel(key, locale)
          const desc = isKo ? info.descriptionKo : info.descriptionEn

          if (isInteractive && onSelectZone) {
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectZone(key)}
                className={`districtCard ${isSelected ? 'active' : ''}`}
              >
                <div className="districtCardTop">
                  <span className="districtBadge">{key.toUpperCase()}</span>
                  <span className="districtArrow">→</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="districtHighlights">
                  {info.highlights.map((h, i) => (
                    <span key={i}>{h}</span>
                  ))}
                </div>
              </button>
            )
          }

          return (
            <Link
              key={key}
              href={`${localePath(locale, '/directory/dining')}?zone=${key}`}
              className={`districtCard ${isSelected ? 'active' : ''}`}
            >
              <div className="districtCardTop">
                <span className="districtBadge">{key.toUpperCase()}</span>
                <span className="districtArrow">→</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="districtHighlights">
                {info.highlights.map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
            </Link>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Link
          href={localePath(locale, '/map')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #0B7A8A, #129BAE)',
            color: '#ffffff',
            fontSize: '14.5px',
            fontWeight: 800,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(11, 122, 138, 0.25)',
            transition: 'transform 0.2s',
          }}
        >
          <span>🗺️ {isKo ? '선셋타운 거리 & 12대 랜드마크 지도 탐색하기' : 'Explore Sunset Town Street & Landmark Map'}</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  )
}
