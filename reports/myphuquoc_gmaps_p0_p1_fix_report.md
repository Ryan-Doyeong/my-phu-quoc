# PR #116 후속 — 구글맵 P0 데이터 교정 및 P1 코드 리팩토링 완료 리포트

- **작업 브랜치:** `fix/gmaps-p0-p1-remediation` (분기 기준: `origin/main`)
- **근거 감사 PR:** PR #116 (`reports/myphuquoc_gmaps_audit.csv`, `reports/myphuquoc_gmaps_audit_summary.md`)
- **작성 기준일:** 2026-11-15
- **준수 원칙:** Zero Hallucination (미검증 Place ID 임의 생성 0건), SSOT 동기화 (정적 데이터 ↔ Supabase SQL 마이그레이션 일원화), 자동화 봇 차단 유발 네트워크 요청 0건

---

## 1. 수정 전/후 비교표 (Before / After Comparison)

### 1.1 `/hotels` 및 통합 레지스트리 호텔 데이터 교정 (10개소 + 비공개 정리 2개소)

| 구분 | 슬러그 (`slug`) | 수정 전 (`Before`) | 수정 후 (`After`) | 검증 근거 |
| :--- | :--- | :--- | :--- | :--- |
| **호치민 빈 지도 이탈** | `noska-hotel` | PID: `ChIJF_c9aMCXpzERt1r0W687Y4U` (호치민 `10.7905, 106.6893` 이탈), `lat/lng: null` | PID: `ChIJ9SwzZzeVpzERAz84CLvBLh8`<br>좌표: `10.0301732, 104.0060854`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJ9SwzZzeVpzERAz84CLvBLh8` | 레지스트리 SSOT 및 실측 `HTTP 200` (`NOSKA Hotel`) |
| **호치민 빈 지도 이탈** | `fella-hotel` | PID: `ChIJ11j5_KeXpzERFq08eB1nJt4` (호치민 `10.7905, 106.6893` 이탈), `lat/lng: null` | PID: `ChIJjZ-YVl6XpzERBev66-X35uQ`<br>좌표: `10.0256867, 104.0076622`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJjZ-YVl6XpzERBev66-X35uQ` | 레지스트리 SSOT (`FELLA HOTEL`, Sorrento 3) |
| **호치민 빈 지도 이탈** | `golden-sunset-hotel` | PID: `ChIJN3vR_L6VpzER4o1cI_K00e8` (호치민 `10.7905, 106.6893` 이탈), `lat/lng: null` | PID: `ChIJLYZRqS2VpzERBkJetwNxgg8`<br>좌표: `10.0305882, 104.0061444`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJLYZRqS2VpzERBkJetwNxgg8` | 레지스트리 SSOT 및 실측 `HTTP 200` (`Golden Sunset Hotel`) |
| **호치민 빈 지도 이탈** | `js-hotel-phu-quoc-sunset-town` | PID: `ChIJ92fL7_KVpzERx5f4P9A2j8k` (호치민 `10.7905, 106.6893` 이탈), `lat/lng: null` | PID: `ChIJRSic4YOXpzERfVMlKoCM9v8`<br>좌표: `10.0317854, 104.0060131`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJRSic4YOXpzERfVMlKoCM9v8` | 레지스트리 SSOT 및 실측 `HTTP 200` (`JS Hotel Phu Quoc Sunset Town`) |
| **타 숙소 오매핑** | `sunny-hotel` (`sunny-hotel-phu-quoc-ven-18-sunset-town`) | PID: `ChIJPxfJfpeXpzERMNfR5dHAXJE` (`Sunny Side Hotel Phú Quốc` 오연결) | PID: `ChIJJyvaIBKXpzERPWxGoWlnWoc`<br>좌표: `10.03049, 104.005862`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJJyvaIBKXpzERPWxGoWlnWoc` | 실측 `HTTP 200` (`Sunny Hotel Phu Quoc- Ven 18 Sunset Town`) |
| **가짜 Place ID** | `coastal-living-hotel-phu-quoc` | PID: `"ChIJ_coastal_living_phuquoc"` (가짜 슬러그 → `Coordinate_Only` 핀 폴백)<br>URL: `.../maps/search/?api=1&query=Coastal+Living+Hotel+Phu+Quoc` | PID: `null` (가짜 문자열 제거)<br>좌표: `10.0268, 104.0079`<br>URL: `https://www.google.com/maps/place/Coastal+Living+Hotel+Phu+Quoc,+17+Positano,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.0268,104.0079,18z` | Zero Hallucination 준수 (`null` 처리 + Positano 17 확정 주소 핀) |
| **레지스트리 충돌** | `sole-casa-phu-quoc` | PID: `ChIJq2r4s86VpzER3e5p9a8K5jY` (미검증 충돌 PID) | PID: `ChIJCzU1h7OXpzER6BRzBKSqRks`<br>좌표: `10.0290612, 104.0098077`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJCzU1h7OXpzER6BRzBKSqRks` | 레지스트리 SSOT 및 실측 `HTTP 200` (`Sole Casa Phu Quoc`) |
| **레지스트리 충돌** | `casa-del-mar-boutique-hotel` | PID: `ChIJz_xV0ceVpzERL_Q5j7K_c4E` (미검증 충돌 PID) | PID: `ChIJL0J55ZiXpzERbAGmlh0s12I`<br>좌표: `10.0307485, 104.0072895`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJL0J55ZiXpzERbAGmlh0s12I` | 레지스트리 SSOT 및 실측 `HTTP 200` (`CASA DEL MAR BOUTIQUE HOTEL`) |
| **레지스트리 충돌** | `hoang-hon-hotel` (`hoa-ng-hon-ti-m-boutique-hotel`) | PID: `ChIJufI0FqCVpzER1FiJropT03Y` (비공개 로컬 주점 `Quán Nhậu Hoàng Hôn` 오매핑) | PID: `ChIJe4CLfRKXpzERL0ZvGC778Bk`<br>좌표: `10.0257322, 104.0076549`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJe4CLfRKXpzERL0ZvGC778Bk` | 레지스트리 SSOT (`Hoàng Hôn Tím Boutique Hotel`, Sorrento) |
| **단축 URL 정규화** | `the-room-hotel` | 인사이트: `https://maps.app.goo.gl/kDva8BBXaBeUxBvi8` / 레지스트리 구형 PID: `ChIJf75C76WVpzER48c5RSu_h4w` | PID: `ChIJazttI-mVpzER0S79ZGkYs78`<br>좌표: `10.0320914, 104.0043098`<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJazttI-mVpzER0S79ZGkYs78` | 단축 링크 실측 `HTTP 200` 최종 도달 프로필 (`THE ROOM HOTEL- STARBUCKS & FIREWORKS`) |
| **비공개 플레이스홀더 정리** | `mimi-fruits-mart`, `sun-group-sunset-town-electric-buggy-service` | 비표준 문자열 `"mimi_fruits_sunset_town"`, `"buggy_service_sunset_town"` | PID: `null` | 비공개 레코드의 비유효 문자열 선제 제거 |

