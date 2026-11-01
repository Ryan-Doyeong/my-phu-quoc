import type { Locale } from '@/lib/i18n/config'

export type BankingZone = 'sunset-town' | 'khem-beach'

export interface BankingItem {
  id: string
  name: Record<Locale, string>
  type: 'atm' | 'exchange'
  zone: BankingZone
  lat: number
  lng: number
  googleMapsUrl: string
  location: Record<Locale, string>
  cards?: string[] | null // null or empty array indicates unconfirmed
}

export interface BankingUiStrings {
  bannerTitle: string
  bannerSubtitle: string
  sunsetTownTitle: string
  khemBeachTitle: string
  atmSectionTitle: (count: number) => string
  exchangeSectionTitle: (count: number) => string
  cardLabel: string
  unconfirmed: string
  googleMapsBtn: string
}

export const BANKING_UI_STRINGS: Record<Locale, BankingUiStrings> = {
  ko: {
    bannerTitle: '환전 · ATM',
    bannerSubtitle: '바로 갈 수 있는 곳만 모았어요',
    sunsetTownTitle: '선셋타운',
    khemBeachTitle: '켐비치',
    atmSectionTitle: (c: number) => `ATM ${c}곳`,
    exchangeSectionTitle: (c: number) => `환전소 ${c}곳`,
    cardLabel: '카드',
    unconfirmed: '미확인',
    googleMapsBtn: '구글맵 보기',
  },
  en: {
    bannerTitle: 'Currency Exchange & ATM',
    bannerSubtitle: 'Directly accessible places only',
    sunsetTownTitle: 'Sunset Town',
    khemBeachTitle: 'Khem Beach',
    atmSectionTitle: (c: number) => `${c} ATM${c > 1 ? 's' : ''}`,
    exchangeSectionTitle: (c: number) => `${c} Currency Exchange${c > 1 ? 's' : ''}`,
    cardLabel: 'Cards',
    unconfirmed: 'Unconfirmed',
    googleMapsBtn: 'View on Google Maps',
  },
  zh: {
    bannerTitle: '货币兑换 · ATM',
    bannerSubtitle: '仅收录可直接前往的地点',
    sunsetTownTitle: '日落小镇',
    khemBeachTitle: '凯姆海滩',
    atmSectionTitle: (c: number) => `${c}处 ATM`,
    exchangeSectionTitle: (c: number) => `${c}处 货币兑换点`,
    cardLabel: '支持银行卡',
    unconfirmed: '未确认',
    googleMapsBtn: '谷歌地图',
  },
  ru: {
    bannerTitle: 'Обмен валюты · Банкоматы',
    bannerSubtitle: 'Только места в прямой доступности',
    sunsetTownTitle: 'Сансет Таун',
    khemBeachTitle: 'Пляж Кхем',
    atmSectionTitle: (c: number) => `${c} банкомат${c > 4 ? 'ов' : c > 1 ? 'а' : ''}`,
    exchangeSectionTitle: (c: number) => `${c} обменны${c > 4 ? 'х' : c > 1 ? 'х' : 'й'} пункт${c > 4 ? 'ов' : c > 1 ? 'а' : ''}`,
    cardLabel: 'Карты',
    unconfirmed: 'Не подтверждено',
    googleMapsBtn: 'Google Карты',
  },
  ja: {
    bannerTitle: '両替・ATM',
    bannerSubtitle: 'すぐに行ける場所だけを集めました',
    sunsetTownTitle: 'サンセットタウン',
    khemBeachTitle: 'ケムビーチ',
    atmSectionTitle: (c: number) => `ATM ${c}か所`,
    exchangeSectionTitle: (c: number) => `両替所 ${c}か所`,
    cardLabel: '対応カード',
    unconfirmed: '未確認',
    googleMapsBtn: 'Googleマップで見る',
  },
  hi: {
    bannerTitle: 'मुद्रा विनिमय · एटीएम',
    bannerSubtitle: 'केवल सीधे सुलभ स्थान',
    sunsetTownTitle: 'सनसेट टाउन',
    khemBeachTitle: 'खेम बीच',
    atmSectionTitle: (c: number) => `${c} एटीएम`,
    exchangeSectionTitle: (c: number) => `${c} मुद्रा विनिमय केंद्र`,
    cardLabel: 'कार्ड',
    unconfirmed: 'अपुष्ट',
    googleMapsBtn: 'Google मानचित्र पर देखें',
  },
  vi: {
    bannerTitle: 'Đổi tiền · ATM',
    bannerSubtitle: 'Chỉ các địa điểm có thể đến trực tiếp',
    sunsetTownTitle: 'Thị trấn Hoàng Hôn',
    khemBeachTitle: 'Bãi Khem',
    atmSectionTitle: (c: number) => `${c} cây ATM`,
    exchangeSectionTitle: (c: number) => `${c} quầy đổi tiền`,
    cardLabel: 'Thẻ',
    unconfirmed: 'Chưa xác nhận',
    googleMapsBtn: 'Xem Google Maps',
  },
}

