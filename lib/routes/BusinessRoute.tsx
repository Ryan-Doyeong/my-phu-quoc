import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SocialIcons } from '@/components/SocialIcons'
import { BusinessReviews, BusinessInstagram } from '@/components/BusinessEnrichment'
import { BusinessMenuSection } from '@/components/BusinessMenuSection'
import { BusinessCover } from '@/components/BusinessCover'
import { getCoverPhoto } from '@/lib/coverPhotos'
import { loadMenuForPlace } from '@/lib/menus'
import businessesRegistry from '@/data/businesses-registry.json'
import { categoryLabel, nearbyBadgeText } from '@/lib/directory'
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

export async function generateBusinessMetadata(
  slug: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  const supabase = createPublicClient()
  let b: any = null
  try {
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    b = data
  } catch {}
  if (!b) {
    b = (businessesRegistry as any[]).find((x) => x.slug === slug) || null
  }
  if (!b) return {}

  const rawDesc = selectBusinessDescription(b, locale)
  const description = rawDesc
    ? rawDesc.slice(0, 150) + (rawDesc.length > 150 ? '...' : '')
    : `${categoryLabel(b.category, locale)} - ${b.address || 'Phu Quoc'}`

  const coverPhoto = getCoverPhoto(slug)
  const ogImage = coverPhoto
    ? coverPhoto.image_url.startsWith('http')
      ? coverPhoto.image_url
      : localeUrl(locale, coverPhoto.image_url)
    : undefined
  const barePath = `/business/${b.slug}`
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)

  return {
    title: `${b.public_name} | Good Life in Phu Quoc`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${b.public_name} | Good Life in Phu Quoc`,
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
  const dict = getDictionary(locale)
  const supabase = createPublicClient()
  let b: any = null
  try {
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    b = data
  } catch {}
  if (!b) {
    b = (businessesRegistry as any[]).find((x) => x.slug === slug) || null
  }
  if (!b) notFound()

  const photos = (b.gallery_urls || []).length
    ? b.gallery_urls
    : defaultImages(b.category, b.subcategory, b.tags)
  const hours = humanHours(b.opening_hours)
  const badgeText = getPhotoBadgeText(b.media_note, locale, photos[0])
  const nearbyText = nearbyBadgeText(b.address, b.tags, b.badges, locale)
  const catLabel = categoryLabel(b.category, locale)
  const subLabel = b.subcategory
    ? translateTerm(b.subcategory, locale)
    : translateTerm('General', locale)
  const localizedDescription = selectBusinessDescription(b, locale) || dict.business.detailsPreparing
  const placeIdMatch = b.google_maps_url
    ? b.google_maps_url.match(/place_id:([A-Za-z0-9_-]+)/) ||
      b.google_maps_url.match(/place_id=([A-Za-z0-9_-]+)/)
    : null
  const googlePlaceId = b.google_place_id || (placeIdMatch ? placeIdMatch[1] : null)
  const menuData = loadMenuForPlace(googlePlaceId)

  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: b.public_name,
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
            <Link href={localePath(locale, `/directory/${b.category}`)}>
              {dict.business.backTo(catLabel)}
            </Link>
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
                    alt={b.public_name}
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
                  <span>사진 출처:</span>
                  <a
                    href={coverPhoto.source_page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    업체 공식 홈페이지/SNS
                  </a>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <Link
                    href={localePath(
                      locale,
                      `/for-businesses?public_name=${encodeURIComponent(b.public_name)}&slug=${encodeURIComponent(b.slug)}#claim`
                    )}
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    사진 삭제·수정 요청
                  </Link>
                </div>
              </div>
            )
          }

          if ((b.gallery_urls || []).length > 0) {
            return (
              <div className="photoGallery">
                {b.gallery_urls.slice(0, 8).map((p: string, i: number) => (
                  <div key={i} className={i === 0 ? 'galleryTile main' : 'galleryTile'}>
                    <img
                      src={imageUrl(p, i === 0 ? 1400 : 760, i === 0 ? 76 : 70)}
                      alt={`${b.public_name} image ${i + 1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    {badgeText && <span>{badgeText}</span>}
                  </div>
                ))}
              </div>
            )
          }

          return (
            <div style={{ marginBottom: '28px' }}>
              <BusinessCover
                name={b.public_name}
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
              {catLabel} · {subLabel}
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
              {b.is_good_life_member && (
                <Link
                  href={localePath(locale, '/member')}
                  className="businessBadge badgegoodlifemember"
                >
                  {translateBadge('Good Life Phu Quoc member', locale)}
                </Link>
              )}
            </div>
            {(() => {
              const { primary, secondary } = splitBusinessTitle(b.public_name)
              return (
                <div className="businessTitleGroup">
                  <h1 className="businessPrimaryTitle">{primary}</h1>
                  {secondary && <p className="businessSecondaryTitle">{secondary}</p>}
                </div>
              )
            })()}
            <div className="ratingLine">
              {b.google_rating ? (
                <>
                  <strong>★ {Number(b.google_rating).toFixed(1)}</strong>
                  {b.google_review_count ? (
                    <span>
                      {dict.business.reviewsCount(
                        Number(b.google_review_count).toLocaleString()
                      )}
                    </span>
                  ) : null}
                </>
              ) : null}
              <span>{b.address}</span>
            </div>
            <div className="tagList businessTags">
              {(b.tags || []).map((x: string) => (
                <span key={x}>{translateTerm(x, locale)}</span>
              ))}
            </div>
          </div>
          <SocialIcons
            website={b.website_url}
            facebook={b.facebook_url}
            instagram={b.instagram_url}
            tiktok={b.tiktok_url}
            businessId={b.id}
          />
        </div>
        {b.media_note && (
          <div className="mediaDisclosure">
            <strong>{dict.business.photoNoteTitle}</strong>{' '}
            <span>{dict.business.photoNoteDesc}</span>
          </div>
        )}
        {b.is_good_life_member && (
          <div className="memberDisclosure">
            <div>
              <strong>{dict.business.memberTitle}</strong>
              <p>{b.good_life_member_note || dict.business.memberDefaultNote}</p>
            </div>
            <Link href={localePath(locale, '/member')}>{dict.business.memberLink}</Link>
          </div>
        )}
        <div className="businessColumns">
          <article className="detailCard">
            <h2>{dict.business.aboutPlace}</h2>
            <p className="detailLead">{localizedDescription}</p>
            {(b.category === 'dining' || b.category === 'bars' || menuData) && (
              <BusinessMenuSection menuData={menuData} locale={locale} />
            )}
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
                  {b.category === 'food' || b.category === 'cafe'
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
            <BusinessReviews b={b} locale={locale} />
          </article>
          <aside className="detailCard stickyInfo">
            <h3>{dict.business.practicalInfo}</h3>
            <dl>
              {b.subcategory && (
                <>
                  <dt>{dict.business.businessType}</dt>
                  <dd>{translateTerm(b.subcategory, locale)}</dd>
                </>
              )}
              {nearbyText && (
                <>
                  <dt>{dict.business.area}</dt>
                  <dd>{nearbyText}</dd>
                </>
              )}
              {b.address && (
                <>
                  <dt>{dict.business.address}</dt>
                  <dd>{b.address}</dd>
                </>
              )}
              {b.phone && (
                <>
                  <dt>{dict.business.phone}</dt>
                  <dd>{b.phone}</dd>
                </>
              )}
              {b.price_level && (
                <>
                  <dt>{dict.business.price}</dt>
                  <dd>{b.price_level}</dd>
                </>
              )}
              {hours && (
                <>
                  <dt>{dict.business.hours}</dt>
                  <dd>
                    {hours.map(([d, h]) => (
                      <div key={d}>
                        {String(d).toLowerCase() === 'raw' ? (
                          String(h)
                        ) : (
                          <>
                            <strong>{translateTerm(d, locale)}</strong> {String(h)}
                          </>
                        )}
                      </div>
                    ))}
                  </dd>
                </>
              )}
            </dl>
            <div className="sourceDisclosure">
              <small>
                {b.listing_checked_at || b.last_verified_at || b.updated_at
                  ? `${dict.business.detailsUpdatedPrefix} ${new Date(
                      b.listing_checked_at || b.last_verified_at || b.updated_at
                    ).toLocaleDateString(dateLocaleFor(locale), {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}`
                  : ''}
                {b.source_label || b.source
                  ? ` · ${dict.business.sourcePrefix}: ${b.source_label || b.source}`
                  : ''}
              </small>
            </div>
            <div className="detailActions">
              {b.google_maps_url && (
                <a
                  className="primaryButton"
                  href={b.google_maps_url}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-type="business-map"
                  data-analytics-id={b.id}
                >
                  {dict.business.viewOnGoogleMaps}
                </a>
              )}
              {b.booking_url && (
                <a
                  className="outlineDark"
                  href={b.booking_url}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-type="business-booking"
                  data-analytics-id={b.id}
                >
                  {dict.business.bookReserve}
                </a>
              )}
            </div>
            <div className="claimListingBox">
              <p
                className="publicInfoNotice"
                style={{
                  margin: '0 0 8px',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: 'var(--muted)',
                }}
              >
                <strong>{dict.business.publicNoticeTitle}</strong>{' '}
                {dict.business.publicNoticeBody}{' '}
                <strong>{dict.business.publicNoticeHours}</strong>.
              </p>
              <Link
                href={`${localePath(locale, '/for-businesses')}?public_name=${encodeURIComponent(
                  b.public_name || ''
                )}&address=${encodeURIComponent(b.address || '')}`}
              >
                {dict.business.claimListingLink}
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <BusinessInstagram b={b} locale={locale} />
    </main>
  )
}
