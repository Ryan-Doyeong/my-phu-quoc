import {STOCK_IMAGES} from '@/lib/stockImages'
import type {Locale} from '@/lib/i18n/config'
import businessesRegistryJson from '@/data/businesses-registry.json'
import khemBusinessesJson from '@/data/khem-beach-businesses.json'
import zoneAssignmentsJson from '@/data/zone-assignments.json'
import {MARMORIS_YACHT_TOURS} from '@/lib/activities/marmorisYacht'

/** 카테고리 테마: ocean = 낮·바다, amber = 저녁·선셋 */
export type CategoryTheme = 'ocean' | 'amber'

type Loc = {en: string} & Partial<Record<Exclude<Locale, 'en'>, string>>

function pick(t: Loc, locale: Locale): string {
  return (locale !== 'en' && t[locale]) || t.en
}

type CategoryDef = {
  theme: CategoryTheme
  label: Loc
  eyebrow: Loc
  description: Loc
  image: string
  subcategories: string[]
}

// My Phu Quoc — 공개 카테고리 10개 체계 (2026-10-27 확정 지시 반영)
// 1. dining: 식당 (/directory/dining)
// 2. bars: 카페 & 바 (/directory/bars)
// 3. hotels: 호텔 (/directory/hotels)
// 4. shopping: 쇼핑 (/directory/shopping)
// 5. wellness: 스파 (/directory/wellness)
// 6. activities: 액티비티 (/directory/activities)
// 7. beaches: 해변 (/directory/beaches)
// 8. banking: 환전·ATM·은행 (/directory/banking)
// 9. essentials: 생활편의 (/directory/essentials)
// 10. transport: 이동·교통 (/directory/transport)
const CATEGORY_DEFS = {
  dining: {
    theme: 'amber',
    label: {en: 'Dining', vi: 'Ẩm thực', hi: 'भोजन', zh: '餐饮', ru: 'Рестораны', ko: '식당', ja: 'グルメ'},
    eyebrow: {
      en: 'SEAFOOD · WORLD CUISINE · STREET FOOD',
      vi: 'HẢI SẢN · ẨM THỰC THẾ GIỚI · ĐỒ ĂN ĐƯỜNG PHỐ',
      hi: 'सीफ़ूड · विश्व व्यंजन · स्ट्रीट फ़ूड',
      zh: '海鲜 · 各国料理 · 街头小吃',
      ru: 'МОРЕПРОДУКТЫ · КУХНИ МИРА · УЛИЧНАЯ ЕДА',
      ko: '씨푸드 · 세계 요리 · 길거리 음식',
      ja: 'シーフード · 各国料理 · ストリートフード',
    },
    description: {
      en: 'Seafood restaurants, international cuisine and street food in and around Sunset Town.',
      vi: 'Nhà hàng hải sản, ẩm thực quốc tế và đồ ăn đường phố tại Sunset Town và vùng lân cận.',
      hi: 'सनसेट टाउन और आसपास के सीफ़ूड रेस्तरां, अंतरराष्ट्रीय व्यंजन और स्ट्रीट फ़ूड।',
      zh: '日落小镇及周边的海鲜餐厅、国际美食与街头小吃。',
      ru: 'Рестораны морепродуктов, международная кухня и уличная еда в Сансет-Тауне и окрестностях.',
      ko: '선셋타운과 주변 지역의 해산물 식당, 다양한 나라의 음식점과 길거리 먹거리를 소개합니다.',
      ja: 'サンセットタウンとその周辺のシーフード、各国料理、ストリートフード。',
    },
    image: '/categories/dining.webp',
    subcategories: ['Seafood','Vietnamese','Korean','Japanese','Chinese','Western','Indian','Russian','Street Food','Vegetarian'],
  },
  bars: {
    theme: 'amber',
    label: {en: 'Cafe & Bars', vi: 'Quán cà phê & Bar', hi: 'कैफ़े और बार', zh: '咖啡馆与酒吧', ru: 'Кафе и бары', ko: '카페 & 바', ja: 'カフェ＆バー'},
    eyebrow: {
      en: 'SUNSET VIEWS · ROOFTOP BARS · CAFES · BEACH CLUBS',
      vi: 'HOÀNG HÔN · BAR TRÊN CAO · CAFE · BEACH CLUB',
      hi: 'सूर्यास्त दृश्य · रूफ़टॉप बार · कैफ़े · बीच क्लब',
      zh: '日落美景 · 屋顶酒吧 · 咖啡馆 · 海滩俱乐部',
      ru: 'ЗАКАТЫ · БАРЫ НА КРЫШЕ · КАФЕ · БИЧ-КЛУБЫ',
      ko: '노을 뷰 · 루프탑 바 · 카페 · 비치클럽',
      ja: 'サンセットビュー · ルーフトップバー · カフェ · ビーチクラブ',
    },
    description: {
      en: 'Cafes, bars, rooftop lounges and beach clubs across Sunset Town and Khem Beach.',
      vi: 'Bar, quán cà phê, lounge trên cao và beach club tại Sunset Town và Bãi Khem.',
      hi: 'सनसेट टाउन और खेम बीच के कैफ़े, बार, रूफ़टॉप लाउंज और बीच क्लब।',
      zh: '日落小镇与凯姆海滩的咖啡馆、酒吧、屋顶酒廊与海滩俱乐部。',
      ru: 'Кафе, бары, лаунджи на крыше и бич-клубы в Сансет-Тауне и на пляже Кхем.',
      ko: '선셋타운과 켐비치의 카페, 바, 펍, 비치클럽을 소개합니다.',
      ja: 'サンセットタウンとケムビーチのカフェ、バー、ルーフトップ、ビーチクラブ。',
    },
    image: '/categories/bars.webp',
    subcategories: ['Cafe','Rooftop Bar','Beach Club','Cocktail Bar','Live Music','Dessert Cafe'],
  },
  hotels: {
    theme: 'amber',
    label: {en: 'Hotels', vi: 'Khách sạn', hi: 'होटल', zh: '酒店', ru: 'Отели', ko: '호텔', ja: 'ホテル'},
    eyebrow: {
      en: 'RESORTS · HOTELS · POOL VILLAS · HOMESTAYS',
      vi: 'RESORT · KHÁCH SẠN · VILLA HỒ BƠI · HOMESTAY',
      hi: 'रिसॉर्ट · होटल · पूल विला · होमस्टे',
      zh: '度假村 · 酒店 · 泳池别墅 · 民宿',
      ru: 'КУРОРТЫ · ОТЕЛИ · ВИЛЛЫ С БАССЕЙНОМ · ХОМСТЕИ',
      ko: '리조트 · 호텔 · 풀빌라 · 홈스테이',
      ja: 'リゾート · ホテル · プールヴィラ · ホームステイ',
    },
    description: {
      en: 'Resorts, hotels, pool villas and homestays near Sunset Town and Khem Beach.',
      vi: 'Resort, khách sạn, villa hồ bơi và homestay gần Sunset Town và Bãi Khem.',
      hi: 'सनसेट टाउन और खेम बीच के पास रिसॉर्ट, होटल, पूल विला और होमस्टे।',
      zh: '日落小镇与凯姆海滩附近的度假村、酒店、泳池别墅和民宿。',
      ru: 'Курорты, отели, виллы с бассейном и хомстеи рядом с Сансет-Таун и пляжем Кхем.',
      ko: '선셋타운과 켐비치 근처의 리조트, 호텔, 풀빌라, 홈스테이.',
      ja: 'サンセットタウンとケムビーチ周辺のリゾート、ホテル、プールヴィラ、ホームステイ。',
    },
    image: '/categories/hotels.webp',
    subcategories: ['Resort','Hotel','Pool Villa','Homestay','Apartment'],
  },
  shopping: {
    theme: 'amber',
    label: {en: 'Shopping', vi: 'Mua sắm', hi: 'शॉपिंग', zh: '购物', ru: 'Шопинг', ko: '쇼핑', ja: 'ショッピング'},
    eyebrow: {
      en: 'PEARLS · LOCAL SPECIALTIES · SOUVENIRS',
      vi: 'NGỌC TRAI · ĐẶC SẢN · QUÀ LƯU NIỆM',
      hi: 'मोती · स्थानीय विशेषताएँ · स्मृति चिह्न',
      zh: '珍珠 · 特产 · 纪念品',
      ru: 'ЖЕМЧУГ · МЕСТНЫЕ ДЕЛИКАТЕСЫ · СУВЕНИРЫ',
      ko: '진주 · 특산품 · 기념품',
      ja: '真珠 · 特産品 · お土産',
    },
    description: {
      en: 'Pearls, local specialties, souvenirs and supermarkets.',
      vi: 'Ngọc trai, đặc sản địa phương, quà lưu niệm và siêu thị.',
      hi: 'मोती, स्थानीय विशेषताएँ, स्मृति चिह्न और सुपरमार्केट।',
      zh: '珍珠、当地特产、纪念品和超市。',
      ru: 'Жемчуг, местные деликатесы, сувениры и супермаркеты.',
      ko: '진주, 특산품, 기념품, 마트.',
      ja: '真珠、特産品、お土産、スーパーマーケット。',
    },
    image: '/categories/shopping.webp',
    subcategories: ['Pearls','Local Specialties','Souvenirs','Supermarket','Fresh Market'],
  },
  wellness: {
    theme: 'ocean',
    label: {en: 'Spa', vi: 'Spa & Massage', hi: 'स्पा', zh: '水疗按摩', ru: 'Спа', ko: '스파', ja: 'スパ'},
    eyebrow: {
      en: 'MASSAGE · SPA · NAILS · SUNBURN CARE',
      vi: 'MASSAGE · SPA · LÀM MÓNG · CHĂM SÓC DA NẮNG',
      hi: 'मालिश · स्पा · नेल्स · सनबर्न केयर',
      zh: '按摩 · 水疗 · 美甲 · 晒后护理',
      ru: 'МАССАЖ · СПА · МАНИКЮР · УХОД ПОСЛЕ ЗАГАРА',
      ko: '마사지 · 스파 · 네일 · 선번 케어',
      ja: 'マッサージ · スパ · ネイル · 日焼けケア',
    },
    description: {
      en: 'Massage, spa, nail and sunburn-care services to recover after the beach.',
      vi: 'Massage, spa, làm móng và chăm sóc da sau nắng để thư giãn sau chuyến biển.',
      hi: 'समुद्र तट के बाद आराम के लिए मालिश, स्पा, नेल और सनबर्न केयर सेवाएँ।',
      zh: '海边游玩后放松身心的按摩、水疗、美甲与晒后护理服务。',
      ru: 'Массаж, спа, маникюр и уход за кожей после солнца — отдых после пляжа.',
      ko: '여행 중 휴식을 위한 마사지·스파, 네일 관리, 햇볕에 자극받은 피부를 위한 케어 서비스를 소개합니다.',
      ja: 'ビーチの後にくつろげるマッサージ、スパ、ネイル、日焼けケア。',
    },
    image: '/categories/wellness.webp',
    subcategories: ['Massage','Spa','Nail Salon','Sunburn Care','Beauty & Skin'],
  },
  activities: {
    theme: 'ocean',
    label: {en: 'Activities', vi: 'Hoạt động', hi: 'गतिविधियाँ', zh: '活动体验', ru: 'Развлечения', ko: '액티비티', ja: 'アクティビティ'},
    eyebrow: {
      en: 'SHOWS · TOURS · ISLAND HOPPING · CABLE CAR',
      vi: 'SHOW · TOUR · HOPPING ĐẢO · CÁP TREO',
      hi: 'शो · टूर · आइलैंड हॉपिंग · केबल कार',
      zh: '演出 · 观光 · 跳岛游 · 缆车',
      ru: 'ШОУ · ТУРЫ · ОСТРОВА · КАНАТНАЯ ДОРОГА',
      ko: '쇼 · 투어 · 호핑투어 · 케이블카',
      ja: 'ショー · ツアー · アイランドホッピング · ロープウェイ',
    },
    description: {
      en: 'Kiss of the Sea show, cable car, island-hopping tours and night markets.',
      vi: 'Show Kiss of the Sea, cáp treo, tour hopping đảo và chợ đêm.',
      hi: 'किस ऑफ़ द सी शो, केबल कार, आइलैंड-हॉपिंग टूर और नाइट मार्केट।',
      zh: '海之吻演出、缆车、跳岛游和夜市。',
      ru: 'Шоу Kiss of the Sea, канатная дорога, туры по островам и ночные рынки.',
      ko: '키스 오브 더 씨 쇼, 케이블카, 호핑투어, 야시장.',
      ja: 'キス・オブ・ザ・シー、ロープウェイ、アイランドホッピング、ナイトマーケット。',
    },
    image: '/categories/activities.webp',
    subcategories: ['Show','Cable Car','Island Hopping','Water Sports','Night Market','Tour'],
  },
  beaches: {
    theme: 'ocean',
    label: {en: 'Beach', vi: 'Bãi biển', hi: 'समुद्र तट', zh: '海滩', ru: 'Пляж', ko: '비치', ja: 'ビーチ'},
    eyebrow: {
      en: 'BEACHFRONT DINING · BEACH PUBS · CAFES · BEACHES',
      vi: 'NHÀ HÀNG VEN BIỂN · BEACH PUB · CAFE · BÃI BIỂN',
      hi: 'बीचफ़्रंट डाइनिंग · बीच पब · कैफ़े · समुद्र तट',
      zh: '海滨餐厅 · 海滩酒吧 · 咖啡馆 · 海滩',
      ru: 'РЕСТОРАНЫ У МОРЯ · ПЛЯЖНЫЕ БАРЫ · КАФЕ · ПЛЯЖИ',
      ko: '바닷가 식당 · 비치 펍 · 카페 · 해변',
      ja: '海辺のレストラン · ビーチパブ · カフェ · ビーチ',
    },
    description: {
      en: 'Beachfront restaurants, beach pubs, cafes and beaches across Sunset Town and Khem Beach.',
      vi: 'Nhà hàng ven biển, quán bar bãi biển, quán cà phê và bãi biển tại Sunset Town và Bãi Khem.',
      hi: 'सनसेट टाउन और खेम बीच के समुद्र तटीय रेस्तरां, बीच पब, कैफ़े और समुद्र तट।',
      zh: '日落小镇与凯姆海滩的海滨餐厅、海滩酒吧、咖啡馆与海滩。',
      ru: 'Прибрежные рестораны, пляжные пабы, кафе и пляжи в Сансет-Тауне и на пляже Кхем.',
      ko: '선셋타운과 켐비치 바닷가 쪽 식당, 비치 펍, 카페 및 해변 안내.',
      ja: 'サンセットタウンとケムビーチの海辺のレストラン、ビーチパブ、カフェ、ビーチ。',
    },
    image: '/categories/beach.webp',
    subcategories: ['Beach','Seafood','Bar','Beach Club','Cafe','Korean'],
  },
  banking: {
    theme: 'ocean',
    label: {
      en: 'Currency Exchange & ATM',
      vi: 'Đổi tiền & ATM',
      hi: 'मुद्रा विनिमय · एटीएम',
      zh: '货币兑换 · ATM',
      ru: 'Обмен валюты · Банкоматы',
      ko: '환전 · ATM',
      ja: '両替・ATM',
    },
    eyebrow: {
      en: 'ATM · CURRENCY EXCHANGE',
      vi: 'ATM · ĐỔI TIỀN',
      hi: 'एटीएम · मुद्रा विनिमय',
      zh: 'ATM · 货币兑换',
      ru: 'БАНКОМАТЫ · ОБМЕН ВАЛЮТ',
      ko: 'ATM · 환전소',
      ja: 'ATM · 両替所',
    },
    description: {
      en: 'Only places directly accessible within Sunset Town and Khem Beach.',
      vi: 'Chỉ các địa điểm trong Thị trấn Hoàng Hôn và Bãi Khem có thể đến trực tiếp.',
      hi: 'सनसेट टाउन और खेम बीच के भीतर सीधे सुलभ स्थान।',
      zh: '仅收录日落小镇与凯姆海滩内可直接到达的地点。',
      ru: 'Собраны места, доступные прямо в Сансет Тауне и на пляже Кхем.',
      ko: '선셋타운과 켐비치 안에서 바로 갈 수 있는 곳만 모았어요.',
      ja: 'サンセットタウンとケムビーチ内ですぐに行ける場所だけを集めました。',
    },
    image: '/categories/essentials.webp',
    subcategories: ['ATM','Currency Exchange'],
  },
  essentials: {
    theme: 'ocean',
    label: {en: 'Essential Services', vi: 'Dịch vụ thiết yếu', hi: 'दैनिक सेवाएँ', zh: '生活便利服务', ru: 'Бытовые услуги', ko: '생활편의', ja: '生活便利サービス'},
    eyebrow: {
      en: 'LAUNDRY · PHARMACY · CLINIC & HEALTHCARE',
      vi: 'GIẶT ỦI · NHÀ THUỐC · PHÒNG KHÁM',
      hi: 'लॉन्ड्री · फ़ार्मेसी · क्लिनिक',
      zh: '洗衣 · 药店 · 诊所与医疗',
      ru: 'ПРАЧЕЧНАЯ · АПТЕКА · КЛИНИКА',
      ko: '세탁 · 약국 · 병원 · 클리닉',
      ja: 'ランドリー · 薬局 · クリニック・医療',
    },
    description: {
      en: 'Laundry services, pharmacies, clinics and medical facilities in Sunset Town and vicinity.',
      vi: 'Dịch vụ giặt ủi, nhà thuốc và phòng khám y tế tại Thị trấn Hoàng Hôn và lân cận.',
      hi: 'सनसेट टाउन में लॉन्ड्री, फ़ार्मेसी और क्लिनिक।',
      zh: '日落小镇及周边的洗衣店、药房、诊所及医疗机构。',
      ru: 'Прачечные, аптеки и медицинские клиники в Сансет-Тауне и окрестностях.',
      ko: '세탁소, 약국, 병원과 의원 등 여행 중 필요한 생활편의시설을 안내합니다.',
      ja: 'コインランドリー（洗濯）、薬局、病院・クリニックのご案内。',
    },
    image: '/categories/essentials.webp',
    subcategories: ['Laundry','Pharmacy','Clinic','Hospital'],
  },
  transport: {
    theme: 'ocean',
    label: {en: 'Transport & Rentals', vi: 'Di chuyển & Giao thông', hi: 'परिवहन और किराया', zh: '交通出行', ru: 'Транспорт и аренда', ko: '이동 · 교통', ja: '移動・交通'},
    eyebrow: {
      en: 'SCOOTER RENTALS · ELECTRIC BUGGIES · TAXI STANDS',
      vi: 'THUÊ XE MÁY · XE ĐIỆN BUGGY · ĐIỂM ĐÓN TAXI',
      hi: 'स्कूटर किराया · इलेक्ट्रिक बग्गी · टैक्सी स्टैंड',
      zh: '租车服务 · 电动观光车 · 出租车乘车点',
      ru: 'АРЕНДА СКУТЕРОВ · БАГГИ · СТОЯНКИ ТАКСИ',
      ko: '스쿠터 렌탈 · 전동 버기카 · 택시 승강장',
      ja: 'レンタルバイク · 電動バギー · タクシー乗り場',
    },
    description: {
      en: 'Scooter rentals, taxi stands, electric buggies and transit services.',
      vi: 'Cho thuê xe máy, điểm đón taxi, xe buggy điện và hướng dẫn di chuyển.',
      hi: 'स्कूटर किराया, टैक्सी स्टैंड, बग्गी सेवाएँ और स्थानीय परिवहन जानकारी।',
      zh: '踏板摩托车租赁、出租车乘降点、观光车及出行交通指引。',
      ru: 'Аренда скутеров, стоянки такси, электробагги и транспортные маршруты.',
      ko: '스쿠터 렌탈, 택시 승강장, 차량 이동 안내.',
      ja: 'スクーターレンタル、タクシー乗り場、車両移動案内。',
    },
    image: '/categories/essentials.webp',
    subcategories: ['Buggy','Scooter Rental','Taxi','Car Rental'],
  },
} as const satisfies Record<string, CategoryDef>

