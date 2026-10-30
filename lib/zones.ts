/**
 * lib/zones.ts
 * Dual Zone Architecture (Sunset Town & Khem Beach)
 * My Phu Quoc — Two Hubs Structure
 */

import type { Locale } from '@/lib/i18n/config'
import zoneAssignmentsJson from '@/data/zone-assignments.json'

export type MainZoneSlug = 'sunset-town' | 'khem-beach'

export interface AttractionItem {
  number: number
  name: Record<Locale, string>
  description: Record<Locale, string>
  tag: Record<Locale, string>
}

export interface ZoneCategoryTile {
  icon: string
  name: Record<Locale, string>
  count: number
  categoryKey: string
}

export interface MainZoneInfo {
  slug: MainZoneSlug
  name: Record<Locale, string>
  nameLocal: string
  subConcept: Record<Locale, string>
  badge: Record<Locale, string>
  summary: Record<Locale, string>
  homeDescription: Record<Locale, string>
  overview: Record<Locale, string>
  heroImage: string
  heroAlt: Record<Locale, string>
  ctaButton: Record<Locale, string>
  featureChips: Record<Locale, string[]>
  attractions: AttractionItem[]
  categories: ZoneCategoryTile[]
  categoryBadge: Record<Locale, string>
  noteBanner: Record<Locale, string> | null
  transitHeadline: Record<Locale, string>
  transitDescription: Record<Locale, string>
}

