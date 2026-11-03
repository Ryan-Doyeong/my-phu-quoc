import type { Locale } from '@/lib/i18n/config'

/** 콘텐츠 카테고리 3종: 뉴스 / 이벤트 / 가이드 (stories.content_type 과 대응) */
export type ContentCategory = 'news' | 'event' | 'guide'

export const CONTENT_CATEGORIES: ContentCategory[] = ['news', 'event', 'guide']

export const CONTENT_CATEGORY_LABELS: Record<ContentCategory, Record<string, string>> = {
  news: { ko: '뉴스', en: 'News', zh: '新闻', ru: 'Новости', ja: 'ニュース', hi: 'समाचार', vi: 'Tin tức' },
  event: { ko: '이벤트', en: 'Events', zh: '活动', ru: 'События', ja: 'イベント', hi: 'इवेंट', vi: 'Sự kiện' },
  guide: { ko: '가이드', en: 'Guides', zh: '指南', ru: 'Путеводитель', ja: 'ガイド', hi: 'गाइड', vi: 'Cẩm nang' },
}

export function contentCategoryLabel(cat: ContentCategory, locale: Locale | string) {
  return CONTENT_CATEGORY_LABELS[cat][locale] || CONTENT_CATEGORY_LABELS[cat].en
}

export function parseContentCategory(value: string | string[] | undefined): 'news' | 'guide' {
  const v = Array.isArray(value) ? value[0] : value
  return v === 'guide' ? 'guide' : 'news'
}

export const HOME_FEED_TITLES: Record<'event' | 'news', Record<string, string>> = {
  event: { ko: '이벤트', en: 'Events', zh: '活动', ru: 'События', ja: 'イベント', hi: 'इवेंट', vi: 'Sự kiện' },
  news: { ko: '뉴스', en: 'News', zh: '新闻', ru: 'Новости', ja: 'ニュース', hi: 'समाचार', vi: 'Tin tức' },
}

export const VIEW_ALL_LABELS: Record<string, string> = {
  ko: '전체 보기 →', en: 'View all →', zh: '查看全部 →', ru: 'Смотреть все →', ja: 'すべて見る →', hi: 'सभी देखें →', vi: 'Xem tất cả →',
}