export type DirectoryCategory = keyof typeof CATEGORY_DEFS

export const DIRECTORY_CATEGORIES: Record<DirectoryCategory, CategoryDef & {label_en: string; label: string}> =
  Object.fromEntries(
    Object.entries(CATEGORY_DEFS).map(([k, v]) => [k, {...v, label: v.label.en, label_en: v.label.en}])
  ) as never

export const DIRECTORY_CATEGORY_KEYS = Object.keys(CATEGORY_DEFS) as DirectoryCategory[]

export function isDirectoryCategory(value: string): value is DirectoryCategory {
  if (value === 'beach' || value === 'hotel' || value === 'bar') return true
  return DIRECTORY_CATEGORY_KEYS.includes(value as DirectoryCategory)
}

export function normalizeDirectoryCategory(value: string): DirectoryCategory {
  if (value === 'beach') return 'beaches'
  if (value === 'hotel') return 'hotels'
  if (value === 'bar') return 'bars'
  if (isDirectoryCategory(value)) return value
  return 'dining'
}

export function categoryTheme(value: string): CategoryTheme {
  const norm = normalizeDirectoryCategory(value)
  return CATEGORY_DEFS[norm]?.theme || 'ocean'
}

export function categoryLabel(value: string, localeOrIsVi?: Locale | boolean){
  const norm = normalizeDirectoryCategory(value)
  const loc: Locale = typeof localeOrIsVi === 'boolean' ? (localeOrIsVi ? 'vi' : 'en') : (localeOrIsVi || 'en')
  if (!CATEGORY_DEFS[norm]) return value
  return pick(CATEGORY_DEFS[norm].label, loc)
}

