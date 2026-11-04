import type { Locale } from '@/lib/i18n/config'
import uiStringsJson from '@/data/i18n/translations/ui_strings.json'

export type UiStringId = keyof typeof uiStringsJson

interface UiStringEntry {
  en: string
  zh?: string
  ru?: string
  ja?: string
  hi?: string
  [key: string]: string | undefined
}

const UI_DATA = uiStringsJson as Record<string, UiStringEntry>

// Map keyed by exact English string and trimmed English string
const BY_EN = new Map<string, UiStringEntry>()

for (const [id, entry] of Object.entries(UI_DATA)) {
  if (entry && entry.en) {
    BY_EN.set(entry.en, entry)
    const trimmed = entry.en.trim()
    if (!BY_EN.has(trimmed)) {
      BY_EN.set(trimmed, entry)
    }
  }
}

/**
 * Look up localized string by English text.
 * Strictly preserves `en` output without alteration.
 * If locale is 'zh', 'ru', 'ja', or 'hi', returns translation if available;
 * otherwise falls back to enText.
 */
export function tUi(enText: string, locale: Locale = 'en'): string {
  if (!enText) return ''
  if (locale === 'en' || locale === 'ko' || locale === 'vi') {
    return enText
  }

  const entry = BY_EN.get(enText) || BY_EN.get(enText.trim())
  if (entry) {
    const val = entry[locale]
    if (val && typeof val === 'string' && val.trim().length > 0) {
      return val
    }
  }

  return enText
}

/**
 * Look up localized string by dictionary entry ID (e.g. 'U1', 'T1', etc.).
 */
export function tUiById(id: string, locale: Locale = 'en'): string {
  const entry = UI_DATA[id]
  if (!entry) return ''
  if (locale === 'en' || locale === 'ko' || locale === 'vi') {
    return entry.en || ''
  }
  const val = entry[locale]
  if (val && typeof val === 'string' && val.trim().length > 0) {
    return val
  }
  return entry.en || ''
}

/* ------------------------------------------------------------------
 * Strings added for floating contact / home quick cards.
 * 번역 상태: 7개 국어 (ko/en/zh/ja/ru/hi/vi) ChatGPT 전수 검수 완료 (2026-11-02).
 * ------------------------------------------------------------------ */
type LocaleMap = Record<string, string>

export function pickLocale(map: LocaleMap, locale: string): string {
  return map[locale] || map.en
}

/** Placeholders: {title} and {url}. */
export const WHATSAPP_PREFILL: LocaleMap = {
  en: 'Hi My Phu Quoc! I\'m looking at "{title}" ({url}). I\'d like to ask about: ',
  ko: '안녕하세요 마이 푸꾸옥! "{title}" ({url}) 페이지를 보고 있어요. 문의드리고 싶은 내용: ',
  zh: '你好 My Phu Quoc！我正在浏览“{title}”（{url}）。我想咨询：',
  ru: 'Здравствуйте, My Phu Quoc! Я смотрю страницу «{title}» ({url}). Хотел(а) бы узнать: ',
  ja: 'こんにちは、My Phu Quoc！「{title}」（{url}）を見ています。お問い合わせ内容：',
  hi: 'नमस्ते My Phu Quoc! मैं "{title}" ({url}) देख रहा/रही हूँ। मैं इसके बारे में पूछना चाहता/चाहती हूँ: ',
  vi: 'Xin chào My Phu Quoc! Tôi đang xem trang "{title}" ({url}). Tôi muốn hỏi về: ',
}

export const FLOATING_CONTACT_LABELS = {
  open: {
    en: 'Contact us', ko: '문의하기', zh: '联系我们', ru: 'Связаться', ja: 'お問い合わせ', hi: 'संपर्क करें', vi: 'Liên hệ',
  } as LocaleMap,
  close: {
    en: 'Close', ko: '닫기', zh: '关闭', ru: 'Закрыть', ja: '閉じる', hi: 'बंद करें', vi: 'Đóng',
  } as LocaleMap,
  call: {
    en: 'Call', ko: '전화', zh: '电话', ru: 'Звонок', ja: '電話', hi: 'कॉल', vi: 'Gọi điện',
  } as LocaleMap,
}

