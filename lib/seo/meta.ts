import type { Locale } from '@/lib/i18n/config'

type L = Record<string, string>
const pick = (m: L, locale: Locale) => m[locale] || m.en

/** Target keyword family: "Sunset Town Phu Quoc" per locale. */
export const SUNSET_KEYWORD: L = {
  en: 'Sunset Town Phu Quoc',
  ko: '푸꾸옥 선셋타운',
  zh: '富国岛日落小镇',
  ja: 'フーコック サンセットタウン',
  ru: 'Сансет Таун Фукуок',
  hi: 'सनसेट टाउन फू क्वोक',
}
export const sunsetKeyword = (locale: Locale) => pick(SUNSET_KEYWORD, locale)

export const BRAND: L = { en: 'My Phu Quoc', ko: '마이 푸꾸옥', zh: 'My Phu Quoc', ru: 'My Phu Quoc', ja: 'My Phu Quoc', hi: 'My Phu Quoc' }
export const brandName = (locale: Locale) => pick(BRAND, locale)

export const HOME_TITLE: L = {
  en: 'Sunset Town Phu Quoc Guide 2026 – Map, Fireworks, Hotels, Buggy Tour | My Phu Quoc',
  ko: '푸꾸옥 선셋타운 가이드 2026 – 지도·불꽃쇼·호텔·버기 투어 | 마이 푸꾸옥',
  zh: '富国岛日落小镇指南2026 – 地图·烟花·酒店·观光车 | My Phu Quoc',
  ru: 'Сансет Таун Фукуок 2026 – карта, салют, отели, багги | My Phu Quoc',
  ja: 'フーコック サンセットタウン案内2026 – 地図・花火・ホテル・バギー | My Phu Quoc',
  hi: 'सनसेट टाउन फू क्वोक गाइड 2026 – नक्शा, आतिशबाजी, होटल | My Phu Quoc',
}

export const HOME_DESCRIPTION: L = {
  en: 'Sunset Town Phu Quoc guide: map, Kiss Bridge, fireworks show (check official schedule), hotels, dining and buggy tours.',
  ko: '푸꾸옥 선셋타운 가이드: 지도, 키스브릿지, 불꽃쇼(공식 일정 확인), 호텔, 맛집, 버기 투어를 한곳에서.',
  zh: '富国岛日落小镇指南：地图、亲吻桥、烟花表演（以官方公告为准）、酒店、美食与观光车游览。',
  ru: 'Сансет Таун Фукуок: карта, Мост поцелуев, салют (расписание уточняйте), отели, рестораны и багги-туры.',
  ja: 'フーコック サンセットタウン案内：地図、キスブリッジ、花火ショー（日程は公式案内）、ホテル、グルメ、バギーツアー。',
  hi: 'सनसेट टाउन फू क्वोक गाइड: नक्शा, किस ब्रिज, आतिशबाजी शो (आधिकारिक समय देखें), होटल, रेस्तरां और बग्गी टूर।',
}

export const MAP_TITLE: L = {
  en: 'Sunset Town Phu Quoc Map – 12 Landmarks, Kiss Bridge & Cable Car | My Phu Quoc',
  ko: '푸꾸옥 선셋타운 지도 – 12대 명소·키스브릿지·케이블카 | 마이 푸꾸옥',
  zh: '富国岛日落小镇地图 – 12大景点·亲吻桥·缆车 | My Phu Quoc',
  ru: 'Карта Сансет Таун Фукуок – 12 мест, Мост поцелуев | My Phu Quoc',
  ja: 'フーコック サンセットタウン地図 – 12大名所・キスブリッジ | My Phu Quoc',
  hi: 'सनसेट टाउन फू क्वोक नक्शा – 12 प्रमुख स्थल | My Phu Quoc',
}
export const MAP_DESCRIPTION: L = {
  en: 'Illustrated Sunset Town Phu Quoc map: Kiss Bridge, Clock Tower, cable car station, Vui-Fest Bazaar and 12 key landmarks with tips.',
  ko: '푸꾸옥 선셋타운 일러스트 지도: 키스브릿지, 시계탑, 케이블카역, 부이페스트 야시장 등 12대 명소와 관람 팁.',
  zh: '富国岛日落小镇手绘地图：亲吻桥、钟楼、缆车站、Vui-Fest夜市等12大景点位置与游览贴士。',
  ru: 'Карта Сансет Таун Фукуок: Мост поцелуев, часовая башня, канатная дорога, Vui-Fest и 12 главных мест с советами.',
  ja: 'フーコック サンセットタウンのイラストマップ：キスブリッジ、時計塔、ロープウェイ駅など12大名所をご案内。',
  hi: 'सनसेट टाउन फू क्वोक का सचित्र नक्शा: किस ब्रिज, क्लॉक टावर, केबल कार स्टेशन और 12 प्रमुख स्थल।',
}

