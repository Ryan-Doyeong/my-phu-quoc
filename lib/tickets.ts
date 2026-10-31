import type { Locale } from '@/lib/i18n/config'

export interface TicketItem {
  id: string
  name: Record<Locale, string>
  badge: Record<Locale, string>
  klookPrice: {
    krw: string
    vnd: string
  }
  officialPrice: {
    krw: string
    vnd: string
  }
  discount: string
  features: Record<Locale, string[]>
  tips: Record<Locale, string>
  klookUrl: string
  officialUrl: string
  imageUrl: string
}

export const SUNSET_TOWN_TICKETS: TicketItem[] = [
  {
    id: 'kiss-of-the-sea',
    name: {
      en: 'Kiss of the Sea Show & Fireworks',
      vi: 'Show Nụ Hôn Của Biển Cả & Pháo Hoa',
      hi: 'किस ऑफ़ द सी शो और आतिशबाज़ी',
      zh: '海洋之吻多媒体灯光烟花秀',
      ru: 'Шоу «Поцелуй моря» и фейерверки',
      ko: '키스 오브 더 씨 멀티미디어 쇼 & 불꽃놀이',
      ja: 'キス・オブ・ザ・シー ショー＆花火',
    },
    badge: {
      en: 'Night Multimedia Show',
      vi: 'Show diễn đa phương tiện trên biển',
      hi: 'रात्रि मल्टीमीडिया शो',
      zh: '夜间多媒体大秀',
      ru: 'Вечернее мультимедийное шоу',
      ko: '야간 해상 멀티미디어 쇼',
      ja: '夜間マルチメディアショー',
    },
    klookPrice: {
      krw: '37,000원~',
      vnd: '700,000 VND~',
    },
    officialPrice: {
      krw: '54,000원',
      vnd: '1,000,000 VND',
    },
    discount: 'Special Online Rate',
    features: {
      en: ['Outdoor ocean stage multimedia performance', 'Nightly fireworks grand finale (~21:25 Wed–Mon; Tue dark)', 'Free Kiss Bridge entry on select combo packages'],
      vi: ['Biểu diễn đa phương tiện trên sân khấu biển', 'Pháo hoa rực rỡ lúc ~21:25 thứ 4 đến thứ 2 (Thứ 3 nghỉ)', 'Tặng vé Cầu Hôn khi mua gói combo'],
      hi: ['समुद्री मंच पर मल्टीमीडिया प्रदर्शन', 'बुध-सोम रात ~21:25 बजे आतिशबाजी (मंगलवार अवकाश)', 'चुनिंदा कॉम्बो पर किस ब्रिज में मुफ़्त प्रवेश'],
      zh: ['海上实景多媒体大秀', '周三至周一晚约21:25绚丽烟花压轴（逢周二休演）', '指定套票赠送日落之桥门票'],
      ru: ['Мультимедийное представление на морской сцене', 'Салют в финале в ~21:25 (Ср–Пн; Вт — выходной)', 'Вход на «Мост поцелуев» в некоторых комбо'],
      ko: ['해상 무대 멀티미디어 공연', '수~월 21:00 공연 및 21:25 피날레 불꽃놀이 (화요일 정기 휴무)', '패키지 선택 시 키스 브릿지 무료 연계 입장 혜택'],
      ja: ['海上マルチメディア公演', '水〜月 21:00開演＆21:25フィナーレ花火（火曜休演）', '一部コンボチケットでキスブリッジ入場無料'],
    },
    tips: {
      en: 'Tip: Show runs Wed–Mon at 21:00 (closed Tuesdays). Book the ticket that includes Kiss Bridge access to save an extra entry fee.',
      vi: 'Mẹo: Show diễn từ Thứ 4 đến Thứ 2 lúc 21:00 (Thứ 3 nghỉ). Nên chọn gói vé có kèm lối vào Cầu Hôn.',
      hi: 'सुझाव: शो बुध-सोम 21:00 बजे होता है (मंगलवार अवकाश)। किस ब्रिज पहुंच वाला टिकट चुनकर बचत करें।',
      zh: '小贴士：演出每周三至周一 21:00 上演（周二休演）。建议选择含亲吻桥门票的套票更划算。',
      ru: 'Совет: шоу идет со среды по понедельник в 21:00 (вт — выходной). Берите билет с проходом на Мост.',
      ko: '이용 안내: 매주 수~월 21:00 공연(화요일 정기 휴무). 키스 브릿지 입장 혜택이 포함된 콤보 옵션을 선택하시면 더욱 경제적입니다.',
      ja: 'ヒント：水曜〜月曜 21:00開演（火曜休演）。キスブリッジ入場が含まれるチケットを選ぶとお得です。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/108397-kiss-of-the-sea-show-phu-quoc/?aid=MYPHUQUOC',
    officialUrl: 'https://ticket.kissofthesea.com.vn',
    imageUrl: '/tickets/kiss-of-the-sea.webp',
  },
  {
    id: 'hon-thom-cable-car',
    name: {
      en: 'Sun World Hon Thom Cable Car & Water Park',
      vi: 'Cáp treo Hòn Thơm & Công viên nước Aquatopia',
      hi: 'सन वर्ल्ड हॉन थोम केबल कार और वाटर पार्क',
      zh: '太阳世界香岛跨海缆车与水上乐园',
      ru: 'Канатная дорога Хон Тхом и аквапарк',
      ko: '썬월드 혼똔섬 해상 케이블카 & 아쿠아토피아',
      ja: 'サンワールド・ホントム 海上ケーブルカー＆水上パーク',
    },
    badge: {
      en: '3-Rope Ocean Cable Car (7,899m)',
      vi: 'Cáp treo 3 dây vượt biển (7.899m)',
      hi: '3-रोप समुद्री केबल कार (7,899m)',
      zh: '7899米三线跨海缆车',
      ru: '3-канатная дорога над морем (7 899 м)',
      ko: '7,899m 3선식 해상 케이블카',
      ja: '7,899m 3線式海上ロープウェイ',
    },
    klookPrice: {
      krw: '35,000원~',
      vnd: '650,000 VND~',
    },
    officialPrice: {
      krw: '46,000원',
      vnd: '850,000 VND',
    },
    discount: 'Special Online Rate',
    features: {
      en: ['7,899m 3-rope ocean cable car linking to Hon Thom', 'Aquatopia Water Park with 20+ slides', 'Optional Mango Restaurant lunch buffet'],
      vi: ['Cáp treo 3 dây vượt biển 7.899,9m nối Hòn Thơm', 'Công viên nước Aquatopia với hơn 20 trò chơi', 'Lựa chọn thêm buffet trưa tại nhà hàng Mango'],
      hi: ['7,899 मीटर 3-रोप समुद्री केबल कार', '20+ स्लाइडों के साथ एक्वाटोपिया वाटर पार्क', 'मैंगो रेस्तरां लंच बुफे का विकल्प'],
      zh: ['全长7899米三线跨海缆车直达香岛', '拥有20多项高科技滑道的水上乐园', '可选包含芒果餐厅丰盛自助午餐'],
      ru: ['7899 м — 3-канатная дорога над морем на остров Хон Тхом', 'Аквапарк Aquatopia с более чем 20 горками', 'Опционально: обеденный шведский стол в Mango'],
      ko: ['7,899m 3선식 논스톱 해상 케이블카', '20개 이상의 테마 슬라이드를 갖춘 아쿠아토피아 워터파크', '망고 레스토랑 프리미엄 런치 뷔페 옵션 선택 가능'],
      ja: ['7,899m 3線式海上ロープウェイ', '20以上のスライダーが楽しめるアクアトピア', 'マンゴーレストランのランチビュッフェ追加可能'],
    },
    tips: {
      en: 'Tip: Check cable car lunch maintenance break times before planning your return ride.',
      vi: 'Mẹo: Kiểm tra giờ nghỉ trưa của cáp treo để sắp xếp thời gian quay về hợp lý.',
      hi: 'सुझाव: अपनी वापसी की योजना बनाने से पहले केबल कार के दोपहर के ब्रेक के समय की जांच करें।',
      zh: '小贴士：缆车午间有检修暂停时段，请提前确认返程发车时间表。',
      ru: 'Совет: уточняйте дневной перерыв в работе канатной дороги перед возвращением.',
      ko: '이용 안내: 케이블카는 오후 중간 점검/브레이크 타임이 있으므로 운행 시간표를 확인 후 일정을 잡으세요.',
      ja: 'ヒント：ケーブルカーにはお昼の運休日時があるため、事前運行表の確認をおすすめします。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/23196-island-hopping-tour-cable-car-experience-phu-quoc/?aid=MYPHUQUOC',
    officialUrl: 'https://honthom.sunworld.vn',
    imageUrl: '/tickets/hon-thom-cable-car.webp',
  },
  {
    id: 'kiss-bridge',
    name: {
      en: 'Kiss Bridge (Cau Hon)',
      vi: 'Cầu Hôn (Kiss Bridge)',
      hi: 'किस ब्रिज (काऊ होन)',
      zh: '亲吻桥 (Kiss Bridge)',
      ru: '«Мост поцелуев» (Kiss Bridge)',
      ko: '키스 브릿지 (Cầu Hôn)',
      ja: 'キスブリッジ (Kiss Bridge)',
    },
    badge: {
      en: 'Sunset Photo Walkway',
      vi: 'Cầu đi bộ ngắm hoàng hôn',
      hi: 'सूर्यास्त फोटो वॉकवे',
      zh: '落日观景步道',
      ru: 'Морская прогулочная зона на закате',
      ko: '푸꾸옥 노을 보행교',
      ja: '夕日の海上遊歩道',
    },
    klookPrice: {
      krw: '5,000원~',
      vnd: '100,000 VND',
    },
    officialPrice: {
      krw: '11,000원',
      vnd: '200,000 VND',
    },
    discount: 'Special',
    features: {
      en: ['Iconic twin bridge architecture designed by Marco Casamonti', 'Twin spans meeting over the sea with sunset views', 'Sea walkway with Sunset Town skyline views'],
      vi: ['Kiến trúc độc đáo do kiến trúc sư Marco Casamonti thiết kế', 'Hai nhánh cầu hướng về nhau trên biển đón hoàng hôn', 'Đường đi dạo trên biển ngắm nhìn toàn cảnh thị trấn'],
      hi: ['मार्को कैसा मोंटी द्वारा डिज़ाइन किया गया पुल', 'समुद्र के ऊपर मिलते दो पैदल स्पैन और सूर्यास्त दृश्य', 'सनसेट टाउन दृश्यों के साथ वॉकवे'],
      zh: ['意大利建筑师设计的海上步行景观桥', '两桥相向延伸的海上日落观景空间', '漫步海面全景观景漫步道'],
      ru: ['Архитектура от Марко Казамонти над морем', 'Два пролета навстречу друг другу с видом на закат', 'Морская прогулочная зона с видом на город'],
      ko: ['이탈리아 건축가 마르코 카사몬티 설계 보행교', '바다 위에서 서로 마주보는 두 개의 다리 구조', '선셋타운 스카이라인과 바다를 조망하는 보행교'],
      ja: ['建築家マルコ・カサモンティ設計のツインブリッジ', '海上で向かい合う2つの橋から夕日を鑑賞', 'サンセットタウンを見渡す海上遊歩道'],
    },
    tips: {
      en: 'Tip: Sunset hours offer scenic views and photography opportunities.',
      vi: 'Mẹo: Khoảng thời gian hoàng hôn là lúc thích hợp để ngắm cảnh và chụp ảnh.',
      hi: 'सुझाव: सूर्यास्त का समय दृश्यों और फोटोग्राफी के लिए उपयुक्त है।',
      zh: '小贴士：傍晚日落时段适合观景与拍照。',
      ru: 'Совет: время заката подходит для прогулок и фотографий.',
      ko: '이용 안내: 일몰 시간대에 방문하시면 노을 풍경을 조망하며 사진을 촬영하기 좋습니다.',
      ja: 'ヒント：夕日の時間帯は景色の鑑賞や写真撮影に適しています。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/108398-kiss-bridge-sunset-town-phu-quoc/?aid=MYPHUQUOC',
    officialUrl: 'https://sunsettown.com.vn',
    imageUrl: '/tickets/kiss-bridge.webp',
  },
  {
    id: 'south-all-in-one-combo',
    name: {
      en: 'South Phu Quoc All-in-One Super Pass',
      vi: 'Combo Nam Đảo Phú Quốc',
      hi: 'दक्षिण फू क्वोक ऑल-इन-वन पास',
      zh: '富国岛南部一日全景通票',
      ru: 'Комбо: Южный Фукуок всё включено',
      ko: '남부 푸꾸옥 올인원 콤보 패스',
      ja: 'フーコック南部 オールインワンパス',
    },
    badge: {
      en: 'All-in-One Combo Pass',
      vi: 'Gói combo trọn gói',
      hi: 'ऑल-इन-वन कॉम्बो पास',
      zh: '全景通票套餐',
      ru: 'Комбинированный билет',
      ko: '통합 콤보 패스',
      ja: 'オールインワンコンボ',
    },
    klookPrice: {
      krw: '68,000원~',
      vnd: '1,280,000 VND~',
    },
    officialPrice: {
      krw: '95,000원',
      vnd: '1,800,000 VND',
    },
    discount: 'Best Combo Rate',
    features: {
      en: ['Hon Thom Return Cable Car + Water Park', 'Kiss of the Sea Show standard admission', 'Kiss Bridge sunset access included'],
      vi: ['Cáp treo khứ hồi Hòn Thơm + Công viên nước', 'Vé xem show Nụ Hôn Của Biển Cả', 'Bao gồm vé lên Cầu Hôn ngắm hoàng hôn'],
      hi: ['हॉन थोम केबल कार + वाटर पार्क', 'किस ऑफ़ द सी शो मानक प्रवेश', 'किस ब्रिज सूर्यास्त प्रवेश शामिल'],
      zh: ['香岛跨海往返缆车 + 水上乐园门票', '海洋之吻多媒体演出观赏门票', '包含亲吻桥日落观景漫步门票'],
      ru: ['Канатная дорога Хон Тхом туда-обратно + Аквапарк', 'Билет на вечернее шоу «Поцелуй моря»', 'Вход на «Мост поцелуев» на закате'],
      ko: ['혼똔섬 왕복 케이블카 + 아쿠아토피아 워터파크', '키스 오브 더 씨 멀티미디어 쇼 관람권', '키스 브릿지 일몰 워크웨이 입장권 일체 포함'],
      ja: ['ホントム往復ロープウェイ＋ウォーターパーク', 'キス・オブ・ザ・シー ショー入場券', 'キスブリッジ サンセット入場券付き'],
    },
    tips: {
      en: 'Tip: Suggested 1-day itinerary: Hon Thom in daytime, Kiss Bridge at sunset, show at night.',
      vi: 'Mẹo: Lịch trình 1 ngày: ban ngày đi Hòn Thơm, chiều ngắm hoàng hôn Cầu Hôn, tối xem show.',
      hi: 'सुझाव: 1-दिवसीय यात्रा कार्यक्रम: दिन में हॉन थोम, शाम को किस ब्रिज, रात में शो।',
      zh: '小贴士：推荐一日游动线：日间香岛游玩，傍晚亲吻桥看日落，夜间看演出。',
      ru: 'Совет: маршрут на день: Хон Тхом днем, Мост на закате, шоу вечером.',
      ko: '이용 팁: 낮에는 혼똔섬 방문, 일몰 시간엔 키스브릿지 산책, 저녁엔 쇼 관람 코스 연계가 가능합니다.',
      ja: 'ヒント：日中はホントム、夕方はキスブリッジ、夜はショーの1日コース。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/69602-phu-quoc-play-and-stay-travel-pass/?aid=MYPHUQUOC',
    officialUrl: 'https://honthom.sunworld.vn',
    imageUrl: '/tickets/south-all-in-one-combo.webp',
  },
]
