import type { Locale } from '@/lib/i18n/config'
import { SHOW_SCHEDULES } from '@/lib/shows'

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
  priceLabel?: Record<Locale, string>
  gateLabel?: Record<Locale, string>
  discount: string
  features: Record<Locale, string[]>
  tips: Record<Locale, string>
  klookUrl: string | null
  klookCtaLabel?: Record<Locale, string>
  officialUrl: string
  officialCtaLabel?: Record<Locale, string>
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
      en: ['Outdoor ocean stage multimedia performance', 'Nightly fireworks grand finale (~21:25 Wed–Mon; Tue closed)', 'Combo option includes Kiss Bridge entry'],
      vi: ['Biểu diễn đa phương tiện trên sân khấu biển', 'Pháo hoa rực rỡ lúc ~21:25 thứ 4 đến thứ 2 (Thứ 3 nghỉ)', 'Tặng vé Cầu Hôn khi chọn gói combo'],
      hi: ['समुद्री मंच पर मल्टीमीडिया प्रदर्शन', 'बुध-सोम रात ~21:25 बजे आतिशबाजी (मंगलवार अवकाश)', 'चुनिंदा कॉम्बो पर किस ब्रिज में प्रवेश शामिल'],
      zh: ['海上实景多媒体大秀', '周三至周一晚约21:25绚丽烟花压轴（逢周二休演）', '指定套票包含亲吻桥门票'],
      ru: ['Мультимедийное представление на морской сцене', 'Салют в финале в ~21:25 (Ср–Пн; Вт — выходной)', 'Вход на «Мост поцелуев» в комбо-тарифах'],
      ko: ['해상 무대 멀티미디어 공연', '수~월 21:00 공연 및 21:25 피날레 불꽃놀이 (화요일 정기 휴무)', '콤보 패키지 선택 시 키스 브릿지 입장 포함'],
      ja: ['海上マルチメディア公演', '水〜月 21:00開演＆21:25フィナーレ花火（火曜休演）', 'コンボパッケージ選択でキスブリッジ入場付き'],
    },
    tips: {
      en: 'Tip: Show runs Wed–Mon at 21:00 (closed Tuesdays). Select the package option with Kiss Bridge access on the booking page.',
      vi: 'Mẹo: Show diễn từ Thứ 4 đến Thứ 2 lúc 21:00 (Thứ 3 nghỉ). Nên chọn gói vé có kèm lối vào Cầu Hôn.',
      hi: 'सुझाव: शो बुध-सोम 21:00 बजे होता है (मंगलवार अवकाश)। किस ब्रिज पहुंच वाला पैकेज चुनें।',
      zh: '小贴士：演出每周三至周一 21:00 上演（周二休演）。建议选择含亲吻桥门票的套餐。',
      ru: 'Совет: шоу идет со среды по понедельник в 21:00 (вт — выходной). Выбирайте пакет с проходом на Мост.',
      ko: '이용 안내: 매주 수~월 21:00 공연(화요일 정기 휴무). 예매 페이지에서 키스 브릿지 입장 포함 옵션을 선택할 수 있습니다.',
      ja: 'ヒント：水曜〜月曜 21:00開演（火曜休演）。予約ページでキスブリッジ入場付きオプションを選択できます。',
    },
    klookUrl: SHOW_SCHEDULES['kiss-of-the-sea'].klookUrl,
    officialUrl: SHOW_SCHEDULES['kiss-of-the-sea'].officialUrl,
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
      en: ['7,899.9m 3-rope ocean cable car linking to Hon Thom', 'Aquatopia Water Park & Exotica Village access', 'Optional Mango Restaurant lunch buffet package'],
      vi: ['Cáp treo 3 dây vượt biển 7.899,9m nối Hòn Thơm', 'Công viên nước Aquatopia & Làng Exotica', 'Lựa chọn thêm gói buffet trưa tại nhà hàng Mango'],
      hi: ['7,899.9 मीटर 3-रोप समुद्री केबल कार', 'एक्वाटोपिया वाटर पार्क और एक्सोटिका विलेज', 'मैंगो रेस्तरां लंच बुफे का विकल्प'],
      zh: ['全长7899.9米三线跨海缆车直达香岛', '包含 Aquatopia 水上乐园与 Exotica 主题村', '可选包含芒果餐厅自助午餐套餐'],
      ru: ['7899,9 м — 3-канатная дорога над морем на остров Хон Тхом', 'Аквапарк Aquatopia и деревня Exotica', 'Опционально: обеденный шведский стол в Mango'],
      ko: ['7,899.9m 3선식 논스톱 해상 케이블카 왕복', '아쿠아토피아 워터파크 및 엑조티카 빌리지 입장 포함', '망고 레스토랑 런치 뷔페 결합 옵션 선택 가능'],
      ja: ['7,899.9m 3線式海上ロープウェイ往復', 'アクアトピア・ウォーターパーク＆エキゾティカ村入場込み', 'マンゴーレストランのランチビュッフェ追加可能'],
    },
    tips: {
      en: 'Tip: Check cable car midday break times before planning your return ride (last return usually around 17:00).',
      vi: 'Mẹo: Kiểm tra giờ nghỉ trưa của cáp treo để sắp xếp thời gian quay về hợp lý (chuyến cuối thường khoảng 17:00).',
      hi: 'सुझाव: अपनी वापसी की योजना बनाने से पहले केबल कार के दोपहर के ब्रेक के समय की जांच करें।',
      zh: '小贴士：缆车午间有检修暂停时段，请提前确认返程发车时间表（末班通常在17:00左右）。',
      ru: 'Совет: уточняйте дневной перерыв в работе канатной дороги перед возвращением.',
      ko: '이용 안내: 케이블카는 낮 시간대 중간 점검(브레이크 타임)이 있으므로 현장 운행 시간표를 확인 후 탑승하세요.',
      ja: 'ヒント：ケーブルカーにはお昼の運休時間帯があるため、当日の運行表を事前にご確認ください。',
    },
    klookUrl: 'https://www.klook.com/en-US/destination/p60275095-sunworld-hon-thom-phu-quoc/?aid=MYPHUQUOC',
    officialUrl: 'https://booking.sunworld.vn',
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
      krw: '콤보 무료 포함',
      vnd: 'Included in Combo',
    },
    officialPrice: {
      krw: '50,000~100,000 VND (시간대별)',
      vnd: '50,000–100,000 VND (By Time Slot)',
    },
    priceLabel: {
      en: 'Show / Cable Car Combo',
      vi: 'Khi mua Combo Show / Cáp treo',
      hi: 'शो / केबल कार कॉम्बो लाभ',
      zh: '演出 / 缆车套票含入场',
      ru: 'В составе комбо (шоу / канатка)',
      ko: '쇼·케이블카 콤보 예매 시',
      ja: 'ショー・ケーブルカーコンボ特典',
    },
    gateLabel: {
      en: 'Standalone Ticket (Before 16:00 & After 19:00: 50k / 16:00–19:00 Sunset: 100k):',
      vi: 'Vé lẻ (Trước 16:00 & sau 19:00: 50k / 16:00–19:00 Hoàng hôn: 100k):',
      hi: 'एकल टिकट (16:00 से पहले: 50k / 16:00–19:00 सूर्यास्त: 100k):',
      zh: '单独门票（16:00前及19:00后 50k / 16:00–19:00 日落时段 100k）:',
      ru: 'Отдельный билет (до 16:00 и после 19:00: 50k / 16:00–19:00 закат: 100k):',
      ko: '단독 입장권 (16시 이전·19시 이후 50,000 / 16~19시 일몰 100,000 VND):',
      ja: '単独入場券（16時前・19時以降 50k / 16〜19時 日没 100k VND）:',
    },
    discount: 'Combo Benefit',
    features: {
      en: [
        'Time-slot admission: 50,000 VND (07:00–16:00 & 20:30–23:00) / 100,000 VND (16:00–19:00 Sunset Peak)',
        'Free admission for children under 1m tall',
        'Included free when booking Kiss of the Sea or Hon Thom Cable Car combos',
      ],
      vi: [
        'Giá vé theo khung giờ: 50.000 VND (07:00–16:00 & 20:30–23:00) / 100.000 VND (16:00–19:00 giờ hoàng hôn)',
        'Miễn phí cho trẻ em cao dưới 1m',
        'Miễn phí vé Cầu Hôn khi mua kèm gói combo Show hoặc Cáp treo Hòn Thơm',
      ],
      hi: [
        'समयानुसार शुल्क: 50,000 VND (07:00–16:00 व रात्रि) / 100,000 VND (16:00–19:00 सूर्यास्त समय)',
        '1 मीटर से कम ऊंचाई वाले बच्चों के लिए निःशुल्क प्रवेश',
        'किस ऑफ़ द सी या केबल कार कॉम्बो के साथ निःशुल्क प्रवेश',
      ],
      zh: [
        '分时段票价：07:00–16:00 及晚间 50,000 VND / 16:00–19:00 日落高峰 100,000 VND',
        '身高1米以下儿童免费入场',
        '预订海洋之吻演出或香岛缆车指定套票可免费入场',
      ],
      ru: [
        'Тариф по времени: 50 000 VND (07:00–16:00 и вечером) / 100 000 VND (16:00–19:00 на закате)',
        'Дети ростом до 1 м — бесплатно',
        'Бесплатный вход при покупке комбо с шоу или канатной дорогой',
      ],
      ko: [
        '시간대별 입장료: 주간(07:00~16:00)·야간 50,000 VND / 일몰 피크(16:00~19:00) 100,000 VND',
        '신장 1m 미만 어린이 무료 입장 (현장 매표소 및 선월드 공식 예매처 발권)',
        '키스 오브 더 씨 쇼 또는 혼똔섬 케이블카 콤보 예매 시 무료 입장 포함',
      ],
      ja: [
        '時間帯別料金：日中(07:00〜16:00)・夜間 50,000 VND / 日没ピーク(16:00〜19:00) 100,000 VND',
        '身長1m未満のお子様は入場無料（現地窓口・Sun World公式で発券）',
        'キス・オブ・ザ・シーまたはケーブルカーのコンボ予約で入場無料',
      ],
    },
    tips: {
      en: 'Note: Standalone Kiss Bridge tickets (50,000 VND daytime/night, 100,000 VND 16:00–19:00 sunset) are sold at the gate or Sun World site, or included in Klook show combos.',
      vi: 'Lưu ý: Vé lẻ Cầu Hôn (50.000 VND ban ngày/tối, 100.000 VND khung giờ hoàng hôn 16:00–19:00) mua tại quầy/Sun World hoặc miễn phí trong gói combo Show trên Klook.',
      hi: 'नोट: किस ब्रिज का एकल टिकट (दिन 50,000 VND / 16:00–19:00 सूर्यास्त 100,000 VND) प्रवेश बूथ पर खरीदें या Klook पर शो कॉम्बो चुनें।',
      zh: '提示：亲吻桥单独门票（16:00前 50,000 VND / 16:00–19:00 日落时段 100,000 VND）可在现场窗口或官网购买，或在 Klook 预订含亲吻桥的演出套票。',
      ru: 'Примечание: отдельные билеты (50 000 VND днем / 100 000 VND с 16:00 до 19:00) продаются в кассе и на сайте Sun World, либо входят в комбо с шоу на Klook.',
      ko: '안내: 단독 입장권은 시간대별로 상이하며(16시 이전·야간 50,000 VND / 16:00~19:00 일몰 시간대 100,000 VND), 현장 매표소·선월드 공식몰 또는 Klook 쇼 콤보 옵션으로 이용하실 수 있습니다.',
      ja: 'ご案内：単独入場券は時間帯別（16時前・夜間 50,000 VND / 16:00〜19:00 日没時間帯 100,000 VND）で現地窓口・Sun World公式にて購入可能、またはKlookのショーコンボに含まれます。',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/81479-kiss-the-star-show-ticket/?aid=MYPHUQUOC',
    klookCtaLabel: {
      en: 'View Show + Bridge Combo (Klook) →',
      vi: 'Xem Combo Show + Cầu Hôn (Klook) →',
      hi: 'शो + ब्रिज कॉम्बो देखें (Klook) →',
      zh: '查看演出+亲吻桥套票 (Klook) →',
      ru: 'Комбо Шоу + Мост (Klook) →',
      ko: '쇼+키스브릿지 콤보 보기 (Klook) →',
      ja: 'ショー＋橋コンボを見る (Klook) →',
    },
    officialUrl: 'https://booking.sunworld.vn',
    officialCtaLabel: {
      en: 'Sun World Booking',
      vi: 'Đặt vé Sun World',
      hi: 'सन वर्ल्ड बुकिंग',
      zh: '太阳世界官方预订',
      ru: 'Бронь Sun World',
      ko: '선월드 공식 예매',
      ja: 'Sun World公式予約',
    },
    imageUrl: '/tickets/kiss-bridge.webp',
  },
  {
    id: 'south-all-in-one-combo',
    name: {
      en: 'Sun World South Phu Quoc Combo Packages',
      vi: 'Gói Combo Sun World Nam Phú Quốc (Cáp Treo · Show · Cầu Hôn)',
      hi: 'सन वर्ल्ड साउथ फू क्वोक कॉम्बो पैकेज',
      zh: '太阳世界富国岛南部联票套餐（缆车 · 演出 · 亲吻桥）',
      ru: 'Комбо-пакеты Sun World Южный Фукуок',
      ko: '선월드 남부 콤보 패키지 (케이블카 · 쇼 · 키스브릿지)',
      ja: 'Sun World フーコック南部コンボパッケージ',
    },
    badge: {
      en: 'Multi-Attraction Combo',
      vi: 'Gói combo kết hợp',
      hi: 'मल्टी-आकर्षण कॉम्बो',
      zh: '多景点组合套票',
      ru: 'Комбинированный тариф',
      ko: '통합 콤보 옵션',
      ja: '複数アトラクションコンボ',
    },
    klookPrice: {
      krw: '옵션별 상이 (패키지 선택)',
      vnd: 'Varies by Package Option',
    },
    officialPrice: {
      krw: '단품 합산 대비 할인',
      vnd: 'Bundle Discount vs. Single Tickets',
    },
    priceLabel: {
      en: 'Package Selection',
      vi: 'Tùy chọn gói Combo',
      hi: 'पैकेज विकल्प',
      zh: '套餐选项',
      ru: 'Выбор пакета',
      ko: '패키지 옵션 선택',
      ja: 'パッケージ選択',
    },
    gateLabel: {
      en: 'Rate Condition:',
      vi: 'Điều kiện giá:',
      hi: 'मूल्य शर्त:',
      zh: '价格说明:',
      ru: 'Условия тарифа:',
      ko: '요금 조건:',
      ja: '料金条件:',
    },
    discount: 'Combo Options',
    features: {
      en: ['Select Cable Car + Lunch Buffet or Show + Kiss Bridge bundles', 'Direct QR code entry for each included Sun World attraction', 'Compare seasonal combo promotions on Sun World & Klook'],
      vi: ['Tùy chọn gói Cáp treo + Buffet hoặc Show Nụ Hôn Của Biển Cả + Cầu Hôn', 'Mã QR vào cửa trực tiếp cho từng điểm tham quan trong gói', 'So sánh ưu đãi combo theo mùa trên Sun World & Klook'],
      hi: ['केबल कार + बुफे या शो + किस ब्रिज कॉम्बो विकल्प चुनें', 'प्रत्येक शामिल आकर्षण के लिए सीधा QR कोड प्रवेश', 'सन वर्ल्ड और Klook पर मौसमी कॉम्बो ऑफ़र की तुलना करें'],
      zh: ['可选跨海缆车+自助餐、或海洋之吻演出+亲吻桥等组合选项', '凭电子二维码即可在各对应景点直接核销入园', '可在太阳世界官方预订页与 Klook 对比当季组合优惠'],
      ru: ['Выбор пакетов: канатная дорога + буфет или шоу + Мост поцелуев', 'Вход по QR-коду на каждый включенный объект Sun World', 'Актуальные сезонные комбо на Sun World и Klook'],
      ko: ['케이블카+뷔페 또는 키스 오브 더 씨 쇼+키스브릿지 등 결합 옵션 선택', '예매 페이지 내 패키지 옵션에서 포함 상품과 날짜별 요금 직접 확인', '선월드 공식 예매처 및 Klook에서 시즌별 프로모션 비교 가능'],
      ja: ['ケーブルカー＋ビュッフェ、またはショー＋キスブリッジ等のセットを選択可能', '予約ページのパッケージ選択肢から含まれる内容と料金を確認', 'Sun World公式およびKlookで季節限定プロモーションを比較可能'],
    },
    tips: {
      en: 'Tip: Combo inclusions and prices vary by season. Check the exact package options on Sun World Official Booking or Klook before purchase.',
      vi: 'Mẹo: Các gói combo và giá thay đổi theo mùa. Vui lòng kiểm tra kỹ danh mục bao gồm trong từng gói trên Sun World hoặc Klook trước khi thanh toán.',
      hi: 'सुझाव: कॉम्बो में शामिल सेवाएं और कीमतें सीजन के अनुसार बदलती हैं। खरीदने से पहले पैकेज विवरण जांचें।',
      zh: '小贴士：组合套票包含项与价格随季度调整，预订前请在商品页“套餐选项”中核对具体包含内容。',
      ru: 'Совет: состав и стоимость комбо зависят от сезона. Проверяйте включенные услуги в выбранном тарифе перед оплатой.',
      ko: '이용 안내: 시즌별로 운영되는 콤보 구성(쇼+키스브릿지, 케이블카+쇼 등)이 다르므로 예매 페이지의 세부 옵션 포함 사항을 반드시 확인하세요.',
      ja: 'ヒント：時期により販売されるコンボ構成が異なります。購入前に予約ページのパッケージ詳細で含まれる内容を必ずご確認ください。',
    },
    klookUrl: 'https://www.klook.com/en-US/ destination/p60275095-sunworld-hon-thom-phu-quoc/?aid=MYPHUQUOC'.replace(' ', ''),
    klookCtaLabel: {
      en: 'Compare Packages on Klook →',
      vi: 'Xem Các Gói Trên Klook →',
      hi: 'Klook पर पैकेज देखें →',
      zh: '在 Klook 查看套餐选项 →',
      ru: 'Пакеты на Klook →',
      ko: 'Klook 패키지 옵션 보기 →',
      ja: 'Klookでパッケージを見る →',
    },
    officialUrl: 'https://booking.sunworld.vn',
    officialCtaLabel: {
      en: 'Sun World Combos',
      vi: 'Combo Sun World',
      hi: 'सन वर्ल्ड कॉम्बो',
      zh: '官网组合套票',
      ru: 'Комбо Sun World',
      ko: '선월드 공식 콤보',
      ja: 'Sun World公式コンボ',
    },
    imageUrl: '/tickets/south-all-in-one-combo.webp',
  },
]
