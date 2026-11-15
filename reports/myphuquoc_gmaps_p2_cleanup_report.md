# Google Places API 미사용 로컬 Chrome CDP 기반 P2 전수 검증 및 데이터 표준화 리포트

- **작성일:** 2026-11-15
- **작업 브랜치:** `fix/gmaps-p2-cdp-cleanup` (`origin/main` 최신 커밋 `4d63284` 기반 분기)
- **확정 감사 마스터 CSV:** `reports/myphuquoc_gmaps_p2_verified.csv` (430개 노출 링크 전수)
- **신규 Supabase 마이그레이션:** `supabase/migrations/038_fix_gmaps_p2_standardization_20261115.sql`

---

## 1. 최종 커버리지 및 핵심 지표 요약 (Executive Summary)

베트남 현지 네트워크 환경에서 **Google Places API 키 호출을 일절 사용하지 않고**, macOS 로컬 실제 Google Chrome(`--remote-debugging-port=9222`)에 CDP로 직렬 연결(`Concurrency=1`, 요청 간 `4.0~6.8초` 랜덤 딜레이, 이미지·폰트·지도 타일 차단)하여 PR #116 당시 `HTTP 429`로 보류되었던 290개 행(고유 미검증 대상 전체) 및 `Search_List` 의존 항목을 전수 실측 검증했습니다.

| 검증 지표 | PR #116 초기 감사 | P2 CDP 전수 정리 후 (최종) | 증감 / 비고 |
| :--- | :---: | :---: | :--- |
| **전체 감사 대상 노출 링크** | 430건 | **430건** | 사이트 전 영역 100% 동일 |
| **실측 검증 완료 (`HTTP 200`)** | 140건 (32.56%) | **430건 (100.00%)** | **`HTTP 429` 보류 290건 → 0건 완전 해소** |
| **확정 비즈니스 프로필 (`Place_Profile`)** | — | **424건 (98.60%)** | 호텔 6·응급병원 2·환전소 1 신규 승격 포함 |
| **공식 검색 쿼리 예외 유지 (`Search_List`)** | — | **6건 (1.40%)** | 구글 단일 POI 미등록 건축 조형물 3개소(×2링크) |
| **깨진 링크 / 타 도시 이탈 (`Broken`)** | 다수 (`noska-hotel` 등 + 429 은폐분) | **0건 (0.00%)** | 신규 적발 `premier-village` 등 전수 교정 완료 |
| **폐업·휴업 의심 (`Closed_Suspected`)** | 미확정 (429 보류 포함) | **0건 (0.00%)** | 430개 링크 전체 `Open` 정상 영업 확인 |
| **외부 단축 URL (`maps.app.goo.gl` / `goo.gl`)** | 1건 (`the-room-hotel`) | **0건 (0.00%)** | 코드·데이터 전역 전수 스캔 완료 |
| **가짜 Place ID (`ChIJ_...` 슬러그형)** | 잔존 (`coastal-living`, `triland-hillside`) | **0건 (0.00%)** | `isValidGooglePlaceId` 전수 통과 |
| **푸꾸옥 좌표 경계(`9.90~10.45, 103.84~104.12`) 이탈** | 호치민 리다이렉트 존재 | **0건 (0.00%)** | 전 항목 푸꾸옥 실측 좌표 일치 (`True` 430/430) |

---

## 2. 로컬 Chrome CDP 실측 환경 및 안전 수칙 준수

- **브라우저 세션:** macOS 실제 Google Chrome (`--remote-debugging-port=9222 --user-data-dir=/tmp/chrome-gmaps-audit`) 격리 실행 후 작업 완료 즉시 프로세스 종료 및 임시 프로필 삭제 완료.
- **네트워크 경량화:** `image`, `media`, `font` 리소스 타입 및 `/maps/vt`, `/maps/preview/log204`, `play.google.com/log`, `googleusercontent.com`, `ggpht.com` 요청을 `route.abort()`로 차단.
- **호출 결과:** 총 **138건**의 고유 CDP 직렬 조회 수행 중 `HTTP 429` 또는 `google.com/sorry` 차단 **0건** 발생 (`HTTP 200` 성공률 **100%**).

---

## 3. P2 CDP 실측 중 신규 적발 및 즉시 수정한 Critical 결함

기존 PR #116 감사에서 `HTTP 429` 응답에 가려져 있었거나 비노출 인사이트 파일에 숨어 있던 치명적 결함 3건을 적발하여 본 PR에서 즉시 교정했습니다.

