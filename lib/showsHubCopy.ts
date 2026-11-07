import type { Locale } from '@/lib/i18n/config'

export interface ShowsHubCopy {
  title: string
  meta: string
  h1: string
  lastChecked: string
  sourceNote: string
  thShow: string
  thTime: string
  thNote: string
  row1Name: string
  row1Time: string
  row1Note: string
  row2Name: string
  row2Time: string
  row2Note: string
  h2_1: string
  p1: string
  h2_2: string
  p2: string
  h2_3: string
  p3: string
  h2_4: string
  p4: string
  h2_5: string
  p5: string
  linkBuggy: string
  linkExchange: string
  linkHotels: string
  ctaWhatsApp: string
  faqTitle: string
  q1: string
  a1: string
  q2: string
  a2: string
  q3: string
  a3: string
}

/** Verified against Sun World official booking site + sunsettown.com.vn on 2026-11-07. */
export const SHOWS_CHECKED_DATE = '2026-11-07'

const en: ShowsHubCopy = {
  title: 'Phu Quoc Sunset Town Show Schedule | My Phu Quoc',
  meta: "Show times at Phu Quoc's Sunset Town: Symphony of the Sea at 19:30 and Kiss of the Sea at 21:00 (official information as of 2026-11-07). Plus viewing tips.",
  h1: 'Phu Quoc Sunset Town Show Schedule',
  lastChecked: 'Last checked: 2026-11-07',
  sourceNote: 'Sources: Sun World official booking website and Sunset Town official website. Show times may change, so check the official booking page for your date before visiting.',
  thShow: 'Show', thTime: 'Time', thNote: 'Notes',
  row1Name: 'Symphony of the Sea', row1Time: '19:30–20:05', row1Note: 'Sunset Beach seating area',
  row2Name: 'Kiss of the Sea', row2Time: 'Starts at 21:00', row2Note: 'Multimedia show with fireworks',
  h2_1: 'Why show times differ between sources',
  p1: 'Show times can change depending on the season and operating conditions. Blogs and reviews may still show the schedules that were current when they were written. This page uses official information and includes the date it was last checked.',
  h2_2: 'Watching Symphony of the Sea',
  p2: 'The show takes place at the Sunset Beach seating area and runs from 19:30 to 20:05, according to the official booking website.',
  h2_3: 'Watching Kiss of the Sea',
  p3: 'This multimedia show includes fireworks and starts at 21:00. Regular days off could not be confirmed from official information, so check before visiting.',
  h2_4: 'Things to do before and between the shows',
  p4: 'There are about 55 minutes between the end of Symphony of the Sea (around 20:05) and the start of Kiss of the Sea (21:00), giving you time for dinner or a visit to the night market.',
  h2_5: 'Transport and currency exchange',
  p5: 'For buggy or taxi rides before or after the shows, or currency exchange, contact us via WhatsApp.',
  linkBuggy: 'Sunset Town Buggy Tour', linkExchange: 'Currency Exchange & ATM Locations', linkHotels: 'Sunset Town Hotels at a Glance',
  ctaWhatsApp: 'Contact Us on WhatsApp',
  faqTitle: 'Frequently Asked Questions',
  q1: 'Can I watch both shows in one evening?',
  a1: 'Yes. Symphony of the Sea ends around 20:05, and Kiss of the Sea starts at 21:00, so you can watch both. Times are subject to change.',
  q2: 'Are there any days when the shows are closed?',
  a2: 'Regular days off could not be confirmed from official information. Check availability for your date before booking.',
  q3: 'How can I get back to my hotel after the show?',
  a3: 'Ride requests may be high immediately after the show, so we recommend arranging transport in advance.',
}

