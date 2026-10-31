/**
 * 여행 일정 자동 생성기 — 공통 타입
 * 화면 문구는 ko(확정) / en(임시, 다른 언어 공통 대체)로 관리한다.
 */

export type L = { ko: string; en: string }

export type Region = 'south' | 'central' | 'north'
export type TimeBand = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'late'
export type Companion = 'kids' | 'parents' | 'couple' | 'friends' | 'solo'
export type Purpose = 'relax' | 'activity' | 'food' | 'photo' | 'shopping'
export type Pace = 'easy' | 'normal' | 'full'
export type StayPlan = 'auto' | 'south_only' | 'south_first' | 'central_first'
export type Tier = 'shared' | 'premium' | 'private'

export interface PlannerInput {
  /** 숙박 일수 (2~6) */
  nights: number
  /** 여행 시작일 (YYYY-MM-DD, 선택) */
  startDate: string
  arrival: TimeBand
  departure: TimeBand
  stayPlan: StayPlan
  companion: Companion
  purposes: Purpose[]
  pace: Pace
  adults: number
  children: number
  /** 북부(테마파크·사파리 방면) 당일 다녀오기 */
  northTrip: boolean
}

export type ProductKind = 'service' | 'tour' | 'ticket' | 'activity'

export interface Product {
  id: string
  kind: ProductKind
  /** direct = 마이 푸꾸옥 직접 운영, partner = 제휴 업체 연결 */
  operator: 'direct' | 'partner'
  name: L
  summary: L
  duration?: L
  /** 등급이 있는 상품만 */
  tiers?: Tier[]
  tierNotes?: Partial<Record<Tier, L>>
  /**
   * 가격 — 공란(null)이면 화면에 "가격 문의"로 표시된다.
   * key: 등급(shared/premium/private) 또는 base(등급 없는 상품)
   */
  price: Partial<Record<Tier | 'base', string | null>>
  /** 연결 업체명 — 공개 화면에는 노출하지 않음 (내부 메모용) */
  vendor: string | null
  /** 주의 문구 (면허·우기·확인 필요 등) */
  caution?: L
  /** 상세 소개 페이지가 있으면 경로 */
  link?: string
  /** true면 일정에 노출하지 않음 (업체 확정 전 준비 상품) */
  hidden?: boolean
}

export type ItemKind =
  | 'must' // 필수 이벤트
  | 'spot' // 추천 방문지
  | 'option' // 예약 가능한 옵션 상품
  | 'service' // 픽업·샌딩 등 서비스
  | 'move' // 이동
  | 'rest' // 휴식·자유
  | 'meal' // 식사

export interface PlanItem {
  key: string
  time: string
  kind: ItemKind
  title: L
  desc?: L
  region: Region
  productId?: string
  defaultTier?: Tier
  /** 같은 시간대에 바꿔 넣을 수 있는 다른 선택지 */
  alternatives?: PlanItem[]
  /** 확인 필요·주의 표시 */
  flags?: L[]
}

export interface PlanDay {
  index: number
  date: Date | null
  /** 그날 밤 숙박 지역 (마지막 날은 null) */
  sleepRegion: Region | null
  theme: L
  items: PlanItem[]
}

export interface StaySegment {
  region: Region
  nights: number
}

export interface Plan {
  days: PlanDay[]
  stays: StaySegment[]
  notes: L[]
  /** 이 일정에 포함된 예약 가능 상품 (기본 담기 후보) */
  productKeys: string[]
}
