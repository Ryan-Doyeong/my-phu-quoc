import type { Locale } from '@/lib/i18n/config'
import type { VehicleRouteKey } from '@/lib/vehiclePricing'

export interface VehiclePricingCopy {
  eyebrow: string
  title: string
  subtitle: string
  seatsLabel: (seats: number) => string
  southTitle: string
  northTitle: string
  routeHeader: string
  priceHeader: string
  routes: Record<VehicleRouteKey, string>
  tourIncludes: string
  roundTripNote: string
  overtimeNote: (priceLabel: string) => string
  extraNote: string
}

/**
 * 영어·베트남어 노선명은 업체 제공 표(Bang_Gia_Xe_Phu_Quoc_Bilingual.xlsx)의 표기를 따른다.
 * 그 외 언어는 번역 감수 전까지 영어를 그대로 보여준다(getVehiclePricingCopy 참고).
 */
const EN: VehiclePricingCopy = {
  eyebrow: 'Vehicle Rates',
  title: 'Transfer & Car Tour Rates',
  subtitle: 'Published rates per vehicle in VND. Choose a 4-seater or 7-seater.',
  seatsLabel: (seats) => `${seats}-seater`,
  southTitle: 'South Island',
  northTitle: 'North Island',
  routeHeader: 'Route / Service',
  priceHeader: 'Price',
  routes: {
    airportToSouth: 'Airport → South Island',
    southToAirport: 'South Island → Airport',
    southToCenterOneWay: 'South Island → Center (1-way)',
    southToCenterRoundTrip: 'South Island → Center (Round-trip)',
    southToNorthOneWay: 'South Island → North Island (1-way)',
    southToNorthRoundTrip: 'South Island → North Island (Round-trip, 8 hours)',
    southSightseeingTour: 'South Island Sightseeing Tour',
    airportToNorth: 'Airport → North Island',
    northToAirport: 'North Island → Airport',
    northToCenter: 'North Island → Center',
    northToSouthOneWay: 'North Island → South Island (1-way)',
    northToSouthRoundTrip: 'North Island → South Island (Round-trip, 8 hours)',
  },
  tourIncludes:
    'South Island Sightseeing Tour includes: fish sauce factory, Phu Quoc specialty shopping center, swiftlet nest & agarwood workshop, silk & furniture handicraft workshop, Ngoc Hien pearl farm, pepper farm, sim wine vineyard, and dining drop-off/pick-up support.',
  roundTripNote: 'Round-trip tour prices include up to 8 hours of vehicle use.',
  overtimeNote: (priceLabel) => `Additional hour surcharge: ${priceLabel} per hour if the limit is exceeded.`,
  extraNote: 'Rates are per vehicle. Please contact us to confirm availability and pick-up details.',
}

const VI: VehiclePricingCopy = {
  ...EN,
  eyebrow: 'Bảng giá xe',
  title: 'Bảng giá xe đưa đón & tour xe',
  subtitle: 'Giá niêm yết theo xe (VND). Chọn xe 4 chỗ hoặc 7 chỗ.',
  seatsLabel: (seats) => `Xe ${seats} chỗ`,
  southTitle: 'Khu vực Nam đảo',
  northTitle: 'Khu vực Bắc đảo',
  routeHeader: 'Lộ trình / Loại hình',
  priceHeader: 'Giá xe',
  routes: {
    airportToSouth: 'Sân bay → Nam đảo',
    southToAirport: 'Nam đảo → Sân bay',
    southToCenterOneWay: 'Nam đảo → Trung tâm (1 chiều)',
    southToCenterRoundTrip: 'Nam đảo → Trung tâm (2 chiều)',
    southToNorthOneWay: 'Nam đảo → Bắc đảo (1 chiều)',
    southToNorthRoundTrip: 'Nam đảo → Bắc đảo (2 chiều, 8 tiếng)',
    southSightseeingTour: 'Tour tham quan các điểm tại Nam đảo',
    airportToNorth: 'Sân bay → Bắc đảo',
    northToAirport: 'Bắc đảo → Sân bay',
    northToCenter: 'Bắc đảo → Trung tâm',
    northToSouthOneWay: 'Bắc đảo → Nam đảo (1 chiều)',
    northToSouthRoundTrip: 'Bắc đảo → Nam đảo (2 chiều, 8 tiếng)',
  },
  tourIncludes:
    'Tour tham quan Nam đảo bao gồm: nhà thùng nước mắm, khu mua sắm đặc sản Phú Quốc, khu làm thủ công yến & vườn trầm hương, khu làm thủ công tơ lụa & đồ nội thất, trang trại ngọc trai Ngọc Hiền, vườn tiêu, vườn sim, hỗ trợ đưa khách đi ăn uống.',
  roundTripNote: 'Giá tour 2 chiều bao gồm thời gian sử dụng xe tối đa 8 tiếng.',
  overtimeNote: (priceLabel) => `Nếu vượt quá thời gian quy định, phụ thu ${priceLabel}/giờ.`,
  extraNote: 'Giá tính theo xe. Vui lòng liên hệ để xác nhận xe trống và thông tin đón khách.',
}