const ko: ShowsHubCopy = {
  title: '푸꾸옥 선셋타운 공연 시간표: 심포니 오브 더 씨·키스 오브 더 씨 | 마이 푸꾸옥',
  meta: '푸꾸옥 선셋타운 공연 시간표 정리. 심포니 오브 더 씨는 19:30, 키스 오브 더 씨는 21:00 시작(2026-11-07 공식 안내 기준). 관람 팁도 함께 확인하세요.',
  h1: '푸꾸옥 선셋타운 공연 시간표',
  lastChecked: '마지막 확인일: 2026-11-07',
  sourceNote: '출처: Sun World 공식 예약 사이트, 선셋타운 공식 사이트. 시간은 바뀔 수 있으니 방문 전에 공식 예약 페이지에서 날짜별로 확인하세요.',
  thShow: '공연', thTime: '시간', thNote: '비고',
  row1Name: '심포니 오브 더 씨', row1Time: '19:30–20:05', row1Note: '선셋 비치 관람석',
  row2Name: '키스 오브 더 씨', row2Time: '21:00 시작', row2Note: '불꽃놀이 포함 멀티미디어 공연',
  h2_1: '출처마다 공연 시간이 다른 이유',
  p1: '공연 시간은 시즌과 운영 사정에 따라 바뀌고, 블로그와 후기에는 작성 시점의 시간이 그대로 남아 있어 서로 다를 수 있습니다. 이 페이지는 공식 안내를 기준으로 확인일과 함께 정리합니다.',
  h2_2: '심포니 오브 더 씨 관람 안내',
  p2: '선셋 비치 관람석에서 진행되며 공식 예약 사이트 기준 19:30–20:05입니다.',
  h2_3: '키스 오브 더 씨 관람 안내',
  p3: '불꽃놀이가 포함된 멀티미디어 공연으로 21:00에 시작합니다. 정기 휴연일은 공식 안내에서 확인되지 않았으니 방문 전에 확인하세요.',
  h2_4: '공연 전후로 묶어 가기 좋은 일정',
  p4: '심포니 오브 더 씨(20:05경 종료)와 키스 오브 더 씨(21:00) 사이에 약 55분이 있어 저녁 식사나 야시장을 들르기 좋습니다.',
  h2_5: '이동·환전 문의',
  p5: '공연 전후 이동(버기·택시)이나 환전은 WhatsApp으로 문의하세요.',
  linkBuggy: '선셋타운 버기투어', linkExchange: '환전소·ATM 위치', linkHotels: '선셋타운 호텔 한눈에 보기',
  ctaWhatsApp: 'WhatsApp으로 문의하기',
  faqTitle: '자주 묻는 질문',
  q1: '두 공연을 하루 저녁에 볼 수 있나요?',
  a1: '심포니 오브 더 씨가 20:05쯤 끝나고 키스 오브 더 씨가 21:00에 시작하므로 이어서 볼 수 있습니다. 시간은 변경될 수 있습니다.',
  q2: '쉬는 날이 있나요?',
  a2: '정기 휴연일은 공식 안내에서 확인되지 않았습니다. 예약 전에 날짜별 가능 여부를 확인하세요.',
  q3: '공연이 끝난 뒤 숙소로 돌아가는 차량은 어떻게 하나요?',
  a3: '공연 직후에는 호출이 몰릴 수 있어 사전에 차량을 문의하는 것을 권합니다.',
}

const zh: ShowsHubCopy = {
  title: '富国岛日落小镇演出时间表｜My Phu Quoc',
  meta: '富国岛日落小镇演出时间：Symphony of the Sea 19:30、Kiss of the Sea 21:00 开始（截至 2026-11-07 的官方信息），附观演小贴士。',
  h1: '富国岛日落小镇演出时间表',
  lastChecked: '最后核实日期：2026-11-07',
  sourceNote: '信息来源：Sun World 官方预订网站及 Sunset Town 官方网站。演出时间可能调整，出行前请在官方预订页面查询所选日期的安排。',
  thShow: '演出', thTime: '时间', thNote: '备注',
  row1Name: '海洋交响曲（Symphony of the Sea）', row1Time: '19:30–20:05', row1Note: '日落海滩观众席',
  row2Name: '海洋之吻（Kiss of the Sea）', row2Time: '21:00 开始', row2Note: '包含烟花表演的多媒体演出',
  h2_1: '为什么不同来源的演出时间不一样？',
  p1: '演出时间可能因季节和运营安排而调整。博客和游客评价中往往保留着发布时的时间，因此信息可能不一致。本页面以官方信息为准，并注明核实日期。',
  h2_2: '海洋交响曲（Symphony of the Sea）观演指南',
  p2: '演出在日落海滩观众席举行。根据官方预订网站的信息，演出时间为 19:30–20:05。',
  h2_3: '海洋之吻（Kiss of the Sea）观演指南',
  p3: '这是一场包含烟花表演的多媒体演出，21:00 开始。官方信息中未能确认固定休演日，请在出行前再次查询。',
  h2_4: '两场演出前后的行程安排',
  p4: '海洋交响曲（Symphony of the Sea）约 20:05 结束，海洋之吻（Kiss of the Sea）21:00 开始，中间约有 55 分钟，可以安排晚餐或逛夜市。',
  h2_5: '交通与货币兑换咨询',
  p5: '如需咨询演出前后的电瓶车、出租车接送或货币兑换，请通过 WhatsApp 联系我们。',
  linkBuggy: '日落小镇电瓶车游览', linkExchange: '货币兑换点与 ATM 位置', linkHotels: '日落小镇酒店一览',
  ctaWhatsApp: '通过 WhatsApp 咨询',
  faqTitle: '常见问题',
  q1: '一个晚上能看完两场演出吗？',
  a1: '可以。海洋交响曲（Symphony of the Sea）约 20:05 结束，海洋之吻（Kiss of the Sea）21:00 开始，可以接着观看。但演出时间可能调整。',
  q2: '演出有固定休演日吗？',
  a2: '官方信息中未能确认固定休演日。预订前请查询所选日期是否有演出。',
  q3: '演出结束后怎么返回酒店？',
  a3: '演出刚结束时叫车需求可能较多，建议提前咨询并安排接送车辆。',
}

