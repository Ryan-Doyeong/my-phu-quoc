# Supabase 라이브 데이터베이스 검증 보고서 (2026-10-26)

- **조회 일시**: 2026-10-26 10:13 (Asia/Saigon)
- **조회자**: Antigravity (Ryan 지시 및 Claude 검증 지원)
- **대상 프로젝트**: My Phu Quoc (`sijozqbgtbmiukqtfblt`)
- **Supabase URL**: `https://sijozqbgtbmiukqtfblt.supabase.co`
- **조회 방식**: Supabase JavaScript Client (Publishable anon key, RLS 환경 직접 쿼리)
- **보안 준수**: API 키 및 비밀번호 일체 미기록, SELECT 조회 전용 (수정·삭제 일체 미실행)

---

## 1. 조회 결과 요약 테이블

| 항목 | 실측 조회 결과 | 비고 |
| :--- | :---: | :--- |
| **(1) `businesses` 전체 행 수 (anon)** | **291행** | RLS에 의해 `published` 상태만 가시적 |
| **`businesses` (status='published')** | **291행** | 선셋타운 마스터 시설 291곳 전체 일치 |
| **`businesses` (status!='published', anon)** | **0행** | 일반 푸꾸옥 262곳(`review` 상태) RLS 완벽 차단 확인 |
| **(2) `business_menu_items` 전체 행 수** | **782행** | 라이브 DB에 현재 적재되어 있는 메뉴 총 수 |
| **(3) published가 아닌 업체 연결 메뉴 수** | **0행** | 비공개 업체의 메뉴 RLS 정책에 의해 완전 차단 확인 |
| **(4) anon 키로 조회한 businesses 행 수** | **291행** | `anon` 권한 조회 기준 |
| **(4) anon 키로 조회한 menu_items 행 수** | **782행** | `anon` 권한 조회 기준 |
| **(5) 메뉴 899개 / 95개소 갱신 반영 여부** | **미반영 (현재 782건/59개소)** | 라이브 Supabase에는 미반영 상태 |

---

## 2. 상세 검증 내용

### (1) `businesses` 테이블 현황
- 익명(`anon`) 키로 조회 시 `status = 'published'`인 선셋타운 업체 **291행**이 정확히 조회됩니다.
- `seed_phuquoc_businesses_v4.sql`에 포함된 전체 553개 업체 중 일반 푸꾸옥 262곳은 `status = 'review'` 상태로 등록되어 있으며, RLS 정책에 의해 `anon` 클라이언트에게는 0건으로 차단되어 일반에 노출되지 않음을 확인했습니다.

### (2) & (3) `business_menu_items` 테이블 및 RLS 정책
- 현재 Supabase에 저장되어 있는 메뉴 항목 수는 정확히 **782건**입니다.
- 연결된 업체의 `status`가 `published`가 아닌 메뉴가 조회되는지 inner join 검증 결과: **0건**.
- 마이그레이션 `023_place_id_and_menus_v2.sql`에 정의된 RLS 정책(`b.status = 'published'` 조건)이 빈틈없이 동작하고 있습니다.

### (4) anon 키 가시성 검증
- `businesses`: 291행 (`published` 선셋타운 마스터 전체)
- `business_menu_items`: 782행 (59개 업체의 검증 메뉴 전수)

### (5) 899개 / 95개소 갱신 현황 및 `seed_menus.sql` 최신 상태
1. **Supabase 라이브 DB 반영 여부**:
   - **아직 미반영 상태**입니다. (현재 라이브 DB는 59개소 782건 유지 중)
2. **로컬 / Drive 파일 최신 상태**:
   - `menus/` 디렉토리에 **95개소 JSON**이 존재합니다.
   - `supabase/seed_menus.sql` 파일은 **95개소 899건**으로 이미 재생성 완료되어 있습니다.
     - 생성 일시: `2026-10-25T16:50:29.002Z`
     - 파일 헤더: `-- Total Venues: 95`
     - 총 INSERT 문: **899건**
     - 날짜 구문: `YYYY-MM-DD` 형식 전수 검증 완료 (에러 유발 가능성 0건)
3. **899건 라이브 반영 시 주의사항**:
   - 현재 라이브 DB에 기존 782건이 이미 적재되어 있으므로, 899건 SQL을 그대로 재실행하면 기존 782건과 중복 삽입될 수 있습니다.
   - 반영 방식에 대한 Ryan/Claude의 결정(기존 메뉴 초기화 후 899건 재시드 or 899건 차등 반영 등)이 필요합니다.
