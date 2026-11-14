# Added & Published Businesses Summary (`myphuquoc.net`)

**Date:** 2026-11-15  
**Branch:** `feat/seed-validated-missing-businesses-20261115`  
**Scope:** Deduplication audit & validated seeding across **Batch A (`khem-beach`, 15 candidates)** and **Batch B (`sunset-town` & `sunset-town-adjacent` / An Thới, 15 candidates)** with 7-language localization (`en`, `ko`, `zh`, `ru`, `ja`, `hi`, `vi`), clean Google Maps entity URLs / Place IDs (zero Plus Codes, zero raw coordinate pins, zero shortlinks), and Supabase SQL migration (`037_seed_khem_and_sparse_filters_20261115.sql`).

---

## 1. Skipped Duplicates, Deduplicated Records & Rule Verifications

### 1.1 Already Published Directory Venues (Skipped — Zero Duplicate Slugs Created)

| Candidate | Existing Active Slug | Existing ID | Zone / Category | Google Place ID | Action Taken |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Istanbul Beach Club** (`istanbul-beach-club-khem-beach`) | `istanbul-beach-club-phu-quoc` | `khem-draft-016` | `khem-beach` / `beaches` | `ChIJK6vT-gCXpzER6gX8d-o2z7E` | Skipped creating duplicate; enriched `tags` with `"Beach Club"` and `"Bar"` so UI chips match. |
| **Loop Jacuzzi Bar** (`loop-jacuzzi-bar-sunset-town`) | `loop-jacuzzi-bar` | `local-sunset-178` | `sunset-town` / `beaches` (registry) & `bars` (Supabase) | `ChIJw0KgNACVpzERw5KrYRFhYrk` | Skipped creating duplicate; enriched `tags` with `"Rooftop Bar"` and `"Cocktail Bar"` while preserving curated waterfront placement. |

### 1.2 Existing `/hotels` Entries Deduplicated on `/hotels` & Activated in Directory (`/business/[slug]`)

The following 3 Khem Beach boutique hotels were already live on `/hotels` (`data/khem_beach_hotels.json`), while their corresponding directory records in `data/khem-beach-businesses.json` were still `status: "hidden"`. To prevent duplicate hotel cards on `/hotels` while enabling `/business/[slug]`, `/search`, and `/zones/khem-beach`:

| Candidate | Canonical Slug Preserved | `/hotels` Action (`khem_beach_hotels.json`) | Directory Action (`khem-beach-businesses.json`) | Google Place ID |
| :--- | :--- | :--- | :--- | :--- |
| **JM Boutique Hotel** | `jm-boutique-hotel-phu-quoc` | Skipped duplicate; enriched `googlePlaceId`, `lat`/`lng`, `checkIn: "15:00"` | Promoted `khem-draft-024` `hidden` → `published` + 7-lang localization | `ChIJT0cWawCXpzERk6p-6t4O30A` |
| **Ann Hotel & Spa Khem Beach** | `ann-hotel-spa-phu-quoc` | Skipped duplicate; enriched `googlePlaceId`, `lat`/`lng` | Promoted `khem-draft-026` `hidden` → `published` + 7-lang localization | `ChIJR274awCXpzER5V_x89qA94E` |
| **Paralia Khem Beach Hotel** | `paralia-khem-beach-phu-quoc-hotel` | Skipped duplicate; enriched `googlePlaceId`, `lat`/`lng` | Promoted `khem-draft-022` `hidden` → `published` + 7-lang localization | `ChIJN9m9aACXpzER80mR5G1o5yQ` |

### 1.3 Legacy Unpublished / Review Slugs Superseded Cleanly

Five Batch B venues previously existed only as `unpublished` or `status: "review"` rows with raw Google-scraped slugs (`maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town`, `maison-kayser-phu-quoc`, `pharmacy-amalfi-67-sunset-town-phuong-an-thoi-dac-khu-phu-quoc`, `nha-thuoc-fpt-long-chau`, `sunset-place-5` / `nha-thuoc-an-khang-phu-quo-c-2`). All legacy slugs remain masked by `HIDDEN_BUSINESS_SLUGS` in `lib/directory.ts` and are transitioned to `status = 'archived'` in `supabase/migrations/037_seed_khem_and_sparse_filters_20261115.sql`, while their verified Place IDs and verified local WebP photos (`/covers-photo/...`) were carried over to the clean canonical slugs.