| 심각도 | 대상 슬러그 / 파일 | 적발된 결함 내용 | CDP 실측 교정 결과 |
| :---: | :--- | :--- | :--- |
| **Critical** | `premier-village-phu-quoc-resort`<br>(`data/khem_beach_hotels.json`, `data/hotel_insights.json`) | 기존 `ChIJr4pU6WmWpzERs3lqA96_P1I` 호출 시 `h1=''` 빈 패널과 함께 **호치민시(`10.7905024, 106.6893312`)로 리다이렉트**됨(`HTTP 429`에 가려져 미발견 상태였음) | 아코르 공식 리조트 프로필 **`ChIJcSDG-fqWpzERQkkxuLWDUyU`** (`Premier Village Phu Quoc Resort`, 옹도이 곶 `10.0159773, 104.0392224`, `Open`)로 교체 완료 |
| **High** | `triland-hillside`<br>(`data/hotel_insights.json`, `data/businesses-registry.json`) | `hotel_insights.json` 말단에 가짜 슬러그형 ID `ChIJ_triland_hillside_phu_quoc` 잔존 및 레지스트리 draft 행 좌표(`null`) 누락 | CDP 실측 확인된 실제 프로필 **`ChIJOZ1p38-VpzERKC1kUSIrA4A`** (`Triland Hillside`, `10.033835, 104.0050661`, `Open`)로 정규화 |
| **Medium** | `king-sun-fountain`, `arc-de-triomphe`, `marina-pier`<br>(`lib/sunsetMapData.ts`) | `/maps/place/<명칭>/@lat,lng,18z` 수제 경로가 실제 Chrome에서 명칭 세그먼트가 유실된 `/maps/place//@lat,lng,18z` 빈 지도로 리다이렉트됨 | Zero Hallucination 원칙에 따라 `googlePlaceId`는 비워두고, `HTTP 200` 검증된 공식 Maps URL API 검색 쿼리(`https://www.google.com/maps/search/?api=1&query=...`)로 교체 |

---

## 4. 신규 승격 및 표준화 반영 상세 내역

### 4-1. 호텔 6개소 `Search_List` / 임시 경로 → 확정 `Place_Profile` 승격
(`data/sunset_town_hotels.json`, `data/hotel_insights.json`, `data/businesses-registry.json`, `038` SQL 동시 반영 + 활성 호텔 전체 `googlePlaceId`·`lat`·`lng` SSOT 백필 완료)

| 슬러그 (`slug`) | 기존 상태 (Before) | 신규 확정 `google_place_id` | 구글맵 실측 상호명 (`<h1>`) | 실측 좌표 (`lat, lng`) | 영업 상태 |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `coastal-living-hotel-phu-quoc` | P0 임시 경로 URL (`google_place_id: null`, `10.0268, 104.0079`) | `ChIJ7WFKmwSVpzER8gm7K8E6wZQ` | `Coastal Living Hotel Phu Quoc` (`17 Đ.Positano`) | `10.0305671, 104.0061225` | `Open` |
| `kl-hotel-phu-quoc` | `Search_List` (`KL+Hotel+Phu+Quoc...`) | `ChIJzwK0aw-XpzERxNMvFXY3aE4` | `KL hotel` | `10.0279317, 104.0085074` | `Open` |
| `palo-santo-hotel-phu-quoc` | `Search_List` (`Palo+Santo+Hotel...`) | `ChIJOZ2m40eNpzERS3t2dXx4wKc` | `Palo Santo Hotel` (`31 Đ.Positano`) | `10.0310481, 104.0057705` | `Open` |
| `catarina-hotel-phu-quoc` | `Search_List` (`Catarina+Hotel...`) | `ChIJvXlceNuXpzERCRyDqyTL93o` | `CATARINA Hotel Phu Quoc` (`M101 Đường MILAN`) | `10.0296225, 104.0085035` | `Open` |
| `solaro-hotel-spa-h84816481` | `Search_List` (`Solaro+Hotel...`) | `ChIJk3JMmVKXpzERdcBhMd_k9KY` | `Solaro Hotel & Spa` (`M39-41 Đường MILAN`) | `10.0271621, 104.0088427` | `Open` |
| `anna-hotel-free-cable-car-and-water-park-tickets` | `Search_List` (`Anna+Hotel...`) | `ChIJxTnMPKCWpzERg7paQsHm-00` | `Anna Hotel - Free Cable Car And Water Park Tickets` (`131 Đường MILAN`, 공식 웹사이트 등록 프로필) | `10.0307562, 104.007559` | `Open` |

> 참고: `131 Đường MILAN`에는 미인증 중복 프로필(`ChIJxTnMPKCWpzERjQ8sMGxPg2M`)도 함께 존재하나, 업주 공식 도메인(`annahotelphuquoc.com`)이 연결되고 슬러그 명칭과 정확히 일치하는 인증 프로필(`ChIJxTnMPKCWpzERg7paQsHm-00`)을 채택했습니다.

### 4-2. 응급 의료시설 주요 병원 2개소 확정 `Place_Profile` 승격 (`lib/emergencyFacilities.ts`)

