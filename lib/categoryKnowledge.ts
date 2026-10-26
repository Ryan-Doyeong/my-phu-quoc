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
        '스파 메뉴의 대표 코스인 타이 마사지와 아로마 마사지는 진행 방식과 관리 목적에 차이가 있습니다.',
        '개인의 피로 상태와 일정(이동 직전인지, 샤워 가능 여부 등)을 고려하여 선택할 수 있습니다.',
      ],
      list: [
        '타이 마사지 (건식 · 지압 & 스트레칭): 오일을 바르지 않고 전용 옷을 입은 채 진행됩니다. 손가락, 팔꿈치, 무릎을 이용한 경혈 지압과 요가식 수동 스트레칭으로 굳은 관절과 근육을 이완하는 방식입니다.',
        '아로마 오일 마사지 (습식 · 림프 순환): 천연 에센셜 오일(라벤더, 레몬그라스, 코코넛 등)을 전신에 도포하여 부드러운 압으로 케어합니다. 부드러운 압의 릴랙스 관리를 원하는 경우 주로 선택합니다.',
        '선택 안내: 활동적인 일정 후 근육 스트레칭을 원할 때는 타이, 비행 후 피로 완화나 편안한 휴식을 원할 때는 아로마 코스를 고려할 수 있습니다.',
      ],
      subheading: '마사지 압 조절 베트남어 안내',
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
        'Two common spa treatments differ significantly in philosophy, technique, and application.',
      ],
      list: [
        'Thai Traditional Massage (Dry / Acupressure & Stretch): Performed on a mat with loose-fitting clothes. Practitioners use rhythmic compression and yoga-like stretching to restore flexibility.',
        'Aroma Essential Oil Massage (Gentle / Lymphatic): Gentle, sweeping strokes using natural botanical oils focused on relaxation and skin hydration.',
        'Which to choose: Pick Thai for full-body stretching; pick Aroma for gentle recovery and unwinding.',
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
        'Massage Thái chú trọng bấm huyệt và kéo giãn cơ xương khớp không dùng dầu, trong khi massage tinh dầu sử dụng kỹ thuật vuốt nhẹ nhàng giúp thư giãn và dưỡng ẩm da.',
      ],
      list: [
        'Massage Thái: Phù hợp sau các hoạt động thể thao, du lịch vận động.',
        'Massage Aroma: Phù hợp cho những ai muốn thư giãn nhẹ nhàng và chăm sóc làn da.',
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
        '베트남 푸꾸옥의 스파에서 제공하는 핫스톤과 베트남식 허브 헤드스파(Gội đầu dưỡng sinh)의 특징과 이용 안내입니다.',
      ],
      list: [
        '핫스톤 테라피 (Hot Stone): 약 50~60도로 데운 천연 현무암을 등과 척추 부위에 얹고 오일과 함께 관리합니다. 스톤의 온열감을 통해 뭉친 부위의 긴장을 완화합니다.',
        '베트남 두피 헤드스파 (Gội đầu dưỡng sinh): 자몽 껍질, 레몬그라스 등 천연 허브를 달인 따뜻한 물로 두피를 세정하고, 두피·목·어깨 라인을 지압하여 피로를 덜어줍니다.',
      ],
      subheading: '이용 안내',
      subList: [
        '햇빛에 그을린 날에는 온열 핫스톤보다 알로에 베라 등 쿨링 케어를 선택하는 것이 무난합니다.',
        '헤드스파 후에는 매장에서 헤어 드라이어와 모발 정돈 서비스를 제공합니다.',
      ],
    },
    en: {
      label: 'English · Hot Stone & Vietnamese Herbal Head Spa',
      paragraphs: [
        'Hot Stone Therapy uses warm basalt stones to apply soothing heat to tense muscles.',
        'Vietnamese Herbal Head Spa (Gội đầu dưỡng sinh) is a scalp and neck acupressure therapy using brewed pomelo and lemongrass herbal rinses.',
      ],
      list: [
        'Hot Stone: Delivers gentle thermal therapy to ease muscle stiffness.',
        'Herbal Head Spa: Cleanses the scalp and eases neck and shoulder fatigue.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Trị liệu Đá nóng & Gội đầu Dưỡng sinh',
      paragraphs: [
        'Liệu pháp đá nóng giúp giải tỏa căng cơ bằng nhiệt năng tự nhiên, trong khi gội đầu dưỡng sinh thảo dược chăm sóc vùng đầu, cổ và vai gáy.',
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
        '푸꾸옥 선셋타운의 스파를 편안하게 즐기기 위한 기본 에티켓과 팁 안내입니다.',
      ],
      list: [
        '방문 시간: 예약 시간 10~15분 전에 도착하여 웰컴 티를 마시며 집중 관리 부위 체크리스트를 작성하는 것이 좋습니다.',
        '팁(Tip) 가이드라인: 베트남 스파는 매장에 따라 팁 정책이 다릅니다. 계산서에 "Tip Included" 또는 봉사료(Service Charge) 포함 여부를 먼저 확인하시고, 팁 정책이나 권장 여부는 매장 카운터에 직접 문의하는 것이 가장 정확합니다.',
      ],
    },
    en: {
      label: 'English · Spa Etiquette & Tipping Standards',
      paragraphs: [
        'A quick orientation to ensure a seamless and respectful spa visit in Sunset Town.',
      ],
      list: [
        'Arrival: Arrive 10–15 minutes early to fill out consultation sheets and enjoy herbal welcome tea.',
        'Tipping Guideline: Check your bill first to see if service charge or tip is already included. Tipping policies vary by spa; please verify current guidelines with the reception desk.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Văn hóa Tips & Lưu ý khi đi Spa',
      paragraphs: [
        'Nên đến trước giờ hẹn 10-15 phút để thưởng thức trà chào mừng. Quý khách vui lòng kiểm tra hóa đơn đã bao gồm phí dịch vụ hay chưa và tham khảo quy định tip tại quầy lễ tân.',
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
        '선셋타운 숙소는 지중해 해변 골목의 "부티크 호텔"과 언덕 위 전망을 갖춘 "힐사이드 레지던스(The Hill / The Sky)"로 나뉩니다.',
      ],
      list: [
        '해안가 부티크 호텔 (Boutique Hotel): 24시간 프런트 데스크와 룸클리닝 서비스를 운영하는 곳이 많으며, 키스브릿지 및 야시장 인근에 위치합니다. 조식 제공 여부 및 식음 시설은 예약 조건과 숙소별 정책을 확인하세요.',
        '힐사이드 고층 레지던스 (High-rise Residence): 아파트형 구조로 주방 공간과 세탁 시설을 갖춘 객실이 많아 장기 투숙이나 가족 여행객이 주로 이용합니다. 수영장 및 부대시설 운영 여부는 숙소별 현장 안내를 확인하세요.',
      ],
      subheading: '이용 가이드',
      subList: [
        '프런트 데스크 및 야시장 도보 동선 중심 → 해안가 부티크 호텔 (예약 조건별 부대 혜택 확인 필요)',
        '세탁/취사 시설 및 고층 전망 중심 → 힐사이드 레지던스 (객실 타입별 시설 확인 필요)',
      ],
    },
    en: {
      label: 'English · Boutique Hotel vs Hillside High-rise Residence',
      paragraphs: [
        'Sunset Town offers two primary accommodation styles tailored to different traveler needs.',
      ],
      list: [
        'Seaside Boutique Hotels: Full hotel front desk, housekeeping service, and situated near the night market area. Breakfast inclusions and amenities vary by booking plan; please verify room details.',
        'Hillside Residences (The Hill / The Sky): Apartment-style units featuring kitchen spaces and laundry appliances, often utilized for longer stays and family trips. Pool access and facilities vary by building; check check-in policies.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Khách sạn Boutique & Căn hộ Hillside Residence',
      paragraphs: [
        'Khách sạn ven biển mang lại dịch vụ lễ tân và dọn phòng, trong khi căn hộ Hillside sở hữu không gian bếp và máy giặt tiện lợi. Tiện ích bữa sáng và hồ bơi phụ thuộc vào điều kiện đặt phòng của từng cơ sở.',
      ],
    },
  },

  fireworksAndBuggy: {
    id: 'fireworks-and-buggy',
    icon: '🎆',
    title: 'Fireworks Room Tips & Electric Buggy Transport',
    tocLabel: 'Fireworks & Buggy',
    ko: {
      label: '한국어 · 불꽃놀이 조망 객실 & 전동 버기카 이용 안내',
      paragraphs: [
        '선셋타운에서는 매주 수~월요일 밤 9시 키스 오브 더 씨(Kiss of the Sea) 공연 피날레(약 21:25)로 불꽃놀이가 바다 위에서 펼쳐집니다 (화요일 정기 휴무).',
      ],
      list: [
        '불꽃놀이 조망 룸: 예약 시 "Fireworks View" 또는 "Sea View with Balcony" 객실을 선택하면 객실 테라스에서 불꽃놀이를 조망할 수 있습니다 (객실 위치별 시야각 상이).',
        '전동 버기카(Buggy Car) 이동: 선셋타운은 언덕과 계단 지형으로 이루어져 있어 무거운 짐이 있을 때 전동 버기카 이용 여부를 미리 확인하는 것이 좋습니다. 숙소별 버기 픽드랍 운영 여부와 유/무료 조건은 체크인 전 호텔 측에 문의하시기 바랍니다.',
        '체크인 보증금(Deposit): 체크인 시 숙소 규정에 따라 보증금(신용카드 가승인 또는 현금 디포짓)이 요구될 수 있으니 예약 확인서의 체크인 규정을 확인하세요.',
      ],
    },
    en: {
      label: 'English · Fireworks Viewing & Electric Buggy Shuttles',
      paragraphs: [
        'Sunset Town stages a fireworks display as the grand finale of the Kiss of the Sea show (Wed–Mon around 21:25 over the sea; closed Tuesdays).',
      ],
      list: [
        'Fireworks Balcony Rooms: Book rooms explicitly tagged "Fireworks View" to enjoy the pyrotechnics from your private balcony (views vary by room orientation).',
        'Buggy Transport: Because of the town’s hilly cobblestone terrain, inquire with your property in advance regarding buggy shuttle availability and fare terms for luggage transfer.',
        'Security Deposit: Check-in deposits (credit card pre-authorization or cash) may be requested depending on each property’s policy. Please review your booking confirmation.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Ngắm pháo hoa & Xe điện Buggy',
      paragraphs: [
        'Thị trấn Hoàng Hôn có màn bắn pháo hoa lúc ~21:25 từ Thứ 4 đến Thứ 2 (Thứ 3 nghỉ định kỳ). Địa hình thị trấn có nhiều dốc và bậc thang; quý khách vui lòng liên hệ trước với nơi lưu trú để kiểm tra dịch vụ xe điện buggy và quy định đặt cọc phòng.',
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
      label: '한국어 · 푸꾸옥 4대 쇼핑 특산품 안내',
      paragraphs: [
        '푸꾸옥 여행 기념품으로 무엇을 사야 할지 고민될 때 반드시 알아두어야 할 4대 핵심 특산품 고르는 법입니다.',
      ],
      list: [
        '1. 푸꾸옥 통후추 (Tiêu Phú Quốc): 흑후추는 진한 풍미로 육류 요리에, 백후추는 부드러운 매운맛으로 생선/수프에, 붉은 완숙 열매만 딴 적후추(Tiêu đỏ)는 향긋한 단맛이 감도는 고급 품종입니다. 선물용으로는 "푸꾸옥 후추 소금(Muối tiêu)"도 널리 활용됩니다.',
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
      label: '한국어 · 혼똔섬 케이블카 & 아쿠아토피아 안내',
      paragraphs: [
        '선셋타운에서 출발하는 혼똔섬(Hòn Thơm) 케이블카는 기네스 세계 기록에 등재된 7,899m 길이의 3선 해상 케이블카입니다.',
      ],
      list: [
        '운행 시간 & 점심 브레이크 주의: 케이블카는 보통 오전 9시~11시 30분, 오후 13시 30분~17시 등으로 운행하며, 중간 점심시간(11:30~13:30경)에는 점검 및 휴게로 운행이 일시 중단될 수 있으므로 사전에 시간표를 꼭 확인하세요.',
        '탑승 안내: 탑승 중 선셋타운 마을 전경과 바다 풍경을 조망할 수 있습니다.',
        '아쿠아토피아(Aquatopia) 워터파크: 혼똔섬 내에 위치한 테마 워터파크로 케이블카 티켓에 포함된 경우가 많습니다. 래시가드, 아쿠아슈즈, 방수팩을 챙기시면 유용합니다.',
      ],
    },
    en: {
      label: 'English · Hon Thom World-Record Cable Car Tips',
      paragraphs: [
        'Stretching 7,899 meters across turquoise seas, this Guinness-record 3-wire cable car links Sunset Town to Hon Thom Nature Park.',
      ],
      list: [
        'Midday Break: The cable car system frequently halts for maintenance between 11:30 and 13:30; plan your crossing accordingly.',
        'Scenery: Enjoy sweeping aerial views of Sunset Town and the sea during the crossing.',
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
      label: '한국어 · 키스브릿지(Cầu Hôn) & 키스 오브 더 씨 관람 안내',
      paragraphs: [
        '선셋타운의 주요 랜드마크인 키스브릿지와 키스 오브 더 씨 멀티미디어 쇼 관람 안내입니다.',
      ],
      list: [
        '키스브릿지(Cầu Hôn) 일몰 시간: 두 개의 다리가 30cm 간격을 두고 바다 위에서 마주 보는 구조로, 일몰 시간대(17:15~17:45)에 다리 사이로 해가 떨어지는 풍경을 조망할 수 있습니다.',
        '키스 오브 더 씨(Kiss of the Sea): 바다 수상 무대에서 분수, 홀로그램 레이저, 화염, 그리고 불꽃놀이가 어우러지는 종합 공연입니다.',
        '좌석 안내: 중앙 구역 좌석에서 전체 무대 연출과 불꽃놀이를 조망하기 용이합니다.',
      ],
    },
    en: {
      label: 'English · Kiss Bridge & Kiss of the Sea Spectacle',
      paragraphs: [
        'Centerpiece architectural landmark and grand nightly multimedia performance.',
      ],
      list: [
        'Kiss Bridge Sunset Window: The two spans approach within 30 cm without touching. Arrive between 17:15 and 17:45 for the iconic solar alignment.',
        'Kiss of the Sea Show: High-tech ocean theater featuring water jets, fireballs, and synchronized pyrotechnics (Wed–Mon 21:00; Tue dark).',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Cầu Hôn & Show diễn Kiss of the Sea',
      paragraphs: [
        'Cầu Hôn đón hoàng hôn đẹp nhất lúc 17:15 - 17:45. Show diễn Kiss of the Sea kết hợp nước, lửa, laser và pháo hoa lúc 21h00 từ Thứ 4 đến Thứ 2 (Thứ 3 nghỉ định kỳ).',
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
      label: '한국어 · 베트남 4대 전통 커피 해설',
      paragraphs: [
        '세계 2위 커피 수출국인 베트남은 진하고 구수한 로부스타(Robusta) 원두와 전통 알루미늄 드리퍼 핀(Phin)을 사용한 고유의 커피 문화를 꽃피웠습니다.',
      ],
      list: [
        '1. 까페 쓰어다 (Cà phê sữa đá): 진하게 내린 커피 원액에 달콤한 연유(Sữa đặc)와 굵은 각얼음을 섞어 마시는 베트남의 국민 아이스 커피.',
        '2. 박씨우 (Bạc xỉu): 커피의 쓴맛이 부담스러운 분을 위해 우유와 연유의 비율을 높이고 커피를 살짝 얹은 부드럽고 달콤한 라떼.',
        '3. 까페 쯩 (Cà phê trứng - 에그 커피): 신선한 계란 노른자와 연유를 크림처럼 쫀쫀하게 휘핑하여 진한 커피 위에 얹은 하노이 명물 디저트 커피.',
        '4. 까페 무오이 (Cà phê muối - 소금 커피): 단짠의 황금 비율을 자랑하는 부드러운 쏠티드 크림을 얹은 중부 후에식 트렌디 커피.',
      ],
      subheading: '주문 안내',
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
