/**
 * 남부 해양 액티비티 — Marmoris Yachting (파트너 후보) 요트 2종
 * 출처: https://marmorisyacht.com/tours/phu-quoc-tropical-yachting-tour/
 *       https://marmorisyacht.com/tours/phu-quoc-sunset-chilling-tour/
 * 수집일 2026-10-31. 가격·일정은 원문 그대로. "미확인" 항목은 파트너 확인 후 note 제거.
 * en = 원문(영어) 기준, 그 외 언어는 en 사용 (ChatGPT 검수 대기)
 */
export type L = { ko: string; en: string }

export interface YachtStep {
  time: string
  title: L
  desc?: L
}

export interface YachtTour {
  id: 'tropical' | 'sunset'
  operator: string
  badge: L
  title: L
  hours: string
  facts: L[]
  tags: L[]
  priceVnd: number
  images: string[]
  steps: YachtStep[]
  included: L[]
  extra: L
  notes: L[]
}

export const MARMORIS_YACHT_TOURS: YachtTour[] = [
  {
    id: 'tropical',
    operator: 'Marmoris Yachting',
    badge: { ko: '낮 · 점심 BBQ', en: 'Daytime · BBQ Lunch' },
    title: { ko: '트로피컬 요트 투어', en: 'Tropical Yachting Tour' },
    hours: '09:00 ~ 14:00',
    facts: [
      { ko: '매일 운영', en: 'Daily' },
      { ko: '감기섬 방문', en: 'Gam Ghi Island' },
    ],
    tags: [
      { ko: '스노클링', en: 'Snorkeling' },
      { ko: 'SUP', en: 'SUP' },
      { ko: '낚시', en: 'Fishing' },
      { ko: '씨바이크', en: 'Sea Cycling' },
      { ko: '워터슬라이드', en: 'Inflatable Slide' },
      { ko: 'BBQ 점심', en: 'BBQ Lunch' },
    ],
    priceVnd: 2990000,
    images: [
      '/activities/marmoris/tropical-1.webp',
      '/activities/marmoris/tropical-2.webp',
      '/activities/marmoris/tropical-3.webp',
    ],
    steps: [
      { time: '09:00', title: { ko: '승선 환영', en: 'Welcome on board' }, desc: { ko: '크루 안내와 함께 승선', en: 'The crew warmly welcomes and guides guests onboard' } },
      { time: '09:00–09:45', title: { ko: '섬 주변 크루즈', en: 'Cruising around islands' }, desc: { ko: '샴페인·열대과일 제공', en: 'Champagne and tropical fruits are served onboard' } },
      { time: '09:45–10:45', title: { ko: '해변 자유시간', en: 'Free time on the beach' } },
      { time: '10:45–11:45', title: { ko: '스노클링·낚시·SUP 자유시간', en: 'Free time for snorkeling, fishing, SUP paddling' }, desc: { ko: '감기섬: SUP, 씨바이크, 수영', en: 'Gam Ghi Island: SUP paddling, sea cycling, swimming' } },
      { time: '11:45–13:00', title: { ko: '요트 BBQ 점심', en: 'BBQ lunch time on the yacht' }, desc: { ko: '프리미엄 요리', en: 'Savor premium dishes onboard' } },
      { time: '13:00–14:00', title: { ko: '선착장 복귀', en: 'Back to the pier' } },
    ],
    included: [
      { ko: '수영, 스노클링(장비 포함), 낚시, 씨바이크, 워터슬라이드, SUP', en: 'Swimming, snorkeling (gear included), fishing, sea cycling, inflatable slide, SUP' },
      { ko: '환영 샴페인, 열대과일, 프리미엄 뷔페 점심', en: 'Welcome champagne, tropical fruits, premium buffet lunch' },
      { ko: '맥주·청량음료·차·디톡스워터 무제한', en: 'Free-flow beer, soft drinks, tea, detox water' },
      { ko: '빈백·트램폴린, 미니바, 화장실, 와이파이, 수건, 구명조끼', en: 'Bean bag & trampoline, minibar, restrooms, Wi-Fi, towels, life jackets' },
    ],
    extra: {
      ko: '추가요금(선택): 제트스키 · 플라잉 바나나보트 · 스쿠버다이빙 각 690,000동',
      en: 'Optional extras: Jet ski · Flying banana boat · Scuba diving, 690,000 VND each',
    },
    notes: [
      { ko: '원문 상단은 08:30~13:30, 타임라인은 14:00까지로 표기됩니다. 확정 시간은 파트너 확인 중입니다.', en: 'Source header shows 08:30–13:30 while the timeline runs to 14:00. Final times are being confirmed with the partner.' },
    ],
  },
  {
    id: 'sunset',
    operator: 'Marmoris Yachting',
    badge: { ko: '저녁 · 불꽃놀이 · DJ', en: 'Evening · Fireworks · DJ' },
    title: { ko: '선셋 칠링 요트 투어', en: 'Sunset Chilling Tour' },
    hours: '15:00 ~ 20:30',
    facts: [
      { ko: '매일 운영', en: 'Daily' },
      { ko: '호텔 픽업 포함', en: 'Hotel transfer included' },
      { ko: '선셋타운 선착장', en: 'Sunset Town Pier' },
    ],
    tags: [
      { ko: '일몰', en: 'Sunset' },
      { ko: 'BBQ 디너', en: 'BBQ Dinner' },
      { ko: '불꽃놀이', en: 'Fireworks' },
      { ko: 'DJ 파티', en: 'DJ Party' },
      { ko: '스노클링', en: 'Snorkeling' },
      { ko: 'SUP', en: 'SUP' },
    ],
    priceVnd: 2990000,
    images: [
      '/activities/marmoris/sunset-1.webp',
      '/activities/marmoris/sunset-2.webp',
      '/activities/marmoris/sunset-3.webp',
    ],
    steps: [
      { time: '15:00', title: { ko: '승선 환영', en: 'Welcome on board' }, desc: { ko: '호텔 → 선셋타운 선착장 기사 이동', en: 'Driver transfer from your hotel to Sunset Town Pier' } },
      { time: '15:00–15:45', title: { ko: '섬 주변 크루즈', en: 'Cruising around islands' }, desc: { ko: '샴페인·열대과일 제공', en: 'Champagne and tropical fruits are served' } },
      { time: '15:45–16:45', title: { ko: '해변 자유시간', en: 'Free time on the beach' } },
      { time: '16:45–17:45', title: { ko: '스노클링·낚시·SUP 자유시간', en: 'Free time for snorkeling, fishing, SUP paddling' }, desc: { ko: '수영, 스노클링, 낚시, SUP, 일몰 사진', en: 'Swimming, snorkeling, fishing, SUP paddling & sunset photography' } },
      { time: '17:45–18:00', title: { ko: '바다 위 일몰', en: 'Sunset on the sea' } },
      { time: '18:00–19:00', title: { ko: '요트 BBQ 디너', en: 'BBQ dinner time on the yacht' }, desc: { ko: '프리미엄 요리', en: 'Savor premium dishes onboard' } },
      { time: '20:00–20:15', title: { ko: '불꽃놀이 & DJ 파티', en: 'Fireworks & DJ party' }, desc: { ko: '프리미엄 음향·조명', en: 'Premium sound and lighting systems over the night sea' } },
      { time: '20:15–20:30', title: { ko: '선셋타운 선착장 복귀', en: 'Back to Sunset Town Pier' } },
    ],
    included: [
      { ko: '수영, 스노클링(장비 포함), 낚시, 씨바이크, 워터슬라이드, SUP, DJ 파티', en: 'Swimming, snorkeling (gear included), fishing, sea cycling, inflatable slide, SUP, DJ party' },
      { ko: '환영 샴페인, 열대과일, 프리미엄 BBQ 디너', en: 'Welcome champagne, tropical fruits, premium BBQ dinner' },
      { ko: '맥주·청량음료·차·디톡스워터 무제한', en: 'Free-flow beer, soft drinks, tea, detox water' },
      { ko: '빈백·트램폴린, 미니바, 화장실, 와이파이, 수건, 구명조끼, 댄스플로어', en: 'Bean bag & trampoline, minibar, restrooms, Wi-Fi, towels, life jackets, dance floor' },
    ],
    extra: {
      ko: '추가요금(선택): 제트스키 · 플라잉 바나나보트 각 690,000동',
      en: 'Optional extras: Jet ski · Flying banana boat, 690,000 VND each',
    },
    notes: [
      { ko: '원문 상단은 15:00~20:00, 타임라인은 20:30까지이며 19:00~20:00 구간은 비어 있습니다. 확정 시간은 파트너 확인 중입니다.', en: 'Source header shows 15:00–20:00 while the timeline runs to 20:30, with no entry for 19:00–20:00. Final times are being confirmed with the partner.' },
    ],
  },
]