export const HERO_IMAGE_ALT: LocaleMap = {
  en: 'Aerial view of Kiss Bridge and Sunset Town, Phu Quoc at sunset',
  ko: '석양 무렵 푸꾸옥 선셋타운과 키스브릿지 항공 전경',
  zh: '日落时分富国岛日落小镇与之吻桥的航拍全景',
  ru: 'Вид с воздуха на Мост поцелуев и Сансет-Таун на острове Фукуок на закате',
  ja: '夕暮れのフーコック島サンセットタウンとキスブリッジの空撮',
  hi: 'सूर्यास्त के समय फु क्वोक के सनसेट टाउन और किस ब्रिज का हवाई दृश्य',
  vi: 'Toàn cảnh Cầu Hôn và Thị trấn Hoàng Hôn Phú Quốc lúc hoàng hôn nhìn từ trên cao',
}

/** One-line sub-labels for the home quick service cards (ChatGPT 검수 완료 2026-11-02). */
export const QUICK_CARD_SUBLABELS: Record<string, LocaleMap> = {
  exchange: {
    en: 'Coming soon', ko: '준비 중', zh: '即将推出', ru: 'Скоро', ja: '近日公開', hi: 'जल्द आ रहा है', vi: 'Sắp ra mắt',
  },
  buggy: {
    en: 'Landmarks & photo spots · Rates on request', ko: '명소·포토존 · 프로그램·요금 문의', zh: '景点与拍照点 · 项目与费用咨询', ru: 'Локации для фото · Стоимость по запросу', ja: '名所・撮影スポット · 料金お問い合わせ', hi: 'प्रमुख स्थल व फ़ोटो · शुल्क पूछताछ', vi: 'Điểm đẹp chụp ảnh · Chi phí liên hệ',
  },
  taxi: {
    en: 'Car tour & airport transfer · Rates on request', ko: '차량 투어·공항 이동 · 요금 문의', zh: '包车游览·机场接送 · 费用咨询', ru: 'Автотур и трансфер · Стоимость по запросу', ja: '車両ツアー・空港送迎 · 料金お問い合わせ', hi: 'कार टूर व एयरपोर्ट ट्रांसफ़र · शुल्क पूछताछ', vi: 'Tour xe riêng & đưa đón · Chi phí liên hệ',
  },
  events: {
    en: 'Fireworks · Shows', ko: '불꽃놀이 · 공연', zh: '烟花表演 · 精彩演出', ru: 'Фейерверки · Шоу', ja: '花火 · ショー', hi: 'आतिशबाज़ी · शो', vi: 'Pháo hoa · Biểu diễn',
  },
  activities: {
    en: 'Custom activity booking · Rates on request', ko: '일정·취향 맞춤 예약 · 요금 문의', zh: '按日程与喜好预订 · 费用咨询', ru: 'Подбор развлечений · Стоимость по запросу', ja: '日程・好みに合わせた予約 · 料金お問い合わせ', hi: 'पसंद के अनुसार बुकिंग · शुल्क पूछताछ', vi: 'Đặt trải nghiệm theo lịch · Chi phí liên hệ',
  },
  emergency: {
    en: 'Hospitals · Pharmacies', ko: '병원 · 약국', zh: '医院 · 药店', ru: 'Больницы · Аптеки', ja: '病院 · 薬局', hi: 'अस्पताल · दवा की दुकानें', vi: 'Bệnh viện · Nhà thuốc',
  },
  itineraries: {
    en: 'Request a custom itinerary for couples, families, or friends',
    ko: '커플·가족·친구와 함께할 맞춤 일정을 의뢰해 보세요',
    zh: '为情侣、家人或朋友定制专属旅行行程',
    ru: 'Закажите индивидуальный маршрут для пары, семьи или друзей',
    ja: 'カップル・ご家族・ご友人との旅に合わせたプランをご相談ください',
    hi: 'जोड़ों, परिवार या दोस्तों के लिए अपनी पसंद का यात्रा कार्यक्रम बनवाएँ',
    vi: 'Yêu cầu lịch trình riêng cho cặp đôi, gia đình hoặc nhóm bạn',
  },
}

