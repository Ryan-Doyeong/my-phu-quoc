/**
 * 남부 해양 액티비티 — Marmoris Yachting (파트너) 요트 2종
 * 출처: Marmoris 파트너 안내문 + 공식 일정·포함·취소·아동 정책 (2026-10-31 수령)
 * 보조: https://marmorisyacht.com/tours/phu-quoc-tropical-yachting-tour/ (사진)
 * 가격은 공개 정가(retail)만 기재. 파트너 매입가(net)는 공개 저장소에 절대 넣지 말 것.
 * en = 원문(영어) 기준, 그 외 언어는 en 사용 (ChatGPT 검수 대기)
 */
export type L = {
  ko: string
  en: string
  zh?: string
  ja?: string
  ru?: string
  hi?: string
  vi?: string
}

export interface YachtStep {
  time: string
  title: L
  desc?: L
}

export interface YachtClass {
  name: L
  deck: L
  priceVnd: number
  note?: L
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
  flow: L
  notes: L[]
}

const OCEAN: L = {
  ko: '오션 클래스',
  en: 'Ocean Class',
  zh: 'Ocean Class（海洋舱）',
  ja: 'オーシャンクラス',
  ru: 'Ocean Class',
  hi: 'ओशन क्लास',
  vi: 'Ocean Class',
}
const OCEAN_DECK: L = {
  ko: '하층 데크',
  en: 'Lower Deck',
  zh: '下层甲板',
  ja: '下層デッキ',
  ru: 'Нижняя палуба',
  hi: 'निचला डेक',
  vi: 'Boong dưới',
}
const SKY: L = {
  ko: '스카이 라운지',
  en: 'Sky Lounge',
  zh: 'Sky Lounge（天空休息区）',
  ja: 'スカイラウンジ',
  ru: 'Sky Lounge',
  hi: 'स्काई लाउंज',
  vi: 'Sky Lounge',
}
const SKY_DECK: L = {
  ko: 'VIP 데크',
  en: 'VIP Deck',
  zh: 'VIP 甲板',
  ja: 'VIPデッキ',
  ru: 'VIP-палуба',
  hi: 'वीआईपी डेक',
  vi: 'Boong VIP',
}

const WEATHER: L = {
  ko: '표시된 일정과 시간은 일반적인 기준입니다. 해상 상태·날씨·바람 계절·당일 운영 상황 등 여러 변수에 따라 출발 항구, 항로, 정박 장소, 시간, 프로그램이 달라지거나 조정될 수 있습니다. 액티비티는 날씨와 탑승객의 건강 상태가 안전할 때에만 진행됩니다.',
  en: 'Schedules and times shown are general guidelines. Departure port, route, anchorage, timings and programs may change or be adjusted depending on sea conditions, weather, wind season and other circumstances on the day. Activities run only when weather and guests\' health allow safe operation.',
}

