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
 * 번역 상태: en은 원문, ko/zh/ru/ja/hi는 "ChatGPT 검수 대기".
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
}

export const FLOATING_CONTACT_LABELS = {
  open: {
    en: 'Contact us', ko: '문의하기', zh: '联系我们', ru: 'Связаться', ja: 'お問い合わせ', hi: 'संपर्क करें',
  } as LocaleMap,
  close: {
    en: 'Close', ko: '닫기', zh: '关闭', ru: 'Закрыть', ja: '閉じる', hi: 'बंद करें',
  } as LocaleMap,
  call: {
    en: 'Call', ko: '전화', zh: '电话', ru: 'Звонок', ja: '電話', hi: 'कॉल',
  } as LocaleMap,
}

export const HERO_IMAGE_ALT: LocaleMap = {
  en: 'Aerial view of Kiss Bridge and Sunset Town, Phu Quoc at sunset',
  ko: '석양 무렵 푸꾸옥 선셋타운과 키스브릿지 항공 전경',
  zh: '日落时分富国岛日落小镇与之吻桥的航拍全景',
  ru: 'Вид с воздуха на Мост поцелуев и Sunset Town на острове Фукуок на закате',
  ja: '夕暮れのフーコック島サンセットタウンとキスブリッジの空撮',
  hi: 'सूर्यास्त के समय फु क्वोक के सनसेट टाउन और किस ब्रिज का हवाई दृश्य',
}

/** One-line sub-labels for the home quick service cards. */
export const QUICK_CARD_SUBLABELS: Record<string, LocaleMap> = {
  exchange: {
    en: 'Coming soon', ko: '준비 중', zh: '即将推出', ru: 'Скоро', ja: '近日公開', hi: 'जल्द आ रहा है',
  },
  buggy: {
    en: 'Up to 8 pax · Photo stops', ko: '최대 8인 · 포토 스팟', zh: '最多8人 · 拍照点', ru: 'До 8 чел. · Фото-остановки', ja: '最大8名 · フォトスポット', hi: '8 लोगों तक · फोटो स्टॉप',
  },
  taxi: {
    en: 'Private car · Custom route', ko: '전용 차량 · 맞춤 코스', zh: '专车 · 定制路线', ru: 'Личное авто · Свой маршрут', ja: '専用車 · カスタムルート', hi: 'निजी कार · अपना रूट',
  },
  events: {
    en: 'Fireworks & shows', ko: '불꽃놀이 · 공연', zh: '烟花与演出', ru: 'Фейерверки и шоу', ja: '花火とショー', hi: 'आतिशबाज़ी और शो',
  },
  activities: {
    en: 'Yacht · Island · Sea', ko: '요트 · 섬 · 바다', zh: '游艇 · 海岛 · 海上', ru: 'Яхты · Острова · Море', ja: 'ヨット · 島 · 海', hi: 'याच · द्वीप · समुद्र',
  },
  emergency: {
    en: 'Hospitals & pharmacies', ko: '병원 · 약국', zh: '医院与药店', ru: 'Больницы и аптеки', ja: '病院・薬局', hi: 'अस्पताल और फार्मेसी',
  },
  itineraries: {
    en: 'Couples · Family · Friends', ko: '커플 · 가족 · 친구', zh: '情侣 · 家庭 · 朋友', ru: 'Пары · Семья · Друзья', ja: 'カップル · 家族 · 友人', hi: 'जोड़े · परिवार · दोस्त',
  },
}

/** 상단 메뉴 구역 라벨 (ko 확정; zh/ru/ja/hi 2026-10-31 초안 — ChatGPT 검수 대기) */
export const NAV_ZONE_LABELS: { sunset: Record<string, string>; khem: Record<string, string> } = {
  sunset: { ko: '선셋타운', en: 'Sunset Town', zh: '日落小镇', ru: 'Сансет Таун', ja: 'サンセットタウン', hi: 'सनसेट टाउन' },
  khem: { ko: '켐비치', en: 'Khem Beach', zh: '肯海滩', ru: 'Пляж Кхем', ja: 'ケムビーチ', hi: 'खेम बीच' },
}