/** 상단 메뉴 구역 라벨 (ChatGPT 7개 국어 검수 완료 2026-11-02) */
export const NAV_ZONE_LABELS: { sunset: Record<string, string>; khem: Record<string, string> } = {
  sunset: { ko: '선셋타운', en: 'Sunset Town', zh: '日落小镇', ru: 'Сансет-Таун', ja: 'サンセットタウン', hi: 'सनसेट टाउन', vi: 'Thị trấn Hoàng Hôn' },
  khem: { ko: '켐비치', en: 'Khem Beach', zh: '凯姆海滩', ru: 'Пляж Кхем', ja: 'ケムビーチ', hi: 'खेम बीच', vi: 'Bãi Khem' },
}

// ---------------------------------------------------------------------------
// 맥락형 전환 CTA (components/ContextCta.tsx) — ChatGPT 7개 국어 검수 완료 2026-11-02
// ---------------------------------------------------------------------------
export type ContextCtaKey =
  | 'business' | 'hotel' | 'news' | 'zoneSunset' | 'zoneKhem'

export interface ContextCtaCopy {
  eyebrow: LocaleMap
  headline: LocaleMap
  body: LocaleMap
  primary: LocaleMap
  secondary: LocaleMap
  /** WhatsApp prefilled text; placeholder {name} (business only) */
  prefill?: LocaleMap
}