export function categoryEyebrow(value: string, locale: Locale = 'en') {
  const norm = normalizeDirectoryCategory(value)
  if (!CATEGORY_DEFS[norm]) return value
  return pick(CATEGORY_DEFS[norm].eyebrow, locale)
}

export function categoryDescription(value: string, locale: Locale = 'en') {
  const norm = normalizeDirectoryCategory(value)
  if (!CATEGORY_DEFS[norm]) return ''
  return pick(CATEGORY_DEFS[norm].description, locale)
}

export const EDITORIAL_BADGES = ['Recommended','New','HOT'] as const

// 선셋타운 중심 / 인접 지역(안터이 일대 3km 안팎) 판별
const SUNSET_TOWN_CORE_PATTERN = /Sunset Town|Sunset Sanato|Khem Beach|Bai Khem|Bãi Khem|Hon Thom|Hòn Thơm|Kiss of the Sea|Sun Premier Village/i
const NEARBY_AN_THOI_PATTERN = /An Th[oớ]i|An Thoi|Bãi Sao|Bai Sao|Cảng An Thới|Duong Dong|Dương Đông/i

export function isNearbyArea(address?: string | null, tags?: string[] | null, badges?: string[] | null): boolean {
  const allLabels = [...(tags || []), ...(badges || [])].map(x => x.toLowerCase())
  if (allLabels.some(x => x.includes('nearby') || x.includes('an thoi'))) return true
  if (!address) return false
  if (SUNSET_TOWN_CORE_PATTERN.test(address)) return false
  return NEARBY_AN_THOI_PATTERN.test(address)
}

