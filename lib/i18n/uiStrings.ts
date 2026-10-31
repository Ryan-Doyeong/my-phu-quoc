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