const ru: ShowsHubCopy = {
  title: 'Расписание шоу в Сансет Таун на Фукуоке | My Phu Quoc',
  meta: 'Расписание шоу в Сансет Таун на Фукуоке: Symphony of the Sea — 19:30, Kiss of the Sea — 21:00. Данные на 2026-11-07. Советы зрителям.',
  h1: 'Расписание шоу в Сансет Таун на Фукуоке',
  lastChecked: 'Последняя проверка: 2026-11-07',
  sourceNote: 'Источники: официальный сайт бронирования Sun World и официальный сайт Sunset Town. Время шоу может меняться. Перед посещением уточняйте расписание на нужную дату на официальной странице бронирования.',
  thShow: 'Шоу', thTime: 'Время', thNote: 'Примечания',
  row1Name: 'Симфония моря (Symphony of the Sea)', row1Time: '19:30–20:05', row1Note: 'Зрительские места на пляже Сансет-Бич',
  row2Name: 'Поцелуй моря (Kiss of the Sea)', row2Time: 'Начало в 21:00', row2Note: 'Мультимедийное шоу с фейерверком',
  h2_1: 'Почему время шоу отличается в разных источниках?',
  p1: 'Расписание может меняться в зависимости от сезона и условий проведения. В блогах и отзывах часто остаётся информация, актуальная на момент публикации. Поэтому данные могут различаться. На этой странице указано расписание по официальным источникам с датой проверки.',
  h2_2: 'Как посмотреть Симфонию моря (Symphony of the Sea)',
  p2: 'Шоу проходит на зрительских местах пляжа Сансет-Бич. Согласно официальному сайту бронирования, время проведения — 19:30–20:05.',
  h2_3: 'Как посмотреть Поцелуй моря (Kiss of the Sea)',
  p3: 'Это мультимедийное шоу с фейерверком начинается в 21:00. Подтвердить регулярные выходные дни по официальным источникам не удалось, поэтому уточняйте расписание перед посещением.',
  h2_4: 'Чем заняться до и между шоу',
  p4: 'Между окончанием Симфонии моря (примерно в 20:05) и началом Поцелуя моря (в 21:00) есть около 55 минут. За это время можно поужинать или заглянуть на ночной рынок.',
  h2_5: 'Транспорт и обмен валюты',
  p5: 'По вопросам поездок на электрокаре или такси до и после шоу, а также обмена валюты обращайтесь через WhatsApp.',
  linkBuggy: 'Экскурсия на электрокаре по Сансет Таун', linkExchange: 'Пункты обмена валюты и банкоматы', linkHotels: 'Обзор отелей в Сансет Таун',
  ctaWhatsApp: 'Связаться через WhatsApp',
  faqTitle: 'Часто задаваемые вопросы',
  q1: 'Можно ли посмотреть оба шоу за один вечер?',
  a1: 'Да. Симфония моря заканчивается примерно в 20:05, а Поцелуй моря начинается в 21:00, поэтому можно успеть на оба шоу. Расписание может измениться.',
  q2: 'Есть ли дни, когда шоу не проводятся?',
  a2: 'Подтвердить регулярные выходные дни по официальным источникам не удалось. Перед бронированием проверьте, проводится ли шоу в выбранную дату.',
  q3: 'Как вернуться в отель после шоу?',
  a3: 'Сразу после шоу спрос на такси может быть высоким, поэтому рекомендуем договориться о транспорте заранее.',
}

