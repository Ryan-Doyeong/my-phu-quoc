import type { L } from './partnerTours';

/**
 * 존스 투어(John's Tours) 투어 상세 — 사진·일정·포함/불포함.
 * 출처: 존스 투어 제공 자료(phuquoctrip.com, 2026-11-04 확인). 사이트에 있는 투어만 수록.
 * 요금은 partnerTours.ts 기준을 그대로 유지한다(이 파일에서 변경하지 않음).
 * ko/en 외 언어는 번역 검수 후 추가.
 */
export interface PartnerTourDetail {
  /** 소요 시간 (예: 08:30 – 17:00) */
  time: L;
  /** 이동 수단 */
  transport?: L;
  itinerary: L[];
  included: L[];
  excluded: L[];
  notes: L[];
  /** /public/activities/partner/johns/ 아래 사진 (WebP) */
  images: string[];
}

const img = (id: string) =>
  [1, 2, 3].map((n) => `/activities/partner/johns/${id}-${n}.webp`);

const l = (ko: string, en: string): L => ({ ko, en });

const WEATHER_NOTE = l(
  '날씨에 따라 선장이 방문 섬을 변경할 수 있습니다. 수건·갈아입을 옷·수영복·편한 신발(슬리퍼)·소액 현금을 준비하세요.',
  'The captain may change the islands visited depending on the weather. Bring a towel, a change of clothes, swimwear, comfortable sandals and some cash.'
);
const SELF_COST = l('개인 비용', 'Personal expenses');
const SNORKEL = l(
  '스노클링 장비(마스크·스노클·오리발)',
  'Snorkeling gear (mask, snorkel, fins)'
);
const LIFEJACKET = l('구명조끼', 'Life jacket');
const GUIDE = l('영어 가이드', 'English-speaking guide');
const PICKUP_BOAT = l('호텔 왕복 차량 및 보트', 'Hotel round-trip transfer and boat');
const PICKUP_SPEED = l('호텔 왕복 차량 및 스피드보트', 'Hotel round-trip transfer and speedboat');
const DRONE = l('드론 영상 1개 + 사진 3장', '1 drone video + 3 photos');
const WATER = l('생수 1병', '1 bottle of water');

