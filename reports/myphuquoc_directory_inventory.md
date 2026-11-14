# `myphuquoc.net` Current Directory Inventory & Schema Specification

- **Generated At:** 2026-11-15 (Baseline: `origin/main` @ `2941aaf`)
- **Purpose:** Authoritative inventory export, sparse/empty UI filter audit, deduplication master list, and exact schema specification for the **Missing Business Audit**.
- **Read-Only Audit Guarantee:** Zero application code or database records were modified to produce this report.

---

## Architecture Overview: Data Sources by Category

Before reviewing counts and filters, note that `myphuquoc.net` uses **four distinct frontend data pipelines** across the 8 scanned categories:

| Scanned Category | Public Route(s) | Primary Data Source(s) | Runtime Visibility Filter |
| :--- | :--- | :--- | :--- |
| `dining`, `bars`, `wellness`, `shopping`, `beaches` | `/[locale]/directory/[category]` & `/[locale]/business/[slug]` | `data/businesses-registry.json` (293 rows) + `data/khem-beach-businesses.json` (32 rows) + `data/zone-assignments.json` + `data/i18n/translations/biz_desc.json` + Supabase `public.businesses` | `(!b.status \|\| b.status === 'published') && !isHiddenBusiness(b)` (`HIDDEN_BUSINESS_SLUGS` [63 slugs] & `HIDDEN_BUSINESS_IDS` [43 IDs] in `lib/directory.ts`) |
| `hotels` | `/[locale]/hotels` *(redirected from `/directory/hotels`)* **+** `/[locale]/business/[slug]` | **Primary (`/hotels`):** `data/sunset_town_hotels.json` (41) + `data/khem_beach_hotels.json` (7) + `data/hotel_insights.json` + `lib/i18n/hotelTranslations.ts` + `lib/i18n/hotelTextVi.ts` (**48 active**)<br>**Secondary (`/business/[slug]`):** `data/businesses-registry.json` (35 active) + `data/khem-beach-businesses.json` (3 active) (**38 active**) | All 48 entries in `sunset_town_hotels.json` & `khem_beach_hotels.json` are live on `/hotels`. On `/business/[slug]`, 56 additional hotel rows are hidden (`draft`/`unlisted`/`hidden`). |
| `banking` | `/[locale]/directory/banking` **+** `/[locale]/business/[slug]` | **Primary (`/directory/banking`):** `BANKING_PLACES` in `lib/banking.ts` (10 total: **9 active**, 1 `private`)<br>**Secondary (`/business/[slug]`):** `data/businesses-registry.json` (9 `published` + 9 `private` An Thoi ATMs) | `p.status !== 'private'` in `components/BankingDirectory.tsx` |
| `landmarks` | `/[locale]/map` & `/[locale]/zones/sunset-town` **+** `/[locale]/business/[slug]` | **Primary (`/map`):** `SUNSET_LANDMARKS` in `lib/sunsetMapData.ts` (**12 active** POIs)<br>**Secondary (`/business/[slug]`):** `category: "activities"` (`subcategory: "attraction"`) in `data/businesses-registry.json` (**13 active**; 9 correspond to `SUNSET_LANDMARKS`) | All 12 `SUNSET_LANDMARKS` are live on `/map`. `/directory/activities` redirects to `/activities` (curated tours/tickets hub). |

---

## Section A: Summary Matrix (Counts by Category × Zone)

### A.1 Primary Live Inventory Matrix (Active / Published Items Only)

> **Zone Resolution Note:**
> - In `data/zone-assignments.json`, businesses located in An Thoi town / outside Sunset Town core carry `"zone": "sunset-town"` with `"service_areas": ["sunset-town", "an-thoi-nearby"]` (or pass `isNearbyArea()` in `lib/directory.ts`). In the table below, **`sunset-town` (Core)** and **`an-thoi / nearby`** are separated so missing-business coverage in each physical area is transparent; in `DirectoryBrowser.tsx`, `detectSunsetZone()` groups both under the `sunset-town` zone chip.
> - **Beachfront F&B Cross-Category Alert:** `8` Sunset Town beachfront restaurants/cafes/bars (e.g., *Starbucks Beach House*, *Sun Bavaria GastroPub*, *Green Tree Buffet*, *BBQ House for You*) and `4` Khem Beach beachfront restaurants/bars (*Draft Beer Bai Khem*, *Istanbul Beach Club*, *Kaisun*, *The Deck*) are stored exclusively under `category: "beaches"` (not duplicated in `dining` or `bars`).

| Category | Primary Route | `sunset-town` (Core) | `khem-beach` | `an-thoi / nearby` | **Total Active** | Non-Public / Hidden / Draft in Repo |
| :--- | :--- | ---: | ---: | ---: | ---: | ---: |
| **`dining`** | `/directory/dining` | 39 | 0 | 1 | **40** | 29 *(21 Sunset/An Thoi + 8 Khem `hidden`)* |
| **`bars`** | `/directory/bars` | 24 | 0 | 0 | **24** | 9 *(5 Sunset + 4 Khem `hidden`)* |
| **`wellness`** | `/directory/wellness` | 18 | 0 | 0 | **18** | 12 *(9 Sunset + 3 Khem `hidden`)* |
| **`shopping`** | `/directory/shopping` | 8 | 0 | 3 | **11** | 6 *(6 Sunset/An Thoi)* |
| **`hotels`** *(Primary `/hotels`)* | `/hotels` | 41 | 7 | 0 | **48** | 0 *(all 48 JSON entries active)* |
| ↳ *`hotels` (`/business/[slug]` registry)* | `/business/[slug]` | *32* | *3* | *3* | ***38*** | *56 (52 Sunset/An Thoi + 4 Khem `hidden`)* |
| **`beaches`** | `/directory/beaches` | 8 | 5 | 0 | **13** | 0 |
| **`banking`** | `/directory/banking` | 8 | 1 | 0 | **9** | 10 *(1 Khem exchange `private` + 9 An Thoi ATMs `private`)* |
| **`landmarks`** *(Primary `/map`)* | `/map` | 12 | 0 | 0 | **12** | 0 *(sub-zones: `central` 7, `sorrento` 4, `venice` 1)* |
| ↳ *`landmarks` (`activities/attraction` registry)* | `/business/[slug]` | *13* | *0* | *0* | ***13*** | *4 (Sunset/Hon Thom `unpublished`/`review`)* |
| **Total Primary Live Listings** | — | **158** | **13** | **4** | **175** | *(+9 unique `/business/[slug]`-only hotels & +4 attractions)* |

*(Note: Outside the 8 scanned categories, `data/businesses-registry.json` and `data/khem-beach-businesses.json` also hold `essentials` [0 active / 29 hidden-or-review] and `transport` [0 active / 1 hidden].)*

---

## Section B: Empty or Sparse Filter Audit (≤ 3 Matching Active Items)

Every UI filter chip defined across the frontend components was evaluated using the exact client-side predicate implemented in production code. Below is **every filter chip with 3 or fewer matching active items**.

### B.1 `components/DirectoryBrowser.tsx` (`/directory/dining`, `bars`, `wellness`, `shopping`, `beaches`)

Filter predicates in `DirectoryBrowser.tsx` (lines 396–415):
- **Zone chip (`zoneFilter`):** `detectSunsetZone(b) === zoneFilter` (`sunset-town` | `khem-beach`)
- **Subcategory / Cuisine / Type chip (`subFilter`):** `b.subcategory?.toLowerCase() === f.toLowerCase() || b.tags?.some(t => t.toLowerCase() === f.toLowerCase())`
- **Editorial Label chip (`labelFilter`):** `b.badges?.includes(lbl)` (`Recommended` | `New` | `HOT`)
- **Price Level chip (`priceFilter`):** `$ | $$ | $$$ | $$$$` against `b.price_level`

#### (1) Zone Filter Chips with ≤ 3 Active Items
| Category | Filter Group | UI Filter Chip | Exact Active Match Count | Notes |
| :--- | :--- | :--- | ---: | :--- |
| `dining` | Zone | `khem-beach` | **0** | 8 Khem dining records exist in `khem-beach-businesses.json` with `status: "hidden"`; 2 Khem restaurants (*Draft Beer Bai Khem*, *Kaisun*) are categorized under `beaches`. |
| `bars` | Zone | `khem-beach` | **0** | 4 Khem cafe/bar records have `status: "hidden"`; 2 Khem beach bars (*Istanbul Beach Club*, *The Deck*) are categorized under `beaches`. |
| `wellness` | Zone | `khem-beach` | **0** | 3 Khem wellness records in `khem-beach-businesses.json` have `status: "hidden"`. |
| `shopping` | Zone | `khem-beach` | **0** | 0 Khem shopping records exist in `khem-beach-businesses.json`. |

*(Note: `beaches` -> `khem-beach` has **5** active items, and `sunset-town` has >3 across all 5 categories.)*

#### (2) Subcategory / Cuisine / Type Filter Chips with ≤ 3 Active Items
| Category | Filter Group | UI Filter Chip (`CATEGORY_DEFS[cat].subcategories`) | Exact Active Match Count | Data / Taxonomy Root Cause |
| :--- | :--- | :--- | ---: | :--- |
| `dining` | Cuisine / Type | `Korean` | **3** | Active: `sunset-place` (*Ttungbojip*), `sura-korean-premium-restaurant`, `charcoal-korean-bbq`. *(1 more Korean venue, `bbq-house-for-you`, is under `beaches`.)* |
| `dining` | Cuisine / Type | `Japanese` | **1** | Active: `yushima-japanese-restaurant`. |
| `dining` | Cuisine / Type | `Chinese` | **0** | Only 1 item (`wan-shi-cheng-restaurant`) has `subcategory: "asian"` with no `"Chinese"` tag. |
| `dining` | Cuisine / Type | `Indian` | **0** | All 4 Indian restaurants in `businesses-registry.json` are currently `unpublished` / in `HIDDEN_BUSINESS_SLUGS`. |
| `dining` | Cuisine / Type | `Russian` | **0** | 0 items tagged `Russian` (`kafe-maksim-maxim-cafe` has `subcategory: "western"`, tags `["western", "Sunset Town"]`). |
| `dining` | Cuisine / Type | `Street Food` | **0** | **String-format bug:** `vui-fest-food-court` has `subcategory: "street_food"` (underscore) and tags `["street_food", "Sunset Town"]`, failing strict equality against `"street food"` (space). |
| `dining` | Cuisine / Type | `Vegetarian` | **0** | Only vegetarian record (`maharaja-lounge-...`) is `unpublished`. |
| `bars` | Venue Type | `Rooftop Bar` | **0** | Only rooftop bar record (`ph-rooftop-bar-...`) is in `HIDDEN_BUSINESS_SLUGS` (and categorized `dining`). |
| `bars` | Venue Type | `Beach Club` | **0** | Beach clubs/bars are placed in `beaches` rather than `bars`. |
| `bars` | Venue Type | `Cocktail Bar` | **0** | **Taxonomy mismatch:** 4 active bars (`attic-sunset-bar-lounge`, `wine-police`, `gion-bar`, `gio-bar`) have `subcategory: "bar"` and tag `"bar"`, matching **none** of the 6 `bars` chips! |
| `bars` | Venue Type | `Live Music` | **0** | No active `bars` item carries `Live Music` in `subcategory` or `tags`. |
| `bars` | Venue Type | `Dessert Cafe` | **2** | Active: `gelato-italia` and `vui-tea` (matched via tag `"dessert cafe"`). *(Only `Cafe` has >3 with **20** items.)* |
| `wellness` | Service Type | `Massage` | **0** | All 18 active `wellness` items have `subcategory: "spa"` and tags `["spa", "Sunset Town"]` (only `Spa` matches, with **18** items). |
| `wellness` | Service Type | `Nail Salon` | **0** | Nail/spa combo shops (e.g. `chip-s-spa-nail-...`, `lam-nail-bar-massage`) only carry `subcategory: "spa"`. |
| `wellness` | Service Type | `Sunburn Care` | **0** | 0 items tagged `Sunburn Care`. |
| `wellness` | Service Type | `Beauty & Skin` | **0** | 0 items tagged `Beauty & Skin`. |
| `shopping` | Shop Type | `Pearls` | **0** | 0 pearl shops registered. |
| `shopping` | Shop Type | `Local Specialties` | **0** | **Orphan subcategory:** 9 of 11 active `shopping` items have `subcategory: "convenience_store"` (marts/minimarts), which has **no matching UI filter chip** in `shopping`! |
| `shopping` | Shop Type | `Souvenirs` | **2** | Active: `casepia` and `sungift` (`subcategory: "souvenirs"`). |
| `shopping` | Shop Type | `Supermarket` | **0** | Marts use `convenience_store` instead of `supermarket` (even *King Kong Mart* has `subcategory: "convenience_store"`). |
| `shopping` | Shop Type | `Fresh Market` | **0** | 0 fresh markets registered. |
| `beaches` | Beach / Venue Type | `Beach` | **1** | Active: `bai-khem-beach`. *(Sunset Town Beach `bai-bien-thi-tran-hoang-hon` is stored under `category: "activities"` instead of `beaches`!)* |
| `beaches` | Beach / Venue Type | `Bar` | **3** | Active: `sun-bavaria-gastropub`, `loop-jacuzzi-bar`, `hien-nha-veranda-sunset-town-phu-quoc`. |
| `beaches` | Beach / Venue Type | `Beach Club` | **0** | **String-format bug:** `istanbul-beach-club-phu-quoc` has `subcategory: "beach_club"` (underscore) and tag `"beach-club"` (hyphen), so neither matches `"Beach Club"` (space)! |
| `beaches` | Beach / Venue Type | `Cafe` | **1** | Active: `starbucks-beach-house-sun-primavera`. |
| `beaches` | Beach / Venue Type | `Korean` | **1** | Active: `bbq-house-for-you`. *(Only `Seafood` in `beaches` has >3 with **4** items; `lagoon-bbq-vietnamese-cuisine` [`vietnamese`] and `the-deck-phu-quoc` [`western`] match no `beaches` chip.)* |

*(Non-sparse `DirectoryBrowser` Type chips for completeness: `dining` -> `Seafood` [12], `Vietnamese` [14], `Western` [7]; `bars` -> `Cafe` [20]; `wellness` -> `Spa` [18]; `beaches` -> `Seafood` [4].)*

#### (3) Editorial Label Chips (`EDITORIAL_BADGES`) with ≤ 3 Active Items
| Category | Filter Group | UI Filter Chip | Exact Active Match Count |
| :--- | :--- | :--- | ---: |
| `dining` | Label (`badges`) | `New` | **0** |
| `dining` | Label (`badges`) | `HOT` | **0** |
| `bars` | Label (`badges`) | `Recommended` | **3** |
| `bars` | Label (`badges`) | `New` | **0** |
| `bars` | Label (`badges`) | `HOT` | **0** |
| `wellness` | Label (`badges`) | `Recommended` | **0** |
| `wellness` | Label (`badges`) | `New` | **0** |
| `wellness` | Label (`badges`) | `HOT` | **0** |
| `shopping` | Label (`badges`) | `Recommended` | **0** |
| `shopping` | Label (`badges`) | `New` | **0** |
| `shopping` | Label (`badges`) | `HOT` | **0** |
| `beaches` | Label (`badges`) | `Recommended` | **0** |
| `beaches` | Label (`badges`) | `New` | **0** |
| `beaches` | Label (`badges`) | `HOT` | **0** |

*(Only `dining` -> `Recommended` has >3 with **5** active items.)*

#### (4) Price Level Filter Chips (`$`, `$$`, `$$$`, `$$$$`) — All 0 Populated Records
| Categories Affected | UI Filter Chips | Exact Data Match (`b.price_level === chip`) | UI Bug Behavior (`DirectoryBrowser.tsx:408`) |
| :--- | :--- | ---: | :--- |
| `dining`, `bars`, `wellness`, `shopping`, `beaches` | `$`, `$$`, `$$$`, `$$$$` (20 category×chip combinations) | **0** across 100% of active records | `price_level` is `undefined`/`null` on every record in `businesses-registry.json` & `khem-beach-businesses.json`. Because line 408 checks `if (priceFilter !== 'All' && b.price_level && b.price_level !== priceFilter) return false`, clicking any price chip silently returns **all** items instead of 0. |

---

### B.2 `components/HotelsPage.tsx` (`/hotels` — 48 Active Items)

Standalone primary hotel category tabs all exceed 3 items (`recommended`: **9**, `luxury`: **16**, `boutique`: **16**, `guesthouse`: **9**, `khem-beach`: **7**), and global rating pills exceed 3 (`9.0+`: **23**, `8.5+`: **37**). However, `HotelsPage.tsx` applies the rating filter pill **inside** the active category tab, producing two sparse combinations (≤ 3):