export const HOME_FAQ_Q: Record<'distance' | 'fireworks' | 'cable' | 'bridge', L> = {
  distance: {
    en: 'How far is Sunset Town from Khem Beach?',
    ko: '선셋타운에서 켐비치까지 얼마나 걸리나요?',
    zh: '日落小镇到Khem Beach（坎海滩）有多远？',
    ru: 'Сколько ехать от Сансет Тауна до Khem Beach?',
    ja: 'サンセットタウンからケムビーチまでの所要時間は？',
    hi: 'सनसेट टाउन से Khem Beach कितनी दूर है?',
  },
  fireworks: {
    en: 'When is the Sunset Town fireworks show?',
    ko: '선셋타운 불꽃쇼는 언제 하나요?',
    zh: '日落小镇的烟花秀什么时候举行？',
    ru: 'Когда проходит шоу с салютом в Сансет Тауне?',
    ja: 'サンセットタウンの花火ショーはいつ？',
    hi: 'सनसेट टाउन में आतिशबाजी शो कब होता है?',
  },
  cable: {
    en: 'How long is the Hon Thom cable car?',
    ko: '혼똠섬 케이블카는 얼마나 긴가요?',
    zh: '香岛缆车有多长？',
    ru: 'Какова длина канатной дороги на Хон Тхом?',
    ja: 'ホントム島ケーブルカーの長さは？',
    hi: 'होन थॉम केबल कार कितनी लंबी है?',
  },
  bridge: {
    en: 'What is Kiss Bridge in Sunset Town?',
    ko: '선셋타운 키스브릿지는 어떤 곳인가요?',
    zh: '日落小镇的亲吻桥是什么？',
    ru: 'Что такое Мост поцелуев в Сансет Тауне?',
    ja: 'サンセットタウンのキスブリッジとは？',
    hi: 'सनसेट टाउन का किस ब्रिज क्या है?',
  },
}

/** Hard-limit a meta description to ~155 chars on a word/char boundary. */
export function clip(text: string, max = 155): string {
  const t = (text || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1).replace(/[\s,.;:、，。]+\S*$/, '') + '…'
}

/** Ensure the keyword appears in a description. */
export function withKeyword(desc: string, locale: Locale, max = 155): string {
  const kw = sunsetKeyword(locale)
  const d = (desc || '').trim()
  if (d.includes(kw)) return clip(d, max)
  return clip(`${kw} – ${d}`, max)
}

export const ZONE_TITLE: Record<'sunset-town' | 'khem-beach', L> = {
  'sunset-town': {
    en: 'Sunset Town Phu Quoc Guide – Kiss Bridge, Fireworks, Dining | My Phu Quoc',
    ko: '푸꾸옥 선셋타운 가이드 – 키스브릿지·불꽃쇼·맛집 | 마이 푸꾸옥',
    zh: '富国岛日落小镇指南 – 亲吻桥·烟花·美食 | My Phu Quoc',
    ru: 'Сансет Таун Фукуок – Мост поцелуев, салют, кафе | My Phu Quoc',
    ja: 'フーコック サンセットタウン案内 – キスブリッジ・花火 | My Phu Quoc',
    hi: 'सनसेट टाउन फू क्वोक गाइड – किस ब्रिज, आतिशबाजी | My Phu Quoc',
  },
  'khem-beach': {
    en: 'Khem Beach Phu Quoc Guide – Resorts, Beach & Dining | My Phu Quoc',
    ko: '푸꾸옥 켐비치 가이드 – 리조트·해변·맛집 | 마이 푸꾸옥',
    zh: '富国岛Khem海滩指南 – 度假村·海滩·美食 | My Phu Quoc',
    ru: 'Пляж Кхем Фукуок – курорты, пляж, кафе | My Phu Quoc',
    ja: 'フーコック ケムビーチ案内 – リゾート・ビーチ・グルメ | My Phu Quoc',
    hi: 'खेम बीच फू क्वोक गाइड – रिसॉर्ट, बीच, रेस्तरां | My Phu Quoc',
  },
}

export const ZONE_KEYWORD: Record<'sunset-town' | 'khem-beach', L> = {
  'sunset-town': SUNSET_KEYWORD,
  'khem-beach': {
    en: 'Khem Beach Phu Quoc',
    ko: '푸꾸옥 켐비치',
    zh: '富国岛Khem海滩',
    ru: 'Пляж Кхем Фукуок',
    ja: 'フーコック ケムビーチ',
    hi: 'खेम बीच फू क्वोक',
  },
}

/** Generic keyword-led description fallback for pages that have none. */
export function withZoneKeyword(desc: string, slug: 'sunset-town' | 'khem-beach', locale: Locale, max = 155): string {
  const kw = pick(ZONE_KEYWORD[slug], locale)
  const d = (desc || '').trim()
  if (d.includes(kw) || (slug === 'sunset-town' && d.includes('Sunset Town')) || (slug === 'khem-beach' && /Khem|켐비치/.test(d))) return clip(d, max)
  return clip(`${kw} – ${d}`, max)
}