export const MAIN_ZONES: Record<MainZoneSlug, MainZoneInfo> = {
  'sunset-town': {
    slug: 'sunset-town',
    name: {
      ko: '선셋타운 (Sunset Town)',
      en: 'Sunset Town',
      zh: 'Sunset Town',
      ru: 'Sunset Town',
      ja: 'Sunset Town',
      hi: 'Sunset Town',
      vi: 'Thị trấn Hoàng Hôn (Sunset Town)',
    },
    nameLocal: 'Thị trấn Hoàng Hôn',
    subConcept: {
      ko: '키스브릿지 · 불꽃쇼 · 케이블카 · 야시장',
      en: 'Kiss Bridge · Fireworks · Cable Car · Night Market',
      zh: '接吻桥 · 烟花秀 · 缆车 · 夜市',
      ru: 'Мост Поцелуев · Фейерверки · Канатная дорога · Ночной рынок',
      ja: 'キスブリッジ · 花火ショー · ケーブルカー · ナイトマーケット',
      hi: 'किस ब्रिज · आतिशबाजी · केबल कार · नाइट मार्केट',
      vi: 'Cầu Hôn · Pháo hoa · Cáp treo · Chợ đêm VuiFest',
    },
    badge: {
      ko: '저녁 & 야경 중심',
      en: 'Evening & Night Views Hub',
      zh: '傍晚与夜景中心',
      ru: 'Район вечернего отдыха и ночных видов',
      ja: '夕方と夜景が中心のエリア',
      hi: 'शाम और रात के नज़ारों के लिए प्रमुख क्षेत्र',
      vi: 'Trung tâm hoàng hôn & đêm',
    },
    summary: {
      ko: '키스브릿지, 키스 오브 더 씨 불꽃쇼, 해상 케이블카, 부이페스트 야시장이 있는 구역',
      en: 'An area with Kiss Bridge, the Kiss of the Sea fireworks show, an oversea cable car, and the VuiFest night market.',
      zh: '设有接吻桥、Kiss of the Sea 烟花秀、跨海缆车和 VuiFest 夜市的区域',
      ru: 'Район, где находятся Мост Поцелуев, фейерверк-шоу Kiss of the Sea, канатная дорога над морем и ночной рынок VuiFest.',
      ja: 'キスブリッジ、Kiss of the Seaの花火ショー、海上ケーブルカー、VuiFestナイトマーケットがあるエリア',
      hi: 'किस ब्रिज, Kiss of the Sea आतिशबाज़ी शो, समुद्र के ऊपर चलने वाली केबल कार और VuiFest नाइट मार्केट वाला क्षेत्र',
      vi: 'Khu vực Cầu Hôn, show pháo hoa Kiss of the Sea, cáp treo và chợ đêm VuiFest.',
    },
    homeDescription: {
      ko: '선셋타운 중심 시설 251곳(식당·카페·호텔)과 안터이 인근 생활편의 40곳 (약국·은행 등)이 연결된 저녁·야경 중심 구역입니다.',
      en: 'An area focused on evenings and night views, connecting 251 venues (restaurants, cafés, and hotels) in central Sunset Town with 40 nearby essential services (such as pharmacies and banks) in An Thoi.',
      zh: '这是一个以傍晚活动和夜景为主的区域，连接日落小镇中心的251处设施（餐厅、咖啡馆和酒店）与安泰附近的40处生活便民设施（如药房、银行等）。',
      ru: 'Район вечернего отдыха и ночных видов, объединяющий 251 объект в центре Сансет-Тауна (рестораны, кафе и отели) и 40 объектов повседневной инфраструктуры поблизости от Ан Тхоя (в том числе аптеки и банки).',
      ja: 'サンセットタウン中心部の251施設（レストラン・カフェ・ホテル）と、アントイ周辺の生活利便施設40か所（薬局・銀行など）がつながる、夕方と夜景が中心のエリアです。',
      hi: 'यह शाम और रात के नज़ारों के लिए प्रमुख क्षेत्र है, जो सनसेट टाउन के केंद्र में स्थित 251 स्थानों (रेस्तराँ, कैफ़े और होटल) को आन थोई के आसपास की 40 दैनिक सुविधा सेवाओं (जैसे फ़ार्मेसी और बैंक) से जोड़ता है।',
      vi: 'Khu vực trọng điểm kết nối 251 cơ sở trung tâm Thị trấn Hoàng Hôn và 40 điểm tiện ích An Thới lân cận.',
    },
    overview: {
      ko: '선셋타운은 일몰 감상 지점과 야시장, 불꽃쇼 공연장이 있는 저녁·야경 중심 구역입니다.',
      en: 'Sunset Town is an area focused on evenings and night views, with sunset viewpoints, a night market, and a venue for fireworks shows.',
      zh: '日落小镇是一个以傍晚活动和夜景为主的区域，设有日落观景点、夜市和烟花表演场地。',
      ru: 'Сансет-Таун — район вечернего отдыха и ночных видов, где есть места для наблюдения за закатом, ночной рынок и площадка для шоу фейерверков.',
      ja: 'サンセットタウンは、夕日鑑賞スポット、ナイトマーケット、花火ショー会場がある、夕方と夜景が中心のエリアです。',
      hi: 'सनसेट टाउन शाम और रात के नज़ारों के लिए प्रमुख क्षेत्र है, जहाँ सूर्यास्त देखने के स्थान, नाइट मार्केट और आतिशबाज़ी शो का आयोजन स्थल है।',
      vi: 'Thị trấn Hoàng Hôn là điểm đến buổi tối nổi bật với các góc ngắm hoàng hôn, chợ đêm và sân khấu pháo hoa.',
    },
    heroImage: '/hero/02_kiss_bridge_aerial_1280.webp',
    heroAlt: {
      ko: '선셋타운 키스브릿지 및 해안가 전경',
      en: 'Sunset Town Kiss Bridge aerial overview',
      zh: '日落小镇接吻桥全景',
      ru: 'Панорама Моста Поцелуев в Сансет-Тауне',
      ja: 'サンセットタウン・キスブリッジの全景',
      hi: 'सनसेट टाउन किस ब्रिज का विहंगम दृश्य',
      vi: 'Toàn cảnh Cầu Hôn Thị trấn Hoàng Hôn',
    },
    ctaButton: {
      ko: '선셋타운 페이지 가기 →',
      en: 'Explore Sunset Town →',
      zh: '前往 Sunset Town 专页 →',
      ru: 'Перейти к Sunset Town →',
      ja: 'Sunset Town の詳細へ →',
      hi: 'Sunset Town देखें →',
      vi: 'Xem Thị trấn Hoàng Hôn →',
    },
    featureChips: {
      ko: ['키스브릿지', '키스 오브 더 씨 불꽃쇼', '선월드 케이블카', '부이페스트 야시장', '식당 및 카페'],
      en: ['Kiss Bridge', 'Kiss of the Sea Show', 'Sun World Cable Car', 'VuiFest Market', 'Dining & Cafes'],
      zh: ['接吻桥', '海洋之吻烟花秀', '太阳世界缆车', '日落夜市', '特色餐厅与咖啡'],
      ru: ['Мост Поцелуев', 'Шоу фейерверков', 'Канатная дорога', 'Ночной рынок VuiFest', 'Рестораны и бары'],
      ja: ['キスブリッジ', '花火ショー', 'ケーブルカー', 'ナイトマーケット', 'レストラン＆カフェ'],
      hi: ['किस ब्रिज', 'आतिशबाजी शो', 'केबल कार', 'नाइट मार्केट', 'रेस्तरां और कैफे'],
      vi: ['Cầu Hôn', 'Show Kiss of the Sea', 'Cáp treo Hòn Thơm', 'Chợ đêm VuiFest', 'Ẩm thực & Cafe'],
    },
    attractions: [
      {
        number: 1,
        name: {
          ko: '키스브릿지 (Kiss Bridge)',
          en: 'Kiss Bridge',
          zh: '接吻桥 (Kiss Bridge)',
          ru: 'Мост Поцелуев (Kiss Bridge)',
          ja: 'キスブリッジ (Kiss Bridge)',
          hi: 'किस ब्रिज (Kiss Bridge)',
          vi: 'Cầu Hôn (Kiss Bridge)',
        },
        description: {
          ko: '바다 위 마주보는 형태의 보행교',
          en: 'Pedestrian bridge with two sections facing each other above the sea',
          zh: '两段桥体在海上相向而立的步行桥',
          ru: 'Пешеходный мост с двумя обращёнными друг к другу частями над морем',
          ja: '海の上で向かい合う形の歩行者用橋',
          hi: 'समुद्र के ऊपर एक-दूसरे के आमने-सामने बने दो हिस्सों वाला पैदल पुल',
          vi: 'Cây cầu đi bộ biểu tượng vươn ra biển khơi',
        },
        tag: { ko: '일몰 지점', en: 'Sunset View', zh: '日落观景', ru: 'Закат', ja: '夕日スポット', hi: 'सूर्यास्त दृश्य', vi: 'Điểm ngắm hoàng hôn' },
      },
      {
        number: 2,
        name: {
          ko: '키스 오브 더 씨 & 불꽃쇼',
          en: 'Kiss of the Sea & Fireworks',
          zh: '海洋之吻与烟花秀',
          ru: 'Kiss of the Sea и фейерверк',
          ja: 'キス・オブ・ザ・シー＆花火ショー',
          hi: 'किस ऑफ द सी और आतिशबाजी',
          vi: 'Kiss of the Sea & Pháo hoa',
        },
        description: {
          ko: '해상 무대 공연 및 야간 불꽃 연출',
          en: 'Performance on a stage over the sea with nighttime fireworks effects',
          zh: '海上舞台表演及夜间烟花演出',
          ru: 'Представление на сцене над морем и вечерние фейерверки',
          ja: '海上ステージでの公演と夜間の花火演出',
          hi: 'समुद्र के ऊपर बने मंच पर प्रदर्शन और रात में आतिशबाज़ी का आयोजन',
          vi: 'Đại tiệc nghệ thuật đa phương tiện trên biển kết hợp pháo hoa',
        },
        tag: { ko: '공연', en: 'Show', zh: '演出', ru: 'Шоу', ja: '公演', hi: 'शो', vi: 'Show diễn' },
      },
      {
        number: 3,
        name: {
          ko: '선월드 혼톰 케이블카 승강장',
          en: 'Sun World Hon Thom Cable Car Station',
          zh: 'Sun World 香岛缆车站',
          ru: 'Станция канатной дороги Sun World на Хон Тхом',
          ja: 'サンワールド・ホントムケーブルカー駅',
          hi: 'Sun World हॉन थोम केबल कार स्टेशन',
          vi: 'Ga Cáp treo Hòn Thơm Sun World',
        },
        description: {
          ko: '혼톰섬 방면 해상 케이블카 탑승지',
          en: 'Boarding point for the oversea cable car to Hon Thom Island',
          zh: '前往香岛的跨海缆车乘车点',
          ru: 'Место посадки на канатную дорогу над морем, ведущую на остров Хон Тхом',
          ja: 'ホントム島方面へ向かう海上ケーブルカーの乗り場',
          hi: 'हॉन थोम द्वीप जाने वाली समुद्र के ऊपर चलने वाली केबल कार का बोर्डिंग स्थल',
          vi: 'Điểm khởi hành tuyến cáp treo vượt biển nối liền Hòn Thơm',
        },
        tag: { ko: '케이블카', en: 'Cable Car', zh: '缆车', ru: 'Канатка', ja: 'ケーブルカー', hi: 'केबल कार', vi: 'Cáp treo' },
      },
      {
        number: 4,
        name: {
          ko: '부이페스트 야시장 (VuiFest Night Market)',
          en: 'VuiFest Night Market',
          zh: 'VuiFest 日落夜市',
          ru: 'Ночной рынок VuiFest',
          ja: 'ブイフェスト・ナイトマーケット',
          hi: 'वुईफेस्ट नाइट मार्केट',
          vi: 'Chợ đêm bên biển VuiFest',
        },
        description: {
          ko: '해안가 상점 및 음식 거리',
          en: 'Seaside shops and food street',
          zh: '海岸边的商店与美食街',
          ru: 'Прибрежные магазины и улица с едой',
          ja: '海沿いのショップと飲食店街',
          hi: 'समुद्र किनारे की दुकानें और खाने-पीने की गली',
          vi: 'Tuyến phố đi bộ ẩm thực và mua sắm nhộn nhịp ven biển',
        },
        tag: { ko: '야시장', en: 'Night Market', zh: '夜市', ru: 'Ночной рынок', ja: '夜市', hi: 'नाइट मार्केट', vi: 'Chợ đêm' },
      },
    ],
    categories: [
      { icon: '🍽️', name: { ko: '식당', en: 'Dining', zh: '餐饮', ru: 'Рестораны', ja: 'グルメ', hi: 'भोजन', vi: 'Ẩm thực' }, count: 55, categoryKey: 'dining' },
      { icon: '🍹', name: { ko: '카페 & 바', en: 'Cafe & Bars', zh: '咖啡馆与酒吧', ru: 'Кафе и бары', ja: 'カフェ＆バー', hi: 'कैफ़े और बार', vi: 'Quán cà phê & Bar' }, count: 35, categoryKey: 'bars' },
      { icon: '🏨', name: { ko: '호텔', en: 'Hotels', zh: '酒店', ru: 'Отели', ja: 'ホテル', hi: 'होटल', vi: 'Khách sạn' }, count: 85, categoryKey: 'hotels' },
      { icon: '🛍️', name: { ko: '쇼핑', en: 'Shopping', zh: '购物', ru: 'Шопинг', ja: 'ショッピング', hi: 'खरीदारी', vi: 'Mua sắm' }, count: 15, categoryKey: 'shopping' },
      { icon: '✦', name: { ko: '스파', en: 'Spa', zh: '水疗', ru: 'Спа', ja: 'スパ', hi: 'स्पा', vi: 'Spa & Wellness' }, count: 29, categoryKey: 'wellness' },
      { icon: '🎡', name: { ko: '액티비티', en: 'Activities', zh: '活动与体验', ru: 'Активности', ja: 'アクティビティ', hi: 'गतिविधियाँ', vi: 'Điểm tham quan & Hoạt động' }, count: 13, categoryKey: 'activities' },
      { icon: '🏖️', name: { ko: '해변', en: 'Beach', zh: '海滩', ru: 'Пляж', ja: 'ビーチ', hi: 'समुद्र तट', vi: 'Bãi biển' }, count: 0, categoryKey: 'beaches' },
      { icon: '🏦', name: { ko: '환전·ATM·은행', en: 'Currency & ATM', zh: '兑换与ATM', ru: 'Обмен и банкоматы', ja: '両替・ATM・銀行', hi: 'मुद्रा विनिमय व एटीएम', vi: 'Đổi tiền & ATM' }, count: 8, categoryKey: 'banking' },
      { icon: '🧭', name: { ko: '생활편의', en: 'Essentials', zh: '便民设施', ru: 'Полезные сервисы', ja: '生活便利', hi: 'आवश्यक सेवाएँ', vi: 'Tiện ích' }, count: 8, categoryKey: 'essentials' },
      { icon: '🚖', name: { ko: '이동·교통', en: 'Transport', zh: '交通出行', ru: 'Транспорт', ja: '交通・アクセス', hi: 'यातायात', vi: 'Di chuyển' }, count: 3, categoryKey: 'transport' },
    ],
    categoryBadge: {
      ko: '선셋타운 중심 251곳',
      en: '251 Central Venues',
      zh: '日落小镇核心251处',
      ru: '251 заведение в центре',
      ja: 'サンセットタウン中心251か所',
      hi: '251 केंद्रीय स्थान',
      vi: '251 cơ sở trung tâm',
    },
    noteBanner: {
      ko: 'ℹ️ 안터이 인근 생활편의 (40곳): 안터이 시내의 약국 18곳, 은행·ATM 9곳(켐비치 입구 1곳 포함), 마트 4곳, 식당 4곳 등은 \'인근 편의시설\' 탭에서 별도 조회할 수 있습니다.',
      en: 'ℹ️ Nearby An Thoi Services (40 locations): 18 pharmacies, 9 banks/ATMs (including 1 at the Khem Beach entrance), 4 marts, and 4 restaurants in An Thoi town, among other services, can be viewed separately under the \'Nearby Services\' tab.',
      zh: 'ℹ️ 安泰周边生活便民设施（40处）：安泰市区的18家药房、9处银行及ATM（包括凯姆海滩入口处的1处）、4家超市、4家餐厅等，可在“周边便民设施”选项卡中单独查看。',
      ru: 'ℹ️ Повседневные услуги поблизости от Ан Тхоя (40 мест): 18 аптек, 9 банков и банкоматов (включая 1 у въезда на пляж Кхем), 4 магазина и 4 ресторана в Ан Тхое, а также другие объекты можно отдельно посмотреть во вкладке «Услуги поблизости».',
      ja: 'ℹ️ アントイ周辺の生活利便施設（40か所）：アントイ市街地の薬局18か所、銀行・ATM 9か所（ケムビーチ入口の1か所を含む）、マート4か所、飲食店4か所などは、「周辺施設」タブで別途確認できます。',
      hi: 'ℹ️ आन थोई के आसपास की दैनिक सुविधाएँ (40 स्थान): आन थोई शहर में 18 फ़ार्मेसी, 9 बैंक/एटीएम (खेम बीच के प्रवेश द्वार पर स्थित 1 स्थान सहित), 4 मार्ट और 4 रेस्तरां आदि को \'नज़दीकी सुविधाएँ\' टैब में अलग से देखा जा सकता है।',
      vi: 'ℹ️ Tiện ích lân cận An Thới (40 cơ sở): 18 nhà thuốc, 9 ngân hàng/ATM, 4 siêu thị và 4 quán ăn có thể tra cứu tại mục tiện ích lân cận.',
    },
    transitHeadline: {
      ko: '⇄ 켐비치(Bãi Khem) 이동 안내',
      en: 'Travel between the two areas: approx. 10 mins by car',
      zh: '两个区域之间的交通：车程约 10 分钟',
      ru: '⇄ Как добраться до пляжа Кхем (Bãi Khem)',
      ja: '⇄ ケムビーチ (Bãi Khem) へのアクセス案内',
      hi: 'दोनों क्षेत्रों के बीच यात्रा: कार से लगभग 10 मिनट',
      vi: '⇄ Hướng dẫn di chuyển đến Bãi Khem',
    },
    transitDescription: {
      ko: '이동 수단: 택시 또는 그랩(지역·시간대에 따라 호출이 어려울 수 있음) · 차량 약 10분 소요',
      en: 'Transport: Taxi or Grab (availability may vary by time and location) · approx. 10 mins by car',
      zh: '交通方式：出租车或 Grab 网约车（根据地区和时段，可能较难叫到车）· 车程约 10 分钟',
      ru: 'Транспорт: такси или Grab (в зависимости от района и времени суток вызвать машину может быть сложно) · около 10 минут на машине',
      ja: '交通手段：タクシーまたはGrab（時間帯や場所により手配に時間がかかる場合があります） · 車で約10分',
      hi: 'परिवहन: टैक्सी या Grab (इलाके और समय के अनुसार गाड़ी बुक करना मुश्किल हो सकता है) · कार से लगभग 10 मिनट',
      vi: 'Phương tiện: Taxi hoặc Grab (tùy thời điểm và khu vực) · khoảng 10 phút đi xe',
    },
  },

  'khem-beach': {
    slug: 'khem-beach',
    name: {
      ko: '켐비치 (Khem Beach)',
      en: 'Khem Beach',
      zh: 'Khem Beach',
      ru: 'Khem Beach',
      ja: 'Khem Beach',
      hi: 'Khem Beach',
      vi: 'Bãi Khem (Khem Beach)',
    },
    nameLocal: 'Bãi Khem',
    subConcept: {
      ko: '백사장 해변 · 에메랄드 베이 리조트',
      en: 'White Sand Beach · Emerald Bay Resorts',
      zh: '白沙海滩 · 翡翠湾度假村',
      ru: 'Белоснежный песок · Курорты Изумрудного залива',
      ja: '白砂のビーチ · エメラルドベイのリゾート',
      hi: 'सफेद रेत का समुद्र तट · एमराल्ड बे रिसॉर्ट्स',
      vi: 'Bãi cát trắng mịn · Quần thể khu nghỉ dưỡng cao cấp',
    },
    badge: {
      ko: '낮 & 해변 휴식 중심',
      en: 'Daytime & Beach Leisure Hub',
      zh: '白天与海滩休闲中心',
      ru: 'Дневной пляжный отдых',
      ja: '昼＆ビーチレジャーの中心',
      hi: 'दिन और समुद्र तट विश्राम केंद्र',
      vi: 'Trung tâm nghỉ dưỡng biển ban ngày',
    },
    summary: {
      ko: '백사장과 해변, 비치클럽, 리조트가 있는 구역',
      en: 'An area with white sand, a beach, beach clubs, and resorts.',
      zh: '拥有白沙滩、海滩、海滩俱乐部和度假村的区域',
      ru: 'Район с белым песчаным пляжем, пляжными клубами и курортами.',
      ja: '白砂のビーチ、ビーチクラブ、リゾートがあるエリア',
      hi: 'सफेद रेत वाले समुद्र तट, बीच क्लब और रिसॉर्ट्स वाला क्षेत्र',
      vi: 'Khu vực nổi tiếng với bãi cát trắng mịn, vịnh nước trong xanh và các khu nghỉ dưỡng hàng đầu.',
    },
    homeDescription: {
      ko: '바이켐 해변, 해변 리조트(JW 메리어트·프리미어·뉴월드), 해양 레저 및 ATM이 있는 낮·해변 휴식 중심 구역입니다.',
      en: 'An area focused on daytime beach relaxation, featuring Bãi Khem Beach, beachfront resorts (JW Marriott, Premier Residences, New World), water activities, and ATMs.',
      zh: '这是一个以白天海滩休闲为主的区域，设有 Bãi Khem 海滩、海滨度假村（JW Marriott、Premier Residences、New World）、海上休闲活动设施及ATM。',
      ru: 'Район дневного пляжного отдыха с пляжем Bãi Khem, прибрежными курортами (JW Marriott, Premier Residences, New World), водными развлечениями и банкоматами.',
      ja: 'Bãi Khemビーチ、海辺のリゾート（JW Marriott・Premier Residences・New World）、マリンレジャー、ATMがある、昼間のビーチ休暇を中心としたエリアです。',
      hi: 'यह दिन में समुद्र तट पर आराम करने के लिए प्रमुख क्षेत्र है, जहाँ Bãi Khem बीच, समुद्र तट के रिसॉर्ट्स (JW Marriott, Premier Residences, New World), समुद्री मनोरंजक गतिविधियाँ और एटीएम हैं।',
      vi: 'Bãi Khem cát trắng, các resort đẳng cấp (JW Marriott, Premier Residences, New World), thể thao biển và ATM tiện lợi.',
    },
    overview: {
      ko: '켐비치는 백사장과 해변 휴식 시설, 리조트가 있는 낮·해변 휴식 중심 구역입니다.',
      en: 'Khem Beach is an area focused on daytime beach relaxation, with white sand, beach relaxation facilities, and resorts.',
      zh: '凯姆海滩是一个以白天海滩休闲为主的区域，设有白沙滩、海滩休闲设施和度假村。',
      ru: 'Пляж Кхем — район дневного пляжного отдыха с белым песчаным берегом, пляжной инфраструктурой для отдыха и курортами.',
      ja: 'ケムビーチは、白砂のビーチ、海辺の休憩施設、リゾートがある、昼間のビーチ休暇を中心としたエリアです。',
      hi: 'खेम बीच दिन में समुद्र तट पर आराम करने के लिए प्रमुख क्षेत्र है, जहाँ सफेद रेत वाला समुद्र तट, समुद्र तट पर विश्राम की सुविधाएँ और रिसॉर्ट्स हैं।',
      vi: 'Bãi Khem là điểm đến nghỉ dưỡng biển lý tưởng ban ngày với bãi cát trắng phau và các khu nghỉ dưỡng sang trọng.',
    },
    heroImage: '/zones/khem-beach-hero.webp',
    heroAlt: {
      ko: '켐비치(Bãi Khem) 에메랄드 해변 풍경 (Vivu Vietnam 촬영, Unsplash License)',
      en: 'Khem Beach (Bãi Khem) emerald waters (Photo by Vivu Vietnam, Unsplash License)',
      zh: '凯姆海滩碧水白沙风景 (摄影 Vivu Vietnam, Unsplash License)',
      ru: 'Изумрудный берег пляжа Кхем (фото Vivu Vietnam, лицензия Unsplash)',
      ja: 'ケムビーチのエメラルドの海と砂浜（Vivu Vietnam撮影、Unsplashライセンス）',
      hi: 'खेम बीच का दृश्य (फोटो Vivu Vietnam, अनस्प्लैश लाइसेंस)',
      vi: 'Cảnh biển Bãi Khem xanh ngọc bích (Ảnh Vivu Vietnam, Unsplash License)',
    },
    ctaButton: {
      ko: '켐비치 페이지 가기 →',
      en: 'Explore Khem Beach →',
      zh: '前往 Khem Beach 专页 →',
      ru: 'Перейти к Khem Beach →',
      ja: 'Khem Beach の詳細へ →',
      hi: 'Khem Beach देखें →',
      vi: 'Xem Bãi Khem →',
    },
    featureChips: {
      ko: ['바이켐 해변', 'JW 메리어트', '프리미어 레지던스', '뉴월드 리조트', '해양 레저'],
      en: ['Khem Beach', 'JW Marriott', 'Premier Residences', 'New World Resort', 'Water Sports'],
      zh: ['凯姆海滩', 'JW万豪度假酒店', '翡翠湾雅高公寓', '新世界度假酒店', '水上运动'],
      ru: ['Пляж Кхем', 'JW Marriott', 'Premier Residences', 'New World Resort', 'Водный спорт'],
      ja: ['ケムビーチ', 'JWマリオット', 'プレミアレジデンス', 'ニューワールド', 'マリンスポーツ'],
      hi: ['बाय खेम बीच', 'JW मैरियट', 'प्रीमियर रेजिडेंस', 'न्यू वर्ल्ड रिसॉर्ट', 'वाटर स्पोर्ट्स'],
      vi: ['Bãi Khem', 'JW Marriott', 'Premier Residences', 'New World Resort', 'Thể thao biển'],
    },
    attractions: [
      {
        number: 1,
        name: {
          ko: '바이켐 해변 (Bãi Khem Beach)',
          en: 'Bãi Khem Beach',
          zh: 'Bãi Khem 海滩',
          ru: 'Пляж Bãi Khem',
          ja: 'Bãi Khemビーチ',
          hi: 'Bãi Khem बीच',
          vi: 'Bãi Khem (Bãi Khem Beach)',
        },
        description: {
          ko: '천연 모래 백사장과 해변',
          en: 'Natural white sand beach',
          zh: '天然白沙海滩',
          ru: 'Природный пляж с белым песком',
          ja: '天然の白砂が広がるビーチ',
          hi: 'प्राकृतिक सफेद रेत वाला समुद्र तट',
          vi: 'Bãi cát trắng tự nhiên và làn nước xanh như ngọc',
        },
        tag: { ko: '해변', en: 'Beach', zh: '海滩', ru: 'Пляж', ja: 'ビーチ', hi: 'समुद्र तट', vi: 'Bãi biển' },
      },
      {
        number: 2,
        name: {
          ko: 'JW 메리어트 푸꾸옥 에메랄드 베이',
          en: 'JW Marriott Phu Quoc Emerald Bay',
          zh: '富国岛翡翠湾JW万豪度假酒店',
          ru: 'JW Marriott Phu Quoc Emerald Bay Resort',
          ja: 'JWマリオット・フーコック・エメラルドベイ',
          hi: 'JW मैरियट फु क्वोक एमराल्ड बे',
          vi: 'JW Marriott Phu Quoc Emerald Bay Resort & Spa',
        },
        description: {
          ko: '켐비치 해변 리조트',
          en: 'Beachfront resort at Khem Beach',
          zh: '凯姆海滩的海滨度假村',
          ru: 'Прибрежный курорт на пляже Кхем',
          ja: 'ケムビーチにある海辺のリゾート',
          hi: 'खेम बीच पर स्थित समुद्र तटीय रिसॉर्ट',
          vi: 'Khu nghỉ dưỡng 5 sao sang trọng bên bờ biển Bãi Khem',
        },
        tag: { ko: '리조트', en: 'Resort', zh: '度假村', ru: 'Курорт', ja: 'リゾート', hi: 'रिसॉर्ट', vi: 'Khu nghỉ dưỡng' },
      },
      {
        number: 3,
        name: {
          ko: '프리미어 레지던스 푸꾸옥 에메랄드 베이',
          en: 'Premier Residences Phu Quoc Emerald Bay',
          zh: '富国岛翡翠湾雅高高级公寓',
          ru: 'Premier Residences Phu Quoc Emerald Bay',
          ja: 'プレミアレジデンス・フーコック・エメラルドベイ',
          hi: 'प्रीमियर रेजिडेंस फु क्वोक एमराल्ड बे',
          vi: 'Premier Residences Phu Quoc Emerald Bay',
        },
        description: {
          ko: '켐비치 호텔 & 아파트먼트',
          en: 'Hotel and apartments at Khem Beach',
          zh: '凯姆海滩的酒店及公寓',
          ru: 'Отель и апартаменты на пляже Кхем',
          ja: 'ケムビーチにあるホテル＆アパートメント',
          hi: 'खेम बीच पर स्थित होटल और अपार्टमेंट',
          vi: 'Căn hộ và phòng nghỉ dưỡng gia đình năng động do Accor quản lý',
        },
        tag: { ko: '호텔', en: 'Hotel', zh: '酒店', ru: 'Отель', ja: 'ホテル', hi: 'होटल', vi: 'Khách sạn' },
      },
      {
        number: 4,
        name: {
          ko: '뉴월드 푸꾸옥 리조트 (New World Phu Quoc Resort)',
          en: 'New World Phu Quoc Resort',
          zh: '富国岛新世界度假酒店 (New World)',
          ru: 'New World Phu Quoc Resort',
          ja: 'ニューワールド・フーコック・リゾート',
          hi: 'न्यू वर्ल्ड फु क्वोक रिसॉर्ट',
          vi: 'New World Phu Quoc Resort',
        },
        description: {
          ko: '켐비치 해변 리조트',
          en: 'Beachfront resort at Khem Beach',
          zh: '凯姆海滩的海滨度假村',
          ru: 'Прибрежный курорт на пляже Кхем',
          ja: 'ケムビーチにある海辺のリゾート',
          hi: 'खेम बीच पर स्थित समुद्र तटीय रिसॉर्ट',
          vi: 'Khu nghỉ dưỡng toàn biệt thự mang cảm hứng làng chài truyền thống',
        },
        tag: { ko: '리조트', en: 'Resort', zh: '度假村', ru: 'Курорт', ja: 'リゾート', hi: 'रिसॉर्ट', vi: 'Khu nghỉ dưỡng' },
      },
    ],
    categories: [
      { icon: '🍽️', name: { ko: '식당', en: 'Dining', zh: '餐饮', ru: 'Рестораны', ja: 'グルメ', hi: 'भोजन', vi: 'Ẩm thực' }, count: 12, categoryKey: 'dining' },
      { icon: '🍹', name: { ko: '카페 & 바', en: 'Cafe & Bars', zh: '咖啡馆与酒吧', ru: 'Кафе и бары', ja: 'カフェ＆バー', hi: 'कैफ़े और बार', vi: 'Quán cà phê & Bar' }, count: 6, categoryKey: 'bars' },
      { icon: '🏨', name: { ko: '호텔', en: 'Hotels', zh: '酒店', ru: 'Отели', ja: 'ホテル', hi: 'होटल', vi: 'Khách sạn' }, count: 7, categoryKey: 'hotels' },
      { icon: '🛍️', name: { ko: '쇼핑', en: 'Shopping', zh: '购物', ru: 'Шопинг', ja: 'ショッピング', hi: 'खरीदारी', vi: 'Mua sắm' }, count: 0, categoryKey: 'shopping' },
      { icon: '✦', name: { ko: '스파', en: 'Spa', zh: '水疗', ru: 'Спа', ja: 'スパ', hi: 'स्पा', vi: 'Spa & Wellness' }, count: 3, categoryKey: 'wellness' },
      { icon: '🎡', name: { ko: '액티비티', en: 'Activities', zh: '活动与体验', ru: 'Активности', ja: 'アクティビティ', hi: 'गतिविधियाँ', vi: 'Điểm tham quan & Hoạt động' }, count: 1, categoryKey: 'activities' },
      { icon: '🏖️', name: { ko: '해변', en: 'Beach', zh: '海滩', ru: 'Пляж', ja: 'ビーチ', hi: 'समुद्र तट', vi: 'Bãi biển' }, count: 1, categoryKey: 'beaches' },
      { icon: '🏦', name: { ko: '환전·ATM·은행', en: 'Currency & ATM', zh: '兑换与ATM', ru: 'Обмен и банкоматы', ja: '両替・ATM・銀行', hi: 'मुद्रा विनिमय व एटीएम', vi: 'Đổi tiền & ATM' }, count: 1, categoryKey: 'banking' },
      { icon: '🧭', name: { ko: '생활편의', en: 'Essentials', zh: '便民设施', ru: 'Полезные сервисы', ja: '生活便利', hi: 'आवश्यक सेवाएँ', vi: 'Tiện ích' }, count: 0, categoryKey: 'essentials' },
      { icon: '🚖', name: { ko: '이동·교통', en: 'Transport', zh: '交通出行', ru: 'Транспорт', ja: '交通・アクセス', hi: 'यातायात', vi: 'Di chuyển' }, count: 1, categoryKey: 'transport' },
    ],
    categoryBadge: {
      ko: '조사 확인된 업체 32곳',
      en: '32 Surveyed & Confirmed Venues',
      zh: '经调查确认的32处商家',
      ru: '32 подтверждённых заведения',
      ja: '調査・確認済みの32施設',
      hi: 'सर्वेक्षण में पुष्टि किए गए 32 स्थान',
      vi: '32 cơ sở đã xác minh thực tế',
    },
    noteBanner: {
      ko: '💡 리조트 다이닝 안내: 이용 가능 여부와 예약 조건은 업장마다 다를 수 있어, 방문 전 문의를 추천합니다.',
      en: '💡 Resort Dining Note: Availability and reservation requirements may vary by venue, so we recommend checking before your visit.',
      zh: '💡 度假村餐饮提示：各餐饮场所的接待情况和预订条件可能有所不同，建议到访前咨询。',
      ru: '💡 Рестораны на курортах: доступность посещения и условия бронирования могут различаться в зависимости от заведения. Рекомендуем уточнять информацию перед визитом.',
      ja: '💡 リゾートレストランのご案内：利用の可否や予約条件は店舗によって異なる場合があるため、訪問前のお問い合わせをおすすめします。',
      hi: '💡 रिसॉर्ट में भोजन संबंधी जानकारी: उपलब्धता और बुकिंग की शर्तें हर स्थान पर अलग हो सकती हैं, इसलिए जाने से पहले पूछताछ करने की सलाह दी जाती है।',
      vi: '💡 Lưu ý ẩm thực resort: Quy định phục vụ khách không lưu trú có thể khác nhau tùy cơ sở, khuyến khích liên hệ trước.',
    },
    transitHeadline: {
      ko: '⇄ 선셋타운(Sunset Town) 이동 안내',
      en: 'Travel between the two areas: approx. 10 mins by car',
      zh: '两个区域之间的交通：车程约 10 分钟',
      ru: '⇄ Как добраться до Сансет-Тауна',
      ja: '⇄ サンセットタウン (Sunset Town) へのアクセス案内',
      hi: 'दोनों क्षेत्रों के बीच यात्रा: कार से लगभग 10 मिनट',
      vi: '⇄ Hướng dẫn di chuyển về Thị trấn Hoàng Hôn',
    },
    transitDescription: {
      ko: '이동 수단: 택시 또는 그랩(지역·시간대에 따라 호출이 어려울 수 있음) · 차량 약 10분 소요',
      en: 'Transport: Taxi or Grab (availability may vary by time and location) · approx. 10 mins by car',
      zh: '交通方式：出租车或 Grab 网约车（根据地区和时段，可能较难叫到车）· 车程约 10 分钟',
      ru: 'Транспорт: такси или Grab (в зависимости от района и времени суток вызвать машину может быть сложно) · около 10 минут на машине',
      ja: '交通手段：タクシーまたはGrab（時間帯や場所により手配に時間がかかる場合があります） · 車で約10分',
      hi: 'परिवहन: टैक्सी या Grab (इलाके और समय के अनुसार गाड़ी बुक करना मुश्किल हो सकता है) · कार से लगभग 10 मिनट',
      vi: 'Phương tiện: Taxi hoặc Grab (tùy thời điểm và khu vực) · khoảng 10 phút đi xe',
    },
  },
}

