import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { SiteSettings } from '@/lib/types'
import { SuggestionForm, VolunteerForm } from '@/components/PublicForms'
import { Logo } from '@/components/Logo'
import { SponsorCarousel } from '@/components/SponsorCarousel'
import { NewsletterForm } from '@/components/NewsletterForm'
import { HeroSearch } from '@/components/SiteSearch'
import { MobileMenu } from '@/components/MobileMenu'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SunsetTownTickets } from '@/components/SunsetTownTickets'
import { SunsetDistrictFilter } from '@/components/SunsetDistrictFilter'
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_CATEGORY_KEYS,
  categoryLabel,
  categoryEyebrow,
  categoryDescription,
  categoryTheme,
  type DirectoryCategoryAppearance,
  type DirectoryCategory,
} from '@/lib/directory'
import { STOCK_IMAGES } from '@/lib/stockImages'
import { imageUrl } from '@/lib/imageUrl'
import type { HomeSections } from '@/lib/homeSections'
import { localePath, dateLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary, localizeStory, translateTerm } from '@/lib/i18n/dictionaries'

type Story = {
  id: string
  title: string
  category: string | null
  excerpt: string | null
  cover_image_url: string | null
  slug: string
  content_type?: string | null
  event_date?: string | null
  event_location?: string | null
  [key: string]: any
}
type Banner = {
  slot_key: string
  title: string | null
  subtitle: string | null
  image_url: string
  target_url: string | null
  size: string
  sort_order: number
}

const fallbackStories = [
  {
    title: 'From expat to neighbor',
    category: 'PEOPLE',
    excerpt: 'How Phu Quoc became home for good.',
    image: '/features/general_sightseeing_640.webp',
  },
  {
    title: 'Why we love Phu Quoc',
    category: 'PLACES',
    excerpt: 'Green streets, great food and a stronger community.',
    image: '/features/dining_featured_640.webp',
  },
  {
    title: 'A second chance',
    category: 'COMMUNITY',
    excerpt: 'Meet the rescue dogs finding new homes in Phu Quoc.',
    image: '/features/hotel_featured_640.webp',
  },
  {
    title: 'Small actions, big impact',
    category: 'VOLUNTEER',
    excerpt: 'How neighbors come together to make a difference.',
    image: '/features/activities_featured_640.webp',
  },
]