| Hotel Category Tab | Secondary Rating Chip | Exact Active Match Count | Matching Slugs |
| :--- | :--- | ---: | :--- |
| `guesthouse` (Sunset Town `$` budget/homestay, 9 total) | `⭐ 9.0+` | **3** | `kim-s-house-phu-quoc` (9.5), `lotus-home-cafe-free-hon-thom-cable-car` (9.4), `zoka-hotel` (9.1) |
| `khem-beach` (Khem Beach hotels, 7 total) | `⭐ 9.0+` | **2** | `jw-marriott-phu-quoc-emerald-bay` (9.1), `premier-village-phu-quoc-resort` (9.0) |
*(Note: In `lib/directory.ts`, `DIRECTORY_CATEGORIES.hotels.subcategories` also defines `['Resort', 'Hotel', 'Pool Villa', 'Homestay', 'Apartment']`, which is unused because `/directory/hotels` redirects to `/hotels`; against the 38 `/business/[slug]` hotel records, `Resort`=2, `Hotel`=2, `Pool Villa`=0, `Homestay`=3, `Apartment`=2.)*

---

### B.3 `components/BankingDirectory.tsx` (`/directory/banking` — 9 Active Items)

`BankingDirectory.tsx` groups active items (`status !== 'private'`) into 2 zones × 2 service types:

| Zone Section | Service Filter Group | Exact Active Match Count | Notes |
| :--- | :--- | ---: | :--- |
| `sunset-town` | `ATM` | **3** | `local-sunset-277` (MB), `local-sunset-279` (VietinBank), `local-sunset-278` (BIDV). |
| `khem-beach` | `ATM` | **1** | `local-sunset-288` (Vietcombank/BIDV at JW Marriott entrance). |
| `khem-beach` | `Currency Exchange` | **0** | Only record (`khem-banking-king-kong`) has `status: 'private'` (hidden per migration `033`). |

*(Non-sparse group: `sunset-town` × `Currency Exchange` = **5** active items.)*

---

### B.4 `components/SunsetTownMap.tsx` & `SunsetIllustMap.tsx` (`/map` Landmarks & Blocks)

#### (1) `SunsetTownMap.tsx` Landmark Category Filter Chips (`SUNSET_LANDMARKS`, 12 Active POIs)
| UI Filter Chip (`MapLandmark['category']`) | Exact Active Match Count | Matching Landmark IDs |
| :--- | ---: | :--- |
| `show` | **1** | `kiss-of-the-sea` |
| `shopping` | **1** | `vuifest-bazaar` |
| `transport` | **2** | `cable-car-station`, `marina-pier` |
| `beach` | **1** | `sunset-beach` |
| `culture` | **2** | `sun-signature-gallery`, `pompeii-ruins` |

*(Only `attraction` has >3 with **5** POIs: `kiss-bridge`, `clock-tower`, `king-sun-fountain`, `arc-de-triomphe`, `dragon-staircase`.)*

#### (2) `SunsetIllustMap.tsx` Interactive Street-Block Hotspots with ≤ 3 Venues (`data/sunset-illust-map-data.json`)
| Block ID | Block Label (EN) | Exact Venue Count |
| :--- | :--- | ---: |
| `FB2` | Kiss Bridge North Beach Plaza F&B | **3** |
| `VEN_NORTH` | Venice Street North | **3** |
| `SOR_SOUTH` | Sorrento Arc de Triomphe Entry | **3** |
| `AMA_MID_2` | King Sun Fountain (Amalfi) | **1** |
| `POS_NORTH` | Positano Street North | **1** |
| `VEN_SOUTH` | Venice Street South | **1** |
| `POS_SOUTH` | Positano Street South | **1** |
| `SOR_NORTH` | Sorrento Cable Car Square | **1** |

---

## Section C: Complete Registered Business List

Format per item:
`- [slug] | Name (en / ko) | Zone | Subcategory/Tags | Google Maps Place ID or URL status (verified / missing)`

### C.1 `dining` (40 Active Items)
- [mediterran-sunset-town-greek-italian-restaurant-pizza-pasta-souvlaki] | MEDITERRAN Sunset Town (Greek & Italian Restaurant) pizza, pasta & souvlaki / 메디테란 선셋타운 (MEDITERRAN Sunset Town (Greek & Italian Restaurant) pizza, pasta & souvlaki) | sunset-town | western [western, Sunset Town] | verified (ChIJoU5XY4qXpzER7IMIeP5u2_U)
- [finca] | Finca / 핀카 (Finca) | sunset-town | western [western, Sunset Town, badge:Recommended] | verified (ChIJn8-tUACXpzER6RqdNBwIv2U)
- [seta] | Seta / 세타 (Seta) | sunset-town | international [international, Sunset Town, badge:Recommended] | verified (ChIJN_Q6ZQCXpzERnEgRa_rea4k)
- [nambo-kitchen] | NamBo Kitchen / 남보 키친 (NamBo Kitchen) | sunset-town | vietnamese [vietnamese, Sunset Town] | verified (ChIJ22vgGjSVpzERYizOdzNYy64)
- [octopus-island-restaurant-night-market-sunset-town] | Octopus Island Restaurant Night Market Sunset town / 옥토퍼스 아일랜드 레스토랑 (Octopus Island Restaurant - Night Market Sunset town) | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJT66MukeVpzERQhQDyvVNUr4)
- [sunset-bunsik] | Sunset bunsik / Sunset bunsik (선셋분식) | sunset-town | korean [korean, Sunset Town, 선셋분식, Sunset bunsik] | verified (ChIJk-2CcACXpzERjAdWD6NvD-w)
- [blue-table-italian-restaurant] | BLUE TABLE(Italian Restaurant) / BLUE TABLE(Italian Restaurant) | sunset-town | western [western, Sunset Town, 블루 테이블, Blue Table, Italian Restaurant] | verified (ChIJt4niIACVpzERsZinQbNSOvs)
- [venice-cafe] | Venice Cafe / 베니스 카페 & 이터리 (Venice Cafe) | sunset-town | western [cafe, Sunset Town] | verified (ChIJS-IdAACVpzERrZzkY5r_-JQ)
- [cai-mam-bistro] | CÁI MÂM BISTRO / 까이 멈 비스트로 (CÁI MÂM BISTRO) | sunset-town | vietnamese [cafe, Sunset Town] | verified (ChIJj9eeH0-XpzERR3O-7B0rxFo)
- [sunset-place] | Phu Quoc Ttungbojip Sunset Town / 푸꾸옥 뚱보집 선셋타운 | sunset-town | korean [korean, Sunset Town, 뚱보집, Phu Quoc Ttungbojip] | verified (ChIJcRC6HwCVpzERbkajor2btbM)
- [charcoal-korean-bbq] | Charcoal Korean BBQ / 한식당 화로구이 (Charcoal Korean BBQ) | sunset-town | korean [korean, Sunset Town, 화로구이, 한식당 화로구이] | verified (ChIJMfJ3VWSVpzER2App4vNzuqo)
- [mare] | Mare / 마레 (Mare) | sunset-town | western [western, Sunset Town, badge:Recommended] | verified (ChIJFUbrywqVpzERZ-766zaQ1NE)
- [pho-thin-phu-quoc-top-3-pho-hot-pot] | Phở Thìn Phú Quốc Top 3 Pho & Hot Pot / 포틴 푸꾸옥 (Phở Thìn Phú Quốc - Top 3 Pho & Hot Pot) | sunset-town | vietnamese [vietnamese, Sunset Town, 포틴, 포틴 푸꾸옥] | verified (ChIJFYITJBKVpzERPIOdOa8Hzyg)
- [the-gangs-sunset] | The Gangs Sunset / 더 갱스 선셋 (The Gangs Sunset) | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJdy0S10CVpzERjeJJwHTOH7s)
- [caveman-smoked-ribs-craft-beer] | Caveman Smoked Ribs & Craft Beer / 케이브맨 스모크 립 & 크래프트 비어 (Caveman Smoked Ribs & Craft Beer) | sunset-town | restaurant [restaurant, Sunset Town] | verified (ChIJ013bPieXpzERQbVdD9Sx2Kg)
- [the-merchant] | The Merchant / 더 머천트 (The Merchant) | sunset-town | restaurant [restaurant, Sunset Town, badge:Recommended] | verified (ChIJD-a4fwCVpzERA9KJ8gWE4cA)
- [nha-hang-hai-san-thuan-kieu-2-seafood-grill] | Nhà hàng hải sản Thuận Kiều 2 Seafood & Grill / 투안 끼에우 2 해산물 식당 (Nhà hàng hải sản Thuận Kiều 2 · Seafood & Grill) | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJqWMc3JqXpzER9imqzVVuH00)
- [sunset-place-1] | Hai San Cang (Hải Sản Cảng) / 하이산캉 | sunset-town | seafood [seafood, Sunset Town, 하이산캉, Hải Sản Cảng, Hai San Cang] | verified (ChIJRT9hCe6VpzER9hYA7wlPylM)
- [kungfu-noodle-phu-quoc] | Kungfu Noodle Phú Quốc / 쿵푸 누들 푸꾸옥 (Kungfu Noodle Phú Quốc) | sunset-town | international [international, Sunset Town] | verified (ChIJ1-LOM_iVpzEReC2eAEZgchI)
- [sunset-place-2] | RuNam Sunset Town / 카페 루남 선셋타운 (RuNam Sunset Town) | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJgbE4kXGVpzERZ8C1U29WbHA)
- [sunset-place-3] | Cơm Gia Đình Sunset Town / 껌자딘 선셋타운 (Cơm Gia Đình Sunset Town) | sunset-town | vietnamese [vietnamese, Sunset Town, 껌자딘, 껌자딘 선셋타운] | verified (ChIJZ97LhDOVpzER7ZlyLY3K-9o)
- [sunny-coffee-pho-banh-mi-vietnamese-cuisine] | SUNNY COFFEE PHO BANH MI (Vietnamese cuisine) / SUNNY COFFEE - PHO - BANH MI (Vietnamese cuisine) | sunset-town | vietnamese [cafe, Sunset Town] | verified (ChIJYx62SU2VpzERzC6ZA_AF9YY)
- [times-corner-luxe-pizza-pasta-grill] | Times Corner Luxe Pizza, Pasta & Grill / Times Corner Luxe - Pizza, Pasta & Grill | sunset-town | western [western, Sunset Town] | verified (ChIJp_0sEWaXpzER2D9WqJ-NxEI)
- [times-corner-restaurant] | Times Corner Restaurant / Times Corner Restaurant | an-thoi | vietnamese [vietnamese, Sunset Town] | verified (ChIJ-8xuXJSXpzER_vuwYia2R1M)
- [hai-bot-eatery-homestay-phu-quoc] | Hai Bột Eatery & Homestay Phu Quoc / Hai Bột Eatery & Homestay Phu Quoc | sunset-town | vietnamese [vietnamese, Sunset Town] | verified (ChIJS_8A-C2XpzERXDMcG9FVR8w)
- [h-corner-cho-dem-vuifest] | H Corner Chợ đêm Vuifest / H Corner Chợ đêm Vuifest | sunset-town | street_food [vietnamese, Sunset Town] | verified (ChIJOTitfqa1oDERmIfA4qzOI_U)
- [dao-vi-vuifest-bazaar] | Đảo Vị VuiFest Bazaar / Đảo Vị VuiFest Bazaar | sunset-town | vietnamese [vietnamese, Sunset Town] | verified (ChIJM0_7pzqVpzERSaJMCKvjEZU)
- [com-gia-dinh-viet-tay-ho-restaurant] | Cơm Gia Đình Việt Tây Hồ Restaurant / Cơm Gia Đình Việt - Tây Hồ Restaurant | sunset-town | vietnamese [vietnamese, Sunset Town] | verified (ChIJsx0UrT6LpzERcrAcAZp0Ea4)
- [hai-san-ham-ninh] | Hải Sản Hàm Ninh / Hải Sản Hàm Ninh | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJr-c8ZACVpzER41yqzYEUGAE)
- [hoi-quan-european-brasserie-bar-pastry] | Hội Quán European Brasserie • Bar • Pastry / Hội Quán - European Brasserie • Bar • Pastry | sunset-town | western [vietnamese, Sunset Town] | verified (ChIJ_VQ_ljWXpzERbwSZZ5XUYYU)
- [pho-nuong-seafood-meat-grill] | Phố Nướng seafood & meat grill / Phố Nướng / seafood & meat grill | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJHWzLNQCXpzER8C174EPH8Fs)
- [restaurant-coffee-halal-sunset-town-phu-quoc] | Restaurant Coffee Halal Sunset Town Phu Quoc / Restaurant- Coffee Halal Sunset Town Phu Quoc | sunset-town | vietnamese [cafe, Sunset Town] | verified (ChIJMyo1GFCXpzERJi4JKDavOgQ)
- [yushima-japanese-restaurant] | Yushima Japanese Restaurant / Yushima Japanese Restaurant | sunset-town | japanese [japanese, seafood, Sunset Town] | verified (ChIJqSNX-FuLpzERVHIK_K9q4ac)
- [wow-que-toi] | WOW QUÊ TÔI / WOW QUÊ TÔI | sunset-town | vietnamese [vietnamese, Sunset Town] | verified (ChIJ_6I1rnKVpzERSyzp7e76ffQ)
- [tribal-grill-ribs-burger-beer] | Tribal Grill Ribs, Burger & Beer / Tribal Grill - Ribs, Burger & Beer | sunset-town | western [western, Sunset Town] | verified (ChIJN7xYjTaVpzERxXuOhOW_Bkg)
- [one-boat-restaurant-bar] | One Boat Restaurant & Bar / One Boat Restaurant & Bar | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJLwGTViCVpzER8VvsPx7gfqs)
- [ibiza-oyster-seafood-bar] | IBIZA Oyster & Seafood Bar / IBIZA - Oyster & Seafood Bar | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJyRBqwHeVpzERduOQZkmhLAE)
- [la-isla-bistro-coffee] | La isla Bistro & coffee / La isla Bistro & coffee | sunset-town | western [cafe, Sunset Town] | verified (ChIJFePbK8yXpzER_rJM4eYtKaA)
- [sultan-turkish-kebab-sunset-town-phu-quoc] | Sultan Turkish Kebab – Sunset Town Phu Quoc / 술탄 터키쉬 케밥 선셋타운 (Sultan Turkish Kebab – Sunset Town Phu Quoc) | sunset-town | western [international, Sunset Town] | verified (ChIJc9wZF96XpzERaOKT6SZjnj4)
- [casepia-kitchen-and-lounge] | CASEPiA Kitchen & Lounge / 카세피아 키친 & 라운지 (CASEPiA Kitchen & Lounge) | sunset-town | restaurant_and_lounge [dining, lounge, Sunset Town, Kiss of the Sea, Ocean View, badge:Recommended] | verified (ChIJRxYLYomXpzERCi3mFgoiNp4)

### C.2 `bars` (24 Active Items)
- [tran-coffee-shop-no-2-sunset-town] | Trần Coffee Shop No.2 Sunset Town / Trần Coffee Shop No.2 Sunset Town | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJ0f-9_fqXpzERWAKUF0YKrkY)
- [cafe-green-sunset-town] | CAFE GREEN SUNSET TOWN / 카페 그린 선셋타운 (CAFE GREEN SUNSET TOWN) | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJFU6xryaXpzERe2HL0ChKMXY)
- [highlands-coffee-cable-car-an-thoi-pq] | Highlands Coffee Cable Car An Thới PQ / 하이랜드 커피 안터이 케이블카역 (Highlands Coffee Cable Car An Thới PQ) | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJhwN-oSqXpzERgUhhE4tiYRE)
- [phu-quoc-sunset-town-coffee-workshop-brew-design-the-art-of-vietnamese-coffee] | Phu Quoc Sunset Town Coffee Workshop Brew & Design the Art of Vietnamese Coffee / Phu Quoc Sunset Town Coffee Workshop - Brew & Design the Art of Vietnamese Coffee | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJy_hxHgCrNTERoIcGv_opdSI)
- [milano-coffee-64-milan-sunset-town] | Milano Coffee 64 Milan Sunset Town / Milano Coffee - 64 Milan Sunset Town | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJqzR5BqKVpzERsUFb1ZBTkHI)
- [kem-trang-tien-sunset-town-phu-quoc] | Kem Tràng Tiền Milan, Thị Trấn Hoàng hôn / Kem Tràng Tiền - Milan, Thị Trấn Hoàng hôn | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJO3-yzguVpzERco-w4qWwzBE)
- [casa-limone-phu-quoc-hotel-cafe-specialty-coffee-matcha-bar] | Casa Limone Hotel & Café Specialty Coffee & Matcha / Casa Limone Hotel & Café - Specialty Coffee & Matcha | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJexxLuvWVpzERYfMNC6E2l6k)
- [sunset-tiger-tea] | Sunset Tiger Tea / Sunset Tiger Tea | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJO5hTZgCVpzERv98h_ecyvFc)
- [senthy-coffee-lounge] | Senthy Coffee Lounge / Senthy Coffee Lounge | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJi6p4AwCXpzERrcfUWx2c6gY)
- [cafe-juliet-pastries] | Cafe Juliet & Pastries / Cafe Juliet & Pastries | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJTdwiKNmVpzER1knXm_zr2zA)
- [the-juliet-coffee-dessert-ama71] | The Juliet Coffee & Dessert AMA71 / The Juliet Coffee & Dessert - AMA71 | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJE6Jt3vuVpzERA6ErTfB79es)
- [islander-phuquoc-handmade-gifts-coffee] | Islander PhuQuoc Handmade Gifts & Coffee / Islander PhuQuoc Handmade Gifts & Coffee | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJ4XRWXwCVpzER4TmxHDp0HaI)
- [lotus-home-cafe] | Lotus Home & Cafe / Lotus Home & Cafe | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJHfkAZ4WVpzERmME-KkMKRrI)
- [the-fern-coffee-sea] | The Fern Coffee Sea / The Fern Coffee Sea | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJUZs9AACVpzERDU2CVZEwhMQ)
- [santo-cafe] | SANTO CAFE / SANTO CAFE | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJM56vPyOVpzERkcoihdCbcQg)
- [mae-coffee] | MAE Coffee / MAE Coffee | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJVef0-G6XpzERfRGPWSjnMSM)
- [luna-folk] | Luna Folk / 루나 포크 (Luna Folk) | sunset-town | bar [bar, Sunset Town, badge:Recommended] | verified (ChIJMXSxNgCXpzERgxlz0F6Zn7I)
- [il-salone-afternoon-tea-lounge-bar] | iL Salone – Afternoon Tea Lounge & Bar / 일 살로네 (iL Salone – Afternoon Tea Lounge & Bar) | sunset-town | bar [bar, Sunset Town, badge:Recommended] | verified (ChIJbR-3v0iXpzERO5uhXf8gO8k)
- [cielo] | Cielo / 씨엘로 루프탑 바 (Cielo) | sunset-town | bar [bar, Sunset Town, badge:Recommended] | verified (ChIJzXtAVDKXpzER1cjjYNLZETM)
- [gion-bar] | Giòn Bar / 지온 바 & 바이츠 키친 (Giòn Bar) | sunset-town | bar [bar, Sunset Town] | verified (ChIJ2_09NpGVpzERNU0LHL9210Q)
- [mia-phu-quoc] | Mía Phú Quốc / Mía Phú Quốc | sunset-town | cafe [bar, Sunset Town] | verified (ChIJ_8PhSl6XpzERyXEGZHWPPK8)
- [mango-mango] | Mango Mango / Mango Mango | sunset-town | cafe [bar, Sunset Town] | verified (ChIJxyS9aICXpzERzjprHrHS6HM)
- [queen-of-islands-greek-yogurt-more-store] | Queen Of Islands Greek Yogurt & More Store / Queen Of Islands - Greek Yogurt & More Store | sunset-town | cafe [Cafe, Dessert Cafe, Greek Yogurt, Sunset Town] | verified (ChIJTRy1mL6VpzERoC2sDLhsG2w)
- [lemon-queen-bazaar-store] | Lemon Queen (bazaar store) / Lemon Queen (bazaar store) | sunset-town | cafe [Cafe, Dessert Cafe, Greek Yogurt, Sunset Town] | verified (ChIJq-MaQQCVpzERMbW2Y8JvlMI)

