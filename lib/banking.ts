import type { Locale } from '@/lib/i18n/config'

export interface BankingItem {
  id: string
  name: Record<Locale, string>
  type: 'atm' | 'exchange'
  lat: number
  lng: number
  location: Record<Locale, string>
  cards?: string[] | null // null or empty array indicates unconfirmed
}

export interface BankingUiStrings {
  bannerTitle: string
  bannerSubtitle: string
  atmSectionTitle: string
  exchangeSectionTitle: string
  cardLabel: string
  unconfirmed: string
  googleMapsBtn: string
}

export const BANKING_UI_STRINGS: Record<Locale, BankingUiStrings> = {
  ko: {
    bannerTitle: '환전 · ATM',
    bannerSubtitle: '선셋타운 안에서 바로 갈 수 있는 곳만 모았어요',
    atmSectionTitle: 'ATM 3곳',
    exchangeSectionTitle: '환전소 5곳',
    cardLabel: '카드',
    unconfirmed: '미확인',
    googleMapsBtn: '구글맵 보기',
  },
  en: {
    bannerTitle: 'Currency Exchange & ATM',
    bannerSubtitle: 'Only places directly accessible within Sunset Town',
    atmSectionTitle: '3 ATMs',
    exchangeSectionTitle: '5 Currency Exchanges',
    cardLabel: 'Cards',
    unconfirmed: 'Unconfirmed',
    googleMapsBtn: 'View on Google Maps',
  },
  zh: {
    bannerTitle: '货币兑换 · ATM',
    bannerSubtitle: '仅收录日落小镇内可直接到达的地点',
    atmSectionTitle: '3处 ATM',
    exchangeSectionTitle: '5处 货币兑换点',
    cardLabel: '支持银行卡',
    unconfirmed: '未确认',
    googleMapsBtn: '谷歌地图',
  },
  ru: {
    bannerTitle: 'Обмен валюты · Банкоматы',
    bannerSubtitle: 'Собраны только места, доступные прямо в Сансет Тауне',
    atmSectionTitle: '3 банкомата',
    exchangeSectionTitle: '5 обменных пунктов',
    cardLabel: 'Карты',
    unconfirmed: 'Не подтверждено',
    googleMapsBtn: 'Google Карты',
  },
  ja: {
    bannerTitle: '両替・ATM',
    bannerSubtitle: 'サンセットタウン内ですぐに行ける場所だけを集めました',
    atmSectionTitle: 'ATM 3か所',
    exchangeSectionTitle: '両替所 5か所',
    cardLabel: '対応カード',
    unconfirmed: '未確認',
    googleMapsBtn: 'Googleマップで見る',
  },
  hi: {
    bannerTitle: 'मुद्रा विनिमय · एटीएम',
    bannerSubtitle: 'केवल सनसेट टाउन के भीतर सीधे सुलभ स्थान एकत्र किए गए हैं',
    atmSectionTitle: '3 एटीएम',
    exchangeSectionTitle: '5 मुद्रा विनिमय केंद्र',
    cardLabel: 'कार्ड',
    unconfirmed: 'अपुष्ट',
    googleMapsBtn: 'Google मानचित्र पर देखें',
  },
  vi: {
    bannerTitle: 'Đổi tiền · ATM',
    bannerSubtitle: 'Chỉ các địa điểm trong Thị trấn Hoàng Hôn có thể đến trực tiếp',
    atmSectionTitle: '3 cây ATM',
    exchangeSectionTitle: '5 quầy đổi tiền',
    cardLabel: 'Thẻ',
    unconfirmed: 'Chưa xác nhận',
    googleMapsBtn: 'Xem Google Maps',
  },
}

export const BANKING_ATMS: BankingItem[] = [
  {
    id: 'local-sunset-277',
    name: {
      ko: 'MB ATM (Nộp/rút tiền)',
      en: 'MB ATM (Deposit/Withdrawal)',
      zh: 'MB ATM (存取款)',
      ru: 'MB ATM (Внесение/снятие)',
      ja: 'MB ATM (預入/引出)',
      hi: 'MB ATM (जमा/निकासी)',
      vi: 'MB ATM (Nộp/rút tiền)',
    },
    type: 'atm',
    lat: 10.0354681,
    lng: 104.0047262,
    location: {
      ko: '뉴 안터이 대로, 24시간',
      en: 'New An Thoi Blvd, 24 Hours',
      zh: '新安泰大道，24小时',
      ru: 'Бульвар Нью Ан Тхой, 24 часа',
      ja: 'ニューアンタイ大通り、24時間',
      hi: 'न्यू आन थोई बुलेवार्ड, 24 घंटे',
      vi: 'Đại lộ New An Thới, 24/7',
    },
    cards: null, // 미확인
  },
  {
    id: 'local-sunset-279',
    name: {
      ko: 'VietinBank ATM',
      en: 'VietinBank ATM',
      zh: 'VietinBank ATM',
      ru: 'VietinBank ATM',
      ja: 'VietinBank ATM',
      hi: 'VietinBank ATM',
      vi: 'VietinBank ATM',
    },
    type: 'atm',
    lat: 10.0356939,
    lng: 104.0030911,
    location: {
      ko: '선셋타운 7구역',
      en: 'Sunset Town Zone 7',
      zh: '日落小镇 7区',
      ru: 'Сансет Таун, Зона 7',
      ja: 'サンセットタウン 7区',
      hi: 'सनसेट टाउन ज़ोन 7',
      vi: 'Khu 7 Thị trấn Hoàng Hôn',
    },
    cards: ['Visa', 'Mastercard'],
  },
  {
    id: 'local-sunset-278',
    name: {
      ko: 'BIDV ATM machine',
      en: 'BIDV ATM machine',
      zh: 'BIDV ATM machine',
      ru: 'BIDV ATM machine',
      ja: 'BIDV ATM machine',
      hi: 'BIDV ATM machine',
      vi: 'Cây ATM BIDV',
    },
    type: 'atm',
    lat: 10.0276568,
    lng: 104.0073166,
    location: {
      ko: '아말피 남쪽 아케이드',
      en: 'Amalfi South Arcade',
      zh: '阿马尔菲南侧拱廊',
      ru: 'Южная аркада Амальфи',
      ja: 'アマルフィ南側アーケード',
      hi: 'अमाल्फी साउथ आर्케ड',
      vi: 'Hành lang phía Nam Amalfi',
    },
    cards: ['Visa', 'JCB', 'UnionPay'],
  },
]