export const BANKING_PLACES: BankingItem[] = [
  // --- 선셋타운 (Sunset Town) ---
  // ATM 3곳
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
    zone: 'sunset-town',
    lat: 10.0354681,
    lng: 104.0047262,
    googleMapsUrl: 'https://www.google.com/maps?cid=6440178889712391999',
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
    zone: 'sunset-town',
    lat: 10.0356939,
    lng: 104.0030911,
    googleMapsUrl: 'https://www.google.com/maps?cid=11580843206114582841',
    location: {
      ko: '7구역',
      en: 'Zone 7',
      zh: '7区',
      ru: 'Зона 7',
      ja: '7区',
      hi: 'ज़ोन 7',
      vi: 'Khu 7',
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
    zone: 'sunset-town',
    lat: 10.0276568,
    lng: 104.0073166,
    googleMapsUrl: 'https://www.google.com/maps?cid=4069597228033058591',
    location: {
      ko: '아말피 남쪽 아케이드',
      en: 'Amalfi South Arcade',
      zh: '阿马尔菲南侧拱廊',
      ru: 'Южная аркада Амальфи',
      ja: 'アマルフィ南側アーケード',
      hi: 'अमाल्फी साउथ आर्केड',
      vi: 'Hành lang phía Nam Amalfi',
    },
    cards: ['Visa', 'JCB', 'UnionPay'],
  },

  // 환전소 5곳
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
    zone: 'sunset-town',
    lat: 10.0311981,
    lng: 104.0062552,
    googleMapsUrl: 'https://www.google.com/maps?cid=4926815319696634130',
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
    zone: 'sunset-town',
    lat: 10.0307205,
    lng: 104.0064964,
    googleMapsUrl: 'https://www.google.com/maps?cid=13561394820020633960',
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
    zone: 'sunset-town',
    lat: 10.0285625,
    lng: 104.0083125,
    googleMapsUrl: 'https://www.google.com/maps?cid=17008406116662590211',
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
    zone: 'sunset-town',
    lat: 10.0289939,
    lng: 104.0083389,
    googleMapsUrl: 'https://www.google.com/maps?cid=9480964989714363871',
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
    zone: 'sunset-town',
    lat: 10.0363354,
    lng: 104.0069754,
    googleMapsUrl: 'https://www.google.com/maps?cid=11676667545235786167',
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

  // --- 켐비치 (Khem Beach) ---
  // ATM 1곳
  {
    id: 'local-sunset-288',
    name: {
      ko: 'ATM Vietcombank, BIDV ATM (JW 메리어트 입구)',
      en: 'ATM Vietcombank, BIDV ATM (JW Marriott Entrance)',
      zh: 'ATM Vietcombank, BIDV ATM (JW万豪入口)',
      ru: 'ATM Vietcombank, BIDV ATM (Вход в JW Marriott)',
      ja: 'ATM Vietcombank, BIDV ATM (JWマリオット入口)',
      hi: 'ATM Vietcombank, BIDV ATM (JW मैरियट प्रवेश)',
      vi: 'ATM Vietcombank, BIDV ATM (Cổng JW Marriott)',
    },
    type: 'atm',
    zone: 'khem-beach',
    lat: 10.035788,
    lng: 104.024647,
    googleMapsUrl: 'https://www.google.com/maps?cid=5124801132809454571',
    location: {
      ko: 'JW 메리어트 입구, 24시간',
      en: 'JW Marriott Entrance, 24 Hours',
      zh: 'JW万豪酒店入口，24小时',
      ru: 'Вход в JW Marriott, 24 часа',
      ja: 'JWマリオット入口、24時間',
      hi: 'जेडब्ल्यू मैरियट प्रवेश द्वार, 24 घंटे',
      vi: 'Cổng JW Marriott, 24/7',
    },
    cards: null, // 미확인
  },

  // 환전소 1곳
  {
    id: 'khem-banking-king-kong',
    name: {
      ko: 'King Kong Money Exchange - Khem Beach',
      en: 'King Kong Money Exchange - Khem Beach',
      zh: 'King Kong Money Exchange - Khem Beach',
      ru: 'King Kong Money Exchange - Khem Beach',
      ja: 'King Kong Money Exchange - Khem Beach',
      hi: 'King Kong Money Exchange - Khem Beach',
      vi: 'King Kong Money Exchange - Khem Beach',
    },
    type: 'exchange',
    zone: 'khem-beach',
    lat: 10.0335,
    lng: 104.0285,
    googleMapsUrl: 'https://www.google.com/maps?cid=7406987655171001539',
    location: {
      ko: 'Kem Beach, 59 Diamond 1',
      en: 'Kem Beach, 59 Diamond 1',
      zh: 'Kem Beach, 59 Diamond 1',
      ru: 'Kem Beach, 59 Diamond 1',
      ja: 'Kem Beach, 59 Diamond 1',
      hi: 'Kem Beach, 59 Diamond 1',
      vi: 'Kem Beach, 59 Diamond 1',
    },
  },
]