### C.3 `wellness` (18 Active Items)
- [coconut-spa-cafe] | Coconut Spa&Cafe / 코코넛 스파 & 카페 (Coconut Spa&Cafe) | sunset-town | spa [cafe, Sunset Town] | verified (ChIJu-MGk6CXpzER7qRmKY1HVdk)
- [blackspa-phuquoc] | Blackspa Phuquoc / 블랙스파 푸꾸옥 (Blackspa Phuquoc) | sunset-town | spa [spa, Sunset Town] | verified (ChIJe9DMSLCVpzERuXEIXupJCTo)
- [spa-the-l] | SPA THE L / 스파 더 엘 (SPA THE - L) | sunset-town | spa [spa, Sunset Town] | verified (ChIJp7ADMgCXpzERshZgTfNAb3g)
- [chip-s-spa-nail-58-venice-sunset-town-phu-quoc] | Chip’s Spa&Nail 58 Venice ( Sunset town Phu Quoc ) / Chip’s Spa&Nail - 58 Venice ( Sunset town Phu Quoc ) | sunset-town | spa [spa, Sunset Town] | verified (ChIJebcgOgCVpzERju4UV3vLlHw)
- [king-spa-massage-sunset-town-phu-quoc-spa-phu-quoc] | KING Spa & Massage Sunset Town Phú Quốc / 킹 스파 & 마사지 (KING Spa & Massage Sunset Town Phú Quốc) | sunset-town | spa [spa, Sunset Town] | verified (ChIJB0Bq072NpzERcvRvViCt6TQ)
- [sunset-bloom-spa] | SUNSET BLOOM SPA / SUNSET BLOOM SPA | sunset-town | spa [spa, Sunset Town] | verified (ChIJ7VnT_3uVpzER4yazXSkfeG8)
- [sakurakyo-spa-phu-quoc-massage-body-massage-foot] | Sakurakyo Spa Phu Quoc / 사쿠라쿄 스파 푸꾸옥 (Sakurakyo Spa Phu Quoc) | sunset-town | spa [spa, Sunset Town] | verified (ChIJS9wjorOXpzERYSjKguaEmUY)
- [oasis-spa-massage-nail-sunset-town-phu-quoc] | OASIS Spa Massage & Nail (Sunset Town Phu Quoc) / 오아시스 스파 (OASIS Spa Massage & Nail (Sunset Town Phu Quoc)) | sunset-town | spa [spa, Sunset Town] | verified (ChIJL31cE-ONpzERUxrsDyzknto)
- [vera-spa-nail-phu-quoc-sunset-town] | Véra Spa & Nail (Phú Quốc Sunset Town) / Véra Spa & Nail (Phú Quốc Sunset Town) | sunset-town | spa [spa, Sunset Town] | verified (ChIJX9gYEACVpzERCpsaoOzb3R0)
- [lumi-spa-massage-2-foot-massage-sunset-town] | LUMI SPA MASSAGE 2 (Foot Massage Sunset Town) / LUMI SPA - MASSAGE 2 (Foot Massage Sunset Town) | sunset-town | spa [spa, Sunset Town] | verified (ChIJPUyxCwAdCjER5UdXfYlBIEU)
- [candle-spa] | Candle Spa / Candle Spa | sunset-town | spa [spa, Sunset Town] | verified (ChIJAXBY4QaNpzERRzRNokHlSgY)
- [hanz-sunset-spa-2-56-venice-sunset-town] | HANZ SUNSET SPA 2 56 VENICE (Sunset Town) / HANZ SUNSET SPA 2 - 56 VENICE (Sunset Town) | sunset-town | spa [spa, Sunset Town] | verified (ChIJK_t3pDqVpzERT3sFCVV1eT8)
- [luna-spa-nail-phu-quoc-sunset-town] | Luna Spa & Nail Phú Quốc (Sunset Town) / Luna Spa & Nail Phú Quốc (Sunset Town) | sunset-town | spa [spa, Sunset Town] | verified (ChIJHfcQsGGVpzERBnRdctDlfl0)
- [hanz-sunset-spa-phu-quoc-massage] | Hanz Sunset Spa Phu Quoc Massage / Hanz Sunset Spa - Phu Quoc Massage | sunset-town | spa [spa, Sunset Town] | verified (ChIJ1Tfe3kGXpzERi4VaLomCKFA)
- [sunset-place-9] | SOLANA Spa Sunset Town Phú Quốc / 솔라나 스파 | sunset-town | spa [spa, Sunset Town] | verified (ChIJ-yY2EeuVpzERZkC-0w4sM4A)
- [king-spa-massage-sunset-view] | King Spa & Massage Sunset View / King Spa & Massage Sunset View | sunset-town | spa [spa, Sunset Town] | verified (ChIJ_dd-OKyVpzERFhiS9KgMlzg)
- [miss-tien-spa-homestay-phu-quoc-sunset-town] | Miss Tiên Spa & Homestay Phú Quốc Sunset Town / 미스 띠엔 스파 & 홈스테이 (Miss Tiên Spa & Homestay Phú Quốc Sunset Town) | sunset-town | spa [spa, Sunset Town] | verified (ChIJ7StT10WYdIERE7HOX3G1q7Q)
- [sunset-spa-phu-quoc] | Sunset Spa Phú Quốc / Sunset Spa Phú Quốc | sunset-town | spa [spa, Sunset Town] | verified (ChIJO4Xsb_qNpzER-PmClNP5660)

### C.4 `shopping` (11 Active Items)
- [tony-mart-cn3-sieu-thi-tien-ich-24h] | TONY MART CN3 Siêu thị tiện ích 24h / 토니 마트 24시 선셋타운 (TONY MART CN3 - Siêu thị tiện ích 24h) | sunset-town | convenience_store [convenience_store, Sunset Town] | verified (ChIJ--rCzyWVpzERa9vsKRhIrxk)
- [vietnam-select] | Vietnam Select / 베트남 셀렉트 슈퍼마켓 (Vietnam Select) | sunset-town | convenience_store [convenience_store, Sunset Town] | verified (ChIJX0-mNgCVpzERuUC87Bnl3G8)
- [muoi-mini-mart-sunset-town] | Muoi Mini Mart Sunset Town / Muoi Mini Mart - Sunset Town | sunset-town | convenience_store [convenience_store, Sunset Town] | verified (ChIJZxIdKxnB9WYR0OpNKEcReFQ)
- [ssmart-24h] | SSMART 24H / SSMART 24H | sunset-town | convenience_store [convenience_store, Sunset Town] | verified (ChIJrZVSrMGVpzERwEKKl8CoFhY)
- [thala-mart] | THALA MART / THALA MART | sunset-town | convenience_store [convenience_store, Sunset Town] | verified (ChIJhRYHJwCXpzERee2VZCGiccg)
- [sunset-souvenir-fashion-store] | Sunset Souvenir & Fashion Store / Sunset Souvenir & Fashion Store | sunset-town | Souvenirs [convenience_store, Sunset Town] | verified (ChIJnYlOSfWXpzERzpfC_jsVFlM)
- [sunset-town-store] | SUNSET TOWN STORE / SUNSET TOWN STORE | sunset-town | Souvenirs [convenience_store, Sunset Town] | verified (ChIJ1UtCOACXpzERXQalSAj65cU)
- [b-b-mart] | B&B Mart / B&B Mart | sunset-town | convenience_store [convenience_store, Sunset Town] | verified (ChIJvStN7o-VpzERtAxqXhgc9Ik)
- [homemart] | HomeMart / HomeMart | an-thoi | convenience_store [convenience_store, Sunset Town] | verified (ChIJp_CkEwCXpzERY7WxGGwTwAQ)
- [cocomart-an-thoi] | Cocomart An Thới / Cocomart An Thới | an-thoi | convenience_store [convenience_store, Sunset Town] | verified (ChIJOZDMI8qXpzERJS8UXPB_0pw)
- [dugong-mart] | DUGONG MART / DUGONG MART | an-thoi | convenience_store [convenience_store, Sunset Town] | verified (ChIJ2xD_WwCXpzER-iMnVxEhwYc)

### C.5 `hotels` (48 Active on `/hotels` + 11 Additional/Alias Active Slugs on `/business/[slug]`)