const NEARBY_TEXT: Loc = {
  en: 'Nearby (An Thoi)',
  vi: 'Lân cận (An Thới)',
  hi: 'आसपास (आन थोई)',
  zh: '周边（安泰）',
  ru: 'Рядом (Ан Тхой)',
  ko: '인접 지역 (안터이)',
  ja: '周辺エリア（アントイ）',
}

export function nearbyBadgeText(address?: string | null, tags?: string[] | null, badges?: string[] | null, locale: Locale = 'en'): string | null {
  if (!isNearbyArea(address, tags, badges)) return null
  return pick(NEARBY_TEXT, locale)
}

export type DirectoryCategoryAppearance = {
  icon_text: string
  icon_url: string
}

export const DEFAULT_DIRECTORY_CATEGORY_APPEARANCE: Record<DirectoryCategory, DirectoryCategoryAppearance> = {
  dining: {icon_text:'🍽',icon_url:''},
  bars: {icon_text:'🍹',icon_url:''},
  hotels: {icon_text:'🏨',icon_url:''},
  shopping: {icon_text:'🛍',icon_url:''},
  activities: {icon_text:'🎡',icon_url:''},
  beaches: {icon_text:'🏖',icon_url:''},
  wellness: {icon_text:'✦',icon_url:''},
  essentials: {icon_text:'🧭',icon_url:''},
  banking: {icon_text:'🏦',icon_url:''},
  transport: {icon_text:'🚖',icon_url:''},
}

