import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { DirectoryBrowser } from '@/components/DirectoryBrowser'
import { BankingDirectory } from '@/components/BankingDirectory'
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_CATEGORY_KEYS,
  categoryLabel,
  categoryEyebrow,
  categoryDescription,
  isDirectoryCategory,
  normalizeDirectoryCategory,
  mergeDirectoryCategoryAppearance,
  isHiddenBusiness,
} from '@/lib/directory'
import { normalizeZoneQuery, type MainZoneSlug } from '@/lib/zones'
import { buildAlternates, localePath, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { tUi } from '@/lib/i18n/uiStrings'
import businessesRegistry from '@/data/businesses-registry.json'
import khemBusinesses from '@/data/khem-beach-businesses.json'
import zoneAssignmentsJson from '@/data/zone-assignments.json'

// 2026-11-07 SEO: 환전·ATM 페이지 검색용 title/meta (ChatGPT 언어 검수본). vi는 검수 전이라 기본 문구 유지.
const BANKING_SEO: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Sunset Town Currency Exchange & ATMs | My Phu Quoc',
    description:
      'Find currency exchange locations and ATMs in Sunset Town, Phu Quoc. Learn how to prepare VND cash for Vui-Fest night market and contact us via WhatsApp.',
  },
  ko: {
    title: '푸꾸옥 선셋타운 환전소·ATM 위치 및 환전 안내 | 마이 푸꾸옥',
    description:
      '푸꾸옥 선셋타운 내 환전소와 ATM 위치를 정리했습니다. 부이페스트 야시장·투어 전 현금 준비 방법과 WhatsApp 환전 문의를 확인하세요.',
  },
  zh: {
    title: '富国岛日落小镇换汇与ATM指南 | My Phu Quoc',
    description:
      '查看富国岛Sunset Town（日落小镇）的换汇点和ATM位置，了解逛夜市或参加行程前如何准备越南盾现金。如有换汇相关问题，可通过WhatsApp咨询。',
  },
  ru: {
    title: 'Обмен валюты и банкоматы в Сансет Таун | My Phu Quoc',
    description:
      'Где обменять валюту и снять наличные в Sunset Town на Фукуоке? Узнайте, где находятся обменные пункты и банкоматы. Вопросы об обмене валюты — через WhatsApp.',
  },
  ja: {
    title: 'フーコック島サンセットタウンの両替・ATM案内 | My Phu Quoc',
    description:
      'フーコック島のSunset Town（サンセットタウン）にある両替所とATMの場所をご案内。ナイトマーケットやツアーに備えたベトナムドンの現金準備、WhatsAppでの両替相談についてもご紹介します。',
  },
  hi: {
    title: 'सनसेट टाउन में करेंसी एक्सचेंज और ATM | My Phu Quoc',
    description:
      'फु क्वोक के Sunset Town में करेंसी एक्सचेंज और ATM की जानकारी पाएं। नाइट मार्केट और टूर के लिए वियतनामी डोंग में नकदी तैयार करने के तरीके जानें। WhatsApp पर संपर्क करें।',
  },
}

