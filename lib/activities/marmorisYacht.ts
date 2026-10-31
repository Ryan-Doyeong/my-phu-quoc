/**
 * 남부 해양 액티비티 — Marmoris Yachting (파트너) 요트 2종
 * 출처: Marmoris 파트너 안내문 + 공식 일정·포함·취소·아동 정책 (2026-10-31 수령)
 * 보조: https://marmorisyacht.com/tours/phu-quoc-tropical-yachting-tour/ (사진)
 * 가격은 공개 정가(retail)만 기재. 파트너 매입가(net)는 공개 저장소에 절대 넣지 말 것.
 * en = 원문(영어) 기준, 그 외 언어는 en 사용 (ChatGPT 검수 대기)
 */
export type L = { ko: string; en: string }

export interface YachtStep {
  time: string
  title: L
  desc?: L
}

export interface YachtClass {
  name: L
  deck: L
  priceVnd: number
}

export interface YachtTour {
  id: 'tropical' | 'sunset'
  operator: string
  badge: L
  title: L
  hours: string
  facts: L[]
  tags: L[]
  classes: YachtClass[]
  images: string[]
  steps: YachtStep[]
  notes: L[]
}

const OCEAN = { ko: '오션 클래스', en: 'Ocean Class' }
const OCEAN_DECK = { ko: '하층 데크', en: 'Lower Deck' }
const SKY = { ko: '스카이 라운지', en: 'Sky Lounge' }
const SKY_DECK = { ko: 'VIP 데크', en: 'VIP Deck' }

const WEATHER: L = {
  ko: '기상 상황에 따라 일정이 조정될 수 있습니다.',
  en: 'The itinerary may be adjusted depending on weather conditions.',
}

export const MARMORIS_YACHT_TOURS: YachtTour[] = [
  {
    id: 'tropical',
    operator: 'Marmoris Yachting',
    badge: { ko: '오전 · 점심 BBQ', en: 'Morning · BBQ Lunch' },
    title: { ko: '트로피컬 요트 투어', en: 'Tropical Yachting Tour' },
    hours: '08:30 ~ 13:30',
    facts: [
      { ko: '약 5시간', en: 'About 5 hours' },
      { ko: '빈담 항 출발', en: 'Departs Vinh Dam Port' },
      { ko: '척당 최대 45명', en: 'Up to 45 guests per yacht' },
    ],
    tags: [
      { ko: '스노클링', en: 'Snorkeling' },
      { ko: 'SUP', en: 'SUP' },
      { ko: '낚시', en: 'Fishing' },
      { ko: '워터사이클', en: 'Water cycling' },
      { ko: 'BBQ 점심', en: 'BBQ Lunch' },
    ],
    classes: [
      { name: OCEAN, deck: OCEAN_DECK, priceVnd: 1950000 },
      { name: SKY, deck: SKY_DECK, priceVnd: 2450000 },
    ],
    images: [
      '/activities/marmoris/tropical-1.webp',
      '/activities/marmoris/tropical-2.webp',
      '/activities/marmoris/tropical-3.webp',
    ],
    steps: [
      { time: '08:30', title: { ko: '빈담 항 출발', en: 'Depart from Vinh Dam Port' } },
      { time: '08:30–09:45', title: { ko: '정박지로 크루즈', en: 'Cruise to the anchorage' }, desc: { ko: '날씨에 따라 혼러이 또는 혼즈어 정박', en: 'Hon Roi or Hon Dua, depending on weather conditions' } },
      { time: '10:00–11:30', title: { ko: '워터스포츠 즐기기', en: 'Enjoy exciting water sports activities' } },
      { time: '12:00', title: { ko: '요트 위 점심', en: 'Lunch on board' } },
      { time: '12:30–13:30', title: { ko: '빈담 항으로 복귀', en: 'Cruise back to Vinh Dam Port' }, desc: { ko: '투어 종료', en: 'Concluding the journey' } },
    ],
    notes: [WEATHER],
  },
  {
    id: 'sunset',
    operator: 'Marmoris Yachting',
    badge: { ko: '저녁 · 불꽃놀이 · DJ', en: 'Evening · Fireworks · DJ' },
    title: { ko: '선셋 칠링 요트 투어', en: 'Sunset Chilling Tour' },
    hours: '15:00 ~ 21:30',
    facts: [
      { ko: '빈담 항 출발', en: 'Departs Vinh Dam Port' },
      { ko: '키스브릿지 DJ·불꽃놀이', en: 'Kiss Bridge DJ & fireworks' },
      { ko: '척당 최대 45명', en: 'Up to 45 guests per yacht' },
    ],
    tags: [
      { ko: '일몰', en: 'Sunset' },
      { ko: 'BBQ 디너', en: 'BBQ Dinner' },
      { ko: '불꽃놀이', en: 'Fireworks' },
      { ko: 'DJ', en: 'DJ' },
      { ko: '스노클링', en: 'Snorkeling' },
      { ko: 'SUP', en: 'SUP' },
    ],
    classes: [
      { name: OCEAN, deck: OCEAN_DECK, priceVnd: 2250000 },
      { name: SKY, deck: SKY_DECK, priceVnd: 2750000 },
    ],
    images: [
      '/activities/marmoris/sunset-1.webp',
      '/activities/marmoris/sunset-2.webp',
      '/activities/marmoris/sunset-3.webp',
    ],
    steps: [
      { time: '15:00', title: { ko: '빈담 항 출발', en: 'Depart from Vinh Dam Port' } },
      { time: '16:00', title: { ko: '혼담응와이 정박지 도착', en: 'Arrive at the anchorage at Hon Dam Ngoai' } },
      { time: '16:00–17:30', title: { ko: '워터스포츠 즐기기', en: 'Enjoy exciting water sports activities' } },
      { time: '17:45', title: { ko: '푸꾸옥 일몰 감상', en: 'Admire the beautiful sunset over Phu Quoc' } },
      { time: '18:00', title: { ko: '요트 위 디너', en: 'Dinner on board' } },
      { time: '19:00', title: { ko: '키스브릿지로 이동, 라이브 DJ 공연', en: 'Cruise to Kiss Bridge for a live DJ performance' }, desc: { ko: '기상에 따라 변경될 수 있음', en: 'Schedule subject to change depending on weather conditions' } },
      { time: '19:45–20:00', title: { ko: '불꽃놀이 감상', en: 'Spectacular fireworks display' }, desc: { ko: '기상에 따라 변경될 수 있음', en: 'Schedule subject to change depending on weather conditions' } },
      { time: '20:00–21:30', title: { ko: '빈담 항으로 복귀', en: 'Cruise back to Vinh Dam Port' }, desc: { ko: '투어 종료', en: 'Concluding the journey' } },
    ],
    notes: [WEATHER],
  },
]