/**
 * 2대 구역 이동 안내 (홈 화면 Transit Bridge 바)
 */
export const INTER_ZONE_TRANSIT = {
  headline: {
    ko: '두 구역 간 이동: 차량 약 10분 소요',
    en: 'Travel between the two areas: approx. 10 mins by car',
    zh: '两个区域之间的交通：车程约 10 分钟',
    ru: 'Поездка между районами занимает около 10 минут',
    ja: '両エリア間の移動：車で約10分',
    hi: 'दोनों क्षेत्रों के बीच यात्रा: कार से लगभग 10 मिनट',
    vi: 'Khoảng cách giữa hai khu vực: khoảng 10 phút đi xe',
  },
  description: {
    ko: '이동 수단: 택시 또는 그랩(지역·시간대에 따라 호출이 어려울 수 있음) · 차량 약 10분 소요',
    en: 'Transport: Taxi or Grab (availability may vary by time and location) · approx. 10 mins by car',
    zh: '交通方式：出租车或 Grab 网约车（根据地区和时段，可能较难叫到车） · 车程约 10 分钟',
    ru: 'Транспорт: такси или Grab (в зависимости от района и времени суток вызвать машину может быть сложно) · около 10 минут на машине',
    ja: '交通手段：タクシーまたはGrab（時間帯や場所により手配に時間がかかる場合があります） · 車で約10分',
    hi: 'परिवहन: टैक्सी या Grab (इलाके और समय के अनुसार गाड़ी बुक करना मुश्किल हो सकता है) · कार से लगभग 10 मिनट',
    vi: 'Phương tiện: Taxi hoặc Grab (tùy thời điểm và khu vực) · khoảng 10 phút đi xe',
  },
  badge: {
    ko: '택시 또는 그랩 (차량 약 10분)',
    en: 'Taxi or Grab (approx. 10 mins by car)',
    zh: '出租车或 Grab（车程约 10 分钟）',
    ru: 'Такси или Grab (около 10 минут на машине)',
    ja: 'タクシー / Grab (車で約10分)',
    hi: 'टैक्सी या Grab (कार से लगभग 10 मिनट)',
    vi: 'Taxi hoặc Grab (~10 phút)',
  },
}

