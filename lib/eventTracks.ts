import type { Locale } from '@/lib/i18n/config'

export type EventTrack = 'south' | 'island'
export type HighlightFilter = 'all' | 'ongoing' | 'upcoming' | 'weekend'

/**
 * 트랙 분류: 선셋타운·남부 관련 키워드가 제목/장소/태그/슬러그에 있으면 트랙 1(south),
 * 그 외는 트랙 2(푸꾸옥 전역, island).
 */
const SOUTH_RE =
  /sunset|선셋|hon\s?thom|hòn\s?thơm|혼텀|kiss|키스|symphony|심포니|khem|켐|sun\s?world|선월드|sun\s?phu\s?quoc|선\s?푸꾸옥|an\s?thoi|안터이|nam\s?dao|thị\s?trấn\s?hoàng\s?hôn/i

export function getEventTrack(item: {
  slug?: string | null
  title?: string | null
  title_en?: string | null
  title_ko?: string | null
  event_location?: string | null
  tags?: string[] | null
}): EventTrack {
  const blob = [item.slug, item.title, item.title_en, item.title_ko, item.event_location, ...(item.tags || [])]
    .filter(Boolean)
    .join(' ')
  return SOUTH_RE.test(blob) ? 'south' : 'island'
}

/** 베트남 시간(UTC+7) 기준 이번 주말(토 00:00 ~ 일 23:59:59) 범위 */
export function getWeekendRange(now: Date = new Date()): { start: Date; end: Date } {
  const vn = new Date(now.getTime() + 7 * 3600 * 1000)
  const dow = vn.getUTCDay() // 0=일 ... 6=토
  const daysToSat = dow === 0 ? -1 : 6 - dow
  const satUtcMidnightVn = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth(), vn.getUTCDate() + daysToSat)
  const start = new Date(satUtcMidnightVn - 7 * 3600 * 1000)
  const end = new Date(start.getTime() + 2 * 24 * 3600 * 1000 - 1000)
  return { start, end }
}

export function overlapsWeekend(startRaw?: string | null, endRaw?: string | null, now: Date = new Date()): boolean {
  const { start, end } = getWeekendRange(now)
  const s = startRaw ? new Date(startRaw) : null
  const e = endRaw ? new Date(endRaw) : s
  if (s && !Number.isNaN(s.getTime()) && s.getTime() > end.getTime()) return false
  if (e && !Number.isNaN(e.getTime()) && e.getTime() < start.getTime()) return false
  return true
}

export interface EventHubLabels {
  eyebrow: string
  title: string
  lead: string
  track1Tag: string
  track1Title: string
  track1Desc: string
  track2Tag: string
  track2Title: string
  track2Desc: string
  hlEyebrow: string
  hlTitle: string
  chipAll: string
  chipOngoing: string
  chipUpcoming: string
  chipWeekend: string
  topLabel: string
  noHighlights: string
  moreTitle: string
  pastTitle: string
  ctaTitle: string
  ctaDesc: string
  ctaBtn: string
  homeEyebrow: string
  homeMore: string
}

