import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SocialIcons } from '@/components/SocialIcons'
import { BusinessReviews, BusinessInstagram } from '@/components/BusinessEnrichment'
import { BusinessMenuSection } from '@/components/BusinessMenuSection'
import { PracticalInfoCard } from '@/components/PracticalInfoCard'
import { FoodGuideSection } from '@/components/FoodGuideSection'
import { CategoryKnowledgeSection } from '@/components/CategoryKnowledgeSection'
import { GoogleReviewAnalysisCard } from '@/components/GoogleReviewAnalysisCard'
import { getFoodGuideForBusiness } from '@/lib/foodKnowledge'
import { getKnowledgeGuideForBusiness } from '@/lib/categoryKnowledge'
import { analyzeGoogleReviews } from '@/lib/googleReviewAnalyzer'
import { BusinessCover } from '@/components/BusinessCover'
import { getCoverPhoto } from '@/lib/coverPhotos'
import { loadMenuForPlace } from '@/lib/menus'
import businessesRegistry from '@/data/businesses-registry.json'
import khemBusinesses from '@/data/khem-beach-businesses.json'
import { categoryLabel, nearbyBadgeText, formatLocalizedAddress } from '@/lib/directory'
import { stockGalleryFor } from '@/lib/stockImages'
import { imageUrl } from '@/lib/imageUrl'
import {
  buildAlternates,
  dateLocaleFor,
  localePath,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'
import {
  getDictionary,
  getPhotoBadgeText,
  selectBusinessDescription,
  displayBusinessName,
  translateBadge,
  translateTerm,
} from '@/lib/i18n/dictionaries'

function defaultImages(category: string, subcategory: string | null, tags: string[] | null) {
  return stockGalleryFor(category, subcategory, tags)
}

function humanHours(v: any) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null
  const rows = Object.entries(v).filter(([, x]) => x)
  return rows.length ? rows : null
}

const PHOTO_SOURCE_LABEL: Record<string, string> = {
  ko: '사진 출처:',
  en: 'Photo Source:',
  vi: 'Nguồn ảnh:',
  zh: '照片来源：',
  ru: 'Источник фото: ',
  ja: '写真の出典：',
  hi: 'फ़ोटो स्रोत: ',
}

const PHOTO_SOURCE_TARGET: Record<string, string> = {
  ko: '업체 공식 홈페이지/SNS',
  en: 'Official Website / Social Media',
  vi: 'Website / Mạng xã hội chính thức của quán',
  zh: '商家官方网站／社交媒体',
  ru: 'Официальный сайт и соцсети заведения',
  ja: '店舗公式サイト・SNS',
  hi: 'व्यवसाय की आधिकारिक वेबसाइट / सोशल मीडिया',
}

const PHOTO_REQUEST_LINK: Record<string, string> = {
  ko: '사진 삭제·수정 요청',
  en: 'Request photo removal or update',
  vi: 'Yêu cầu gỡ bỏ hoặc chỉnh sửa ảnh',
  zh: '申请删除或修改照片',
  ru: 'Запросить удаление или изменение фото',
  ja: '写真の削除・修正依頼',
  hi: 'फ़ोटो हटाने या बदलने का अनुरोध',
}

const DELETED_SLUG_REDIRECTS: Record<string, string> = {
  'sunset-place-4': '/directory/dining',
  'sunset-place-8': '/directory/wellness',
}