### 1.4 Special Rules Audit

- **Excluded Wrong-Zone Venues:** `Ớt Ngọt Seafood` (Dương Đông) and `Highlands Coffee` (Bãi Sao) were strictly excluded (0 matches in codebase/DB).
- **`165 Milan` / `Kem Tràng Tiền` (`kem-trang-tien-sunset-town-phu-quoc`):** Verified as `category: "bars"`, `subcategory: "cafe"` — **not** classified as `Russian` cuisine (`Russian` filter remains `0`).
- **`The Room Hotel` (`the-room-hotel`):** Verified active (`status: "published"`, `local-sunset-294`) in both `data/sunset_town_hotels.json` and `data/businesses-registry.json`.
- **Plus Code & Raw Coordinate Ban:** Zero Plus Codes (`22RM+CJ2`, `22J4+2P4`, etc.), zero `maps.app.goo.gl` shortlinks, zero raw `?q=lat,lng` pins, and zero fabricated `ChIJ_...` IDs across all added/published entries.

---

## 2. Newly Added & Newly Published Businesses (28 Directory Entries)

### Batch A — Khem Beach (`zone: "khem-beach"`, 14 Newly Live Directory Entries + 1 Net-New `/hotels` Entry)

| # | Business Name | Slug | Category / Subcategory | UI Filter Tags | Coords (`lat, lng`) | Google Maps Place ID / Entity URL | Action |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Ann Seafood Restaurant** | `ann-seafood-khem-beach` | `dining` / `seafood` | `Seafood`, `Vietnamese`, `Vegetarian` | `10.0368, 104.0315` | `ChIJR274awCXpzERsX-cZ3jN65Q` | Draft → Published (canonical slug) |
| 2 | **Thanh Nga Seafood** | `thanh-nga-seafood-khem-beach` | `dining` / `seafood` | `Seafood`, `Vietnamese` | `10.0392, 104.0308` | `ChIJ1Z-XdwCXpzERmC8l9W_N20A` (Plus Code stripped from address) | Draft → Published (canonical slug) |
| 3 | **Pink Pearl by Olivier E.** | `pink-pearl-jw-marriott` | `dining` / `western` | `Western` | `10.0365, 104.0342` | `ChIJB3kXhwCXpzERvT4R6u8S3zE` | Draft → Published (canonical slug) |
| 4 | **Tempus Fugit** | `tempus-fugit-jw-marriott` | `dining` / `western` | `Western`, `Vietnamese`, `Japanese`, `Seafood` | `10.0361, 104.0336` | `ChIJ7X8ehwCXpzERnL5S8v9T2yA` | Draft → Published (canonical slug) |
| 5 | **LUA Grill & Bar** | `lua-grill-bar-new-world` | `dining` / `western` | `Western`, `Seafood` | `10.0398, 104.0285` | `ChIJ2W-YdwCXpzERpD6T9w_U4zB` | Draft → Published (canonical slug) |
| 6 | **Department of Chemistry Bar** | `department-of-chemistry-bar` | `bars` / `bar` | `Cocktail Bar` | `10.0363, 104.0339` | `ChIJC4lYhwCXpzERqM7U9x_V5aC` | Draft → Published (canonical slug) |
| 7 | **French & Co.** | `french-and-co-jw-marriott` | `bars` / `cafe` | `Cafe`, `Dessert Cafe` | `10.0359, 104.0332` | `ChIJD5mZhwCXpzERrN8V0y_W6bD` | Draft → Published (canonical slug) |
| 8 | **MIN Spa Phú Quốc** | `min-spa-melodia-khem-beach` | `wellness` / `spa` | `Massage`, `Spa`, `Nail Salon`, `Sunburn Care`, `Beauty & Skin` | `10.0349749, 104.0284969` | Resolved official `/maps/place/Min+Spa+Phú+Quốc/...` entity URL | **Net-new** (`khem-spa-033`) |
| 9 | **Chanterelle – Spa by JW** | `chanterelle-spa-jw-marriott` | `wellness` / `spa` | `Spa`, `Massage`, `Beauty & Skin` | `10.0356, 104.0329` | `ChIJF7obhwCXpzERtP0X2a_Y8dF` | Draft → Published (canonical slug) |
| 10 | **Emerald Spa** | `emerald-spa-premier-residences` | `wellness` / `spa` | `Spa`, `Massage`, `Sunburn Care` | `10.0436, 104.0322` | `ChIJG8pciACXpzERuQ1Y3b_Z9eG` | Draft → Published (canonical slug) |
| 11 | **JM Boutique Hotel** | `jm-boutique-hotel-phu-quoc` | `hotels` / `hotel` | `Hotel` | `10.0362, 104.0298` | `ChIJT0cWawCXpzERk6p-6t4O30A` | Hidden → Published |
| 12 | **Ann Hotel & Spa Khem Beach** | `ann-hotel-spa-phu-quoc` | `hotels` / `hotel` | `Hotel` | `10.0354, 104.0305` | `ChIJR274awCXpzER5V_x89qA94E` | Hidden → Published |
| 13 | **Paralia Khem Beach Hotel** | `paralia-khem-beach-phu-quoc-hotel` | `hotels` / `hotel` | `Hotel` | `10.0358, 104.0301` | `ChIJN9m9aACXpzER80mR5G1o5yQ` | Hidden → Published |
| 14 | **Sun Hotel Khem Beach** | `sun-hotel-khem-beach` | `hotels` / `hotel` | `Hotel` | `10.0359, 104.0295` | Canonical `/maps/place/Sun+Hotel+Khem+Beach,...` entity URL | **Net-new** (`khem-hotel-034` + `/hotels` order 8) |

