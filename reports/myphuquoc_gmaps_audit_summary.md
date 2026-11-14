# `myphuquoc.net` 구글맵(Google Maps) 외부 링크 및 비즈니스 프로필 전수 감사 리포트

- **감사 기준일:** 2026-11-15
- **감사 대상:** `myphuquoc.net` 전체 디렉토리(`Dining`, `Bars`, `Hotels`, `Wellness`, `Shopping`, `Beaches`, `Activities`, `Banking/ATMs`, `Landmarks`, `Emergency`) 및 다국어 라우트(`/`, `/ko`, `/zh`, `/ru`, `/ja`, `/hi`, `/vi`)
- **산출물 로우 데이터:** [`reports/myphuquoc_gmaps_audit.csv`](../reports/myphuquoc_gmaps_audit.csv) (총 **430건**)

---

## 1. 감사 범위 및 전체 통계 요약 (Executive Summary)

### 1.1 데이터 소스 및 노출 경로 스캔 결과
로컬 코드베이스(`data/*.json`, `lib/*.ts`, `components/*.tsx`, `supabase/migrations/*.sql`)와 운영 Supabase REST API(`businesses` 테이블 278행, `stories` 테이블 3행)를 전수 스캔하여 실제 사용자 화면 및 SEO 구조화 데이터(JSON-LD)에 노출되는 모든 구글맵 링크를 추출했습니다.

- **다국어 경로 하드코딩 편차 점검:** 7개 로케일(`/`, `/ko`, `/zh`, `/ru`, `/ja`, `/hi`, `/vi`) 모두 `app/[locale]/...` 단일 라우트 트리와 공통 데이터 레지스트리를 공유하며, 특정 언어 페이지에만 별도로 하드코딩된 구글맵 URL 편차는 **0건**임을 확인했습니다.
- **추출 규모 총계:**
  - 사이트 내 공개/관리 대상 장소 섹션 엔티티: **244개** (통합 디렉토리 공개 업소 166개 + `/hotels` 48개 + `/directory/banking` 10개 + `/map` 랜드마크 12개 + `/emergency` 응급의료·약국 8개)
  - 사이트 노출 링크 매핑 레코드 총수: **430건** (동일 업소가 상세 페이지 기본 카드에서는 `buildGoogleMapsUrl()` 동적 링크를, 리뷰 카드·호텔 히어로·사진 출처·JSON-LD에서는 원시 `google_maps_url`을 각각 노출하는 이중 경로 포함)
  - 중복 제거 고유(Unique) Google Maps URL 수: **399개**

### 1.2 검증 단계(Audit Tier) 및 Google 봇 속도 제한(HTTP 429) 고지
Playwright 기반 Headless Chrome(`hl=en`, `gl=vn`, 동시성 4, 요청 간 랜덤 딜레이 적용)으로 399개 고유 URL을 순차 검증한 결과, **초반 124개 고유 URL(직접 매핑 140건)이 `HTTP 200`으로 최종 리다이렉트 및 DOM `<h1>`(상호명 패널) 추출까지 완료**되었으며, 125번째 URL부터 Google의 자동화 트래픽 차단 페이지(`https://www.google.com/sorry/index`, `HTTP 429` reCAPTCHA 게이트)가 작동했습니다.

보안·윤리 수칙에 따라 CAPTCHA 강제 우회 시도는 즉시 중단하고, 이미 확보된 `HTTP 200` 실측 캐시의 **`google_place_id` 및 64-bit `CID`(Protobuf Feature ID) 수학적 동치 매칭**과 **URL 구조/Protobuf 무결성 정적 분석**을 결합하여 430건 전체를 아래와 같이 분류했습니다.

| 검증 분류 (Audit Tier) | 건수 | 비율 | 설명 |
| :--- | ---: | ---: | :--- |
| **Tier 1. 직접 브라우저 실측 완료 (`HTTP 200`)** | **140건** | 32.6% | Playwright Chrome에서 최종 URL 리다이렉트, 패널 `<h1>` 상호명, 좌표, 영업상태 배지 직접 확인 완료 (고유 URL 124개) |
| **Tier 2. 동일 `Place_ID` / `CID` 실측 등가 검증** | **108건** | 25.1% | 개별 URL 변형 호출 시점엔 `429`가 반환되었으나, **동일한 `google_place_id` 또는 64-bit `CID`**가 Tier 1(`HTTP 200`)에서 이미 실측 검증 완료된 건 (**총 248건, 57.7% 실측 확정**) |
| **Tier 3. 구조적 단순 좌표 핀 확정 (`Coordinate_Only`)** | **13건** | 3.0% | `SunsetTownMap.tsx` 코드 버그로 생성된 순수 위경도 쿼리(`query=lat,lng`, 12건) 및 가짜 문자열 `place_id`로 인해 좌표 핀으로 폴백되는 링크(1건) |
| **Tier 4. 구조적 검색 목록 폴백 확정 (`Search_List`)** | **9건** | 2.1% | `google_place_id` 없이 상호 텍스트 검색(`/maps/search/?api=1&query=...`)만 수행하는 링크 (`/hotels` 6건, 상세 원시 링크 1건, `/emergency` 병원 2건) |
| **Tier 5. Google `HTTP 429` 차단으로 라이브 보류** | **160건** | 37.2% | 유효한 Google Protobuf `ChIJ...` `place_id` 또는 `cid=` 형식을 갖추었으나 `/sorry/index` 차단으로 패널 타이틀 실측이 보류된 건 (정적 좌표·형식 검증 완료, `/hotels` 불일치 고위험 3건 별도 색출) |
| **합계** | **430건** | **100.0%** | 전수 로우 데이터: `reports/myphuquoc_gmaps_audit.csv` |