| 시설 ID (`id`) | 기존 상태 | 신규 확정 `placeId` | 구글맵 실측 기관명 (`<h1>`) | 실측 좌표 (`lat, lng`) | 경로(`googleMapsDirUrl`) 개선 |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `phu-quoc-medical-center` | `placeId: ""` (텍스트 경로 URL) | `ChIJNZHWQ3uMpzERLkbqJmDTkoY` | `Trung Tâm Y Tế Thành phố Phú Quốc` | `10.2150242, 103.96767` | `&destination_place_id=ChIJNZHWQ3uMpzERLkbqJmDTkoY` 적용 |
| `vinmec-phu-quoc` | `placeId: ""` (텍스트 경로 URL) | `ChIJefBbxkUeCDERyTiCrrnkvSw` | `International Hospital Vinmec Phu Quoc` | `10.3363672, 103.8568577` | `&destination_place_id=ChIJefBbxkUeCDERyTiCrrnkvSw` 적용 |

### 4-3. Banking 9개 공개 업소 (+ 1개 비공개 업소) URL 포맷 드리프트 해소
`lib/banking.ts`, `data/businesses-registry.json`, Supabase `public.businesses` 간에 혼재하던 `?cid=...` URL을 모두 `lib/mapsLink.ts` (`buildGoogleMapsUrl`) 표준 포맷(`https://www.google.com/maps/search/?api=1&query=...&query_place_id=...`) 및 실측 검증된 `google_place_id`로 100% 통일했습니다.

| ID | 슬러그 (`slug`) | 상태 | 기존 CID URL | 검증 확정 `google_place_id` | 실측 좌표 (`lat, lng`) |
| :--- | :--- | :---: | :--- | :--- | :---: |
| `local-sunset-277` | `mb-atm-nop-rut-tien` | `published` | `?cid=6440178889712391999` | `ChIJ1R0-b6eVpzERP9dGI5QcYFk` | `10.0354681, 104.0047262` |
| `local-sunset-279` | `vietinbank-atm` | `published` | `?cid=11580843206114582841` | `ChIJc4dmHQCVpzEROaH0u4lrt6A` | `10.0356939, 104.0030911` |
| `local-sunset-278` | `bidv-atm-machine` | `published` | `?cid=4069597228033058591` | `ChIJ_YsvGwCXpzERHyfTAx4dejg` | `10.0276568, 104.0073166` |
| `local-sunset-271` | `exmoney-sunset-town-currency-exchange` | `published` | `?cid=4926815319696634130` | `ChIJsY4JY3iXpzEREnF4DG6QX0Q` | `10.0311981, 104.0062552` |
| `local-sunset-263` | `money-exchange-sunset-town` | `published` | `?cid=13561394820020633960` | `ChIJVzqFZ6eVpzERaAEnyrzAM7w` | `10.0307205, 104.0064964` |
| `local-sunset-269` | `g-g-money-exchange-sunset-town` | `published` | `?cid=17008406116662590211` | `ChIJ7aTxLR2VpzERAztBqz__Cew` | `10.0285625, 104.0083125` |
| `local-sunset-274` | `sunsettown-exchange` | `published` | `?cid=9480964989714363871` | `ChIJK4MK9QeXpzER3_XWA20nk4M` | `10.0289939, 104.0083389` |
| `local-sunset-267` | `exchange-money-sol-cosy-phu-quoc` | `published` | `?cid=11676667545235786167` | `ChIJX_dQ80WVpzERt4kcSkTbC6I` | `10.0363354, 104.0069754` |
| `local-sunset-288` | `atm-vietcombank-bidv-atm` | `published` | `?cid=5124801132809454571` | `ChIJHb8567mWpzER64OgWXrzHkc` | `10.035788, 104.024647` |
| `khem-banking-king-kong` | `king-kong-money-exchange-khem-beach` | `private` | `?cid=7406987655171001539` | `ChIJ1cpuHmuXpzERw8wrSgfoymY` | `10.035838, 104.0268677` |

---

## 5. 비표준 S2 셀 접미사 의심 매장 실측 검증 결과 (정상 판정)

푸꾸옥 표준 S2 셀 접미사(`pzER`, `CDER` 등)가 아닌 Place ID를 보유한 매장들을 로컬 Chrome CDP로 직접 확인한 결과, **전원 푸꾸옥 선셋타운 현지에 위치한 정상 영업(`Open`) 프로필**로 확인되었습니다. (베트남 본토에서 최초 개설된 Google Business Profile의 주소·좌표를 푸꾸옥으로 이전할 때 최초 발급된 Place ID의 S2 프리픽스/서픽스가 유지되는 구글맵 고유 동작임.)