export const MARMORIS_YACHT_TOURS: YachtTour[] = [
  {
    id: 'tropical',
    operator: 'Marmoris Yachting',
    badge: {
      ko: '오전 · 점심 BBQ',
      en: 'Morning · BBQ Lunch',
      zh: '上午出发 · BBQ 午餐',
      ja: '午前出発 · BBQランチ',
      ru: 'Утренний тур · BBQ на обед',
      hi: 'सुबह का टूर · BBQ लंच',
      vi: 'Buổi sáng · BBQ bữa trưa',
    },
    title: {
      ko: '트로피컬 요트 투어',
      en: 'Tropical Yachting Tour',
      zh: '热带风情游艇之旅',
      ja: 'トロピカルヨットツアー',
      ru: 'Тропический яхтенный тур',
      hi: 'ट्रॉपिकल यॉट टूर',
      vi: 'Tour du thuyền Tropical',
    },
    hours: '08:30 ~ 13:30',
    facts: [
      { ko: '약 5시간', en: 'About 5 hours', vi: 'Khoảng 5 giờ' },
      { ko: '빈담 항 출발 (선셋타운에서 차로 약 10분)', en: 'Departs Vinh Dam Port (about 10 min by car from Sunset Town)', vi: 'Khởi hành từ cảng Vịnh Đầm (cách Thị trấn Hoàng Hôn khoảng 10 phút đi ô tô)' },
      { ko: '척당 최대 45명', en: 'Up to 45 guests per yacht', vi: 'Tối đa 45 khách mỗi du thuyền' },
    ],
    tags: [
      { ko: '스노클링', en: 'Snorkeling', vi: 'Lặn ngắm san hô' },
      { ko: 'SUP', en: 'SUP', vi: 'Chèo SUP' },
      { ko: '낚시', en: 'Fishing', vi: 'Câu cá' },
      { ko: '워터사이클', en: 'Water cycling', vi: 'Đạp xe trên nước' },
      { ko: 'BBQ 점심', en: 'BBQ Lunch', vi: 'Bữa trưa BBQ' },
    ],
    classes: [
      { name: OCEAN, deck: OCEAN_DECK, priceVnd: 1950000, note: { ko: '바나나보트 1회 무료 · 제트스키·스쿠버다이빙은 별도 요금', en: 'One free banana boat ride · Jet ski and scuba diving not included', vi: 'Miễn phí 1 lượt phao chuối · Không bao gồm mô tô nước và lặn bình khí' } },
      { name: SKY, deck: SKY_DECK, priceVnd: 2450000, note: { ko: '플라이브리지 전용석(360° 전망) · 제트스키·바나나보트·스쿠버다이빙 포함', en: 'Private Flybridge seating with 360° views · Jet ski, banana boat and scuba diving included', vi: 'Chỗ ngồi riêng trên boong Flybridge, tầm nhìn 360° · Bao gồm mô tô nước, phao chuối và lặn bình khí' } },
    ],
    images: [
      '/activities/marmoris/tropical-1.webp',
      '/activities/marmoris/tropical-2.webp',
      '/activities/marmoris/tropical-3.webp',
    ],
    steps: [
      { time: '08:30', title: { ko: '빈담 항 출발', en: 'Depart from Vinh Dam Port', vi: 'Khởi hành từ cảng Vịnh Đầm' } },
      { time: '08:30–09:45', title: { ko: '정박지로 크루즈', en: 'Cruise to the anchorage', vi: 'Di chuyển đến điểm neo đậu' }, desc: { ko: '날씨에 따라 혼러이 또는 혼즈어 정박', en: 'Hon Roi or Hon Dua, depending on weather conditions', vi: 'Hòn Rỏi hoặc Hòn Dừa, tùy điều kiện thời tiết' } },
      { time: '10:00–11:30', title: { ko: '워터스포츠 즐기기', en: 'Enjoy exciting water sports activities', vi: 'Tham gia các hoạt động thể thao dưới nước thú vị' } },
      { time: '12:00', title: { ko: '요트 위 점심', en: 'Lunch on board', vi: 'Ăn trưa trên du thuyền' } },
      { time: '12:30–13:30', title: { ko: '빈담 항으로 복귀', en: 'Cruise back to Vinh Dam Port', vi: 'Quay về cảng Vịnh Đầm' }, desc: { ko: '투어 종료', en: 'Concluding the journey', vi: 'Kết thúc hành trình' } },
    ],
    flow: {
      ko: '즈엉동·안터이 지역의 호텔에서 픽업해 빈담 항에 모인 뒤, 보트를 타고 요트로 이동합니다. 출발 항구와 항로는 날씨·바람 계절에 따라 변경될 수 있습니다.',
      en: 'Guests are picked up at their hotels in the Duong Dong and An Thoi areas and gathered at Vinh Dam Port, then transferred by boat to the yacht. The departure port and route may change depending on weather and wind season.',
      vi: 'Khách được đón tại khách sạn ở khu vực Dương Đông và An Thới, tập trung tại cảng Vịnh Đầm, sau đó đi tàu trung chuyển ra du thuyền. Cảng khởi hành và tuyến đi có thể thay đổi tùy theo thời tiết và mùa gió.',
    },
    notes: [WEATHER],
  },
  {
    id: 'sunset',
    operator: 'Marmoris Yachting',
    badge: {
      ko: '저녁 · 불꽃놀이(수~월 21:25경, 화요일 휴무) · DJ',
      en: 'Evening · Fireworks (Wed–Mon, around 21:25; closed Tue) · DJ',
      zh: '傍晚 · 烟花（周三至周一约21:25，周二停演）· DJ',
      ja: '夕方 · 花火（水～月 21:25頃、火曜休演）· DJ',
      ru: 'Вечер · Фейерверк (ср.–пн., около 21:25; вт. — выходной) · DJ',
      hi: 'शाम · आतिशबाज़ी (बुध–सोम लगभग 21:25, मंगलवार बंद) · DJ',
      vi: 'Buổi tối · Pháo hoa (Thứ Tư–Thứ Hai, khoảng 21:25; nghỉ Thứ Ba) · DJ',
    },
    title: {
      ko: '선셋 칠링 요트 투어',
      en: 'Sunset Chilling Tour',
      zh: '日落休闲游艇之旅',
      ja: 'サンセット・チリングツアー',
      ru: 'Вечерний яхтенный тур Sunset Chilling',
      hi: 'सनसेट चिलिंग यॉट टूर',
      vi: 'Tour du thuyền Sunset Chilling',
    },
    hours: '15:00 ~ 21:30',
    facts: [
      { ko: '빈담 항 출발 (선셋타운에서 차로 약 10분)', en: 'Departs Vinh Dam Port (about 10 min by car from Sunset Town)', vi: 'Khởi hành từ cảng Vịnh Đầm (cách Thị trấn Hoàng Hôn khoảng 10 phút đi ô tô)' },
      { ko: '키스브릿지 DJ·불꽃놀이', en: 'Kiss Bridge DJ & fireworks', vi: 'DJ & pháo hoa tại Cầu Hôn' },
      { ko: '척당 최대 45명', en: 'Up to 45 guests per yacht', vi: 'Tối đa 45 khách mỗi du thuyền' },
    ],
    tags: [
      { ko: '일몰', en: 'Sunset', vi: 'Ngắm hoàng hôn' },
      { ko: 'BBQ 디너', en: 'BBQ Dinner', vi: 'Bữa tối BBQ' },
      { ko: '불꽃놀이', en: 'Fireworks', vi: 'Pháo hoa' },
      { ko: 'DJ', en: 'DJ', vi: 'DJ' },
      { ko: '스노클링', en: 'Snorkeling', vi: 'Lặn ngắm san hô' },
      { ko: 'SUP', en: 'SUP', vi: 'Chèo SUP' },
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
      { time: '15:00', title: { ko: '빈담 항 출발', en: 'Depart from Vinh Dam Port', vi: 'Khởi hành từ cảng Vịnh Đầm' } },
      { time: '16:00', title: { ko: '혼담응와이 정박지 도착', en: 'Arrive at the anchorage at Hon Dam Ngoai', vi: 'Đến điểm neo đậu tại Hòn Dăm Ngoài' } },
      { time: '16:00–17:30', title: { ko: '워터스포츠 즐기기', en: 'Enjoy exciting water sports activities', vi: 'Tham gia các hoạt động thể thao dưới nước thú vị' } },
      { time: '17:45', title: { ko: '푸꾸옥 일몰 감상', en: 'Admire the beautiful sunset over Phu Quoc', vi: 'Ngắm hoàng hôn tuyệt đẹp trên đảo Phú Quốc' } },
      { time: '18:00', title: { ko: '요트 위 디너', en: 'Dinner on board', vi: 'Ăn tối trên du thuyền' } },
      { time: '19:00', title: { ko: '키스브릿지로 이동, 라이브 DJ 공연', en: 'Cruise to Kiss Bridge for a live DJ performance', vi: 'Di chuyển đến Cầu Hôn để thưởng thức màn biểu diễn DJ trực tiếp' }, desc: { ko: '기상에 따라 변경될 수 있음', en: 'Schedule subject to change depending on weather conditions', vi: 'Lịch trình có thể thay đổi tùy điều kiện thời tiết' } },
      { time: '19:45–20:00', title: { ko: '불꽃놀이 감상', en: 'Spectacular fireworks display', vi: 'Thưởng thức màn trình diễn pháo hoa ấn tượng' }, desc: { ko: '기상에 따라 변경될 수 있음', en: 'Schedule subject to change depending on weather conditions', vi: 'Lịch trình có thể thay đổi tùy điều kiện thời tiết' } },
      { time: '20:00–21:30', title: { ko: '빈담 항으로 복귀', en: 'Cruise back to Vinh Dam Port', vi: 'Quay về cảng Vịnh Đầm' }, desc: { ko: '투어 종료', en: 'Concluding the journey', vi: 'Kết thúc hành trình' } },
    ],
    flow: {
      ko: '각 호텔에서 픽업해 빈담 항에 모인 뒤, 보트를 타고 요트로 이동합니다. 픽업은 즈엉동 시내 중심 기준이며, 그 밖의 지역은 추가 교통비가 있을 수 있습니다.',
      en: 'Guests are picked up at their hotels and gathered at Vinh Dam Port, then transferred by boat to the yacht. Pick-up is based on Duong Dong Town Center; other areas may incur an additional transportation charge.',
      vi: 'Khách được đón tại khách sạn và tập trung tại cảng Vịnh Đầm, sau đó đi tàu trung chuyển ra du thuyền. Dịch vụ đưa đón áp dụng theo khu vực trung tâm Dương Đông; các khu vực khác có thể phát sinh phụ thu.',
    },
    notes: [WEATHER],
  },
]