#### C.5a Primary `/hotels` Catalog (48 Active Items: 41 `sunset-town`, 7 `khem-beach`)
- [the-room-hotel] | The Room Hotel - Starbucks & FIREWORKS / 더 룸 호텔 - 스타벅스 앤 파이어웍스 | sunset-town | boutique [boutique, recommended, 3-star, $$] | verified (short link https://maps.app.goo.gl/kDva8BBXaBeUxBvi8; registry PID: ChIJf75C76WVpzER48c5RSu_h4w)
- [la-festa-phu-quoc-curio-collection-by-hilton] | La Festa Phu Quoc, Curio Collection by Hilton / 라 페스타 푸꾸옥, 큐리오 컬렉션 바이 힐튼 | sunset-town | luxury [luxury, recommended, 5-star, $$$$$] | verified (ChIJc4_lgKCWpzERfX9ic42Xi-s)
- [roma-hotel-phu-quoc-h39560696] | Roma Hotel Phu Quoc - Free Airport Shuttle & Spa Inclusive / 로마 호텔 푸꾸옥 | sunset-town | luxury [luxury, 3-star, $$$$] | verified (ChIJjwfWKIqXpzERYsn-qQI_59o)
- [times-corner-sorrento-boutique-hotel] | Times Corner Sorrento Hotel - Complimentary Sunset Town Tour 4pm to 5pm everyday / 타임스 코너 소렌토 호텔 | sunset-town | luxury [luxury, 3-star, $$$$] | verified (ChIJk9NfQm6XpzERAcfkxs2uJV8)
- [le-bonheur-hotel] | Le Bonheur Hotel / 르 보뇌르 호텔 | sunset-town | boutique [boutique, 3-star, $$$] | verified (ChIJPZ4-MRiXpzER0cBb6s2l0EI)
- [venice-hotel-phu-quoc] | Venice Hotel Phu Quoc - Free Airport Shuttle & Spa Inclusive / 베니스 호텔 푸꾸옥 | sunset-town | luxury [luxury, recommended, 4-star, $$$$] | verified (ChIJT1X9WkqVpzERe6nExGNSEYw)
- [coastal-living-hotel-phu-quoc] | Coastal Living Hotel Phu Quoc / 코스탈 리빙 호텔 푸꾸옥 | sunset-town | boutique [boutique, recommended, 3-star, $$$] | missing (search query URL only)
- [roma-hotel-phu-qu-c] | Rova Hotel Phú Quốc / 로바 호텔 푸꾸옥 | sunset-town | guesthouse [guesthouse, 3-star, $] | verified (ChIJSf1XiyqVpzERESXp2yD4RDI)
- [sakurakyo-hotel-spa-phu-quoc] | Sakurakyo Hotel & Spa Phu Quoc - Spa Inclusive & Free Airport Shuttle / 사쿠라쿄 호텔 앤 스파 푸꾸옥 | sunset-town | luxury [luxury, recommended, 4-star, $$$$] | verified (ChIJ5RnXOaiXpzER0QhbiBUJ6d8)
- [times-corner-amalfi-hotel] | TIMES CORNER AMALFI HOTEL / 타임스 코너 아말피 호텔 | sunset-town | luxury [luxury, 4-star, $$$$] | verified (ChIJjRZrewCXpzERoLfxbMC-_ao)
- [milan-hotel-coffee] | MILAN HOTEL & COFFEE / 밀란 호텔 앤 커피 | sunset-town | guesthouse [guesthouse, 3-star, $] | verified (ChIJ8wmMbXaXpzERStmPml0_UD8)
- [kl-hotel-phu-quoc] | KL HOTEL PHU QUOC / KL 호텔 푸꾸옥 | sunset-town | boutique [boutique, 3-star, $$$] | missing (search query URL only)
- [casepia] | CASEPIA / 카세피아 | sunset-town | luxury [luxury, recommended, 4-star, $$$$] | verified (ChIJRxYLYomXpzERCi3mFgoiNp4)
- [solea-hotel-sunset-town-phu-quoc] | Soléa Hotel Sunset Town Phu Quoc / 솔레아 호텔 선셋타운 푸꾸옥 | sunset-town | boutique [boutique, 4-star, $$$] | verified (ChIJxbxyGNSXpzEREPa-cnK86aY)
- [de-stefano-coffee-and-hotel] | De Stefano Hotel & Coffee / 데 스테파노 호텔 앤 커피 | sunset-town | boutique [boutique, 3-star, $$$] | verified (ChIJCY_uEYqXpzERtNAHnYgN8rc)
- [khach-san-royal-phu-quoc] | Royal Hotel Phu Quoc / 로얄 호텔 푸꾸옥 | sunset-town | luxury [luxury, 5-star, $$$$] | verified (ChIJtc9o0lKXpzERaiJkBt3PCf0)
- [cybele-hotel] | Cybele Sunset Hotel Phu Quoc / 시벨레 선셋 호텔 푸꾸옥 | sunset-town | boutique [boutique, 3-star, $$] | verified (ChIJM3WdM8mVpzERaaspeat4G3I)
- [hoang-hon-hotel] | Hoàng Hôn Hotel / 호앙혼 호텔 | sunset-town | guesthouse [guesthouse, 3-star, $] | verified with PID conflict (ChIJV8p_7LCVpzERy9A-3K8z2q4 vs registry ChIJCz_5LSmXpzER1v5yQ1n6y0c)
- [palo-santo-hotel-phu-quoc] | Palo Santo Hotel Phu Quoc - Fireworks and Ocean View / 팔로 산토 호텔 푸꾸옥 | sunset-town | boutique [boutique, 3-star, $$] | missing (search query URL only)
- [thala-hotel-sorrento] | Thala Hotel Sorrento / 탈라 호텔 소렌토 | sunset-town | boutique [boutique, 3-star, $$] | verified (ChIJhRYHJwCXpzERee2VZCGiccg)
- [catarina-hotel-phu-quoc] | Catarina Hotel Phu Quoc / 카타리나 호텔 푸꾸옥 | sunset-town | guesthouse [guesthouse, 4-star, $] | missing (search query URL only)
- [sunny-hotel] | Sunny Hotel / 써니 호텔 | sunset-town | boutique [boutique, 3-star, $$] | missing / mismatch in /hotels (ChIJPxfJfpeXpzERMNfR5dHAXJE points to Sunny Side Hotel; valid registry PID: ChIJJyvaIBKXpzERPWxGoWlnWoc)
- [solaro-hotel-spa-h84816481] | Solaro Hotel & Spa Phu Quoc - Sunset Town Seaview And Fireworks / 솔라로 호텔 앤 스파 푸꾸옥 | sunset-town | luxury [luxury, 5-star, $$$$$] | missing (search query URL only)
- [anna-hotel-free-cable-car-and-water-park-tickets] | Anna Hotel Phu Quoc - Sunset Town Tour - Infinity Pool Access / 안나 호텔 푸꾸옥 | sunset-town | guesthouse [guesthouse, 3-star, $] | missing (search query URL only)
- [juliet-boutique-hotel] | Juliet Boutique Hotel - Sunset Town / 줄리엣 부티크 호텔 - 선셋 타운 | sunset-town | luxury [luxury, 3-star, $$$$$] | verified (ChIJ5Z5ZTfmVpzERiSVXng2WHUY)
- [hoa-ng-hon-ti-m-boutique-hotel] | Hoàng Hôn Tím Boutique Hotel / 호앙 혼 팀 부티크 호텔 | sunset-town | boutique [boutique, 3-star, $$$] | verified (ChIJe4CLfRKXpzERL0ZvGC778Bk)
- [noska-hotel] | NOSKA Hotel / 노스카 호텔 선셋타운 | sunset-town | luxury [luxury, 3-star, $$$$$] | missing / broken in /hotels (broken ChIJF_c9aMCXpzERt1r0W687Y4U; registry verified: ChIJ9SwzZzeVpzERAz84CLvBLh8)
- [fella-hotel] | FELLA HOTEL / 펠라 호텔 선셋타운 | sunset-town | guesthouse [guesthouse, 3-star, $] | missing / broken in /hotels (broken ChIJ11j5_KeXpzERFq08eB1nJt4; registry verified: ChIJjZ-YVl6XpzERBev66-X35uQ)
- [sole-casa-phu-quoc] | Sole Casa Phu Quoc / 솔레 카사 푸꾸옥 | sunset-town | luxury [luxury, 3-star, $$$$] | verified with PID conflict (ChIJN0x-mLCVpzER-F_A96E2l68 vs registry ChIJgY1CwhWXpzER529_xH5j60c)
- [golden-sunset-hotel] | Golden Sunset Hotel / 골든 선셋 호텔 | sunset-town | guesthouse [guesthouse, 3-star, $] | missing / broken in /hotels (broken ChIJN3vR_L6VpzER4o1cI_K00e8; registry verified: ChIJLYZRqS2VpzERBkJetwNxgg8)
- [casa-del-mar-boutique-hotel] | CASA DEL MAR BOUTIQUE HOTEL / 카사 델 마르 부티크 호텔 | sunset-town | guesthouse [guesthouse, 3-star, $] | verified with PID conflict (ChIJsX0-7rGVpzERm6M9yE1_8r0 vs registry ChIJYUDZ6_2VpzERcF40q3uJ-H0)
- [js-hotel-phu-quoc-sunset-town] | JS Hotel Phu Quoc Sunset Town / JS 호텔 푸꾸옥 선셋타운 | sunset-town | guesthouse [guesthouse, 3-star, $] | missing / broken in /hotels (broken ChIJ92fL7_KVpzERx5f4P9A2j8k; registry verified: ChIJRSic4YOXpzERfVMlKoCM9v8)
- [merci-hotel-sunset-town-phu-quoc] | MERCI HOTEL SUNSET TOWN PHU QUOC / MERCI HOTEL SUNSET TOWN PHU QUOC | sunset-town | boutique [boutique, 3-star] | verified (ChIJh1FRPgCVpzERb673NoY0a2k)
- [blue-hotel-sunset-town-phu-quoc] | Blue Hotel Sunset Town Phu Quoc / Blue Hotel Sunset Town Phu Quoc | sunset-town | boutique [boutique, 3-star] | verified (ChIJkxnyzB-VpzERiqEaw7e2MHA)
- [the-fern-phu-quoc-hotel-sunset-town] | The Fern Phu Quoc Hotel Sunset Town / The Fern Phu Quoc Hotel Sunset Town | sunset-town | boutique [boutique, 3-star] | verified (ChIJk3IxcACVpzERP5hIbpsfIUI)
- [dido-carthage-apartment-sunset-town-phu-quoc-island] | Dido Carthage Apartment Sunset Town, Phu Quoc Island / Dido Carthage Apartment Sunset Town, Phu Quoc Island | sunset-town | luxury [luxury, 5-star] | verified (ChIJcWEuF12XpzERcz_lK7OYDlw)
- [crystal-apartment-hillside-phu-quoc-sunset-town-firework] | Crystal Apartment Hillside Phu Quoc - Sunset Town & Firework / Crystal Apartment Hillside Phu Quoc - Sunset Town & Firework | sunset-town | luxury [luxury, 4-star] | verified (ChIJ320mYwCXpzER-9Vv3cMrOvk)
- [rosie-hillside-phu-quoc-apartment] | Rosie Hillside Phu Quoc apartment / Rosie Hillside Phu Quoc apartment | sunset-town | luxury [luxury, 5-star] | verified (ChIJHdlM6--XpzERU4FcoKO7V3k)
- [sunset-home-apartment-phu-quoc] | Sunset Home - Apartment Phu Quoc / Sunset Home - Apartment Phu Quoc | sunset-town | luxury [luxury, 5-star] | verified (ChIJRReqm0iXpzERKSxB7jzof78)
- [the-juliet-a-boutique-hotel-coffee-ama-71] | The Juliet A Boutique Hotel & Coffee - Ama 71 / The Juliet A Boutique Hotel & Coffee - Ama 71 | sunset-town | boutique [boutique, 3-star] | verified (ChIJ1yTVrpyVpzER3zYlS4ZhGqA)
- [eirlys-home-apartment-phu-quoc-firework-ocean-view] | Eirlys Home Apartment Phu Quoc - Firework & Ocean View / Eirlys Home Apartment Phu Quoc - Firework & Ocean View | sunset-town | boutique [boutique, 3-star] | verified (ChIJFxI3_P-XpzERuMb9xcsPfq0)
- [jw-marriott-phu-quoc-emerald-bay] | JW Marriott Phu Quoc Emerald Bay Resort & Spa / JW 메리어트 푸꾸옥 에메랄드 베이 리조트 & 스파 | khem-beach | luxury [luxury, recommended, 5-star, $$$$$] | verified (ChIJLZPWxLiWpzERwrkgfIa1P8I)
- [new-world-phu-quoc-resort] | New World Phu Quoc Resort / 뉴월드 푸꾸옥 리조트 | khem-beach | luxury [luxury, recommended, 5-star, $$$$$] | verified (ChIJy5uCwXCXpzERQSR2-hAgnuo)
- [premier-village-phu-quoc-resort] | Premier Village Phu Quoc Resort Managed by Accor / 프리미어 빌리지 푸꾸옥 리조트 바이 아코르 | khem-beach | luxury [luxury, recommended, 5-star, $$$$$] | verified (ChIJr4pU6WmWpzERs3lqA96_P1I)
- [premier-residences-phu-quoc-emerald-bay] | Premier Residences Phu Quoc Emerald Bay Managed by Accor / 프리미어 레지던스 푸꾸옥 에메랄드 베이 | khem-beach | luxury [luxury, 5-star, $$$$$] | verified (ChIJn6kim_SXpzERd6rlRMQmpZc)
- [paralia-khem-beach-phu-quoc-hotel] | Paralia Khem Beach Phu Quoc Hotel / 파랄리아 켐비치 호텔 푸꾸옥 | khem-beach | boutique [boutique, unrated, $$$] | verified (ChIJ--GCQXqXpzER7itlt0HX5Ps)
- [jm-boutique-hotel-phu-quoc] | JM Boutique Hotel Phu Quoc / JM 부티크 호텔 푸꾸옥 | khem-beach | luxury [luxury, unrated, $$$$$] | verified (ChIJhfbFBaCXpzER-fkbP-fwDcI)
- [ann-hotel-spa-phu-quoc] | Ann Hotel & Spa Phu Quoc / 앤 호텔 & 스파 푸꾸옥 | khem-beach | boutique [boutique, unrated, $$$] | verified (ChIJpyMOH-WXpzERgb6Kly4H7QA)

#### C.5b Additional / Alias Active `category: "hotels"` Records on `/business/[slug]` (11 Items Not Sharing Exact Slug with `/hotels`)
*(27 of the 38 active `category: "hotels"` records in `businesses-registry.json` + `khem-beach-businesses.json` share exact slugs with C.5a above; the remaining 11 active slugs are listed below for complete deduplication.)*
- [roma-hotel-phu-quoc] | Roma Hotel Phu Quoc / 로마 호텔 푸꾸옥 (Roma Hotel Phu Quoc) | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJjwfWKIqXpzERYsn-qQI_59o)
- [the-juliet-a-boutique-hotel-coffee-ven-07] | The Juliet A Boutique Hotel & Coffee Venice 07 / 더 줄리엣 부티크 호텔 & 커피 Ven 07 (The Juliet A Boutique Hotel & Coffee - Venice 07) | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJ5Z5ZTfmVpzERiSVXng2WHUY)
- [royal-hotel-phu-quoc] | ROYAL HOTEL PHU QUOC / 로얄 호텔 푸꾸옥 1 (ROYAL HOTEL PHU QUOC) | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJtc9o0lKXpzERaiJkBt3PCf0)
- [de-stefano-hotel-coffee] | De Stefano Hotel Coffee / 드 스테파노 커피 앤 호텔 (De Stefano Hotel Coffee) | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJCY_uEYqXpzERtNAHnYgN8rc)
- [milan-hotel] | Milan Hotel / Milan Hotel | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJ8wmMbXaXpzERStmPml0_UD8)
- [cybele-sunset-hotel-phu-quoc] | Cybele Sunset Hotel Phú Quốc / Cybele Sunset Hotel Phú Quốc | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJM3WdM8mVpzERaaspeat4G3I)
- [rova-105-hotel] | Rova 105 Hotel / Rova 105 Hotel | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJSf1XiyqVpzERESXp2yD4RDI)
- [sunny-hotel-phu-quoc-ven-18-sunset-town] | Sunny Hotel Phu Quoc Ven 18 Sunset Town / Sunny Hotel Phu Quoc- Ven 18 Sunset Town | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] [alias of /hotels sunny-hotel] | verified (ChIJJyvaIBKXpzERPWxGoWlnWoc)
- [solea-hotels-apartments-sunset-town] | SOLÉA Hotels & Apartments Sunset Town / SOLÉA Hotels & Apartments Sunset Town | sunset-town | residence [residence, Sunset Town] | verified (ChIJxbxyGNSXpzEREPa-cnK86aY)
- [rova-hotel-spa-phu-quoc] | ROVA HOTEL & SPA PHU QUOC / ROVA HOTEL & SPA PHU QUOC | sunset-town | boutique_hotel [boutique_hotel, Sunset Town] | verified (ChIJM6pVVcqVpzERvwPbu-fNL6w)
- [sunset-place-7] | La Festa Phu Quoc, Curio Collection by Hilton / 라 페스타 푸꾸옥, 큐리오 컬렉션 바이 힐튼 (La Festa Phu Quoc, Curio Collection by Hilton) | sunset-town | hotel [hotel, Sunset Town, badge:Recommended] [alias of /hotels la-festa-phu-quoc-curio-collection-by-hilton] | verified (ChIJc4_lgKCWpzERfX9ic42Xi-s)

### C.6 `beaches` (13 Active Items)
- [bbq-house-for-you] | BBQ House for You / 한국관 BBQ House for You | sunset-town | korean [korean, Sunset Town, 한국관, BBQ House] | verified (ChIJk0mFcgCVpzERf3VayqKU9Ug)
- [starbucks-beach-house-sun-primavera] | Starbucks Beach House Sun Primavera / 스타벅스 비치 하우스 선셋타운 (Starbucks Beach House Sun Primavera) | sunset-town | cafe [cafe, Sunset Town] | verified (ChIJlXfNAn-VpzERPevvIKQTJiM)
- [lagoon-bbq-vietnamese-cuisine] | LAGOON BBQ & VIETNAMESE CUISINE / 라군 BBQ & 베트남 퀴진 (LAGOON BBQ & VIETNAMESE CUISINE) | sunset-town | vietnamese [vietnamese, Sunset Town] | verified (ChIJexQHMSaVpzERSr6zIxWjYDs)
- [nha-hang-com-nieu-viet-di-a-trung-hai] | Nhà hàng Cơm Niêu Việt Địa Trung Hải / 껌니우 비엣 선셋타운 (Nhà hàng Cơm Niêu Việt Địa Trung Hải) | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJzUpxDmWXpzER9_x5dGSKcdM)
- [green-tree-buffet-seafood] | Green Tree Buffet SeaFood / Green Tree Buffet SeaFood | sunset-town | seafood [seafood, Sunset Town] | verified (ChIJNcEJoqmXpzERV_7N3lFq9sM)
- [sun-bavaria-gastropub] | Sun Bavaria GastroPub / 선 바바리아 가스트로펍 (Sun Bavaria GastroPub) | sunset-town | bar [bar, Sunset Town] | verified (ChIJAwwqc2yVpzER_4K_0feO5I8)
- [loop-jacuzzi-bar] | Loop Jacuzzi Bar / Loop Jacuzzi Bar | sunset-town | bar [bar, Sunset Town] | verified (ChIJw0KgNACVpzERw5KrYRFhYrk)
- [hien-nha-veranda-sunset-town-phu-quoc] | Hiên Nhà Veranda Sunset Town Phú Quốc / Hiên Nhà Veranda Sunset Town Phú Quốc | sunset-town | bar [bar, Sunset Town] | verified (ChIJWemJxp-XpzER7U_LSFAw2FI)
- [draft-beer-bai-khem] | Draft Beer Bai Khem Phu Quoc / 드래프트 비어 바이켐 (Draft Beer Bai Khem Phu Quoc) | khem-beach | seafood [Khem Beach, dining, beer-pub] | verified (ChIJ_UwInh-XpzERL3bKuuPz_sw)
- [istanbul-beach-club-phu-quoc] | Istanbul Bai Kem / 이스탄불 비치클럽 푸꾸옥 (Istanbul Bai Kem) | khem-beach | beach_club [Khem Beach, bars, beach-club] | verified (ChIJo_k30uyXpzERwwH_mtvJ1aQ)
- [kaisun-restaurant-and-bar] | Kaisun Restaurant & Bar / 카이선 레스토랑 & 바 (Kaisun Restaurant & Bar) | khem-beach | seafood [Khem Beach, dining, restaurant-bar] | verified (ChIJA6Ns_eOXpzEReRCODKQQ3S8)
- [the-deck-phu-quoc] | The Deck Phu Quoc Kitchen & Beach Bar / 더 덱 푸꾸옥 (The Deck Phu Quoc - Kitchen & Beach Bar) | khem-beach | western [Khem Beach, bars, beach-bar] | verified (ChIJNfSPMQaXpzEREMCGeU9aXEI)
- [bai-khem-beach] | Bãi Khem Beach (Kem Beach) / 바이켐 해변 (Khem Beach) | khem-beach | beach [Khem Beach, beaches, beach] | verified (ChIJ677owMeWpzERsRurcR7BOYE)

### C.7 `banking` (9 Active Items)
- [mb-atm-nop-rut-tien (id: local-sunset-277)] | MB ATM (Deposit/Withdrawal) / MB ATM (Nộp/rút tiền) | sunset-town | ATM [cards: unconfirmed] | verified (cid=6440178889712391999, place_id=ChIJ1R0-b6eVpzERP9dGI5QcYFk)
- [vietinbank-atm (id: local-sunset-279)] | VietinBank ATM / VietinBank ATM | sunset-town | ATM [cards: Visa, Mastercard] | verified (cid=11580843206114582841, place_id=ChIJc4dmHQCVpzEROaH0u4lrt6A)
- [bidv-atm-machine (id: local-sunset-278)] | BIDV ATM machine / BIDV ATM machine | sunset-town | ATM [cards: Visa, JCB, UnionPay] | verified (cid=4069597228033058591, place_id=ChIJ_YsvGwCXpzERHyfTAx4dejg)
- [exmoney-sunset-town-currency-exchange (id: local-sunset-271)] | EXMoney / EXMoney | sunset-town | Currency Exchange | verified (cid=4926815319696634130, place_id=ChIJsY4JY3iXpzEREnF4DG6QX0Q)
- [money-exchange-sunset-town (id: local-sunset-263)] | Money Exchange Sunset Town / Money Exchange Sunset Town | sunset-town | Currency Exchange | verified (cid=13561394820020633960, place_id=ChIJVzqFZ6eVpzERaAEnyrzAM7w)
- [g-g-money-exchange-sunset-town (id: local-sunset-269)] | G&G Money Exchange / G&G Money Exchange | sunset-town | Currency Exchange | verified (cid=17008406116662590211, place_id=ChIJ7aTxLR2VpzERAztBqz__Cew)
- [sunsettown-exchange (id: local-sunset-274)] | Sunset Town Money Exchange / 선셋타운 환전소 | sunset-town | Currency Exchange | verified (cid=9480964989714363871, place_id=ChIJK4MK9QeXpzER3_XWA20nk4M)
- [exchange-money-sol-cosy-phu-quoc (id: local-sunset-267)] | Sol Cosy / Sol Cosy | sunset-town | Currency Exchange | verified (cid=11676667545235786167, place_id=ChIJX_dQ80WVpzERt4kcSkTbC6I)
- [atm-vietcombank-bidv-atm (id: local-sunset-288)] | ATM Vietcombank, BIDV ATM (JW Marriott Entrance) / ATM Vietcombank, BIDV ATM (JW 메리어트 입구) | khem-beach | ATM [cards: unconfirmed] | verified (cid=5124801132809454571, place_id=ChIJHb8567mWpzER64OgWXrzHkc)

