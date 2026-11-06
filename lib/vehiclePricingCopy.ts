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
  subtitle: 'Published rates per vehicle in VND. Choose a 4-, 7- or 16-seater.',
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
  subtitle: 'Giá niêm yết theo xe (VND). Chọn xe 4, 7 hoặc 16 chỗ.',
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

// 한국어·중국어·러시아어·일본어·힌디어: Gemini 초안 → ChatGPT 감수 반영.
// 'Sim wine'(심 와인) 시설 표기는 원문에 포도 등 원료 표현이 없어 중립 표기 유지 — 현지 표기 미확인.
const TRANSLATED: Partial<Record<Locale, VehiclePricingCopy>> = {
  ko: {
    eyebrow: "차량 요금",
    title: "이동 및 차량 투어 요금",
    subtitle: "차량 1대당 공시 요금(VND)입니다. 4인승, 7인승 또는 16인승 차량을 선택하세요.",
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
    tourIncludes: "남부 관광 투어 포함 사항: 피시소스 공장, 푸꾸옥 특산품 쇼핑센터, 제비집 및 침향 공방, 실크 및 가구 수공예 공방, 응옥히엔(Ngoc Hien) 진주 농장, 후추 농장, 심 와인 양조장, 식사 장소 왕복 이동 지원.",
    roundTripNote: "왕복 투어 요금에는 최대 8시간의 차량 이용이 포함되어 있습니다.",
    overtimeNote: (priceLabel) => `시간 초과 요금: 이용 시간 초과 시 시간당 ${priceLabel} 추가.`,
    extraNote: "요금은 차량 1대 기준입니다. 예약 가능 여부와 픽업 세부 사항을 확인하려면 문의해 주세요.",
  },
  zh: {
    eyebrow: "车辆价格",
    title: "接送及包车游览价格",
    subtitle: "价格以每辆车计算，单位为越南盾（VND）。请选择4座、7座或16座车型。",
    seatsLabel: (seats) => `${seats}座`,
    southTitle: "南部",
    northTitle: "北部",
    routeHeader: "路线 / 服务",
    priceHeader: "价格",
    routes: {
      airportToSouth: "机场 → 南部",
      southToAirport: "南部 → 机场",
      southToCenterOneWay: "南部 → 市中心（单程）",
      southToCenterRoundTrip: "南部 → 市中心（往返）",
      southToNorthOneWay: "南部 → 北部（单程）",
      southToNorthRoundTrip: "南部 → 北部（往返，8小时）",
      southSightseeingTour: "南部观光游",
      airportToNorth: "机场 → 北部",
      northToAirport: "北部 → 机场",
      northToCenter: "北部 → 市中心",
      northToSouthOneWay: "北部 → 南部（单程）",
      northToSouthRoundTrip: "北部 → 南部（往返，8小时）",
    },
    tourIncludes: "南部观光游包含：鱼露工厂、富国岛特产购物中心、燕窝与沉香工坊、丝绸与家具手工艺工坊、Ngoc Hien 珍珠养殖场、胡椒园、Sim酒庄（Sim wine），以及就餐地点的往返接送服务。",
    roundTripNote: "往返包车游价格包含最多8小时的车辆使用。",
    overtimeNote: (priceLabel) => `超时附加费：若超出时限，每小时加收 ${priceLabel}。`,
    extraNote: "价格按每辆车计算。请联系我们确认是否有车及接送详情。",
  },
  ru: {
    eyebrow: "Тарифы на транспорт",
    title: "Тарифы на трансфер и автотуры",
    subtitle: "Опубликованные тарифы указаны за автомобиль в VND. Выберите 4-, 7- или 16-местный автомобиль.",
    seatsLabel: (seats) => `${seats}-местный`,
    southTitle: "Южная часть острова",
    northTitle: "Северная часть острова",
    routeHeader: "Маршрут / Услуга",
    priceHeader: "Цена",
    routes: {
      airportToSouth: "Аэропорт → Юг острова",
      southToAirport: "Юг острова → Аэропорт",
      southToCenterOneWay: "Юг острова → Центр (в одну сторону)",
      southToCenterRoundTrip: "Юг острова → Центр (туда и обратно)",
      southToNorthOneWay: "Юг острова → Север острова (в одну сторону)",
      southToNorthRoundTrip: "Юг острова → Север острова (туда и обратно, 8 часов)",
      southSightseeingTour: "Обзорный тур по южной части острова",
      airportToNorth: "Аэропорт → Север острова",
      northToAirport: "Север острова → Аэропорт",
      northToCenter: "Север острова → Центр",
      northToSouthOneWay: "Север острова → Юг острова (в одну сторону)",
      northToSouthRoundTrip: "Север острова → Юг острова (туда и обратно, 8 часов)",
    },
    tourIncludes: "Обзорный тур по южной части острова Фукуок включает: фабрику рыбного соуса, торговый центр местных деликатесов и сувениров Фукуока, мастерскую по изготовлению изделий из ласточкиных гнёзд и агарового дерева, мастерскую шёлковых изделий и мебели ручной работы, жемчужную ферму Ngoc Hien, перечную ферму, винодельню вина Sim (Sim wine), а также доставку к месту питания и обратно.",
    roundTripNote: "В стоимость туров туда и обратно включено использование автомобиля до 8 часов.",
    overtimeNote: (priceLabel) => `Доплата за дополнительный час: ${priceLabel} в час при превышении лимита.`,
    extraNote: "Тарифы указаны за автомобиль. Свяжитесь с нами, чтобы уточнить наличие свободных автомобилей и детали подачи автомобиля.",
  },
  ja: {
    eyebrow: "車両料金",
    title: "送迎・チャーターツアー料金",
    subtitle: "車両1台あたりの公示料金（VND）です。4人乗り・7人乗りまたは16人乗りの車両をお選びください。",
    seatsLabel: (seats) => `${seats}人乗り`,
    southTitle: "南部",
    northTitle: "北部",
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
    tourIncludes: "南部観光ツアーに含まれるもの：ヌクマム（魚醤）工場、フーコック特産品ショッピングセンター、ツバメの巣と沈香の工房、シルク製品と家具の手工芸工房、Ngoc Hien 真珠養殖場、胡椒農園、シムワイン（Sim wine）醸造所、および食事場所への往復送迎サポート。",
    roundTripNote: "往復ツアー料金には、最大8時間の車両利用が含まれています。",
    overtimeNote: (priceLabel) => `時間超過料金：利用時間を超えた場合、1時間あたり ${priceLabel} が追加されます。`,
    extraNote: "料金は車両1台あたりです。空き状況やピックアップの詳細についてはお問い合わせください。",
  },
  hi: {
    eyebrow: "वाहन दरें",
    title: "ट्रांसफर और कार टूर दरें",
    subtitle: "प्रति वाहन प्रकाशित दरें VND में हैं। 4, 7 या 16-सीटर वाहन चुनें।",
    seatsLabel: (seats) => `${seats}-सीटर`,
    southTitle: "द्वीप का दक्षिणी भाग",
    northTitle: "द्वीप का उत्तरी भाग",
    routeHeader: "रूट / सेवा",
    priceHeader: "कीमत",
    routes: {
      airportToSouth: "एयरपोर्ट → द्वीप का दक्षिणी भाग",
      southToAirport: "द्वीप का दक्षिणी भाग → एयरपोर्ट",
      southToCenterOneWay: "द्वीप का दक्षिणी भाग → शहर का केंद्र (1-तरफ़ा)",
      southToCenterRoundTrip: "द्वीप का दक्षिणी भाग → शहर का केंद्र (आना-जाना)",
      southToNorthOneWay: "द्वीप का दक्षिणी भाग → द्वीप का उत्तरी भाग (1-तरफ़ा)",
      southToNorthRoundTrip: "द्वीप का दक्षिणी भाग → द्वीप का उत्तरी भाग (आना-जाना, 8 घंटे)",
      southSightseeingTour: "द्वीप के दक्षिणी भाग का दर्शनीय स्थलों का टूर",
      airportToNorth: "एयरपोर्ट → द्वीप का उत्तरी भाग",
      northToAirport: "द्वीप का उत्तरी भाग → एयरपोर्ट",
      northToCenter: "द्वीप का उत्तरी भाग → शहर का केंद्र",
      northToSouthOneWay: "द्वीप का उत्तरी भाग → द्वीप का दक्षिणी भाग (1-तरफ़ा)",
      northToSouthRoundTrip: "द्वीप का उत्तरी भाग → द्वीप का दक्षिणी भाग (आना-जाना, 8 घंटे)",
    },
    tourIncludes: "द्वीप के दक्षिणी भाग के दर्शनीय स्थलों के टूर में शामिल हैं: फिश सॉस फैक्ट्री, Phu Quoc के स्थानीय विशेष उत्पादों का शॉपिंग सेंटर, स्विफ्टलेट के घोंसलों और अगरवुड की कार्यशाला, रेशम और फर्नीचर के हस्तशिल्प की कार्यशाला, Ngoc Hien मोती फार्म, काली मिर्च फार्म, सिम वाइन (Sim wine) वाइनयार्ड, और भोजन के स्थान तक आने-जाने के लिए वाहन सेवा।",
    roundTripNote: "आने-जाने वाले टूर की कीमतों में अधिकतम 8 घंटे तक वाहन का उपयोग शामिल है।",
    overtimeNote: (priceLabel) => `अतिरिक्त समय का शुल्क: निर्धारित समय से अधिक उपयोग पर प्रति घंटा ${priceLabel}।`,
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