/* 두 투어 공통 */
export const YACHT_INCLUDED: L[] = [
  { ko: '즈엉동 시내 중심에서 선착장까지 왕복 이동', en: 'Round-trip transportation from your location in Duong Dong Town Center to the pier', vi: 'Đưa đón hai chiều từ địa điểm của bạn tại trung tâm Dương Đông đến bến tàu' },
  { ko: '환영 음료와 열대과일', en: 'Welcome drink and tropical fruits', vi: 'Đồ uống chào mừng và trái cây nhiệt đới' },
  { ko: '맥주·청량음료·디톡스 음료 무제한', en: 'Unlimited beer, soft drinks, and detox beverages', vi: 'Không giới hạn bia, nước ngọt và đồ uống detox' },
  { ko: '스노클링, 낚시, 사진 촬영, SUP, 워터사이클, 수영', en: 'Snorkeling, fishing, photography, SUP, water cycling, swimming', vi: 'Lặn ngắm san hô, câu cá, chụp ảnh, chèo SUP, đạp xe trên nước, bơi lội' },
  { ko: '요트 위 BBQ 점심/디너', en: 'BBQ lunch/dinner served on board', vi: 'Bữa trưa/tối BBQ phục vụ trên du thuyền' },
  { ko: '바텐더 서비스, DJ(오후 공유 투어)', en: 'Bartender service, DJ entertainment (shared afternoon tours)', vi: 'Dịch vụ pha chế, DJ giải trí (tour ghép buổi chiều)' },
]