### C.8 `landmarks` (12 Active POIs on `/map` + 13 Active `activities/attraction` Records on `/business/[slug]`)

#### C.8a Primary `/map` Landmarks (`SUNSET_LANDMARKS` in `lib/sunsetMapData.ts`, 12 Active Items)
- [kiss-bridge] | Kiss Bridge / 키스 브릿지 | sunset-town (subzone: central) | attraction [ticketSlug: kiss-bridge] | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/kiss-bridge has verified ChIJG-HZ4ZaRpzERhjtO1_1kObg)
- [kiss-of-the-sea] | Kiss of the Sea Theater & Fireworks / 키스 오브 더 씨 극장 & 불꽃놀이 | sunset-town (subzone: central) | show [ticketSlug: kiss-of-the-sea] | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/sunset-place-10 has verified ChIJtSQ7ywmVpzERvzagy4sWZus)
- [clock-tower] | Central Clock Tower (75m) / 센트럴 75m 시계탑 | sunset-town (subzone: central) | attraction | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/thap-dong-ho has verified ChIJGz2yTr6XpzERw3f-8LpV0PM)
- [cable-car-station] | Hon Thom Cable Car Station / 혼똔섬 케이블카 역 | sunset-town (subzone: sorrento) | transport [ticketSlug: hon-thom-cable-car] | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc has verified ChIJvxdKNoKWpzERAWSyG5rABsg)
- [vuifest-bazaar] | Vui-Fest Night Market Bazaar / 부이페스트 야시장 바자르 | sunset-town (subzone: venice) | shopping | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/cho-dem-vui-fest-bazaar-sunset-town has verified ChIJe-XGILOVpzERFUpU0tLXMoY)
- [sun-signature-gallery] | Sun Signature Gallery / 썬 시그니처 갤러리 | sunset-town (subzone: central) | culture | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/sun-signature-gallery has verified ChIJb5dRi2aVpzER5yka1zrbkLM)
- [king-sun-fountain] | Fontana Dei Giorni / 태양신의 분수 | sunset-town (subzone: central) | attraction | missing (search/coord URL only: https://maps.google.com/?q=King+Sun+Fountain+Sunset+Town+Phu+Quoc)
- [sunset-beach] | Sunset Beach / 선셋 비치 | sunset-town (subzone: central) | beach | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/bai-bien-thi-tran-hoang-hon has verified ChIJZXM2cdOVpzERTz6J6CvWVwg)
- [arc-de-triomphe] | Arc de Triomphe Sunset Gate / 선셋 개선문 | sunset-town (subzone: sorrento) | attraction | missing (search/coord URL only: https://maps.google.com/?q=Arc+de+Triomphe+Sunset+Town+Phu+Quoc)
- [marina-pier] | Sunset Marina Yacht Pier / 선셋 마리나 요트 선착장 | sunset-town (subzone: sorrento) | transport | missing (search/coord URL only: https://maps.google.com/?q=Marina+Sunset+Town+Phu+Quoc)
- [pompeii-ruins] | Pompeii Ruins & Spanish Steps / 폼페이 유적 & 스페인 계단 | sunset-town (subzone: sorrento) | culture | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/cot-da-co-pompeii-ancient-pompeii has verified ChIJR1rvoz6XpzERak7X8IIpK7Q)
- [dragon-staircase] | Dragon Staircase / 용의 계단 | sunset-town (subzone: central) | attraction | missing on /map UI (search/coord URL only in sunsetMapData.ts; linked /business/thang-rong has verified ChIJlxCWdMWXpzER1uHLQ3OpVkI)

#### C.8b Active `category: "activities"` (`subcategory: "attraction"`) Records in `data/businesses-registry.json` (13 Active Items)
- [awaken-sea] | Awaken Sea / 어웨이큰 씨 쇼 (Awaken Sea) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJRUK3Ya6VpzERn8o1Mjv25do)
- [thap-dong-ho] | Tháp Đồng Hồ / 선셋타운 시계탑 (Tháp Đồng Hồ) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJGz2yTr6XpzERw3f-8LpV0PM)
- [cot-da-co-pompeii-ancient-pompeii] | Cột Đá Cổ Pompeii Ancient Pompeii / 고대 폼페이 유적 기둥 (Cột Đá Cổ Pompeii - Ancient Pompeii) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJR1rvoz6XpzERak7X8IIpK7Q)
- [kiss-bridge] | Kiss Bridge / 키스 브릿지 (Kiss Bridge) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJG-HZ4ZaRpzERhjtO1_1kObg)
- [thang-rong] | Thang Rồng / 드래곤 계단 (Thang Rồng) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJlxCWdMWXpzER1uHLQ3OpVkI)
- [cho-dem-vui-fest-bazaar-sunset-town] | Chợ Đêm Vui Fest Bazaar Sunset Town / 부이페스트 바자 야시장 (Chợ Đêm Vui-Fest Bazaar Sunset Town) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJe-XGILOVpzERFUpU0tLXMoY)
- [sunset-place-10] | Kiss of the Sea Show Nụ hôn của Biển Cả / 키스 오브 더 씨 쇼 (Kiss of the Sea Show - Nụ hôn của Biển Cả) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJtSQ7ywmVpzERvzagy4sWZus)
- [sunworld-hon-thom-hon-thom-cable-car-phu-quoc] | Sunworld Hòn Thơm Hon Thom Cable Car Phu Quoc / 선월드 혼똔섬 케이블카 탑승장 (Sunworld Hòn Thơm - Hon Thom Cable Car Phu Quoc) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJvxdKNoKWpzERAWSyG5rABsg)
- [symphony-of-the-sea-show] | Symphony of the sea show / 심포니 오브 더 씨 쇼 (Symphony of the sea show) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJs4HwPACXpzER7626u4zOsys)
- [sun-signature-gallery] | Sun Signature Gallery / 선 시그니처 갤러리 (Sun Signature Gallery) | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJb5dRi2aVpzER5yka1zrbkLM)
- [bai-bien-thi-tran-hoang-hon] | Bãi biển Thị trấn Hoàng Hôn / Bãi biển Thị trấn Hoàng Hôn | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJZXM2cdOVpzERTz6J6CvWVwg)
- [sunset-bazaar-phu-quoc] | Sunset Bazaar Phú Quốc / Sunset Bazaar Phú Quốc | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJPZGZytL1MjERhJRt3am-myo)
- [phu-quoc-brew-house] | Phu Quoc Brew House / Phu Quoc Brew House | sunset-town | attraction [attraction, Sunset Town] | verified (ChIJNQRxBrKVpzERhBI9igVrm6k)

---

### C.9 Staged / Non-Public / Hidden Records Already in Repo (Slug & Place ID Collision Reference)

> **Why this sub-list matters for deduplication:** `public.businesses.slug` has a PostgreSQL `UNIQUE` constraint, and `data/businesses-registry.json`, `data/khem-beach-businesses.json`, and `lib/banking.ts` already hold **130 non-public records** across the 8 scanned categories (`unpublished`, `draft`, `hidden`, `private`, `review`, or filtered by `HIDDEN_BUSINESS_SLUGS`). Before inserting a "new" candidate, check this list so existing staged records are updated/re-published rather than duplicated.

<details>
<summary>Expand all 130 Staged / Hidden Records across Scanned Categories</summary>

#### Staged `dining` (29)
- [kadhai-indian-restaurant-sunset-town-phu-quoc] | Kadhai Indian Restaurant Sunset Town (Phu Quoc) / 카다이 인디안 레스토랑 (Kadhai Indian Restaurant Sunset Town (Phu Quoc)) | sunset-town | international [HIDDEN: unpublished] | verified (ChIJdbjrShmVpzER-zfUU0OhqPg)
- [maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town] | Maharaja Lounge 100% Pure Veg Authentic Indian Restaurant Sunset Town / 마하라자 라운지 선셋타운 (Maharaja Lounge - 100% Pure Veg Authentic Indian Restaurant Sunset Town) | sunset-town | international [HIDDEN: unpublished] | verified (ChIJR4_RrzuVpzERTNZI9HaezLk)
- [delhi-darbaar-indian-restaurant-indian-food-in-sunset-town-phu-quoc] | Delhi Darbaar Indian Restaurant (Indian Food in Sunset Town Phu Quoc) / 델리 다르바르 인디안 레스토랑 (Delhi Darbaar Indian Restaurant (Indian Food in Sunset Town Phu Quoc)) | sunset-town | international [HIDDEN: unpublished] | verified (ChIJhZhof9GNpzERkbbDN9MnQEo)
- [com-me] | Cơm Mẹ / 껌 메 (Cơm Mẹ) | sunset-town | vietnamese [HIDDEN: unpublished] | verified (ChIJIb8W0jqVpzERKa5wk0xTu3k)
- [sorrento-restaurant-bar] | Sorrento Restaurant & Bar / 소렌토 레스토랑 & 바 (Sorrento Restaurant & Bar) | sunset-town | seafood [HIDDEN: unpublished] | verified (ChIJfyqPrL2VpzERtUaB6o2c_ZU)
- [antalya-turkish-cuisine-sunset-town] | Antalya Turkish Cuisine Sunset Town / Antalya Turkish Cuisine-Sunset Town | sunset-town | international [HIDDEN: unpublished] | verified (ChIJ5ZFzqOiVpzERxxGEcmIZi3g)
- [amritsar-grill-indian-restaurant] | Amritsar Grill Indian Restaurant / Amritsar Grill Indian Restaurant | sunset-town | western [HIDDEN: unpublished] | verified (ChIJFYbEOYuVpzERNhVUrah1-3Y)
- [rasa-nusantara-phu-quoc] | Rasa Nusantara Phú Quốc / Rasa Nusantara Phú Quốc | sunset-town | seafood [HIDDEN: unpublished] | verified (ChIJX83fV32VpzERWuVp_qZeJVc)
- [mai-huong-restaurant-sunset-town] | Mai Hương Restaurant Sunset Town / Mai Hương Restaurant - Sunset Town | sunset-town | seafood [HIDDEN: unpublished] | verified (ChIJ1SUXRwCVpzERK21wkH1D7nM)
- [turkish-kitchen] | Turkish Kitchen / Turkish Kitchen | sunset-town | international [HIDDEN: unpublished] | verified (ChIJkfRb6NeVpzERPDPeRKGHXZ0)
- [madam-khanh-restaurant-phu-quoc-2] | Madam Khánh Restaurant Phú Quốc 2 / Madam Khánh Restaurant Phú quốc 2-마담 칸 - 汗女士 | sunset-town | seafood [HIDDEN: unpublished] | verified (ChIJ984BCgCVpzERqpzxDVaHUEk)
- [cap-tr-phu-quoc] | Cap'tr Phú Quốc / Cap'tr Phú Quốc | sunset-town | seafood [HIDDEN: unpublished] | verified (ChIJQyGZW3iVpzERlT6miydatAU)
- [chill-sunset-restaurant] | Chill Sunset Restaurant / Chill Sunset Restaurant | sunset-town | vietnamese [HIDDEN: published-but-in-HIDDEN_BUSINESS_SLUGS] | verified (ChIJia_QcgCVpzER-0oMbCu_tgs)
- [banh-canh-ghe-by-restaurant-seafood] | Bánh Canh Ghẹ BY restaurant seafood / Bánh Canh Ghẹ BY-restaurant seafood | an-thoi | seafood [HIDDEN: unpublished] | verified (ChIJ4SO9awCXpzERER4uBviu2l0)
- [oc-dao-an-thoi] | Ốc Đảo An Thới / Ốc Đảo An Thới | an-thoi | seafood [HIDDEN: unpublished] | verified (ChIJ1UTOAQCXpzERJu5SyLaNnBs)
- [quan-nhau-binh-dan-hoang-hon-hoang-hon-quan] | Quán Nhậu Bình Dân HOÀNG HÔN ( Hoàng Hôn Quán ) / Quán Nhậu Bình Dân HOÀNG HÔN ( Hoàng Hôn Quán ) | an-thoi | vietnamese [HIDDEN: unpublished] | verified (ChIJufI0FqCVpzER1FiJropT03Y)
- [nha-hang-com-nieu-viet-xua-an-thoi] | Nhà Hàng Cơm Niêu Việt Xưa An Thới / Nhà Hàng Cơm Niêu Việt Xưa - An Thới | an-thoi | vietnamese [HIDDEN: unpublished] | verified (ChIJlehtpXeXpzERpS23o9pxwrc)
- [wave-cafe-pub-3f-sunset-town] | WAVE CAFE & PUB 3F SUNSET TOWN / 웨이브 카페 & 펍 3F (Wave Cafe & Pub - 웨이브스파 3층) | sunset-town | cafe [HIDDEN: unpublished] | verified (ChIJwXlCOq-VpzERR7dMoAKRcpM)
- [eric-kayser-vietnam] | Eric Kayser Vietnam / 에릭 케제르 푸꾸옥 (Maison Eric Kayser Sunset Town) | sunset-town | cafe [HIDDEN: unpublished] | verified (ChIJjVDpHgiHCjERTaQVRRrVJ9Y)
- [mixue-ice-cream-and-tea] | MIXUE Ice Cream and Tea / 미쉐 아이스크림 & 티 선셋타운점 (MIXUE) | sunset-town | cafe [HIDDEN: unpublished] | verified (ChIJVUPC1uyXpzERD5yoNJTu_-w)
- [ph-rooftop-bar-lounge-sea-view-restaurant-an-thoi-phu-quoc] | PH Rooftop Bar & Lounge Sea View Restaurant, An Thoi, Phu Quoc / PH Rooftop Bar & Lounge - Sea View Restaurant, An Thoi, Phu Quoc | an-thoi | restaurant [HIDDEN: published-but-in-HIDDEN_BUSINESS_SLUGS] | verified (ChIJ_UidppuWpzERKabcboVlovw)
- [pink-pearl] | Pink Pearl by Olivier E. JW Marriott Phu Quoc / 핑크 펄 | khem-beach | fine-dining [HIDDEN: hidden] | verified (ChIJp_ryeK-XpzERKtgeuSUzPMk)
- [tempus-fugit] | Tempus Fugit JW Marriott Phu Quoc / 템푸스 푸짓 | khem-beach | international [HIDDEN: hidden] | verified (ChIJeZJAoFGXpzEREV_d11IUwpo)
- [red-rum] | Red Rum JW Marriott Phu Quoc / 레드 럼 | khem-beach | seafood [HIDDEN: hidden] | verified (ChIJnSaU6pOXpzERmJbwp953evg)
- [mercato-restaurant] | Mercato Restaurant Premier Residences / 메르카토 레스토랑 | khem-beach | buffet [HIDDEN: hidden] | missing (search/raw URL only)
- [clubhouse-restaurant] | Clubhouse Restaurant Premier Residences / 클럽하우스 레스토랑 | khem-beach | casual-dining [HIDDEN: hidden] | verified (ChIJ7Qidld2XpzERrbRKjtEg0Do)
- [the-bay-kitchen] | The Bay Kitchen Restaurant New World Phu Quoc / 더 베이 키친 | khem-beach | international [HIDDEN: hidden] | verified (ChIJDTtRkEeXpzER0YWCULD-TeA)
- [lua-grill-and-bar] | LỬA Grill & Bar (New World Phu Quoc Resort) / 루아 그릴 & 바 | khem-beach | grill [HIDDEN: hidden] | verified (ChIJjVU-q62XpzERMLgQeXaY4S0)
- [oyster-dining-and-beach-bar] | Oyster Dining & Beach Bar Phu Quoc / 오이스터 다이닝 & 비치 바 | khem-beach | seafood [HIDDEN: hidden] | missing (search/raw URL only)

#### Staged `bars` (9)
- [tsunagari-phu-quoc-japanese-matcha-in-the-island] | Tsunagari Phu Quoc Japanese matcha in the island / Tsunagari Phu Quoc - Japanese matcha in the island | an-thoi | cafe [HIDDEN: published-but-in-HIDDEN_BUSINESS_SLUGS] | verified (ChIJybaGwLWXpzER0vqLL6QiWjE)
- [the-ivy-cafe-lounge-phu-quoc] | The Ivy Café & Lounge Phu Quoc / The Ivy Café & Lounge Phu Quoc | sunset-town | cafe [HIDDEN: published-but-in-HIDDEN_BUSINESS_SLUGS] | verified (ChIJEUml2SuVpzER3wqcSc2d9yg)
- [maison-kayser-phu-quoc] | Maison Kayser Phu Quoc / Maison Kayser Phu Quoc | sunset-town | cafe [HIDDEN: published-but-in-HIDDEN_BUSINESS_SLUGS] | verified (ChIJ51OpPgCVpzER-TzMZtCOk0o)
- [apollo-cafe-phu-quoc] | Apollo Cafe Phu Quoc / Apollo Cafe Phu Quoc | sunset-town | cafe [HIDDEN: published-but-in-HIDDEN_BUSINESS_SLUGS] | verified (ChIJk8rbTrmXpzERJtmse_K7fYA)
- [teatro-club-phu-quo-c] | Teatro Club Phú Quốc / 테아트로 클럽 푸꾸옥 (Teatro Club Phú Quốc) | sunset-town | bar [HIDDEN: review] | verified (ChIJgdPeM-6VpzERp4qCP5Rftfc)
- [french-and-co] | French & Co. JW Marriott Phu Quoc / 프렌치 앤 코 | khem-beach | cafe [HIDDEN: hidden] | verified (ChIJBR2AMf2XpzERKaMeLRIfAdk)
- [department-of-chemistry-bar] | Department of Chemistry Bar JW Marriott Phu Quoc / 디파트먼트 오브 케미스트리 바 | khem-beach | cocktail-bar [HIDDEN: hidden] | verified (ChIJlRtyQYOXpzEROqImw3nAJF0)
- [pool-bar-premier-residences] | Pool Bar Premier Residences Phu Quoc / 풀 바 (프리미어 레지던스) | khem-beach | pool-bar [HIDDEN: hidden] | missing (search/raw URL only)
- [the-lounge-new-world] | The Lounge New World Phu Quoc Resort / 더 라운지 (뉴월드 푸꾸옥) | khem-beach | lounge [HIDDEN: hidden] | missing (search/raw URL only)