/* 두 투어 공통 */
export const YACHT_INCLUDED: L[] = [
  { ko: '즈엉동 시내 중심에서 선착장까지 왕복 이동', en: 'Round-trip transportation from your location in Duong Dong Town Center to the pier' },
  { ko: '환영 음료와 열대과일', en: 'Welcome drink and tropical fruits' },
  { ko: '맥주·청량음료·디톡스 음료 무제한', en: 'Unlimited beer, soft drinks, and detox beverages' },
  { ko: '스노클링, 낚시, 사진 촬영, SUP, 워터사이클, 수영', en: 'Snorkeling, fishing, photography, SUP, water cycling, swimming' },
  { ko: '요트 위 BBQ 점심/디너', en: 'BBQ lunch/dinner served on board' },
  { ko: '바텐더 서비스, DJ(오후 공유 투어)', en: 'Bartender service, DJ entertainment (shared afternoon tours)' },
]

export const YACHT_EXTRA_PAID: L[] = [
  { ko: '제트스키', en: 'Jet skiing' },
  { ko: '스쿠버다이빙', en: 'Scuba diving' },
  { ko: '견인식 튜브 어트랙션(바나나보트 등)', en: 'Towable inflatable rides' },
]

export const YACHT_EXCLUDED: L[] = [
  { ko: '패키지에 포함되지 않은 워터스포츠 및 선상 추가 비용', en: 'Water sports activities and any additional expenses on board not included in the package' },
  { ko: '외부 음식·음료 반입 시 추가요금', en: 'Surcharges for bringing outside food and beverages on board' },
  { ko: '시내 중심 밖 픽업·드롭 시 추가 교통비', en: 'Additional transportation charges for pick-up and drop-off outside the city center' },
]

export const YACHT_CANCELLATION: { title: L; rows: L[] }[] = [
  {
    title: { ko: '공유 투어', en: 'Shared tours' },
    rows: [
      { ko: '출발 48시간 전까지: 100% 환불', en: '48 hours or more before departure: 100% refund' },
      { ko: '출발 24시간 전까지: 50% 환불', en: '24 hours or more before departure: 50% refund' },
      { ko: '출발 24시간 이내: 환불 불가', en: 'Within 24 hours of departure: no refund' },
    ],
  },
  {
    title: { ko: '프라이빗 차터', en: 'Private charter' },
    rows: [
      { ko: '출발 7일 전까지: 100% 환불', en: '7 days or more before departure: 100% refund' },
      { ko: '출발 3~6일 전: 50% 환불', en: '3–6 days before departure: 50% refund' },
      { ko: '출발 48시간 이내: 환불 불가', en: 'Within 48 hours of departure: no refund' },
    ],
  },
]

export const YACHT_CANCEL_NOTE: L = {
  ko: '이용하지 않은 서비스는 환불되지 않습니다.',
  en: 'No refunds will be provided for unused services.',
}

export const YACHT_CHILD_POLICY: L[] = [
  { ko: '0~3세: 무료', en: 'Ages 0–3: complimentary' },
  { ko: '4세~11세 미만: 성인 요금의 50%', en: 'Ages 4 to under 11: 50% of the adult ticket price' },
  { ko: '11세 이상: 성인 요금', en: 'Ages 11 and above: adult ticket price' },
]