export const YACHT_EXTRA_PAID: L[] = [
  { ko: '제트스키', en: 'Jet skiing', vi: 'Mô tô nước' },
  { ko: '스쿠버다이빙', en: 'Scuba diving', vi: 'Lặn bình khí' },
  { ko: '견인식 튜브 어트랙션(바나나보트 등)', en: 'Towable inflatable rides', vi: 'Các trò chơi phao kéo trên biển' },
]

export const YACHT_EXCLUDED: L[] = [
  { ko: '패키지에 포함되지 않은 워터스포츠 및 선상 추가 비용', en: 'Water sports activities and any additional expenses on board not included in the package', vi: 'Các hoạt động thể thao dưới nước và chi phí phát sinh trên du thuyền không nằm trong gói' },
  { ko: '외부 음식·음료 반입 시 추가요금', en: 'Surcharges for bringing outside food and beverages on board', vi: 'Phụ thu khi mang đồ ăn, thức uống từ bên ngoài lên du thuyền' },
  { ko: '시내 중심 밖 픽업·드롭 시 추가 교통비', en: 'Additional transportation charges for pick-up and drop-off outside the city center', vi: 'Phụ thu đưa đón ngoài khu vực trung tâm' },
]

export const YACHT_CANCELLATION: { title: L; rows: L[] }[] = [
  {
    title: { ko: '공유 투어', en: 'Shared tours', vi: 'Tour ghép' },
    rows: [
      { ko: '출발 48시간 전까지: 100% 환불', en: '48 hours or more before departure: 100% refund', vi: 'Trước giờ khởi hành từ 48 giờ trở lên: hoàn 100%' },
      { ko: '출발 24시간 전까지: 50% 환불', en: '24 hours or more before departure: 50% refund', vi: 'Trước giờ khởi hành từ 24 giờ trở lên: hoàn 50%' },
      { ko: '출발 24시간 이내: 환불 불가', en: 'Within 24 hours of departure: no refund', vi: 'Trong vòng 24 giờ trước khi khởi hành: không hoàn tiền' },
    ],
  },
  {
    title: { ko: '프라이빗 차터', en: 'Private charter', vi: 'Thuê du thuyền riêng' },
    rows: [
      { ko: '출발 7일 전까지: 100% 환불', en: '7 days or more before departure: 100% refund', vi: 'Trước ngày khởi hành từ 7 ngày trở lên: hoàn 100%' },
      { ko: '출발 3~6일 전: 50% 환불', en: '3–6 days before departure: 50% refund', vi: 'Trước ngày khởi hành 3–6 ngày: hoàn 50%' },
      { ko: '출발 48시간 이내: 환불 불가', en: 'Within 48 hours of departure: no refund', vi: 'Trong vòng 48 giờ trước khi khởi hành: không hoàn tiền' },
    ],
  },
]

export const YACHT_CANCEL_NOTE: L = {
  ko: '이용하지 않은 서비스는 환불되지 않습니다.',
  en: 'No refunds will be provided for unused services.',
  vi: 'Không hoàn tiền cho các dịch vụ không sử dụng.',
}

export const YACHT_CHILD_POLICY: L[] = [
  { ko: '0~3세: 무료', en: 'Ages 0–3: complimentary', vi: 'Trẻ từ 0–3 tuổi: miễn phí' },
  { ko: '4세~11세 미만: 성인 요금의 50%', en: 'Ages 4 to under 11: 50% of the adult ticket price', vi: 'Trẻ từ 4 đến dưới 11 tuổi: 50% giá vé người lớn' },
  { ko: '11세 이상: 성인 요금', en: 'Ages 11 and above: adult ticket price', vi: 'Từ 11 tuổi trở lên: giá vé người lớn' },
]
