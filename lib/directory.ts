import {STOCK_IMAGES} from '@/lib/stockImages'
import type {Locale} from '@/lib/i18n/config'

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

// My Phu Quoc — 카테고리 9개 (2026-10-26 Phase 2 개편: 생활편의 essentials 와 금융·환전·ATM banking 분리)
// 번역 상태: vi·ko 는 초안, hi·zh·ru·ja 는 "AI 검수 완료 / 원어민 미확인"
const CATEGORY_DEFS = {
  dining: {
    theme: 'amber',
    label: {en: 'Dining', vi: 'Ẩm thực', hi: 'भोजन', zh: '餐饮', ru: 'Рестораны', ko: '맛집 · 식당', ja: 'グルメ'},
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
      ko: '선셋타운과 주변의 씨푸드 식당, 국가별 요리, 길거리 음식.',
      ja: 'サンセットタウンとその周辺のシーフード、各国料理、ストリートフード。',
    },
    image: '/categories/dining.webp',
    subcategories: ['Seafood','Vietnamese','Korean','Japanese','Chinese','Western','Indian','Russian','Street Food','Vegetarian'],
  },
  bars: {
    theme: 'amber',
    label: {en: 'Sunset Bars', vi: 'Bar hoàng hôn', hi: 'सनसेट बार', zh: '日落酒吧', ru: 'Сансет-бары', ko: '선셋 바', ja: 'サンセットバー'},
    eyebrow: {
      en: 'SUNSET VIEWS · ROOFTOP BARS · BEACH CLUBS',
      vi: 'HOÀNG HÔN · BAR TRÊN CAO · BEACH CLUB',
      hi: 'सूर्यास्त दृश्य · रूफ़टॉप बार · बीच क्लब',
      zh: '日落美景 · 屋顶酒吧 · 海滩俱乐部',
      ru: 'ЗАКАТЫ · БАРЫ НА КРЫШЕ · БИЧ-КЛУБЫ',
      ko: '노을 뷰 · 루프탑 바 · 비치클럽',
      ja: 'サンセットビュー · ルーフトップバー · ビーチクラブ',
    },
    description: {
      en: 'Bars, cafés, rooftop lounges and beach clubs with the best sunset views.',
      vi: 'Bar, quán cà phê, lounge trên cao và beach club với tầm nhìn hoàng hôn đẹp nhất.',
      hi: 'सबसे सुंदर सूर्यास्त दृश्य वाले बार, कैफ़े, रूफ़टॉप लाउंज और बीच क्लब।',
      zh: '拥有最佳日落景观的酒吧、咖啡馆、屋顶酒廊与海滩俱乐部。',
      ru: 'Бары, кафе, лаунджи на крыше и бич-клубы с лучшими видами на закат.',
      ko: '노을이 가장 예쁜 바, 카페, 루프탑 라운지, 비치클럽.',
      ja: '夕日が美しいバー、カフェ、ルーフトップラウンジ、ビーチクラブ。',
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
  beach: {
    theme: 'ocean',
    label: {en: 'Beaches', vi: 'Bãi biển', hi: 'समुद्र तट', zh: '海滩', ru: 'Пляжи', ko: '해변', ja: 'ビーチ'},
    eyebrow: {
      en: 'BEACHES · SUN LOUNGERS · GOLF · YOGA',
      vi: 'BÃI BIỂN · GHẾ NẰM · GOLF · YOGA',
      hi: 'समुद्र तट · सन लाउंजर · गोल्फ़ · योग',
      zh: '海滩 · 躺椅 · 高尔夫 · 瑜伽',
      ru: 'ПЛЯЖИ · ШЕЗЛОНГИ · ГОЛЬФ · ЙОГА',
      ko: '해변 · 선베드 라운지 · 골프 · 요가',
      ja: 'ビーチ · サンラウンジャー · ゴルフ · ヨガ',
    },
    description: {
      en: 'Khem Beach and nearby beaches, sun-lounger spots, golf and beach yoga.',
      vi: 'Bãi Khem và các bãi biển lân cận, điểm ghế nằm, golf và yoga trên biển.',
      hi: 'खेम बीच और आसपास के समुद्र तट, सन-लाउंजर स्थल, गोल्फ़ और बीच योग।',
      zh: '凯姆海滩及周边海滩、躺椅区、高尔夫和海滩瑜伽。',
      ru: 'Пляж Кхем и ближайшие пляжи, шезлонги, гольф и йога на пляже.',
      ko: '켐비치와 주변 해변, 선베드 라운지, 골프, 비치 요가.',
      ja: 'ケムビーチと周辺のビーチ、サンラウンジャー、ゴルフ、ビーチヨガ。',
    },
    image: '/categories/beach.webp',
    subcategories: ['Beach','Sun Lounger','Golf','Yoga','Water Sports'],
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
      ko: '해변 후 휴식을 위한 마사지, 스파, 네일, 선번 케어.',
      ja: 'ビーチの後にくつろげるマッサージ、スパ、ネイル、日焼けケア。',
    },
    image: '/categories/wellness.webp',
    subcategories: ['Massage','Spa','Nail Salon','Sunburn Care','Beauty & Skin'],
  },
  essentials: {
    theme: 'ocean',
    label: {en: 'Essential Services', vi: 'Dịch vụ thiết yếu', hi: 'दैनिक सेवाएँ', zh: '生活便利服务', ru: 'Бытовые услуги', ko: '생활편의 서비스', ja: '生活便利サービス'},
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
      en: 'Laundry services, pharmacies, clinics and medical facilities in Sunset Town.',
      vi: 'Dịch vụ giặt ủi, nhà thuốc và phòng khám y tế tại Thị trấn Hoàng Hôn.',
      hi: 'सनसेट टाउन में लॉन्ड्री, फ़ार्मेसी और क्लिनिक।',
      zh: '日落小镇的洗衣店、药店、诊所及医疗机构。',
      ru: 'Прачечные, аптеки и медицинские клиники в Сансет-Тауне.',
      ko: '선셋타운 여행자를 위한 세탁소, 약국, 병원 및 클리닉 편의시설.',
      ja: 'サンセットタウンのランドリー、薬局、クリニック・医療施設。',
    },
    image: '/categories/essentials.webp',
    subcategories: ['Laundry','Pharmacy','Clinic'],
  },
  banking: {
    theme: 'ocean',
    label: {en: 'Currency & ATM', vi: 'Đổi tiền & ATM', hi: 'मुद्रा विनिमय और एटीएम', zh: '货币兑换 · ATM · 银行', ru: 'Обмен валюты · Банкоматы', ko: '환전 · ATM · 은행', ja: '両替・ATM・銀行'},
    eyebrow: {
      en: 'ATM · CASH WITHDRAWAL · CURRENCY EXCHANGE · BANK',
      vi: 'ATM · RÚT TIỀN · ĐỔI TIỀN · NGÂN HÀNG',
      hi: 'एटीएम · नकद निकासी · मुद्रा विनिमय · बैंक',
      zh: 'ATM · 提款 · 货币兑换 · 银行',
      ru: 'БАНКОМАТЫ · СНЯТИЕ НАЛИЧНЫХ · ОБМЕН ВАЛЮТ',
      ko: 'ATM · 현금인출 · 환전소 · 은행',
      ja: 'ATM · 現金引き出し · 両替 · 銀行',
    },
    description: {
      en: 'ATM cash machines, banking branches and currency exchange booths in Sunset Town and An Thoi.',
      vi: 'Cây ATM, chi nhánh ngân hàng và quầy đổi tiền tại Thị trấn Hoàng Hôn và An Thới.',
      hi: 'सनसेट टाउन और आन थोई में एटीएम, बैंक शाखाएँ और मुद्रा विनिमय केंद्र।',
      zh: '日落小镇及安泰的自动提款机(ATM)、银行网点与货币兑换点。',
      ru: 'Банкоматы, банковские отделения и пункты обмена валюты в Сансет-Тауне и Ан Тхое.',
      ko: '선셋타운과 안터이 일대의 현금인출기(ATM), 은행 지점, 환전소 위치 안내.',
      ja: 'サンセットタウンとアントイ周辺のATM、銀行、両替所の案内。',
    },
    image: '/categories/essentials.webp',
    subcategories: ['ATM','Currency Exchange'],
  },
} as const satisfies Record<string, CategoryDef>