export async function generateDirectoryMetadata(
  rawCategory: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  const category = normalizeDirectoryCategory(rawCategory)
  if (category === 'hotels' || rawCategory === 'hotels' || rawCategory === 'hotel' || category === 'activities') {
    return {
      robots: { index: false, follow: false },
    }
  }
  if (!isDirectoryCategory(category)) return {}
  const label = categoryLabel(category, locale)
  const description = categoryDescription(category, locale)
  const title =
    locale === 'vi'
      ? `${label} tại Sunset Town & Bãi Khem | My Phu Quoc`
      : locale === 'ko'
      ? `선셋타운 & 켐비치 ${label} | 마이 푸꾸옥 (My Phu Quoc)`
      : tUi('{category} in Sunset Town & Khem Beach | My Phu Quoc', locale).replace('{category}', label)
  const barePath = `/directory/${category}`
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  const bankingSeo = category === 'banking' ? BANKING_SEO[locale] : undefined
  const finalTitle = bankingSeo ? { absolute: bankingSeo.title } : title
  const finalTitleText = bankingSeo ? bankingSeo.title : title
  const finalDescription = bankingSeo ? bankingSeo.description : description

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: finalTitleText,
      description: finalDescription,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export async function renderDirectoryRoute(
  rawCategory: string,
  locale: Locale = 'en',
  searchParams?: { zone?: string }
) {
  const category = normalizeDirectoryCategory(rawCategory)
  if (category === 'hotels' || rawCategory === 'hotels' || rawCategory === 'hotel') {
    redirect(localePath(locale, '/hotels'))
  }
  if (category === 'activities') {
    redirect(localePath(locale, '/activities'))
  }
  if (category === 'banking') {
    return <BankingDirectory locale={locale} />
  }
  if (!isDirectoryCategory(category)) notFound()
  const dict = getDictionary(locale)
  const label = categoryLabel(category, locale)
  const eyebrow = categoryEyebrow(category, locale)
  const description = categoryDescription(category, locale)
  const supabase = createPublicClient()
  const [{ data }, { data: categorySettingRow }] = await Promise.all([
    supabase
      .from('businesses')
      .select('*')
      .eq('status', 'published')
      .order('google_review_count', { ascending: false, nullsFirst: false }),
    supabase.from('site_settings').select('value').eq('key', 'directory_categories').maybeSingle(),
  ])
  const categoryAppearance = mergeDirectoryCategoryAppearance(categorySettingRow?.value)
  const icon = categoryAppearance[category]
  const rawConfig = DIRECTORY_CATEGORIES[category]
  const theme = rawConfig?.theme || 'ocean'

  const assignments = zoneAssignmentsJson as Record<
    string,
    { zone: MainZoneSlug; public_category: string; service_areas: string[] }
  >

  const registryBySlug = new Map(
    (businessesRegistry as any[]).map((b) => [b.slug, b])
  )

  // Merge registry and verified Khem Beach data mapped to public 10 categories
  const combinedRegistry = [
    ...(businessesRegistry as any[])
      .filter((b) => (!b.status || b.status === 'published') && !isHiddenBusiness(b))
      .map((b) => {
        const a = assignments[b.id]
        return {
          ...b,
          public_category: b.category || a?.public_category,
          zone: a?.zone || 'sunset-town',
          service_areas: a?.service_areas || ['sunset-town'],
        }
      }),
    ...(khemBusinesses as any[])
      .filter((b) => b.status === 'published' && !isHiddenBusiness(b))
      .map((b) => {
      const a = assignments[b.id]
      return {
        ...b,
        public_category: b.category || a?.public_category,
        zone: a?.zone || 'khem-beach',
        service_areas: a?.service_areas || ['khem-beach'],
      }
    }),
  ]

  const khemItems = combinedRegistry.filter(
    (b) => b.zone === 'khem-beach' && b.public_category === category
  )

  const enrichedData = (data || [])
    .map((b: any) => {
      const reg = registryBySlug.get(b.slug)
      if (!reg) return b
      return {
        ...b,
        status: reg.status ?? b.status,
        category: reg.category ?? b.category,
        subcategory: reg.subcategory ?? b.subcategory,
        public_name: reg.public_name ?? b.public_name,
        description_ko: reg.description_ko ?? b.description_ko,
        description_en: reg.description_en ?? b.description_en,
        tags: reg.tags ?? b.tags,
        badges:
          Array.isArray(reg.badges) && reg.badges.length > 0
            ? reg.badges
            : b.badges,
        is_featured: reg.is_featured ?? b.is_featured,
        aliases: reg.aliases ?? b.aliases,
        lat: reg.lat ?? b.lat,
        lng: reg.lng ?? b.lng,
        google_place_id: reg.google_place_id ?? b.google_place_id,
        google_maps_name: reg.google_maps_name ?? b.google_maps_name,
        google_rating: reg.google_rating ?? b.google_rating,
        google_review_count: reg.google_review_count ?? b.google_review_count,
        rating_check_date: reg.rating_check_date ?? b.rating_check_date,
        google_review_analysis: reg.google_review_analysis ?? b.google_review_analysis,
        services: reg.services ?? b.services,
        gallery_urls:
          Array.isArray(reg.gallery_urls) && reg.gallery_urls.length > 0
            ? reg.gallery_urls
            : b.gallery_urls,
        media_note: reg.media_note ?? b.media_note,
        photo_permission: reg.photo_permission ?? b.photo_permission,
      }
    })
    .filter((b: any) => b.category === category && (!b.status || b.status === 'published') && !isHiddenBusiness(b))

  const dbSlugs = new Set((data || []).map((b: any) => b.slug))
  const unmigratedSunsetItems = combinedRegistry.filter(
    (b) => b.zone !== 'khem-beach' && b.public_category === category && !dbSlugs.has(b.slug)
  )

  const items = [
    ...(enrichedData.length > 0 && !['beaches', 'transport'].includes(category)
      ? [...enrichedData, ...unmigratedSunsetItems]
      : combinedRegistry.filter(
          (b) => b.zone !== 'khem-beach' && b.public_category === category
        )),
    ...khemItems,
  ].filter((b: any) => !isHiddenBusiness(b))

  const initialZone = normalizeZoneQuery(searchParams?.zone)

  return (
    <main className="directoryPage">
      <SiteHeader locale={locale} />
      <section
        className={`directoryHero categoryDirectoryHero theme-${theme}`}
        style={{
          background: '#0F172A',
          color: '#FFFFFF',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '56px 24px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <img
          src={rawConfig?.image || '/categories/dining.webp'}
          alt={label}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        />
        <div
          className="directoryHeroShade"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(8, 20, 32, 0.45) 0%, rgba(8, 20, 32, 0.68) 100%)',
          }}
        />
        <article
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {icon?.icon_url ? (
            <div
              className="directoryCategoryIcon"
              style={{
                fontSize: '44px',
                lineHeight: 1,
                marginBottom: '10px',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
              }}
            >
              <img src={icon.icon_url} alt={`${label} icon`} />
            </div>
          ) : null}
          <span
            className="eyebrow"
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: '12.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            {dict.directory.heroEyebrowPrefix} · {eyebrow}
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: '10px 0 14px',
              textShadow: '0 2px 10px rgba(0,0,0,0.35)',
            }}
          >
            {label}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '16px',
              lineHeight: 1.55,
              margin: '0 auto',
              maxWidth: '640px',
              textShadow: '0 1px 4px rgba(0,0,0,0.25)',
            }}
          >
            {description} {dict.directory.heroDescSuffix}
          </p>
        </article>
      </section>
      <section className="shell directoryFull">
        <DirectoryBrowser
          category={category}
          items={items as any}
          shuffleSeed={String(Date.now())}
          locale={locale}
          initialZone={initialZone}
        />
      </section>
    </main>
  )
}