#### Staged `wellness` (12)
- [ang-spa-nail] | ANG SPA & NAIL / 앙스파 & 네일 선셋타운 (Ang Spa & Nail) | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJO3jGau-VpzERg1PmG8cPTJw)
- [lumi-spa-massage] | LUMI SPA MASSAGE / 루미 스파 1호점 (Lumi Spa & Massage - Venice 63) | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJA5A7QwCVpzERi3wo6GV_i48)
- [wave-spa-2f-sunset-town] | WAVE SPA 2F SUNSET TOWN / 웨이브 스파 2F 선셋타운 (Wave Spa 2F) | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJ4974y1WVpzERZyQpIOT6t0U)
- [bloom-spa-phu-quoc-sunset-town] | Bloom Spa Phu Quoc Sunset Town / Bloom Spa Phu Quoc Sunset Town | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJjZbdc--VpzERyzxlDVkNyeY)
- [herbal-spa-nail-sunset-town] | Herbal Spa & Nail Sunset Town / Herbal Spa & Nail - Sunset Town | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJp0UjMf6VpzERD7GyjfKiP3E)
- [venice-spamedica-phu-quoc] | Venice SpaMedica Phu Quoc / Venice SpaMedica Phu Quoc | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJi3lTpG-VpzERyFCVhUNZGHE)
- [king-spa-massage-sunset-town-night-market] | King Spa & Massage Sunset Town Night Market / King Spa & Massage Sunset Town Night Market | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJNVJF6dyVpzER3ORE37zaHAQ)
- [em-spa-sunset-town-hair-wash-massage-body-foot] | Em Spa Sunset Town Hair Wash Massage Body & Foot / Em Spa Sunset Town - Hair Wash - Massage Body & Foot | sunset-town | spa [HIDDEN: private] | verified (ChIJnaqMUXCXpzERqfIx40YV_tw)
- [an-moc-spa] | An Mộc Spa / An Mộc Spa | sunset-town | spa [HIDDEN: unpublished] | verified (ChIJ6wKFhxiVpzERyyp2Pzh1eG8)
- [chanterelle-spa-by-jw] | Chanterelle Spa by JW / 샹트렐 스파 바이 JW | khem-beach | spa [HIDDEN: hidden] | verified (ChIJwQL9nQOXpzERYXxOiZ-PB1g)
- [emerald-spa] | Emerald Spa Premier Residences / 에메랄드 스파 | khem-beach | spa [HIDDEN: hidden] | verified (ChIJqc1FyFmXpzERV5UOP0OCXMk)
- [the-spa-at-new-world] | The Spa at New World Phu Quoc Resort / 더 스파 앳 뉴월드 | khem-beach | spa [HIDDEN: hidden] | missing (search/raw URL only)

#### Staged `shopping` (6)
- [long-beach-mini-mart-sunset-town] | Long Beach Mini Mart Sunset Town / 롱비치 미니마트 선셋타운 (Long Beach Mini Mart Sunset Town) | sunset-town | convenience_store [HIDDEN: unpublished] | verified (ChIJSQmMIPGVpzERHuR1g4s-oH0)
- [68mart-local-mart-for-tourists-dac-san-phu-quoc] | 68Mart – Local Mart for Tourists Đặc sản Phú Quốc / 68마트 (68Mart – Local Mart for Tourists · Đặc sản Phú Quốc) | sunset-town | convenience_store [HIDDEN: unpublished] | verified (ChIJt72kKACVpzER02fxBgKfwjM)
- [sieu-thi-dat-phuong-nam] | Siêu Thị Đất Phương Nam / Siêu Thị Đất Phương Nam | sunset-town | convenience_store [HIDDEN: unpublished] | verified (ChIJKRXo2vGVpzER09JscHejn9Q)
- [mimi-fruits-mart] | Mimi Fruits & Mimi Mini Mart (Delivery across Sunset Town) / 미미프루츠 & 미미편의점 (선셋타운 전 구역 배달) | sunset-town | convenience_store [HIDDEN: unpublished] | missing (search/raw URL only)
- [sieu-thi-g-mart-24h] | Siêu Thị G Mart 24h / Siêu Thị G_Mart 24h | sunset-town | convenience_store [HIDDEN: unpublished] | verified (ChIJ_6tNcgCXpzERjZNk7CARSY0)
- [huong-nguyen-cosmetics] | HƯỜNG NGUYỄN COSMETICS / HƯỜNG NGUYỄN COSMETICS | an-thoi | Local Specialties [HIDDEN: private] | verified (ChIJNaTg2vuXpzERZnqMv7SVHvA)

#### Staged `hotels` (56)
- [luna-sol-sunset-firework-signature] | Luna Sol Sunset & Firework Signature / 루나 솔 선셋 & 파이어웍스 시그니처 (Luna Sol Sunset & Firework Signature) | sunset-town | residence [HIDDEN: draft] | verified (ChIJE1DWLR2XpzERHLkECUYFH9A)
- [elyday-apartment-hillside-phu-quoc-sea-firework-view] | Elyday Apartment Hillside Phu Quoc Sea & Firework view / 엘리데이 아파트먼트 힐사이드 푸꾸옥 (Elyday Apartment Hillside Phu Quoc - Sea & Firework view) | sunset-town | residence [HIDDEN: draft] | verified (ChIJSxxK2hKXpzEREXkxEzCQ--w)
- [the-memory-hotel-sunset-town-phu-quoc] | The Memory Hotel Sunset Town Phú Quốc / The Memory Hotel - Sunset Town Phú Quốc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJw1HTFTKVpzERuz5tY3Ixnpo)
- [blue-home-sunset-town-phu-quoc] | Blue Home Sunset Town Phu Quoc / Blue Home Sunset Town Phu Quoc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJLzWBN6KVpzERtskBmd6MwKw)
- [sunset-town-hillside-apartment] | Sunset Town Hillside Apartment / Sunset Town Hillside Apartment | sunset-town | residence [HIDDEN: draft] | verified (ChIJk5O2QguXpzERx3GTGWc8ck8)
- [the-sunset-seaview-phu-quoc-apartments] | The Sunset Seaview Phu Quoc Apartments / The Sunset Seaview Phu Quoc Apartments | sunset-town | residence [HIDDEN: draft] | verified (ChIJpwj5PxOXpzER9t6nZE6l51g)
- [summer-homestay-phu-quoc] | Summer Homestay Phu Quoc / Summer Homestay Phu Quoc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJS5nx7xuXpzERhPHmeeq9Leo)
- [sunset-home-airbnb-phu-quoc] | Sunset Home Airbnb Phu Quoc / Sunset Home Airbnb Phu Quoc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJydXEsh-VpzERcKXaLqqv-20)
- [tiny-house-phu-quoc] | Tiny House Phu Quoc / Tiny House Phu Quoc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJYT2Wn8qLpzERrMAUGknSA4c)
- [toa-h2-sun-grand-city-hillside-residence] | Toà H2, Sun Grand City Hillside Residence / Toà H2, Sun Grand City Hillside Residence | sunset-town | residence [HIDDEN: draft] | verified (ChIJnbI5PgCXpzERL5VQGOXcvgY)
- [phu-quoc-sunset] | Phu quoc sunset / Phu quoc sunset | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJg0lBcACXpzERWCJOUaO-NCU)
- [rosy-hotel-phu-quoc-sunset-town] | ROSY HOTEL Phu Quoc Sunset town / ROSY HOTEL Phu Quoc Sunset town | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJHV-DBISVpzERUz8K6OFUIGo)
- [th-luxury-hotel] | TH Luxury Hotel / TH Luxury Hotel | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJM7-eNwCXpzERplviN61yYmc)
- [seasons-hotel-khach-san-sunset-town-phu-quoc] | Seasons Hotel Khách Sạn Sunset Town Phú Quốc / Seasons Hotel - Khách Sạn Sunset Town Phú Quốc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJCx9KjDKVpzERrjOgARaHuHI)
- [royal-hotel-phu-quoc-2] | Royal Hotel Phu Quoc 2 / Royal Hotel Phu Quoc 2 | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJnQsRSQCXpzERZ64K0hh7wXE)
- [hongkong-roast-house-halal-kitchen-phu-quoc] | Hongkong Roast House Halal kitchen Phu Quoc / 홍콩 로스트 하우스 (Hongkong Roast House · Halal kitchen Phu Quoc) | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJEwFlcSCXpzERdgAgbDFJ86A)
- [sunny-side-hotel-phu-quoc] | Sunny Side Hotel Phú Quốc / Sunny Side Hotel Phú Quốc | an-thoi | boutique_hotel [HIDDEN: draft] | verified (ChIJPxfJfpeXpzERMNfR5dHAXJE)
- [sea-sunset-hotel-phu-quoc-welcome-to-a-mixing-world-of-friends] | Sea Sunset Hotel Phú Quốc Welcome to a mixing world of friends / Sea Sunset Hotel Phú Quốc - Welcome to a mixing world of friends | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJRxTYyj2VpzEReVIKtzS3ug4)
- [khach-san-bella-sunset-town-phu-quoc] | Khách sạn Bella Sunset Town Phú Quốc / Khách sạn Bella Sunset Town Phú Quốc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJ8csMU6aVpzERfAxZKSQ-sVI)
- [the-maris-apartment-hillside-phu-quoc-sunset-town] | The Maris Apartment Hillside Phu Quoc Sunset Town / The Maris Apartment Hillside Phu Quoc - Sunset Town | sunset-town | residence [HIDDEN: draft] | verified (ChIJK9xNyBSXpzERvhpFTfFSncM)
- [oscar-seaview-apartment] | Oscar Seaview Apartment / Oscar Seaview Apartment | sunset-town | residence [HIDDEN: draft] | verified (ChIJQ5ppQgCXpzERLIW17797FPk)
- [the-nice-hotel-phu-quoc-fireworks-ocean-view] | The Nice Hotel Phu Quoc Fireworks & Ocean view / The Nice Hotel Phu Quoc - Fireworks & Ocean view | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJWyR4R6WVpzERdWiJg-xbMZs)
- [sunset-sorento-phu-quoc-nang-bien-hotel] | Sunset sorento Phu Quoc (Nắng Biển hotel) / Sunset sorento Phu Quoc (Nắng Biển hotel) | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJz94dpQKXpzERwFtq4ya-gdg)
- [sunset-house-phu-quoc-buggy-services] | Sunset House Phu Quoc Buggy Sevices / Sunset House Phu Quoc - Buggy Sevices | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJf7rMNa6WpzERKfYbQCgVdlg)
- [pearl-vista-luxury-service-apartments-seaview-fireworks] | Pearl Vista Luxury Service Apartments Seaview & Fireworks / Pearl Vista Luxury Service Apartments - Seaview & Fireworks | sunset-town | residence [HIDDEN: draft] | verified (ChIJV3Wgn1SXpzERMLtkaI4Lsqs)
- [lotus-home-hillside] | Lotus Home Hillside / Lotus Home Hillside | sunset-town | residence [HIDDEN: draft] | verified (ChIJC_zbaC2XpzERmmgdPCSvGy4)
- [sea-gallery-sunset-town-luxury-apartment] | SEA GALLERY SUNSET TOWN LUXURY APARTMENT / SEA GALLERY SUNSET TOWN LUXURY APARTMENT | sunset-town | residence [HIDDEN: draft] | verified (ChIJL-WjKOKXpzER5xGNbzHMmvI)
- [minimalist-hillside-apartment] | Minimalist Hillside Apartment / Minimalist Hillside Apartment | sunset-town | residence [HIDDEN: draft] | verified (ChIJi-QGFhaXpzERAaKhYWP121g)
- [trung-nguyen-e-coffee-jenben-hotel] | Trung nguyên E coffee JENBEN HOTEL / Trung nguyên E coffee - JENBEN HOTEL | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJqVgIBfGVpzERic6Fg2JP45o)
- [sunset-bay-retreat-phu-quoc] | SUNSET BAY RETREAT PHÚ QUỐC / SUNSET BAY RETREAT PHÚ QUỐC | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJbSYTyNmVpzERcDMqecZ8ilI)
- [sunset-royal] | Sunset Royal / Sunset Royal | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJI__GdUGXpzERKX435iNiC3o)
- [homestay-hillside-an-th-i-the-hill-h2] | Homestay Hillside An Thöi (The Hill) H2 / Homestay Hillside An Thöi (The Hill) H2 | sunset-town | residence [HIDDEN: draft] | verified (ChIJuxF9RQCXpzERNbbCYOpt3rY)
- [toa-s2-sun-grand-city-hillside-residence] | Toà S2, Sun Grand City Hillside Residence / Toà S2, Sun Grand City Hillside Residence | sunset-town | residence [HIDDEN: draft] | verified (ChIJEcZsCQCXpzERcvHp3Ekte8Y)
- [tk-house-phu-quoc] | TK HOUSE PHU QUOC / TK HOUSE PHU QUOC | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJvZLgZACVpzERuXVHXu51M80)
- [toa-h3-sun-grand-city-hillside-residence] | Toà H3, Sun Grand City Hillside Residence / Toà H3, Sun Grand City Hillside Residence | sunset-town | residence [HIDDEN: draft] | verified (ChIJxXhAYgCXpzERdxrx2yxw_70)
- [toa-s1-sun-grand-city-hillside-residence] | Toà S1, Sun Grand City Hillside Residence / Toà S1, Sun Grand City Hillside Residence | sunset-town | residence [HIDDEN: draft] | verified (ChIJJ1x_dACXpzER0NwrO71hhqE)
- [rova-hotel-apartment-amalfi-sunset-town] | ROVA HOTEL & APARTMENT AMALFI SUNSET TOWN / ROVA HOTEL & APARTMENT - AMALFI SUNSET TOWN | sunset-town | residence [HIDDEN: draft] | verified (ChIJEeS0Gx6UpzER_JDUSa14WaI)
- [the-sea-residences] | The Sea Residences / The Sea Residences | sunset-town | residence [HIDDEN: draft] | verified (ChIJoa-UEQCVpzER3a1nx8svsr0)
- [l-a-hillside-apartment-sunset-town-phu-quoc] | L&A Hillside Aparment Sunset Town Phu Quoc / L&A - Hillside Aparment Sunset Town Phu Quoc | sunset-town | residence [HIDDEN: draft] | verified (ChIJUZ1-cACXpzER0vvP0T2tKuY)
- [toa-h1-sun-grand-city-hillside-residence] | Toà H1, Sun Grand City Hillside Residence / Toà H1, Sun Grand City Hillside Residence | sunset-town | residence [HIDDEN: draft] | verified (ChIJn4ufFwCXpzERaOY9EyOFHvU)
- [toa-s3-sun-grand-city-hillside-residence] | Toà S3, Sun Grand City Hillside Residence / Toà S3, Sun Grand City Hillside Residence | sunset-town | residence [HIDDEN: draft] | verified (ChIJY2frYACXpzER7EnKQBfOTZQ)
- [la-phan-phu-quoc-hillside-apartment] | La Phan Phu Quoc Hillside Apartment / La Phan Phu Quoc Hillside Apartment | sunset-town | residence [HIDDEN: draft] | verified (ChIJizGVMi-XpzERx5BfQC3-v_Q)
- [sunset-town-service-apartment-phu-quoc] | Sunset Town Service Apartment Phu Quoc / Sunset Town Service Apartment Phu Quoc | an-thoi | residence [HIDDEN: draft] | verified (ChIJc2kJJEqXpzERU8Pi4YXE8VQ)
- [haibot-12-homestay-sunset-town-phu-quoc] | Haibot 12 Homestay Sunset Town Phu Quoc / Haibot 12 Homestay Sunset Town Phu Quoc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJndpEdaCWpzERSJKUI11zKzo)
- [sunset-hotel-sunset-town-phu-quoc] | Sunset Hotel Sunset Town Phu Quoc / Sunset Hotel - Sunset Town - Phu Quoc | sunset-town | boutique_hotel [HIDDEN: draft] | verified (ChIJTeB-zh2UpzERcHARuYrdCME)
- [hillside-apartment-in-sunset-town-phu-quoc] | Hillside Apartment in Sunset Town, Phu Quoc / Hillside Apartment in Sunset Town, Phu Quoc | sunset-town | residence [HIDDEN: draft] | verified (ChIJO1D89qCWpzERs-4VpolXxCQ)
- [hillside-sunset-town-phu-quoc] | Hillside Sunset Town Phu Quoc / Hillside Sunset Town Phu Quoc | sunset-town | residence [HIDDEN: draft] | verified (ChIJgaHIR6CWpzERjGjAhK1qpYE)
- [sunset-town-apartment-phu-quoc] | Sunset Town Apartment Phu Quoc / 선셋타운 아파트먼트 푸꾸옥 (Sunset Town Apartment Phu Quoc) | sunset-town | residence [HIDDEN: draft] | verified (ChIJg0OEO6CWpzERLcs9LETAtdI)
- [casa-del-mar-hotel-apartment-sunset-town] | Casa Del Mar Hotel & Apartment Sunset Town / Casa Del Mar Hotel & Apartment - Sunset Town | sunset-town | residence [HIDDEN: draft] | verified (ChIJt7Y0Jx6UpzER635fflPTrNI)
- [hillside-apartment-sunset-town-phu-quoc-apartment-with-sea-view] | Hillside Apartment Sunset Town Phu Quoc Apartment with Sea View / Hillside Apartment Sunset Town Phu Quoc - Apartment with Sea View | an-thoi | residence [HIDDEN: draft] | verified (ChIJCf___6uWpzERnlARVsJytyY)
- [triland-hillside] | Triland Hillside / 트라이랜드 힐사이드 (Triland Hillside) | sunset-town | residence [HIDDEN: draft] | verified (ChIJOZ1p38-VpzERKC1kUSIrA4A)
- [luxury-hotel-spa-milan-38-sunset-town] | Luxury Hotel & Spa Milan 38 Sunset Town / Luxury Hotel & Spa Milan 38 Sunset Town | sunset-town | boutique_hotel [HIDDEN: unlisted] | verified (ChIJUVANxM6XpzERxNQieCqMz1w)
- [paralia-khem-beach-phu-quoc-hotel] | Paralia Khem Beach Phu Quoc Hotel / 파랄리아 켐비치 호텔 푸꾸옥 | khem-beach | hotel [HIDDEN: hidden] | verified (ChIJ--GCQXqXpzER7itlt0HX5Ps)
- [jm-boutique-hotel-phu-quoc] | JM Boutique Hotel Phu Quoc / JM 부티크 호텔 푸꾸옥 | khem-beach | hotel [HIDDEN: hidden] | verified (ChIJhfbFBaCXpzER-fkbP-fwDcI)
- [ann-hotel-spa-phu-quoc] | Ann Hotel & Spa Phu Quoc / 앤 호텔 & 스파 푸꾸옥 | khem-beach | hotel [HIDDEN: hidden] | verified (ChIJpyMOH-WXpzERgb6Kly4H7QA)
- [mareva-khem-beach-hotel-phu-quoc] | Mareva Khem Beach Hotel Phu Quoc / 마레바 켐비치 호텔 푸꾸옥 | khem-beach | hotel [HIDDEN: hidden] | verified (ChIJKc_twDOXpzERttkoGDyrvjI)

