# Supabase 마이그레이션 & 시드 반영 작업 로그 (Phase 1)

- **작업 일시**: 2026-10-25 23:43 (Asia/Saigon)
- **대상 프로젝트**: My Phu Quoc (`sijozqbgtbmiukqtfblt`)
- **Supabase URL**: `https://sijozqbgtbmiukqtfblt.supabase.co`
- **지시서 기준**: Claude 8차 지시서 §B (Ryan 명시 승인)

---

## 1. 반영 전(Pre-apply) 데이터베이스 상태 진단
- **점검 일시**: 2026-10-25 23:32 (Asia/Saigon)
- **기존 테이블 및 행 수**:
  - `businesses`: **0행**
  - `business_menu_items`: **미생성** (PGRST205: 테이블 미존재)
  - `site_settings`: **1행** (`appearance` 테마 설정)

---

## 2. 반영 작업 실행 내역
1. **Step 1: 마이그레이션 023_v2 (`supabase/migrations/023_place_id_and_menus_v2.sql`)**
   - 결과: **성공 (SUCCESS)**
   - 내용: `google_place_id` 컬럼 및 인덱스 추가 완료, `business_menu_items` 테이블 및 RLS 정책(`published` 업체 메뉴만 공개 조회) 생성 완료.
2. **Step 2: 마스터 업체 553곳 시드 (`supabase/seed_phuquoc_businesses_v4.sql`)**
   - 결과: **성공 (SUCCESS)**
   - 영향 행 수: 553행 upsert 완료.
   - 공개 여부: 선셋타운 291곳 `published`, 일반 푸꾸옥 262곳 `review`.
3. **Step 3: 메뉴 782건 시드 (`supabase/seed_menus.sql`)**
   - 결과: **성공 (SUCCESS)**
   - 영향 행 수: 782건 전체 삽입 완료 (59개소).
   - 날짜 포맷 정규화(`YYYY-MM-01`) 조치 후 정상 반영.

---

## 3. 사후 검증 결과 (Post-apply Verification)
- **`businesses` 행 수 검증**:
  - `published` 업체 공개 조회: **291행** (선셋타운 마스터 전체)
  - `anon` 키 가시성: **291행** (비공개 262행은 RLS 정책에 의해 완벽 차단됨 확인)
  - 전체 DB 등록 업체: **553행**
- **`business_menu_items` 행 수 검증**:
  - `anon` 키 공개 조회: **782건** (정확히 782건 일치)
  - 비공개(`review`/`draft`) 업체 메뉴 공개 노출 여부: **0건** (RLS 보안 완벽 동작 확인)
- **대표 업체 실측 검증**:
  - `세타 (Seta - La Festa Hilton)`: 메뉴 **146건** 정상 연결 (Grade A 전수 등록 확인)
  - `케이브맨 스모크 립`: 메뉴 **14건** 정상 연결 (Grade B 확인)
  - `타임스 코너 레스토랑`: 메뉴 **4건** 정상 연결 (Grade C 확인)

---

## 4. 사이트 연동 상태
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL=https://sijozqbgtbmiukqtfblt.supabase.co` 및 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 연결 완료
- Next.js 프로덕션 서버 빌드 및 가동 완료