export const HOTELS_TITLE: Record<'sunset-town' | 'khem-beach', L> = {
  'sunset-town': {
    en: 'Sunset Town Phu Quoc Hotels & Resorts – Compare Stays | My Phu Quoc',
    ko: '푸꾸옥 선셋타운 호텔·리조트 비교 | 마이 푸꾸옥',
    zh: '富国岛日落小镇酒店与度假村一览 | My Phu Quoc',
    ru: 'Отели и курорты Сансет Таун Фукуок – сравнение | My Phu Quoc',
    ja: 'フーコック サンセットタウンのホテル・リゾート比較 | My Phu Quoc',
    hi: 'सनसेट टाउन फू क्वोक होटल व रिसॉर्ट – तुलना | My Phu Quoc',
  },
  'khem-beach': {
    en: 'Khem Beach Phu Quoc Resorts & Hotels – Compare Stays | My Phu Quoc',
    ko: '푸꾸옥 켐비치 리조트·호텔 비교 | 마이 푸꾸옥',
    zh: '富国岛Khem海滩度假村与酒店一览 | My Phu Quoc',
    ru: 'Курорты и отели пляжа Кхем Фукуок – сравнение | My Phu Quoc',
    ja: 'フーコック ケムビーチのリゾート・ホテル比較 | My Phu Quoc',
    hi: 'खेम बीच फू क्वोक रिसॉर्ट व होटल – तुलना | My Phu Quoc',
  },
}

export const TOUR_TITLE: Record<'buggy' | 'taxi', L> = {
  buggy: {
    en: 'Sunset Town Buggy Tour Phu Quoc – Fixed Courses | My Phu Quoc',
    ko: '푸꾸옥 선셋타운 버기 투어 | 마이 푸꾸옥',
    zh: '富国岛日落小镇观光电瓶车游览 | My Phu Quoc',
    ru: 'Багги-тур по Сансет Тауну, Фукуок | My Phu Quoc',
    ja: 'フーコック サンセットタウン バギーツアー | My Phu Quoc',
    hi: 'सनसेट टाउन बग्गी टूर, फू क्वोक | My Phu Quoc',
  },
  taxi: {
    en: 'Vehicle Tour Phu Quoc – Private Car & Custom Route | My Phu Quoc',
    ko: '푸꾸옥 차량 투어 – 전용 차량·맞춤 코스 | 마이 푸꾸옥',
    zh: '富国岛出租车包车游览 | My Phu Quoc',
    ru: 'Тур на такси по Фукуоку | My Phu Quoc',
    ja: 'フーコック タクシーツアー | My Phu Quoc',
    hi: 'फू क्वोक टैक्सी टूर | My Phu Quoc',
  },
}

/** Directory list title: "{category} in Sunset Town Phu Quoc & Khem Beach | My Phu Quoc" per locale. */
export function directoryTitle(label: string, locale: Locale): string {
  switch (locale) {
    case 'ko': return `푸꾸옥 선셋타운·켐비치 ${label} | 마이 푸꾸옥`
    case 'zh': return `富国岛日落小镇·Khem海滩${label} | My Phu Quoc`
    case 'ru': return `${label}: Сансет Таун и Кхем, Фукуок | My Phu Quoc`
    case 'ja': return `フーコック サンセットタウン・ケムビーチの${label} | My Phu Quoc`
    case 'hi': return `${label}: सनसेट टाउन और खेम बीच, फू क्वोक | My Phu Quoc`
    default: return `${label} in Sunset Town Phu Quoc & Khem Beach | My Phu Quoc`
  }
}

export const NEWS_TITLE: L = {
  en: 'Sunset Town Phu Quoc News, Events & Local Guides | My Phu Quoc',
  ko: '푸꾸옥 선셋타운 뉴스·생활 가이드 | 마이 푸꾸옥',
  zh: '富国岛日落小镇新闻与生活指南 | My Phu Quoc',
  ru: 'Сансет Таун Фукуок: новости и гиды | My Phu Quoc',
  ja: 'フーコック サンセットタウン ニュース・ガイド | My Phu Quoc',
  hi: 'सनसेट टाउन फू क्वोक समाचार व गाइड | My Phu Quoc',
}

/** Keep the real description first and append the keyword if it is missing (total <= max). */
export function withKeywordSuffix(desc: string, keyword: string, max = 155): string {
  const d = (desc || '').replace(/\s+/g, ' ').trim()
  if (!d) return clip(keyword, max)
  if (d.includes(keyword)) return clip(d, max)
  const suffix = ` – ${keyword}`
  if (d.length + suffix.length <= max) return d + suffix
  return clip(d, max - suffix.length) + suffix
}

/** "{name} – {category} in Sunset Town Phu Quoc | My Phu Quoc" per locale. */
export function businessTitle(name: string, category: string, locale: Locale, isKhem: boolean): string {
  const place = isKhem ? pick(ZONE_KEYWORD['khem-beach'], locale) : pick(SUNSET_KEYWORD, locale)
  switch (locale) {
    case 'ko': return `${name} – ${place} ${category} | 마이 푸꾸옥`
    case 'zh': return `${name} – ${place}${category} | My Phu Quoc`
    case 'ru': return `${name} – ${category}, ${place} | My Phu Quoc`
    case 'ja': return `${name} – ${place}の${category} | My Phu Quoc`
    case 'hi': return `${name} – ${place} में ${category} | My Phu Quoc`
    default: return `${name} – ${category} in ${place} | My Phu Quoc`
  }
}