---

### 1.2 `/map` 선셋타운 12대 핵심 랜드마크 교정 (`lib/sunsetMapData.ts` + `components/SunsetTownMap.tsx`)

| 랜드마크 ID | 수정 전 (`Before` — UI 및 정적 URL) | 수정 후 (`After` — 검증된 좌표·Place ID·정적 URL) | 비고 |
| :--- | :--- | :--- | :--- |
| `kiss-bridge` | UI: `query=10.02708,104.0049` (`Coordinate_Only`)<br>정적: `https://maps.google.com/?q=Kiss+Bridge+Phu+Quoc` | PID: `ChIJG-HZ4ZaRpzERhjtO1_1kObg` (`10.0280346, 104.0037872`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJG-HZ4ZaRpzERhjtO1_1kObg` | 실측 `HTTP 200` 검증 |
| `kiss-of-the-sea` | UI: `query=10.02708,104.0069` (`Coordinate_Only`)<br>정적: `https://maps.google.com/?q=Kiss+of+the+Sea+Show+Phu+Quoc` | PID: `ChIJtSQ7ywmVpzERvzagy4sWZus` (`10.0276968, 104.0060548`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJtSQ7ywmVpzERvzagy4sWZus` | 실측 `HTTP 200` 검증 |
| `clock-tower` | UI: `query=10.0292,104.0077` (`Coordinate_Only`)<br>정적: `Search_List` (결과 5개) | PID: `ChIJGz2yTr6XpzERw3f-8LpV0PM` (`10.0292527, 104.0074202`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJGz2yTr6XpzERw3f-8LpV0PM` | 실측 `HTTP 200` (`Tháp Đồng Hồ`) |
| `cable-car-station` | UI: `query=10.0274,104.0072` (`Coordinate_Only`)<br>정적: `Search_List` (결과 2개) | PID: `ChIJvxdKNoKWpzERAWSyG5rABsg` (`10.0268905, 104.0085686`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJvxdKNoKWpzERAWSyG5rABsg` | 레지스트리 검증 PID |
| `vuifest-bazaar` | UI: `query=10.035,104.0027` (`Coordinate_Only`)<br>정적: `Search_List` (결과 6개) | PID: `ChIJe-XGILOVpzERFUpU0tLXMoY` (`10.0356275, 104.0031156`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJe-XGILOVpzERFUpU0tLXMoY` | 레지스트리 검증 PID |
| `sun-signature-gallery` | UI: `query=10.0306,104.0071` (`Coordinate_Only`)<br>정적: `?q=Sun+Signature+Gallery+Phu+Quoc` | PID: `ChIJb5dRi2aVpzER5yka1zrbkLM` (`10.0304409, 104.0068911`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJb5dRi2aVpzER5yka1zrbkLM` | 실측 `HTTP 200` 검증 |
| `king-sun-fountain` | UI: `query=10.0299,104.0072` (`Coordinate_Only`)<br>정적: `Search_List` (결과 5개) | PID: 미부여 (Zero Hallucination) / 좌표: `10.0299, 104.0072`<br>URL: `https://www.google.com/maps/place/%C4%90%C3%A0i+phun+n%C6%B0%E1%BB%9Bc+Th%E1%BA%A7n+M%E1%BA%B7t+Tr%E1%BB%9Di,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.0299,104.0072,18z` | 공식 베트남어 명칭 + 선셋타운 육상 고정 핀 |
| `sunset-beach` | UI: `query=10.0291,104.0062` (`Coordinate_Only`)<br>정적: 광역 `Sunset Town` 핀 | PID: `ChIJZXM2cdOVpzERTz6J6CvWVwg` (`10.0289714, 104.0064217`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJZXM2cdOVpzERTz6J6CvWVwg` | 레지스트리 `Bãi biển Thị trấn Hoàng Hôn` |
| `arc-de-triomphe` | UI: `query=10.0251,104.0084` (`Coordinate_Only`)<br>정적: `Search_List` + **해상 경도 이탈(`103.7746`)** | PID: 미부여 (Zero Hallucination) / 좌표: `10.02545, 104.00785`<br>URL: `https://www.google.com/maps/place/Kh%E1%BA%A3i+Ho%C3%A0n+M%C3%B4n+Th%E1%BB%8B+Tr%E1%BA%A5n+Ho%C3%A0ng+H%C3%B4n,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.02545,104.00785,18z` | 소렌토 남문 육상 좌표 및 공식 명칭 `/maps/place/` 고정 (JSON-LD 동시 반영) |
| `marina-pier` | UI: `query=10.0245,104.0055` (`Coordinate_Only`)<br>정적: `Search_List` (결과 9개) | PID: 미부여 (Zero Hallucination) / 좌표: `10.02485, 104.00685`<br>URL: `https://www.google.com/maps/place/B%E1%BA%BFn+du+thuy%E1%BB%81n+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.02485,104.00685,18z` | 선셋타운 마리나 해안 육상·부두 핀 고정 |
| `pompeii-ruins` | UI: `query=10.0265,104.008` (`Coordinate_Only`)<br>정적: `?q=Pompeii+Ruins+Sunset+Town+Phu+Quoc` | PID: `ChIJR1rvoz6XpzERak7X8IIpK7Q` (`10.0265838, 104.0079771`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJR1rvoz6XpzERak7X8IIpK7Q` | 실측 `HTTP 200` (`Cột Đá Cổ Pompeii`) |
| `dragon-staircase` | UI: `query=10.0301,104.0078` (`Coordinate_Only`)<br>정적: 광역 `Sunset Town` 핀 (`Mismatch`) | PID: `ChIJlxCWdMWXpzER1uHLQ3OpVkI` (`10.0300494, 104.0077286`)<br>URL: `https://www.google.com/maps/place/?q=place_id:ChIJlxCWdMWXpzER1uHLQ3OpVkI` | 레지스트리·마스터 DB (`Thang Rồng`) |

---

### 1.3 `/emergency` 참조 주요 병원 2개소 프로필 고정 (`lib/emergencyFacilities.ts`)

| 시설 ID | 수정 전 (`Before`) | 수정 후 (`After`) | 검증 근거 |
| :--- | :--- | :--- | :--- |
| `phu-quoc-medical-center` | `googleMapsPlaceUrl` / `PhotosUrl`: `https://www.google.com/maps/search/?api=1&query=...` (`Search_List`)<br>`googleMapsDirUrl`: `...&destination=10.2150242,103.96767&travelmode=driving` (`Coordinate_Only`) | `placeId`: `""` (가짜 ID 미생성)<br>좌표: `10.2150242, 103.96767`<br>`googleMapsPlaceUrl` / `PhotosUrl`: `https://www.google.com/maps/place/Trung+T%C3%A2m+Y+T%E1%BA%BF+Th%C3%A0nh+ph%E1%BB%91+Ph%C3%BA+Qu%E1%BB%91c,+128+%C4%90.+30+Th%C3%A1ng+4,+Khu+1,+Ph%C3%BA+Qu%E1%BB%91c/@10.2150242,103.96767,17z`<br>`googleMapsDirUrl`: `https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=Trung+T%C3%A2m+Y+T%E1%BA%BF+Th%C3%A0nh+ph%E1%BB%91+Ph%C3%BA+Qu%E1%BB%91c,+128+%C4%90.+30+Th%C3%A1ng+4,+Khu+1,+Ph%C3%BA+Qu%E1%BB%91c&travelmode=driving` | 감사 캐시 `HTTP 200` 길찾기 실측 타이틀(`Trung Tâm Y Tế Thành phố Phú Quốc, 128 Đ. 30 Tháng 4, Khu 1, Phú Quốc`) 및 `2026-11-04` 병원 실측 좌표 |
| `vinmec-phu-quoc` | `googleMapsPlaceUrl` / `PhotosUrl`: `https://www.google.com/maps/search/?api=1&query=...` (`Search_List`)<br>`googleMapsDirUrl`: `...&destination=10.3363672,103.8568577&travelmode=driving` (`Coordinate_Only`) | `placeId`: `""` (가짜 ID 미생성)<br>좌표: `10.3363672, 103.8568577`<br>`googleMapsPlaceUrl` / `PhotosUrl`: `https://www.google.com/maps/place/International+Hospital+Vinmec+Phu+Quoc,+B%C3%A3i+D%C3%A0i,+G%C3%A0nh+D%E1%BA%A7u,+Ph%C3%BA+Qu%E1%BB%91c/@10.3363672,103.8568577,17z`<br>`googleMapsDirUrl`: `https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=International+Hospital+Vinmec+Phu+Quoc,+B%C3%A3i+D%C3%A0i,+G%C3%A0nh+D%E1%BA%A7u,+Ph%C3%BA+Qu%E1%BB%91c&travelmode=driving` | 감사 캐시 `HTTP 200` 길찾기 실측 타이틀(`International Hospital Vinmec Phu Quoc, Bãi Dài, Gành Dầu, Phú Quốc`) 및 `2026-11-04` 병원 실측 좌표 |

---

## 2. 수정된 코드·데이터·마이그레이션 파일 요약

1. **`lib/mapsLink.ts`** (P1 방어 로직 강화)
   - `isValidGooglePlaceId(placeId?: string | null): boolean` 헬퍼 함수를 구현 및 export.
   - `^ChIJ_[a-z0-9_]+$` 가짜 슬러그, 짧은 문자열, 공백, 접두사 이후 대문자가 전혀 없는 언더스코어 조합 문자열을 엄격히 차단하는 동시에 `ChIJ_VQ_ljWXpzERbwSZZ5XUYYU` 등 실제 Base64URL(`_` 포함) Google Place ID 314건은 전수 통과하도록 설계.
   - `buildGoogleMapsUrl()`에서 `isValidGooglePlaceId()`를 통과한 경우에만 `query_place_id`를 부착하며, `query` 파라미터와 미검증 폴백 경로 모두 순수 숫자 좌표(`lat,lng`)보다 **상호명 + 권역 힌트** 및 확정 프로필 URL(`cid=`, `/maps/place/`)을 우선하도록 개선.
2. **`components/SunsetTownMap.tsx`** (P1 랜드마크 좌표 강제 덮어쓰기 버그 수정)
   - 기존 `lm.lat && lm.lng ? query=lat,lng : lm.googleMapsUrl` 삼항 연산자를 제거하고, `isValidGooglePlaceId(lm.googlePlaceId)` 검증을 거친 `buildGoogleMapsUrl()` 및 `lm.googleMapsUrl`을 최우선으로 사용하도록 수정 (7개 로케일 `/`, `/ko`, `/zh`, `/ru`, `/ja`, `/hi`, `/vi` 공통 적용).
3. **`lib/sunsetMapData.ts`** (P0 랜드마크 12개 정밀 교정)
   - `MapLandmark` 인터페이스에 `googlePlaceId?: string` 필드 추가.
   - 9개 랜드마크에 검증된 `googlePlaceId` 및 정규 Place URL 부여, 3개 랜드마크(`king-sun-fountain`, `arc-de-triomphe`, `marina-pier`)에 정확한 선셋타운 육상 좌표 및 `/maps/place/` 고정 핀 URL 반영 (`lib/seo/mapJsonld.ts`의 `hasMap` 및 `geo` 스키마 자동 연동).
4. **`lib/hotels.ts`** (P1/P0 호텔 URL 정합성 가드)
   - `HotelItem` 인터페이스에 `lat`, `lng` 추가 및 `mapHotelItem()` 내 `isValidGooglePlaceId()` / `sanitizeHotelMapsUrl()` 검증 적용.
5. **`data/sunset_town_hotels.json`, `data/hotel_insights.json`, `data/businesses-registry.json`** (P0 호텔·레지스트리 SSOT 동기화)
   - 호치민 빈 지도 4개소, 오매핑 1개소(`sunny-hotel`), 가짜 ID 1개소(`coastal-living-hotel-phu-quoc`), 충돌 3개소, 단축 URL 1개소(`the-room-hotel`) 및 비공개 비표준 ID 2개소 일괄 정규화.
6. **`lib/emergencyFacilities.ts`** (P0 응급 병원 2개소 프로필 고정)
   - `phu-quoc-medical-center`, `vinmec-phu-quoc`의 `Search_List` 검색 링크를 확정 `/maps/place/` 프로필 URL 및 기관명 명시 길찾기 URL로 교체.
7. **`supabase/migrations/032_fix_gmaps_p0_p1_20261115.sql`** (운영 DB 마이그레이션)
   - `public.businesses` 테이블 대상 멱등성(`WHERE slug = ...`) 보장 트랜잭션 SQL 작성.

---

## 3. 운영 Supabase SQL 실행 가이드

> **주의:** 운영 DB 반영은 사용자(관리자)의 명시적 승인 후 Supabase Dashboard → **SQL Editor** 또는 승인된 배포 파이프라인을 통해 실행합니다.

### Step 1. 실행 전 대상 레코드 현재 상태 백업 조회 (Read-Only)
```sql
SELECT slug, status, google_place_id, google_maps_url, lat, lng
FROM public.businesses
WHERE slug IN (
  'noska-hotel',
  'fella-hotel',
  'golden-sunset-hotel',
  'js-hotel-phu-quoc-sunset-town',
  'sunny-hotel-phu-quoc-ven-18-sunset-town',
  'sunny-hotel',
  'coastal-living-hotel-phu-quoc',
  'mimi-fruits-mart',
  'sun-group-sunset-town-electric-buggy-service',
  'sole-casa-phu-quoc',
  'casa-del-mar-boutique-hotel',
  'hoa-ng-hon-ti-m-boutique-hotel',
  'hoang-hon-hotel',
  'the-room-hotel',
  'kiss-bridge',
  'sunset-place-10',
  'thap-dong-ho',
  'sunworld-hon-thom-hon-thom-cable-car-phu-quoc',
  'cho-dem-vui-fest-bazaar-sunset-town',
  'sun-signature-gallery',
  'bai-bien-thi-tran-hoang-hon',
  'cot-da-co-pompeii-ancient-pompeii',
  'thang-rong'
)
ORDER BY slug;
```

### Step 2. 마이그레이션 실행
- `supabase/migrations/032_fix_gmaps_p0_p1_20261115.sql` 전체 내용을(`BEGIN; ... COMMIT;` 포함) 그대로 실행합니다.

### Step 3. 실행 후 무결성 검증 쿼리 (결과가 모두 `0`이어야 정상)
```sql
SELECT
  COUNT(*) FILTER (WHERE google_place_id ~ '^ChIJ_[a-z0-9_]+$') AS fake_slug_pids,
  COUNT(*) FILTER (
    WHERE google_place_id IS NOT NULL
      AND google_place_id !~ '^(ChIJ|GhIJ|Eh)[A-Za-z0-9_-]{20,}$'
  ) AS malformed_pids,
  COUNT(*) FILTER (
    WHERE lat IS NOT NULL AND lng IS NOT NULL
      AND (lat < 9.90 OR lat > 10.45 OR lng < 103.80 OR lng > 104.10)
  ) AS out_of_phuquoc_coords
FROM public.businesses;
```

---

## 4. 로컬 정적 검증 통과 수치 (Verification Metrics)

1. **`isValidGooglePlaceId()` 단위 검증 (레지스트리 전수 대조):**
   - `businesses-registry.json` + `khem-beach-businesses.json` 내 실제 유효 Google Place ID **314건 전수 `true` 반환** (`ChIJ_`로 시작하는 정상 Base64URL ID 6건 포함 오탐 **0건**).
   - `"ChIJ_coastal_living_phuquoc"`, `"mimi_fruits_sunset_town"`, `"buggy_service_sunset_town"`, 빈 문자열(`""`), 공백(`"   "`), 짧은 문자열(`"ChIJshort123"`), `null`, `undefined` 전수 **`false` 반환**.
2. **PR #116 기준 전체 노출 링크 430건 정적 재검증 (네트워크/CAPTCHA 호출 0회):**
   - 가짜 Place ID 패턴 (`ChIJ_...` 및 원시 JSON 비유효 ID): **0건**
   - 호치민시 폴백 좌표 (`10.7905, 106.6893`), 깨진 호텔 Place ID, 푸꾸옥 바운딩 박스(`Lat 9.90~10.45`, `Lng 103.80~104.10`) 이탈: **0건** (검증 좌표 쌍 380건 전수 범위 내 통과)
   - `sunny-hotel` 타 숙소(`Sunny Side Hotel`) 오매핑: **0건**
   - `/map` 12개 랜드마크의 강제 `Coordinate_Only` 쿼리 덮어쓰기 및 구형 `?q=` 검색 폴백: **0건**
   - `/emergency` 참조 주요 병원 2개소의 `Search_List` 노출: **0건**
   - 단축 URL (`maps.app.goo.gl`, `goo.gl/maps`) 직접 노출: **0건**
3. **TypeScript 컴파일 검증:**
   - `npx tsc --noEmit`: **에러 0건 (Exit Code 0 통과)**
