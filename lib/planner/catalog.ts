/**
 * 여행 일정 자동 생성기 — 상품·장소 카탈로그 (단일 설정 파일)
 *
 * ▣ 운영자 입력 안내 (공란 채우기)
 *   - price: null  → 화면에 "가격 문의"로 표시됩니다. 확정되면 '1,350,000₫' 처럼 VND로 적어 주세요.
 *   - vendor: null → 연결 업체명(내부 메모, 공개 화면 비노출).
 *   - 공연 시간·운영 시간 등 확인되지 않은 정보는 caution 문구로 "확인 필요"를 남겨 둡니다.
 *
 * ▣ 출처 메모 (2026-10-31 조사, 예약 전 공식 채널 재확인 필요)
 *   - 심포니 오브 더 씨: 선월드 안내 매일 19:30 시작
 *   - 키스 오브 더 씨: 21:00 시작 안내 다수, 화요일 휴무는 단일 출처(미확인)
 *   - 공항→선셋타운 약 25~30분, 즈엉동→안토이 약 40분
 */

import type { L, Product, Region, Tier } from './types'

export const REGION_LABEL: Record<Region, L> = {
  south: { ko: '남부', en: 'South' },
  central: { ko: '중부', en: 'Central' },
  north: { ko: '북부', en: 'North' },
}

export const REGION_DESC: Record<Region, L> = {
  south: { ko: '선셋타운·켐비치·안토이', en: 'Sunset Town · Khem Beach · An Thoi' },
  central: { ko: '즈엉동·롱비치', en: 'Duong Dong · Long Beach' },
  north: { ko: '테마파크·사파리 방면', en: 'Theme parks · Safari area' },
}

export const TIER_LABEL: Record<Tier, L> = {
  shared: { ko: '다수 탑승', en: 'Shared' },
  premium: { ko: '프리미엄', en: 'Premium' },
  private: { ko: '프라이빗', en: 'Private' },
}

export const TIER_DESC: Record<Tier, L> = {
  shared: { ko: '여러 팀이 함께 타는 조인 투어', en: 'Join-in tour with other guests' },
  premium: { ko: '소규모 인원, 여유 있는 좌석', en: 'Small group, more space' },
  private: { ko: '우리 일행만 이용', en: 'Just your group' },
}

