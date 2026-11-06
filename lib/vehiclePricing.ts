/**
 * 차량(택시·공항 이동·투어) 공시 요금표 — 마이푸꾸옥 택시/차량 투어 페이지용.
 * - 금액은 사이트 게시용 최종 요금(VND)만 기록한다. (업체 원가는 이 저장소에 두지 않는다.)
 * - 4인승 / 7인승 / 16인승 표, 구역은 남부·북부. (16인승은 업체 확인된 남부 노선만 게시)
 * - 라벨 문구는 lib/vehiclePricingCopy.ts 에서 언어별로 관리한다.
 */
export type VehicleRouteKey =
  | 'airportToSouth'
  | 'southToAirport'
  | 'southToCenterOneWay'
  | 'southToCenterRoundTrip'
  | 'southToNorthOneWay'
  | 'southToNorthRoundTrip'
  | 'southSightseeingTour'
  | 'airportToNorth'
  | 'northToAirport'
  | 'northToCenter'
  | 'northToSouthOneWay'
  | 'northToSouthRoundTrip'

export interface VehicleFareTable {
  seats: 4 | 7 | 16
  south: Partial<Record<VehicleRouteKey, number>>
  north: Partial<Record<VehicleRouteKey, number>>
  overtimePerHourVnd: number
}

export const VEHICLE_FARES: VehicleFareTable[] = [
  {
    seats: 4,
    south: {
      airportToSouth: 300_000,
      southToAirport: 300_000,
      southToCenterOneWay: 460_000,
      southToCenterRoundTrip: 810_000,
      southToNorthOneWay: 750_000,
      southToNorthRoundTrip: 1_380_000,
      southSightseeingTour: 810_000,
    },
    north: {
      airportToNorth: 520_000,
      northToAirport: 520_000,
      northToCenter: 350_000,
      northToSouthOneWay: 750_000,
      northToSouthRoundTrip: 1_380_000,
    },
    overtimePerHourVnd: 120_000,
  },
  {
    seats: 7,
    south: {
      airportToSouth: 410_000,
      southToAirport: 410_000,
      southToCenterOneWay: 520_000,
      southToCenterRoundTrip: 920_000,
      southToNorthOneWay: 810_000,
      southToNorthRoundTrip: 1_500_000,
      southSightseeingTour: 920_000,
    },
    north: {
      airportToNorth: 580_000,
      northToAirport: 580_000,
      northToCenter: 410_000,
      northToSouthOneWay: 810_000,
      northToSouthRoundTrip: 1_500_000,
    },
    overtimePerHourVnd: 120_000,
  },
  {
    seats: 16,
    south: {
      airportToSouth: 760_000,
      southToAirport: 760_000,
      southToCenterOneWay: 890_000,
      southSightseeingTour: 1_200_000,
    },
    north: {},
    overtimePerHourVnd: 120_000,
  },
]

/** 8시간 포함 왕복 패키지(초과 시 시간당 추가요금 적용) 구간 */
export const VEHICLE_ROUND_TRIP_KEYS: VehicleRouteKey[] = [
  'southToNorthRoundTrip',
  'northToSouthRoundTrip',
]

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('en-US')}₫`
}
