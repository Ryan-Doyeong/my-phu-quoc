/**
 * lib/categoryKnowledge.ts
 * 푸꾸옥 선셋타운 전 카테고리별 기본 상식 및 여행자 지식베이스
 * 
 * - 스파 & 마사지 (타이 마사지 vs 아로마, 핫스톤, 헤드스파, 팁 문화)
 * - 호텔 & 숙박 (부티크 호텔 vs 힐사이드 레지던스, 불꽃놀이 명당, 디포짓/버기카)
 * - 쇼핑 & 마트 (푸꾸옥 4대 특산품 후추/느억맘/심와인/진주 고르는 법, 열대과일 팁)
 * - 관광명소 & 액티비티 (혼똔섬 케이블카, 키스브릿지 일몰 타임, 키스오브더씨 불꽃쇼 관람 팁)
 * - 카페 & 음료 (베트남 4대 커피 쓰어다/박씨우/에그/소금커피, 로부스타 상식)
 * - 바 & 펍 (선셋 칵테일, 크래프트 비어, 비치클럽 에티켓)
 */

import type { FoodGuideSectionData } from './foodKnowledge'
import { FOOD_KNOWLEDGE_ENTRIES } from './foodKnowledge'

export interface CategoryKnowledgeGuide {
  category: string
  eyebrow: string
  title: string
  introText: string
  sections: FoodGuideSectionData[]
}

