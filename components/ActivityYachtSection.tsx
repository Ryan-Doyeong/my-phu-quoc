// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import { CONTACT_CONFIG } from '@/lib/contactConfig'
import {
  MARMORIS_YACHT_TOURS,
  YACHT_CANCELLATION,
  YACHT_CANCEL_NOTE,
  YACHT_CHILD_POLICY,
  YACHT_EXCLUDED,
  YACHT_EXTRA_PAID,
  YACHT_INCLUDED,
  type L,
} from '@/lib/activities/marmorisYacht'
import type { Locale } from '@/lib/i18n/config'

type TLocale = 'zh' | 'ru' | 'ja' | 'hi'
type TR = Partial<Record<TLocale, string>>

/*
 * Partner content in lib/activities/marmorisYacht.ts only carries ko/en.
 * zh/ru/ja/hi translations are keyed by the English source string; anything
 * missing falls back to English. ko is the source of truth.
 */
const WEATHER_EN = MARMORIS_YACHT_TOURS[0].notes[0].en

const TRANSLATIONS: Record<string, TR> = {
  'Morning · BBQ Lunch': { zh: '上午 · BBQ 午餐', ru: 'Утро · Обед-барбекю', ja: '午前 · BBQランチ', hi: 'सुबह · BBQ लंच' },
  'Tropical Yachting Tour': { zh: '热带游艇之旅', ru: 'Тропический яхт-тур', ja: 'トロピカルヨットツアー', hi: 'ट्रॉपिकल याट टूर' },
  'About 5 hours': { zh: '约5小时', ru: 'Около 5 часов', ja: '約5時間', hi: 'लगभग 5 घंटे' },
  'Departs Vinh Dam Port (about 10 min by car from Sunset Town)': {
    zh: '从 Vinh Dam 港出发（距日落小镇车程约10分钟）',
    ru: 'Отправление из порта Vinh Dam (около 10 минут на машине от Сансет Тауна)',
    ja: 'Vinh Dam港出発（サンセットタウンから車で約10分）',
    hi: 'Vinh Dam पोर्ट से प्रस्थान (सनसेट टाउन से कार द्वारा लगभग 10 मिनट)',
  },
  'Up to 45 guests per yacht': { zh: '每艘游艇最多45人', ru: 'До 45 гостей на яхте', ja: '1隻あたり最大45名', hi: 'प्रति याट अधिकतम 45 मेहमान' },
  'Snorkeling': { zh: '浮潜', ru: 'Снорклинг', ja: 'スノーケリング', hi: 'स्नॉर्कलिंग' },
  'SUP': { zh: 'SUP 桨板', ru: 'SUP-борд', ja: 'SUP', hi: 'SUP' },
  'Fishing': { zh: '钓鱼', ru: 'Рыбалка', ja: '釣り', hi: 'मछली पकड़ना' },
  'Water cycling': { zh: '水上自行车', ru: 'Водный велосипед', ja: 'ウォーターサイクル', hi: 'वाटर साइक्लिंग' },
  'BBQ Lunch': { zh: 'BBQ 午餐', ru: 'Обед-барбекю', ja: 'BBQランチ', hi: 'BBQ लंच' },
  'Ocean Class': { zh: '海洋舱', ru: 'Оушен-класс', ja: 'オーシャンクラス', hi: 'ओशन क्लास' },
  'Lower Deck': { zh: '下层甲板', ru: 'Нижняя палуба', ja: 'ロワーデッキ', hi: 'निचला डेक' },
  'Sky Lounge': { zh: '天空酒廊', ru: 'Скай-лаунж', ja: 'スカイラウンジ', hi: 'स्काई लाउंज' },
  'VIP Deck': { zh: 'VIP 甲板', ru: 'VIP-палуба', ja: 'VIPデッキ', hi: 'VIP डेक' },
  'One free banana boat ride · Jet ski and scuba diving not included': {
    zh: '含1次免费香蕉船 · 水上摩托和水肺潜水需另行收费',
    ru: 'Одна бесплатная поездка на банане · Гидроцикл и дайвинг оплачиваются отдельно',
    ja: 'バナナボート1回無料 · ジェットスキーとスキューバダイビングは別料金',
    hi: 'एक बार बनाना बोट मुफ़्त · जेट स्की और स्कूबा डाइविंग का शुल्क अलग',
  },
  'Private Flybridge seating with 360° views · Jet ski, banana boat and scuba diving included': {
    zh: '专属飞桥座位（360°全景） · 含水上摩托、香蕉船和水肺潜水',
    ru: 'Отдельные места на флайбридже (панорама 360°) · Гидроцикл, банан и дайвинг включены',
    ja: 'フライブリッジ専用席（360°の眺望） · ジェットスキー、バナナボート、スキューバダイビング込み',
    hi: 'फ्लाईब्रिज पर निजी सीटें (360° दृश्य) · जेट स्की, बनाना बोट और स्कूबा डाइविंग शामिल',
  },
  'Depart from Vinh Dam Port': { zh: '从 Vinh Dam 港出发', ru: 'Отправление из порта Vinh Dam', ja: 'Vinh Dam港出発', hi: 'Vinh Dam पोर्ट से प्रस्थान' },
  'Cruise to the anchorage': { zh: '乘船前往停泊点', ru: 'Переход к месту стоянки', ja: '停泊地へクルーズ', hi: 'लंगर स्थल तक क्रूज़' },
  'Hon Roi or Hon Dua, depending on weather conditions': {
    zh: '视天气情况停泊在 Hon Roi 或 Hon Dua',
    ru: 'Стоянка у Hon Roi или Hon Dua в зависимости от погоды',
    ja: '天候により Hon Roi または Hon Dua に停泊',
    hi: 'मौसम के अनुसार Hon Roi या Hon Dua पर लंगर',
  },
  'Enjoy exciting water sports activities': { zh: '尽享水上运动', ru: 'Водные развлечения', ja: 'ウォータースポーツを満喫', hi: 'रोमांचक जल क्रीड़ाओं का आनंद' },
  'Lunch on board': { zh: '游艇上午餐', ru: 'Обед на борту', ja: 'ヨット上でランチ', hi: 'याट पर लंच' },
  'Cruise back to Vinh Dam Port': { zh: '返回 Vinh Dam 港', ru: 'Возвращение в порт Vinh Dam', ja: 'Vinh Dam港へ帰港', hi: 'Vinh Dam पोर्ट वापसी' },
  'Concluding the journey': { zh: '行程结束', ru: 'Завершение тура', ja: 'ツアー終了', hi: 'यात्रा समाप्त' },
  'Guests are picked up at their hotels in the Duong Dong and An Thoi areas and gathered at Vinh Dam Port, then transferred by boat to the yacht. The departure port and route may change depending on weather and wind season.': {
    zh: '我们将在 Duong Dong 和 An Thoi 地区的酒店接送客人，在 Vinh Dam 港集合后乘小艇登上游艇。出发港口和航线可能因天气和风季而变更。',
    ru: 'Гостей забирают из отелей в районах Duong Dong и An Thoi и собирают в порту Vinh Dam, после чего на катере доставляют на яхту. Порт отправления и маршрут могут измениться в зависимости от погоды и сезона ветров.',
    ja: 'Duong Dong・An Thoi エリアのホテルでお客様をお迎えし、Vinh Dam港に集合後、ボートでヨットへ移動します。出発港とルートは天候や風の季節により変更になる場合があります。',
    hi: 'Duong Dong और An Thoi क्षेत्र के होटलों से मेहमानों को लिया जाता है और Vinh Dam पोर्ट पर इकट्ठा करके नाव से याट तक ले जाया जाता है। प्रस्थान पोर्ट और मार्ग मौसम और हवा के मौसम के अनुसार बदल सकते हैं।',
  },
  [WEATHER_EN]: {
    zh: '所示日程和时间仅为一般参考。出发港口、航线、停泊地点、时间和项目可能因海况、天气、风季及当天运营情况等多种因素而变更或调整。活动仅在天气和乘客健康状况安全的情况下进行。',
    ru: 'Указанные расписание и время являются ориентировочными. Порт отправления, маршрут, место стоянки, время и программа могут измениться или быть скорректированы в зависимости от состояния моря, погоды, сезона ветров и других обстоятельств в день тура. Активности проводятся только тогда, когда погода и состояние здоровья гостей позволяют обеспечить безопасность.',
    ja: '表示されている日程と時間は一般的な目安です。海況、天候、風の季節、当日の運営状況など様々な要因により、出発港、航路、停泊場所、時間、プログラムが変更・調整される場合があります。アクティビティは、天候とご乗船のお客様の健康状態が安全な場合にのみ実施されます。',
    hi: 'दिखाए गए कार्यक्रम और समय सामान्य मार्गदर्शन हैं। समुद्र की स्थिति, मौसम, हवा के मौसम और उस दिन की परिचालन स्थिति के आधार पर प्रस्थान पोर्ट, मार्ग, लंगर स्थल, समय और कार्यक्रम बदले या समायोजित किए जा सकते हैं। गतिविधियाँ केवल तभी आयोजित की जाती हैं जब मौसम और यात्रियों का स्वास्थ्य सुरक्षित हो।',
  },
  'Evening · Fireworks · DJ': { zh: '傍晚 · 烟花 · DJ', ru: 'Вечер · Фейерверк · DJ', ja: '夕方 · 花火 · DJ', hi: 'शाम · आतिशबाज़ी · DJ' },
  'Sunset Chilling Tour': { zh: '日落悠享游艇之旅', ru: 'Закатный чиллинг-тур', ja: 'サンセットチリングツアー', hi: 'सनसेट चिलिंग टूर' },
  'Kiss Bridge DJ & fireworks': { zh: 'Kiss Bridge DJ 与烟花', ru: 'DJ и фейерверк у Kiss Bridge', ja: 'キスブリッジのDJと花火', hi: 'Kiss Bridge पर DJ और आतिशबाज़ी' },
  'Sunset': { zh: '日落', ru: 'Закат', ja: 'サンセット', hi: 'सूर्यास्त' },
  'BBQ Dinner': { zh: 'BBQ 晚餐', ru: 'Ужин-барбекю', ja: 'BBQディナー', hi: 'BBQ डिनर' },
  'Fireworks': { zh: '烟花', ru: 'Фейерверк', ja: '花火', hi: 'आतिशबाज़ी' },
  'DJ': { zh: 'DJ', ru: 'DJ', ja: 'DJ', hi: 'DJ' },
  'Arrive at the anchorage at Hon Dam Ngoai': { zh: '抵达 Hon Dam Ngoai 停泊点', ru: 'Прибытие к месту стоянки у Hon Dam Ngoai', ja: 'Hon Dam Ngoai の停泊地に到着', hi: 'Hon Dam Ngoai के लंगर स्थल पर आगमन' },
  'Admire the beautiful sunset over Phu Quoc': { zh: '欣赏富国岛美丽的日落', ru: 'Любуемся закатом над Фукуоком', ja: 'フーコックの美しい夕日を鑑賞', hi: 'फु क्वोक के सुंदर सूर्यास्त का नज़ारा' },
  'Dinner on board': { zh: '游艇上晚餐', ru: 'Ужин на борту', ja: 'ヨット上でディナー', hi: 'याट पर डिनर' },
  'Cruise to Kiss Bridge for a live DJ performance': { zh: '前往 Kiss Bridge，欣赏现场 DJ 表演', ru: 'Переход к Kiss Bridge, живое выступление DJ', ja: 'キスブリッジへ移動、ライブDJパフォーマンス', hi: 'Kiss Bridge की ओर क्रूज़, लाइव DJ प्रस्तुति' },
  'Schedule subject to change depending on weather conditions': { zh: '日程可能因天气而变更', ru: 'Расписание может измениться в зависимости от погоды', ja: '天候により変更になる場合があります', hi: 'मौसम के अनुसार कार्यक्रम बदल सकता है' },
  'Spectacular fireworks display': { zh: '观赏精彩烟花', ru: 'Эффектный фейерверк', ja: '花火を鑑賞', hi: 'शानदार आतिशबाज़ी का नज़ारा' },
  'Guests are picked up at their hotels and gathered at Vinh Dam Port, then transferred by boat to the yacht. Pick-up is based on Duong Dong Town Center; other areas may incur an additional transportation charge.': {
    zh: '我们将在各酒店接送客人，在 Vinh Dam 港集合后乘小艇登上游艇。接送以 Duong Dong 市中心为准，其他地区可能需另付交通费。',
    ru: 'Гостей забирают из отелей и собирают в порту Vinh Dam, после чего на катере доставляют на яхту. Трансфер рассчитан от центра города Duong Dong; для других районов может взиматься дополнительная плата за транспорт.',
    ja: '各ホテルでお客様をお迎えし、Vinh Dam港に集合後、ボートでヨットへ移動します。送迎は Duong Dong 市街中心部が基準で、それ以外のエリアは別途交通費がかかる場合があります。',
    hi: 'मेहमानों को उनके होटलों से लिया जाता है और Vinh Dam पोर्ट पर इकट्ठा करके नाव से याट तक ले जाया जाता है। पिकअप Duong Dong शहर के केंद्र के आधार पर है; अन्य क्षेत्रों के लिए अतिरिक्त परिवहन शुल्क लग सकता है।',
  },
  'Round-trip transportation from your location in Duong Dong Town Center to the pier': {
    zh: 'Duong Dong 市中心至码头的往返接送', ru: 'Трансфер туда и обратно от вашего места в центре города Duong Dong до пирса', ja: 'Duong Dong 市街中心部のご滞在先から桟橋までの往復送迎', hi: 'Duong Dong शहर के केंद्र में आपके स्थान से घाट तक आना-जाना',
  },
  'Welcome drink and tropical fruits': { zh: '欢迎饮品和热带水果', ru: 'Приветственный напиток и тропические фрукты', ja: 'ウェルカムドリンクとトロピカルフルーツ', hi: 'वेलकम ड्रिंक और उष्णकटिबंधीय फल' },
  'Unlimited beer, soft drinks, and detox beverages': { zh: '啤酒、软饮和排毒饮品无限畅饮', ru: 'Безлимитное пиво, безалкогольные напитки и детокс-напитки', ja: 'ビール、ソフトドリンク、デトックスドリンク飲み放題', hi: 'बीयर, सॉफ्ट ड्रिंक और डिटॉक्स पेय असीमित' },
  'Snorkeling, fishing, photography, SUP, water cycling, swimming': { zh: '浮潜、钓鱼、摄影、SUP 桨板、水上自行车、游泳', ru: 'Снорклинг, рыбалка, фотосъёмка, SUP-борд, водный велосипед, плавание', ja: 'スノーケリング、釣り、写真撮影、SUP、ウォーターサイクル、水泳', hi: 'स्नॉर्कलिंग, मछली पकड़ना, फ़ोटोग्राफ़ी, SUP, वाटर साइक्लिंग, तैराकी' },
  'BBQ lunch/dinner served on board': { zh: '游艇上提供 BBQ 午餐/晚餐', ru: 'Обед/ужин-барбекю на борту', ja: 'ヨット上でBBQランチ/ディナー', hi: 'याट पर BBQ लंच/डिनर' },
  'Bartender service, DJ entertainment (shared afternoon tours)': { zh: '调酒师服务、DJ（下午拼团）', ru: 'Услуги бармена, DJ (групповые дневные туры)', ja: 'バーテンダーサービス、DJ（午後の乗合ツアー）', hi: 'बारटेंडर सेवा, DJ (दोपहर के साझा टूर)' },
  'Jet skiing': { zh: '水上摩托', ru: 'Гидроцикл', ja: 'ジェットスキー', hi: 'जेट स्की' },
  'Scuba diving': { zh: '水肺潜水', ru: 'Дайвинг с аквалангом', ja: 'スキューバダイビング', hi: 'स्कूबा डाइविंग' },
  'Towable inflatable rides': { zh: '拖曳式充气游乐设施（香蕉船等）', ru: 'Буксируемые надувные аттракционы (банан и др.)', ja: '牽引式チューブアトラクション（バナナボートなど）', hi: 'खींचे जाने वाले इन्फ्लेटेबल राइड (बनाना बोट आदि)' },
  'Water sports activities and any additional expenses on board not included in the package': { zh: '套餐未包含的水上运动及船上额外费用', ru: 'Водные виды спорта и дополнительные расходы на борту, не входящие в пакет', ja: 'パッケージに含まれないウォータースポーツおよび船上での追加費用', hi: 'पैकेज में शामिल न की गई जल क्रीड़ाएँ और जहाज़ पर अतिरिक्त खर्च' },
  'Surcharges for bringing outside food and beverages on board': { zh: '携带外部食品和饮料上船需额外收费', ru: 'Доплата за пронос на борт еды и напитков с собой', ja: '外部からの飲食物の持ち込みには追加料金', hi: 'बाहर से खाना-पीना लाने पर अतिरिक्त शुल्क' },
  'Additional transportation charges for pick-up and drop-off outside the city center': { zh: '市中心以外的接送需另付交通费', ru: 'Дополнительная плата за трансфер за пределами центра города', ja: '市街中心部以外での送迎には別途交通費', hi: 'शहर के केंद्र के बाहर पिकअप और ड्रॉप के लिए अतिरिक्त परिवहन शुल्क' },
  'Shared tours': { zh: '拼团游', ru: 'Групповые туры', ja: '乗合ツアー', hi: 'साझा टूर' },
  '48 hours or more before departure: 100% refund': { zh: '出发前48小时以上：全额退款', ru: 'За 48 часов и более до отправления: возврат 100%', ja: '出発48時間前まで：100%返金', hi: 'प्रस्थान से 48 घंटे या उससे पहले: 100% रिफंड' },
  '24 hours or more before departure: 50% refund': { zh: '出发前24小时以上：退款50%', ru: 'За 24 часа и более до отправления: возврат 50%', ja: '出発24時間前まで：50%返金', hi: 'प्रस्थान से 24 घंटे या उससे पहले: 50% रिफंड' },
  'Within 24 hours of departure: no refund': { zh: '出发前24小时以内：不予退款', ru: 'Менее чем за 24 часа до отправления: возврат невозможен', ja: '出発24時間以内：返金不可', hi: 'प्रस्थान से 24 घंटे के भीतर: कोई रिफंड नहीं' },
  'Private charter': { zh: '私人包船', ru: 'Частный чартер', ja: 'プライベートチャーター', hi: 'प्राइवेट चार्टर' },
  '7 days or more before departure: 100% refund': { zh: '出发前7天以上：全额退款', ru: 'За 7 дней и более до отправления: возврат 100%', ja: '出発7日前まで：100%返金', hi: 'प्रस्थान से 7 दिन या उससे पहले: 100% रिफंड' },
  '3–6 days before departure: 50% refund': { zh: '出发前3~6天：退款50%', ru: 'За 3–6 дней до отправления: возврат 50%', ja: '出発3〜6日前：50%返金', hi: 'प्रस्थान से 3–6 दिन पहले: 50% रिफंड' },
  'Within 48 hours of departure: no refund': { zh: '出发前48小时以内：不予退款', ru: 'Менее чем за 48 часов до отправления: возврат невозможен', ja: '出発48時間以内：返金不可', hi: 'प्रस्थान से 48 घंटे के भीतर: कोई रिफंड नहीं' },
  'No refunds will be provided for unused services.': { zh: '未使用的服务不予退款。', ru: 'За неиспользованные услуги возврат не производится.', ja: '未使用のサービスは返金されません。', hi: 'अनुपयोगित सेवाओं के लिए कोई रिफंड नहीं दिया जाएगा।' },
  'Ages 0–3: complimentary': { zh: '0~3岁：免费', ru: '0–3 года: бесплатно', ja: '0〜3歳：無料', hi: '0–3 वर्ष: निःशुल्क' },
  'Ages 4 to under 11: 50% of the adult ticket price': { zh: '4岁至11岁以下：成人票价的50%', ru: 'От 4 до 11 лет (не включая 11): 50% стоимости взрослого билета', ja: '4歳以上11歳未満：大人料金の50%', hi: '4 वर्ष से 11 वर्ष से कम: वयस्क टिकट मूल्य का 50%' },
  'Ages 11 and above: adult ticket price': { zh: '11岁及以上：成人票价', ru: 'От 11 лет: стоимость взрослого билета', ja: '11歳以上：大人料金', hi: '11 वर्ष और उससे अधिक: वयस्क टिकट मूल्य' },
}