/**
 * ?zone= 쿼리 파라미터 정규화
 * - sunset-town 및 khem-beach 2개만 허용
 * - 기존 6개 구역 값(sorrento, amalfi, venice, positano, hillside, central 등)은 sunset-town으로 자동 매핑
 */
export function normalizeZoneQuery(rawZone?: string | null): MainZoneSlug | undefined {
  if (!rawZone) return undefined
  const z = rawZone.toLowerCase().trim()
  if (z === 'khem-beach' || z === 'khem' || z === 'bai-khem' || z === 'bai_khem') {
    return 'khem-beach'
  }
  // All other values (sorrento, amalfi, venice, positano, hillside, central, sunset-town, all) map to sunset-town
  return 'sunset-town'
}

/**
 * 개별 비즈니스의 zone 배정 정보 조회 (zone-assignments.json 기반)
 */
export interface ZoneAssignmentRecord {
  place_id: string
  google_place_id: string | null
  name: string
  zone: MainZoneSlug
  public_category: string
  service_areas: string[]
}

const assignmentsMap = zoneAssignmentsJson as unknown as Record<string, ZoneAssignmentRecord>

export function getZoneAssignment(idOrPlaceId: string): ZoneAssignmentRecord | null {
  if (!idOrPlaceId) return null
  if (assignmentsMap[idOrPlaceId]) return assignmentsMap[idOrPlaceId]
  // Secondary lookup by google_place_id
  for (const item of Object.values(assignmentsMap)) {
    if (item.google_place_id === idOrPlaceId || item.place_id === idOrPlaceId) {
      return item
    }
  }
  return null
}