export function mergeDirectoryCategoryAppearance(value:unknown){
  const raw=(value&&typeof value==='object'?value:{}) as Record<string,Partial<DirectoryCategoryAppearance>>
  return Object.fromEntries(DIRECTORY_CATEGORY_KEYS.map(key=>[key,{...DEFAULT_DIRECTORY_CATEGORY_APPEARANCE[key],...(raw[key]||{})}])) as Record<DirectoryCategory,DirectoryCategoryAppearance>
}

/**
 * 언어별 주소 포맷팅 헬퍼
 * - 영문 화면에서는 한글이 섞이지 않은 100% 영문/로컬 주소 표기
 * - 한국어 화면에서는 자연스러운 한국어 표기
 * - 베트남어 화면에서는 Việt Nam 표기
 * - zh / ru / ja / hi 화면에서는 구글식 잡음(An Giang 등) 제거 및 T2 번역 표기 반영
 */
const T2_ADDRESS_SUFFIX: Partial<Record<Locale, string>> = {
  zh: '越南富国岛',
  ru: 'Фукуок, Вьетнам',
  ja: 'ベトナム・フーコック',
  hi: 'फु क्वोक, वियतनाम',
}

export function formatLocalizedAddress(address?: string | null, locale: Locale = 'en'): string {
  if (!address) return ''
  let addr = address.trim()

  // 1. 공통: 앞쪽에 붙은 "베트남 " 접두사 제거
  addr = addr.replace(/^베트남\s+/, '')
  addr = addr.replace(/^Vietnam\s*,\s*/i, '')

  if (locale === 'ko') {
    addr = addr.replace(/[\s,]+베트남$/i, '')
    addr = addr.replace(/[\s,]+Vietnam$/i, '')
    addr = addr.replace(/\bSunset Town\b/gi, '선셋타운')
    addr = addr.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim()
    return `${addr}, 베트남`
  }

  if (locale === 'vi') {
    addr = addr.replace(/[\s,]+베트남$/i, '')
    addr = addr.replace(/[\s,]+Vietnam$/i, '')
    addr = addr.replace(/\bSunset Town\b/gi, 'Thị trấn Hoàng Hôn')
    addr = addr.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim()
    return `${addr}, Việt Nam`
  }

  if (locale === 'en') {
    // 영문 화면: 기존 영문 출력 엄격 유지 (Bãi Khem Beach 중복 오기 방지)
    addr = addr.replace(/[\s,]+베트남$/i, '')
    addr = addr.replace(/\s+베트남\b/gi, '')
    addr = addr.replace(/[\s,]+Vietnam$/i, '')
    addr = addr.replace(/Bãi Khem(?:\s*Beach)?/gi, 'Khem Beach')
    addr = addr.replace(/Khem Beach(?:\s*Beach)+/gi, 'Khem Beach')
    addr = addr.replace(/An Thới/gi, 'An Thoi')
    addr = addr.replace(/선셋타운/g, 'Sunset Town')
    addr = addr.replace(/안장\s*성/g, 'An Giang')
    addr = addr.replace(/안장/g, 'An Giang')
    addr = addr.replace(/구역/g, 'Zone')
    addr = addr.replace(/정류장/g, 'Stop')
    addr = addr.replace(/입구/g, 'Entrance')
    addr = addr.replace(/시계탑/g, 'Clock Tower')
    addr = addr.replace(/야시장/g, 'Night Market')
    addr = addr.replace(/케이블카\s*역/g, 'Cable Car Station')

    addr = addr.replace(/[\uac00-\ud7a3]+/g, '').trim()
    addr = addr.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim()

    return `${addr}, Vietnam`
  }

  // zh, ru, ja, hi: 베트남 로컬 명칭 영문화 및 구글 맵 잡음(An Giang 등) 정제
  addr = addr.replace(/thị trấn Hoàng Hôn/gi, 'Sunset Town')
  addr = addr.replace(/Bãi Khem(?:\s*Beach)?/gi, 'Khem Beach')
  addr = addr.replace(/An Thới/gi, 'An Thoi')
  addr = addr.replace(/선셋타운/g, 'Sunset Town')
  addr = addr.replace(/구역/g, 'Zone')
  addr = addr.replace(/정류장/g, 'Stop')
  addr = addr.replace(/입구/g, 'Entrance')
  addr = addr.replace(/시계탑/g, 'Clock Tower')
  addr = addr.replace(/야시장/g, 'Night Market')
  addr = addr.replace(/케이블카\s*역/g, 'Cable Car Station')

  for (let i = 0; i < 3; i++) {
    const prev = addr
    addr = addr.replace(/[\s,]+(?:Vietnam|베트남)$/i, '')
    addr = addr.replace(/[\s,]+An Giang(?:\s*\d+)?$/i, '')
    addr = addr.replace(/[\s,]+(?:Phú Quốc|Phu Quoc)$/i, '')
    addr = addr.replace(/[\s,]+\d{5}$/, '')
    if (addr === prev) break
  }

  addr = addr.replace(/[\uac00-\ud7a3]+/g, '').trim()
  addr = addr.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim()

  const suffix = T2_ADDRESS_SUFFIX[locale] || 'Phu Quoc, Vietnam'
  if (!addr) return suffix
  return `${addr}, ${suffix}`
}