export async function generateBusinessMetadata(
  slug: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  if (DELETED_SLUG_REDIRECTS[slug]) {
    return {}
  }
  const supabase = createPublicClient()
  let b: any = null
  let dbError = false
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) {
      dbError = true
    } else {
      b = data
    }
  } catch {
    dbError = true
  }
  // Supabase 장애(예외 또는 error) 시에만 로컬 선셋타운 JSON fallback 사용
  // 정상 응답인데 결과가 없는 경우(data === null, error 없음) 선셋타운 fallback 미사용
  if (!b && dbError) {
    b = (businessesRegistry as any[]).find((x) => x.slug === slug && x.status === 'published') || null
  }
  // 켐비치 업체는 Supabase에 없으므로 khemBusinesses에서 published 상태인 업체 조회
  if (!b) {
    b = (khemBusinesses as any[]).find((x) => x.slug === slug && x.status === 'published') || null
  }
  if (!b) return {}

  const rawDesc = selectBusinessDescription(b, locale)
  const description = rawDesc
    ? rawDesc.slice(0, 150) + (rawDesc.length > 150 ? '...' : '')
    : `${categoryLabel(b.category, locale)} - ${formatLocalizedAddress(b.address, locale) || 'Phu Quoc'}`

  const coverPhoto = getCoverPhoto(slug)
  const ogImage = coverPhoto
    ? coverPhoto.image_url.startsWith('http')
      ? coverPhoto.image_url
      : localeUrl(locale, coverPhoto.image_url)
    : undefined
  const barePath = `/business/${b.slug}`
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  const businessName = displayBusinessName(b, locale)

  return {
    title: `${businessName} | My Phu Quoc`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${businessName} | My Phu Quoc`,
      description,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

function splitBusinessTitle(name: string) {
  if (!name) return { primary: '', secondary: null }
  const match = name.match(/^(.*?)\s*[\(\（](.*?)[\)\）]$/)
  if (match && match[1].trim() && match[2].trim()) {
    return {
      primary: match[1].trim(),
      secondary: match[2].trim(),
    }
  }
  return {
    primary: name,
    secondary: null,
  }
}

export async function renderBusinessRoute(slug: string, locale: Locale = 'en') {
  if (DELETED_SLUG_REDIRECTS[slug]) {
    redirect(localePath(locale, DELETED_SLUG_REDIRECTS[slug]))
  }
  const dict = getDictionary(locale)
  const supabase = createPublicClient()
  let b: any = null
  let dbError = false
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) {
      dbError = true
    } else {
      b = data
    }
  } catch {
    dbError = true
  }
  // Supabase 장애(예외 또는 error) 시에만 로컬 선셋타운 JSON fallback 사용
  // 정상 응답인데 결과가 없는 경우(data === null, error 없음) 선셋타운 fallback 미사용
  if (!b && dbError) {
    b = (businessesRegistry as any[]).find((x) => x.slug === slug && x.status === 'published') || null
  }
  // 켐비치 업체는 Supabase에 없으므로 khemBusinesses에서 published 상태인 업체 조회
  if (!b) {
    b = (khemBusinesses as any[]).find((x) => x.slug === slug && x.status === 'published') || null
  }
  if (!b || b.slug === 'sunset-place-4' || b.slug === 'sunset-place-8' || b.id === 'local-sunset-139' || b.id === 'local-sunset-240') {
    if (DELETED_SLUG_REDIRECTS[slug]) {
      redirect(localePath(locale, DELETED_SLUG_REDIRECTS[slug]))
    }
    notFound()
  }

  const photos = (b.gallery_urls || []).length
    ? b.gallery_urls
    : defaultImages(b.category, b.subcategory, b.tags)
  const hours = humanHours(b.opening_hours)
  const badgeText = getPhotoBadgeText(b.media_note, locale, photos[0])
  const nearbyText = nearbyBadgeText(b.address, b.tags, b.badges, locale)
  const isKhem = b.zone === 'khem-beach' || (b.id && String(b.id).startsWith('khem-'))
  const isNameOnly = b.display_mode === 'name_only'
  const catLabel =
    isKhem && b.category === 'bars'
      ? locale === 'ko'
        ? '비치 펍'
        : locale === 'vi'
        ? 'Quán bar bãi biển'
        : locale === 'zh'
        ? '海滩酒吧'
        : locale === 'ja'
        ? 'ビーチパブ'
        : locale === 'ru'
        ? 'Пляжные бары'
        : 'Beach Pubs & Bars'
      : categoryLabel(b.category, locale)
  const subLabel = b.subcategory
    ? translateTerm(b.subcategory, locale)
    : translateTerm('General', locale)
  const localizedDescription = isNameOnly
    ? locale === 'ko'
      ? '상세 정보 준비 중'
      : locale === 'vi'
      ? 'Đang cập nhật chi tiết'
      : locale === 'zh'
      ? '详细信息准备中'
      : locale === 'ja'
      ? '詳細情報準備中'
      : locale === 'ru'
      ? 'Информация готовится'
      : 'Details coming soon'
    : selectBusinessDescription(b, locale) || dict.business.detailsPreparing
  const placeIdMatch = b.google_maps_url
    ? b.google_maps_url.match(/place_id:([A-Za-z0-9_-]+)/) ||
      b.google_maps_url.match(/place_id=([A-Za-z0-9_-]+)/)
    : null
  const googlePlaceId = b.google_place_id || (placeIdMatch ? placeIdMatch[1] : null)
  const menuData = loadMenuForPlace(googlePlaceId, locale)
  const businessDisplayName = displayBusinessName(b, locale)

  const isDiningOrFood =
    !isNameOnly &&
    (b.category === 'dining' ||
      b.category === 'food' ||
      b.category === 'cafe' ||
      b.category === 'bars' ||
      Boolean(menuData))

  const foodGuide = isDiningOrFood ? getFoodGuideForBusiness(b, menuData) : null
  const categoryGuide = !isNameOnly && !isDiningOrFood && !isKhem ? getKnowledgeGuideForBusiness(b, menuData) : null
  const reviewAnalysis = !isNameOnly ? analyzeGoogleReviews(b, locale) : null

  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessDisplayName,
  }
  if (b.address) jsonLd.address = b.address
  if (b.phone) jsonLd.telephone = b.phone
  if (b.website_url) jsonLd.url = b.website_url
  if (b.opening_hours && typeof b.opening_hours === 'object' && !Array.isArray(b.opening_hours)) {
    const parsedHours: string[] = []
    for (const [key, val] of Object.entries(b.opening_hours)) {
      if (!val) continue
      const k = key.trim()
      const v = String(val).trim()
      let candidate = ''

      if (k.toLowerCase() === 'raw') {
        candidate = v
      } else {
        const lowerK = k.toLowerCase()
        let schemaDay = ''
        if (lowerK.startsWith('mo')) schemaDay = 'Mo'
        else if (lowerK.startsWith('tu')) schemaDay = 'Tu'
        else if (lowerK.startsWith('we')) schemaDay = 'We'
        else if (lowerK.startsWith('th')) schemaDay = 'Th'
        else if (lowerK.startsWith('fr')) schemaDay = 'Fr'
        else if (lowerK.startsWith('sa')) schemaDay = 'Sa'
        else if (lowerK.startsWith('su')) schemaDay = 'Su'

        if (schemaDay) candidate = `${schemaDay} ${v}`
        else candidate = `${k} ${v}`
      }

      if (/^(Mo|Tu|We|Th|Fr|Sa|Su)/.test(candidate) && /\d{1,2}:\d{2}/.test(candidate)) {
        parsedHours.push(candidate)
      }
    }
    if (parsedHours.length > 0) {
      jsonLd.openingHours = parsedHours
    }
  }

  return (
    <main className="businessDetailPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
            {isKhem ? (
              <Link href={localePath(locale, '/zones/khem-beach')}>
                {dict.business.backTo(locale === 'ko' ? '켐비치' : 'Khem Beach')}
              </Link>
            ) : (
              <Link href={localePath(locale, `/directory/${b.category}`)}>
                {dict.business.backTo(catLabel)}
              </Link>
            )}
            <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section className="shell businessDetail">
        {(() => {
          const coverPhoto = getCoverPhoto(b.slug)
          if (coverPhoto) {
            return (
              <div style={{ marginBottom: '28px' }}>
                <div
                  className="officialCoverHero"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    maxHeight: '440px',
                    backgroundColor: '#18181b',
                  }}
                >
                  <img
                    src={coverPhoto.image_url}
                    alt={businessDisplayName}
                    style={{
                      width: '100%',
                      height: '380px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '12px',
                    color: 'var(--ink-muted, #71717a)',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  <span>{PHOTO_SOURCE_LABEL[locale] || PHOTO_SOURCE_LABEL.en}</span>
                  <a
                    href={coverPhoto.source_page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    {PHOTO_SOURCE_TARGET[locale] || PHOTO_SOURCE_TARGET.en}
                  </a>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <Link
                    href={localePath(
                      locale,
                      `/for-businesses?public_name=${encodeURIComponent(b.public_name)}&slug=${encodeURIComponent(b.slug)}#claim`
                    )}
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    {PHOTO_REQUEST_LINK[locale] || PHOTO_REQUEST_LINK.en}
                  </Link>
                </div>
              </div>
            )
          }

          if ((b.gallery_urls || []).length > 0) {
            const hasCredits = Array.isArray(b.image_credits) && b.image_credits.length > 0
            return (
              <div className="galleryContainer">
                <div className="photoGallery">
                  {b.gallery_urls.slice(0, 8).map((p: string, i: number) => (
                    <div key={i} className={i === 0 ? 'galleryTile main' : 'galleryTile'}>
                      <img
                        src={imageUrl(p, i === 0 ? 1400 : 760, i === 0 ? 76 : 70)}
                        alt={`${businessDisplayName} image ${i + 1}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      {badgeText && <span>{badgeText}</span>}
                    </div>
                  ))}
                </div>
                {hasCredits && (
                  <div className="galleryCreditsFooter">
                    <span>
                      {locale === 'ko'
                        ? '사진 출처:'
                        : locale === 'zh'
                        ? '图片来源:'
                        : locale === 'ja'
                        ? '写真出典:'
                        : locale === 'ru'
                        ? 'Источник фото:'
                        : locale === 'hi'
                        ? 'फोटो स्रोत:'
                        : locale === 'vi'
                        ? 'Nguồn ảnh:'
                        : 'Photo source:'}
                    </span>{' '}
                    {(() => {
                      const seen = new Set<string>()
                      const formatCredit = (raw: string) => {
                        return (raw || '').replace(/^Image:\s*/i, '').trim()
                      }
                      const uniqueCredits = (b.image_credits as any[]).filter((c) => {
                        const cleaned = formatCredit(c?.credit_text)
                        if (!cleaned) return false
                        if (seen.has(cleaned)) return false
                        seen.add(cleaned)
                        return true
                      })
                      return uniqueCredits.map((c: any, ci: number) => {
                        const displayText = formatCredit(c.credit_text)
                        return (
                          <span key={ci} className="galleryCreditItem">
                            {c.source_page_url && c.source_page_url !== '미확인' ? (
                              <a href={c.source_page_url} target="_blank" rel="noopener noreferrer">
                                {displayText}
                              </a>
                            ) : (
                              <span>{displayText}</span>
                            )}
                            {ci < uniqueCredits.length - 1 ? ' · ' : ''}
                          </span>
                        )
                      })
                    })()}
                  </div>
                )}
              </div>
            )
          }

          return (
            <div style={{ marginBottom: '28px' }}>
              <BusinessCover
                name={businessDisplayName}
                googleName={b.google_maps_name}
                category={b.category}
                subcategory={b.subcategory}
                aspectRatio="hero"
              />
            </div>
          )
        })()}
        <div className="businessTitleRow">
          <div>
            <span className="eyebrow">
              {isKhem ? catLabel : `${catLabel} · ${subLabel}`}
              {nearbyText ? ` · ${nearbyText}` : ''}
            </span>
            <div className="businessDetailBadges">
              {(b.badges || []).map((x: string) => (
                <span key={x} className={`businessBadge badge${x.toLowerCase()}`}>
                  {translateBadge(x, locale)}
                </span>
              ))}
              {nearbyText &&
                !(b.badges || []).some((x: string) => x.toLowerCase().includes('nearby')) && (
                  <span className="businessBadge badgenearby">{nearbyText}</span>
                )}
            </div>
            {(() => {
              const { primary, secondary } = splitBusinessTitle(businessDisplayName)
              return (
                <div className="businessTitleGroup">
                  <h1 className="businessPrimaryTitle">{primary}</h1>
                  {secondary && <p className="businessSecondaryTitle">{secondary}</p>}
                </div>
              )
            })()}
            <div className="ratingLine">
              {!isNameOnly && b.google_rating ? (
                <>
                  <strong>★ {Number(b.google_rating).toFixed(1)}</strong>
                  {b.google_review_count ? (
                    <span>
                      {dict.business.reviewsCount(
                        Number(b.google_review_count).toLocaleString()
                      )}
                    </span>
                  ) : null}
                  {b.rating_check_date ? (
                    <span className="ratingCheckDate">
                      ({locale === 'ko'
                        ? `${b.rating_check_date} 기준`
                        : locale === 'zh'
                        ? `截至 ${b.rating_check_date}`
                        : locale === 'ja'
                        ? `${b.rating_check_date} 時点`
                        : locale === 'ru'
                        ? `по сост. на ${b.rating_check_date}`
                        : locale === 'hi'
                        ? `${b.rating_check_date} तक`
                        : locale === 'vi'
                        ? `tính đến ${b.rating_check_date}`
                        : `as of ${b.rating_check_date}`})
                    </span>
                  ) : null}
                </>
              ) : null}
              <span>{formatLocalizedAddress(b.address, locale)}</span>
            </div>
            {!isNameOnly && (
              <div className="tagList businessTags">
                {(() => {
                  const seen = new Set<string>()
                  const tagsToRender = (b.tags || []).map((x: string) => translateTerm(x, locale)).filter((t: string) => {
                    if (!t) return false
                    if (seen.has(t)) return false
                    seen.add(t)
                    return true
                  })
                  return tagsToRender.map((t: string) => <span key={t}>{t}</span>)
                })()}
              </div>
            )}
          </div>
          {!isNameOnly && (
            <SocialIcons
              website={b.website_url}
              facebook={b.facebook_url}
              instagram={b.instagram_url}
              tiktok={b.tiktok_url}
              businessId={b.id}
            />
          )}
        </div>
        {!isNameOnly && b.media_note && (
          <div className="mediaDisclosure">
            <strong>{dict.business.photoNoteTitle}</strong>{' '}
            <span>{dict.business.photoNoteDesc}</span>
          </div>
        )}
        <div className="businessColumns">
          <div className="businessMainContent" style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* 1. About this place */}
            <article className="detailCard">
              <h2>{dict.business.aboutPlace}</h2>
              <p className="detailLead">{localizedDescription}</p>
              {!isNameOnly && (
                <>
                  {Array.isArray(b.highlights) && b.highlights.length > 0 && (
                    <>
                      <h3>{dict.business.whyConsider}</h3>
                      <ul className="featureList">
                        {b.highlights.map((x: string) => (
                          <li key={x}>{translateTerm(x, locale)}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {Array.isArray(b.services) && b.services.length > 0 && (
                    <>
                      <h3>
                        {b.category === 'food' || b.category === 'cafe' || b.category === 'dining'
                          ? dict.business.menuExperience
                          : b.category === 'workout'
                          ? dict.business.trainingClasses
                          : dict.business.servicesExperience}
                      </h3>
                      <div className="tagList">
                        {b.services.map((x: string) => (
                          <span key={x}>{translateTerm(x, locale)}</span>
                        ))}
                      </div>
                    </>
                  )}
                  {b.editor_note && (
                    <section className="editorsNote">
                      <span className="eyebrow">{dict.business.editorsNoteEyebrow}</span>
                      <h3>{dict.business.fromOurVisit}</h3>
                      <p>{b.editor_note}</p>
                      <small>
                        {b.editor_name || dict.business.editorDefaultName}
                        {b.editor_visited_at
                          ? ` · ${dict.business.visitedPrefix} ${new Date(
                              `${b.editor_visited_at}T00:00:00`
                            ).toLocaleDateString(dateLocaleFor(locale), {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}`
                          : ''}
                      </small>
                    </section>
                  )}
                  {b.amenities &&
                    typeof b.amenities === 'object' &&
                    Object.keys(b.amenities).length > 0 && (
                      <>
                        <h3>{dict.business.amenities}</h3>
                        <div className="amenityGrid">
                          {Object.entries(b.amenities).map(([k, v]) => (
                            <div key={k}>
                              <strong>{translateTerm(k.replaceAll('_', ' '), locale)}</strong>
                              <span>{translateTerm(String(v), locale)}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  {(() => {
                    const isKo = locale === 'ko'
                    const rawFacilities = !isKo && b.facilities_en ? b.facilities_en : b.facilities
                    if (!rawFacilities || rawFacilities === '미확인') return null

                    const KOREAN_FACILITY_KEYS: Record<string, string> = {
                      accommodations: '객실',
                      pools: '수영장',
                      dining_and_bars: '식당·바',
                      spa_and_wellness: '스파·웰니스',
                      fitness_and_activities: '피트니스·액티비티',
                      beach_facilities: '해변 시설',
                      beach_access: '해변 접근성',
                      transport_and_shuttle: '교통·셔틀',
                      notices_and_status: '공지·운영 상태',
                      equipment: '장비 대여',
                    }

                    if (typeof rawFacilities === 'object' && Object.keys(rawFacilities).length > 0) {
                      const validEntries = Object.entries(rawFacilities).filter(([, fv]: [string, any]) => {
                        if (!fv || fv === '미확인') return false
                        if (typeof fv === 'object' && fv !== null && fv.detail === '미확인') return false
                        return true
                      })

                      if (validEntries.length === 0) return null

                      return (
                        <div className="facilitiesSection">
                          <h3>{isKo ? '주요 시설 및 편의정보' : 'Key Facilities & Services'}</h3>
                          <div className="facilitiesCardList">
                            {validEntries.map(([fk, fv]: [string, any]) => {
                              const fTitle = isKo
                                ? (KOREAN_FACILITY_KEYS[fk] || fk.replace(/_/g, ' '))
                                : fk
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, (c) => c.toUpperCase())
                              const fText =
                                typeof fv === 'object' && fv !== null
                                  ? fv.detail || JSON.stringify(fv)
                                  : String(fv)
                              const fSource =
                                typeof fv === 'object' && fv !== null ? fv.source_url : null
                              return (
                                <div key={fk} className="facilityItem">
                                  <strong className="facilityKey">{fTitle}</strong>
                                  <p className="facilityDetail">{fText}</p>
                                  {fSource && fSource !== '미확인' && (
                                    <a
                                      href={fSource}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="facilitySourceLink"
                                    >
                                      {isKo ? '공식 안내 페이지 ↗' : 'Official Page ↗'}
                                    </a>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }

                    if (typeof rawFacilities === 'string' && rawFacilities.trim() !== '미확인') {
                      return (
                        <div className="facilitiesSection">
                          <h3>{isKo ? '편의시설' : 'Facilities'}</h3>
                          <p className="facilitySimpleText">{rawFacilities}</p>
                        </div>
                      )
                    }

                    return null
                  })()}
                </>
              )}
            </article>

            {/* 2. Menu & Prices (Good Life style standalone card) */}
            {isDiningOrFood && (
              <BusinessMenuSection
                menuData={menuData}
                locale={locale}
                menuImages={menuData?.menuImages}
              />
            )}

            {/* 3. Knowledge & Culture Guide (Good Life style cultural knowledge guide) */}
            {foodGuide && (
              <FoodGuideSection
                eyebrow={foodGuide.eyebrow}
                introText={foodGuide.introText}
                sections={foodGuide.sections}
                locale={locale}
              />
            )}
            {categoryGuide && (
              <CategoryKnowledgeSection
                eyebrow={categoryGuide.eyebrow}
                title={categoryGuide.title}
                introText={categoryGuide.introText}
                sections={categoryGuide.sections}
                locale={locale}
              />
            )}

            {/* 4. Google Reviews Analysis: Pros & Cons (구글맵 리뷰 분석 장단점 시각화) */}
            {reviewAnalysis && (
              <GoogleReviewAnalysisCard
                analysis={reviewAnalysis}
                businessName={businessDisplayName}
                googleMapsUrl={b.google_maps_url}
                locale={locale}
              />
            )}

            {/* 5. Reviews & Community */}
            {!isNameOnly && <BusinessReviews b={b} locale={locale} />}
          </div>

          {/* Right Column: Practical information (Good Life 100% style) */}
          <PracticalInfoCard
            business={b}
            locale={locale}
            hours={hours}
            nearbyText={nearbyText}
          />
        </div>
      </section>
      {!isNameOnly && <BusinessInstagram b={b} locale={locale} />}
    </main>
  )
}