### 1.3 상태별 통계 요약표

#### (A) 링크 유형(`link_type`) 분포
| `link_type` | 전체 (430건) | 실측 확정군 (Tier 1+2: 248건) | 구조 결함군 (Tier 3+4: 22건) | 429 보류군 (Tier 5: 160건) | 비고 |
| :--- | ---: | ---: | ---: | ---: | :--- |
| `Place_Profile` | **396건** | **236건** | 0건 | 160건* | *보류군 160건은 `place_id`/`cid` 기반 URL이나 라이브 미검증(`http_status=429`) |
| `Coordinate_Only` | **15건** | **2건** | **13건** | 0건 | `/map` 랜드마크 UI 12건 + `coastal-living` 손상 ID 1건 + `/emergency` 길찾기 2건 |
| `Search_List` | **15건** | **6건** | **9건** | 0건 | 랜드마크 정적 쿼리 6건(실측) + 호텔 7건 + 응급병원 2건 |
| `Plus_Code` | **0건** | **0건** | 0건 | 0건 | Plus Code 단독 노출 사례 없음 |
| `Broken` | **4건** | **4건** | 0건 | 0건 | `/hotels` 내 잘못된 `place_id`로 빈 지도(호치민시)로 튕기는 4건 |

#### (B) 상호명 일치(`name_match_status`), 영업 상태(`business_status`), 푸꾸옥 위치(`location_in_phuquoc`) 분포
| 평가 항목 | 상태값 | 전체 (430건) | 실측 확정군 (248건) | 주요 내역 |
| :--- | :--- | ---: | ---: | :--- |
| **상호명 매칭** | `Match` | 225건 | **225건** (90.7%) | 영문/한국어/베트남어 성조 제거 기준 동일 업체 일치 |
| | `Partial_Match` | 11건 | **11건** (4.4%) | 공식 등록명 일부 차이(`Sun Bavaria Restaurant` 등), 상위 호텔 공유(`CASEPiA`), 광역 핀(`Sunset Town`) |
| | `Mismatch` | 2건 | **2건** (0.8%) | **타 호텔 오매핑 1건(`Sunny Side Hotel`)**, 용의 계단 → `Sunset Town` 광역 핀 1건 |
| | `No_Name` | 192건 | **10건** (4.0%) | 실측 `Broken` 4건 + `Search_List` 6건 (나머지 182건은 좌표/검색 전용 또는 429 미수집) |
| **영업 상태** | `Open` | 238건 | **238건** (96.0%) | 정상 프로필 오픈 확인 (`Permanently/Temporarily closed` 배지 **0건**) |
| | `Closed_Suspected` | **0건** | **0건** (0.0%) | 실측 완료된 248건 중 폐업·임시휴업 배지 감지 건 없음 |
| | `Unknown` | 192건 | **10건** (4.0%) | 빈 지도(`Broken` 4건), 검색 목록(`Search_List` 6건), 429 보류 및 좌표 핀(182건) |
| **푸꾸옥 위치** | `True` | 425건 | **243건** (98.0%) | 푸꾸옥 위경도 범위(`Lat 9.90~10.45`, `Lng 103.80~104.10`) 정상 일치 |
| | `False` | **5건** | **5건** (2.0%) | `/hotels` 깨진 링크 **4건(호치민 `10.7905, 106.6893`)** + 개선문 검색 줌아웃 **1건(`103.7746`)** |

