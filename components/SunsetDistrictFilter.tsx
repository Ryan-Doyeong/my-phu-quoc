'use client'

import Link from 'next/link'
import { SUNSET_ZONES, SUNSET_ZONE_KEYS, zoneLabel, type SunsetZoneKey } from '@/lib/zones'
import { localePath, type Locale } from '@/lib/i18n/config'

interface SunsetDistrictFilterProps {
  locale?: Locale
  selectedZone?: SunsetZoneKey
  onSelectZone?: (zone: SunsetZoneKey) => void
  isInteractive?: boolean
  hidden?: boolean
}

/**
 * [업무 지시 · Claude] SUNSET TOWN 6 QUARTERS / Explore Sunset Town by District 섹션 숨김 처리
 * 사유: 거리명 기준 분류의 정확성이 미확인이고, 여행자는 거리 이름을 몰라 효용이 낮으며 정보가 너무 김.
 * 규칙: 코드와 데이터는 삭제 금지, 숨김 플래그(HIDE_SUNSET_DISTRICT_SECTION)로 화면에서만 숨김.
 * 복구 필요 시 아래 플래그를 false로 변경하면 즉시 원상 복구됩니다.
 */
export const HIDE_SUNSET_DISTRICT_SECTION = true

export function SunsetDistrictFilter({
  locale = 'en',
  selectedZone = 'all',
  onSelectZone,
  isInteractive = false,
  hidden = HIDE_SUNSET_DISTRICT_SECTION,
}: SunsetDistrictFilterProps) {
  if (hidden) {
    return null
  }

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
