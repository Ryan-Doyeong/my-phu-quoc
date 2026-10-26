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
      en: 'Must-See Night Event',
      vi: 'Sự kiện đêm không thể bỏ qua',
      hi: 'अनिवार्य रात्रि कार्यक्रम',
      zh: '必看夜间大秀',
      ru: 'Главное вечернее шоу',
      ko: '야간 필수 관람 1위',
      ja: '夜の必見イベント',
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
      en: ['Vortex water screen, laser & fire effects', 'Nightly fireworks grand finale (~21:25 Wed–Mon; Tue dark)', 'Free Kiss Bridge entry on select combo packages'],
      vi: ['Màn hình nước Vortex, laser và hiệu ứng lửa', 'Pháo hoa rực rỡ lúc ~21:25 thứ 4 đến thứ 2 (Thứ 3 nghỉ)', 'Tặng vé Cầu Hôn khi mua gói combo'],
      hi: ['जल स्क्रीन, लेज़र और अग्नि प्रभाव', 'बुध-सोम रात ~21:25 बजे आतिशबाजी (मंगलवार अवकाश)', 'चुनिंदा कॉम्बो पर किस ब्रिज में मुफ़्त प्रवेश'],
      zh: ['水幕、激光与火焰巨型多媒体特效', '周三至周一晚约21:25绚丽烟花压轴（逢周二休演）', '指定套票赠送日落之桥门票'],
      ru: ['Водный экран Vortex, лазерные и огненные эффекты', 'Салют в финале в ~21:25 (Ср–Пн; Вт — выходной)', 'Вход на «Мост поцелуев» в некоторых комбо'],
      ko: ['초대형 워터스크린, 레이저 및 화염 멀티미디어 쇼', '수~월 21:00 공연 및 21:25 피날레 불꽃놀이 (화요일 정기 휴무)', '패키지 선택 시 키스 브릿지 무료 연계 입장 혜택'],
      ja: ['巨大ウォータースクリーン、レーザー＆火炎ショー', '水〜月 21:00開演＆21:25フィナーレ花火（火曜休演）', '一部コンボチケットでキスブリッジ入場無料'],
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
      en: "Longest 3-Rope Cable Car (Guinness)",
      vi: 'Cáp treo 3 dây dài nhất thế giới (Guinness)',
      hi: 'गिनीज रिकॉर्ड सबसे लंबी 3-रोप केबल कार',
      zh: '吉尼斯纪录最长三线跨海缆车',
      ru: 'Самая длинная 3-канатная дорога (Гиннесс)',
      ko: '기네스 등재 최장 3선식 해상 케이블카',
      ja: 'ギネス記録最長3線式ロープウェイ',
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
      en: ['7,899.9m Guinness record longest 3-rope ocean cable car', 'Aquatopia Water Park with 20+ slides', 'Optional Mango Restaurant lunch buffet'],
      vi: ['Cáp treo 3 dây vượt biển 7.899,9m kỷ lục Guinness', 'Công viên nước Aquatopia với hơn 20 trò chơi', 'Lựa chọn thêm buffet trưa tại nhà hàng Mango'],
      hi: ['7,899.9 मीटर गिनीज रिकॉर्ड सबसे लंबी 3-रोप केबल कार', '20+ स्लाइडों के साथ एक्वाटोपिया वाटर पार्क', 'मैंगो रेस्तरां लंच बुफे का विकल्प'],
      zh: ['全长7899.9米吉尼斯世界纪录最长三线跨海缆车', '拥有20多项高科技滑道的水上乐园', '可选包含芒果餐厅丰盛自助午餐'],
      ru: ['7899,9 м — рекорд Гиннесса: длиннейшая 3-канатная дорога над морем', 'Аквапарк Aquatopia с более чем 20 горками', 'Опционально: обеденный шведский стол в Mango'],
      ko: ['7,899.9m 기네스북 공인 세계 최장 3선식 논스톱 해상 케이블카', '20개 이상의 테마 슬라이드를 갖춘 아쿠아토피아 워터파크', '망고 레스토랑 프리미엄 런치 뷔페 옵션 선택 가능'],
      ja: ['7,899.9mギネス世界記録最長3線式海上ロープウェイ', '20以上のスライダーが楽しめるアクアトピア', 'マンゴーレストランのランチビュッフェ追加可能'],
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
      en: 'Top Sunset Photo Spot',
      vi: 'Điểm check-in hoàng hôn số 1',
      hi: 'सर्वश्रेष्ठ सूर्यास्त फोटो स्पॉट',
      zh: '日落拍照绝佳地标',
      ru: 'Лучшая фотолокация на закате',
      ko: '푸꾸옥 노을 명소',
      ja: '夕日と絶景のフォトスポット',
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
      en: ['Iconic twin bridge architecture designed by Marco Casamonti', '50cm dramatic gap where sunset aligns between the spans', 'Romantic sea walkway with Sunset Town skyline views'],
      vi: ['Kiến trúc độc đáo do kiến trúc sư Marco Casamonti thiết kế', 'Khoảng cách 50cm nơi hoàng hôn rơi đúng giữa hai đầu cầu', 'Đường đi dạo lãng mạn trên biển ngắm nhìn toàn cảnh thị trấn'],
      hi: ['मार्को कैसा मोंटी द्वारा डिज़ाइन किया गया प्रतिष्ठित पुल', '50 सेमी का अंतर जहां सूर्यास्त दोनों सिरों के बीच संरेखित होता है', 'सनसेट टाउन दृश्यों के साथ रोमांटिक वॉकवे'],
      zh: ['意大利著名建筑大师设计，两桥相距50公分的唯美设计', '每年夕阳落入两端桥缝间的震撼日落奇观', '漫步海面绝佳全景观景漫步道'],
      ru: ['Знаковая архитектура от Марко Казамонти с зазором в 50 см', 'Солнце садится прямо между двумя пролетами моста', 'Романтическая морская прогулочная зона с видом на город'],
      ko: ['이탈리아 건축가 마르코 카사몬티의 50cm 간격 예술 건축물', '두 다리 틈 사이로 석양이 떨어지는 일몰 포인트', '선셋타운 스카이라인과 바다를 360도로 조망하는 보행교'],
      ja: ['建築家マルコ・カサモンティ設計の象徴的なツインブリッジ', '夕日が2つの橋の隙間に美しく沈む絶景ビュー', 'サンセットタウンを見渡すロマンチックな海上遊歩道'],
    },
    tips: {
      en: 'Tip: Golden hour (17:00 - 17:45) is the best time for photography.',
      vi: 'Mẹo: Khoảng thời gian từ 17:00 đến 17:45 là lúc hoàng hôn đẹp nhất để chụp ảnh.',
      hi: 'सुझाव: फोटोग्राफी के लिए शाम 17:00 से 17:45 का समय सबसे अच्छा है।',
      zh: '小贴士：傍晚 17:00 ~ 17:45 是光线最柔和美丽的黄金摄影时段。',
      ru: 'Совет: лучшее время для фото — «золотой час» с 17:00 до 17:45.',
      ko: '이용 안내: 일몰 골든아워(17:00~17:45)에 방문하시면 노을 사진을 촬영하기 좋습니다.',
      ja: 'ヒント：17:00〜17:45のゴールデンアワーが写真撮影に最適です。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/108398-kiss-bridge-sunset-town-phu-quoc/?aid=MYPHUQUOC',
    officialUrl: 'https://sunsettown.com.vn',
    imageUrl: '/tickets/kiss-bridge.webp',
  },
  {
    id: 'south-all-in-one-combo',
    name: {
      en: 'South Phu Quoc All-in-One Super Pass',
      vi: 'Combo Siêu Tiết Kiệm Nam Đảo Phú Quốc',
      hi: 'दक्षिण फू क्वोक ऑल-इन-वन सुपर पास',
      zh: '富国岛南部一日全景通票',
      ru: 'Супер-комбо: Южный Фукуок всё включено',
      ko: '남부 푸꾸옥 올인원 슈퍼 콤보 (추천 1위)',
      ja: 'フーコック南部 オールインワンスーパーパス',
    },
    badge: {
      en: 'Best Value Bundle',
      vi: 'Gói tiết kiệm nhất',
      hi: 'सर्वोत्तम मूल्य बंडल',
      zh: '超高性价比全包套餐',
      ru: 'Максимальная выгода',
      ko: '가장 인기 있는 가성비 1위',
      ja: '一番お得な人気パッケージ',
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
      en: ['Hon Thom Return Cable Car + Water Park', 'Kiss of the Sea Show standard seat', 'Kiss Bridge sunset access included'],
      vi: ['Cáp treo khứ hồi Hòn Thơm + Công viên nước', 'Vé xem show Nụ Hôn Của Biển Cả', 'Bao gồm vé lên Cầu Hôn ngắm hoàng hôn'],
      hi: ['हॉन थोम केबल कार + वाटर पार्क', 'किस ऑफ़ द सी शो मानक सीट', 'किस ब्रिज सूर्यास्त प्रवेश शामिल'],
      zh: ['香岛跨海往返缆车 + 水上乐园门票', '海洋之吻多媒体灯光秀观赏座席', '包含亲吻桥日落观景漫步门票'],
      ru: ['Канатная дорога Хон Тхом туда-обратно + Аквапарк', 'Билет на вечернее шоу «Поцелуй моря»', 'Вход на «Мост поцелуев» на закате'],
      ko: ['혼똔섬 왕복 케이블카 + 아쿠아토피아 워터파크', '키스 오브 더 씨 멀티미디어 쇼 좌석', '키스 브릿지 일몰 워크웨이 입장권 일체 포함'],
      ja: ['ホントム往復ロープウェイ＋ウォーターパーク', 'キス・オブ・ザ・シー ショー観覧席', 'キスブリッジ サンセット入場券付き'],
    },
    tips: {
      en: 'Tip: Perfect 1-day itinerary: Hon Thom in morning/afternoon, Kiss Bridge at sunset, show at night.',
      vi: 'Mẹo: Lịch trình 1 ngày hoàn hảo: sáng đi Hòn Thơm, chiều ngắm hoàng hôn Cầu Hôn, tối xem show.',
      hi: 'सुझाव: उत्तम 1-दिवसीय यात्रा कार्यक्रम: सुबह हॉन थोम, शाम को किस ब्रिज, रात में शो।',
      zh: '小贴士：完美一日游动线：上午香岛玩水，傍晚亲吻桥看日落，夜间看烟花大秀。',
      ru: 'Совет: идеальный маршрут на день: Хон Тхом днем, Мост на закате, шоу вечером.',
      ko: '이용 팁: 오전/낮에는 혼똔섬 방문, 해질녘엔 키스브릿지 산책, 저녁엔 불꽃쇼 관람 코스 연계가 가능합니다.',
      ja: 'ヒント：昼はホントムで遊び、夕方はキスブリッジ、夜は花火ショーの完璧な1日コース。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/69602-phu-quoc-play-and-stay-travel-pass/?aid=MYPHUQUOC',
    officialUrl: 'https://honthom.sunworld.vn',
    imageUrl: '/tickets/south-all-in-one-combo.webp',
  },
]