#### (C) 디렉토리/카테고리별 분포
| 카테고리 (`category`) | 총 링크 수 | `HTTP 200` 직접 실측 | `Place_Profile` | `Coordinate_Only` | `Search_List` | `Broken` | 핵심 이슈 요약 |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | :--- |
| `hotels` | 124건 | 44건 | 112건 | 1건 | 7건 | **4건** | **깨진 링크 4건, 타 업체 오매핑 1건, 가짜 ID 1건, 검색 전용 7건, PID 충돌 3건** |
| `dining` | 80건 | 23건 | 80건 | 0건 | 0건 | 0건 | `CASEPiA Kitchen & Lounge` 상위 호텔 프로필 공유(`Partial_Match`) 외 전건 양호 |
| `bars` | 48건 | 14건 | 48건 | 0건 | 0건 | 0건 | 실측 검증분 전건 정상 `Place_Profile` 매칭 |
| `wellness` | 36건 | 13건 | 36건 | 0건 | 0건 | 0건 | 실측 검증분 전건 정상 `Place_Profile` 매칭 |
| `banking` | 28건 | 6건 | 28건 | 0건 | 0건 | 0건 | 실측분 정상. 단, Supabase(`place_id`) ↔ 레지스트리(`cid`) 간 URL 포맷 불일치 9개소 |
| `activities` | 26건 | 6건 | 26건 | 0건 | 0건 | 0건 | 실측 검증분 전건 정상 `Place_Profile` 매칭 |
| `beaches` | 26건 | 6건 | 26건 | 0건 | 0건 | 0건 | `Sun Bavaria GastroPub` → 구글맵 `Sun Bavaria Restaurant` 표기 차이(`Partial_Match`) |
| `landmarks` | 24건 | 12건 | 6건 | **12건** | **6건** | 0건 | **`/map` UI 12건 전수 좌표 핀 버그**, 정적 URL 6건 검색 목록 + 2건 광역 핀 |
| `shopping` | 22건 | 5건 | 22건 | 0건 | 0건 | 0건 | 실측 검증분 전건 정상 (비표준 셀 ID 1건 수동 확인 권고) |
| `emergency` | 16건 | 11건 | 12건 | **2건** | **2건** | 0건 | 북부·즈엉동 참조 병원 2개소 `placeId` 빈값으로 검색창/좌표 길찾기 사용 중 |

---

## 2. 즉시 수정 필요 항목 (Critical)

### 2.1 [Critical] 깨진 `place_id`로 인해 빈 지도(호치민시 `10.7905, 106.6893`)로 튕기는 호텔 링크 — 4건
`/hotels` 페이지 데이터(`data/sunset_town_hotels.json` 및 `data/hotel_insights.json` 오버라이드)에 수록된 아래 4개 호텔의 `place_id`는 유효하지 않은 식별자로, 클릭 시 업체 정보창(`<h1>`)이 전혀 뜨지 않고 `https://www.google.com/maps/place//@10.7905024,106.6893312,12z`(**베트남 호치민시 상공 빈 지도**, `location_in_phuquoc = False`)로 튕기는 것이 Headless Chrome `HTTP 200` 실측으로 확인되었습니다.

특히 프로젝트 내 통합 마스터인 `data/businesses-registry.json`에는 이미 해당 호텔들의 **정상 작동하는 실제 `google_place_id`가 존재**(3건은 본 감사에서 `HTTP 200` 정상 프로필 노출까지 실측 완료)하므로 즉시 교체가 가능합니다.

| `id_or_slug` | 사이트 업체명 | 현재 잘못된 URL (`Broken`) | 교체할 정상 Google Maps Place URL (`businesses-registry.json` 검증) |
| :--- | :--- | :--- | :--- |
| `hotels/noska-hotel` | NOSKA Hotel (노스카 호텔 선셋타운) | `https://www.google.com/maps/place/?q=place_id:ChIJF_c9aMCXpzERt1r0W687Y4U` | `https://www.google.com/maps/place/?q=place_id:ChIJ9SwzZzeVpzERAz84CLvBLh8` *(실측 200: `NOSKA Hotel`, `10.03017, 104.00609`)* |
| `hotels/fella-hotel` | FELLA HOTEL (펠라 호텔 선셋타운) | `https://www.google.com/maps/place/?q=place_id:ChIJ11j5_KeXpzERFq08eB1nJt4` | `https://www.google.com/maps/place/?q=place_id:ChIJjZ-YVl6XpzERBev66-X35uQ` *(레지스트리 `fella-hotel` 등록 PID)* |
| `hotels/golden-sunset-hotel` | Golden Sunset Hotel (골든 선셋 호텔) | `https://www.google.com/maps/place/?q=place_id:ChIJN3vR_L6VpzER4o1cI_K00e8` | `https://www.google.com/maps/place/?q=place_id:ChIJLYZRqS2VpzERBkJetwNxgg8` *(실측 200: `Golden Sunset Hotel`, `10.03059, 104.00614`)* |
| `hotels/js-hotel-phu-quoc-sunset-town` | JS Hotel Phu Quoc Sunset Town (JS 호텔 푸꾸옥 선셋타운) | `https://www.google.com/maps/place/?q=place_id:ChIJ92fL7_KVpzERx5f4P9A2j8k` | `https://www.google.com/maps/place/?q=place_id:ChIJRSic4YOXpzERfVMlKoCM9v8` *(실측 200: `JS Hotel Phu Quoc Sunset Town`, `10.03179, 104.00601`)* |

---