#### Staged `banking` (11)
- [tpbank-livebank-347-nguyen-van-cu] | TPBank LiveBank 347 Nguyễn Văn Cừ / TPBank LiveBank 347 Nguyễn Văn Cừ | an-thoi | atm [HIDDEN: private] | verified (ChIJ3X20sn2XpzERXLMKc4FzQ28)
- [acb-atm] | ACB ATM / ACB ATM | an-thoi | atm [HIDDEN: private] | verified (ChIJI2mmzSmXpzERbYVRzyoEe-U)
- [pgd-an-thoi-cn-phu-quoc-ngan-hang-tmcp-dau-tu-phat-trien-viet-nam-bidv] | PGD An Thới CN Phú Quốc Ngân hàng TMCP Đầu tư & Phát triển Việt Nam (BIDV) / PGD An Thới - CN Phú Quốc - Ngân hàng TMCP Đầu tư & Phát triển Việt Nam (BIDV) | an-thoi | atm [HIDDEN: private] | verified (ChIJk0WXYpuWpzERa4-nkUrGLEY)
- [cay-atm-bidv] | Cây ATM BIDV / Cây ATM_BIDV | an-thoi | atm [HIDDEN: private] | verified (ChIJ85c8oy6XpzERSWtuWtlHbLk)
- [mb-atm-rut-tien] | MB ATM (Rút tiền) / MB ATM (Rút tiền) | an-thoi | atm [HIDDEN: private] | verified (ChIJJ0CyH1iXpzERLDnhtNVvV3U)
- [atm-vietcombank] | ATM Vietcombank / ATM Vietcombank | an-thoi | atm [HIDDEN: private] | verified (ChIJee2mR4OWpzER98XuX_CY8nM)
- [atm-sacombank] | ATM SACOMBANK / ATM SACOMBANK | an-thoi | atm [HIDDEN: private] | verified (ChIJ5dx6-3-XpzERAdsyhzUCpM8)
- [atm-kienlongbank-an-thoi] | ATM KienlongBank An Thới / ATM - KienlongBank An Thới | an-thoi | atm [HIDDEN: private] | verified (ChIJMe22CnCXpzERJBSnWhFrVmI)
- [king-kong-money-exchange-khem-beach] | King Kong Money Exchange Khem Beach / King Kong Money Exchange - Khem Beach | sunset-town | currency_exchange [HIDDEN: private] | verified (cid=7406987655171001539)
- [atm-vietcombank-bidv-jw-marriott] | ATM Vietcombank & BIDV (JW Marriott Entrance) / ATM 비엣콤뱅크 · BIDV (JW 메리어트 입구) | khem-beach | atm [HIDDEN: hidden] | verified (ChIJHb8567mWpzER64OgWXrzHkc)
- [khem-banking-king-kong] | King Kong Money Exchange Khem Beach / King Kong Money Exchange - Khem Beach | khem-beach | exchange [HIDDEN: private] | verified (cid=7406987655171001539)

#### Staged `landmarks / activities` (4)
- [phu-quoc-go] | Phú Quốc Go / Phú Quốc Go | an-thoi | attraction [HIDDEN: review] | verified (ChIJp9ZcOsKXpzERDLEPwP3e9JE)
- [sun-group-sunset-town-electric-buggy-service] | Sun Group Sunset Town Electric Buggy Service / 선셋타운 공식 전동 버기카 & 무료 셔틀버스 (Electric Buggy) | sunset-town | attraction [HIDDEN: unpublished] | missing (search/raw URL only)
- [sunset-town-motorbike-scooter-rental] | Sunset Town Motorbike & Scooter Rental / Sunset Town Motorbike & Scooter Rental | sunset-town | attraction [HIDDEN: review] | verified (ChIJk-jMi4iXpzERM3xMhvCmdVE)
- [water-sports-at-premier-residences] | Water Sports at Premier Residences / 프리미어 레지던스 해양 레저 센터 | khem-beach | water-sports [HIDDEN: hidden] | missing (search/raw URL only)

</details>

---

## Section D: Exact Data Schema Reference & Seed Insertion Targets

### D.0 Where New Seed Data Must Be Inserted (Exact File Paths & Supabase Tables)

| Target Category | Local Source-of-Truth Files (Git) | Supabase Tables & SQL Migration Path |
| :--- | :--- | :--- |
| **Standard Directory Items**<br>(`dining`, `bars`, `wellness`, `shopping`, `beaches`, `essentials`, `transport`) | 1. **Sunset Town / An Thoi:** `data/businesses-registry.json`<br>2. **Khem Beach:** `data/khem-beach-businesses.json` *(must also remove from `HIDDEN_BUSINESS_SLUGS` in `lib/directory.ts` if previously hidden)*<br>3. **Zone & Service Area Mapping:** `data/zone-assignments.json` (keyed by `b.id`, e.g. `local-sunset-XXX` or `khem-...`)<br>4. **7-Locale Descriptions (`zh`, `ru`, `ja`, `hi`, `vi`):** `data/i18n/translations/biz_desc.json` (keyed by `slug`; `en` and `ko` live directly on the business record)<br>5. **Cover Photos (optional fallback map):** `data/cover-photos.json` & static WebP files under `public/covers-photo/`<br>6. **Menus (F&B Grade A/B/C/D):** `data/menus-registry.json` | 1. **Table `public.businesses`** (`ON CONFLICT (slug) DO UPDATE`) via a new numbered migration in `supabase/migrations/036_...sql`<br>2. **Table `public.business_menu_items`** (FK `business_id -> public.businesses.id`, for Grade A/B/C/D menu items) |
| **`hotels`** | 1. **Sunset Town `/hotels` UI:** `data/sunset_town_hotels.json` (`{ "hotels": [...] }`)<br>2. **Khem Beach `/hotels` UI:** `data/khem_beach_hotels.json` (`{ "hotels": [...] }`)<br>3. **Editorial Pros/Cons & Maps Override:** `data/hotel_insights.json` (keyed by `slug`)<br>4. **Multi-Language String Lookup:** Inline `summary_en`, `summary_zh`, `summary_ja`, `summary_ru`, `summary_vi` on `HotelItem` **+** phrase maps `HOTEL_TEXT_EN` in `lib/i18n/hotelTranslations.ts` & `HOTEL_TEXT_VI` in `lib/i18n/hotelTextVi.ts` *(note: `hi` currently falls back to `summary_en` / `HOTEL_TEXT_EN`)*<br>5. **Optional `/business/[slug]` detail parity:** `data/businesses-registry.json` or `data/khem-beach-businesses.json` + `public.businesses` | `/hotels` is 100% file-backed (no Supabase hotel table). Only insert into `public.businesses` if a `/business/[slug]` detail page is also desired. |
| **`banking`** | 1. **`/directory/banking` UI:** `BANKING_PLACES` array in `lib/banking.ts` (inline 7-locale `name` & `location` objects)<br>2. **`/business/[slug]` parity:** `data/businesses-registry.json` + `data/zone-assignments.json` | **Table `public.businesses`** (`category = 'banking'`, `subcategory = 'atm' | 'exchange'`) if adding `/business/[slug]` parity. |
| **`landmarks`** | 1. **`/map` & `/zones/sunset-town` UI:** `SUNSET_LANDMARKS` array in `lib/sunsetMapData.ts` (inline 7-locale `name`, `description`, `tips`, plus `imgX`/`imgY` pixel coords on 887×1774 v3 map)<br>2. **Linkage to `/business/[slug]`:** `LANDMARK_BUSINESS_SLUG` map in `components/SunsetTownMap.tsx` + attraction record in `data/businesses-registry.json` | **Table `public.businesses`** (`category = 'activities'`, `subcategory = 'attraction'`) for linked detail pages. |

---

### D.1 Complete Sample Record — Standard Directory Item (`dining`: `cai-mam-bistro`)

Standard directory items split their fields across **3 coordinated JSON files** at build/runtime plus the **Supabase `public.businesses` row**:

#### (a) Primary Record in `data/businesses-registry.json`
*(Note: In `data/khem-beach-businesses.json`, records additionally accept optional `name_en`, `name_local`, `zone`, `opening_hours`, `price_level`, and `google_rating` fields.)*
```json
{
  "id": "local-sunset-98",
  "public_name": "까이 멈 비스트로 (CÁI MÂM BISTRO)",
  "slug": "cai-mam-bistro",
  "category": "dining",
  "subcategory": "vietnamese",
  "google_place_id": "ChIJj9eeH0-XpzERR3O-7B0rxFo",
  "description_en": "Vietnamese bistro in Sunset Town serving traditional home-style platter meals, local seafood dishes, bun cha, banh xeo, and refreshing drinks.",
  "description_ko": "베트남 전통 소쿠리(Cái Mâm)에 정갈하게 담아내는 베트남 가정식 백반과 해산물 요리, 분짜·반쎄오 및 시원한 음료를 맛볼 수 있는 선셋타운 베트남 비스트로입니다.",
  "address": "P27 Chợ đêm Vuifest - Sunset Town, Phú Quốc, An Giang 91000, Vietnam",
  "google_maps_name": "CÁI MÂM BISTRO",
  "google_maps_url": "https://www.google.com/maps/place/?q=place_id:ChIJj9eeH0-XpzERR3O-7B0rxFo",
  "phone": "+84 812 059 609",
  "website_url": "https://caimambistro.com/branches/cai-mam-bistro-vietnamese-noodles-cafe/",
  "instagram_url": null,
  "status": "published",
  "verification_status": "ai_checked",
  "verification_note": "Master DB 수집 2026-10, 현장 미확인",
  "google_rating": 4.7,
  "google_review_count": 1277,
  "gallery_urls": [
    "/covers-photo/cai-mam-bistro-1.webp",
    "/covers-photo/cai-mam-bistro-2.webp",
    "/covers-photo/cai-mam-bistro-3.webp",
    "/covers-photo/cai-mam-bistro-4.webp",
    "/covers-photo/cai-mam-bistro-5.webp"
  ],
  "tags": [
    "cafe",
    "Sunset Town"
  ],
  "_deleted_snippet": "• [대표 메뉴/가격] 소고기 쌀국수(Phở), 분보남보, 비빔 쌀국수, 베트남 가정식 쟁반 한상(Mâm cơm), 비건 메뉴 | 75,000~220,000 VND",
  "_source_citation": "해당 없음 (기본 마스터 DB 등록 사실)",
  "_deleted_claims": "정통 수식어 삭제 | 미검증 휠체어 접근성 스펙 삭제",
  "lat": 10.0330871,
  "lng": 104.0032731,
  "media_note": "Google Maps",
  "photo_permission": "google_maps_verified",
  "rating_check_date": "2026-11-01",
  "google_review_analysis": {
    "rating": 4.7,
    "reviewCount": 1277,
    "lastVerified": "2026-11-01",
    "topics": [
      "쌀국수 (166)",
      "분 보 남보 (39)",
      "비빔국수 (24)",
      "야시장 (19)",
      "해질녘 마을 (15)",
      "광주볶음면 (13)",
      "와규 (11)",
      "불꽃놀이 (10)"
    ],
    "praised": {
      "ko": [
        "구글맵 방문자 리뷰 1,277건에서 쌀국수 (166), 분 보 남보 (39), 비빔국수 (24), 야시장 (19) 키워드가 주요 장점으로 언급됩니다.",
        "음식 양이 넉넉하고 가격 대비 만족도가 높다는 방문객 평가가 이어지고 있습니다."
      ],
      "en": [
        "Highlighted across 1,277 Google Maps reviews (★4.7) for 쌀국수, 분 보 남보, 비빔국수.",
        "Guests highlight the generous portions and good value for money."
      ],
      "vi": [
        "Nổi bật qua 1,277 đánh giá trên Google Maps (★4.7) với các từ khóa: 쌀국수, 분 보 남보, 비빔국수.",
        "Khẩu phần đầy đặn và mức giá hợp lý là điểm cộng được nhiều khách nhắc đến."
      ]
    },
    "goodToKnow": {
      "ko": [],
      "en": [],
      "vi": []
    },
    "sentimentSummary": {
      "ko": "구글맵 리뷰 1,277건(★4.7) 분석 결과, 실제 방문객 후기에서 '쌀국수, 분 보 남보, 비빔국수' 관련 만족도가 높게 나타납니다.",
      "en": "Based on 1,277 Google Maps reviews (★4.7), visitors most frequently highlight 쌀국수, 분 보 남보, 비빔국수.",
      "vi": "Dựa trên 1,277 đánh giá Google Maps (★4.7), du khách thường nhắc đến 쌀국수, 분 보 남보, 비빔국수."
    },
    "sampleReviews": [
      "음식은 맛있는데.... 파리땜에 ...... 파리가 너무 많고 돌솥 와규 퍼 옆에 준비된 고기들 위에 앉아잇는 파리들이 너무너무 너무 많아서 ㅜㅜㅜㅜㅜㅜㅜㅜㅜ 솔직히 먹기전부터 그거보고 먹기싫엇는데…",
      "음식점 몇 개 찾아보다가 그냥 들어왔는데 ... 막 엄청 맛있진 않지만 꽤 만족스러운 식사였다 ... 쌀국수에 고수 들어갑니다 ... 주문할때 미리 빼달라고 해야할듯 개인적으로 분보남보보다 분짜가 더 맛있음 (분보남보는 향신료 향이 좀 납니다)…",
      "음식이 맛있어요. 4번 메뉴 강추! 남부식 비빔 쌀국수!! 맛있어요. 가성비 짱!! 설날에도 영업해요"
    ]
  },
  "image_credits": [
    {
      "image_url": "/covers-photo/cai-mam-bistro-1.webp",
      "credit_text": "Google Maps",
      "source_page_url": "https://www.google.com/maps/place/?q=place_id:ChIJj9eeH0-XpzERR3O-7B0rxFo"
    },
    {
      "image_url": "/covers-photo/cai-mam-bistro-2.webp",
      "credit_text": "Google Maps",
      "source_page_url": "https://www.google.com/maps/place/?q=place_id:ChIJj9eeH0-XpzERR3O-7B0rxFo"
    },
    {
      "image_url": "/covers-photo/cai-mam-bistro-3.webp",
      "credit_text": "Google Maps",
      "source_page_url": "https://www.google.com/maps/place/?q=place_id:ChIJj9eeH0-XpzERR3O-7B0rxFo"
    },
    {
      "image_url": "/covers-photo/cai-mam-bistro-4.webp",
      "credit_text": "Google Maps",
      "source_page_url": "https://www.google.com/maps/place/?q=place_id:ChIJj9eeH0-XpzERR3O-7B0rxFo"
    },
    {
      "image_url": "/covers-photo/cai-mam-bistro-5.webp",
      "credit_text": "Google Maps",
      "source_page_url": "https://www.google.com/maps/place/?q=place_id:ChIJj9eeH0-XpzERR3O-7B0rxFo"
    }
  ]
}
```

