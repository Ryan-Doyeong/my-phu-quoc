'use client'

import type { Locale } from '@/lib/i18n/config'
import { nearbyCopy } from '@/lib/nearbySort'

export type GeoStatus = 'idle' | 'loading' | 'active' | 'denied' | 'error'

/** "내 위치에서 가까운 순" 버튼 + 상태 안내. 상태/좌표는 부모가 가진다. */
export function NearbySortBar({
  locale,
  status,
  onRequest,
  activeMessage,
}: {
  locale: Locale
  status: GeoStatus
  onRequest: () => void
  activeMessage?: string
}) {
  const t = nearbyCopy(locale)
  return (
    <div style={{ margin: '0 0 16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 14px' }}>
      <button
        type="button"
        onClick={onRequest}
        disabled={status === 'loading'}
        style={{
          border: '1.5px solid #0A4F5C',
          borderRadius: '999px',
          padding: '11px 20px',
          minHeight: '44px',
          fontSize: '14px',
          fontWeight: 700,
          cursor: status === 'loading' ? 'wait' : 'pointer',
          background: status === 'active' ? '#0A4F5C' : '#fff',
          color: status === 'active' ? '#fff' : '#0A4F5C',
          boxShadow: '0 2px 8px rgba(10,79,92,.15)',
        }}
      >
        {status === 'loading' ? t.loading : t.button}
      </button>
      {status !== 'idle' && status !== 'loading' && (
        <span style={{ fontSize: '13px', lineHeight: 1.5, color: status === 'active' ? '#0B7A8A' : '#8a5a00' }}>
          {status === 'active' ? activeMessage ?? t.active : status === 'denied' ? t.denied : t.error}
        </span>
      )}
    </div>
  )
}