/**
 * 2026-10-31 ~ 2026-11-02 구글맵 실존·정보충분성(사진 3장 이상, 메뉴·리뷰 검증) 전수 감사 결과 비공개 전환된 업체 슬러그 및 레거시 ID 목록
 * + 레지스트리(businesses-registry.json, khem-beach-businesses.json) 기반 비공개(status !== 'published') 동적 수집
 * - 나중에 레지스트리에서 status가 'published'로 전환되면 자동으로 비공개 목록에서 해제되고 카운트가 반영됨
 */
const REGISTRY_BUSINESSES: any[] = Array.isArray(businessesRegistryJson)
  ? (businessesRegistryJson as any[])
  : (businessesRegistryJson as any).businesses || []
const KHEM_BUSINESSES: any[] = Array.isArray(khemBusinessesJson)
  ? (khemBusinessesJson as any[])
  : []
const ZONE_ASSIGNMENTS: Record<string, { service_areas?: string[]; zone?: string }> =
  (zoneAssignmentsJson as any) || {}

export const HIDDEN_BUSINESS_SLUGS = new Set<string>([
  '68mart-local-mart-for-tourists-dac-san-phu-quoc',
  'amritsar-grill-indian-restaurant',
  'an-moc-spa',
  'an-thoi-polyclinics',
  'ang-spa-nail',
  'antalya-turkish-cuisine-sunset-town',
  'apollo-cafe-phu-quoc',
  'at-108-new-an-thoi',
  'banh-canh-ghe-by-restaurant-seafood',
  'bloom-spa-phu-quoc-sunset-town',
  'cap-tr-phu-quoc',
  'chill-sunset-restaurant',
  'com-me',
  'delhi-darbaar-indian-restaurant-indian-food-in-sunset-town-phu-quoc',
  'draft-beer-sunset-town-phu-quoc',
  'eric-kayser-vietnam',
  'gl90s-phu-quoc-laundry-services-sunsetown-ama47-24-24',
  'herbal-spa-nail-sunset-town',
  'kadhai-indian-restaurant-sunset-town-phu-quoc',
  'king-spa-massage-sunset-town-night-market',
  'long-beach-mini-mart-sunset-town',
  'lumi-spa-massage',
  'luxury-hotel-spa-milan-38-sunset-town',
  'madam-khanh-restaurant-phu-quoc-2',
  'maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town',
  'mai-huong-restaurant-sunset-town',
  'maison-kayser-phu-quoc',
  'mimi-fruits-mart',
  'mixue-ice-cream-and-tea',
  'nha-hang-com-nieu-viet-xua-an-thoi',
  'nha-thuoc-an-khang-phu-quo-c-2',
  'nha-thuoc-andu',
  'nha-thuoc-huyen-ly',
  'nha-thuoc-nguyen-huynh',
  'nha-thuoc-tam-chau',
  'nha-thuoc-tay-thanh-duy-3',
  'nha-thuoc-thanh-do',
  'nha-thuoc-thanh-khoe',
  'nha-thuoc-truong-thi',
  'oc-dao-an-thoi',
  'ph-rooftop-bar-lounge-sea-view-restaurant-an-thoi-phu-quoc',
  'phong-kham-30-4-an-thoi',
  'phong-kham-da-khoa-sos-an-thoi-phu-quoc',
  'qua-y-thuo-c-huong-thom',
  'quan-nhau-binh-dan-hoang-hon-hoang-hon-quan',
  'quay-thuoc-diep-anh-anh',
  'rasa-nusantara-phu-quoc',
  'sieu-thi-dat-phuong-nam',
  'sieu-thi-g-mart-24h',
  'sorrento-restaurant-bar',
  'sun-group-sunset-town-electric-buggy-service',
  'sunset-place-4',
  'sunset-place-6',
  'sunset-place-8',
  'the-ivy-cafe-lounge-phu-quoc',
  'the-nice-hotel-phu-quoc-fireworks-ocean-view',
  'rosie-hillside-phu-quoc-apartment',
  'sunset-home-apartment-phu-quoc',
  'the-juliet-a-boutique-hotel-coffee-ama-71',
  'eirlys-home-apartment-phu-quoc-firework-ocean-view',
  'blue-hotel-sunset-town-phu-quoc',
  'th-luxury-hotel',
  'merci-hotel-sunset-town-phu-quoc',
  'the-fern-phu-quoc-hotel-sunset-town',
  'crystal-apartment-hillside-phu-quoc-sunset-town-firework',
  'dido-carthage-apartment-sunset-town-phu-quoc-island',
  'triland-hillside',
  'tsunagari-phu-quoc-japanese-matcha-in-the-island',
  'turkish-kitchen',
  'venice-spamedica-phu-quoc',
  'wave-cafe-pub-3f-sunset-town',
  'wave-spa-2f-sunset-town',
  ...REGISTRY_BUSINESSES.filter((b) => Boolean(b.status && b.status !== 'published')).map((b) => String(b.slug)),
  ...KHEM_BUSINESSES.filter((b) => Boolean(b.status && b.status !== 'published')).map((b) => String(b.slug)),
])