export const JOHNS_TOUR_DETAILS: Record<string, PartnerTourDetail> = {
  'johns-trip-3': {
    time: l('08:30 – 17:00', '08:30 – 17:00'),
    transport: l('2층 대형 보트', 'Two-deck large boat'),
    images: img('johns-trip-3'),
    itinerary: [
      l('08:15~08:30 호텔(중심가 지역) 또는 존스 투어 사무실 픽업, 08:30 출발', '08:15–08:30 pickup at your hotel (central area) or the John\'s Tours office, depart 08:30'),
      l('안토이 항구에서 보트 탑승', 'Board the boat at An Thoi port'),
      l('쓰엉섬(또는 브엄섬): 맑은 바다에서 스노클링', 'Xuong Island (or Buom Island): snorkeling in clear water'),
      l('감기섬: 푸꾸옥 최대급 산호초에서 두 번째 스노클링', 'Gam Ghi Island: second snorkeling stop at one of Phu Quoc\'s largest coral reefs'),
      l('보트에서 점심 식사', 'Lunch on the boat'),
      l('마이룻쫑섬: 해변 바·백사장·해양 액티비티·사진 촬영 자유시간', 'May Rut Trong Island: free time at the beach bar, sand and water activities, photos'),
      l('17:00 호텔 도착', '17:00 back at your hotel'),
    ],
    included: [PICKUP_BOAT, GUIDE, l('생수 1병·점심', 'Water (1 bottle) and lunch'), SNORKEL, LIFEJACKET],
    excluded: [SELF_COST, l('해변 담수 샤워·선베드 등 현지 서비스 요금', 'Local service fees such as fresh-water showers and sunbeds')],
    notes: [
      WEATHER_NOTE,
      l('마이룻쫑섬 서비스 50%, 음료 10% 할인(존스 투어 이용객)', 'Island services 50% off and drinks 10% off for John\'s Tours guests'),
      l('채식 등 특별 식단은 예약 시 또는 출발 24시간 전까지 요청', 'Request vegetarian or other special meals when booking or at least 24 hours before departure'),
    ],
  },

  'johns-trip-4': {
    time: l('08:30 – 17:30', '08:30 – 17:30'),
    transport: l('2층 대형 보트', 'Two-deck large boat'),
    images: img('johns-trip-4'),
    itinerary: [
      l('08:15~08:30 픽업, 08:30 출발 → 안토이 항구', '08:15–08:30 pickup, depart 08:30 → An Thoi port'),
      l('쓰엉섬(또는 감기섬): 산호초 스노클링', 'Xuong Island (or Gam Ghi Island): coral reef snorkeling'),
      l('보트에서 점심 식사', 'Lunch on the boat'),
      l('마이룻쫑섬: 비치 바·선베드·사진 촬영', 'May Rut Trong Island: beach bar, sunbeds, photos'),
      l('혼텀섬 아쿠아토피아 워터파크: 20가지 이상 어트랙션, 6개 테마존', 'Hon Thom Aquatopia Water Park: 20+ attractions across 6 themed zones'),
      l('혼텀 케이블카 탑승(약 25분)', 'Hon Thom cable car ride (about 25 minutes)'),
      l('17:30 호텔 도착', '17:30 back at your hotel'),
    ],
    included: [PICKUP_BOAT, l('케이블카·워터파크 입장권', 'Cable car and water park tickets'), GUIDE, l('점심·생수 1병', 'Lunch and 1 bottle of water'), SNORKEL, LIFEJACKET],
    excluded: [SELF_COST, l('케이블카·섬 내 추가 서비스 요금', 'Extra services on the cable car or islands')],
    notes: [
      l('케이블카 탑승 시간은 가이드가 조정합니다. 워터파크 점검 시에도 케이블카는 이용하며 요금은 동일합니다.', 'The guide sets the cable car time. If the water park is closed for maintenance the cable car ride still goes ahead at the same price.'),
      l('워터파크는 지퍼·단추 없는 수영복 필수', 'Swimwear without zippers or buttons is required at the water park'),
      WEATHER_NOTE,
    ],
  },

  'johns-cano-trip': {
    time: l('08:30 – 16:00', '08:30 – 16:00'),
    transport: l('스피드보트', 'Speedboat'),
    images: img('johns-cano-trip'),
    itinerary: [
      l('08:15~08:30 픽업, 08:30 출발 → 안토이 항구', '08:15–08:30 pickup, depart 08:30 → An Thoi port'),
      l('쓰엉섬(또는 브엄섬): 수정처럼 맑은 물에서 스노클링', 'Xuong Island (or Buom Island): snorkeling in crystal-clear water'),
      l('감기섬: 기암 지형과 대형 산호 군락 스노클링', 'Gam Ghi Island: snorkeling among rock formations and large coral colonies'),
      l('마이룻쫑섬: 점심 식사, 해변 휴식, 드론 촬영(영상 1개+사진 3장)', 'May Rut Trong Island: lunch, beach time, drone shoot (1 video + 3 photos)'),
      l('선택: 씨워커(해저 걷기, 현장 비용 별도)', 'Optional: Sea Walker (paid on site)'),
      l('16:00 호텔 도착', '16:00 back at your hotel'),
    ],
    included: [PICKUP_SPEED, GUIDE, l('점심 뷔페(또는 세트 메뉴)·생수 1병', 'Buffet lunch (or set menu) and 1 bottle of water'), SNORKEL, LIFEJACKET, DRONE],
    excluded: [SELF_COST, l('해변 샤워·선베드 등 요금', 'Beach shower, sunbed and similar fees'), l('씨워커 티켓', 'Sea Walker ticket')],
    notes: [
      l('점심은 날씨에 따라 쓰엉섬(듀공 베이)의 뷔페 또는 마이룻쫑섬의 세트 메뉴입니다.', 'Lunch is a buffet on Xuong Island (Dugong Bay) or a set menu on May Rut Trong Island, depending on the weather.'),
      l('돌아오는 길에 선셋타운·야시장에서 내릴 수 있습니다(입장권·귀가는 개별).', 'On the way back you can get off at Sunset Town or the night market (tickets and getting home are on your own).'),
      WEATHER_NOTE,
    ],
  },

  'johns-cablecar-trip': {
    time: l('08:30 – 17:30', '08:30 – 17:30'),
    transport: l('스피드보트', 'Speedboat'),
    images: img('johns-cablecar-trip'),
    itinerary: [
      l('08:15~08:30 픽업, 08:30 출발 → 안토이 항구', '08:15–08:30 pickup, depart 08:30 → An Thoi port'),
      l('쓰엉섬(또는 브엄섬) → 감기섬: 스노클링', 'Xuong Island (or Buom Island) → Gam Ghi Island: snorkeling'),
      l('마이룻쫑섬: 점심·휴식·사진 촬영(선택: 씨워커)', 'May Rut Trong Island: lunch, rest, photos (optional: Sea Walker)'),
      l('혼텀섬 아쿠아토피아 워터파크: 20가지 이상 어트랙션', 'Hon Thom Aquatopia Water Park: 20+ attractions'),
      l('혼텀 케이블카 탑승(약 25분)', 'Hon Thom cable car ride (about 25 minutes)'),
      l('17:30 호텔 도착', '17:30 back at your hotel'),
    ],
    included: [PICKUP_SPEED, l('케이블카·워터파크 입장권', 'Cable car and water park tickets'), GUIDE, l('점심 뷔페·생수 1병', 'Buffet lunch and 1 bottle of water'), SNORKEL, LIFEJACKET, DRONE],
    excluded: [SELF_COST, l('케이블카·섬 내 추가 서비스', 'Extra services on the cable car or islands'), l('씨워커 티켓', 'Sea Walker ticket')],
    notes: [
      l('점심은 날씨에 따라 쓰엉섬 뷔페 또는 마이룻쫑섬 세트 메뉴입니다.', 'Lunch is a buffet on Xuong Island or a set menu on May Rut Trong Island, depending on the weather.'),
      l('워터파크는 지퍼·단추 없는 수영복 필수', 'Swimwear without zippers or buttons is required at the water park'),
      WEATHER_NOTE,
    ],
  },

  'johns-luxury-trip': {
    time: l('08:30 – 16:00', '08:30 – 16:00'),
    transport: l('스피드보트 (최대 15명)', 'Speedboat (max. 15 guests)'),
    images: img('johns-luxury-trip'),
    itinerary: [
      l('08:15~08:30 픽업, 08:30 출발 → 안토이 항구', '08:15–08:30 pickup, depart 08:30 → An Thoi port'),
      l('쓰엉섬 → 브엄섬 → 감기섬: 스노클링', 'Xuong Island → Buom Island → Gam Ghi Island: snorkeling'),
      l('마이룻쫑섬: 웰컴 드링크, 점심, 카약·SUP·사진 촬영', 'May Rut Trong Island: welcome drink, lunch, kayak/SUP and photos'),
      l('16:00 호텔 도착', '16:00 back at your hotel'),
    ],
    included: [PICKUP_SPEED, GUIDE, l('생수 1병·과일·웰컴 드링크', 'Water (1 bottle), fruit and a welcome drink'), l('섬 레스토랑 점심', 'Lunch at the island restaurant'), SNORKEL, LIFEJACKET, DRONE],
    excluded: [SELF_COST],
    notes: [
      l('탑승 인원을 최대 15명으로 제한한 소규모 프리미엄 투어입니다.', 'A small premium tour limited to 15 guests per boat.'),
      l('마이룻쫑섬 특전: 선베드·SUP 대여 50%, 음료 20% 할인, 담수 샤워 무료', 'May Rut Trong Island perks: 50% off sunbed and SUP rental, 20% off drinks, free fresh-water shower'),
      l('돌아오는 길에 선셋타운·야시장에서 내릴 수 있습니다(개별 이동).', 'On the way back you can get off at Sunset Town or the night market (own transport).'),
      WEATHER_NOTE,
    ],
  },

  'johns-bbq-trip': {
    time: l('13:00 – 19:00', '13:00 – 19:00'),
    transport: l('스피드보트', 'Speedboat'),
    images: img('johns-bbq-trip'),
    itinerary: [
      l('12:45~13:00 픽업, 13:00 출발 → 14:00 안토이 항구', '12:45–13:00 pickup, depart 13:00 → 14:00 An Thoi port'),
      l('14:30 쓰엉섬(또는 감기섬): 스노클링', '14:30 Xuong Island (or Gam Ghi Island): snorkeling'),
      l('15:30 마이룻쫑섬: 휴식·카약·SUP', '15:30 May Rut Trong Island: relax, kayak, SUP'),
      l('17:00 선셋 BBQ 저녁 식사', '17:00 sunset BBQ dinner'),
      l('18:30 항구 복귀 → 19:00 호텔 도착', '18:30 return to port → 19:00 back at your hotel'),
    ],
    included: [PICKUP_SPEED, GUIDE, l('섬 BBQ 저녁', 'Island BBQ dinner'), WATER, SNORKEL, LIFEJACKET, DRONE],
    excluded: [SELF_COST],
    notes: [
      l('BBQ 메뉴: 생선·오징어·새우·닭 구이, 감자튀김, 샐러드, 구운 옥수수·고구마, 밥, 과일', 'BBQ menu: grilled fish, squid, prawns and chicken, fries, salad, grilled corn and sweet potato, rice, fruit'),
      l('마이룻쫑섬 서비스 이용료 무료 혜택, 음료 10% 할인(존스 투어 이용객)', 'Free island service fees and 10% off drinks for John\'s Tours guests'),
      WEATHER_NOTE,
    ],
  },

  'johns-camping-trip': {
    time: l('1일차 08:30 ~ 2일차 17:00', 'Day 1 08:30 – Day 2 17:00'),
    transport: l('보트', 'Boat'),
    images: img('johns-camping-trip'),
    itinerary: [
      l('[1일차] 08:15~08:30 픽업, 08:30 출발 → 안토이 항구', '[Day 1] 08:15–08:30 pickup, depart 08:30 → An Thoi port'),
      l('쓰엉섬(또는 브엄섬) → 감기섬: 스노클링, 보트에서 점심', 'Xuong Island (or Buom Island) → Gam Ghi Island: snorkeling, lunch on the boat'),
      l('마이룻쫑섬 캠프장: 카약·SUP, 선셋 BBQ 저녁, 모닥불, 텐트 1박', 'May Rut Trong camp: kayak/SUP, sunset BBQ dinner, campfire, overnight in a tent'),
      l('[2일차] 아침 식사 후 섬 자유시간, 12:00~13:00 섬 레스토랑 점심', '[Day 2] Breakfast, free time on the island, lunch at the island restaurant 12:00–13:00'),
      l('15:00 보트 탑승 → 17:00 호텔 도착', '15:00 board the boat → 17:00 back at your hotel'),
    ],
    included: [PICKUP_BOAT, GUIDE, l('텐트(2인용)', 'Tent (2 persons)'), l('식사: 아침 1·점심 2·BBQ 저녁 1', 'Meals: 1 breakfast, 2 lunches, 1 BBQ dinner'), WATER, SNORKEL, LIFEJACKET],
    excluded: [SELF_COST],
    notes: [
      l('최소 1일 전 예약 필요', 'Book at least 1 day in advance'),
      l('마이룻쫑섬 서비스(선베드·SUP·카약·샤워 등) 50%, 음료 10% 할인', 'May Rut Trong Island services (sunbeds, SUP, kayak, showers, etc.) 50% off, drinks 10% off'),
      l('채식·아동 식단은 예약 시 또는 24시간 전까지 요청', 'Request vegetarian or children\'s meals when booking or at least 24 hours ahead'),
      WEATHER_NOTE,
    ],
  },

  'johns-option-2': {
    time: l('17:00 – 21:00', '17:00 – 21:00'),
    transport: l('보트', 'Boat'),
    images: img('johns-option-2'),
    itinerary: [
      l('16:45~17:00 픽업, 17:00 출발 → 즈엉동 항구(딘꺼우 사원 인근)', '16:45–17:00 pickup, depart 17:00 → Duong Dong port (near Dinh Cau temple)'),
      l('보트에서 파노라마 석양 감상', 'Panoramic sunset from the boat'),
      l('가이드의 시범을 보며 야간 오징어 낚시 체험(잡은 오징어는 조리해 줌)', 'Night squid fishing with a guide\'s demonstration (the crew cooks your catch)'),
      l('보트에서 가벼운 저녁 식사', 'Light dinner on the boat'),
      l('21:00 호텔 도착', '21:00 back at your hotel'),
    ],
    included: [l('호텔 왕복 차량 및 보트', 'Hotel round-trip transfer and boat'), GUIDE, l('가벼운 저녁 식사', 'Light dinner'), WATER, l('현지 낚시 도구', 'Local fishing gear'), LIFEJACKET],
    excluded: [SELF_COST],
    notes: [
      l('날씨에 따라 일정이 바뀔 수 있습니다.', 'The schedule may change depending on the weather.'),
      l('우기(5~11월)에는 사오 해변 또는 안토이에서 출발하며 석양을 볼 수 없습니다.', 'In the rainy season (May–November) the tour departs from Sao Beach or An Thoi and the sunset may not be visible.'),
    ],
  },

  'johns-land-tour-1': {
    time: l('09:00 – 16:30', '09:00 – 16:30'),
    transport: l('차량', 'Vehicle'),
    images: img('johns-land-tour-1'),
    itinerary: [
      l('08:45~09:00 호텔 픽업, 09:00 출발', '08:45–09:00 hotel pickup, depart 09:00'),
      l('진주 농장 → 심 와인 공장(시음) → 후추 농장 → 느억맘 공장', 'Pearl farm → Sim wine factory (tasting) → pepper farm → fish sauce factory'),
      l('호꾸옥 사원: 바다와 산이 내려다보이는 전망', 'Ho Quoc Pagoda: views over the sea and mountains'),
      l('사오 해변: 점심·수영·휴식', 'Sao Beach: lunch, swimming, relaxing'),
      l('코코넛 감옥(역사 유적)', 'Coconut Tree Prison (historic site)'),
      l('선셋타운: 시계탑, 키스 브릿지 산책', 'Sunset Town: Clock Tower and Kiss Bridge walk'),
      l('16:30 호텔 도착', '16:30 back at your hotel'),
    ],
    included: [l('호텔 왕복 차량', 'Hotel round-trip transfer'), GUIDE, l('생수 1병·점심', '1 bottle of water and lunch')],
    excluded: [SELF_COST],
    notes: [
      l('돌아오는 길에 선셋타운이나 즈엉동 야시장에서 내리려면 가이드에게 알려주세요(입장권·귀가는 개별).', 'To get off at Sunset Town or the Duong Dong night market on the way back, tell your guide (tickets and getting home are on your own).'),
    ],
  },

  'johns-land-tour-2': {
    time: l('08:30 – 16:00', '08:30 – 16:00'),
    transport: l('차량', 'Vehicle'),
    images: img('johns-land-tour-2'),
    itinerary: [
      l('08:15~08:30 픽업', '08:15–08:30 pickup'),
      l('꾸어깐 강: 카약 체험, 현지 강 생활 구경', 'Cua Can River: kayaking and a look at local river life'),
      l('벌꿀 농장: 꿀 생산 견학 및 시식', 'Honey farm: see how honey is made and taste it'),
      l('국립공원 숲길 걷기', 'Forest walk in the national park'),
      l('락뱀 어촌: 점심, 모터보트로 함롱곶 이동(건기 11~4월만), 스타피시 해변 수영', 'Rach Vem fishing village: lunch, motorboat to Ham Ninh point (dry season Nov–Apr only), swimming at Starfish Beach'),
      l('실크 하우스', 'Silk house'),
      l('16:00 호텔 도착', '16:00 back at your hotel'),
    ],
    included: [l('호텔 왕복 차량', 'Hotel round-trip transfer'), GUIDE, l('생수 1병·점심', '1 bottle of water and lunch')],
    excluded: [SELF_COST, l('그랜드 월드 내 입장권(베니스 수상택시, 쇼, 테디베어 박물관 등)', 'Grand World tickets (Venice water taxi, shows, Teddy Bear Museum, etc.)')],
    notes: [
      l('그랜드 월드에서 내리고 싶은 경우 가이드에게 알려주세요(입장권은 개별 구매, 귀가는 빈펄 셔틀버스).', 'To get off at Grand World, tell your guide (buy tickets separately; return by the VinPearl shuttle bus).'),
    ],
  },

  'johns-land-tour-4': {
    time: l('09:00 – 16:30', '09:00 – 16:30'),
    transport: l('차량', 'Vehicle'),
    images: img('johns-land-tour-4'),
    itinerary: [
      l('08:45~09:00 픽업, 09:00 출발', '08:45–09:00 pickup, depart 09:00'),
      l('진주 농장 → 호꾸옥 사원 → 코코넛 감옥 → 사오 해변(점심)', 'Pearl farm → Ho Quoc Pagoda → Coconut Tree Prison → Sao Beach (lunch)'),
      l('안토이 케이블카 역 체크인 → 혼텀 케이블카(약 25분)', 'Check in at An Thoi cable car station → Hon Thom cable car (about 25 minutes)'),
      l('아쿠아토피아 워터파크: 20가지 이상 어트랙션, 6개 존', 'Aquatopia Water Park: 20+ attractions, 6 zones'),
      l('16:30 호텔 도착', '16:30 back at your hotel'),
    ],
    included: [l('호텔 왕복 차량', 'Hotel round-trip transfer'), l('케이블카·워터파크 입장권', 'Cable car and water park tickets'), GUIDE, l('생수 1병·점심', '1 bottle of water and lunch')],
    excluded: [SELF_COST, l('혼텀섬 내 추가 서비스', 'Extra services on Hon Thom Island')],
    notes: [
      l('워터파크는 지퍼·단추 없는 수영복 필수', 'Swimwear without zippers or buttons is required at the water park'),
      l('돌아오는 길에 선셋타운·야시장에서 내리려면 가이드에게 알려주세요(개별 이동).', 'To get off at Sunset Town or the night market on the way back, tell your guide (own transport).'),
    ],
  },
};