### 2.2 [Critical] 전혀 다른 호텔로 잘못 연결된 오매핑(`Mismatch`) — 1건
- **대상:** `hotels/sunny-hotel` — **Sunny Hotel (써니 호텔)** (선셋타운 중심부 Venice 18 위치)
- **현재 URL:** `https://www.google.com/maps/place/?q=place_id:ChIJPxfJfpeXpzERMNfR5dHAXJE`
- **실측 결과 (`HTTP 200`):** 선셋타운 베니스 거리가 아닌 북동쪽 외곽(`10.0382859, 104.0093969`, 약 900m 거리)의 별개 업체인 **`Sunny Side Hotel Phú Quốc`** 프로필로 연결됩니다. (`businesses-registry.json`에 `draft` 상태로 보관된 `sunny-side-hotel-phu-quoc`의 `place_id`가 잘못 혼입된 것이 원인입니다.)
- **교체할 정상 URL:** `https://www.google.com/maps/place/?q=place_id:ChIJJyvaIBKXpzERPWxGoWlnWoc`
  - 본 감사 `HTTP 200` 실측 완료: **`Sunny Hotel Phu Quoc- Ven 18 Sunset Town`** (`10.03049, 104.005862`, 정확히 일치).

---

### 2.3 [Critical] 손상된 가짜 `google_place_id` 문자열 입력으로 인한 좌표 핀 폴백 — 1건 (+ 비공개 1건 참고)
- **대상:** `coastal-living-hotel-phu-quoc` — **코스탈 리빙 호텔 푸꾸옥 (Coastal Living Hotel Phu Quoc)** (`data/businesses-registry.json` 및 Supabase `businesses`)
- **원인:** `"google_place_id": "ChIJ_coastal_living_phuquoc"`이라는 임의 작성된 가짜 플레이스홀더 문자열이 저장되어 있습니다(실제 Google Protobuf 디코딩 시 11번째 바이트가 `0x11`이 아닌 `0xaf`로 깨지는 비유효 ID).
- **영향:** `lib/mapsLink.ts`가 `https://www.google.com/maps/search/?api=1&query=10.02685,104.00812&query_place_id=ChIJ_coastal_living_phuquoc`을 생성하면서 구글맵이 잘못된 `query_place_id`를 무시하고 앞단의 숫자 좌표(`query=10.02685,104.00812`)만 표시하여 **업체명 없는 단순 좌표 핀(`Coordinate_Only`)**으로 폴백됩니다.
- **조치 방안:** 구글맵에서 실제 비즈니스 프로필 등록 여부를 확인하여 정식 `ChIJ...` `google_place_id`로 교체하거나, 미등록 신규 숙소일 경우 가짜 `google_place_id` 필드를 `null`로 비워 `lib/mapsLink.ts`가 최소한 상호명(`Coastal Living Hotel Phu Quoc Sunset Town`)으로 검색하도록 정리해야 합니다.
- *(참고)* 비공개(`status: "unpublished"`) 항목인 `sun-group-sunset-town-electric-buggy-service`에도 `"google_place_id": "buggy_service_sunset_town"` 비표준 문자열이 들어 있으므로 향후 공개 전환 전 `null` 처리 권장합니다.

---

### 2.4 [Critical] 검색 쿼리 모호성으로 인한 푸꾸옥 경도 범위 이탈(`location_in_phuquoc = False`) — 1건
- **대상:** `landmark/arc-de-triomphe [jsonld-static]` — **Arc de Triomphe Sunset Gate (선셋 개선문)** (`lib/sunsetMapData.ts`)
- **현재 URL:** `https://maps.google.com/?q=Arc+de+Triomphe+Sunset+Town+Phu+Quoc`
- **실측 결과 (`HTTP 200`):** 단일 랜드마크 프로필이 열리지 않고 5개 검색 결과 리스트(`Search_List`)가 뜨면서 지도 중심이 `@10.142017,103.7746148,11z`(푸꾸옥 서쪽 해상, 기준 경도 `103.80` 미만)로 크게 줌아웃됩니다.
- **조치 방안:** 아래 3.1절의 랜드마크 고유 `place_id` 매핑 가이드를 적용하여 고정 비즈니스 프로필로 전환해야 합니다.

---

### 2.5 [Critical 의심 / 선제 교체 강력 권고] `/hotels` ↔ `businesses-registry.json` 간 `Place_ID` 충돌 호텔 — 3건
위 2.1절에서 호치민 빈 지도로 판명된 4개 호텔과 **동일한 파일(`data/sunset_town_hotels.json`, `data/hotel_insights.json`)에서 똑같은 패턴으로 `businesses-registry.json`의 검증된 `place_id`와 충돌**하는 호텔 3건입니다. 일괄 크롤링 후반부에 위치해 `/hotels` 측 URL은 `HTTP 429`를 받았으나, 대조군인 `businesses-registry.json` 측 `place_id` 2건은 이미 `HTTP 200`으로 실측 검증이 완료되었으므로 함께 교체하는 것이 안전합니다.