const ja: ShowsHubCopy = {
  title: 'フーコック島サンセットタウンのショー時間表｜My Phu Quoc',
  meta: 'フーコック島サンセットタウンのショー時間を紹介。Symphony of the Seaは19:30、Kiss of the Seaは21:00開始。2026-11-07時点の公式情報と観覧のポイントを掲載。',
  h1: 'フーコック島サンセットタウンのショースケジュール',
  lastChecked: '最終確認日：2026-11-07',
  sourceNote: '出典：Sun World公式予約サイト、Sunset Town公式サイト。公演時間は変更される場合があります。訪問前に公式予約ページで希望日のスケジュールをご確認ください。',
  thShow: 'ショー', thTime: '時間', thNote: '備考',
  row1Name: 'シンフォニー・オブ・ザ・シー（Symphony of the Sea）', row1Time: '19:30–20:05', row1Note: 'サンセットビーチの観覧席',
  row2Name: 'キス・オブ・ザ・シー（Kiss of the Sea）', row2Time: '21:00開始', row2Note: '花火を含むマルチメディアショー',
  h2_1: '情報源によって公演時間が異なるのはなぜ？',
  p1: '公演時間は季節や運営状況によって変更されることがあります。ブログや口コミには投稿当時の時間が残っているため、情報が異なる場合があります。このページでは公式情報をもとに、確認日とあわせてご案内しています。',
  h2_2: 'シンフォニー・オブ・ザ・シーの観覧案内',
  p2: 'サンセットビーチの観覧席で行われます。公式予約サイトによる公演時間は19:30–20:05です。',
  h2_3: 'キス・オブ・ザ・シーの観覧案内',
  p3: '花火を含むマルチメディアショーで、21:00に始まります。定期休演日は公式情報で確認できなかったため、訪問前にご確認ください。',
  h2_4: 'ショーの前後に組み合わせたい過ごし方',
  p4: 'シンフォニー・オブ・ザ・シーの終了（20:05頃）からキス・オブ・ザ・シーの開始（21:00）までは約55分あります。夕食を取ったり、ナイトマーケットに立ち寄ったりできます。',
  h2_5: '移動・両替のお問い合わせ',
  p5: 'ショーの前後の移動（バギー・タクシー）や両替については、WhatsAppでお問い合わせください。',
  linkBuggy: 'サンセットタウンのバギーツアー', linkExchange: '両替所・ATMの場所', linkHotels: 'サンセットタウンのホテル一覧',
  ctaWhatsApp: 'WhatsAppで問い合わせる',
  faqTitle: 'よくある質問',
  q1: '2つのショーを同じ夜に見ることはできますか？',
  a1: 'はい。シンフォニー・オブ・ザ・シーは20:05頃に終了し、キス・オブ・ザ・シーは21:00に始まるため、続けて観覧できます。ただし、時間は変更される場合があります。',
  q2: '休演日はありますか？',
  a2: '定期休演日は公式情報で確認できませんでした。予約前に希望日の開催状況をご確認ください。',
  q3: 'ショー終了後、ホテルへ戻るにはどうすればよいですか？',
  a3: 'ショーの終了直後は配車の依頼が集中する場合があるため、事前に車の手配について問い合わせておくことをおすすめします。',
}

