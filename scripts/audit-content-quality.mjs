#!/usr/bin/env node
/**
 * scripts/audit-content-quality.mjs
 *
 * Comprehensive content, image, multilingual copy, hotel card summary, and metadata
 * quality audit across all My Phu Quoc directories, 5 hotel tabs, activities, banking,
 * 7 locales (en, ko, zh, ru, ja, hi, vi), and public/ assets.
 *
 * Usage:
 *   node scripts/audit-content-quality.mjs [--json] [--strict]
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const LOCALES = ['en', 'ko', 'zh', 'ru', 'ja', 'hi', 'vi']
const NON_KO_LOCALES = ['en', 'zh', 'ru', 'ja', 'hi', 'vi']
const TRANSLATED_LOCALES = ['zh', 'ru', 'ja', 'hi', 'vi']

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'))
}

function readText(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8')
}

// Extract HIDDEN_BUSINESS_SLUGS & HIDDEN_BUSINESS_IDS from lib/directory.ts
function loadHiddenSets() {
  const src = readText('lib/directory.ts')
  const slugBlock = src.match(/HIDDEN_BUSINESS_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)
  const idBlock = src.match(/HIDDEN_BUSINESS_IDS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)
  const extractLiterals = (block) => {
    if (!block) return []
    return Array.from(block[1].matchAll(/'([^']+)'/g)).map((m) => m[1])
  }
  return {
    hiddenSlugs: new Set(extractLiterals(slugBlock)),
    hiddenIds: new Set(extractLiterals(idBlock)),
  }
}

function checkPublicAsset(assetUrl) {
  if (!assetUrl || typeof assetUrl !== 'string') {
    return { exists: false, reason: 'empty_url' }
  }
  if (/^https?:\/\//i.test(assetUrl)) {
    return { exists: true, remote: true }
  }
  const cleanRel = assetUrl.replace(/^\//, '').split('?')[0]
  const fullPath = path.join(ROOT, 'public', cleanRel)
  if (!fs.existsSync(fullPath)) {
    return { exists: false, reason: 'missing_file', fullPath }
  }
  const stat = fs.statSync(fullPath)
  if (!stat.isFile() || stat.size === 0) {
    return { exists: false, reason: 'empty_file', fullPath }
  }
  return { exists: true, size: stat.size }
}

function hasUnbalancedParens(str) {
  if (!str) return false
  let depth = 0
  for (const ch of str) {
    if (ch === '(' || ch === '（') depth++
    else if (ch === ')' || ch === '）') {
      depth--
      if (depth < 0) return true
    }
  }
  return depth !== 0
}

function hasMalformedParenSpacing(str) {
  if (!str) return false
  // Catch `( M.I.N Spa` or `()` empty parens
  if (/\(\s*\)|（\s*）/.test(str)) return true
  if (/\(\s+[^)]|\s+\)/.test(str)) return true
  return false
}

// Mechanical 1-line template detectors per locale
const EN_TEMPLATE_RE =
  /\bis\s+(?:a|an)\s+[^.]{2,65}?\s+located\s+(?:in|at|on|near)\s+(?:Sunset Town|Khem Beach|Bãi Khem|Bai Khem|An Thoi|An Thới)(?:,\s*Phu Quoc)?\.?$/i

const ZH_TEMPLATE_RE =
  /^.{1,60}?是(?:一家)?位于(?:越南)?富国岛(?:日落小镇|凯姆海滩|安泰|Sunset Town|Bãi Khem)的[^，。；]{2,25}[。.]?$/

const RU_TEMPLATE_RE =
  /^.{1,70}?\s*[—–-]\s*(?:это\s+)?[^.,;]{3,45}\s+(?:в|на)\s+(?:Сансет-Тауне|Сансет Тауне|пляже Кхем|районе Ан Тхой)(?:\s*,\s*|\s+на\s+)Фукуоке?\.?$/i

const JA_TEMPLATE_RE =
  /^.{1,70}?は、?(?:ベトナム・)?フーコック島の?(?:サンセットタウン|ケムビーチ|バイケム|アントイ)にある[^、。]{2,30}です[。.]?$/

const HI_TEMPLATE_RE =
  /^.{1,80}?\s+फू क्वोक के (?:सनसेट टाउन|खेम बीच|आन थोई) में स्थित एक [^,।.]{2,40}\s+है[।.]?$/

const VI_TEMPLATE_RE =
  /\blà\s+[^.,;]{2,55}?\s+(?:nằm tại|tọa lạc tại|ở|tại)\s+(?:Thị trấn Hoàng Hôn|Sunset Town|Bãi Khem|An Thới)(?:,\s*Phú Quốc)?\.?$/i

const RAW_CRAWLED_RE =
  /접근성\s*:|휠체어\s*이용|\[대표\s*메뉴\/가격\]|•\s*\[|Accessibility:\s*Wheelchair|\[Signature\s*Menu\/Price\]/i

const HANGUL_RE = /[\uac00-\ud7a3]/

function isVagueAddress(addr) {
  if (!addr || !addr.trim()) return true
  const s = addr
    .trim()
    .replace(/^베트남\s+/, '')
    .replace(/,\s*(Vietnam|베트남)$/i, '')
    .replace(/,\s*(An Giang|Kiên Giang|Kien Giang)(\s*\d{5,6})?$/i, '')
    .replace(/,\s*(Phú Quốc|Phu Quoc|Phu Quoc Island)(\s*\d{5,6})?$/i, '')
    .replace(/,\s*(An Thới|An Thoi)$/i, '')
    .trim()
  if (!s) return true
  if (/^(Phu Quoc|Phú Quốc|An Thới|An Thoi|An Giang|Kiên Giang|\d{5,6}|Vietnam|베트남|,\s*)+$/i.test(s)) {
    return true
  }
  // If literally only "Sunset Town" with no street, zone, building, or landmark detail
  if (/^(Sunset Town|Thị trấn Hoàng Hôn|선셋타운)$/i.test(s)) {
    return true
  }
  return false
}

function getEffectiveBizDescription(b, bizDescMap, locale) {
  if (locale === 'ko') {
    return (b.description_ko || '').trim()
  }
  if (locale === 'en') {
    return (b.description_en || '').trim()
  }
  const fromMap = bizDescMap[b.slug]?.[locale]
  if (fromMap && String(fromMap).trim()) return String(fromMap).trim()
  const inline = b[`description_${locale}`]
  if (inline && String(inline).trim()) return String(inline).trim()
  return ''
}

function countMenuItems(menuEntry) {
  if (!menuEntry) return 0
  let total = 0
  if (Array.isArray(menuEntry.sections)) {
    for (const sec of menuEntry.sections) {
      if (Array.isArray(sec.items)) total += sec.items.length
    }
  }
  if (total === 0 && Array.isArray(menuEntry.known_dishes)) {
    total += menuEntry.known_dishes.length
  }
  return total
}

function getHotelPriceCategory(hotel) {
  const level = hotel.priceRange ? hotel.priceRange.length : null
  if (level) {
    if (level >= 4) return 'luxury'
    if (level >= 2) return 'boutique'
    return 'guesthouse'
  }
  if ((hotel.star || 0) >= 4) return 'luxury'
  return 'boutique'
}

function isRecommendedHotel(hotel) {
  return (
    hotel.tier === 'top' ||
    hotel.tier === 'recommended' ||
    Boolean(hotel.isFeatured) ||
    hotel.slug === 'jw-marriott-phu-quoc-emerald-bay'
  )
}

// ============================================================================
// Run Audit
// ============================================================================
const { hiddenSlugs, hiddenIds } = loadHiddenSets()
const businessesRegistry = readJson('data/businesses-registry.json')
const khemBusinesses = readJson('data/khem-beach-businesses.json')
const coverPhotos = readJson('data/cover-photos.json')
const bizDescMap = readJson('data/i18n/translations/biz_desc.json')
const menusRegistry = readJson('data/menus-registry.json')
const sunsetHotels = readJson('data/sunset_town_hotels.json').hotels || []
const khemHotels = readJson('data/khem_beach_hotels.json').hotels || []

const coverMap = new Map()
for (const c of coverPhotos) {
  if (c && c.slug && c.status !== 'revoked') {
    coverMap.set(c.slug, c)
  }
}

const activeBusinesses = [
  ...businessesRegistry
    .filter((b) => (!b.status || b.status === 'published') && !hiddenSlugs.has(b.slug) && !hiddenIds.has(String(b.id)))
    .map((b) => ({ ...b, _source: 'businesses-registry.json' })),
  ...khemBusinesses
    .filter((b) => b.status === 'published' && !hiddenSlugs.has(b.slug) && !hiddenIds.has(String(b.id)))
    .map((b) => ({ ...b, _source: 'khem-beach-businesses.json' })),
]

const issues = {
  // 1. Image defects
  missingCoverAndGallery: [],
  brokenImageFiles: [],
  galleryUnder3: [],
  hotelImageDefects: [],
  activityImageDefects: [],

  // 2. Description & copy defects
  enTemplateOrMissing: [],
  koShortOrMissing: [],
  otherLocaleMissingOrTemplate: [],
  hangulInNonKo: [],
  nameOrParenTypos: [],
  rawCrawledStrings: [],
  hotelSummaryDefects: [],

  // 3. Metadata, classification, menus & raw labels
  vagueAddresses: [],
  missingRatingOrReviews: [],
  sparseMenusFnB: [],
  placeholderSlugs: [],
  rawUnverifiedUiStrings: [],
}

// --- A. Scan Active Directory Businesses ---
for (const b of activeBusinesses) {
  const slug = b.slug
  const cat = b.category
  const isNameOnly = b.display_mode === 'name_only'
  const cover = coverMap.get(slug)
  const gallery = Array.isArray(b.gallery_urls) ? b.gallery_urls.filter(Boolean) : []

  // 1-a. Cover & Gallery presence
  if (!cover && gallery.length === 0) {
    issues.missingCoverAndGallery.push({
      slug,
      category: cat,
      name: b.public_name,
      source: b._source,
    })
  }

  // 1-b. Verify public/ file existence
  if (cover?.image_url) {
    const chk = checkPublicAsset(cover.image_url)
    if (!chk.exists) {
      issues.brokenImageFiles.push({ slug, type: 'cover', url: cover.image_url, reason: chk.reason })
    }
  }
  for (const gUrl of gallery) {
    const chk = checkPublicAsset(gUrl)
    if (!chk.exists) {
      issues.brokenImageFiles.push({ slug, type: 'gallery', url: gUrl, reason: chk.reason })
    }
  }

  // 1-c. Gallery < 3 photos
  if (gallery.length < 3) {
    issues.galleryUnder3.push({
      slug,
      category: cat,
      subcategory: b.subcategory,
      count: gallery.length,
      hasCover: Boolean(cover),
      name: b.public_name,
      source: b._source,
    })
  }

  // 2-a. Name & parenthesis typos
  const nameFields = [
    ['public_name', b.public_name],
    ['name_en', b.name_en],
    ['name_local', b.name_local],
    ['google_maps_name', b.google_maps_name],
  ]
  for (const [field, val] of nameFields) {
    if (!val) continue
    if (hasUnbalancedParens(val) || hasMalformedParenSpacing(val)) {
      issues.nameOrParenTypos.push({ slug, field, value: val, source: b._source })
    }
  }

  if (!isNameOnly) {
    // 2-b. EN description
    const descEn = getEffectiveBizDescription(b, bizDescMap, 'en')
    if (!descEn || EN_TEMPLATE_RE.test(descEn) || descEn.length < 70) {
      issues.enTemplateOrMissing.push({
        slug,
        category: cat,
        len: descEn.length,
        isTemplate: EN_TEMPLATE_RE.test(descEn),
        text: descEn,
        source: b._source,
      })
    }

    // 2-c. KO description (< 50 chars including spaces)
    const descKo = getEffectiveBizDescription(b, bizDescMap, 'ko')
    if (!descKo || descKo.length < 50) {
      issues.koShortOrMissing.push({
        slug,
        category: cat,
        len: descKo.length,
        text: descKo,
        source: b._source,
      })
    }

    // 2-d. Other locales (zh, ru, ja, hi, vi)
    for (const loc of TRANSLATED_LOCALES) {
      const descLoc = getEffectiveBizDescription(b, bizDescMap, loc)
      let reason = null
      if (!descLoc) {
        reason = 'missing_translation'
      } else if (descEn && descLoc === descEn) {
        reason = 'identical_to_en_fallback'
      } else if (loc === 'zh' && (ZH_TEMPLATE_RE.test(descLoc) || descLoc.length < 26)) {
        reason = ZH_TEMPLATE_RE.test(descLoc) ? 'zh_1line_template' : 'zh_too_short'
      } else if (loc === 'ru' && (RU_TEMPLATE_RE.test(descLoc) || descLoc.length < 55)) {
        reason = RU_TEMPLATE_RE.test(descLoc) ? 'ru_1line_template' : 'ru_too_short'
      } else if (loc === 'ja' && (JA_TEMPLATE_RE.test(descLoc) || descLoc.length < 34)) {
        reason = JA_TEMPLATE_RE.test(descLoc) ? 'ja_1line_template' : 'ja_too_short'
      } else if (loc === 'hi' && (HI_TEMPLATE_RE.test(descLoc) || descLoc.length < 55)) {
        reason = HI_TEMPLATE_RE.test(descLoc) ? 'hi_1line_template' : 'hi_too_short'
      } else if (loc === 'vi' && (VI_TEMPLATE_RE.test(descLoc) || descLoc.length < 55)) {
        reason = VI_TEMPLATE_RE.test(descLoc) ? 'vi_1line_template' : 'vi_too_short'
      }

      if (reason) {
        issues.otherLocaleMissingOrTemplate.push({
          slug,
          category: cat,
          locale: loc,
          reason,
          len: descLoc.length,
          text: descLoc.slice(0, 110),
        })
      }
    }

    // 2-e. Hangul leak in non-KO descriptions & raw crawled strings in all locales
    for (const loc of LOCALES) {
      const d = getEffectiveBizDescription(b, bizDescMap, loc)
      if (!d) continue
      if (loc !== 'ko' && HANGUL_RE.test(d)) {
        issues.hangulInNonKo.push({ slug, locale: loc, text: d.slice(0, 120) })
      }
      if (RAW_CRAWLED_RE.test(d)) {
        issues.rawCrawledStrings.push({ slug, category: cat, locale: loc, text: d })
      }
      if (/\(\s*\)|（\s*）/.test(d)) {
        issues.nameOrParenTypos.push({ slug, field: `description_${loc}`, value: d, source: b._source })
      }
    }
  }

  // 3-a. Vague addresses
  if (isVagueAddress(b.address)) {
    issues.vagueAddresses.push({
      slug,
      category: cat,
      name: b.public_name,
      address: b.address,
      source: b._source,
    })
  }

  // 3-b. Missing rating / review count (exclude ATMs/landmarks/pure public beaches if non-commercial, but report all commercial)
  const isNonRatedType =
    cat === 'banking' ||
    b.subcategory === 'beach' ||
    b.subcategory === 'landmark' ||
    cat === 'activities' ||
    (b.subcategory === 'souvenirs' && b.verification_status === 'verified' && !b.google_place_id)
  if (!isNonRatedType && (!b.google_rating || !b.google_review_count)) {
    issues.missingRatingOrReviews.push({
      slug,
      category: cat,
      subcategory: b.subcategory,
      rating: b.google_rating ?? null,
      reviews: b.google_review_count ?? null,
      source: b._source,
    })
  }

  // 3-c. Sparse menus (<= 1 item) on F&B businesses with a menu entry OR featured F&B
  const isFnB =
    cat === 'dining' ||
    cat === 'bars' ||
    (cat === 'beaches' && b.subcategory && b.subcategory !== 'beach')
  if (isFnB) {
    const pid = b.google_place_id
    const menuEntry = pid ? menusRegistry[pid] : null
    const itemCount = countMenuItems(menuEntry)
    if ((menuEntry && itemCount <= 1) || slug === 'cielo') {
      if (itemCount <= 1) {
        issues.sparseMenusFnB.push({
          slug,
          category: cat,
          placeId: pid,
          itemCount,
          grade: menuEntry?.info_level || menuEntry?.grade || null,
        })
      }
    }
  }

  // 3-d. Placeholder slugs (e.g. sunset-place-9) not in preserved canonical legacy URLs
  const PRESERVED_LEGACY_SLUGS = new Set([
    'sunset-place',
    'sunset-place-1',
    'sunset-place-2',
    'sunset-place-3',
    'sunset-place-7',
    'sunset-place-10',
  ])
  if (/^sunset-place-\d*$/i.test(slug) && !PRESERVED_LEGACY_SLUGS.has(slug)) {
    issues.placeholderSlugs.push({
      slug,
      category: cat,
      name: b.public_name,
    })
  }
}

// --- B. Scan All 5 Hotel Tabs (Sunset Town + Khem Beach) ---
const allHotels = [
  ...sunsetHotels.map((h) => ({ ...h, _area: 'sunset-town' })),
  ...khemHotels.map((h) => ({ ...h, _area: 'khem-beach' })),
]

for (const h of allHotels) {
  const tabs = []
  if (isRecommendedHotel(h)) tabs.push('recommended')
  if (h._area === 'khem-beach') {
    tabs.push('khem-beach')
  } else {
    tabs.push(getHotelPriceCategory(h))
  }

  const photos = Array.isArray(h.photos) ? h.photos.filter(Boolean) : []
  if (photos.length < 3) {
    issues.hotelImageDefects.push({
      slug: h.slug,
      tabs,
      type: 'gallery_under_3',
      count: photos.length,
    })
  }
  for (const p of photos) {
    const chk = checkPublicAsset(p)
    if (!chk.exists) {
      issues.hotelImageDefects.push({
        slug: h.slug,
        tabs,
        type: 'missing_photo_file',
        url: p,
        reason: chk.reason,
      })
    }
  }
  for (const room of h.rooms || []) {
    if (room.photo) {
      const chk = checkPublicAsset(room.photo)
      if (!chk.exists) {
        issues.hotelImageDefects.push({
          slug: h.slug,
          tabs,
          type: 'missing_room_photo',
          url: room.photo,
          reason: chk.reason,
        })
      }
    }
  }

  // Check Hotel Card Summaries across ALL 7 locales
  const summaryByLoc = {
    ko: h.summary || '',
    en: h.summary_en || '',
    zh: h.summary_zh || '',
    ru: h.summary_ru || '',
    ja: h.summary_ja || '',
    hi: h.summary_hi || '',
    vi: h.summary_vi || '',
  }

  for (const loc of LOCALES) {
    const s = (summaryByLoc[loc] || '').trim()
    if (!s) {
      issues.hotelSummaryDefects.push({ slug: h.slug, tabs, locale: loc, reason: 'missing_summary', len: 0, text: '' })
      continue
    }
    if (s.includes('…') || s.includes('...')) {
      issues.hotelSummaryDefects.push({ slug: h.slug, tabs, locale: loc, reason: 'contains_ellipsis', len: s.length, text: s })
    }
    if (loc !== 'ko' && HANGUL_RE.test(s)) {
      issues.hotelSummaryDefects.push({ slug: h.slug, tabs, locale: loc, reason: 'hangul_in_non_ko', len: s.length, text: s })
    }
    // Check card 2-line clamp overflow or overly terse (<25 chars KO / <50 chars EN)
    if (loc === 'ko' && (s.length < 35 || s.length > 56)) {
      issues.hotelSummaryDefects.push({
        slug: h.slug,
        tabs,
        locale: loc,
        reason: s.length > 56 ? 'ko_card_clamp_risk_over_56' : 'ko_too_short_under_35',
        len: s.length,
        text: s,
      })
    }
    if (loc === 'en' && (s.length < 60 || s.length > 105)) {
      issues.hotelSummaryDefects.push({
        slug: h.slug,
        tabs,
        locale: loc,
        reason: s.length > 105 ? 'en_card_clamp_risk_over_105' : 'en_too_short_under_60',
        len: s.length,
        text: s,
      })
    }
    if (loc === 'zh' && (s.length < 20 || s.length > 48)) {
      issues.hotelSummaryDefects.push({
        slug: h.slug,
        tabs,
        locale: loc,
        reason: s.length > 48 ? 'zh_card_clamp_risk_over_48' : 'zh_too_short_under_20',
        len: s.length,
        text: s,
      })
    }
    if (loc === 'ja' && (s.length < 28 || s.length > 60)) {
      issues.hotelSummaryDefects.push({
        slug: h.slug,
        tabs,
        locale: loc,
        reason: s.length > 60 ? 'ja_card_clamp_risk_over_60' : 'ja_too_short_under_28',
        len: s.length,
        text: s,
      })
    }
    if ((loc === 'ru' || loc === 'vi') && (s.length < 55 || s.length > 115)) {
      issues.hotelSummaryDefects.push({
        slug: h.slug,
        tabs,
        locale: loc,
        reason: s.length > 115 ? `${loc}_card_clamp_risk_over_115` : `${loc}_too_short_under_55`,
        len: s.length,
        text: s,
      })
    }
    if (loc === 'hi' && (s.length < 50 || s.length > 115)) {
      issues.hotelSummaryDefects.push({
        slug: h.slug,
        tabs,
        locale: loc,
        reason: s.length > 115 ? 'hi_card_clamp_risk_over_115' : 'hi_too_short_under_50',
        len: s.length,
        text: s,
      })
    }
  }
}

// Check HotelsPage.tsx hardcoded slice(0, 39) truncation bug
const hotelsPageSrc = readText('components/HotelsPage.tsx')
if (/summaryText\.slice\(\s*0\s*,\s*39\s*\)/.test(hotelsPageSrc)) {
  issues.hotelSummaryDefects.push({
    slug: '_HotelsPage.tsx_',
    tabs: ['all'],
    locale: 'all',
    reason: 'hardcoded_js_slice_39_ellipsis_in_HotelsPage',
    len: 39,
    text: 'summaryText.length > 40 ? `${summaryText.slice(0, 39)}…` : summaryText',
  })
}

// --- C. Scan Activities & Banking Assets and Raw Unverified/Unconfirmed UI Strings ---
const yachtSrc = readText('lib/activities/marmorisYacht.ts')
for (const m of yachtSrc.matchAll(/['"](\/(?:activities|images|covers-photo)\/[^'"]+)['"]/g)) {
  const chk = checkPublicAsset(m[1])
  if (!chk.exists) {
    issues.activityImageDefects.push({ file: 'lib/activities/marmorisYacht.ts', url: m[1], reason: chk.reason })
  }
}

const rawUiFiles = [
  'lib/banking.ts',
  'lib/activities/partnerTours.ts',
  'components/ActivityPartnerToursSection.tsx',
]
for (const rel of rawUiFiles) {
  const lines = readText(rel).split('\n')
  lines.forEach((line, idx) => {
    // Ignore TypeScript property/identifier names like `unverifiedItems` or `unverifiedTitle:` key itself; match string values containing raw Unverified / Unconfirmed / 미확인
    const valMatch = line.match(/:\s*['"`]([^'"`]*\b(?:Unverified|Unconfirmed)\b[^'"`]*)['"`]/i)
    if (valMatch) {
      issues.rawUnverifiedUiStrings.push({
        file: rel,
        line: idx + 1,
        value: valMatch[1],
      })
    }
  })
}

// ============================================================================
// Output Report
// ============================================================================
const summary = {
  scannedBusinesses: activeBusinesses.length,
  scannedHotels: allHotels.length,
  counts: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length])),
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ summary, issues }, null, 2))
} else {
  console.log('======================================================================')
  console.log(' My Phu Quoc Content & Asset Quality Audit Report')
  console.log('======================================================================')
  console.log(`Scanned active directory businesses : ${summary.scannedBusinesses}`)
  console.log(`Scanned hotels (Sunset + Khem)      : ${summary.scannedHotels}`)
  console.log('----------------------------------------------------------------------')
  for (const [k, count] of Object.entries(summary.counts)) {
    console.log(`  ${k.padEnd(32)} : ${count}`)
  }
  console.log('----------------------------------------------------------------------')

  const printSample = (title, arr, limit = 50) => {
    if (arr.length === 0) return
    console.log(`\n[${title}] (${arr.length})`)
    for (const item of arr.slice(0, limit)) {
      console.log('  -', JSON.stringify(item))
    }
    if (arr.length > limit) {
      console.log(`  ... and ${arr.length - limit} more`)
    }
  }

  printSample('1A. Missing Cover & Gallery', issues.missingCoverAndGallery)
  printSample('1B. Broken Image Files in public/', issues.brokenImageFiles)
  printSample('1C. Business Gallery < 3 Photos', issues.galleryUnder3)
  printSample('1D. Hotel Image Defects', issues.hotelImageDefects)
  printSample('1E. Activity Image Defects', issues.activityImageDefects)
  printSample('2A. EN Mechanical Template or Missing', issues.enTemplateOrMissing, 80)
  printSample('2B. KO Short (<50 chars) or Missing', issues.koShortOrMissing, 80)
  printSample('2C. Other Locale (zh/ru/ja/hi/vi) Missing or Template', issues.otherLocaleMissingOrTemplate, 40)
  printSample('2D. Hangul Leak in Non-KO', issues.hangulInNonKo)
  printSample('2E. Name / Parenthesis Typos', issues.nameOrParenTypos)
  printSample('2F. Raw Crawled Strings in Descriptions', issues.rawCrawledStrings, 80)
  printSample('2G. Hotel Card Summary Defects', issues.hotelSummaryDefects, 40)
  printSample('3A. Vague Addresses', issues.vagueAddresses)
  printSample('3B. Missing Rating / Review Count', issues.missingRatingOrReviews)
  printSample('3C. Sparse Menus (<=1 item) on F&B', issues.sparseMenusFnB)
  printSample('3D. Placeholder Slugs', issues.placeholderSlugs)
  printSample('3E. Raw Unverified/Unconfirmed UI Strings', issues.rawUnverifiedUiStrings)
}

if (process.argv.includes('--strict')) {
  const totalDefects = Object.values(summary.counts).reduce((a, b) => a + b, 0)
  if (totalDefects > 0) {
    process.exit(1)
  }
}