export const BANKING_EXCHANGES: BankingItem[] = [
  {
    id: 'local-sunset-271',
    name: {
      ko: 'EXMoney',
      en: 'EXMoney',
      zh: 'EXMoney',
      ru: 'EXMoney',
      ja: 'EXMoney',
      hi: 'EXMoney',
      vi: 'EXMoney',
    },
    type: 'exchange',
    lat: 10.0311981,
    lng: 104.0062552, // 플러스코드 22J4+FG (마스터DB 실측 좌표 10.0311981,104.0062552)
    location: {
      ko: '아말피 25번지',
      en: '25 Amalfi St',
      zh: '阿马尔菲路 25号',
      ru: 'ул. Амальфи, 25',
      ja: 'アマルフィ通り 25番地',
      hi: '25 अमाल्फी स्ट्रीट',
      vi: '25 Đ. Amalfi',
    },
  },
  {
    id: 'local-sunset-263',
    name: {
      ko: 'Money Exchange Sunset Town',
      en: 'Money Exchange Sunset Town',
      zh: 'Money Exchange Sunset Town',
      ru: 'Money Exchange Sunset Town',
      ja: 'Money Exchange Sunset Town',
      hi: 'Money Exchange Sunset Town',
      vi: 'Money Exchange Sunset Town',
    },
    type: 'exchange',
    lat: 10.0307205,
    lng: 104.0064964,
    location: {
      ko: '아말피 중심가',
      en: 'Central Amalfi',
      zh: '阿马尔菲中心街',
      ru: 'Центральная Амальфи',
      ja: 'アマルフィ中心街',
      hi: 'सेंट्रल अमाल्फी',
      vi: 'Trung tâm Amalfi',
    },
  },
  {
    id: 'local-sunset-269',
    name: {
      ko: 'G&G Money Exchange',
      en: 'G&G Money Exchange',
      zh: 'G&G Money Exchange',
      ru: 'G&G Money Exchange',
      ja: 'G&G Money Exchange',
      hi: 'G&G Money Exchange',
      vi: 'G&G Money Exchange',
    },
    type: 'exchange',
    lat: 10.0285625,
    lng: 104.0083125,
    location: {
      ko: '아말피 남쪽',
      en: 'South Amalfi',
      zh: '阿马尔菲南侧',
      ru: 'Южная Амальфи',
      ja: 'アマルフィ南部',
      hi: 'साउथ अमाल्फी',
      vi: 'Phía Nam Amalfi',
    },
  },
  {
    id: 'local-sunset-274',
    name: {
      ko: '선셋타운 환전소',
      en: 'Sunset Town Money Exchange',
      zh: '日落小镇货币兑换所',
      ru: 'Обмен валюты Сансет Таун',
      ja: 'サンセットタウン両替所',
      hi: 'सनसेट टाउन मुद्रा विनिमय',
      vi: 'Quầy đổi tiền Sunset Town',
    },
    type: 'exchange',
    lat: 10.0289939,
    lng: 104.0083389,
    location: {
      ko: '아말피 58번지',
      en: '58 Amalfi St',
      zh: '阿马尔菲路 58号',
      ru: 'ул. Амальфи, 58',
      ja: 'アマルフィ通り 58番地',
      hi: '58 अमाल्फी स्ट्रीट',
      vi: '58 Đ. Amalfi',
    },
  },
  {
    id: 'local-sunset-267',
    name: {
      ko: 'Sol Cosy',
      en: 'Sol Cosy',
      zh: 'Sol Cosy',
      ru: 'Sol Cosy',
      ja: 'Sol Cosy',
      hi: 'Sol Cosy',
      vi: 'Sol Cosy',
    },
    type: 'exchange',
    lat: 10.0363354,
    lng: 104.0069754,
    location: {
      ko: '뉴 안터이 북쪽(AT 96)',
      en: 'North New An Thoi (AT 96)',
      zh: '新安泰北部 (AT 96)',
      ru: 'Север Нью Ан Тхой (AT 96)',
      ja: 'ニューアンタイ北部 (AT 96)',
      hi: 'उत्तर न्यू आन थोई (AT 96)',
      vi: 'Bắc New An Thới (AT 96)',
    },
  },
]