export function HomePage({
  settings,
  categoryAppearance,
  stories,
  banners,
  event,
  homeSections,
  locale = 'en',
}: {
  settings: SiteSettings
  categoryAppearance: Record<DirectoryCategory, DirectoryCategoryAppearance>
  stories: Story[]
  banners: Banner[]
  event: Story | null
  homeSections: HomeSections
  locale?: Locale
}) {
  const dict = getDictionary(locale)
  const style = {
    '--accent': settings.accent_color,
    '--site-bg': settings.bg_color,
    '--paper': settings.paper_color,
    '--radius': `${settings.radius}px`,
    '--blur': `${settings.hero_blur}px`,
    '--overlay': String(settings.hero_overlay),
  } as CSSProperties

  const storyItems = stories.length
    ? stories.slice(0, 4).map((raw, i) => {
        const s = localizeStory(raw, locale)
        return {
          title: s.title,
          category: s.category || fallbackStories[i]?.category || 'COMMUNITY',
          excerpt: s.excerpt || fallbackStories[i]?.excerpt || '',
          image: s.cover_image_url,
          slug: s.slug,
        }
      })
    : fallbackStories.map((x, i) => ({ ...x, slug: `fallback-${i}` }))

  const localizedEvent = event ? localizeStory(event, locale) : null
  const mainBanners = banners
    .filter((x) => x.size === 'main')
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 7)
  const smallBanners = banners
    .filter((x) => x.size === 'small')
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 4)

  const heroImage =
    !settings.hero_image_url ||
    settings.hero_image_url.startsWith('/images/') ||
    settings.hero_image_url.startsWith('/api/unsplash/')
      ? '/hero/02_kiss_bridge_aerial_1920.webp'
      : settings.hero_image_url

  // For English, respect DB-customized settings/homeSections; for VI/KO, use localized dictionary copy
  const heroTopline = locale === 'en' ? settings.hero_topline : dict.home.heroTopline
  const heroTitle = locale === 'en' ? settings.hero_title : dict.home.heroTitle
  const heroSubtitle = locale === 'en' ? settings.hero_subtitle : dict.home.heroSubtitle
  const heroDescription = locale === 'en' ? settings.hero_description : dict.home.heroDescription
  const heroPrimaryCta = locale === 'en' ? settings.hero_primary_cta : dict.home.heroPrimaryCta

  const purposeTitle = locale === 'en' ? homeSections.purpose.title : dict.home.purposeTitle
  const purposeDesc = locale === 'en' ? homeSections.purpose.description : dict.home.purposeDesc
  const purposeHandNote = locale === 'en' ? homeSections.purpose.handNote : dict.home.purposeHandNote

  const discoverTitle = locale === 'en' ? homeSections.discover.title : dict.home.discoverTitle
  const discoverDesc = locale === 'en' ? homeSections.discover.description : dict.home.discoverDesc

  const storiesTitle = locale === 'en' ? homeSections.stories.title : dict.home.storiesTitle
  const storiesDesc = locale === 'en' ? homeSections.stories.description : dict.home.storiesDesc

  const newsletterTitle = locale === 'en' ? homeSections.newsletter.title : dict.home.newsletterTitle
  const newsletterDesc = locale === 'en' ? homeSections.newsletter.description : dict.home.newsletterDesc

  const suggestionTitle =
    locale === 'en' ? homeSections.participation.suggestionTitle : dict.home.suggestionTitle
  const suggestionDesc =
    locale === 'en' ? homeSections.participation.suggestionDescription : dict.home.suggestionDesc
  const volunteerTitle =
    locale === 'en' ? homeSections.participation.volunteerTitle : dict.home.volunteerTitle
  const volunteerDesc =
    locale === 'en' ? homeSections.participation.volunteerDescription : dict.home.volunteerDesc

  const closingTitle = locale === 'en' ? homeSections.closing.title : dict.home.closingTitle
  const closingDesc = locale === 'en' ? homeSections.closing.description : dict.home.closingDesc

  return (
    <div style={style} className="siteRoot">
      <header className="siteHeader heroHeader">
        <Logo locale={locale} />
        <nav className="desktopNav">
          <a href="#discover">{dict.nav.discover}</a>
          {DIRECTORY_CATEGORY_KEYS.map((key) => (
            <Link href={localePath(locale, `/directory/${key}`)} key={key}>
              {categoryLabel(key, locale)}
            </Link>
          ))}
          <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
          <Link href={localePath(locale, '/impact')}>{dict.nav.impact}</Link>
        </nav>
        <div className="headerActions">
          <Link
            href={localePath(locale, '/search')}
            className="searchGlyph"
            aria-label={dict.nav.search}
          >
            ⌕
          </Link>
          <LanguageSwitcher locale={locale} variant="hero" />
          <MobileMenu locale={locale} />
        </div>
      </header>
      <main>
        <section className="heroSection">
          <picture>
            <source media="(max-width: 640px)" srcSet="/hero/02_kiss_bridge_aerial_640.webp" />
            <source media="(max-width: 1280px)" srcSet="/hero/02_kiss_bridge_aerial_1280.webp" />
            <img
              src="/hero/02_kiss_bridge_aerial_1920.webp"
              alt="Phu Quoc Sunset Town Kiss Bridge aerial sunset view"
              className="heroImage"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={1280}
            />
          </picture>
          <div className="heroOverlay" />
          <div className="heroAttribution">
            <span>Photo: <a href="https://commons.wikimedia.org/wiki/File:Kiss_Bridge_Phu_Quoc_aerial_sunset_view.jpg" target="_blank" rel="noopener noreferrer">Vivu Vietnam</a> · <a href="https://creativecommons.org/licenses/by/4.0" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></span>
          </div>
          <div className="heroCopy">
            <div className="topline">{heroTopline}</div>
            <h1>
              {heroTitle.split('\n').map((l, i, arr) => (
                <span key={i}>
                  {l}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <h2>{heroSubtitle}</h2>
            <p>{heroDescription}</p>
            <HeroSearch locale={locale} />
            <div className="heroButtons">
              <a href="#discover" className="primaryButton heroPrimary amberCta">
                {heroPrimaryCta}
                <span>→</span>
              </a>
              <Link href={localePath(locale, '/news')} className="outlineButton">
                {dict.home.heroSecondaryCta}
              </Link>
            </div>
          </div>
        </section>

        <SponsorCarousel main={mainBanners} small={smallBanners} locale={locale} />

        {homeSections.eventPromo.visible && localizedEvent && (
          <section className="shell eventPromo">
            <Link href={localePath(locale, '/events')} className="eventPromoLink">
              <img
                src={imageUrl(localizedEvent.cover_image_url || '/features/nightlife_featured_1280.webp', 1200, 72)}
                alt=""
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
              />
              <div className="eventPromoShade" />
              <div className="eventPromoCopy">
                <span className="eyebrow">{dict.home.eventEyebrow}</span>
                <h2>{localizedEvent.title}</h2>
                <p>{localizedEvent.excerpt}</p>
                <div>
                  {localizedEvent.event_date
                    ? new Date(localizedEvent.event_date).toLocaleDateString(dateLocaleFor(locale), {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : dict.home.eventUpcoming}
                  {localizedEvent.event_location ? ` · ${localizedEvent.event_location}` : ''}
                </div>
                <strong>{dict.home.eventCta}</strong>
              </div>
              <span className="eventPromoAttribution">Photo: Vivu Vietnam · CC BY-SA 4.0</span>
            </Link>
          </section>
        )}

        {/* Claude 5차/6차: 타오디엔 레거시 섹션 비활성화 */
        false && homeSections.purpose.visible && (
          <section className="shell purpose" id="community">
            <div className="sectionIntro purposeIntro">
              <div>
                {purposeTitle && <span className="eyebrow">{dict.home.purposeEyebrow}</span>}
                <h2>{purposeTitle}</h2>
                <p>{purposeDesc}</p>
              </div>
              <div className="handNote">
                {purposeHandNote.split('\n').map((l, i) => (
                  <span key={i}>
                    {l}
                    <br />
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={localePath(locale, '/impact')}
              className="communityImpactBar"
              data-analytics-type="impact"
              data-analytics-id="community-impact"
              aria-label="Read community impact news"
            >
              <div>
                <span className="eyebrow">{dict.home.impactEyebrow}</span>
                <h3>{dict.home.impactBarTitle}</h3>
                <p>{dict.home.impactBarDesc}</p>
              </div>
              <span className="communityImpactArrow" aria-hidden="true">
                →
              </span>
            </Link>
          </section>
        )}

        {homeSections.discover.visible && (
          <section className="shell discover" id="discover">
            <div className="sectionIntro">
              <div>
                <span className="eyebrow">{dict.home.discoverEyebrow}</span>
                <h2>{discoverTitle}</h2>
                <p>{discoverDesc}</p>
              </div>
            </div>
            <div className="categoryCards categoryCardsFive">
              {DIRECTORY_CATEGORY_KEYS.map((key) => {
                const c = DIRECTORY_CATEGORIES[key]
                const icon = categoryAppearance[key]
                const locLabel = categoryLabel(key, locale)
                const locEyebrow = categoryEyebrow(key, locale)
                const locDesc = categoryDescription(key, locale)
                return (
                  <Link
                    href={localePath(locale, `/directory/${key}`)}
                    key={key}
                    data-analytics-type="category"
                    data-analytics-id={key}
                    data-theme={categoryTheme(key)}
                  >
                    <article>
                      <img
                        src={imageUrl(c.image, 480, 72)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={320}
                      />
                      <div className="categoryIconBadge">
                        {icon.icon_url ? (
                          <img src={icon.icon_url} alt={`${locLabel} icon`} />
                        ) : (
                          <span>{icon.icon_text}</span>
                        )}
                      </div>
                      <span>{locEyebrow}</span>
                      <h3>{locLabel}</h3>
                      <p>{locDesc}</p>
                      <div className="categoryMiniTags">
                        {c.subcategories.slice(0, 4).map((x) => (
                          <em key={x}>{translateTerm(x, locale)}</em>
                        ))}
                      </div>
                      <strong>{dict.home.exploreCategory(locLabel)}</strong>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <SunsetDistrictFilter locale={locale} />

        <SunsetTownTickets locale={locale} />

        {homeSections.stories.visible && (
          <section className="shell stories" id="stories">
            <div className="sectionIntro storyIntro">
              <div>
                <span className="eyebrow">{dict.home.storiesEyebrow}</span>
                <h2>{storiesTitle}</h2>
                <p>{storiesDesc}</p>
              </div>
              <Link className="viewAll" href={localePath(locale, '/news')}>
                {dict.home.viewAll}
              </Link>
            </div>
            <div className="storyGrid">
              {storyItems.map((s, i) => (
                <Link
                  href={s.slug.startsWith('fallback-') ? '#' : localePath(locale, `/news/${s.slug}`)}
                  key={`${s.title}-${i}`}
                >
                  <article className="storyCard">
                    {s.image && (
                      <img
                        src={imageUrl(s.image, 640, 70)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={426}
                      />
                    )}
                    <small className="storyPhotoCredit">Photo: Vivu Vietnam · CC BY-SA 4.0</small>
                    <span>{s.category}</span>
                    <h3>{s.title}</h3>
                    <p>{s.excerpt}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {homeSections.newsletter.visible && (
          <section className="newsletterBand">
            <div className="shell newsletterGrid">
              <div>
                <span className="eyebrow">{dict.home.newsletterEyebrow}</span>
                <h2>{newsletterTitle}</h2>
                <p>{newsletterDesc}</p>
              </div>
              <NewsletterForm locale={locale} />
            </div>
          </section>
        )}

        {homeSections.participation.visible && (
          <section className="shell participation" id="about">
            <article className="participationCard suggestion">
              <span className="eyebrow">{dict.home.suggestionEyebrow}</span>
              <h2>{suggestionTitle}</h2>
              <p>{suggestionDesc}</p>
              <SuggestionForm locale={locale} />
            </article>
            <article className="participationCard volunteer" id="volunteer">
              <span className="eyebrow">{dict.home.volunteerEyebrow}</span>
              <h2>{volunteerTitle}</h2>
              <p>{volunteerDesc}</p>
              <VolunteerForm locale={locale} />
            </article>
          </section>
        )}

        {homeSections.closing.visible && (
          <section className="closing">
            <img
              src={imageUrl(STOCK_IMAGES.closing, 1500, 72)}
              alt="Riverside city skyline at sunset"
              loading="lazy"
              decoding="async"
              width={1500}
              height={1000}
            />
            <div className="closingOverlay" />
            <div className="closingContent">
              <div>
                <h2>
                  {closingTitle.split('\n').map((l, i) => (
                    <span key={i}>
                      {l}
                      <br />
                    </span>
                  ))}
                </h2>
                <p>{closingDesc}</p>
              </div>
              <Link href={localePath(locale, '/impact')} className="outlineButton closingButton">
                {dict.home.closingCta} <span>→</span>
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
