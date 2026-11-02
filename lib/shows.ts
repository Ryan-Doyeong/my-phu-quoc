import type { Locale } from '@/lib/i18n/config'

export interface ShowScheduleSpec {
  id: 'kiss-of-the-sea' | 'symphony-of-the-sea'
  name: Record<Locale, string>
  startTime: string
  endTime: string
  fireworksTime?: string
  /** JS Date.getDay(): 0=Sun, 1=Mon, 2=Tue, ... */
  offDays: number[]
  /** ISO YYYY-MM-DD when current/upcoming season begins (if seasonal) */
  seasonStart?: string
  seasonEnd?: string
  scheduleLabel: Record<Locale, string>
  offDayNotice: Record<Locale, string>
  seasonNotice?: Record<Locale, string>
  klookUrl: string | null
  officialUrl: string
}

export const SHOW_SCHEDULES: Record<ShowScheduleSpec['id'], ShowScheduleSpec> = {
  'kiss-of-the-sea': {
    id: 'kiss-of-the-sea',
    name: {
      ko: '키스 오브 더 씨 (Kiss of the Sea)',
      en: 'Kiss of the Sea',
      vi: 'Show Nụ Hôn Của Biển Cả (Kiss of the Sea)',
      zh: '海洋之吻 (Kiss of the Sea)',
      ja: 'キス・オブ・ザ・シー (Kiss of the Sea)',
      ru: 'Шоу «Поцелуй моря» (Kiss of the Sea)',
      hi: 'किस ऑफ़ द सी (Kiss of the Sea)',
    },
    startTime: '21:00',
    endTime: '21:30',
    fireworksTime: '21:25',
    offDays: [2], // Closed every Tuesday
    scheduleLabel: {
      ko: '수~월 21:00~21:30 (매주 화요일 정기 휴무 · 21:25 불꽃놀이)',
      en: 'Wed–Mon 21:00–21:30 (Closed Tuesdays · Fireworks ~21:25)',
      vi: 'Thứ 4–Thứ 2 21:00–21:30 (Nghỉ Thứ 3 hàng tuần · Pháo hoa ~21:25)',
      zh: '周三至周一 21:00–21:30（每周二休演 · 约21:25烟花）',
      ja: '水〜月 21:00〜21:30（毎週火曜休演・21:25頃花火）',
      ru: 'Ср–Пн 21:00–21:30 (Вторник — выходной · Салют ~21:25)',
      hi: 'बुध–सोम 21:00–21:30 (मंगलवार बंद · ~21:25 आतिशबाजी)',
    },
    offDayNotice: {
      ko: '매주 화요일은 키스 오브 더 씨 정기 휴연일입니다.',
      en: 'Kiss of the Sea is closed on Tuesdays (regular weekly dark day).',
      vi: 'Show Nụ Hôn Của Biển Cả nghỉ định kỳ vào Thứ Ba hàng tuần.',
      zh: '海洋之吻演出每周二例行休演。',
      ja: 'キス・オブ・ザ・シーは毎週火曜日が定期休演日です。',
      ru: 'Шоу «Поцелуй моря» не проводится по вторникам (выходной день).',
      hi: 'किस ऑफ़ द सी शो मंगलवार को बंद रहता है।',
    },
    klookUrl: 'https://www.klook.com/en-US/activity/81479-kiss-the-star-show-ticket/?aid=MYPHUQUOC',
    officialUrl: 'https://booking.sunworld.vn',
  },
  'symphony-of-the-sea': {
    id: 'symphony-of-the-sea',
    name: {
      ko: '심포니 오브 더 씨 (Symphony of the Sea)',
      en: 'Symphony of the Sea',
      vi: 'Bản Giao Hưởng Đại Dương (Symphony of the Sea)',
      zh: '海洋交响曲 (Symphony of the Sea)',
      ja: 'シンフォニー・オブ・ザ・シー (Symphony of the Sea)',
      ru: 'Симфония моря (Symphony of the Sea)',
      hi: 'सिम्फनी ऑफ़ द सी (Symphony of the Sea)',
    },
    startTime: '19:30',
    endTime: '20:00',
    offDays: [],
    seasonStart: '2026-11-10',
    scheduleLabel: {
      ko: '매일 19:30~20:00 (시즌 3: 2026년 11월 10일 개막 예정 · 현장 공지 확인)',
      en: 'Daily 19:30–20:00 (Season 3 opens Nov 10, 2026 · Subject to official schedule)',
      vi: 'Hàng ngày 19:30–20:00 (Mùa 3 dự kiến từ 10/11/2026 · Theo lịch chính thức)',
      zh: '每日 19:30–20:00（第三季预计2026年11月10日启幕 · 以官方公告为准）',
      ja: '毎日 19:30〜20:00（シーズン3：2026年11月10日開幕予定・公式案内要確認）',
      ru: 'Ежедневно 19:30–20:00 (Сезон 3 с 10 ноября 2026 г. · уточняйте расписание)',
      hi: 'प्रतिदिन 19:30–20:00 (सीज़न 3: 10 नवंबर 2026 से शुरू · आधिकारिक समय देखें)',
    },
    offDayNotice: {
      ko: '기상 및 시즌 일정에 따라 변동될 수 있습니다.',
      en: 'Subject to weather and seasonal operating dates.',
      vi: 'Lịch diễn có thể thay đổi theo thời tiết và mùa hoạt động.',
      zh: '演出时间可能受天气及季度排期影响。',
      ja: '天候やシーズン日程により変更される場合があります。',
      ru: 'Расписание зависит от погоды и сезона.',
      hi: 'मौसम और सीज़न के अनुसार समय बदल सकता है।',
    },
    seasonNotice: {
      ko: '심포니 오브 더 씨 시즌 3는 2026년 11월 10일 개막 예정입니다. 이전 날짜에는 운영되지 않아 선셋타운 야경·야시장 산책 일정으로 대체 안내합니다.',
      en: 'Symphony of the Sea Season 3 opens on Nov 10, 2026. For earlier dates, we substitute a Sunset Town evening stroll & bazaar visit.',
      vi: 'Show Symphony of the Sea Mùa 3 mở màn từ 10/11/2026. Với các ngày trước đó, lịch trình được thay bằng dạo phố đêm & chợ đêm Sunset Town.',
      zh: '海洋交响曲第三季将于2026年11月10日启幕，此前日期将为您替换为日落小镇夜景与夜市漫步。',
      ja: 'シンフォニー・オブ・ザ・シー シーズン3は2026年11月10日開幕予定です。それ以前の日程ではサンセットタウン夜景＆ナイトマーケット散策をご案内します。',
      ru: '3-й сезон шоу «Симфония моря» открывается 10 ноября 2026 г. В более ранние даты рекомендуем вечернюю прогулку и ночной рынок.',
      hi: 'सिम्फनी ऑफ़ द सी सीज़न 3 की शुरुआत 10 नवंबर 2026 से होगी। इससे पहले की तारीखों के लिए सनसेट टाउन नाइट वॉक शामिल किया गया है।',
    },
    klookUrl: 'https://www.klook.com/en-US/destination/p60275095-sunworld-hon-thom-phu-quoc/?aid=MYPHUQUOC',
    officialUrl: 'https://booking.sunworld.vn',
  },
}

/**
 * Checks whether a show is operating on a specific date.
 * If date is null (user hasn't selected travel dates yet), returns { available: true, confirmed: false }.
 */
export function checkShowAvailability(
  showId: ShowScheduleSpec['id'],
  date: Date | null,
): {
  available: boolean
  confirmed: boolean
  reason?: 'off_day' | 'before_season' | 'after_season'
} {
  const spec = SHOW_SCHEDULES[showId]
  if (!date) {
    return { available: true, confirmed: false }
  }

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const iso = `${yyyy}-${mm}-${dd}`

  if (spec.seasonStart && iso < spec.seasonStart) {
    return { available: false, confirmed: true, reason: 'before_season' }
  }
  if (spec.seasonEnd && iso > spec.seasonEnd) {
    return { available: false, confirmed: true, reason: 'after_season' }
  }
  if (spec.offDays.includes(date.getDay())) {
    return { available: false, confirmed: true, reason: 'off_day' }
  }

  return { available: true, confirmed: true }
}