// ---------------------------------------------------------------------------
// 맥락형 전환 CTA (components/ContextCta.tsx) — ko 원본, en/zh/ru/ja/hi 초안 2026-10-31
// ChatGPT 검수 대기. 가격·소요시간 등 미확인 수치는 넣지 않는다.
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

// ChatGPT 검수 대기
export const CONTEXT_CTA_STRINGS: Record<ContextCtaKey, ContextCtaCopy> = {
  business: {
    eyebrow: { en: 'Getting there', ko: '가는 방법', zh: '前往方式', ru: 'Как добраться', ja: '行き方', hi: 'कैसे पहुँचें' },
    headline: { en: 'Heading here tonight?', ko: '오늘 저녁 여기로 가시나요?', zh: '今晚要去这里吗？', ru: 'Едете сюда сегодня вечером?', ja: '今夜はここに行きますか？', hi: 'आज शाम यहाँ जा रहे हैं?' },
    body: {
      en: 'Ride in by buggy, or message us and we will help you plan the transport.',
      ko: '버기로 편하게 이동하시거나, 메시지를 남기시면 이동 방법을 함께 안내해 드려요.',
      zh: '可以乘坐观光车前往，也可以给我们留言，我们帮您安排交通。',
      ru: 'Доберитесь на багги или напишите нам — поможем спланировать поездку.',
      ja: 'バギーで移動することも、メッセージで移動手段をご相談いただくこともできます。',
      hi: 'बग्गी से जाएँ, या हमें संदेश भेजें — हम आपकी यात्रा की योजना बनाने में मदद करेंगे।',
    },
    primary: { en: 'Buggy tour to Sunset Town', ko: '선셋타운 버기 투어', zh: '日落小镇观光车之旅', ru: 'Тур на багги по Сансет Таун', ja: 'サンセットタウン バギーツアー', hi: 'सनसेट टाउन बग्गी टूर' },
    secondary: { en: 'Ask on WhatsApp', ko: 'WhatsApp으로 문의', zh: '通过 WhatsApp 咨询', ru: 'Спросить в WhatsApp', ja: 'WhatsAppで問い合わせ', hi: 'WhatsApp पर पूछें' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m planning to visit "{name}". Can you help with transport / buggy tour?',
      ko: '안녕하세요 마이 푸꾸옥! "{name}"에 가 보려고 해요. 이동 수단이나 버기 투어를 도와주실 수 있나요?',
      zh: '你好 My Phu Quoc！我打算去“{name}”。可以帮我安排交通或观光车之旅吗？',
      ru: 'Здравствуйте, My Phu Quoc! Я планирую посетить «{name}». Поможете с транспортом или туром на багги?',
      ja: 'こんにちは My Phu Quoc！「{name}」に行く予定です。移動手段やバギーツアーについて相談できますか？',
      hi: 'नमस्ते My Phu Quoc! मैं "{name}" जाने की योजना बना रहा/रही हूँ। क्या आप परिवहन / बग्गी टूर में मदद कर सकते हैं?',
    },
  },
  hotel: {
    eyebrow: { en: 'Transfers', ko: '이동 안내', zh: '接送', ru: 'Трансферы', ja: '送迎', hi: 'ट्रांसफ़र' },
    headline: { en: 'Airport ↔ Sunset Town pickup', ko: '공항 ↔ 선셋타운 픽업', zh: '机场 ↔ 日落小镇接送', ru: 'Трансфер аэропорт ↔ Сансет Таун', ja: '空港 ↔ サンセットタウン 送迎', hi: 'एयरपोर्ट ↔ सनसेट टाउन पिकअप' },
    body: {
      en: 'Tell us your flight and group size and we will arrange the ride.',
      ko: '항공편과 인원을 알려 주시면 이동편을 안내해 드려요.',
      zh: '告诉我们航班和人数，我们为您安排接送。',
      ru: 'Сообщите рейс и количество человек — мы организуем трансфер.',
      ja: 'フライトと人数をお知らせいただければ、送迎をご案内します。',
      hi: 'अपनी फ़्लाइट और समूह का आकार बताइए, हम सवारी की व्यवस्था करेंगे।',
    },
    primary: { en: 'Vehicle tour & transfer', ko: '차량 투어 · 이동', zh: '包车游览与接送', ru: 'Авто-тур и трансфер', ja: '車両ツアー・送迎', hi: 'वाहन टूर और ट्रांसफ़र' },
    secondary: { en: 'Ask on WhatsApp', ko: 'WhatsApp으로 문의', zh: '通过 WhatsApp 咨询', ru: 'Спросить в WhatsApp', ja: 'WhatsAppで問い合わせ', hi: 'WhatsApp पर पूछें' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m staying at/near Sunset Town. I\'d like an airport pickup quote.',
      ko: '안녕하세요 마이 푸꾸옥! 선셋타운(또는 근처)에 묵을 예정이에요. 공항 픽업 견적을 받고 싶어요.',
      zh: '你好 My Phu Quoc！我将住在日落小镇或附近，想了解机场接送报价。',
      ru: 'Здравствуйте, My Phu Quoc! Я остановлюсь в Сансет Таун или рядом. Хочу узнать стоимость трансфера из аэропорта.',
      ja: 'こんにちは My Phu Quoc！サンセットタウンまたはその近くに滞在予定です。空港送迎の見積もりをお願いしたいです。',
      hi: 'नमस्ते My Phu Quoc! मैं सनसेट टाउन में या उसके पास ठहर रहा/रही हूँ। मुझे एयरपोर्ट पिकअप का कोट चाहिए।',
    },
  },
  news: {
    eyebrow: { en: 'Tonight', ko: '오늘 저녁', zh: '今晚', ru: 'Сегодня вечером', ja: '今夜', hi: 'आज शाम' },
    headline: { en: 'Plan your evening in Sunset Town', ko: '선셋타운에서의 저녁을 계획해 보세요', zh: '规划您的日落小镇之夜', ru: 'Спланируйте вечер в Сансет Таун', ja: 'サンセットタウンの夜を計画しましょう', hi: 'सनसेट टाउन में अपनी शाम की योजना बनाएँ' },
    body: {
      en: 'Hop on a buggy tour or browse ready-made themed itineraries.',
      ko: '버기 투어를 이용하시거나 테마별 추천 일정을 둘러보세요.',
      zh: '乘坐观光车，或浏览现成的主题行程。',
      ru: 'Прокатитесь на багги или выберите готовый тематический маршрут.',
      ja: 'バギーツアーに乗るか、テーマ別のモデルコースをご覧ください。',
      hi: 'बग्गी टूर लें या तैयार थीम वाले यात्रा कार्यक्रम देखें।',
    },
    primary: { en: 'Buggy tour', ko: '버기 투어', zh: '观光车之旅', ru: 'Тур на багги', ja: 'バギーツアー', hi: 'बग्गी टूर' },
    secondary: { en: 'Theme itineraries', ko: '테마별 일정', zh: '主题行程', ru: 'Тематические маршруты', ja: 'テーマ別コース', hi: 'थीम यात्रा कार्यक्रम' },
  },
  zoneSunset: {
    eyebrow: { en: 'Sunset Town', ko: '선셋타운', zh: '日落小镇', ru: 'Сансет Таун', ja: 'サンセットタウン', hi: 'सनसेट टाउन' },
    headline: { en: 'See Sunset Town by buggy', ko: '버기로 선셋타운 둘러보기', zh: '乘观光车游览日落小镇', ru: 'Осмотрите Сансет Таун на багги', ja: 'バギーでサンセットタウンを巡る', hi: 'बग्गी से सनसेट टाउन घूमें' },
    body: {
      en: 'Ride between the landmarks, or message us and we will help plan your visit.',
      ko: '주요 명소를 버기로 편하게 돌아보시거나, 메시지로 일정을 상담해 보세요.',
      zh: '乘观光车游览各大地标，或给我们留言，一起规划行程。',
      ru: 'Катайтесь между достопримечательностями или напишите нам — поможем спланировать визит.',
      ja: '主要スポットをバギーで巡るか、メッセージで訪問プランをご相談ください。',
      hi: 'प्रमुख स्थलों के बीच बग्गी से घूमें, या हमें संदेश भेजें — हम आपकी यात्रा की योजना बनाने में मदद करेंगे।',
    },
    primary: { en: 'Buggy tour', ko: '버기 투어', zh: '观光车之旅', ru: 'Тур на багги', ja: 'バギーツアー', hi: 'बग्गी टूर' },
    secondary: { en: 'Ask on WhatsApp', ko: 'WhatsApp으로 문의', zh: '通过 WhatsApp 咨询', ru: 'Спросить в WhatsApp', ja: 'WhatsAppで問い合わせ', hi: 'WhatsApp पर पूछें' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m planning a visit to Sunset Town. Can you help with a buggy tour?',
      ko: '안녕하세요 마이 푸꾸옥! 선셋타운 방문을 계획 중이에요. 버기 투어를 도와주실 수 있나요?',
      zh: '你好 My Phu Quoc！我打算去日落小镇，可以帮我安排观光车之旅吗？',
      ru: 'Здравствуйте, My Phu Quoc! Планирую поездку в Сансет Таун. Поможете с туром на багги?',
      ja: 'こんにちは My Phu Quoc！サンセットタウンへ行く予定です。バギーツアーについて相談できますか？',
      hi: 'नमस्ते My Phu Quoc! मैं सनसेट टाउन जाने की योजना बना रहा/रही हूँ। क्या आप बग्गी टूर में मदद कर सकते हैं?',
    },
  },
  zoneKhem: {
    eyebrow: { en: 'Khem Beach', ko: '켐비치', zh: '肯海滩', ru: 'Пляж Кхем', ja: 'ケムビーチ', hi: 'खेम बीच' },
    headline: { en: 'See Khem Beach by private vehicle', ko: '전용 차량으로 켐비치 가기', zh: '包车前往肯海滩', ru: 'На пляж Кхем на личном авто', ja: '専用車でケムビーチへ', hi: 'निजी वाहन से खेम बीच जाएँ' },
    body: {
      en: 'Book a vehicle tour or message us and we will help plan the trip.',
      ko: '차량 투어를 알아보시거나, 메시지로 이동 방법을 상담해 보세요.',
      zh: '预订包车游览，或给我们留言，一起规划行程。',
      ru: 'Закажите авто-тур или напишите нам — поможем спланировать поездку.',
      ja: '車両ツアーをご確認いただくか、メッセージで移動方法をご相談ください。',
      hi: 'वाहन टूर बुक करें, या हमें संदेश भेजें — हम यात्रा की योजना बनाने में मदद करेंगे।',
    },
    primary: { en: 'Vehicle tour', ko: '차량 투어', zh: '包车游览', ru: 'Авто-тур', ja: '車両ツアー', hi: 'वाहन टूर' },
    secondary: { en: 'Ask on WhatsApp', ko: 'WhatsApp으로 문의', zh: '通过 WhatsApp 咨询', ru: 'Спросить в WhatsApp', ja: 'WhatsAppで問い合わせ', hi: 'WhatsApp पर पूछें' },
    prefill: {
      en: 'Hi My Phu Quoc! I\'m planning a visit to Khem Beach. Can you help with a vehicle tour?',
      ko: '안녕하세요 마이 푸꾸옥! 켐비치 방문을 계획 중이에요. 차량 투어를 도와주실 수 있나요?',
      zh: '你好 My Phu Quoc！我打算去肯海滩，可以帮我安排包车游览吗？',
      ru: 'Здравствуйте, My Phu Quoc! Планирую поездку на пляж Кхем. Поможете с авто-туром?',
      ja: 'こんにちは My Phu Quoc！ケムビーチへ行く予定です。車両ツアーについて相談できますか？',
      hi: 'नमस्ते My Phu Quoc! मैं खेम बीच जाने की योजना बना रहा/रही हूँ। क्या आप वाहन टूर में मदद कर सकते हैं?',
    },
  },
}