type UiText = {
  section: string; lead: string; partner: string; per: string; from: string; schedule: string; included: string
  policy: string; extraPaid: string; excluded: string; cancelTitle: string; childTitle: string; wa: string; za: string
  credit: string; notice: string
}

const UI: Record<string, UiText> = {
  ko: { section: '요트 투어', lead: '푸꾸옥 바다를 즐기는 프리미엄 요트 투어입니다. 가격과 일정은 파트너사 기준입니다.', partner: '파트너', per: '1인', from: '부터', schedule: '일정 보기', included: '포함 · 불포함', policy: '취소 · 아동 정책', extraPaid: '추가요금(별도, 오션 클래스 기준)', excluded: '불포함', cancelTitle: '취소·환불', childTitle: '아동 요금', wa: 'WhatsApp 문의', za: 'Zalo 문의', credit: '사진 출처: Marmoris Yachting', notice: '관광은 날씨와 해상 상태, 당일 상황 등 여러 변수의 영향을 받습니다. 아래 일정과 시간은 일반적인 기준이며, 실제 운영은 이를 감안해 조정될 수 있습니다.' },
  en: { section: 'Yacht Tours', lead: 'Premium yacht tours on the waters of Phu Quoc. Prices and schedules are provided by our partner.', partner: 'Partner', per: 'per person', from: 'from', schedule: 'View schedule', included: 'Included · Excluded', policy: 'Cancellation · Children', extraPaid: 'Additional charge (Ocean Class)', excluded: 'Not included', cancelTitle: 'Cancellation', childTitle: 'Children', wa: 'WhatsApp', za: 'Zalo', credit: 'Photos: Marmoris Yachting', notice: 'Sightseeing depends on weather, sea conditions and other circumstances on the day. The schedules and times below are general guidelines and actual operations may be adjusted accordingly.' },
  zh: { section: '游艇之旅', lead: '尽享富国岛海景的高端游艇之旅。价格和日程以合作伙伴为准。', partner: '合作伙伴', per: '每人', from: '起', schedule: '查看日程', included: '包含 · 不包含', policy: '取消 · 儿童政策', extraPaid: '额外收费（另计，以海洋舱为准）', excluded: '不包含', cancelTitle: '取消与退款', childTitle: '儿童票价', wa: 'WhatsApp 咨询', za: 'Zalo 咨询', credit: '图片来源：Marmoris Yachting', notice: '观光受天气、海况及当天情况等多种因素影响。以下日程和时间仅为一般参考，实际运营可能据此调整。' },
  ru: { section: 'Яхт-туры', lead: 'Премиальные яхт-туры по морю Фукуока. Цены и расписание — по данным партнёра.', partner: 'Партнёр', per: 'с человека', from: 'от', schedule: 'Смотреть расписание', included: 'Включено · Не включено', policy: 'Отмена · Дети', extraPaid: 'Дополнительная плата (отдельно, для Оушен-класса)', excluded: 'Не включено', cancelTitle: 'Отмена и возврат', childTitle: 'Стоимость для детей', wa: 'Написать в WhatsApp', za: 'Написать в Zalo', credit: 'Фото: Marmoris Yachting', notice: 'Экскурсии зависят от погоды, состояния моря и других обстоятельств в день тура. Приведённые ниже расписание и время являются ориентировочными, фактическая организация может быть скорректирована.' },
  ja: { section: 'ヨットツアー', lead: 'フーコックの海を楽しむプレミアムヨットツアーです。料金と日程はパートナー会社の基準によります。', partner: 'パートナー', per: '1名', from: '〜', schedule: '日程を見る', included: '含まれるもの · 含まれないもの', policy: 'キャンセル · お子様の料金', extraPaid: '追加料金（別途、オーシャンクラス基準）', excluded: '含まれないもの', cancelTitle: 'キャンセル・返金', childTitle: 'お子様の料金', wa: 'WhatsAppで問い合わせ', za: 'Zaloで問い合わせ', credit: '写真提供：Marmoris Yachting', notice: '観光は天候や海の状態、当日の状況など様々な要因の影響を受けます。以下の日程と時間は一般的な目安であり、実際の運営はこれを踏まえて調整される場合があります。' },
  hi: { section: 'याट टूर', lead: 'फु क्वोक के समुद्र का आनंद लेने वाले प्रीमियम याट टूर। मूल्य और कार्यक्रम पार्टनर कंपनी के अनुसार हैं।', partner: 'पार्टनर', per: 'प्रति व्यक्ति', from: 'से', schedule: 'कार्यक्रम देखें', included: 'शामिल · शामिल नहीं', policy: 'रद्दीकरण · बच्चों की नीति', extraPaid: 'अतिरिक्त शुल्क (अलग, ओशन क्लास के अनुसार)', excluded: 'शामिल नहीं', cancelTitle: 'रद्दीकरण और रिफंड', childTitle: 'बच्चों का शुल्क', wa: 'WhatsApp पर पूछें', za: 'Zalo पर पूछें', credit: 'फ़ोटो स्रोत: Marmoris Yachting', notice: 'भ्रमण मौसम, समुद्र की स्थिति और उस दिन की अन्य परिस्थितियों से प्रभावित होता है। नीचे दिए गए कार्यक्रम और समय सामान्य मार्गदर्शन हैं, और वास्तविक संचालन उसी के अनुसार समायोजित किया जा सकता है।' },
}