export type DirectoryCategory = keyof typeof CATEGORY_DEFS

export const DIRECTORY_CATEGORIES: Record<DirectoryCategory, CategoryDef & {label_en: string; label: string}> =
  Object.fromEntries(
    Object.entries(CATEGORY_DEFS).map(([k, v]) => [k, {...v, label: v.label.en, label_en: v.label.en}])
  ) as never

export const DIRECTORY_CATEGORY_KEYS = Object.keys(CATEGORY_DEFS) as DirectoryCategory[]

export function isDirectoryCategory(value:string): value is DirectoryCategory {
  return DIRECTORY_CATEGORY_KEYS.includes(value as DirectoryCategory)
}

export function categoryTheme(value: string): CategoryTheme {
  return isDirectoryCategory(value) ? CATEGORY_DEFS[value].theme : 'ocean'
}

export function categoryLabel(value:string, localeOrIsVi?: Locale | boolean){
  if(!isDirectoryCategory(value)) return value
  const loc: Locale = typeof localeOrIsVi === 'boolean' ? (localeOrIsVi ? 'vi' : 'en') : (localeOrIsVi || 'en')
  return pick(CATEGORY_DEFS[value].label, loc)
}

export function categoryEyebrow(value: string, locale: Locale = 'en') {
  if (!isDirectoryCategory(value)) return value
  return pick(CATEGORY_DEFS[value].eyebrow, locale)
}