// 한국어·중국어·러시아어·일본어·힌디어: Gemini 초안 → ChatGPT 감수 대상(검수 전 문구는 미확정)
const TRANSLATED: Partial<Record<Locale, VehiclePricingCopy>> = {
  ko: {
    eyebrow: "차량 요금",
    title: "이동 및 차량 투어 요금",
    subtitle: "차량 1대당 기준 공시 요금입니다. 4인승 또는 7인승 중 선택하세요.",
    seatsLabel: (seats) => `${seats}인승`,
    southTitle: "남부",
    northTitle: "북부",
    routeHeader: "경로 / 서비스",
    priceHeader: "요금",
    routes: {
      airportToSouth: "공항 → 남부",
      southToAirport: "남부 → 공항",
      southToCenterOneWay: "남부 → 시내 (편도)",
      southToCenterRoundTrip: "남부 → 시내 (왕복)",
      southToNorthOneWay: "남부 → 북부 (편도)",
      southToNorthRoundTrip: "남부 → 북부 (왕복, 8시간)",
      southSightseeingTour: "남부 관광 투어",
      airportToNorth: "공항 → 북부",
      northToAirport: "북부 → 공항",
      northToCenter: "북부 → 시내",
      northToSouthOneWay: "북부 → 남부 (편도)",
      northToSouthRoundTrip: "북부 → 남부 (왕복, 8시간)",
    },
    tourIncludes: "남부 관광 투어 포함 코스: 피시소스 공장, 푸꾸옥 특산품 쇼핑센터, 제비집 및 침향 공방, 실크 및 가구 수공예 공방, 응옥히엔(Ngoc Hien) 진주 농장, 후추 농장, 심 와인 양조장, 식사 장소 이동 지원.",
    roundTripNote: "왕복 투어 요금에는 최대 8시간의 차량 이용이 포함되어 있습니다.",
    overtimeNote: (priceLabel) => `추가 시간 요금: 제한 시간 초과 시 시간당 ${priceLabel}.`,
    extraNote: "요금은 차량 1대 기준입니다. 예약 가능 여부와 픽업 세부 사항을 확인하려면 문의해 주세요.",
  },
  zh: {
    eyebrow: "车辆费率",
    title: "接送及包车游费率",
    subtitle: "按每辆车公布的费率。请选择4座或7座车型。",
    seatsLabel: (seats) => `${seats}座`,
    southTitle: "南岛",
    northTitle: "北岛",
    routeHeader: "路线 / 服务",
    priceHeader: "价格",
    routes: {
      airportToSouth: "机场 → 南岛",
      southToAirport: "南岛 → 机场",
      southToCenterOneWay: "南岛 → 市中心（单程）",
      southToCenterRoundTrip: "南岛 → 市中心（往返）",
      southToNorthOneWay: "南岛 → 北岛（单程）",
      southToNorthRoundTrip: "南岛 → 北岛（往返，8小时）",
      southSightseeingTour: "南岛观光游",
      airportToNorth: "机场 → 北岛",
      northToAirport: "北岛 → 机场",
      northToCenter: "北岛 → 市中心",
      northToSouthOneWay: "北岛 → 南岛（单程）",
      northToSouthRoundTrip: "北岛 → 南岛（往返，8小时）",
    },
    tourIncludes: "南岛观光游包含：鱼露工厂、富国岛特产购物中心、燕窝与沉香工坊、丝绸与家具手工艺工坊、Ngoc Hien 珍珠养殖场、胡椒园、Sim酒庄（Sim wine），以及就餐地点接送支持。",
    roundTripNote: "往返包车游价格包含最多8小时的车辆使用。",
    overtimeNote: (priceLabel) => `超时附加费：若超出时限，每小时加收 ${priceLabel}。`,
    extraNote: "费率按每辆车计算。请联系我们确认车辆可用性及接送详情。",
  },
  ru: {
    eyebrow: "Тарифы на транспорт",
    title: "Тарифы на трансфер и автотуры",
    subtitle: "Официальные тарифы за автомобиль. Выберите 4-местный или 7-местный вариант.",
    seatsLabel: (seats) => `${seats}-местный`,
    southTitle: "Южный остров",
    northTitle: "Северный остров",
    routeHeader: "Маршрут / Услуга",
    priceHeader: "Цена",
    routes: {
      airportToSouth: "Аэропорт → Южный остров",
      southToAirport: "Южный остров → Аэропорт",
      southToCenterOneWay: "Южный остров → Центр (в одну сторону)",
      southToCenterRoundTrip: "Южный остров → Центр (туда и обратно)",
      southToNorthOneWay: "Южный остров → Северный остров (в одну сторону)",
      southToNorthRoundTrip: "Южный остров → Северный остров (туда и обратно, 8 часов)",
      southSightseeingTour: "Обзорный тур по Южному острову",
      airportToNorth: "Аэропорт → Северный остров",
      northToAirport: "Северный остров → Аэропорт",
      northToCenter: "Северный остров → Центр",
      northToSouthOneWay: "Северный остров → Южный остров (в одну сторону)",
      northToSouthRoundTrip: "Северный остров → Южный остров (туда и обратно, 8 часов)",
    },
    tourIncludes: "Обзорный тур по Южному острову (Фукуок) включает: фабрику рыбного соуса, торговый центр специй и деликатесов (Фукуок), мастерскую ласточкиных гнезд и агарового дерева, ремесленную мастерскую шелка и мебели, жемчужную ферму Ngoc Hien, перечную ферму, винодельню вина Sim (Sim wine), а также трансфер к месту питания и обратно.",
    roundTripNote: "В стоимость туров туда и обратно включено использование автомобиля до 8 часов.",
    overtimeNote: (priceLabel) => `Доплата за дополнительный час: ${priceLabel} в час при превышении лимита.`,
    extraNote: "Тарифы указаны за автомобиль. Пожалуйста, свяжитесь с нами для подтверждения наличия и деталей подачи.",
  },
  ja: {
    eyebrow: "車両料金",
    title: "送迎・チャーターツアー料金",
    subtitle: "車両1台あたりの公示料金です。4人乗りまたは7人乗りをお選びください。",
    seatsLabel: (seats) => `${seats}人乗り`,
    southTitle: "南部（南島）",
    northTitle: "北部（北島）",
    routeHeader: "ルート / サービス",
    priceHeader: "料金",
    routes: {
      airportToSouth: "空港 → 南部",
      southToAirport: "南部 → 空港",
      southToCenterOneWay: "南部 → 市内中心部（片道）",
      southToCenterRoundTrip: "南部 → 市内中心部（往復）",
      southToNorthOneWay: "南部 → 北部（片道）",
      southToNorthRoundTrip: "南部 → 北部（往復・8時間）",
      southSightseeingTour: "南部観光ツアー",
      airportToNorth: "空港 → 北部",
      northToAirport: "北部 → 空港",
      northToCenter: "北部 → 市内中心部",
      northToSouthOneWay: "北部 → 南部（片道）",
      northToSouthRoundTrip: "北部 → 南部（往復・8時間）",
    },
    tourIncludes: "南部観光ツアーに含まれるもの：ヌクマム（魚醤）工場、フーコック特産品ショッピングセンター、ツバメの巣＆沈香工房、シルク＆家具工芸工房、Ngoc Hien 真珠養殖場、胡椒農園、シムワイン（Sim wine）醸造所、および食事場所への送迎サポート。",
    roundTripNote: "往復ツアー料金には、最大8時間の車両利用が含まれています。",
    overtimeNote: (priceLabel) => `延長料金：制限時間を超えた場合、1時間あたり ${priceLabel} の追加料金が発生します。`,
    extraNote: "料金は車両1台あたりです。空き状況やピックアップの詳細についてはお問い合わせください。",
  },
  hi: {
    eyebrow: "वाहन दरें",
    title: "ट्रांसफर और कार टूर दरें",
    subtitle: "प्रति वाहन प्रकाशित दरें। 4-सीटर या 7-सीटर चुनें।",
    seatsLabel: (seats) => `${seats}-सीटर`,
    southTitle: "दक्षिणी द्वीप",
    northTitle: "उत्तरी द्वीप",
    routeHeader: "रूट / सेवा",
    priceHeader: "कीमत",
    routes: {
      airportToSouth: "एयरपोर्ट → दक्षिणी द्वीप",
      southToAirport: "दक्षिणी द्वीप → एयरपोर्ट",
      southToCenterOneWay: "दक्षिणी द्वीप → केंद्र (1-तरफ़ा)",
      southToCenterRoundTrip: "दक्षिणी द्वीप → केंद्र (राउंड-ट्रिप)",
      southToNorthOneWay: "दक्षिणी द्वीप → उत्तरी द्वीप (1-तरफ़ा)",
      southToNorthRoundTrip: "दक्षिणी द्वीप → उत्तरी द्वीप (राउंड-ट्रिप, 8 घंटे)",
      southSightseeingTour: "दक्षिणी द्वीप दर्शनीय स्थल टूर",
      airportToNorth: "एयरपोर्ट → उत्तरी द्वीप",
      northToAirport: "उत्तरी द्वीप → एयरपोर्ट",
      northToCenter: "उत्तरी द्वीप → केंद्र",
      northToSouthOneWay: "उत्तरी द्वीप → दक्षिणी द्वीप (1-तरफ़ा)",
      northToSouthRoundTrip: "उत्तरी द्वीप → दक्षिणी द्वीप (राउंड-ट्रिप, 8 घंटे)",
    },
    tourIncludes: "दक्षिणी द्वीप दर्शनीय स्थल टूर में शामिल हैं: फिश सॉस फैक्ट्री, Phu Quoc स्पेशलिटी शॉपिंग सेंटर, स्विफ्टलेट नेस्ट और अगरवुड वर्कशॉप, रेशम और फर्नीचर हस्तशिल्प वर्कशॉप, Ngoc Hien मोती फार्म, काली मिर्च फार्म, सिम वाइन (Sim wine) वाइनयार्ड, और भोजन के स्थान तक पिक-अप/ड्रॉप-ऑफ सहायता।",
    roundTripNote: "राउंड-ट्रिप टूर की कीमतों में अधिकतम 8 घंटे तक वाहन का उपयोग शामिल है।",
    overtimeNote: (priceLabel) => `अतिरिक्त घंटे का शुल्क: समय सीमा समाप्त होने पर प्रति घंटा ${priceLabel}।`,
    extraNote: "दरें प्रति वाहन हैं। उपलब्धता और पिक-अप विवरण की पुष्टि करने के लिए कृपया हमसे संपर्क करें।",
  },
}

const COPY: Partial<Record<Locale, VehiclePricingCopy>> = {
  ...TRANSLATED,
  en: EN,
  vi: VI,
}

export function getVehiclePricingCopy(locale: Locale): VehiclePricingCopy {
  return COPY[locale] ?? EN
}