export const PRODUCTS: Record<string, Product> = {
  airport_pickup: {
    id: 'airport_pickup',
    kind: 'service',
    operator: 'direct',
    name: { ko: '공항 픽업', en: 'Airport pick-up' },
    summary: {
      ko: '푸꾸옥 공항에서 숙소까지 전용 차량으로 모셔다 드려요.',
      en: 'Private car from Phu Quoc Airport to your hotel.',
    },
    duration: { ko: '남부까지 약 25~30분', en: 'About 25–30 min to the south' },
    price: { base: null },
    vendor: null,
  },
  airport_dropoff: {
    id: 'airport_dropoff',
    kind: 'service',
    operator: 'direct',
    name: { ko: '공항 샌딩', en: 'Airport drop-off' },
    summary: {
      ko: '체크아웃 후 숙소에서 공항까지 전용 차량으로 이동해요.',
      en: 'Private car from your hotel to the airport.',
    },
    duration: { ko: '남부 약 25~30분 · 중부 약 10~20분', en: 'South 25–30 min · Central 10–20 min' },
    price: { base: null },
    vendor: null,
  },
  buggy_tour: {
    id: 'buggy_tour',
    kind: 'tour',
    operator: 'direct',
    name: { ko: '버기 투어 (필수 사진 코스)', en: 'Buggy tour (photo course)' },
    summary: {
      ko: '정해진 코스와 시간대로, 숙련된 기사와 함께 선셋타운 포토 스팟을 돌아요.',
      en: 'Fixed route and schedule around Sunset Town photo spots with an experienced driver.',
    },
    duration: { ko: '코스·소요시간 업데이트 예정', en: 'Route & duration coming soon' },
    price: { base: null },
    vendor: null,
    link: '/buggy-tour',
  },
  car_tour: {
    id: 'car_tour',
    kind: 'tour',
    operator: 'direct',
    name: { ko: '차량 투어', en: 'Private car tour' },
    summary: {
      ko: '합리적인 가격, 친절한 기사와 함께 원하는 곳을 편하게 둘러봐요.',
      en: 'Comfortable private car with a friendly driver at a fair price.',
    },
    duration: { ko: '반일 · 종일 (업데이트 예정)', en: 'Half / full day (coming soon)' },
    price: { base: null },
    vendor: null,
    link: '/taxi-tour',
  },
  hopping: {
    id: 'hopping',
    kind: 'tour',
    operator: 'partner',
    name: { ko: '남부 섬 호핑 투어', en: 'South islands hopping' },
    summary: {
      ko: '안토이 항에서 출발해 남쪽 섬들을 돌며 스노클링과 해변 휴식을 즐겨요.',
      en: 'Depart An Thoi port to snorkel and relax around the southern islands.',
    },
    duration: { ko: '약 6~8시간 (오전 출발)', en: 'About 6–8 hours (morning start)' },
    tiers: ['shared', 'premium', 'private'],
    tierNotes: {
      shared: { ko: '대형 보트 조인 투어', en: 'Big boat, join-in' },
      premium: { ko: '소그룹 스피드보트', en: 'Small-group speedboat' },
      private: { ko: '전용 스피드보트', en: 'Private speedboat' },
    },
    price: { shared: null, premium: null, private: null },
    vendor: null,
    caution: {
      ko: '사진·영상 촬영, 추가 액티비티는 별도 요금일 수 있어요. 바다 상황에 따라 코스가 바뀔 수 있어요.',
      en: 'Photos/videos and extra activities may cost extra. Route depends on sea conditions.',
    },
  },
  squid_fishing: {
    id: 'squid_fishing',
    kind: 'tour',
    operator: 'partner',
    name: { ko: '선셋 오징어 낚시', en: 'Sunset squid fishing' },
    summary: {
      ko: '해 질 무렵 배를 타고 나가 오징어 낚시를 하고, 잡은 해산물을 배 위에서 맛봐요.',
      en: 'Head out at sunset to fish for squid and taste the catch on board.',
    },
    duration: { ko: '약 4시간 (17:00 전후 출발)', en: 'About 4 hours (around 17:00)' },
    tiers: ['shared', 'premium', 'private'],
    tierNotes: {
      shared: { ko: '여러 팀 함께 탑승', en: 'Shared boat' },
      premium: { ko: '소규모 탑승', en: 'Small group' },
      private: { ko: '전용 보트', en: 'Private boat' },
    },
    price: { shared: null, premium: null, private: null },
    vendor: null,
    caution: {
      ko: '우기(대략 5~11월)에는 출발지가 바뀌고 일몰이 안 보일 수 있어요. 어획량은 보장되지 않아요.',
      en: 'In the rainy season the pier may change and sunset may not be visible. Catch not guaranteed.',
    },
  },
  cruise_dinner: {
    id: 'cruise_dinner',
    kind: 'tour',
    operator: 'partner',
    name: { ko: '선셋 크루즈 디너', en: 'Sunset cruise dinner' },
    summary: {
      ko: '바다 위에서 일몰을 보며 저녁 식사를 즐기는 크루즈예요.',
      en: 'Dinner on the water while the sun sets.',
    },
    duration: { ko: '오후 출발 ~ 저녁 귀항 (상품별 상이)', en: 'Afternoon to evening (varies)' },
    tiers: ['shared', 'premium', 'private'],
    tierNotes: {
      shared: { ko: '스탠다드 좌석', en: 'Standard seating' },
      premium: { ko: 'VIP 좌석', en: 'VIP deck' },
      private: { ko: '전용 요트 디너', en: 'Private yacht dinner' },
    },
    price: { shared: null, premium: null, private: null },
    vendor: null,
  },
  ocean_activity: {
    id: 'ocean_activity',
    kind: 'activity',
    operator: 'partner',
    name: { ko: '해양 액티비티', en: 'Ocean activities' },
    summary: {
      ko: '패러세일링·제트스키·씨워킹·스쿠버 중 원하는 종목을 골라 즐겨요.',
      en: 'Parasailing, jet ski, sea walking or scuba — pick what you like.',
    },
    duration: { ko: '종목별 30분~반일', en: '30 min to half day' },
    price: { base: null },
    vendor: null,
  },
  cable_car: {
    id: 'cable_car',
    kind: 'ticket',
    operator: 'partner',
    name: { ko: '혼똔섬 케이블카 · 선월드', en: 'Hon Thom cable car · Sun World' },
    summary: {
      ko: '바다를 건너는 케이블카를 타고 혼똔섬 테마파크에서 하루를 보내요.',
      en: 'Ride the sea-crossing cable car and spend the day on Hon Thom island.',
    },
    duration: { ko: '반일~종일 · 운영시간 확인 필요', en: 'Half to full day · check opening hours' },
    price: { base: null },
    vendor: null,
  },
  massage: {
    id: 'massage',
    kind: 'service',
    operator: 'partner',
    name: { ko: '추천 마사지', en: 'Recommended massage' },
    summary: {
      ko: '이동과 물놀이로 지친 몸을 풀어 주는 마사지예요.',
      en: 'Relax after a day of travel and sea.',
    },
    duration: { ko: '60~120분', en: '60–120 min' },
    tiers: ['shared', 'premium'],
    tierNotes: {
      shared: { ko: '일반', en: 'Standard' },
      premium: { ko: '프리미엄', en: 'Premium' },
    },
    price: { shared: null, premium: null },
    vendor: null,
  },
  scooter: {
    id: 'scooter',
    kind: 'service',
    operator: 'partner',
    name: { ko: '스쿠터 렌트', en: 'Scooter rental' },
    summary: {
      ko: '중부에서 시장·해변·카페를 자유롭게 돌아보기 좋아요.',
      en: 'Explore markets, beaches and cafes freely around the centre.',
    },
    duration: { ko: '1일 단위', en: 'Per day' },
    price: { base: null },
    vendor: null,
    caution: {
      ko: '베트남에서는 국제운전면허 등 유효한 면허가 필요해요. 무면허 사고는 보험 처리가 어려울 수 있어요.',
      en: 'A valid licence (e.g. IDP) is required in Vietnam; insurance may not cover unlicensed riders.',
    },
  },
  morning_spa: {
    id: 'morning_spa',
    kind: 'service',
    operator: 'partner',
    name: { ko: '선셋타운 모닝 스파', en: 'Sunset Town morning spa' },
    summary: {
      ko: '이른 아침 도착한 단체가 체크인 전 씻고 쉬어 갈 수 있는 모닝 스파예요.',
      en: 'Freshen up and relax before check-in — for groups arriving early.',
    },
    duration: { ko: '60~120분 (업데이트 예정)', en: '60–120 min (coming soon)' },
    price: { base: null },
    vendor: null,
    // 차후 업체 확정 시 false로 바꾸면 4인 이상 이른 아침 도착 일정에 자동 노출됩니다.
    hidden: true,
  },
  symphony_ticket: {
    id: 'symphony_ticket',
    kind: 'ticket',
    operator: 'partner',
    name: { ko: '심포니 오브 더 씨 좌석·디너 콤보', en: 'Symphony of the Sea seats / dinner combo' },
    summary: {
      ko: '쇼를 앞자리에서 보거나 해변 레스토랑 디너와 함께 즐기는 티켓이에요.',
      en: 'Front seats or a beachfront dinner combo for the show.',
    },
    price: { base: null },
    vendor: null,
  },
  kiss_ticket: {
    id: 'kiss_ticket',
    kind: 'ticket',
    operator: 'partner',
    name: { ko: '키스 오브 더 씨 좌석 티켓', en: 'Kiss of the Sea seat ticket' },
    summary: {
      ko: '리조트 무료 티켓이 없을 때 좌석에서 보고 싶다면 예매를 도와드려요.',
      en: 'If your resort does not provide free tickets, we can book seats for you.',
    },
    price: { base: null },
    vendor: null,
  },
}