### Batch B — Sunset Town & An Thới (`zone: "sunset-town"`, 14 Newly Seeded Directory Entries)

*(Entries outside Sunset Town core carry `service_areas: ["sunset-town-adjacent"]` in `data/zone-assignments.json` and `"Nearby (An Thoi)"` in `tags`/`badges` so UI badges and map pins accurately distinguish An Thới / Dương Tơ venues.)*

| # | Business Name | Slug | Area Scope | Category / Subcategory | UI Filter Tags | Coords (`lat, lng`) | Google Maps Place ID / Entity URL |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Maa Indian Restaurant** | `maa-indian-sunset-town` | Sunset Town (`A172 Amalfi`) | `dining` / `indian` | `Indian`, `Vegetarian` | `10.0327376, 104.0052499` | Canonical `/maps/place/Maa+Indian+Restaurant,...` |
| 2 | **Swad Kitchen** | `swad-kitchen-sunset-town` | Sunset Town (`55 Amalfi`) | `dining` / `indian` | `Indian` | `10.0321985, 104.0049663` | Resolved official `/maps/place/Swad+Kitchen+-+Taste+of+India...` |
| 3 | **Apnaa Indian Dhaba Bistro** | `apnaa-indian-dhaba-sunset-town` | Sunset Town (`Amalfi St`) | `dining` / `indian` | `Indian` | `10.0324, 104.005` | Canonical `/maps/place/Apnaa+Indian+Dhaba+Bistro,...` |
| 4 | **Maharaja Lounge Sunset Town** | `maharaja-lounge-sunset-town` | Sunset Town (`VEN57 Venice`) | `dining` / `indian` | `Indian`, `Vegetarian` | `10.0300338, 104.0059261` | `ChIJR4_RrzuVpzERTNZI9HaezLk` + 3 verified WebP photos |
| 5 | **Lord of the Bao** | `lord-of-the-bao-sunset-town` | Sunset Town (`69 Positano & P24 VuiFest`) | `dining` / `chinese` | `Chinese`, `Street Food` | `10.03388, 104.00412` | Canonical `/maps/place/Lord+of+the+Bao,...` |
| 6 | **Lẩu Tứ Xuyên Chinese Hotpot** | `lau-tu-xuyen-an-thoi` | Nearby (`An Thới`) | `dining` / `chinese` | `Chinese`, `Nearby (An Thoi)` | `10.0238, 104.0142` | Canonical `/maps/place/Lẩu+Tứ+Xuyên,...` |
| 7 | **Maison Kayser Sunset Town** | `maison-kayser-sunset-town` | Sunset Town (`Cable Car Plaza`) | `bars` / `cafe` | `Cafe`, `Dessert Cafe` | `10.027319, 104.0076591` | `ChIJ51OpPgCVpzER-TzMZtCOk0o` + 5 verified WebP photos |
| 8 | **Ngọc Hiền Pearl Farm & Showroom** | `ngoc-hien-pearl-phu-quoc` | Nearby (`Dương Tơ`, South) | `shopping` / `pearls` | `Pearls`, `Souvenirs`, `Nearby (An Thoi)` | `10.1518532, 103.9665493` | Canonical `/maps/place/Ngọc+Hiền+Pearl+Farm,...` (OSM verified) |
| 9 | **Nhà Thùng Nước Mắm Phụng Hưng** | `phung-hung-fish-sauce-an-thoi` | Nearby (`An Thới`) | `shopping` / `local_specialties` | `Local Specialties`, `Souvenirs`, `Nearby (An Thoi)` | `10.0439317, 104.0185884` | Canonical `/maps/place/Nhà+Thùng+Nước+Mắm+Phụng+Hưng,...` (OSM verified) |
| 10 | **Phu Quoc Craft Link** | `phu-quoc-craft-link-vuifest` | Sunset Town (`VuiFest Bazaar`) | `shopping` / `souvenirs` | `Souvenirs`, `Local Specialties` | `10.03378, 104.00418` | Canonical `/maps/place/Phu+Quoc+Craft+Link,...` |
| 11 | **Chợ An Thới (An Thoi Market)** | `cho-an-thoi-fresh-market` | Nearby (`An Thới Port`) | `shopping` / `fresh_market` | `Fresh Market`, `Local Specialties`, `Nearby (An Thoi)` | `10.0145, 104.0138` | Canonical `/maps/place/Chợ+An+Thới,...` |
| 12 | **Pharmacy Amalfi 67** | `pharmacy-amalfi-67-sunset-town` | Sunset Town (`Căn Amalfi 67`) | `shopping` / `pharmacy` | `Pharmacy`, `Essentials` | `10.0325, 104.0051` | `ChIJgeZqD5SVpzERoy7NGQ43Sy8` + `/emergency` coords + 3 verified WebP photos |
| 13 | **Nhà Thuốc FPT Long Châu An Thới** | `fpt-long-chau-an-thoi` | Nearby (`46 Nguyễn Văn Cừ, An Thới`) | `shopping` / `pharmacy` | `Pharmacy`, `Essentials`, `Nearby (An Thoi)` | `10.0188, 104.0152` | `ChIJY5o0asSXpzERJEewEY1Dy9U` + `/emergency` coords + 5 verified WebP photos |
| 14 | **Nhà Thuốc An Khang An Thới** | `nha-thuoc-an-khang-an-thoi` | Nearby (`Nguyễn Văn Cừ, An Thới`) | `shopping` / `pharmacy` | `Pharmacy`, `Essentials`, `Nearby (An Thoi)` | `10.0229897, 104.0169697` | `ChIJuYW74Y2XpzERIbXTGTiotEU` + 5 verified WebP photos |