| `id_or_slug` | 사이트 업체명 | 현재 `/hotels` 측 미검증/충돌 PID | `businesses-registry.json` 측 검증 완료 교체 권장 URL |
| :--- | :--- | :--- | :--- |
| `hotels/sole-casa-phu-quoc` | Sole Casa Phu Quoc (솔레 카사 푸꾸옥) | `ChIJq2r4s86VpzER3e5p9a8K5jY` *(429 보류, 충돌)* | `https://www.google.com/maps/place/?q=place_id:ChIJCzU1h7OXpzER6BRzBKSqRks` *(실측 200: `Sole Casa Phu Quoc`, `10.02906, 104.00981`)* |
| `hotels/casa-del-mar-boutique-hotel` | Casa Del Mar Boutique Hotel (카사 델 마르 부티크 호텔) | `ChIJz_xV0ceVpzERL_Q5j7K_c4E` *(429 보류, 충돌)* | `https://www.google.com/maps/place/?q=place_id:ChIJL0J55ZiXpzERbAGmlh0s12I` *(실측 200: `CASA DEL MAR BOUTIQUE HOTEL`, `10.03075, 104.00729`)* |
| `hotels/hoang-hon-hotel` | Hoang Hon Hotel (호앙 혼 호텔) | `ChIJufI0FqCVpzER1FiJropT03Y` *(429 보류, 충돌)* | `https://www.google.com/maps/place/?q=place_id:ChIJe4CLfRKXpzERL0ZvGC778Bk` *(`hoa-ng-hon-ti-m-boutique-hotel` 대조 확인 후 적용)* |

---

### 2.6 폐업(`Permanently closed`) / 임시휴업(`Temporarily closed`) 점검 결과
- 실측 검증이 완료된 **248건(고유 영업 프로필 기준)** 전수 검사에서 `Permanently closed` 또는 `Temporarily closed` 배지가 감지된 매장은 **0건**입니다.
- 단, `HTTP 429`로 라이브 DOM 확인이 보류된 160건 중 푸꾸옥 일반 S2 셀 접미사(`pzER`)가 아닌 비표준 셀 접미사를 가진 2개 매장(`muoi-mini-mart-sunset-town`: `ChIJZxIdKxnB9WYR0OpNKEcReFQ`, `phu-quoc-sunset-town-coffee-workshop-specialty-coffee-phin-vietnamese-coffee-egg-coffee`: `ChIJy_hxHgCrNTERoIcGv_opdSI` — 참고로 동일 비표준 유형인 `Miss Tiên Spa`, `LUMI SPA 2`, `Sunset Bazaar`는 실측 200에서 모두 정상 푸꾸옥 매장으로 확인됨)은 속도 제한 해제 후 수동 클릭 확인을 권장합니다.

---

## 3. 개선 필요 항목 (Warning) 및 정확한 Place 링크 교체 방안

### 3.1 [Warning] `/map` 인터랙티브 지도 랜드마크 12개 전수 `Coordinate_Only` 노출 및 정적 URL `Search_List` 폴백
선셋타운 지도 페이지(`/map`)의 12개 핵심 랜드마크는 **이중 결함**을 겪고 있습니다.
1. **실제 UI 클릭 링크(`components/SunsetTownMap.tsx:492`):** 모든 랜드마크에 `lat`, `lng`가 존재하기 때문에 `lm.lat && lm.lng ? 'https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}' : lm.googleMapsUrl` 로직이 정적 URL을 무조건 덮어써서 **12개 전수 업체명 없는 위경도 좌표 핀(`10°01'37.5"N 104°00'17.6"E`, `Coordinate_Only`)**만 표시됩니다.
2. **정적 데이터(`lib/sunsetMapData.ts` → JSON-LD 노출):** 12개 모두 `place_id` 없이 `https://maps.google.com/?q=...` 텍스트 검색만 사용하고 있어, `HTTP 200` 실측 결과 **6건이 다중 검색 결과 목록(`Search_List`)**, **2건이 개별 명소가 아닌 광역 `Sunset Town` 핀**으로 연결되었습니다.

아래 표와 같이 `businesses-registry.json` 및 마스터 DB에서 확인된 정확한 `google_place_id`로 교체해야 합니다.