export function getAllZoneAssignments(): Record<string, ZoneAssignmentRecord> {
  return assignmentsMap
}

// ==========================================
// 하위 호환성 (Legacy compatibility)
// ==========================================
export type SunsetZoneKey =
  | 'all'
  | 'sunset-town'
  | 'khem-beach'
  | 'sorrento'
  | 'amalfi'
  | 'venice'
  | 'positano'
  | 'hillside'
  | 'central'

export interface SunsetZoneInfo {
  key: SunsetZoneKey
  nameEn: string
  nameKo: string
  nameVi: string
  descriptionKo: string
  descriptionEn: string
  highlights: string[]
  zoneType?: 'all' | 'official_sector' | 'editorial_visitor_zone'
  officialProject?: string
}

export const SUNSET_ZONES: Record<SunsetZoneKey, SunsetZoneInfo> = {
  all: {
    key: 'all',
    nameEn: 'All Zones',
    nameKo: '선셋타운 전체',
    nameVi: 'Toàn bộ Thị trấn Hoàng Hôn',
    descriptionKo: '선셋타운의 모든 구역과 시설',
    descriptionEn: 'All quarters and facilities across Sunset Town',
    highlights: ['291 Facilities', 'All Quarters'],
    zoneType: 'all',
  },
  'sunset-town': {
    key: 'sunset-town',
    nameEn: 'Sunset Town',
    nameKo: '선셋타운',
    nameVi: 'Thị trấn Hoàng Hôn',
    descriptionKo: '선셋타운 중심 구역',
    descriptionEn: 'Sunset Town central district',
    highlights: ['Kiss Bridge', 'Cable Car'],
    zoneType: 'official_sector',
  },
  'khem-beach': {
    key: 'khem-beach',
    nameEn: 'Khem Beach',
    nameKo: '켐비치',
    nameVi: 'Bãi Khem',
    descriptionKo: '켐비치 휴식 구역',
    descriptionEn: 'Khem Beach coastal district',
    highlights: ['White Sand', 'Luxury Resorts'],
    zoneType: 'official_sector',
  },
  sorrento: {
    key: 'sorrento',
    nameEn: 'Sorrento',
    nameKo: '소렌토',
    nameVi: 'Sorrento',
    descriptionKo: '해안 산책로와 썬월드 케이블카 승강장이 인접한 이탈리아풍 거리 (공식 개발 구역)',
    descriptionEn: 'Coastal promenade and entrance near Sun World Cable Car station (Sun Premier Village Primavera)',
    highlights: ['Cable Car Station', 'Oceanview Cafes'],
    zoneType: 'official_sector',
    officialProject: 'Sun Premier Village Primavera',
  },
  amalfi: {
    key: 'amalfi',
    nameEn: 'Amalfi',
    nameKo: '아말피',
    nameVi: 'Amalfi',
    descriptionKo: '탁 트인 오션뷰와 테라스 레스토랑이 밀집한 지중해 절벽 마을 스타일 (공식 개발 구역)',
    descriptionEn: 'Breathtaking sea views, colorful cliffside villas, and terrace dining',
    highlights: ['Terrace Dining', 'Sunset Views'],
    zoneType: 'official_sector',
    officialProject: 'Sun Premier Village Primavera',
  },
  venice: {
    key: 'venice',
    nameEn: 'Venice',
    nameKo: '베니스',
    nameVi: 'Venice',
    descriptionKo: '베니스 운하 감성과 낭만적인 부티크 호텔, 브런치 카페 거리 (공식 개발 구역)',
    descriptionEn: 'Romantic Venetian architecture, boutique hotels and brunch bistros (Sun Premier Village Primavera)',
    highlights: ['Boutique Hotels', 'Canal Atmosphere'],
    zoneType: 'official_sector',
    officialProject: 'Sun Premier Village Primavera',
  },
  positano: {
    key: 'positano',
    nameEn: 'Positano',
    nameKo: '포지타노',
    nameVi: 'Positano',
    descriptionKo: '다채로운 파스텔톤 숍하우스와 쇼핑, 스파, 카페 명소 (공식 개발 구역)',
    descriptionEn: 'Vibrant pastel shophouses, fashion boutiques, spas and cafes (Sun Premier Village Primavera)',
    highlights: ['Spas & Shopping', 'Pastel Shophouses'],
    zoneType: 'official_sector',
    officialProject: 'Sun Premier Village Primavera',
  },
  hillside: {
    key: 'hillside',
    nameEn: 'Hillside',
    nameKo: '힐사이드',
    nameVi: 'Hillside',
    descriptionKo: '선셋타운 언덕 위에서 바다와 타운 전경을 내려다보는 레지던스 단지 (공식 개발 구역)',
    descriptionEn: 'Panoramic high-rise residential towers overlooking Sunset Town and the sea',
    highlights: ['Hillside Towers', 'Panoramic Overlook'],
    zoneType: 'official_sector',
    officialProject: 'Sun Grand City Hillside Residence',
  },
  central: {
    key: 'central',
    nameEn: 'Central / Kiss Bridge (Visitor Zone)',
    nameKo: '중심가 · 키스브릿지 · 부이페스트 (여행자 안내 구역)',
    nameVi: 'Trung tâm · Cầu Hôn · VuiFest (Khu du khách)',
    descriptionKo: '키스브릿지, 부이페스트 야시장, 키스오브더씨 불꽃놀이의 중심 (에디토리얼 여행자 구역)',
    descriptionEn: 'Heart of Kiss Bridge, VuiFest Night Market, and Kiss of the Sea Fireworks (Editorial Visitor Zone)',
    highlights: ['Kiss Bridge', 'VuiFest Night Market', 'Fireworks Stage'],
    zoneType: 'editorial_visitor_zone',
  },
}