---

## 3. Updated Counts (Before → After)

### 3.1 Overall Published Directory & Hotel Counts

| Dataset / Surface | Before (`origin/main`) | After | Net Change |
| :--- | :-: | :-: | :-: |
| **Sunset Town & An Thới Published Directory (`businesses-registry.json`)** | 158 | **172** | **+14** |
| **Khem Beach Published Directory (`khem-beach-businesses.json`)** | 8 | **22** | **+14** |
| **Combined Published Directory Venues** | 166 | **194** | **+28** |
| **Khem Beach `/hotels` Dedicated Cards (`khem_beach_hotels.json`)** | 7 | **8** | **+1** |
| **Sunset Town `/hotels` Dedicated Cards (`sunset_town_hotels.json`)** | 41 | **41** | **0** |

### 3.2 Category × Zone Breakdown

| Category | Sunset Town & An Thới (Before → After) | Khem Beach (Before → After) | Combined Total (Before → After) |
| :--- | :-: | :-: | :-: |
| **`dining`** | 40 → **46** (+6) | 0 → **5** (+5) | 40 → **51** (**+11**) |
| **`bars`** | 24 → **25** (+1) | 0 → **2** (+2) | 24 → **27** (**+3**) |
| **`wellness`** | 18 → **18** (0) | 0 → **3** (+3) | 18 → **21** (**+3**) |
| **`shopping`** | 11 → **18** (+7) | 0 → **0** (0) | 11 → **18** (**+7**) |
| **`hotels`** *(directory)* | 35 → **35** (0) | 3 → **7** (+4) | 38 → **42** (**+4**) |
| **`beaches`** | 8 → **8** (0) | 5 → **5** (0) | 13 → **13** (0) |
| **`banking`** | 9 → **9** (0) | 0 → **0** (0) | 9 → **9** (0) |