| 랜드마크 ID (`lib/sunsetMapData.ts`) | 명칭 | 현재 UI 상태 / 정적 URL 실측 결과 | 교체할 검증된 Google Maps Place URL (`googlePlaceId`) |
| :--- | :--- | :--- | :--- |
| `kiss-bridge` | Kiss Bridge (키스 브릿지) | UI: `Coordinate_Only` / 정적: 텍스트 쿼리(`Kiss Bridge`) | `https://www.google.com/maps/place/?q=place_id:ChIJG-HZ4ZaRpzERhjtO1_1kObg` *(실측 200 검증)* |
| `kiss-of-the-sea` | Kiss of the Sea Theater (키스 오브 더 씨 극장) | UI: `Coordinate_Only` / 정적: 텍스트 쿼리(`Kiss of the Sea show`) | `https://www.google.com/maps/place/?q=place_id:ChIJtSQ7ywmVpzERvzagy4sWZus` *(실측 200 검증)* |
| `clock-tower` | Central Clock Tower (센트럴 75m 시계탑) | UI: `Coordinate_Only` / 정적: **`Search_List` (결과 5개)** | `https://www.google.com/maps/place/?q=place_id:ChIJGz2yTr6XpzERw3f-8LpV0PM` *(실측 200: `Tháp Đồng Hồ`)* |
| `cable-car-station` | Hon Thom Cable Car Station (혼똔섬 케이블카 역) | UI: `Coordinate_Only` / 정적: **`Search_List` (결과 2개)** | `https://www.google.com/maps/place/?q=place_id:ChIJvxdKNoKWpzERAWSyG5rABsg` *(`sunworld-hon-thom...` 등록 PID)* |
| `vuifest-bazaar` | Vui-Fest Night Market Bazaar (부이페스트 야시장) | UI: `Coordinate_Only` / 정적: **`Search_List` (결과 6개)** | `https://www.google.com/maps/place/?q=place_id:ChIJe-XGILOVpzERFUpU0tLXMoY` *(`cho-dem-vui-fest-bazaar-sunset-town` 등록 PID)* |
| `sun-signature-gallery` | Sun Signature Gallery (썬 시그니처 갤러리) | UI: `Coordinate_Only` / 정적: 텍스트 쿼리(`Sun Signature Gallery`) | `https://www.google.com/maps/place/?q=place_id:ChIJb5dRi2aVpzER5yka1zrbkLM` *(실측 200 검증)* |
| `sunset-beach` | Sunset Beach (선셋 비치) | UI: `Coordinate_Only` / 정적: **`Sunset Town` 광역 핀 (`Partial_Match`)** | `https://www.google.com/maps/place/?q=place_id:ChIJZXM2cdOVpzERTz6J6CvWVwg` *(`Bãi biển Thị trấn Hoàng Hôn` 등록 PID)* |
| `pompeii-ruins` | Pompeii Ruins (폼페이 유적 & 스페인 계단) | UI: `Coordinate_Only` / 정적: 텍스트 쿼리(`Cột Đá Cổ Pompeii`) | `https://www.google.com/maps/place/?q=place_id:ChIJR1rvoz6XpzERak7X8IIpK7Q` *(실측 200 검증)* |
| `dragon-staircase` | Dragon Staircase (용의 계단) | UI: `Coordinate_Only` / 정적: **`Sunset Town` 광역 핀 (`Mismatch`)** | `https://www.google.com/maps/place/?q=place_id:ChIJlxCWdMWXpzER1uHLQ3OpVkI` *(`Thang Rồng` 마스터DB·레지스트리 PID)* |
| `king-sun-fountain` | Fontana Dei Giorni (태양신의 분수) | UI: `Coordinate_Only` / 정적: **`Search_List` (결과 5개)** | 구글맵에서 `Tháp Mặt Trời / Quảng trường La Mã` 또는 `Sun Signature Gallery`(`ChIJb5dRi2aVpzER5yka1zrbkLM` 전면 광장) 공식 핀 채집 후 `googlePlaceId` 부여 권장 |
| `arc-de-triomphe` | Arc de Triomphe Sunset Gate (선셋 개선문) | UI: `Coordinate_Only` / 정적: **`Search_List` + 경도 이탈 (`103.7746`)** | 구글맵에서 `Khải Hoàn Môn Thị Trấn Hoàng Hôn`(`Gondola` 구역) 공식 Place ID 채집 후 고정 바인딩 필요 |
| `marina-pier` | Sunset Marina Yacht Pier (선셋 마리나 선착장) | UI: `Coordinate_Only` / 정적: **`Search_List` (결과 9개)** | 구글맵에서 `Cầu cảng Thị Trấn Hoàng Hôn` / `Bến du thuyền` 공식 Place ID 채집(미등록 시설일 경우 UI 배지로 명시) 권장 |

---

### 3.2 [Warning] `google_place_id` 없이 검색 쿼리(`Search_List`)로만 연결된 상업 매장 및 의료기관 — 8개소(11건)

#### (A) `/hotels` 디렉토리 내 검색 쿼리 의존 호텔 6개소 (7건)
`data/sunset_town_hotels.json` 및 `data/hotel_insights.json`에서 `place_id` 없이 `https://www.google.com/maps/search/?api=1&query=...` 형태만 사용하는 상업 숙소 목록입니다. 구글맵 언어/계정 환경에 따라 검색 결과 목록이 여러 개 노출되거나 인근 타 호텔이 선택될 위험이 있으므로 Google Places API(Find Place) 또는 수동 검색으로 고유 `ChIJ...` `googlePlaceId`를 채집하여 바인딩해야 합니다.

1. `hotels/coastal-living-hotel-phu-quoc` 및 `coastal-living-hotel-phu-quoc [detail-raw-link]` (`query=Coastal+Living+Hotel+Phu+Quoc`)
2. `hotels/kl-hotel-phu-quoc` (`query=KL+Hotel+Sunset+Town+Phu+Quoc`)
3. `hotels/palo-santo-hotel-phu-quoc` (`query=Palo+Santo+Hotel+Sunset+Town+Phu+Quoc`)
4. `hotels/catarina-hotel-phu-quoc` (`query=Catarina+Hotel+Sunset+Town+Phu+Quoc`)
5. `hotels/solaro-hotel-spa-h84816481` (`query=Solaro+Hotel+Spa+Sunset+Town+Phu+Quoc`)
6. `hotels/anna-hotel-free-cable-car-and-water-park-tickets` (`query=Anna+Hotel+Sunset+Town+Phu+Quoc`)