1. **`muoi-mini-mart-sunset-town`** (`ChIJZxIdKxnB9WYR0OpNKEcReFQ`): `Muoi Mini Mart - Sunset Town` (`Pos 54, Đ.Positano`, `10.03261, 104.0047753`, `Open`)
2. **`phu-quoc-sunset-town-coffee-workshop-brew-design-the-art-of-vietnamese-coffee`** (`ChIJy_hxHgCrNTERoIcGv_opdSI`): `Phu Quoc Sunset Town Coffee Workshop - Brew & Design the Art of Vietnamese Coffee` (`222 Amalfi`, `10.0348874, 104.0035749`, `Open`)
3. 추가 대조 4개소(`h-corner-cho-dem-vuifest`, `lumi-spa-massage-2-foot-massage-sunset-town`, `miss-tien-spa-homestay-phu-quoc-sunset-town`, `sunset-bazaar-phu-quoc`) 역시 모두 선셋타운 내 정상 `Place_Profile` (`Open`) 확인 완료.

---

## 6. 구글맵 단일 프로필 미등록 예외 항목 (Zero Hallucination 수동 관리 목록)

구글맵 상에 개별 POI 프로필이 아직 등록되지 않아 타 업장이나 상위 구역(`Sunset Town`)의 Place ID를 억지로 매핑하지 않고 공식 검색 쿼리를 유지한 항목입니다.

| 구분 | 식별자 (`id` / `slug`) | 노출 여부 | 현재 적용 URL | 예외 유지 사유 |
| :--- | :--- | :---: | :--- | :--- |
| `/map` 랜드마크 #7 | `king-sun-fountain` (태양신의 분수) | 노출 (2링크) | `https://www.google.com/maps/search/?api=1&query=%C4%90%C3%A0i+phun+n%C6%B0%E1%BB%9Bc+Th%E1%BA%A7n+M%E1%BA%B7t+Tr%E1%BB%9Di+Sunset+Town+Ph%C3%BA+Qu%E1%BB%91c` | 광장 내 야외 조각 분수대로 독립 POI 미생성(조회 시 상위 `Sunset Town` 연결). `googlePlaceId` 미지정 유지 |
| `/map` 랜드마크 #9 | `arc-de-triomphe` (선셋 개선문) | 노출 (2링크) | `https://www.google.com/maps/search/?api=1&query=Kh%E1%BA%A3i+Ho%C3%A0n+M%C3%B4n+Sunset+Town+Ph%C3%BA+Qu%E1%BB%91c` | 남측 진입 관문 건축 조형물로 독립 POI 미생성(조회 시 상위 `Sunset Town` 연결). `googlePlaceId` 미지정 유지 |
| `/map` 랜드마크 #10 | `marina-pier` (선셋 마리나 요트 선착장) | 노출 (2링크) | `https://www.google.com/maps/search/?api=1&query=B%E1%BA%BFn+du+thuy%E1%BB%81n+Sunset+Town+Ph%C3%BA+Qu%E1%BB%91c` | 선착장 공식 단독 POI 미등록(인근 비공식 뷰포인트 `Cầu phao bến du thuyền View` 오매핑 방지). `googlePlaceId` 미지정 유지 |
| 비활성 호텔 인사이트 | `ca-che-p-boutique-house` | 비노출 (`hotel_insights.json` 전용) | `https://www.google.com/maps/search/?api=1&query=Ca+Chep+Boutique+House+Sunset+Town+Phu+Quoc` | 활성 호텔 목록(`sunset_town_hotels.json`) 미포함 항목이며 구글맵에 동명 숙소 프로필 미존재 (`Cá Chép Tea - Cake` 카페와 혼동 방지) |

---

## 7. 운영 Supabase SQL 마이그레이션 적용 안내

1. **선행 순서 확인:** `036_fix_gmaps_p0_p1_20261115.sql` 및 `037_seed_khem_and_sparse_filters_20261115.sql` 적용 후, 본 PR의 **`supabase/migrations/038_fix_gmaps_p2_standardization_20261115.sql`**을 실행합니다.
2. **멱등성 보장:** 모든 구문은 `BEGIN; ... COMMIT;` 트랜잭션 내부에서 `WHERE slug = ...` 조건으로 작성되어 재실행해도 동일한 최종 상태를 보장합니다.
3. **사후 확인 쿼리 예시:**
   ```sql
   SELECT slug, google_place_id, lat, lng, google_maps_url
   FROM public.businesses
   WHERE slug IN (
     'coastal-living-hotel-phu-quoc',
     'mb-atm-nop-rut-tien',
     'vietinbank-atm',
     'bidv-atm-machine',
     'exmoney-sunset-town-currency-exchange',
     'money-exchange-sunset-town',
     'g-g-money-exchange-sunset-town',
     'sunsettown-exchange',
     'exchange-money-sol-cosy-phu-quoc',
     'atm-vietcombank-bidv-atm',
     'king-kong-money-exchange-khem-beach'
   )
   ORDER BY slug;
   ```