#### (b) Multi-Language Descriptions (`zh`, `ru`, `ja`, `hi`, `vi`) in `data/i18n/translations/biz_desc.json`
*(`en` and `ko` are read from `description_en` and `description_ko` above; `BusinessRoute.tsx` and `DirectoryRoute.tsx` merge `biz_desc.json[slug]` at render time for the remaining 5 locales.)*
```json
{
  "cai-mam-bistro": {
    "zh": "位于日落小镇的越南风味小餐馆，提供传统家常拼盘套餐、本地海鲜、越式烤肉米粉（Bún Chả）、越南煎饼（Bánh Xèo）及清爽饮品。",
    "ru": "Вьетнамское бистро в Сансет-Тауне. Здесь подают традиционные домашние блюда в наборах, местные морепродукты, бунча — рисовую лапшу с жареным мясом, вьетнамские блинчики баньсео и освежающие напитки.",
    "ja": "サンセットタウンにあるベトナム料理のビストロ。伝統的な家庭料理の盛り合わせ、地元のシーフード料理、ブンチャー、バインセオ、さっぱりとしたドリンクなどを提供しています。",
    "hi": "सनसेट टाउन का यह वियतनामी बिस्ट्रो पारंपरिक घरेलू भोजन की थालियाँ, स्थानीय समुद्री व्यंजन, बुन चा (Bún Chả), बान सेओ (Bánh Xèo) और ताज़गी देने वाले पेय परोसता है।",
    "vi": "Quán bistro Việt tại Thị trấn Hoàng Hôn, phục vụ mâm cơm truyền thống, hải sản địa phương, bún chả, bánh xèo và đồ uống giải khát."
  }
}
```

#### (c) Zone & Service Area Entry in `data/zone-assignments.json`
```json
{
  "local-sunset-98": {
    "place_id": "local-sunset-98",
    "google_place_id": "ChIJj9eeH0-XpzERR3O-7B0rxFo",
    "name": "까이 멈 비스트로 (Cái Mâm Bistro - Vietnamese Noodles & Cafe)",
    "zone": "sunset-town",
    "public_category": "dining",
    "service_areas": [
      "sunset-town"
    ]
  }
}
```

#### (d) Full Supabase `public.businesses` Table Schema (Merged Across Migrations `001`–`034`)
*(Shows exact column names, types, defaults, and `opening_hours` / `price_level` / 7-language `description_*` columns expected when seeding PostgreSQL alongside local JSON.)*
```sql
-- Table: public.businesses (unique key: slug)
-- Status constraint: 'draft' | 'submitted' | 'review' | 'published' | 'rejected' | 'needs_update' | 'archived'
-- Verification status: 'unverified' | 'ai_checked' | 'manual_review' | 'verified' | 'rejected'
INSERT INTO public.businesses (
  public_name,          -- text NOT NULL (Korean + Original name, e.g. '까이 맘 비스트로 (CÁI MÂM BISTRO)')
  slug,                 -- text UNIQUE NOT NULL
  category,             -- text NOT NULL ('dining'|'bars'|'wellness'|'shopping'|'hotels'|'beaches'|'banking'|'activities'|'essentials'|'transport')
  subcategory,          -- text (WARNING: match UI chip casing/spaces or add tag in tags[] so DirectoryBrowser chip filters match!)
  google_place_id,      -- text (Valid Google Protobuf ChIJ... ID; indexed)
  google_maps_name,     -- text (Official H1 title on Google Maps; also used as displayBusinessName fallback for non-KO locales)
  google_maps_url,      -- text ('https://www.google.com/maps/place/?q=place_id:ChIJ...')
  lat,                  -- numeric(10, 7)
  lng,                  -- numeric(10, 7)
  address,              -- text
  phone,                -- text
  website_url,          -- text
  instagram_url,        -- text
  facebook_url,         -- text
  tiktok_url,           -- text
  booking_url,          -- text
  opening_hours,        -- jsonb DEFAULT '{}'::jsonb (e.g. '{"daily": "11:00-22:00"}' or '{"mon_sun": "08:00-23:00"}')
  price_level,          -- text ('$' | '$$' | '$$$' | '$$$$' — currently NULL across existing rows; populate to enable price chips!)
  tags,                 -- text[] DEFAULT '{}' (used by DirectoryBrowser subFilter case-insensitive matching!)
  badges,               -- text[] DEFAULT '{}' ('Recommended' | 'New' | 'HOT')
  amenities,            -- jsonb DEFAULT '{}'::jsonb
  highlights,           -- jsonb DEFAULT '[]'::jsonb
  services,             -- jsonb DEFAULT '[]'::jsonb
  gallery_urls,         -- text[] DEFAULT '{}' (e.g. ARRAY['/covers-photo/slug-1.webp', ...])
  media_note,           -- text (image attribution URL)
  photo_permission,     -- boolean / text note
  google_rating,        -- numeric
  google_review_count,  -- integer
  rating_source,        -- text
  description_en,       -- text (English)
  description_ko,       -- text (Korean)
  description_vi,       -- text (Vietnamese)
  description_zh,       -- text (Simplified Chinese)
  description_ru,       -- text (Russian)
  description_ja,       -- text (Japanese)
  description_hi,       -- text (Hindi)
  status,               -- text NOT NULL DEFAULT 'draft' (set 'published' for live visibility)
  verification_status,  -- text NOT NULL DEFAULT 'unverified' ('verified' | 'ai_checked')
  verification_note,    -- text
  published_at          -- timestamptz
) VALUES (...);
```

---

### D.2 Complete Sample Record — `hotels` Item (`/hotels` Schema)

`/hotels` uses the `HotelItem` schema (`lib/hotels.ts`), which is **completely separate** from `public.businesses`.
- **Coordinates & Hours Note:** `HotelItem` does **not** store `lat`/`lng` or `opening_hours`; instead it stores `cable_m` (walking/driving meters to Hon Thom Cable Car Station), `checkIn` / `checkOut`, `priceRange` (`$`–`$$$$$`), `googlePlaceId` (optional), and `googleMapsUrl` (`lat`/`lng` are only stored if a companion `/business/[slug]` record is also added to `data/businesses-registry.json` or `data/khem-beach-businesses.json`).
- **Multi-language architecture for `hotels`:**
  - `name_ko` (`ko`) and `name_en` (`en`, `zh`, `ru`, `ja`, `hi`, `vi` display title).
  - `summary` (`ko`), plus optional inline `summary_en`, `summary_zh`, `summary_ja`, `summary_ru`, `summary_vi` on each hotel object (already populated in `data/khem_beach_hotels.json`; `hi` falls back to `summary_en`).
  - Korean-authored structured fields (`address`, `badgeText`, `coreFacilities[]`, `landmarks[]`, `rooms[]`, `reviewHighlight`, `reviewPros[]`, `insight.*`) are translated at runtime by `localizeHotel()` in `lib/i18n/hotelTranslations.ts` using `HOTEL_TEXT_EN` (`en` & fallback for `zh`/`ru`/`ja`/`hi`) and `HOTEL_TEXT_VI` (`lib/i18n/hotelTextVi.ts` for `vi`).

#### (a) Complete `HotelItem` Sample from `data/khem_beach_hotels.json` (Includes Inline Multi-Language `summary_*` Fields)
```json
{
  "slug": "jw-marriott-phu-quoc-emerald-bay",
  "hotelId": "khem-jw-marriott",
  "name_ko": "JW 메리어트 푸꾸옥 에메랄드 베이 리조트 & 스파",
  "name_en": "JW Marriott Phu Quoc Emerald Bay Resort & Spa",
  "star": 5,
  "officialStar": 5,
  "area": "khem-beach",
  "order": 1,
  "tier": "recommended",
  "rating": 9.1,
  "reviewsCount": 1852,
  "subRatings": {
    "cleanliness": 9.3,
    "service": 9.4,
    "facilities": 9.3,
    "valueForMoney": 8.7,
    "location": 9.2
  },
  "cable_m": 14500,
  "address": "Khem Beach, An Thới, Phú Quốc, Kiên Giang 922280, Vietnam (바이켐 해변)",
  "landmarks": [
    {
      "name": "바이켐 프라이빗 비치",
      "distance": "도보 0분 (직결)"
    },
    {
      "name": "선셋타운 & 케이블카",
      "distance": "차량 약 10분 (약 6.5km)"
    },
    {
      "name": "푸꾸옥 감옥",
      "distance": "차량 7분 (5.5km)"
    },
    {
      "name": "안터이 항구",
      "distance": "차량 10분 (7.0km)"
    },
    {
      "name": "푸꾸옥 국제공항",
      "distance": "차량 22분 (19km)"
    }
  ],
  "summary": "선셋타운까지 차량 10분 거리. 빌 벤슬리가 디자인한 공간과 조개 모양 수영장, 전용 해변을 갖추고 있습니다. 평점과 후기는 아고다 기준입니다.",
  "summary_en": "10 min by car to Sunset Town. Bill Bensley design, Shell Pool, and direct private beach access. Ratings and reviews from Agoda.",
  "summary_zh": "至日落小镇车程约10分钟，比尔·本斯利设计，贝壳泳池直通私人海滩。评分与评价基于Agoda数据。",
  "summary_ja": "サンセットタウンまで車で約10分、ビル・ベンズリー設計、シェルプールとプライベートビーチ直結。評価・クチコミはAgoda基準。",
  "summary_ru": "10 мин на авто до Сансет Тауна, дизайн Билла Бенсли, бассейн Shell и собственный пляж. Оценки и отзывы по данным Agoda.",
  "summary_vi": "Khoảng 10 phút đi xe tới Sunset Town, thiết kế Bill Bensley, Shell Pool và bãi biển riêng. Đánh giá dựa trên dữ liệu Agoda.",
  "coreFacilities": [
    "전용 해변",
    "조개 모양 수영장을 포함한 수영장 3곳",
    "샹터렐 럭셔리 스파",
    "핑크 펄 파인다이닝",
    "피트니스 & 요가 파빌리온",
    "키즈클럽",
    "무료 Wi-Fi",
    "카약 & 수상스포츠",
    "24시간 룸서비스",
    "공항 셔틀 연결"
  ],
  "facilityCategories": [
    {
      "name": "수영장 & 비치",
      "items": [
        "바이켐 전용 프라이빗 비치",
        "Shell Pool (시그니처 조개풀)",
        "Sun Pool (성인 풀)",
        "Sand Pool (패밀리 풀)",
        "비치 카바나 & 썬베드",
        "카약·패들보드 장비 무료 대여"
      ]
    },
    {
      "name": "다이닝 & 바",
      "items": [
        "Pink Pearl (프렌치 파인다이닝)",
        "Tempus Fugit (올데이 인터내셔널 뷔페)",
        "Red Rum (해변 해산물 그릴)",
        "French & Co. (프랑스 베이커리 카페)",
        "Department of Chemistry Bar (화학 연구소 테마 칵테일 바)"
      ]
    },
    {
      "name": "스파 & 웰니스",
      "items": [
        "Chanterelle - Spa by JW",
        "사우나 & 스팀룸",
        "24시간 피트니스 센터",
        "해변 요가 클래스",
        "야외 러닝 트랙"
      ]
    },
    {
      "name": "투숙 편의",
      "items": [
        "24시간 버기 서비스",
        "컨시어지 & 리조트 액티비티 투어",
        "어린이 키즈클럽",
        "공항 픽업/샌딩(유료 사전예약)"
      ]
    }
  ],
  "checkIn": "15:00",
  "checkOut": "12:00",
  "builtYear": 2016,
  "floors": 3,
  "rooms": [
    {
      "name": "에메랄드 베이 뷰 룸 (킹/트윈)",
      "size": "53㎡",
      "bed": "킹 1개 또는 퀸 2개",
      "view": "바이켐 바다 / 가든뷰",
      "features": "발코니, 대리석 욕조, 전용 분리 샤워실, 고급 어메니티"
    },
    {
      "name": "디럭스 에메랄드 베이 프론트 룸",
      "size": "53㎡",
      "bed": "킹 1개 또는 퀸 2개",
      "view": "파노라마 오션뷰 (정면)",
      "features": "백사장 바로 앞 최상급 조망, 테라스 소파, 캡슐 커피머신"
    },
    {
      "name": "르 자르뎅 룸 (지상 정원 연결)",
      "size": "53㎡",
      "bed": "킹 1개",
      "view": "프라이빗 가든뷰",
      "features": "전용 야외 테라스 및 정원 직결, 야외 샤워 시설"
    },
    {
      "name": "터콰이즈 프레지덴셜 스위트",
      "size": "90㎡",
      "bed": "킹 1개",
      "view": "파노라마 오션뷰",
      "features": "독립된 거실과 침실, 초대형 테라스, 고급 다이닝 공간"
    },
    {
      "name": "1베드룸 / 2베드룸 풀빌라",
      "size": "180~450㎡",
      "bed": "킹 베드룸 + 트윈 베드룸",
      "view": "프라이빗 정원 / 오션뷰",
      "features": "단독 전용 야외 수영장, 버틀러 서비스, 프라이빗 다이닝 파빌리온"
    }
  ],
  "photos": [
    "/zones/khem-beach/images/jw-marriott-phu-quoc-emerald-bay/jw-marriott-overview.webp",
    "/zones/khem-beach/images/jw-marriott-phu-quoc-emerald-bay/jw-marriott-guestroom.webp",
    "/zones/khem-beach/images/jw-marriott-phu-quoc-emerald-bay/jw-marriott-pink-pearl.webp",
    "/zones/khem-beach/images/jw-marriott-phu-quoc-emerald-bay/jw-marriott-chanterelle-spa.webp"
  ],
  "agodaUrl": "https://www.agoda.com/jw-marriott-phu-quoc-emerald-bay-resort-spa/hotel/phu-quoc-island-vn.html",
  "priceRange": "$$$$$",
  "googleMapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJLZPWxLiWpzERwrkgfIa1P8I",
  "googleRating": 4.7,
  "googleReviewsCount": 3543,
  "reviewHighlight": "에메랄드빛 백사장과 독특한 빌 벤슬리 건축 디자인 · 다채로운 조식",
  "reviewPros": [
    "가상 대학 콘셉트의 독보적이고 감각적인 건축 및 인테리어",
    "고운 백사장과 파도가 잔잔한 바이켐 전용 해변 직결",
    "쉘 풀을 비롯한 3개의 넓고 쾌적한 야외 수영장",
    "정성스럽고 다채로운 인터내셔널 뷔페 조식과 수준 높은 서비스"
  ],
  "driveMinutesToSunsetTown": 10,
  "driveMinutesNote": "사장님 확인 2026-10-31",
  "agodaRawDescription": "바이켐 백사장에 위치한 메리어트 인터내셔널의 5성급 리조트입니다. 건축가 빌 벤슬리가 가상의 라마르크 대학교(Lamarck University) 콘셉트로 디자인하여 캠퍼스를 거니는 듯한 분위기를 제공합니다. 조개 모양의 쉘 풀을 포함한 3개의 야외 수영장, 핑크 펄 프렌치 레스토랑, 샹터렐 스파 바이 JW를 구비하고 있습니다.",
  "isFeatured": true
}
```

#### (b) Companion Editorial & Google Maps Override Entry in `data/hotel_insights.json` (Sample: `venice-hotel-phu-quoc`)
*(Note: `lib/hotels.ts` merges `hotel_insights.json[slug]` onto every `HotelItem`, and `insight.googleMapsUrl` **overrides** `hotel.googleMapsUrl` when present!)*
```json
{
  "venice-hotel-phu-quoc": {
    "location": "선 바바리아 펍(40m·도보 1분) · 시그니처 갤러리(260m·도보 3분) · 드래곤 계단(300m·도보 4분) · 시계탑(310m·도보 4분)",
    "view": "베니스 거리 풍경 및 바다 전망 발코니",
    "condition": "이탈리아 베니스 감성의 인테리어와 청결한 욕실",
    "staff": "세심한 고객 응대와 수하물 보관 지원",
    "pros": [
      "베니스 거리와 야시장 도보 이동 편리",
      "오션뷰 발코니 보유"
    ],
    "cons": [
      "골목 특성상 차량 진입 시 약간의 도보 이동 필요"
    ],
    "googleMapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJT1X9WkqVpzERe6nExGNSEYw",
    "location_en": "Sun Bavaria Pub (40 m · 1 min walk) · Signature Gallery (260 m · 3 min walk) · Dragon Staircase (300 m · 4 min walk) · Clock Tower (310 m · 4 min walk)"
  }
}
```