#### (B) `/emergency` 응급 안내 페이지 내 주요 병원 2개소 (4건)
`lib/emergencyFacilities.ts`의 `REFERENCE_MAJOR_HOSPITALS` 2개 병원은 `placeId: ""` 빈 문자열 상태여서 기본 링크는 검색 쿼리(`Search_List` 2건), 길찾기 링크는 `destination_place_id` 없는 좌표 목적지(`Coordinate_Only` 2건)로 구성되어 있습니다. 응급 상황 시 정확한 병원 프로필·응급실 전화번호 패널이 즉시 열리도록 두 병원의 공식 `placeId`를 채워 넣어야 합니다.
1. `emergency/phu-quoc-medical-center` — `Trung tâm Y tế thành phố Phú Quốc` (즈엉동 공공병원, `10.2150242, 103.96767`)
2. `emergency/vinmec-phu-quoc` — `Bệnh viện Đa khoa Quốc tế Vinmec Phú Quốc` (북부 바이자이 국제병원, `10.3363672, 103.8568577`)

---

### 3.3 [Warning] 기타 정합성 및 표준화 개선 항목
1. **단축 URL(`maps.app.goo.gl`) 직접 노출 1건 정규화:**
   - `hotels/the-room-hotel`이 `https://maps.app.goo.gl/kDva8BBXaBeUxBvi8` 단축 링크를 사용 중입니다(`HTTP 200` 실측 시 정상 프로필 도달 확인). 불필요한 리다이렉트 지연을 줄이고 데이터 일관성을 확보하기 위해 `businesses-registry.json`(`the-room-hotel-starbucks-fireworks`)의 정규 ID인 `https://www.google.com/maps/place/?q=place_id:ChIJazttI-mVpzER0S79ZGkYs78`로 통일을 권장합니다.
2. **상호 부분 일치(`Partial_Match`) 확인 매장:**
   - `sun-bavaria-gastropub`: 사이트 영문명은 `Sun Bavaria GastroPub`이나 구글맵 현재 표시명은 `Sun Bavaria Restaurant`로 등록되어 있습니다(좌표·매장 일치).
   - `casepia-kitchen-and-lounge`: 개별 레스토랑 프로필 대신 입점 건물인 `CASEPiA` 호텔 프로필(`ChIJRxYLYomXpzERCi3mFgoiNp4`)을 공유 중입니다. 구글맵 내 별도 식음료 업장 프로필이 개설되어 있다면 분리하고, 미개설 시 현행 유지가 타당합니다.
3. **Banking 9개소의 Supabase DB ↔ 로컬 레지스트리 URL 드리프트:**
   - `supabase/migrations/032_banking_reorganization_20261102.sql` 및 `businesses-registry.json`은 9개 환전소·ATM의 `google_maps_url`을 `https://www.google.com/maps?cid=...`로 변경했으나, 운영 Supabase `businesses` 테이블에는 여전히 이전 `https://www.google.com/maps/place/?q=place_id:...`가 남아 있습니다. Protobuf 역산 검증 결과 두 식별자(64-bit `CID`와 `Place_ID`)는 수학적으로 **100% 동일한 구글 비즈니스 프로필**을 가리켜 사용자 오연결은 없으나, 아래 코드 리팩토링을 통해 단일 표준 URL로 일원화하는 것이 바람직합니다.

---

## 4. 코드 레벨 개선 제안 (Refactoring Guide)

현재 프로덕션 코드는 지침에 따라 수정하지 않았으며, 향후 후속 작업(PR)에서 아래 4가지 리팩토링을 적용하면 좌표 핀 폴백과 데이터 소스 간 불일치를 구조적으로 제거할 수 있습니다.

### 제안 1. `components/SunsetTownMap.tsx` — 좌표 강제 오버라이드 제거 및 `googlePlaceId` 우선 사용
현재 `SunsetTownMap.tsx:490-493`은 `lat`, `lng`가 있으면 무조건 정적 URL을 무시하고 좌표 핀 URL을 생성합니다. `MapLandmark` 인터페이스(`lib/sunsetMapData.ts`)에 `googlePlaceId?: string`을 추가하고 `buildGoogleMapsUrl`을 우선 호출하도록 변경합니다.

```tsx
// [Before] components/SunsetTownMap.tsx (Lines 490-493)
const mapUrl =
  lm.lat && lm.lng
    ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}`
    : lm.googleMapsUrl

// [After] 검증된 googlePlaceId -> googleMapsUrl -> 좌표 순으로 우선순위 역전
const mapUrl = lm.googlePlaceId
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lm.name.en} Sunset Town Phu Quoc`)}&query_place_id=${lm.googlePlaceId}`
  : lm.googleMapsUrl ||
    (lm.lat && lm.lng ? `https://www.google.com/maps/search/?api=1&query=${lm.lat},${lm.lng}` : '#')