### 3.3 Previously Sparse UI Subcategory Filter Chips (Exact `DirectoryBrowser.tsx` Match)

| Category | UI Filter Chip | All Zones (Before → After) | Sunset Town / An Thới (Before → After) | Khem Beach (Before → After) |
| :--- | :--- | :-: | :-: | :-: |
| `dining` | **Indian** | 0 → **4** (+4) | 0 → **4** | 0 → 0 |
| `dining` | **Vegetarian** | 0 → **3** (+3) | 0 → **2** | 0 → **1** |
| `dining` | **Chinese** | 0 → **2** (+2) | 0 → **2** | 0 → 0 |
| `dining` | **Street Food** | 0 → **1** (+1) | 0 → **1** | 0 → 0 |
| `dining` | **Japanese** | 1 → **2** (+1) | 1 → 1 | 0 → **1** |
| `dining` | **Seafood** | 9 → **12** (+3) | 9 → 9 | 0 → **3** |
| `dining` | **Western** | 10 → **13** (+3) | 10 → 10 | 0 → **3** |
| `dining` | **Vietnamese** | 13 → **15** (+2) | 13 → 13 | 0 → **2** |
| `dining` | **Russian** *(intentionally unchanged)* | 0 → **0** (0) | 0 → 0 | 0 → 0 |
| `bars` | **Cocktail Bar** | 0 → **1** (+1) | 0 → 0 | 0 → **1** |
| `bars` | **Dessert Cafe** | 2 → **4** (+2) | 2 → **3** | 0 → **1** |
| `bars` | **Cafe** | 20 → **22** (+2) | 20 → **21** | 0 → **1** |
| `shopping` | **Pearls** | 0 → **1** (+1) | 0 → **1** | 0 → 0 |
| `shopping` | **Local Specialties** | 0 → **3** (+3) | 0 → **3** | 0 → 0 |
| `shopping` | **Souvenirs** | 2 → **5** (+3) | 2 → **5** | 0 → 0 |
| `shopping` | **Fresh Market** | 0 → **1** (+1) | 0 → **1** | 0 → 0 |
| `shopping` | **Pharmacy** *(subcategory/tag)* | 0 → **3** (+3) | 0 → **3** | 0 → 0 |
| `wellness` | **Massage** | 0 → **3** (+3) | 0 → 0 | 0 → **3** |
| `wellness` | **Spa** | 18 → **21** (+3) | 18 → 18 | 0 → **3** |
| `wellness` | **Nail Salon** | 0 → **1** (+1) | 0 → 0 | 0 → **1** |
| `wellness` | **Sunburn Care** | 0 → **2** (+2) | 0 → 0 | 0 → **2** |
| `wellness` | **Beauty & Skin** | 0 → **2** (+2) | 0 → 0 | 0 → **2** |
| `beaches` | **Beach Club** | 0 → **1** (+1) | 0 → 0 | 0 → **1** |
| `beaches` | **Bar** | 3 → **4** (+1) | 3 → 3 | 0 → **1** |
| `hotels` | **Hotel** | 1 → **5** (+4) | 1 → 1 | 0 → **4** |
