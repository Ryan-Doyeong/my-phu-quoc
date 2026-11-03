import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import { CONTENT_CATEGORIES, contentCategoryLabel, type ContentCategory } from '@/lib/contentCategories'

const HREF: Record<ContentCategory, string> = {
  news: '/news',
  event: '/events',
  guide: '/news?category=guide',
}

export function ContentCategoryTabs({ locale, active }: { locale: Locale; active: ContentCategory }) {
  return (
    <div className="shell">
      <nav className="contentCategoryTabs" aria-label="Content categories">
        {CONTENT_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={localePath(locale, HREF[cat])}
            className={cat === active ? 'active' : undefined}
            aria-current={cat === active ? 'page' : undefined}
          >
            {contentCategoryLabel(cat, locale)}
          </Link>
        ))}
      </nav>
    </div>
  )
}