```

### 제안 2. `lib/mapsLink.ts` — `Place_ID` 형식 검증 및 `query` 파라미터 상호명 폴백 안전장치 적용
현재 `lib/mapsLink.ts:35-37`은 `hasCoords && placeId`일 때 `query=${b.lat},${b.lng}&query_place_id=${placeId}`를 생성합니다. 이 구조는 `placeId`가 만료·통폐합되거나 `ChIJ_coastal_living_phuquoc`처럼 잘못 입력되었을 때 **업체명이 전혀 없는 순수 좌표 핀(`Coordinate_Only`)으로 떨어지는 치명적 단점**이 있습니다. Google 공식 Maps URLs 명세에 맞춰 `query`에 **상호명 + 권역 힌트**를 넣고 `&query_place_id=${placeId}`를 함께 전달하면, 유효한 `placeId`일 때는 동일하게 정확한 비즈니스 프로필이 열리고, `placeId` 장애 시에도 상호명 검색으로 우아하게 폴백됩니다.

```ts
// [After] lib/mapsLink.ts 개선안
const VALID_PLACE_ID_RE = /^(ChIJ|GhIJ|Eh)[A-Za-z0-9_-]{15,}$/;

function sanitizePlaceId(id?: string | null): string | null {
  const trimmed = id?.trim();
  return trimmed && VALID_PLACE_ID_RE.test(trimmed) ? trimmed : null;
}

export function buildGoogleMapsUrl(b: MapsLinkInput): string | null {
  const placeId = sanitizePlaceId(b.google_place_id) || sanitizePlaceId(extractPlaceId(b.google_maps_url));
  const name = (b.google_maps_name || b.public_name || '').trim();
  const hasCoords =
    typeof b.lat === 'number' && typeof b.lng === 'number' && b.lat !== 0 && b.lng !== 0;

  // 1순위: 유효한 placeId가 있으면 상호명(없을 때만 좌표)을 query로, placeId를 query_place_id로 전달
  if (placeId) {
    const fallbackQuery = name
      ? encodeURIComponent(`${name} ${areaHint(b.address)}`)
      : hasCoords
        ? `${b.lat},${b.lng}`
        : encodeURIComponent('Phu Quoc');
    return `https://www.google.com/maps/search/?api=1&query=${fallbackQuery}&query_place_id=${placeId}`;
  }

  // 2순위: 검증된 외부 google_maps_url(cid= 링크 등) 우선 활용
  if (b.google_maps_url && (b.google_maps_url.includes('cid=') || b.google_maps_url.includes('/maps/place/'))) {
    return b.google_maps_url;
  }

  // 3순위: 상호명 검색 -> 최후 순위: 좌표
  if (name) {
    const query = encodeURIComponent(`${name} ${areaHint(b.address)}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }
  if (hasCoords) {
    return `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`;
  }
  return null;
}
```

### 제안 3. `lib/routes/BusinessRoute.tsx` 및 `lib/seo/businessJsonld.ts` — 원시 `b.google_maps_url` 직결 제거
상세 페이지(`BusinessRoute.tsx`) 내 `PracticalInfoCard`는 `buildGoogleMapsUrl(b)`를 쓰지만, **호텔 히어로 버튼(`line 671`), `GoogleReviewAnalysisCard`(`line 898`), 사진 출처 링크(`lines 429, 495`), 그리고 `businessJsonld.ts`(`line 87`)**는 원시 `b.google_maps_url`을 직접 렌더링하고 있습니다. 또한 `regItem` 병합 로직(`lines 133-164, 275-306`)에서 `google_maps_url` 필드가 누락되어 Supabase의 구형 URL이 그대로 남습니다.
- **개선:** `regItem` 병합 시 `google_maps_url: regItem.google_maps_url ?? data.google_maps_url`을 포함하고, 모든 외부 지도 버튼 및 JSON-LD `hasMap`이 `buildGoogleMapsUrl(b)` 단일 함수를 거치도록 통일합니다.

### 제안 4. `lib/hotels.ts` — `businesses-registry.json`의 검증된 `google_place_id`를 Single Source of Truth로 연동
현재 `lib/hotels.ts:222`는 `insight?.googleMapsUrl || raw.googleMapsUrl`을 사용하여 `data/hotel_insights.json`의 오래되거나 잘못 채집된 `place_id`가 `businesses-registry.json`의 검증된 `google_place_id`를 무시하게 만듭니다. 슬러그(또는 Agoda 호텔 ID) 매칭을 통해 `businesses-registry.json`에 유효한 `google_place_id`가 존재할 경우 이를 최우선으로 사용해 `buildGoogleMapsUrl()`을 생성하도록 일원화하면 이번 감사에서 적발된 `/hotels` 전용 깨진 링크 4건·오매핑 1건·충돌 3건의 재발을 원천 차단할 수 있습니다.