export const HIDDEN_BUSINESS_IDS = new Set<string>([
  'local-sunset-018',
  'local-sunset-45',
  'local-sunset-065',
  'local-sunset-87',
  'local-sunset-88',
  'local-sunset-97',
  'local-sunset-99',
  'local-sunset-115',
  'local-sunset-116',
  'local-sunset-117',
  'local-sunset-118',
  'local-sunset-119',
  'local-sunset-134',
  'local-sunset-139',
  'local-sunset-182',
  'local-sunset-184',
  'local-sunset-187',
  'local-sunset-189',
  'local-sunset-195',
  'local-sunset-204',
  'local-sunset-207',
  'local-sunset-208',
  'local-sunset-209',
  'local-sunset-210',
  'local-sunset-212',
  'local-sunset-213',
  'local-sunset-214',
  'local-sunset-215',
  'local-sunset-216',
  'local-sunset-217',
  'local-sunset-218',
  'local-sunset-219',
  'local-sunset-220',
  'local-sunset-221',
  'local-sunset-222',
  'local-sunset-233',
  'local-sunset-239',
  'local-sunset-240',
  'local-sunset-242',
  'local-sunset-245',
  'local-sunset-251',
  'local-sunset-262',
  'local-sunset-268',
  ...REGISTRY_BUSINESSES.filter((b) => Boolean(b.status && b.status !== 'published')).map((b) => String(b.id)),
  ...KHEM_BUSINESSES.filter((b) => Boolean(b.status && b.status !== 'published')).map((b) => String(b.id)),
])