const hi: ShowsHubCopy = {
  title: 'सनसेट टाउन, फु क्वोक शो का समय | My Phu Quoc',
  meta: 'फु क्वोक के सनसेट टाउन में शो का समय: Symphony of the Sea शाम 19:30 बजे और Kiss of the Sea रात 21:00 बजे। 2026-11-07 की आधिकारिक जानकारी और शो देखने के सुझाव।',
  h1: 'फु क्वोक के सनसेट टाउन में शो का समय',
  lastChecked: 'अंतिम जाँच: 2026-11-07',
  sourceNote: 'स्रोत: Sun World की आधिकारिक बुकिंग वेबसाइट और Sunset Town की आधिकारिक वेबसाइट। शो का समय बदल सकता है, इसलिए जाने से पहले आधिकारिक बुकिंग पेज पर अपनी तारीख का समय ज़रूर जाँचें।',
  thShow: 'शो', thTime: 'समय', thNote: 'विवरण',
  row1Name: 'सिम्फनी ऑफ द सी (Symphony of the Sea)', row1Time: '19:30–20:05', row1Note: 'सनसेट बीच पर दर्शकों के बैठने की जगह',
  row2Name: 'किस ऑफ द सी (Kiss of the Sea)', row2Time: '21:00 बजे शुरू', row2Note: 'आतिशबाज़ी वाला मल्टीमीडिया शो',
  h2_1: 'अलग-अलग स्रोतों में शो का समय अलग क्यों है?',
  p1: 'शो का समय मौसम के सीज़न और संचालन संबंधी कारणों से बदल सकता है। ब्लॉग और रिव्यू में अक्सर पोस्ट लिखे जाने के समय की जानकारी ही रहती है, इसलिए समय अलग दिखाई दे सकता है। इस पेज पर आधिकारिक जानकारी के आधार पर समय और उसकी जाँच की तारीख दी गई है।',
  h2_2: 'सिम्फनी ऑफ द सी देखने की जानकारी',
  p2: 'यह शो सनसेट बीच पर दर्शकों के बैठने की जगह से देखा जाता है। आधिकारिक बुकिंग वेबसाइट के अनुसार इसका समय 19:30–20:05 है।',
  h2_3: 'किस ऑफ द सी देखने की जानकारी',
  p3: 'यह आतिशबाज़ी वाला मल्टीमीडिया शो है, जो 21:00 बजे शुरू होता है। आधिकारिक जानकारी में नियमित छुट्टी के दिनों की पुष्टि नहीं हो सकी है, इसलिए जाने से पहले जाँच लें।',
  h2_4: 'शो से पहले और उनके बीच क्या करें?',
  p4: 'सिम्फनी ऑफ द सी लगभग 20:05 बजे खत्म होता है और किस ऑफ द सी 21:00 बजे शुरू होता है। दोनों के बीच लगभग 55 मिनट हैं। इस दौरान आप रात का खाना खा सकते हैं या नाइट मार्केट जा सकते हैं।',
  h2_5: 'आने-जाने और मुद्रा विनिमय की जानकारी',
  p5: 'शो से पहले या बाद में बग्गी या टैक्सी से आने-जाने और मुद्रा विनिमय के बारे में WhatsApp पर पूछें।',
  linkBuggy: 'सनसेट टाउन बग्गी टूर', linkExchange: 'मुद्रा विनिमय केंद्र और ATM के स्थान', linkHotels: 'सनसेट टाउन के होटलों की सूची',
  ctaWhatsApp: 'WhatsApp पर संपर्क करें',
  faqTitle: 'अक्सर पूछे जाने वाले सवाल',
  q1: 'क्या एक ही शाम में दोनों शो देख सकते हैं?',
  a1: 'हाँ। सिम्फनी ऑफ द सी लगभग 20:05 बजे खत्म होता है और किस ऑफ द सी 21:00 बजे शुरू होता है, इसलिए आप दोनों देख सकते हैं। समय बदल सकता है।',
  q2: 'क्या शो किसी दिन बंद रहते हैं?',
  a2: 'आधिकारिक जानकारी में नियमित छुट्टी के दिनों की पुष्टि नहीं हो सकी है। बुकिंग से पहले अपनी तारीख के लिए शो की उपलब्धता जाँचें।',
  q3: 'शो खत्म होने के बाद होटल कैसे लौटें?',
  a3: 'शो खत्म होते ही गाड़ियों की माँग बढ़ सकती है, इसलिए पहले से वाहन की व्यवस्था के बारे में पूछ लेना बेहतर है।',
}