export function categoryDescription(value: string, locale: Locale = 'en') {
  if (!isDirectoryCategory(value)) return ''
  return pick(CATEGORY_DEFS[value].description, locale)
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

export const DEFAULT_DIRECTORY_CATEGORY_APPEARANCE: Record<DirectoryCategory,DirectoryCategoryAppearance> = {
  dining: {icon_text:'🍽',icon_url:''},
  bars: {icon_text:'🍹',icon_url:''},
  hotels: {icon_text:'🏨',icon_url:''},
  shopping: {icon_text:'🛍',icon_url:''},
  activities: {icon_text:'🎡',icon_url:''},
  beach: {icon_text:'🏖',icon_url:''},
  wellness: {icon_text:'✦',icon_url:''},
  essentials: {icon_text:'🧭',icon_url:''},
  banking: {icon_text:'🏦',icon_url:''},
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
 */
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

  // 영문 및 기타 글로벌 언어: 한글이 섞이지 않도록 완벽 영문화
  addr = addr.replace(/[\s,]+베트남$/i, '')
  addr = addr.replace(/\s+베트남\b/gi, '')
  addr = addr.replace(/[\s,]+Vietnam$/i, '')
  addr = addr.replace(/선셋타운/g, 'Sunset Town')
  addr = addr.replace(/안장\s*성/g, 'An Giang')
  addr = addr.replace(/안장/g, 'An Giang')
  addr = addr.replace(/구역/g, 'Zone')
  addr = addr.replace(/정류장/g, 'Stop')
  addr = addr.replace(/입구/g, 'Entrance')
  addr = addr.replace(/시계탑/g, 'Clock Tower')
  addr = addr.replace(/야시장/g, 'Night Market')
  addr = addr.replace(/케이블카\s*역/g, 'Cable Car Station')

  // 혹시라도 남아있는 한글이 있다면 제거
  addr = addr.replace(/[\uac00-\ud7a3]+/g, '').trim()
  addr = addr.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim()

  return `${addr}, Vietnam`
}