export function isHiddenBusiness(b: { slug?: string | null; id?: string | null; status?: string | null } | null | undefined): boolean {
  if (!b) return true
  if (b.status && b.status !== 'published') return true
  if (b.slug && HIDDEN_BUSINESS_SLUGS.has(b.slug)) return true
  if (b.id && HIDDEN_BUSINESS_IDS.has(String(b.id))) return true
  return false
}

/**
 * 카테고리별 현재 공개 업체 수(count) 동적 계산
 * - count === 0인 카테고리(현재 essentials, transport)는 홈·메뉴·푸터·검색 등에서 자동으로 숨겨지며,
 *   추후 업체가 공개(status: 'published')되면 자동으로 count > 0이 되어 다시 노출됨.
 * - activities는 통합 페이지(/activities)의 공개 요트 프로그램(MARMORIS_YACHT_TOURS) 기준으로 집계.
 */
export function getCategoryPublishedCount(key: DirectoryCategory): number {
  if (key === 'activities') {
    return MARMORIS_YACHT_TOURS.length
  }
  const sunsetCount = REGISTRY_BUSINESSES.filter(
    (b) => b.category === key && (!b.status || b.status === 'published') && !isHiddenBusiness(b)
  ).length
  const khemCount = KHEM_BUSINESSES.filter(
    (b) => b.category === key && b.status === 'published' && !isHiddenBusiness(b)
  ).length
  return sunsetCount + khemCount
}

/**
 * 구역별(sunset-town / khem-beach) 카테고리 공개 업체 수 동적 계산
 * - 액티비티(activities)는 구역 구분 없이 /activities로 통합되었으므로 구역 타일에서는 0 유지
 * - 선셋타운 banking은 선셋타운 코어(ATM 3 + 환전소 5 = 8곳, 안터이 외곽 ATM 제외) 기준
 */
export function getZoneCategoryPublishedCount(
  zone: 'sunset-town' | 'khem-beach',
  key: DirectoryCategory
): number {
  if (key === 'activities') return 0
  if (zone === 'khem-beach') {
    return KHEM_BUSINESSES.filter(
      (b) => b.category === key && b.status === 'published' && !isHiddenBusiness(b)
    ).length
  }
  return REGISTRY_BUSINESSES.filter((b) => {
    if (b.category !== key || (b.status && b.status !== 'published') || isHiddenBusiness(b)) return false
    if (key === 'banking') {
      const assignment = b.id ? ZONE_ASSIGNMENTS[String(b.id)] : undefined
      if (assignment?.service_areas?.includes('sunset-town-adjacent')) {
        return false
      }
      if (String(b.subcategory || '').toLowerCase() === 'atm' && isNearbyArea(b.address, b.tags, b.badges)) {
        return false
      }
    }
    return true
  }).length
}