// 1. 카테고리별 상식 지식베이스 항목들
export const CATEGORY_KNOWLEDGE_ENTRIES: Record<string, FoodGuideSectionData> = {
  // ==========================================
  // [WELLNESS & SPA]
  // ==========================================
  thaiVsAroma: {
    id: 'thai-vs-aroma',
    icon: '💆',
    title: 'Thai Massage vs Aroma Oil: Which to Choose?',
    tocLabel: 'Thai vs Aroma',
    ko: {
      label: '한국어 · 타이 마사지 vs 아로마 오일 마사지 차이',
      paragraphs: [
        '스파 메뉴판을 볼 때 가장 고민되는 두 가지 핵심 코스인 타이 마사지와 아로마 마사지는 조리법과 목적이 완전히 다릅니다.',
        '자신의 현재 피로 상태와 일정(이동 직전인지, 샤워가 가능한지 등)에 맞추어 선택하면 만족도가 배가됩니다.',
      ],
      list: [
        '타이 마사지 (건식 · 지압 & 스트레칭): 오일을 바르지 않고 전용 옷을 입은 채 진행됩니다. 손가락, 팔꿈치, 무릎을 이용한 경혈 지압과 요가식 수동 스트레칭으로 굳은 관절과 근육을 시원하게 늘려줍니다. 투어 후 뭉친 피로 회복에 최적입니다.',
        '아로마 오일 마사지 (습식 · 림프 순환): 천연 에센셜 오일(라벤더, 레몬그라스, 코코넛 등)을 전신에 도포하여 부드러운 압으로 림프절을 자극합니다. 심신 안정, 피부 보습, 혈액순환에 탁월하며 강한 압이 부담스러운 분께 추천합니다.',
        '선택 기준: 격한 물놀이나 투어 후 개운한 스트레칭을 원할 때는 타이, 비행 후 붓기 완화나 깊은 숙면을 원할 때는 아로마를 추천합니다.',
      ],
      subheading: '마사지 압 조절 베트남어 꿀팁',
      subList: [
        '약하게: "Nhẹ (녜)"',
        '보통으로: "Vừa (브어)"',
        '강하게: "Mạnh (만)"',
        '아파요: "Đau (다우)"',
      ],
    },
    en: {
      label: 'English · Thai Massage vs Aroma Oil Massage',
      paragraphs: [
        'The two most popular spa treatments differ significantly in philosophy, technique, and physiological benefits.',
      ],
      list: [
        'Thai Traditional Massage (Dry / Acupressure & Stretch): Performed on a mat with loose-fitting clothes. Practitioners use rhythmic compression and yoga-like stretching to restore flexibility and clear energy blockages.',
        'Aroma Essential Oil Massage (Gentle / Lymphatic): Gentle, sweeping strokes using natural botanical oils to melt stress, nourish skin, and encourage lymphatic drainage.',
        'Which to choose: Pick Thai for relieving heavy muscle stiffness; pick Aroma for jet lag relaxation and gentle recovery.',
      ],
      subheading: 'Handy Vietnamese Pressure Phrases',
      subList: [
        'Gentler / Softer: "Nhẹ"',
        'Medium: "Vừa"',
        'Stronger: "Mạnh"',
        'It hurts: "Đau"',
      ],
    },
    vi: {
      label: 'Tiếng Việt · So sánh Massage Thái & Massage Tinh dầu',
      paragraphs: [
        'Massage Thái chú trọng bấm huyệt và kéo giãn cơ xương khớp không dùng dầu, trong khi massage tinh dầu sử dụng kỹ thuật vuốt nhẹ nhàng giúp thư giãn sâu và dưỡng ẩm da.',
      ],
      list: [
        'Massage Thái: Phù hợp sau các hoạt động thể thao, du lịch vận động mạnh.',
        'Massage Aroma: Phù hợp cho những ai muốn giải tỏa căng thẳng và chăm sóc làn da.',
      ],
    },
  },

  hotStoneAndHeadSpa: {
    id: 'hot-stone-head-spa',
    icon: '🪨',
    title: 'Hot Stone Therapy & Vietnamese Herbal Head Spa',
    tocLabel: 'Hot Stone & Head Spa',
    ko: {
      label: '한국어 · 핫스톤 테라피 & 베트남 전통 두피 헤드스파',
      paragraphs: [
        '베트남 푸꾸옥의 인기 스파에서 사랑받는 스페셜 테라피인 핫스톤과 베트남식 허브 헤드스파(Gội đầu dưỡng sinh)의 매력과 효능입니다.',
      ],
      list: [
        '핫스톤 테라피 (Hot Stone): 약 50~60도로 데운 천연 현무암을 등과 척추, 혈자리에 얹고 오일과 함께 롤링합니다. 돌의 원적외선 열기가 근육 깊숙이 침투하여 뭉친 담과 결림을 부드럽게 녹여줍니다.',
        '베트남 두피 헤드스파 (Gội đầu dưỡng sinh): 자몽 껍질, 레몬그라스, 하수오 등 천연 허브를 달인 따뜻한 물로 두피를 세정하고, 두피·목·어깨·데콜테 라인의 경혈을 지압하여 두통과 눈의 피로를 즉각적으로 날려줍니다.',
      ],
      subheading: '이용 팁',
      subList: [
        '선번(햇빛 화상)이 있는 날에는 핫스톤보다는 쿨링 알로에 베라 마사지를 선택하세요.',
        '헤드스파 후에는 매장에서 헤어 드라이어와 오일 마무리를 제공하므로 바로 저녁 일정 진행이 가능합니다.',
      ],
    },
    en: {
      label: 'English · Hot Stone & Vietnamese Herbal Head Spa',
      paragraphs: [
        'Hot Stone Therapy uses warm volcanic basalt stones to radiate restorative thermal energy into stiff muscles.',
        'Vietnamese Herbal Head Spa (Gội đầu dưỡng sinh) is a holistic scalp and neck acupressure therapy using freshly brewed pomelo and lemongrass herbal rinses.',
      ],
      list: [
        'Hot Stone: Melts away deep-seated tensions and boosts blood flow.',
        'Herbal Head Spa: Calms migraines, refreshes sun-exposed hair, and relieves neck stiffness.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Trị liệu Đá nóng & Gội đầu Dưỡng sinh',
      paragraphs: [
        'Liệu pháp đá nóng giúp giải tỏa căng cơ bằng nhiệt năng tự nhiên, trong khi gội đầu dưỡng sinh thảo dược mang lại cảm giác thư thái tuyệt đối cho vùng đầu, cổ và vai gáy.',
      ],
    },
  },

  spaEtiquetteTips: {
    id: 'spa-etiquette-tips',
    icon: '🏷️',
    title: 'Spa Etiquette & Tipping Culture in Phu Quoc',
    tocLabel: 'Spa Etiquette & Tips',
    ko: {
      label: '한국어 · 스파 이용 에티켓과 마사지 팁 상식',
      paragraphs: [
        '푸꾸옥 선셋타운의 스파를 편안하게 즐기기 위한 기본 에티켓과 마사지사 팁(Tip)에 대한 표준적인 가이드입니다.',
      ],
      list: [
        '방문 시간: 예약 시간 10~15분 전에 도착하여 웰컴 티를 마시며 집중 관리 부위 체크리스트를 작성하는 것이 좋습니다.',
        '팁(Tip) 가이드라인: 베트남 스파는 팁 문화가 보편적입니다. 계산서에 "Tip Included" 또는 봉사료(Service Charge) 표기가 없는 경우, 만족스러운 관리에 대해 테라피스트에게 직접 팁을 전달하는 것이 매너입니다.',
        '권장 팁 금액: 60분 코스 기준 50,000 ~ 70,000 VND (약 3,000~4,000원), 90분 코스 기준 80,000 ~ 100,000 VND, 120분 코스 기준 100,000 ~ 150,000 VND가 표준적입니다.',
      ],
    },
    en: {
      label: 'English · Spa Etiquette & Tipping Standards',
      paragraphs: [
        'A quick orientation to ensure a seamless and respectful spa visit in Sunset Town.',
      ],
      list: [
        'Arrival: Arrive 10–15 minutes early to fill out consultation sheets and enjoy herbal welcome tea.',
        'Tipping Guideline: If service tip is not included in the bill, customary tips are 50,000–70,000 VND for 60 min, and 80,000–100,000 VND for 90 min per therapist.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Văn hóa Tips & Lưu ý khi đi Spa',
      paragraphs: [
        'Nên đến trước giờ hẹn 10-15 phút để thưởng thức trà chào mừng. Tiền tip thông lệ cho kỹ thuật viên thường từ 50.000 - 100.000 VND tùy theo thời lượng liệu trình.',
      ],
    },
  },

  // ==========================================
  // [HOTELS & ACCOMMODATION]
  // ==========================================
  hotelVsResidence: {
    id: 'hotel-vs-residence',
    icon: '🏨',
    title: 'Boutique Hotel vs Hillside Residence: How to Choose',
    tocLabel: 'Hotel vs Residence',
    ko: {
      label: '한국어 · 부티크 호텔 vs 힐사이드 고층 레지던스 비교',
      paragraphs: [
        '선셋타운 숙소는 지중해 해변 골목의 아늑한 "부티크 호텔"과 언덕 위 파노라마 전망을 자랑하는 "힐사이드 레지던스(The Hill / The Sky)"로 나뉩니다.',
      ],
      list: [
        '해안가 부티크 호텔 (Boutique Hotel): 1층에 카페/레스토랑이 입점해 있고 24시간 프런트 데스크, 매일 룸클리닝, 조식 서비스가 기본 제공됩니다. 키스브릿지 및 야시장 도보 접근성이 뛰어납니다.',
        '힐사이드 고층 레지던스 (High-rise Residence): 풀옵션 아파트형 구조로 인덕션 주방, 대형 냉장고, 드럼 세탁기가 완비되어 있어 아이 동반 가족이나 연박 여행자에게 최적입니다. 최상층 루프탑 인피니티 풀에서 선셋과 불꽃놀이를 한눈에 내려다볼 수 있습니다.',
      ],
      subheading: '추천 가이드',
      subList: [
        '커플/우정 여행 & 조식/프런트 편의 중시 → 해안가 부티크 호텔',
        '가족 여행 & 세탁/취사/초고층 불꽃놀이 뷰 중시 → 힐사이드 레지던스',
      ],
    },
    en: {
      label: 'English · Boutique Hotel vs Hillside High-rise Residence',
      paragraphs: [
        'Sunset Town offers two primary accommodation styles tailored to different traveler needs.',
      ],
      list: [
        'Seaside Boutique Hotels: Full hotel service, daily housekeeping, concierge, front desk, and steps from the night market.',
        'Hillside Residences (The Hill / The Sky): Fully furnished apartments with induction stoves, refrigerators, washing machines, and rooftop infinity pools.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Khách sạn Boutique & Căn hộ Hillside Residence',
      paragraphs: [
        'Khách sạn ven biển mang lại dịch vụ lễ tân và dọn phòng hàng ngày, trong khi căn hộ cao tầng Hillside sở hữu bếp nấu, máy giặt và hồ bơi vô cực ngắm pháo hoa tuyệt đẹp.',
      ],
    },
  },

  fireworksAndBuggy: {
    id: 'fireworks-and-buggy',
    icon: '🎆',
    title: 'Fireworks Room Tips & Electric Buggy Transport',
    tocLabel: 'Fireworks & Buggy',
    ko: {
      label: '한국어 · 불꽃놀이 명당 객실 & 전동 버기카 이용 꿀팁',
      paragraphs: [
        '선셋타운에서는 매일 밤 9시 30분 키스 오브 더 씨(Kiss of the Sea) 공연 피날레로 환상적인 불꽃놀이가 바다 위에서 펼쳐집니다.',
      ],
      list: [
        '불꽃놀이 직관 룸: 예약 시 "Fireworks View" 또는 "Sea View with Balcony" 객실을 선택하면 테라스에 앉아 맥주나 와인을 마시며 불꽃놀이를 1열에서 직관할 수 있습니다.',
        '전동 버기카(Buggy Car) 무료 셔틀: 선셋타운은 언덕과 계단 지형으로 이루어져 있어 무거운 캐리어가 있을 때 전동 버기카를 적극 활용해야 합니다. 대부분의 호텔과 레지던스에서 숙박객용 무료 버기 픽드랍을 지원하며, 로비 또는 Zalo/전화로 호출할 수 있습니다.',
        '체크인 보증금(Deposit): 체크인 시 50만~100만 VND 상당의 현금 또는 신용카드 보증금을 요구할 수 있으니 준비해 두세요.',
      ],
    },
    en: {
      label: 'English · Fireworks Viewing & Electric Buggy Shuttles',
      paragraphs: [
        'Sunset Town stages a world-class fireworks display every night at 21:30 over the sea.',
      ],
      list: [
        'Fireworks Balcony Rooms: Book rooms explicitly tagged "Fireworks View" to enjoy the pyrotechnics from your private terrace.',
        'Buggy Shuttle Service: Because of the town’s hilly Italianate terrain, request free electric golf-cart shuttles via hotel reception or Zalo for seamless luggage transit.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Ngắm pháo hoa & Xe điện Buggy',
      paragraphs: [
        'Pháo hoa rực rỡ diễn ra lúc 21:30 mỗi tối. Địa hình thị trấn dốc nên du khách nên tận dụng xe điện buggy miễn phí từ khách sạn.',
      ],
    },
  },

  // ==========================================
  // [SHOPPING & SOUVENIRS]
  // ==========================================
  phuQuocTopSouvenirs: {
    id: 'phu-quoc-top-souvenirs',
    icon: '🛍️',
    title: 'Phu Quoc Top 4 Souvenirs: Pepper, Fish Sauce, Sim Wine & Pearls',
    tocLabel: 'Top 4 Souvenirs',
    ko: {
      label: '한국어 · 푸꾸옥 4대 쇼핑 특산품 완벽 가이드',
      paragraphs: [
        '푸꾸옥 여행 기념품으로 무엇을 사야 할지 고민될 때 반드시 알아두어야 할 4대 핵심 특산품 고르는 법입니다.',
      ],
      list: [
        '1. 푸꾸옥 통후추 (Tiêu Phú Quốc): 흑후추는 진한 풍미로 육류 요리에, 백후추는 부드러운 매운맛으로 생선/수프에, 붉은 완숙 열매만 딴 적후추(Tiêu đỏ)는 향긋한 단맛이 감도는 최고급품입니다. 간편한 선물용으로는 "푸꾸옥 후추 소금(Muối tiêu)"이 인기입니다.',
        '2. 전통 피시소스 (Nước mắm): 라벨에 표기된 단백질 함량(Độ đạm)을 확인하세요. 40N~43N 표기가 된 제품이 100% 안초비로 숙성한 프리미엄 순수 원액입니다. (※ 비행기 탑승 시 기내 반입은 금지되며, 위탁 수하물로 부칠 때는 완충재 포장 필수입니다.)',
        '3. 심와인 & 심 시럽 (Rượu Sim): 푸꾸옥 야생 로즈머틀(Sim) 열매를 발효해 만든 과실주로, 달콤 쌉싸름하며 식후 소화와 피로 회복에 좋아 여성 여행자에게 큰 사랑을 받습니다.',
        '4. 천연 진주 (Ngọc trai): 품질 보증서가 발행되는 공인 진주 농장 직영 매장에서 구매하는 것을 권장합니다.',
      ],
      subheading: '열대과일 포장 팁',
      subList: [
        '손질된 망고, 망고스틴, 용과 도시락은 당일 섭취해야 신선합니다.',
        '대부분의 호텔은 냄새가 강한 두리안(Sầu riêng)과 착색 위험이 있는 망고스틴(Măng cụt)의 객실 반입을 금지하므로 로비 정책을 확인하세요.',
      ],
    },
    en: {
      label: 'English · Phu Quoc Top 4 Artisan Souvenirs',
      paragraphs: [
        'The definitive shopping guide for Phu Quoc’s renowned island specialties.',
      ],
      list: [
        'Phu Quoc Peppercorns: Look for Red Pepper (Tiêu đỏ) for gourmet floral spice, or Pepper Salt (Muối tiêu) for effortless grilling seasoning.',
        'Artisan Fish Sauce: Look for 40°N or 43°N protein content for the purest traditional barrel-aged anchovy elixir (pack in checked luggage only).',
        'Sim Wine (Rượu Sim): Sweet-tangy wild Myrtle berry liqueur, great for digestion.',
        'Cultured Pearls: Always purchase from reputable pearl showrooms with certificates.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · 4 đặc sản Phú Quốc nên mua làm quà',
      paragraphs: [
        'Tiêu đỏ Phú Quốc, nước mắm truyền thống độ đạm cao (40-43N), rượu sim rừng thanh ngọt và ngọc trai nuôi cấy là những món quà ý nghĩa nhất.',
      ],
    },
  },

  // ==========================================
  // [ACTIVITIES & ATTRACTIONS]
  // ==========================================
  cableCarAndIsland: {
    id: 'cable-car-and-island',
    icon: '🚡',
    title: 'Hon Thom Cable Car & Aquatopia Water Park Guide',
    tocLabel: 'Cable Car Guide',
    ko: {
      label: '한국어 · 기네스북 혼똔섬 케이블카 & 아쿠아토피아 꿀팁',
      paragraphs: [
        '선셋타운에서 출발하는 혼똔섬(Hòn Thơm) 케이블카는 기네스 세계 기록에 등재된 7,899m 길이의 세계 최장 3선 해상 케이블카입니다.',
      ],
      list: [
        '운행 시간 & 점심 브레이크 주의: 케이블카는 보통 오전 9시~11시 30분, 오후 13시 30분~17시 등으로 운행하며, 중간 점심시간(11:30~13:30경)에는 점검 및 휴게로 운행이 일시 중단될 수 있으므로 사전에 시간표를 꼭 확인하세요.',
        '탑승 명당: 진행 방향 오른쪽 좌석에 앉으면 선셋타운의 알록달록한 지중해 마을 전경과 푸른 바다의 어선들이 환상적으로 펼쳐집니다.',
        '아쿠아토피아(Aquatopia) 워터파크: 혼똔섬 내에 위치한 최신 테마 워터파크로 케이블카 티켓에 포함된 경우가 많습니다. 래시가드, 아쿠아슈즈, 방수팩을 챙기시면 유용합니다.',
      ],
    },
    en: {
      label: 'English · Hon Thom World-Record Cable Car Tips',
      paragraphs: [
        'Stretching 7,899 meters across turquoise seas, this Guinness-record 3-wire cable car links Sunset Town to Hon Thom Nature Park.',
      ],
      list: [
        'Midday Break: The cable car system frequently halts for maintenance between 11:30 and 13:30; plan your crossing accordingly.',
        'Photo Angle: Sit on the right-hand side facing forward for sweeping aerial views of Sunset Town.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Cáp treo Hòn Thơm & Công viên nước Aquatopia',
      paragraphs: [
        'Tuyến cáp treo vượt biển 3 dây dài nhất thế giới 7.899m. Cần lưu ý khung giờ nghỉ trưa của cáp treo để sắp xếp lịch trình vui chơi thuận lợi.',
      ],
    },
  },

  kissBridgeAndShow: {
    id: 'kiss-bridge-and-show',
    icon: '🌉',
    title: 'Kiss Bridge & Kiss of the Sea Night Show Tips',
    tocLabel: 'Bridge & Night Show',
    ko: {
      label: '한국어 · 키스브릿지(Cầu Hôn) & 키스 오브 더 씨 관람 꿀팁',
      paragraphs: [
        '선셋타운의 양대 랜드마크인 키스브릿지와 키스 오브 더 씨 멀티미디어 쇼를 완벽하게 즐기는 방법입니다.',
      ],
      list: [
        '키스브릿지(Cầu Hôn) 골든타임: 두 개의 다리가 30cm 간격을 두고 바다 위에서 마주 보는 구조로, 일몰 시간대(17:15~17:45)에 다리 사이로 해가 떨어지는 찰나의 광경이 가장 아름답습니다. 연인과 마주 보며 기념사진을 남기기 좋습니다.',
        '키스 오브 더 씨(Kiss of the Sea): 세계 최대 규모의 바다 수상 무대에서 분수, 홀로그램 레이저, 화염, 그리고 불꽃놀이가 어우러지는 종합 공연입니다.',
        '좌석 꿀팁: 중앙 열 약간 높은 좌석에 앉아야 전체 무대 연출과 뒤편의 대형 불꽃놀이를 한눈에 담을 수 있습니다.',
      ],
    },
    en: {
      label: 'English · Kiss Bridge & Kiss of the Sea Spectacle',
      paragraphs: [
        'The centerpiece architectural wonder and nightly grand multimedia performance.',
      ],
      list: [
        'Kiss Bridge Sunset Window: The two spans approach within 30 cm without touching. Arrive between 17:15 and 17:45 for the iconic solar alignment.',
        'Kiss of the Sea Show: High-tech ocean theater featuring water jets, fireballs, and synchronised pyrotechnics.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Cầu Hôn & Show diễn Kiss of the Sea',
      paragraphs: [
        'Cầu Hôn đón hoàng hôn đẹp nhất lúc 17:15 - 17:45. Show diễn Kiss of the Sea kết hợp nước, lửa, laser và pháo hoa đỉnh cao mỗi đêm.',
      ],
    },
  },

  // ==========================================
  // [CAFE & BEVERAGES]
  // ==========================================
  vietnameseCoffeeGuide: {
    id: 'vietnamese-coffee-guide',
    icon: '☕',
    title: 'The World of Vietnamese Coffee: Phin, Condensed Milk & Beyond',
    tocLabel: 'Coffee Guide',
    ko: {
      label: '한국어 · 베트남 4대 전통 커피 완벽 해설',
      paragraphs: [
        '세계 2위 커피 수출국인 베트남은 진하고 구수한 로부스타(Robusta) 원두와 전통 알루미늄 드리퍼 핀(Phin)을 사용한 고유의 커피 문화를 꽃피웠습니다.',
      ],
      list: [
        '1. 까페 쓰어다 (Cà phê sữa đá): 진하게 내린 커피 원액에 달콤한 연유(Sữa đặc)와 굵은 각얼음을 섞어 마시는 베트남의 국민 아이스 커피.',
        '2. 박씨우 (Bạc xỉu): 커피의 쓴맛이 부담스러운 분을 위해 우유와 연유의 비율을 높이고 커피를 살짝 얹은 부드럽고 달콤한 라떼.',
        '3. 까페 쯩 (Cà phê trứng - 에그 커피): 신선한 계란 노른자와 연유를 크림처럼 쫀쫀하게 휘핑하여 진한 커피 위에 얹은 하노이 명물 디저트 커피.',
        '4. 까페 무오이 (Cà phê muối - 소금 커피): 단짠의 황금 비율을 자랑하는 부드러운 쏠티드 크림을 얹은 중부 후에식 트렌디 커피.',
      ],
      subheading: '주문 꿀팁',
      subList: [
        '얼음 적게: "Ít đá (잇 다)"',
        '달지 않게 / 연유 적게: "Ít đường (잇 드엉)" / "Ít sữa (잇 쓰어)"',
      ],
    },
    en: {
      label: 'English · Vietnamese Coffee Culture Guide',
      paragraphs: [
        'Vietnam is celebrated for bold Robusta beans slow-dripped through a metal phin filter.',
      ],
      list: [
        'Cà phê sữa đá: Iced espresso-strength coffee with sweet condensed milk.',
        'Bạc xỉu: Sweet milky coffee with extra condensed milk and cream.',
        'Cà phê trứng (Egg Coffee): Velvety whipped egg yolk custard floating atop dark coffee.',
        'Cà phê muối (Salt Coffee): Salted cream topping contrasting with bittersweet coffee.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Văn hóa Cà phê Việt Nam',
      paragraphs: [
        'Cà phê phin truyền thống từ hạt Robusta đậm đà: cà phê sữa đá kinh điển, bạc xỉu ngọt ngào, cà phê trứng béo ngậy và cà phê muối thời thượng.',
      ],
    },
  },
}

// 2. 비즈니스 카테고리에 맞추어 지식 가이드를 생성하는 종합 함수
export function getKnowledgeGuideForBusiness(
  business: any,
  menuData?: any
): CategoryKnowledgeGuide {
  const cat = (business.category || '').toLowerCase()
  const subcat = (business.subcategory || '').toLowerCase()
  const name = `${business.public_name || ''} ${business.google_maps_name || ''}`.toLowerCase()
  const tags = (business.tags || []).map((t: string) => String(t).toLowerCase())
  const searchStr = `${name} ${cat} ${subcat} ${tags.join(' ')}`.toLowerCase()

  // 1. WELLNESS / SPA
  if (cat === 'wellness' || subcat.includes('spa') || searchStr.includes('massage') || searchStr.includes('마사지')) {
    return {
      category: 'wellness',
      eyebrow: 'Sunset Town Spa & Wellness Guide',
      title: 'Get to know Spa & Wellness Therapy',
      introText: 'Essential tips, massage styles comparison, and spa etiquette in Korean, English, and Vietnamese.',
      sections: [
        CATEGORY_KNOWLEDGE_ENTRIES.thaiVsAroma,
        CATEGORY_KNOWLEDGE_ENTRIES.hotStoneAndHeadSpa,
        CATEGORY_KNOWLEDGE_ENTRIES.spaEtiquetteTips,
      ],
    }
  }

  // 2. HOTELS / RESIDENCE
  if (cat === 'hotels' || subcat.includes('hotel') || subcat.includes('residence') || searchStr.includes('호텔') || searchStr.includes('숙소')) {
    return {
      category: 'hotels',
      eyebrow: 'Sunset Town Stay & Accommodation Guide',
      title: 'Tips for Your Sunset Town Stay',
      introText: 'Choosing your room type, catching the fireworks from your terrace, and handy transport guides.',
      sections: [
        CATEGORY_KNOWLEDGE_ENTRIES.hotelVsResidence,
        CATEGORY_KNOWLEDGE_ENTRIES.fireworksAndBuggy,
        CATEGORY_KNOWLEDGE_ENTRIES.kissBridgeAndShow,
      ],
    }
  }

  // 3. SHOPPING / ESSENTIALS
  if (cat === 'shopping' || cat === 'essentials' || searchStr.includes('mart') || searchStr.includes('마트') || searchStr.includes('쇼핑')) {
    return {
      category: 'shopping',
      eyebrow: 'Phu Quoc Souvenirs & Market Guide',
      title: 'Local Souvenirs & Shopping Essentials',
      introText: 'How to pick authentic Phu Quoc pepper, aged fish sauce, sim wine, and island pearls.',
      sections: [
        CATEGORY_KNOWLEDGE_ENTRIES.phuQuocTopSouvenirs,
        CATEGORY_KNOWLEDGE_ENTRIES.vietnameseCoffeeGuide,
      ],
    }
  }

  // 4. ACTIVITIES / ATTRACTIONS
  if (cat === 'activities' || searchStr.includes('cable') || searchStr.includes('케이블카') || searchStr.includes('tour')) {
    return {
      category: 'activities',
      eyebrow: 'Sunset Town Attractions & Sightseeing Guide',
      title: 'Experience Sunset Town Highlights',
      introText: 'Insider tips for the world-record cable car, Kiss Bridge, and spectacular ocean night shows.',
      sections: [
        CATEGORY_KNOWLEDGE_ENTRIES.cableCarAndIsland,
        CATEGORY_KNOWLEDGE_ENTRIES.kissBridgeAndShow,
        CATEGORY_KNOWLEDGE_ENTRIES.fireworksAndBuggy,
      ],
    }
  }

  // 5. CAFE / BARS
  if (cat === 'cafe' || cat === 'bars' || searchStr.includes('coffee') || searchStr.includes('카페')) {
    return {
      category: 'cafe',
      eyebrow: 'Vietnamese Coffee & Beverage Guide',
      title: 'Sip & Savor: Vietnamese Cafe Culture',
      introText: 'From traditional Phin drip to egg and salted foam coffee, discover Vietnam’s coffee heritage.',
      sections: [
        CATEGORY_KNOWLEDGE_ENTRIES.vietnameseCoffeeGuide,
        CATEGORY_KNOWLEDGE_ENTRIES.kissBridgeAndShow,
      ],
    }
  }

  // 6. DEFAULT / DINING / FOOD
  // 기존 foodKnowledge 모듈 활용
  const defaultFoodGuide = [
    FOOD_KNOWLEDGE_ENTRIES.seafood,
    FOOD_KNOWLEDGE_ENTRIES.pho,
    FOOD_KNOWLEDGE_ENTRIES.origins,
    FOOD_KNOWLEDGE_ENTRIES.howToEat,
  ]

  return {
    category: 'dining',
    eyebrow: 'Phu Quoc Culinary & Food Guide',
    title: 'Get to know the food',
    introText: 'Korean first, followed by English and Vietnamese.',
    sections: defaultFoodGuide,
  }
}
