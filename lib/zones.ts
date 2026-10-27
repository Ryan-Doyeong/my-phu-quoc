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
      zh: '日落小镇 (Sunset Town)',
      ru: 'Сансет-Таун (Sunset Town)',
      ja: 'サンセットタウン (Sunset Town)',
      hi: 'सनसेट टाउन (Sunset Town)',
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
      en: 'Evening & Nightlife Hub',
      zh: '傍晚与夜景中心',
      ru: 'Вечер и ночная панорама',
      ja: '夕日＆夜景の中心',
      hi: 'शाम और रात्रि दृश्य केंद्र',
      vi: 'Trung tâm hoàng hôn & đêm',
    },
    summary: {
      ko: '키스브릿지, 키스 오브 더 씨 불꽃쇼, 해상 케이블카, 부이페스트 야시장이 있는 구역',
      en: 'Hub of Kiss Bridge, Kiss of the Sea fireworks, cable car, and VuiFest night market.',
      zh: '汇聚接吻桥、海洋之吻烟花秀、海上缆车与日落夜市的核心区',
      ru: 'Зона с Мостом Поцелуев, шоу фейерверков, канатной дорогой и ночным рынком.',
      ja: 'キスブリッジ、キス・オブ・ザ・シー花火ショー、海上ケーブルカー、ナイトマーケットが集まるエリア',
      hi: 'किस ब्रिज, किस ऑफ द सी आतिशबाजी शो, केबल कार और नाइट मार्केट का केंद्र',
      vi: 'Khu vực Cầu Hôn, show pháo hoa Kiss of the Sea, cáp treo và chợ đêm VuiFest.',
    },
    homeDescription: {
      ko: '선셋타운 중심 시설 251곳(식당·카페·호텔)과 안터이 인근 생활편의 40곳 (약국·은행 등)이 연결된 저녁·야경 중심 구역입니다.',
      en: 'The vibrant evening hub connecting 251 central Sunset Town venues (dining, cafes, hotels) with 40 nearby An Thoi essential services.',
      zh: '日落小镇核心251家精选设施（餐饮、咖啡、酒店）与安泰周边40家便民服务相连的夜景中心。',
      ru: 'Центр вечернего отдыха: 251 заведение Сансет-Тауна и 40 полезных сервисов в соседнем Ан Тхое.',
      ja: 'サンセットタウン中心施設251か所（飲食店・カフェ・ホテル）とアントイ周辺の生活便利施設40か所が繋がる夕日・夜景エリアです。',
      hi: 'सनसेट टाउन के 251 प्रमुख स्थानों और आसपास के 40 आवश्यक सेवाओं से जुड़ा शाम का मुख्य केंद्र।',
      vi: 'Khu vực trọng điểm kết nối 251 cơ sở trung tâm Thị trấn Hoàng Hôn và 40 điểm tiện ích An Thới lân cận.',
    },
    overview: {
      ko: '선셋타운은 일몰 감상 지점과 야시장, 불꽃쇼 공연장이 있는 저녁·야경 중심 구역입니다.',
      en: 'Sunset Town is the prime evening destination featuring sunset viewpoints, seaside night markets, and the nightly fireworks theatre.',
      zh: '日落小镇是集日落观景点、海滨夜市和大型海上烟花剧场于一体的晚间核心区。',
      ru: 'Сансет-Таун — главное место для созерцания заката, вечернего шопинга и грандиозного шоу фейерверков.',
      ja: 'サンセットタウンは、夕日鑑賞スポット、ナイトマーケット、花火ショー会場が集まる夜のメインエリアです。',
      hi: 'सनसेट टाउन सूर्यास्त दर्शन, नाइट मार्केट और आतिशबाजी शो का प्रमुख शाम का केंद्र है।',
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
      zh: '前往日落小镇专页 →',
      ru: 'Перейти к Сансет-Тауну →',
      ja: 'サンセットタウンの詳細へ →',
      hi: 'सनसेट टाउन देखें →',
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
          en: 'Two iconic pedestrian spans meeting above the sea',
          zh: '海上双臂相向矗立的标志性步行景观桥',
          ru: 'Два элегантных пешеходных пролета, встречающихся над морем',
          ja: '海上で向かい合う象徴的な歩行者専用橋',
          hi: 'समुद्र के ऊपर आमने-सामने फैला पैदल पुल',
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
          en: 'Ocean multimedia show with spectacular nightly fireworks',
          zh: '多媒体海上大秀与压轴海上烟花秀',
          ru: 'Грандиозное мультимедийное шоу с фейерверком',
          ja: '迫力ある海上マルチメディア劇とフィナーレ花火',
          hi: 'समुद्री मल्टीमीडिया मंच प्रदर्शन और आतिशबाजी',
          vi: 'Đại tiệc nghệ thuật đa phương tiện trên biển kết hợp pháo hoa',
        },
        tag: { ko: '공연', en: 'Show', zh: '演出', ru: 'Шоу', ja: '公演', hi: 'शो', vi: 'Show diễn' },
      },
      {
        number: 3,
        name: {
          ko: '선월드 혼톰 케이블카 승강장',
          en: 'Sun World Cable Car Station',
          zh: '太阳世界香岛缆车站',
          ru: 'Станция канатной дороги Sun World',
          ja: 'サンワールド・ホントムケーブルカー駅',
          hi: 'सन वर्ल्ड केबल कार स्टेशन',
          vi: 'Ga Cáp treo Hòn Thơm Sun World',
        },
        description: {
          ko: '혼톰섬 방면 해상 케이블카 탑승지',
          en: 'Departure point for the world’s longest oversea cable car',
          zh: '通往香岛的世界级跨海缆车始发站',
          ru: 'Отправление самой длинной канатной дороги над морем',
          ja: 'ホントム島へ向かう世界最長級の海上ロープウェイ発着所',
          hi: 'हॉन थोम द्वीप के लिए ओवरसी केबल कार प्रस्थान बिंदु',
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
          en: 'Seaside promenade with lively food stalls and boutiques',
          zh: '依山傍海的热闹美食摊位与创意集市',
          ru: 'Оживленный приморский базар с уличной едой и сувенирами',
          ja: '海沿いに広がる屋台やショップが並ぶストリート',
          hi: 'समुद्र तट पर स्थित भोजन और खरीदारी का बाजार',
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
      en: 'ℹ️ Nearby An Thoi Services (40 venues): 18 pharmacies, 9 banks/ATMs (incl. Khem entrance), 4 marts, and 4 restaurants can be explored in the Nearby Services tab.',
      zh: 'ℹ️ 安泰周边便民服务（40处）：安泰市区的18家药房、9处银行与ATM、4家超市及4家餐厅可在“周边便民”中查看。',
      ru: 'ℹ️ Полезные сервисы в Ан Тхое (40 мест): 18 аптек, 9 банков и банкоматов, 4 супермаркета и 4 ресторана доступны во вкладке «Рядом».',
      ja: 'ℹ️ アントイ周辺の生活便利施設（40か所）：薬局18か所、銀行・ATM 9か所、マート4か所、食堂4か所は「周辺施設」タブで確認できます。',
      hi: 'ℹ️ नजदीकी आन थोई सेवाएं (40 स्थान): 18 फार्मेसी, 9 बैंक/एटीएम, 4 सुपरमार्केट और 4 रेस्तरां नजदीकी सेवाओं में देखें।',
      vi: 'ℹ️ Tiện ích lân cận An Thới (40 cơ sở): 18 nhà thuốc, 9 ngân hàng/ATM, 4 siêu thị và 4 quán ăn có thể tra cứu tại mục tiện ích lân cận.',
    },
    transitHeadline: {
      ko: '⇄ 켐비치(Bãi Khem) 이동 안내',
      en: '⇄ Transit to Khem Beach (Bãi Khem)',
      zh: '⇄ 前往凯姆海滩 (Bãi Khem) 交通指引',
      ru: '⇄ Как добраться до пляжа Кхем (Bãi Khem)',
      ja: '⇄ ケムビーチ (Bãi Khem) へのアクセス案内',
      hi: '⇄ खेम बीच (Bãi Khem) जाने का रास्ता',
      vi: '⇄ Hướng dẫn di chuyển đến Bãi Khem',
    },
    transitDescription: {
      ko: '이동 수단: 택시 또는 그랩(지역·시간대에 따라 호출이 어려울 수 있음) · 차량 약 10분 소요',
      en: 'Transport: Taxi or Grab (availability may vary by time and location) · approx. 10 mins by car',
      zh: '交通方式：出租车或 Grab 网约车（高峰期叫车可能需要稍作等待） · 车程约 10 分钟',
      ru: 'Транспорт: Такси или Grab (доступность зависит от времени суток) · около 10 минут на машине',
      ja: '交通手段：タクシーまたはGrab（時間帯や場所により手配に時間がかかる場合があります） · 車で約10分',
      hi: 'परिवहन: टैक्सी या ग्रैब (समय अनुसार उपलब्धता भिन्न हो सकती है) · कार से लगभग 10 मिनट',
      vi: 'Phương tiện: Taxi hoặc Grab (tùy thời điểm và khu vực) · khoảng 10 phút đi xe',
    },
  },

  'khem-beach': {
    slug: 'khem-beach',
    name: {
      ko: '켐비치 (Khem Beach)',
      en: 'Khem Beach',
      zh: '凯姆海滩 (Khem Beach)',
      ru: 'Пляж Кхем (Khem Beach)',
      ja: 'ケムビーチ (Khem Beach)',
      hi: 'खेम बीच (Khem Beach)',
      vi: 'Bãi Khem (Khem Beach)',
    },
    nameLocal: 'Bãi Khem',
    subConcept: {
      ko: '백사장 해변 · 에메랄드 베이 리조트',
      en: 'White Sand Beach · Emerald Bay Luxury Resorts',
      zh: '白沙碧海 · 翡翠湾高端度假村群',
      ru: 'Белоснежный песок · Курорты Изумрудного залива',
      ja: '白砂のビーチ · エメラルドベイの高級リゾート',
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
      en: 'Tranquil haven known for white powder sand, beachfront retreats, and luxury resorts.',
      zh: '拥有细腻白沙、清澈海湾与顶级海滨度假村的白天休闲区',
      ru: 'Живописный пляж с белым песком, курортами мирового уровня и водными видами спорта.',
      ja: 'パウダースノーのような白砂と透明な海、高級リゾートが並ぶ癒しのエリア',
      hi: 'सफेद रेत, समुद्र तट, बीच क्लब और लक्जरी रिसॉर्ट्स का क्षेत्र',
      vi: 'Khu vực nổi tiếng với bãi cát trắng mịn, vịnh nước trong xanh và các khu nghỉ dưỡng hàng đầu.',
    },
    homeDescription: {
      ko: '바이켐 해변, 해변 리조트(JW 메리어트·프리미어·뉴월드), 해양 레저 및 ATM이 있는 낮·해변 휴식 중심 구역입니다.',
      en: 'Featuring pristine Khem Beach, luxury resorts (JW Marriott, Premier Residences, New World), water sports, and verified ATM access.',
      zh: '汇集凯姆白沙海滩、知名度假酒店（万豪、雅高、新世界）、水上运动及ATM服务的海滨度假区。',
      ru: 'Пляж Кхем, курорты высшего класса (JW Marriott, Premier Residences, New World), водные активности и банкомат.',
      ja: 'ケムビーチ、3大リゾート（JWマリオット・プレミア・ニューワールド）、マリンレジャーやATMが揃う昼の海辺リゾートエリアです。',
      hi: 'बाय खेम बीच, शीर्ष रिसॉर्ट्स (JW मैरियट, प्रीमियर, न्यू वर्ल्ड), वाटर स्पोर्ट्स और एटीएम वाला दिन का प्रमुख समुद्र तट क्षेत्र।',
      vi: 'Bãi Khem cát trắng, các resort đẳng cấp (JW Marriott, Premier Residences, New World), thể thao biển và ATM tiện lợi.',
    },
    overview: {
      ko: '켐비치는 백사장과 해변 휴식 시설, 리조트가 있는 낮·해변 휴식 중심 구역입니다.',
      en: 'Khem Beach is an idyllic daytime coastal sanctuary featuring serene white sands, oceanfront dining, and world-class luxury stays.',
      zh: '凯姆海滩是一处宁静纯美的海滨度假胜地，拥有细腻白沙滩与世界一流的高端度假酒店。',
      ru: 'Пляж Кхем — это идеальное место для дневного релакса с нетронутым белоснежным берегом и престижными курортами.',
      ja: 'ケムビーチは、澄み切った海とパウダーサンドの砂浜、洗練されたリゾートが集まる昼のバカンス地です。',
      hi: 'खेम बीच सफेद रेत, समुद्र तटीय विश्राम और लक्जरी रिसॉर्ट्स वाला दिन का एक शांत समुद्र तटीय स्थल है।',
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
      zh: '前往凯姆海滩专页 →',
      ru: 'Перейти к пляжу Кхем →',
      ja: 'ケムビーチの詳細へ →',
      hi: 'खेम बीच देखें →',
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
          zh: '凯姆天然白沙海滩 (Bãi Khem Beach)',
          ru: 'Пляж Бай Кхем (Bãi Khem Beach)',
          ja: 'バイケムビーチ (Bãi Khem Beach)',
          hi: 'बाय खेम समुद्र तट (Bãi Khem Beach)',
          vi: 'Bãi Khem (Bãi Khem Beach)',
        },
        description: {
          ko: '천연 모래 백사장과 해변',
          en: 'Pristine natural white sand cove and calm turquoise waters',
          zh: '水清沙白、弧度优美的天然白沙海滩',
          ru: 'Естественный белый песчаный берег и прозрачная лазурная вода',
          ja: '天然のきめ細やかな白砂が広がる穏やかな遠浅ビーチ',
          hi: 'प्राकृतिक सफेद रेत और शांत फ़िरोज़ा पानी',
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
          en: 'Whimsical Bill Bensley-designed luxury beachfront resort',
          zh: '比尔·本斯利倾心设计的学院风传奇海滨度假酒店',
          ru: 'Легендарный 5-звездочный курорт по проекту Билла Бенсли',
          ja: 'ビル・ベンズリー設計による個性豊かな名門ビーチリゾート',
          hi: 'बिल बेंसले द्वारा डिजाइन किया गया लक्जरी रिसॉर्ट',
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
          en: 'Vibrant family and couple resort managed by Accor',
          zh: '雅高集团管理的现代活力海滨度假酒店与公寓',
          ru: 'Семейный курорт с просторными апартаментами под управлением Accor',
          ja: 'アコー運営の広大な多段プールを持つ快適アパートメントホテル',
          hi: 'एकोर द्वारा प्रबंधित आधुनिक समुद्र तटीय होटल और अपार्टमेंट',
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
          en: 'All-villa beachfront sanctuary reflecting traditional fishing village charm',
          zh: '融入越南传统渔村灵感的高端全别墅海滨度假胜地',
          ru: 'Курорт с приватными виллами в стиле традиционной вьетнамской деревни',
          ja: 'ベトナムの伝統的漁村をモチーフにした全室ヴィラ型リゾート',
          hi: 'पारंपरिक डिजाइन से प्रेरित लक्जरी विला समुद्र तटीय रिसॉर्ट',
          vi: 'Khu nghỉ dưỡng toàn biệt thự mang cảm hứng làng chài truyền thống',
        },
        tag: { ko: '리조트', en: 'Resort', zh: '度假村', ru: 'Курорт', ja: 'リゾート', hi: 'रिसॉर्ट', vi: 'Khu nghỉ dưỡng' },
      },
    ],
    categories: [
      { icon: '🍽️', name: { ko: '식당', en: 'Dining', zh: '餐饮', ru: 'Рестораны', ja: 'グルメ', hi: 'भोजन', vi: 'Ẩm thực' }, count: 6, categoryKey: 'dining' },
      { icon: '🍹', name: { ko: '카페 & 바', en: 'Cafe & Bars', zh: '咖啡馆与酒吧', ru: 'Кафе и бары', ja: 'カフェ＆バー', hi: 'कैफ़े और बार', vi: 'Quán cà phê & Bar' }, count: 3, categoryKey: 'bars' },
      { icon: '🏨', name: { ko: '호텔', en: 'Hotels', zh: '酒店', ru: 'Отели', ja: 'ホテル', hi: 'होटल', vi: 'Khách sạn' }, count: 6, categoryKey: 'hotels' },
      { icon: '🛍️', name: { ko: '쇼핑', en: 'Shopping', zh: '购物', ru: 'Шопинг', ja: 'ショッピング', hi: 'खरीदारी', vi: 'Mua sắm' }, count: 0, categoryKey: 'shopping' },
      { icon: '✦', name: { ko: '스파', en: 'Spa', zh: '水疗', ru: 'Спа', ja: 'スパ', hi: 'स्पा', vi: 'Spa & Wellness' }, count: 3, categoryKey: 'wellness' },
      { icon: '🎡', name: { ko: '액티비티', en: 'Activities', zh: '活动与体验', ru: 'Активности', ja: 'アクティビティ', hi: 'गतिविधियाँ', vi: 'Điểm tham quan & Hoạt động' }, count: 1, categoryKey: 'activities' },
      { icon: '🏖️', name: { ko: '해변', en: 'Beach', zh: '海滩', ru: 'Пляж', ja: 'ビーチ', hi: 'समुद्र तट', vi: 'Bãi biển' }, count: 1, categoryKey: 'beaches' },
      { icon: '🏦', name: { ko: '환전·ATM·은행', en: 'Currency & ATM', zh: '兑换与ATM', ru: 'Обмен и банкоматы', ja: '両替・ATM・銀行', hi: 'मुद्रा विनिमय व एटीएम', vi: 'Đổi tiền & ATM' }, count: 1, categoryKey: 'banking' },
      { icon: '🧭', name: { ko: '생활편의', en: 'Essentials', zh: '便民设施', ru: 'Полезные сервисы', ja: '生活便利', hi: 'आवश्यक सेवाएँ', vi: 'Tiện ích' }, count: 0, categoryKey: 'essentials' },
      { icon: '🚖', name: { ko: '이동·교통', en: 'Transport', zh: '交通出行', ru: 'Транспорт', ja: '交通・アクセス', hi: 'यातायात', vi: 'Di chuyển' }, count: 1, categoryKey: 'transport' },
    ],
    categoryBadge: {
      ko: '조사 확인된 업체 수치',
      en: 'Verified Surveyed Venues',
      zh: '实地与官网核实商户',
      ru: 'Проверенные заведения',
      ja: '実地・公式確認済み店舗数',
      hi: 'सत्यापित स्थानों की संख्या',
      vi: 'Số lượng đã xác minh thực tế',
    },
    noteBanner: {
      ko: '💡 리조트 다이닝 안내: 이용 가능 여부와 예약 조건은 업장마다 다를 수 있어, 방문 전 문의를 추천합니다.',
      en: '💡 Resort Dining Note: Availability and booking policies for outside guests vary by property; advance inquiry is recommended.',
      zh: '💡 度假区用餐提示：各餐厅对非住客的接待政策和预约要求有所不同，建议前往前致电咨询。',
      ru: '💡 Примечание о ресторанах: Правила посещения для гостей, не проживающих в отеле, могут различаться. Рекомендуем уточнять заранее.',
      ja: '💡 リゾートレストランのご案内：外来利用の可否や予約条件は施設により異なるため、事前確認をおすすめします。',
      hi: '💡 रिसॉर्ट डाइनिंग नोट: बाहर के मेहमानों के लिए नियम भिन्न हो सकते हैं; पहले से पूछताछ की सलाह दी जाती है।',
      vi: '💡 Lưu ý ẩm thực resort: Quy định phục vụ khách không lưu trú có thể khác nhau tùy cơ sở, khuyến khích liên hệ trước.',
    },
    transitHeadline: {
      ko: '⇄ 선셋타운(Sunset Town) 이동 안내',
      en: '⇄ Transit to Sunset Town',
      zh: '⇄ 前往日落小镇 (Sunset Town) 交通指引',
      ru: '⇄ Как добраться до Сансет-Тауна',
      ja: '⇄ サンセットタウン (Sunset Town) へのアクセス案内',
      hi: '⇄ सनसेट टाउन जाने का रास्ता',
      vi: '⇄ Hướng dẫn di chuyển về Thị trấn Hoàng Hôn',
    },
    transitDescription: {
      ko: '이동 수단: 택시 또는 그랩(지역·시간대에 따라 호출이 어려울 수 있음) · 차량 약 10분 소요',
      en: 'Transport: Taxi or Grab (availability may vary by time and location) · approx. 10 mins by car',
      zh: '交通方式：出租车或 Grab 网约车（高峰期叫车可能需要稍作等待） · 车程约 10 分钟',
      ru: 'Транспорт: Такси или Grab (доступность зависит от времени суток) · около 10 минут на машине',
      ja: '交通手段：タクシーまたはGrab（時間帯や場所により手配に時間がかかる場合があります） · 車で約10分',
      hi: 'परिवहन: टैक्सी या ग्रैब (समय अनुसार उपलब्धता भिन्न हो सकती है) · कार से लगभग 10 मिनट',
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
    en: 'Travel between both hubs: approx. 10 mins by car',
    zh: '两区相距仅约 10 分钟车程',
    ru: 'Поездка между районами занимает около 10 минут',
    ja: '両エリア間の移動：車で約10分',
    hi: 'दोनों केंद्रों के बीच यात्रा: कार से लगभग 10 मिनट',
    vi: 'Khoảng cách giữa hai khu vực: khoảng 10 phút đi xe',
  },
  description: {
    ko: '이동 수단: 택시 또는 그랩(지역·시간대에 따라 호출이 어려울 수 있음) · 차량 약 10분 소요',
    en: 'Transport: Taxi or Grab (availability may vary by time and location) · approx. 10 mins by car',
    zh: '交通方式：出租车或 Grab 网约车（高峰期叫车可能需要稍作等待） · 车程约 10 分钟',
    ru: 'Транспорт: Такси или Grab (доступность зависит от времени суток) · около 10 минут на машине',
    ja: '交通手段：タクシーまたはGrab（時間帯や場所により手配に時間がかかる場合があります） · 車で約10分',
    hi: 'परिवहन: टैक्सी या ग्रैब (समय अनुसार उपलब्धता भिन्न हो सकती है) · कार से लगभग 10 मिनट',
    vi: 'Phương tiện: Taxi hoặc Grab (tùy thời điểm và khu vực) · khoảng 10 phút đi xe',
  },
  badge: {
    ko: '택시 또는 그랩 (차량 약 10분)',
    en: 'Taxi or Grab (~10 mins)',
    zh: '出租车 / Grab (约10分钟)',
    ru: 'Такси или Grab (~10 мин)',
    ja: 'タクシー / Grab (車で約10分)',
    hi: 'टैक्सी या ग्रैब (~10 मिनट)',
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