const pick = (l: L, locale: Locale) => {
  if (locale === 'ko') return l.ko
  if (locale === 'en' || locale === 'vi') return l.en
  return TRANSLATIONS[l.en]?.[locale as TLocale] ?? l.en
}

export function ActivityYachtSection({ locale = 'ko' }: { locale?: Locale }) {
  const ui = UI[locale] ?? UI.en
  return (
    <section className="yachtSection" id="yacht">
      <h2 className="activitiesSectionTitle">{ui.section}</h2>
      <p className="yachtLead">{ui.lead}</p>
      <p className="yachtNotice">{ui.notice}</p>
      <div className="yachtGrid">
        {MARMORIS_YACHT_TOURS.map((t) => (
          <article key={t.id} className="yachtCard">
            <div className="yachtPhoto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.images[0]} alt={pick(t.title, locale)} loading="lazy" />
              <span className="yachtBadge">{pick(t.badge, locale)}</span>
            </div>
            <div className="yachtThumbs">
              {t.images.slice(1).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
            <div className="yachtBody">
              <p className="yachtOp">{ui.partner} · {t.operator}</p>
              <h3 className="yachtTitle">{pick(t.title, locale)}</h3>
              <div className="yachtMeta">
                <span>{t.hours}</span>
                {t.facts.map((f) => <span key={f.en}>{pick(f, locale)}</span>)}
              </div>
              <div className="yachtTags">
                {t.tags.map((g) => <span key={g.en}>{pick(g, locale)}</span>)}
              </div>
              <ul className="yachtClasses">
                {t.classes.map((c) => (
                  <li key={c.name.en}>
                    <div className="yachtClassMain">
                      <span>
                        <b>{pick(c.name, locale)}</b>
                        <em>{pick(c.deck, locale)}</em>
                      </span>
                      <strong>{c.priceVnd.toLocaleString('en-US')} ₫<small>{ui.per}</small></strong>
                    </div>
                    {c.note && <p className="yachtClassNote">{pick(c.note, locale)}</p>}
                  </li>
                ))}
              </ul>

              <details className="yachtDetails">
                <summary>{ui.schedule}</summary>
                <p className="yachtNote">{pick(t.flow, locale)}</p>
                <ul className="yachtTimeline">
                  {t.steps.map((s) => (
                    <li key={s.time + s.title.en}>
                      <time>{s.time}</time>
                      <div>
                        <b>{pick(s.title, locale)}</b>
                        {s.desc && <span>{pick(s.desc, locale)}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
                {t.notes.map((n) => <p key={n.en} className="yachtNote">{pick(n, locale)}</p>)}
              </details>

              <details className="yachtDetails">
                <summary>{ui.included}</summary>
                <ul className="yachtList">
                  {YACHT_INCLUDED.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtSub">{ui.extraPaid}</p>
                <ul className="yachtList">
                  {YACHT_EXTRA_PAID.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtSub">{ui.excluded}</p>
                <ul className="yachtList">
                  {YACHT_EXCLUDED.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
              </details>

              <details className="yachtDetails">
                <summary>{ui.policy}</summary>
                <p className="yachtSub">{ui.cancelTitle}</p>
                {YACHT_CANCELLATION.map((g) => (
                  <div key={g.title.en}>
                    <p className="yachtGroup">{pick(g.title, locale)}</p>
                    <ul className="yachtList">
                      {g.rows.map((r) => <li key={r.en}>{pick(r, locale)}</li>)}
                    </ul>
                  </div>
                ))}
                <p className="yachtNote">{pick(YACHT_CANCEL_NOTE, locale)}</p>
                <p className="yachtSub">{ui.childTitle}</p>
                <ul className="yachtList">
                  {YACHT_CHILD_POLICY.map((r) => <li key={r.en}>{pick(r, locale)}</li>)}
                </ul>
              </details>

              <div className="yachtCta">
                <a href={CONTACT_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="yachtCtaPrimary">{ui.wa}</a>
                <a href={CONTACT_CONFIG.zaloUrl} target="_blank" rel="noopener noreferrer" className="yachtCtaGhost">{ui.za}</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="yachtCredit">{ui.credit}</p>
    </section>
  )
}