/** 일정에 쓰는 장소·이벤트 문구 */
export const SPOT = {
  symphony: {
    title: { ko: '심포니 오브 더 씨', en: 'Symphony of the Sea' },
    desc: {
      ko: '선셋타운 앞바다에서 펼쳐지는 제트스키·플라이보드·불꽃 쇼. 매일 19:30 시작 (공식 안내 기준).',
      en: 'Jet ski, flyboard and fireworks show off Sunset Town. Daily from 19:30 (official info).',
    },
  },
  kiss: {
    title: { ko: '키스 오브 더 씨', en: 'Kiss of the Sea' },
    desc: {
      ko: '바다 위 무대의 물·불·레이저 공연과 불꽃. 남부 리조트 투숙객은 무료 티켓을 받는 경우가 많으니 먼저 확인하세요. 티켓이 없어도 바깥에서 불꽃은 볼 수 있어요.',
      en: 'Water, fire and laser show on a sea stage, ending with fireworks. Many southern resorts give guests free tickets — check first. Fireworks are visible from outside too.',
    },
  },
  sunsetTown: {
    title: { ko: '선셋타운 산책 · 키스 브릿지 일몰', en: 'Sunset Town walk · Kiss Bridge sunset' },
    desc: {
      ko: '지중해풍 거리를 걷다가 키스 브릿지에서 해 지는 모습을 봐요.',
      en: 'Stroll the Mediterranean-style streets and catch the sunset at Kiss Bridge.',
    },
  },
  rooftop: {
    title: { ko: '라페스타 루프탑에서 일몰', en: 'Sunset at La Festa rooftop' },
    desc: {
      ko: '선셋타운이 내려다보이는 라페스타 루프탑 라운지(Francesca). 좌석은 미리 예약하는 게 좋아요.',
      en: 'La Festa’s rooftop lounge (Francesca) overlooking Sunset Town. Book a table ahead.',
    },
  },
  cafe: {
    title: { ko: '라페스타 카페에서 브런치', en: 'Brunch at La Festa café' },
    desc: {
      ko: '라페스타의 카페(iL Salone)나 선셋타운 카페에서 느긋하게 하루를 시작해요.',
      en: 'Start slow at La Festa’s café (iL Salone) or another Sunset Town café.',
    },
  },
  bazaar: {
    title: { ko: '선셋타운 야시장 구경', en: 'Sunset Town night market' },
    desc: {
      ko: '키스 브릿지 근처 야시장에서 간식과 기념품을 구경해요.',
      en: 'Snacks and souvenirs at the night market near Kiss Bridge.',
    },
  },
  khem: {
    title: { ko: '켐비치에서 해변 휴식', en: 'Beach time at Khem Beach' },
    desc: {
      ko: '물결이 잔잔한 켐비치에서 수영하고 쉬어요. 아이와 함께하기 좋아요.',
      en: 'Swim and relax at calm Khem Beach — good with kids.',
    },
  },
  khemPub: {
    title: { ko: '켐비치 비치 펍', en: 'Khem Beach pub' },
    desc: {
      ko: '바다 앞 비치 펍에서 가볍게 한잔해요. (새로 연 곳이라 정보 업데이트 중)',
      en: 'Drinks by the sea at a beach pub. (Newly opened — details coming)',
    },
  },
  sao: {
    title: { ko: '사오 비치', en: 'Sao Beach' },
    desc: {
      ko: '하얀 모래가 고운 남동쪽 해변. 패러세일링·제트스키 같은 액티비티가 모여 있어요.',
      en: 'Fine white sand on the southeast coast, with parasailing and jet skis.',
    },
  },
  resortRest: {
    title: { ko: '리조트 수영장 · 자유 시간', en: 'Resort pool · free time' },
    desc: {
      ko: '무리하지 말고 숙소에서 쉬어 가는 시간이에요.',
      en: 'Take it easy at your hotel.',
    },
  },
  nightMarket: {
    title: { ko: '즈엉동 야시장', en: 'Duong Dong night market' },
    desc: {
      ko: '해산물 꼬치·로컬 간식을 맛보고 기념품을 사기 좋은 섬 최대 야시장이에요.',
      en: 'The island’s biggest night market for seafood snacks and souvenirs.',
    },
  },
  longBeach: {
    title: { ko: '롱비치 일몰', en: 'Long Beach sunset' },
    desc: {
      ko: '서쪽 해안 롱비치의 비치바에서 해 지는 바다를 봐요.',
      en: 'Watch the sun go down from a Long Beach beach bar.',
    },
  },
  localMarket: {
    title: { ko: '즈엉동 시장 · 로컬 아침', en: 'Duong Dong market · local breakfast' },
    desc: {
      ko: '현지 시장에서 쌀국수로 아침을 먹고 후추·느억맘 같은 특산품을 구경해요.',
      en: 'Pho for breakfast at the local market and browse pepper and fish sauce.',
    },
  },
  northDay: {
    title: { ko: '북부 테마파크·사파리 당일 여행', en: 'North: theme park & safari day' },
    desc: {
      ko: '중부에서 차로 약 30분 이상. 테마파크·사파리 운영시간과 입장권은 미리 확인하세요.',
      en: '30+ min drive from the centre. Check opening hours and tickets beforehand.',
    },
  },
  hoQuoc: {
    title: { ko: '호국사 둘러보기', en: 'Ho Quoc Pagoda' },
    desc: {
      ko: '섬 동쪽 바다를 내려다보는 큰 사찰. 이른 아침에 조용히 둘러보기 좋아요. 짐이 있으면 차량으로 이동하는 게 편해요.',
      en: 'A large pagoda overlooking the east coast — calm in the early morning. Easiest by car if you have luggage.',
    },
  },
  phoBreakfast: {
    title: { ko: '쌀국수 아침 (퍼 틴 · 하이봇)', en: 'Pho breakfast (Pho Thin · Haibot)' },
    desc: {
      ko: '선셋타운의 퍼 틴(Pho Thin), 하이봇(Haibot)에서 아침으로 쌀국수를 먹어요.',
      en: 'Pho for breakfast at Pho Thin or Haibot in Sunset Town.',
    },
  },
  bakery: {
    title: { ko: '에릭 카이저 베이커리에서 커피', en: 'Coffee at Maison Kayser bakery' },
    desc: {
      ko: '선그룹이 운영하는 에릭 카이저(Maison Kayser) 빵집은 아침 일찍 문을 열어요. 빵과 커피로 쉬어 가요.',
      en: 'The Sun Group–run Maison Kayser bakery opens early — bread and coffee.',
    },
  },
  lunch: {
    title: { ko: '점심 식사', en: 'Lunch' },
    desc: { ko: '근처 식당에서 점심 (지도에서 찾기)', en: 'Lunch nearby (see map)' },
  },
  dinner: {
    title: { ko: '저녁 식사', en: 'Dinner' },
    desc: { ko: '공연 전 가볍게 저녁 먹기', en: 'Light dinner before the show' },
  },
} satisfies Record<string, { title: L; desc: L }>
