// Translations: ko source; en/zh/ja/ru/hi/vi drafted 2026-11-03 — ChatGPT 검수 대기
import type { Locale } from '@/lib/i18n/config'
import type { HotelCategory } from '@/lib/hotels'

export interface HotelCategoryDictionary {
  categories: Record<HotelCategory, { name: string; desc: string; icon: string }>
  /** "1박 약" */
  perNight: string
  /** "$39 이하" */
  orLess: string
  /** "$83 이상" */
  orMore: string
  priceUnverified: string
  priceNote: string
  sortPrice: string
  sortPriceLow: string
  emptyCategory: string
}

export const HOTEL_CATEGORY_LABELS: Record<Locale, HotelCategoryDictionary> = {
  ko: {
    categories: {
      recommended: { name: '추천 호텔 모음', desc: '마이 푸꾸옥이 직접 확인해 추천하는 호텔 — 규모가 큰 호텔부터 차례로 소개합니다.', icon: '👑' },
      luxury: { name: '특급~4성 호텔', desc: '아고다 1박 요금 상위 등급($$$$ · $$$$$)의 특급·고급 호텔입니다.', icon: '🏆' },
      boutique: { name: '3성급 호텔', desc: '합리적인 가격($$ · $$$)의 3성급 호텔 — 선셋타운 숙소의 중심 등급입니다.', icon: '🏨' },
      guesthouse: { name: '게스트하우스', desc: '가장 실속 있는 가격($)의 소형 호텔·게스트하우스입니다.', icon: '🏠' },
      'khem-beach': { name: '켐 비치 리조트', desc: '선셋타운에서 차량 약 10분, 해변 이용이 가능한 켐 비치의 리조트·호텔입니다.', icon: '🏖️' },
    },
    perNight: '1박 약',
    orLess: '이하',
    orMore: '이상',
    priceUnverified: '요금 미확인',
    priceNote: '요금 범위는 아고다 2026-11-01 조회 기준(2인 1실, 1박 시작가)이며 날짜·시즌에 따라 달라집니다. 정확한 요금은 아고다 예약 페이지에서 확인해 주세요.',
    sortPrice: '가격 높은순',
    sortPriceLow: '가격 낮은순',
    emptyCategory: '이 카테고리에 해당하는 호텔이 아직 없습니다.',
  },
  en: {
    categories: {
      recommended: { name: 'Recommended Hotels', desc: 'Hotels personally checked and recommended by My Phu Quoc, listed from the largest property down.', icon: '👑' },
      luxury: { name: 'Luxury – 4-Star Hotels', desc: 'Top Agoda price tiers ($$$$ · $$$$$): luxury and upscale hotels.', icon: '🏆' },
      boutique: { name: '3-Star Hotels', desc: 'Well-priced 3-star hotels ($$ · $$$) — the core of Sunset Town stays.', icon: '🏨' },
      guesthouse: { name: 'Guesthouses', desc: 'The most affordable small hotels and guesthouses ($).', icon: '🏠' },
      'khem-beach': { name: 'Khem Beach Resorts', desc: 'Beachfront resorts and hotels on Khem Beach, about 10 minutes by car from Sunset Town.', icon: '🏖️' },
    },
    perNight: 'per night approx.',
    orLess: 'or less',
    orMore: 'or more',
    priceUnverified: 'Rate not verified',
    priceNote: 'Price ranges are Agoda starting rates checked on 2026-11-01 (2 adults, 1 room, 1 night) and vary by date and season. Check the Agoda booking page for exact rates.',
    sortPrice: 'Price: high to low',
    sortPriceLow: 'Price: low to high',
    emptyCategory: 'No hotels in this category yet.',
  },
  zh: {
    categories: {
      recommended: { name: '推荐酒店精选', desc: 'My Phu Quoc 亲自确认并推荐的酒店，按规模从大到小排列。', icon: '👑' },
      luxury: { name: '豪华～四星酒店', desc: 'Agoda 房价高档位（$$$$ · $$$$$）的豪华及高端酒店。', icon: '🏆' },
      boutique: { name: '三星酒店', desc: '价格合理（$$ · $$$）的三星酒店，是日落小镇住宿的主力档次。', icon: '🏨' },
      guesthouse: { name: '民宿·客栈', desc: '价格最实惠（$）的小型酒店与民宿。', icon: '🏠' },
      'khem-beach': { name: '坎海滩度假村', desc: '距日落小镇车程约10分钟、可直接下海的坎海滩度假村与酒店。', icon: '🏖️' },
    },
    perNight: '每晚约',
    orLess: '以下',
    orMore: '以上',
    priceUnverified: '房价未确认',
    priceNote: '价格区间为 2026-11-01 查询的 Agoda 起始价（2 位成人、1 间房、1 晚），会因日期和季节而变动。准确房价请以 Agoda 预订页面为准。',
    sortPrice: '价格从高到低',
    sortPriceLow: '价格从低到高',
    emptyCategory: '此分类暂无酒店。',
  },
  ja: {
    categories: {
      recommended: { name: 'おすすめホテル集', desc: 'My Phu Quoc が実際に確認しておすすめするホテルを、規模の大きい順にご紹介します。', icon: '👑' },
      luxury: { name: '高級～4つ星ホテル', desc: 'アゴダ料金帯の上位（$$$$ · $$$$$）にあたる高級・アップスケールホテルです。', icon: '🏆' },
      boutique: { name: '3つ星ホテル', desc: '手頃な価格（$$ · $$$）の3つ星ホテル。サンセットタウン宿泊の中心クラスです。', icon: '🏨' },
      guesthouse: { name: 'ゲストハウス', desc: '最もリーズナブルな価格（$）の小規模ホテル・ゲストハウスです。', icon: '🏠' },
      'khem-beach': { name: 'ケムビーチ リゾート', desc: 'サンセットタウンから車で約10分、ビーチが利用できるケムビーチのリゾート・ホテルです。', icon: '🏖️' },
    },
    perNight: '1泊 約',
    orLess: '以下',
    orMore: '以上',
    priceUnverified: '料金未確認',
    priceNote: '料金帯は 2026-11-01 時点のアゴダ最低料金（大人2名・1室・1泊）で、日付や季節により変動します。正確な料金はアゴダの予約ページでご確認ください。',
    sortPrice: '料金が高い順',
    sortPriceLow: '料金が安い順',
    emptyCategory: 'このカテゴリに該当するホテルはまだありません。',
  },
  ru: {
    categories: {
      recommended: { name: 'Рекомендуемые отели', desc: 'Отели, лично проверенные и рекомендованные My Phu Quoc, — от самых крупных к небольшим.', icon: '👑' },
      luxury: { name: 'Люкс – 4-звёздочные отели', desc: 'Верхние ценовые категории Agoda ($$$$ · $$$$$): люксовые и премиальные отели.', icon: '🏆' },
      boutique: { name: '3-звёздочные отели', desc: '3-звёздочные отели по разумной цене ($$ · $$$) — основной класс размещения в Сансет Тауне.', icon: '🏨' },
      guesthouse: { name: 'Гестхаусы', desc: 'Самые доступные небольшие отели и гестхаусы ($).', icon: '🏠' },
      'khem-beach': { name: 'Курорты Кхем-Бич', desc: 'Пляжные курорты и отели Кхем-Бич, около 10 минут на машине от Сансет Тауна.', icon: '🏖️' },
    },
    perNight: 'за ночь ок.',
    orLess: 'и меньше',
    orMore: 'и больше',
    priceUnverified: 'Цена не подтверждена',
    priceNote: 'Ценовые диапазоны — стартовые цены Agoda на 2026-11-01 (2 взрослых, 1 номер, 1 ночь), они меняются в зависимости от дат и сезона. Точные цены смотрите на странице бронирования Agoda.',
    sortPrice: 'Цена: по убыванию',
    sortPriceLow: 'Цена: по возрастанию',
    emptyCategory: 'В этой категории пока нет отелей.',
  },
  hi: {
    categories: {
      recommended: { name: 'अनुशंसित होटल संग्रह', desc: 'My Phu Quoc द्वारा स्वयं जाँचे और अनुशंसित होटल — सबसे बड़े होटल से क्रम में।', icon: '👑' },
      luxury: { name: 'लक्ज़री – 4-स्टार होटल', desc: 'Agoda के शीर्ष मूल्य स्तर ($$$$ · $$$$$) के लक्ज़री और प्रीमियम होटल।', icon: '🏆' },
      boutique: { name: '3-स्टार होटल', desc: 'उचित दाम ($$ · $$$) के 3-स्टार होटल — सनसेट टाउन ठहराव का मुख्य वर्ग।', icon: '🏨' },
      guesthouse: { name: 'गेस्टहाउस', desc: 'सबसे किफ़ायती ($) छोटे होटल और गेस्टहाउस।', icon: '🏠' },
      'khem-beach': { name: 'खेम बीच रिसॉर्ट', desc: 'सनसेट टाउन से कार द्वारा लगभग 10 मिनट, समुद्र तट के पास खेम बीच के रिसॉर्ट और होटल।', icon: '🏖️' },
    },
    perNight: 'प्रति रात लगभग',
    orLess: 'या कम',
    orMore: 'या अधिक',
    priceUnverified: 'दर सत्यापित नहीं',
    priceNote: 'मूल्य सीमा 2026-11-01 को जाँची गई Agoda की प्रारंभिक दरें हैं (2 वयस्क, 1 कमरा, 1 रात) और तिथि व मौसम के अनुसार बदलती हैं। सटीक दर Agoda बुकिंग पेज पर देखें।',
    sortPrice: 'कीमत: अधिक से कम',
    sortPriceLow: 'कीमत: कम से अधिक',
    emptyCategory: 'इस श्रेणी में अभी कोई होटल नहीं है।',
  },
  vi: {
    categories: {
      recommended: { name: 'Khách sạn đề xuất', desc: 'Các khách sạn được My Phu Quoc trực tiếp kiểm tra và đề xuất, xếp từ quy mô lớn đến nhỏ.', icon: '👑' },
      luxury: { name: 'Khách sạn cao cấp – 4 sao', desc: 'Các khách sạn cao cấp thuộc mức giá cao nhất trên Agoda ($$$$ · $$$$$).', icon: '🏆' },
      boutique: { name: 'Khách sạn 3 sao', desc: 'Khách sạn 3 sao giá hợp lý ($$ · $$$) — phân khúc chính tại Sunset Town.', icon: '🏨' },
      guesthouse: { name: 'Nhà nghỉ', desc: 'Khách sạn nhỏ và nhà nghỉ có giá tiết kiệm nhất ($).', icon: '🏠' },
      'khem-beach': { name: 'Resort Bãi Khem', desc: 'Resort và khách sạn ven biển tại Bãi Khem, cách Sunset Town khoảng 10 phút đi xe.', icon: '🏖️' },
    },
    perNight: 'mỗi đêm khoảng',
    orLess: 'trở xuống',
    orMore: 'trở lên',
    priceUnverified: 'Chưa xác nhận giá',
    priceNote: 'Khoảng giá là giá khởi điểm trên Agoda tra cứu ngày 2026-11-01 (2 người lớn, 1 phòng, 1 đêm) và thay đổi theo ngày, mùa. Vui lòng xem giá chính xác trên trang đặt phòng Agoda.',
    sortPrice: 'Giá: cao đến thấp',
    sortPriceLow: 'Giá: thấp đến cao',
    emptyCategory: 'Chưa có khách sạn trong mục này.',
  },
}

export function getHotelCategoryLabels(locale: Locale): HotelCategoryDictionary {
  return HOTEL_CATEGORY_LABELS[locale] || HOTEL_CATEGORY_LABELS.en
}