export const EVENT_HUB_LABELS: Record<Locale, EventHubLabels> = {
  ko: {
    eyebrow: "WHAT'S ON",
    title: '푸꾸옥 이벤트 소식',
    lead: '선셋타운의 공연·혜택부터 푸꾸옥 곳곳의 축제까지, 지금 진행 중이거나 곧 열리는 소식만 모았습니다.',
    track1Tag: '트랙 1 · 선셋타운·남부',
    track1Title: '1) 선셋타운·남부 공연 & 혜택',
    track1Desc: '심포니·키스 오브 더 씨, 선셋타운 호텔·리조트 혜택 등 남부 소식입니다.',
    track2Tag: '트랙 2 · 푸꾸옥 전역',
    track2Title: '2) 푸꾸옥 축제 & 지역 행사',
    track2Desc: '북·중부를 포함한 푸꾸옥 전역의 축제, 대회, 문화 행사입니다.',
    hlEyebrow: '진행·예정',
    hlTitle: '지금 주목할 이벤트 TOP 3',
    chipAll: '전체',
    chipOngoing: '진행중',
    chipUpcoming: '예정',
    chipWeekend: '이번 주말',
    topLabel: 'TOP',
    noHighlights: '조건에 맞는 진행·예정 이벤트가 없습니다.',
    moreTitle: '더 많은 이벤트',
    pastTitle: '지난 이벤트',
    ctaTitle: '푸꾸옥 행사·프로모션 소식이 있으신가요?',
    ctaDesc: '제보해 주시면 확인 후 이벤트 소식에 반영합니다.',
    ctaBtn: '제보·문의하기 →',
    homeEyebrow: 'SUNSET TOWN & PHU QUOC EVENTS',
    homeMore: '더보기 →',
  },
  en: {
    eyebrow: "WHAT'S ON",
    title: 'Phu Quoc Events & News',
    lead: 'From Sunset Town shows and offers to festivals across Phu Quoc — only what is on now or coming up soon.',
    track1Tag: 'TRACK 1 · SUNSET TOWN & SOUTH',
    track1Title: '1) Sunset Town & South: Shows & Offers',
    track1Desc: 'Symphony and Kiss of the Sea, plus hotel and resort offers around Sunset Town.',
    track2Tag: 'TRACK 2 · ISLAND-WIDE',
    track2Title: '2) Phu Quoc Festivals & Local Events',
    track2Desc: 'Festivals, races and cultural events across the island, including the north and centre.',
    hlEyebrow: 'ONGOING & UPCOMING',
    hlTitle: 'Latest 3 Active Highlights',
    chipAll: 'All Active',
    chipOngoing: 'Ongoing',
    chipUpcoming: 'Upcoming',
    chipWeekend: 'This Weekend',
    topLabel: 'TOP',
    noHighlights: 'No ongoing or upcoming events match this filter.',
    moreTitle: 'More Events',
    pastTitle: 'Past Events',
    ctaTitle: 'Know of a Phu Quoc event or promotion?',
    ctaDesc: 'Send us a tip and we will review it before adding it here.',
    ctaBtn: 'Send a tip →',
    homeEyebrow: 'SUNSET TOWN & PHU QUOC EVENTS',
    homeMore: 'More →',
  },
  vi: {
    eyebrow: 'ĐANG DIỄN RA',
    title: 'Sự kiện & Tin tức Phú Quốc',
    lead: 'Từ các show và ưu đãi tại Thị trấn Hoàng Hôn đến lễ hội khắp Phú Quốc — chỉ những sự kiện đang và sắp diễn ra.',
    track1Tag: 'MỤC 1 · HOÀNG HÔN & NAM ĐẢO',
    track1Title: '1) Hoàng Hôn & Nam đảo: Show & Ưu đãi',
    track1Desc: 'Symphony, Kiss of the Sea và ưu đãi khách sạn, resort quanh Thị trấn Hoàng Hôn.',
    track2Tag: 'MỤC 2 · TOÀN ĐẢO',
    track2Title: '2) Lễ hội & Sự kiện địa phương Phú Quốc',
    track2Desc: 'Lễ hội, giải đấu và sự kiện văn hóa khắp đảo, gồm cả phía bắc và trung tâm.',
    hlEyebrow: 'ĐANG & SẮP DIỄN RA',
    hlTitle: '3 sự kiện nổi bật',
    chipAll: 'Tất cả',
    chipOngoing: 'Đang diễn ra',
    chipUpcoming: 'Sắp diễn ra',
    chipWeekend: 'Cuối tuần này',
    topLabel: 'TOP',
    noHighlights: 'Không có sự kiện phù hợp với bộ lọc này.',
    moreTitle: 'Thêm sự kiện',
    pastTitle: 'Sự kiện đã kết thúc',
    ctaTitle: 'Bạn biết sự kiện hay ưu đãi ở Phú Quốc?',
    ctaDesc: 'Hãy gửi thông tin, chúng tôi sẽ kiểm tra trước khi đăng.',
    ctaBtn: 'Gửi thông tin →',
    homeEyebrow: 'SỰ KIỆN HOÀNG HÔN & PHÚ QUỐC',
    homeMore: 'Xem thêm →',
  },
  zh: {
    eyebrow: "WHAT'S ON",
    title: '富国岛活动资讯',
    lead: '从日落小镇的演出与优惠到全岛的节庆活动，只收录正在进行或即将举行的资讯。',
    track1Tag: '栏目 1 · 日落小镇与南部',
    track1Title: '1) 日落小镇与南部：演出与优惠',
    track1Desc: '海洋交响曲、海之吻，以及日落小镇周边酒店度假村优惠。',
    track2Tag: '栏目 2 · 全岛',
    track2Title: '2) 富国岛节庆与地方活动',
    track2Desc: '包括北部与中部在内的全岛节庆、赛事与文化活动。',
    hlEyebrow: '进行中 / 即将开始',
    hlTitle: '热门活动 TOP 3',
    chipAll: '全部',
    chipOngoing: '进行中',
    chipUpcoming: '即将开始',
    chipWeekend: '本周末',
    topLabel: 'TOP',
    noHighlights: '没有符合条件的活动。',
    moreTitle: '更多活动',
    pastTitle: '往期活动',
    ctaTitle: '了解富国岛的活动或优惠吗？',
    ctaDesc: '欢迎提供线索，我们核实后会更新到此页面。',
    ctaBtn: '提供线索 →',
    homeEyebrow: '日落小镇与富国岛活动',
    homeMore: '更多 →',
  },
  ja: {
    eyebrow: "WHAT'S ON",
    title: 'フーコック イベント情報',
    lead: 'サンセットタウンのショーや特典から島内のお祭りまで、開催中・まもなく開催のものだけをまとめました。',
    track1Tag: 'トラック1 · サンセットタウン・南部',
    track1Title: '1) サンセットタウン・南部：ショー＆特典',
    track1Desc: 'シンフォニー・キス・オブ・ザ・シー、周辺ホテル・リゾートの特典など。',
    track2Tag: 'トラック2 · 島全域',
    track2Title: '2) フーコックのお祭り＆地域イベント',
    track2Desc: '北部・中部を含む島全域のお祭り、大会、文化イベント。',
    hlEyebrow: '開催中・開催予定',
    hlTitle: '注目イベント TOP 3',
    chipAll: 'すべて',
    chipOngoing: '開催中',
    chipUpcoming: '開催予定',
    chipWeekend: '今週末',
    topLabel: 'TOP',
    noHighlights: '条件に合うイベントはありません。',
    moreTitle: 'その他のイベント',
    pastTitle: '終了したイベント',
    ctaTitle: 'フーコックのイベントやプロモーションをご存じですか？',
    ctaDesc: '情報をお寄せください。確認のうえ掲載します。',
    ctaBtn: '情報を送る →',
    homeEyebrow: 'サンセットタウン＆フーコックのイベント',
    homeMore: 'もっと見る →',
  },
  ru: {
    eyebrow: "WHAT'S ON",
    title: 'События Фукуока',
    lead: 'От шоу и акций Сансет-Тауна до фестивалей по всему острову — только текущие и ближайшие события.',
    track1Tag: 'РАЗДЕЛ 1 · САНСЕТ-ТАУН И ЮГ',
    track1Title: '1) Сансет-Таун и юг: шоу и акции',
    track1Desc: 'Symphony и Kiss of the Sea, а также предложения отелей и курортов.',
    track2Tag: 'РАЗДЕЛ 2 · ВЕСЬ ОСТРОВ',
    track2Title: '2) Фестивали и местные события',
    track2Desc: 'Фестивали, соревнования и культурные события по всему острову, включая север и центр.',
    hlEyebrow: 'ТЕКУЩИЕ И БЛИЖАЙШИЕ',
    hlTitle: 'Главные события — ТОП 3',
    chipAll: 'Все',
    chipOngoing: 'Идёт сейчас',
    chipUpcoming: 'Скоро',
    chipWeekend: 'Эти выходные',
    topLabel: 'TOP',
    noHighlights: 'Нет событий, подходящих под фильтр.',
    moreTitle: 'Ещё события',
    pastTitle: 'Прошедшие события',
    ctaTitle: 'Знаете о событии или акции на Фукуоке?',
    ctaDesc: 'Сообщите нам — мы проверим и добавим.',
    ctaBtn: 'Сообщить →',
    homeEyebrow: 'СОБЫТИЯ САНСЕТ-ТАУНА И ФУКУОКА',
    homeMore: 'Ещё →',
  },
  hi: {
    eyebrow: "WHAT'S ON",
    title: 'फू क्वोक इवेंट समाचार',
    lead: 'सनसेट टाउन के शो और ऑफ़र से लेकर पूरे द्वीप के उत्सवों तक — केवल जारी और आगामी कार्यक्रम।',
    track1Tag: 'ट्रैक 1 · सनसेट टाउन और दक्षिण',
    track1Title: '1) सनसेट टाउन और दक्षिण: शो और ऑफ़र',
    track1Desc: 'सिम्फनी, किस ऑफ़ द सी और आसपास के होटल-रिसॉर्ट ऑफ़र।',
    track2Tag: 'ट्रैक 2 · पूरा द्वीप',
    track2Title: '2) फू क्वोक उत्सव और स्थानीय कार्यक्रम',
    track2Desc: 'उत्तर और मध्य सहित पूरे द्वीप के उत्सव, प्रतियोगिताएँ और सांस्कृतिक कार्यक्रम।',
    hlEyebrow: 'जारी और आगामी',
    hlTitle: 'प्रमुख कार्यक्रम TOP 3',
    chipAll: 'सभी',
    chipOngoing: 'जारी',
    chipUpcoming: 'आगामी',
    chipWeekend: 'इस सप्ताहांत',
    topLabel: 'TOP',
    noHighlights: 'इस फ़िल्टर से मेल खाता कोई कार्यक्रम नहीं।',
    moreTitle: 'और कार्यक्रम',
    pastTitle: 'समाप्त कार्यक्रम',
    ctaTitle: 'फू क्वोक के किसी कार्यक्रम या ऑफ़र की जानकारी है?',
    ctaDesc: 'हमें बताएँ, जाँच के बाद हम इसे जोड़ देंगे।',
    ctaBtn: 'जानकारी भेजें →',
    homeEyebrow: 'सनसेट टाउन और फू क्वोक इवेंट',
    homeMore: 'और देखें →',
  },
}