export const CONTEXT_CTA_STRINGS: Record<ContextCtaKey, ContextCtaCopy> = {
  business: {
    eyebrow: { ko: '가는 방법', en: 'Getting There', zh: '前往方式', ja: 'アクセス', ru: 'Как добраться', hi: 'कैसे पहुँचें', vi: 'Hướng dẫn di chuyển' },
    headline: { ko: '오늘 저녁 이곳에 가실 예정인가요?', en: 'Heading here tonight?', zh: '今晚打算来这里吗？', ja: '今夜はこちらへお出かけですか？', ru: 'Планируете приехать сюда сегодня вечером?', hi: 'क्या आज शाम यहाँ आने की योजना है?', vi: 'Bạn dự định đến đây tối nay?' },
    body: {
      ko: '버기로 편하게 이동하거나, 메시지를 보내 주시면 이동 방법을 안내해 드려요.',
      en: "Travel by buggy, or send us a message and we'll help you find a suitable way to get there.",
      zh: '您可以乘坐观光车前往，也可以给我们留言，我们会协助您了解合适的交通方式。',
      ja: 'バギーでの移動も可能です。メッセージをいただければ、目的地までの移動方法をご案内します。',
      ru: 'Добраться можно на багги. Или напишите нам — мы поможем подобрать удобный способ добраться.',
      hi: 'आप बग्गी से जा सकते हैं या हमें संदेश भेज सकते हैं। हम वहाँ पहुँचने का सुविधाजनक तरीका चुनने में आपकी मदद करेंगे।',
      vi: 'Bạn có thể di chuyển bằng xe buggy hoặc nhắn tin cho chúng tôi để được tư vấn phương tiện phù hợp.',
    },
    primary: { ko: '선셋타운 버기 투어', en: 'Sunset Town Buggy Tour', zh: '日落小镇观光车游览', ja: 'サンセットタウンのバギーツアー', ru: 'Тур на багги по Сансет-Тауну', hi: 'सनसेट टाउन बग्गी टूर', vi: 'Tour xe buggy tại Thị trấn Hoàng Hôn' },
    secondary: { ko: 'WhatsApp으로 문의', en: 'Ask on WhatsApp', zh: '通过 WhatsApp 咨询', ja: 'WhatsAppで問い合わせる', ru: 'Написать в WhatsApp', hi: 'WhatsApp पर पूछें', vi: 'Liên hệ qua WhatsApp' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m planning to visit "{name}". Can you help with transport / buggy tour?',
      ko: '안녕하세요 마이 푸꾸옥! "{name}"에 가 보려고 해요. 이동 수단이나 버기 투어를 도와주실 수 있나요?',
      zh: '你好 My Phu Quoc！我打算去“{name}”。可以帮我安排交通或观光车游览吗？',
      ru: 'Здравствуйте, My Phu Quoc! Я планирую посетить «{name}». Поможете с транспортом или туром на багги?',
      ja: 'こんにちは My Phu Quoc！「{name}」に行く予定です。移動手段やバギーツアーについて相談できますか？',
      hi: 'नमस्ते My Phu Quoc! मैं "{name}" जाने की योजना बना रहा/रही हूँ। क्या आप परिवहन / बग्गी टूर में मदद कर सकते हैं?',
      vi: 'Xin chào My Phu Quoc! Tôi dự định ghé "{name}". Bạn có thể hỗ trợ phương tiện di chuyển hoặc tour xe buggy không?',
    },
  },
  hotel: {
    eyebrow: { ko: '이동 안내', en: 'Transfers', zh: '接送服务', ja: '送迎サービス', ru: 'Трансферы', hi: 'ट्रांसफ़र सेवा', vi: 'Dịch vụ đưa đón' },
    headline: { ko: '공항 ↔ 선셋타운 픽업·샌딩', en: 'Airport ↔ Sunset Town Transfers', zh: '机场 ↔ 日落小镇接送', ja: '空港 ↔ サンセットタウン送迎', ru: 'Трансфер: аэропорт ↔ Сансет-Таун', hi: 'एयरपोर्ट ↔ सनसेट टाउन ट्रांसफ़र', vi: 'Đưa đón sân bay ↔ Thị trấn Hoàng Hôn' },
    body: {
      ko: '항공편 정보와 인원을 알려 주시면 이용 가능한 이동편을 안내해 드려요.',
      en: "Share your flight details and group size, and we'll help you find a suitable transfer.",
      zh: '请提供航班信息和出行人数，我们将协助您了解合适的接送服务。',
      ja: 'フライト情報とご利用人数をお知らせいただければ、適切な送迎サービスをご案内します。',
      ru: 'Сообщите данные рейса и количество пассажиров — мы поможем подобрать подходящий трансфер.',
      hi: 'अपनी फ़्लाइट की जानकारी और यात्रियों की संख्या बताएँ। हम आपके लिए उपयुक्त ट्रांसफ़र सेवा ढूँढने में मदद करेंगे।',
      vi: 'Hãy cho chúng tôi biết thông tin chuyến bay và số lượng khách để được tư vấn phương án đưa đón phù hợp.',
    },
    primary: { ko: '차량 투어 · 이동 서비스', en: 'Private Car Tours & Transfers', zh: '包车游览与接送服务', ja: '貸切車ツアー・送迎', ru: 'Автомобильные туры и трансферы', hi: 'निजी कार टूर और ट्रांसफ़र', vi: 'Tour xe riêng & Dịch vụ đưa đón' },
    secondary: { ko: 'WhatsApp으로 문의', en: 'Ask on WhatsApp', zh: '通过 WhatsApp 咨询', ja: 'WhatsAppで問い合わせる', ru: 'Написать в WhatsApp', hi: 'WhatsApp पर पूछें', vi: 'Liên hệ qua WhatsApp' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m staying at/near Sunset Town. I\'d like an airport pickup quote.',
      ko: '안녕하세요 마이 푸꾸옥! 선셋타운(또는 근처)에 묵을 예정이에요. 공항 픽업 견적을 받고 싶어요.',
      zh: '你好 My Phu Quoc！我将住在日落小镇或附近，想了解机场接送报价。',
      ru: 'Здравствуйте, My Phu Quoc! Я остановлюсь в Сансет-Тауне или рядом. Хочу узнать стоимость трансфера из аэропорта.',
      ja: 'こんにちは My Phu Quoc！サンセットタウンまたはその近くに滞在予定です。空港送迎の見積もりをお願いしたいです。',
      hi: 'नमस्ते My Phu Quoc! मैं सनसेट टाउन में या उसके पास ठहर रहा/रही हूँ। मुझे एयरपोर्ट पिकअप का कोट चाहिए।',
      vi: 'Xin chào My Phu Quoc! Tôi sẽ lưu trú tại/gần Thị trấn Hoàng Hôn và muốn nhận báo giá đưa đón sân bay.',
    },
  },
  news: {
    eyebrow: { en: 'Tonight', ko: '오늘 저녁', zh: '今晚', ru: 'Сегодня вечером', ja: '今夜', hi: 'आज शाम', vi: 'Tối nay' },
    headline: { en: 'Plan your evening in Sunset Town', ko: '선셋타운에서의 저녁을 계획해 보세요', zh: '规划您的日落小镇之夜', ru: 'Спланируйте вечер в Сансет-Тауне', ja: 'サンセットタウンの夜を計画しましょう', hi: 'सनसेट टाउन में अपनी शाम की योजना बनाएँ', vi: 'Lên kế hoạch buổi tối tại Thị trấn Hoàng Hôn' },
    body: {
      en: 'Hop on a buggy tour or browse ready-made themed itineraries.',
      ko: '버기 투어를 이용하시거나 테마별 추천 일정을 둘러보세요.',
      zh: '乘坐观光车，或浏览现成的主题行程。',
      ru: 'Прокатитесь на багги или выберите готовый тематический маршрут.',
      ja: 'バギーツアーに乗るか、テーマ別のモデルコースをご覧ください。',
      hi: 'बग्गी टूर लें या तैयार थीम वाले यात्रा कार्यक्रम देखें।',
      vi: 'Tham gia tour xe buggy hoặc xem các lịch trình gợi ý theo chủ đề.',
    },
    primary: { en: 'Buggy tour', ko: '버기 투어', zh: '观光车游览', ru: 'Тур на багги', ja: 'バギーツアー', hi: 'बग्गी टूर', vi: 'Tour xe buggy' },
    secondary: { en: 'Theme itineraries', ko: '테마별 일정', zh: '主题行程', ru: 'Тематические маршруты', ja: 'テーマ別コース', hi: 'थीम यात्रा कार्यक्रम', vi: 'Lịch trình theo chủ đề' },
  },
  zoneSunset: {
    eyebrow: { en: 'Sunset Town', ko: '선셋타운', zh: '日落小镇', ru: 'Сансет-Таун', ja: 'サンセットタウン', hi: 'सनसेट टाउन', vi: 'Thị trấn Hoàng Hôn' },
    headline: { en: 'See Sunset Town by buggy', ko: '버기로 선셋타운 둘러보기', zh: '乘观光车游览日落小镇', ru: 'Осмотрите Сансет-Таун на багги', ja: 'バギーでサンセットタウンを巡る', hi: 'बग्गी से सनसेट टाउन घूमें', vi: 'Khám phá Thị trấn Hoàng Hôn bằng xe buggy' },
    body: {
      en: 'Ride between the landmarks, or message us and we will help plan your visit.',
      ko: '주요 명소를 버기로 편하게 돌아보시거나, 메시지로 일정을 상담해 보세요.',
      zh: '乘观光车游览各大地标，或给我们留言，一起规划行程。',
      ru: 'Катайтесь между достопримечательностями или напишите нам — поможем спланировать визит.',
      ja: '主要スポットをバギーで巡るか、メッセージで訪問プランをご相談ください。',
      hi: 'प्रमुख स्थलों के बीच बग्गी से घूमें, या हमें संदेश भेजें — हम आपकी यात्रा की योजना बनाने में मदद करेंगे।',
      vi: 'Di chuyển bằng xe buggy giữa các điểm tham quan, hoặc nhắn tin để chúng tôi hỗ trợ lên lịch trình.',
    },
    primary: { en: 'Buggy tour', ko: '버기 투어', zh: '观光车游览', ru: 'Тур на багги', ja: 'バギーツアー', hi: 'बग्गी टूर', vi: 'Tour xe buggy' },
    secondary: { en: 'Ask on WhatsApp', ko: 'WhatsApp으로 문의', zh: '通过 WhatsApp 咨询', ja: 'WhatsAppで問い合わせる', ru: 'Написать в WhatsApp', hi: 'WhatsApp पर पूछें', vi: 'Liên hệ qua WhatsApp' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m planning a visit to Sunset Town. Can you help with a buggy tour?',
      ko: '안녕하세요 마이 푸꾸옥! 선셋타운 방문을 계획 중이에요. 버기 투어를 도와주실 수 있나요?',
      zh: '你好 My Phu Quoc！我打算去日落小镇，可以帮我安排观光车游览吗？',
      ru: 'Здравствуйте, My Phu Quoc! Планирую поездку в Сансет-Таун. Поможете с туром на багги?',
      ja: 'こんにちは My Phu Quoc！サンセットタウンへ行く予定です。バギーツアーについて相談できますか？',
      hi: 'नमस्ते My Phu Quoc! मैं सनसेट टाउन जाने की योजना बना रहा/रही हूँ। क्या आप बग्गी टूर में मदद कर सकते हैं?',
      vi: 'Xin chào My Phu Quoc! Tôi dự định ghé Thị trấn Hoàng Hôn. Bạn có thể hỗ trợ tour xe buggy không?',
    },
  },
  zoneKhem: {
    eyebrow: { en: 'Khem Beach', ko: '켐비치', zh: '凯姆海滩', ru: 'Пляж Кхем', ja: 'ケムビーチ', hi: 'खेम बीच', vi: 'Bãi Khem' },
    headline: { en: 'See Khem Beach by private vehicle', ko: '전용 차량으로 켐비치 가기', zh: '包车前往凯姆海滩', ru: 'На пляж Кхем на личном авто', ja: '専用車でケムビーチへ', hi: 'निजी वाहन से खेम बीच जाएँ', vi: 'Đi Bãi Khem bằng xe riêng' },
    body: {
      en: 'Book a vehicle tour or message us and we will help plan the trip.',
      ko: '차량 투어를 알아보시거나, 메시지로 이동 방법을 상담해 보세요.',
      zh: '预订包车游览，或给我们留言，一起规划行程。',
      ru: 'Закажите авто-тур или напишите нам — поможем спланировать поездку.',
      ja: '車両ツアーをご確認いただくか、メッセージで移動方法をご相談ください。',
      hi: 'वाहन टूर बुक करें, या हमें संदेश भेजें — हम यात्रा की योजना बनाने में मदद करेंगे।',
      vi: 'Đặt tour xe riêng hoặc nhắn tin để chúng tôi hỗ trợ phương tiện di chuyển.',
    },
    primary: { en: 'Vehicle tour', ko: '차량 투어', zh: '包车游览', ru: 'Авто-тур', ja: '車両ツアー', hi: 'वाहन टूर', vi: 'Tour xe riêng' },
    secondary: { en: 'Ask on WhatsApp', ko: 'WhatsApp으로 문의', zh: '通过 WhatsApp 咨询', ja: 'WhatsAppで問い合わせる', ru: 'Написать в WhatsApp', hi: 'WhatsApp पर पूछें', vi: 'Liên hệ qua WhatsApp' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m planning a visit to Khem Beach. Can you help with a vehicle tour?',
      ko: '안녕하세요 마이 푸꾸옥! 켐비치 방문을 계획 중이에요. 차량 투어를 도와주실 수 있나요?',
      zh: '你好 My Phu Quoc！我打算去凯姆海滩，可以帮我安排包车游览吗？',
      ru: 'Здравствуйте, My Phu Quoc! Планирую поездку на пляж Кхем. Поможете с авто-туром?',
      ja: 'こんにちは My Phu Quoc！ケムビーチへ行く予定です。車両ツアーについて相談できますか？',
      hi: 'नमस्ते My Phu Quoc! मैं खेम बीच जाने की योजना बना रहा/रही हूँ। क्या आप वाहन टूर में मदद कर सकते हैं?',
      vi: 'Xin chào My Phu Quoc! Tôi dự định đi Bãi Khem. Bạn có thể hỗ trợ tour xe riêng không?',
    },
  },
}