export const SUNSET_ZONE_KEYS: SunsetZoneKey[] = [
  'all',
  'sunset-town',
  'khem-beach',
  'sorrento',
  'amalfi',
  'venice',
  'positano',
  'hillside',
  'central',
]

export function zoneLabel(key: SunsetZoneKey, locale: Locale = 'en'): string {
  if (key === 'khem-beach') {
    return MAIN_ZONES['khem-beach'].name[locale] || MAIN_ZONES['khem-beach'].name.en
  }
  if (key === 'sunset-town' || key === 'all') {
    return MAIN_ZONES['sunset-town'].name[locale] || MAIN_ZONES['sunset-town'].name.en
  }
  return MAIN_ZONES['sunset-town'].name[locale] || MAIN_ZONES['sunset-town'].name.en
}

export function detectSunsetZone(b: {
  id?: string
  place_id?: string
  address?: string | null
  public_name?: string | null
  tags?: string[] | null
  subcategory?: string | null
}): MainZoneSlug {
  const targetId = b.id || b.place_id
  if (targetId) {
    const assignment = getZoneAssignment(targetId)
    if (assignment) return assignment.zone
  }
  const text = `${b.address || ''} ${b.public_name || ''} ${(b.tags || []).join(' ')}`.toLowerCase()
  if (text.includes('khem') || text.includes('bãi khem')) return 'khem-beach'
  return 'sunset-town'
}

export function isSunsetTownFacility(b: {
  id?: string
  google_place_id?: string | null
  address?: string | null
  verification_note?: string | null
}): boolean {
  if (b.id) {
    const a = getZoneAssignment(b.id)
    if (a) return a.zone === 'sunset-town'
  }
  if (b.google_place_id) return true
  const addr = (b.address || '').toLowerCase()
  if (addr.includes('sunset town') || addr.includes('primavera') || addr.includes('선셋타운')) {
    return true
  }
  if (b.verification_note && b.verification_note.includes('Master DB')) {
    return true
  }
  return false
}
