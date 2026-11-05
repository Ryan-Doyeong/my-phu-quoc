import type { ReactNode } from 'react'

export type ServiceIconKey = 'buggy' | 'car-tour' | 'transfer' | 'activities'

const ICON_PATHS: Record<ServiceIconKey, ReactNode> = {
  // 버기(골프 카트): 지붕·기둥·좌석·차체·바퀴
  buggy: (
    <>
      <path d="M4.5 5.5h11" />
      <path d="M6 5.5V12M14.5 5.5V12" />
      <path d="M9 12V8.2h3V12" />
      <path d="M3 12h15.5l2.5 3.2v1.3H3z" />
      <circle cx="7.5" cy="18.6" r="1.9" />
      <circle cx="16.5" cy="18.6" r="1.9" />
    </>
  ),
  // 차량 투어(밴)
  'car-tour': (
    <>
      <path d="M3.5 16v-5.2l2.2-4h9.3l4.5 4V16" />
      <path d="M3 16h18" />
      <path d="M6 10.8h13" />
      <path d="M10.5 6.8v4" />
      <circle cx="7.5" cy="17.6" r="1.8" />
      <circle cx="16.5" cy="17.6" r="1.8" />
    </>
  ),
  // 택시·공항 이동(픽업 지점 핀)
  transfer: (
    <>
      <path d="M12 21s-6.2-5.4-6.2-10.2a6.2 6.2 0 0 1 12.4 0C18.2 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </>
  ),
  // 액티비티(요트)
  activities: (
    <>
      <path d="M12 3.5V16" />
      <path d="M12 4.5c3.8 1.9 5.8 5.6 5.8 9.5H12z" />
      <path d="M10 7.5 5.2 14H10" />
      <path d="M3 17h18l-2.4 3.5H5.4z" />
    </>
  ),
}

export function ServiceIcon({ name }: { name: ServiceIconKey }) {
  return (
    <svg
      className="mpqServiceIcon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}