const vi: ShowsHubCopy = {
  title: 'Lịch diễn tại Sunset Town, Phú Quốc | My Phu Quoc',
  meta: 'Lịch diễn tại Sunset Town, Phú Quốc: Symphony of the Sea lúc 19:30, Kiss of the Sea lúc 21:00 (theo thông tin chính thức ngày 2026-11-07). Kèm lưu ý khi xem show.',
  h1: 'Lịch biểu diễn tại Sunset Town, Phú Quốc',
  lastChecked: 'Ngày kiểm tra gần nhất: 2026-11-07',
  sourceNote: 'Nguồn: Trang đặt vé chính thức của Sun World và website chính thức của Sunset Town. Giờ diễn có thể thay đổi, vì vậy hãy kiểm tra lịch theo ngày trên trang đặt vé chính thức trước khi đến.',
  thShow: 'Chương trình', thTime: 'Thời gian', thNote: 'Ghi chú',
  row1Name: 'Bản giao hưởng đại dương (Symphony of the Sea)', row1Time: '19:30–20:05', row1Note: 'Khán đài tại Bãi biển Hoàng Hôn (Sunset Beach)',
  row2Name: 'Nụ hôn của biển cả (Kiss of the Sea)', row2Time: 'Bắt đầu lúc 21:00', row2Note: 'Show đa phương tiện kết hợp pháo hoa',
  h2_1: 'Vì sao giờ diễn khác nhau giữa các nguồn?',
  p1: 'Giờ diễn có thể thay đổi theo mùa và tình hình vận hành. Các bài blog và đánh giá thường giữ nguyên lịch tại thời điểm đăng nên thông tin có thể không giống nhau. Trang này tổng hợp theo nguồn chính thức và ghi rõ ngày kiểm tra.',
  h2_2: 'Thông tin xem Symphony of the Sea',
  p2: 'Chương trình được tổ chức tại khu vực khán đài ở Bãi biển Hoàng Hôn (Sunset Beach). Theo trang đặt vé chính thức, giờ diễn là 19:30–20:05.',
  h2_3: 'Thông tin xem Kiss of the Sea',
  p3: 'Đây là show đa phương tiện kết hợp pháo hoa, bắt đầu lúc 21:00. Chưa xác nhận được lịch nghỉ diễn định kỳ từ thông tin chính thức, vì vậy bạn nên kiểm tra trước khi đến.',
  h2_4: 'Gợi ý lịch trình trước và giữa hai show',
  p4: 'Symphony of the Sea kết thúc khoảng 20:05, còn Kiss of the Sea bắt đầu lúc 21:00. Khoảng cách giữa hai show là khoảng 55 phút, phù hợp để ăn tối hoặc ghé chợ đêm.',
  h2_5: 'Hỏi về di chuyển và đổi tiền',
  p5: 'Nếu cần hỏi về xe buggy, taxi di chuyển trước hoặc sau show, hay dịch vụ đổi tiền, hãy liên hệ qua WhatsApp.',
  linkBuggy: 'Tour xe buggy tại Sunset Town', linkExchange: 'Vị trí điểm đổi tiền và ATM', linkHotels: 'Tổng quan khách sạn tại Sunset Town',
  ctaWhatsApp: 'Liên hệ qua WhatsApp',
  faqTitle: 'Câu hỏi thường gặp',
  q1: 'Có thể xem cả hai show trong một buổi tối không?',
  a1: 'Có. Symphony of the Sea kết thúc khoảng 20:05 và Kiss of the Sea bắt đầu lúc 21:00, nên bạn có thể xem cả hai trong cùng một buổi tối. Giờ diễn có thể thay đổi.',
  q2: 'Các show có ngày nghỉ diễn không?',
  a2: 'Chưa xác nhận được lịch nghỉ diễn định kỳ từ thông tin chính thức. Hãy kiểm tra lịch diễn theo ngày trước khi đặt vé.',
  q3: 'Làm sao để về khách sạn sau khi show kết thúc?',
  a3: 'Ngay sau khi show kết thúc, nhu cầu đặt xe có thể tăng cao. Bạn nên hỏi trước về việc sắp xếp xe đưa đón.',
}

const COPY: Partial<Record<Locale, ShowsHubCopy>> = { en, ko, zh, ru, ja, hi, vi }

export function getShowsHubCopy(locale: Locale): ShowsHubCopy {
  return COPY[locale] ?? en
}
