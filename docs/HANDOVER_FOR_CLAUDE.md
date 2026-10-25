# 📋 My Phu Quoc 프로젝트 현황 보고 및 클로드 인수인계서 (Handover)

- **작성일자:** 2026-10-25
- **프로젝트명:** My Phu Quoc (`my-phu-quoc`)
- **작업 폴더:** `/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc`
- **목적:** Antigravity 세션의 작업 내역을 정리하여 총괄 총괄 아키텍트인 **클로드(Claude)**가 상황을 즉시 파악하고, 검수 및 후속 지시를 내릴 수 있도록 브리핑.

---

## 1. 프로젝트 개요 & 기본 정의

| 항목 | 내용 |
|---|---|
| **서비스명** | **My Phu Quoc** |
| **타깃 지역** | 1순위 Core: **선셋타운(Sunset Town)**, 켐비치(Khem Beach), 안터이(An Thoi)<br>2순위 확장: 즈엉동(중부 시내/야시장), 소나시/바이쯔엉, 그랜드월드(북부) |
| **베이스 코드** | 호치민 타오디엔 로컬 플랫폼(`thaodien-v9`)의 검증된 Next.js 16 + React 19 + Supabase 아키텍처 이식 |
| **다국어 (7개)** | `en`(기본) · `vi` · `hi` · `zh`(간체) · `ru` · `ko` · `ja` (`lib/i18n/config.ts`) |
| **카테고리 (8개)** | `dining` · `bars` · `hotels` · `shopping` · `activities` · `beach` · `wellness` · `essentials` |
| **컬러 테마** | Ocean 메인(`#0B7A8A`) + 카테고리 앰버 골드(`#C86D2D`) 투톤 테마 |
| **게시판 (2개)** | 뉴스(`/news`, Ocean 테마) · 이벤트(`/events`, Amber 테마) |

---

## 2. 지금까지 완료된 핵심 작업

### 2.1. 데이터 수집 및 정제 (총 553개 시설 확보)
1. **선셋타운 마스터 DB 구축 (291개 시설)**
   - 산출물: `1_...xlsx`, `2_...csv`, `3_...json`, `4_...md`
   - 카테고리: 호텔(86), 식당(59), 카페(23), 바(13), 쇼핑(19), 의료(22), 스파(29), 관광/편의(40)
   - 구글맵 ID, 위경도, 주소, 전화번호, SNS, 공식 링크, 대표 가격대 정리 완료.
2. **푸꾸옥 전역 확장 데이터 수집 (262개 시설)**
   - 산출물: `data/phuquoc-photon-candidates.json`, `data/phuquoc-photon-report.md`
   - 즈엉동/야시장 145곳, 그랜드월드 62곳 등 전역 주요 명소/식당/스파 추가 확보.
3. **Supabase 비즈니스 시드(Seed) 생성 완료**
   - 스크립트: `scripts/generate_businesses_seed.js`
   - 산출 SQL: `supabase/seed_phuquoc_businesses.sql` (총 **553개** 비즈니스 INSERT 구문 자동 생성)

### 2.2. 플랫폼 코드베이스 이식 및 최적화
1. **Next.js 16.3 / React 19.3 구조 정리**
   - `app/`: 다국어 라우팅 `[locale]`, 비즈니스 디렉토리 `/directory/[category]`, `/business/[slug]`, `/news`, `/events`, `/admin`, `/editor` 구조 완료.
   - `lib/directory.ts`: 푸꾸옥 전용 8대 카테고리, 7개 언어 레이블, 테마 컬러 매핑 완료.
   - 빌드 및 정적 타입 체크 완료 (`tsc --noEmit` 검증).

### 2.3. 식음료 업체 메뉴 수집 & 한글 번역 (진행 중)
- **작업 원칙**: `5_메뉴번역_작업지시문.md` (추정치 배제, 실제 메뉴판/OCR/공식링크 기반 전수 검증)
- **추적 파일**: `menus/_progress.json`
- **현재 진척도 (20개 업체 처리 완료, 총 503개 메뉴 품목 번역)**:
  - **Grade A (메뉴판 전수 번역 & 가격 확보: 4곳)**
    - 세타 (`Seta` - 힐튼 광동 파인다이닝): 146개 메뉴
    - 핀카 (`Finca` - 힐튼 스페인 다이닝): 126개 메뉴
    - 메디테란 (`MEDITERRAN` - 그리스/이탈리안): 117개 메뉴
    - 베니스 카페 (`Venice Café & Eatery`): 98개 메뉴
  - **Grade B (부분 메뉴 확인: 2곳)**: 선셋분식(8개), 마담칸 푸꾸옥 2호점(8개)
  - **Grade C (가격대 및 대표 메뉴 파악: 7곳)**: 블루 테이블, 남보 키친, 써니커피, 옥토퍼스 아일랜드 등
  - **Grade D (공식 메뉴 부재/확인 필요: 7곳)**: Mai Huong, 터키시/인도 식당 등
- **수집/가공 스크립트 도구**: `menus/tools/` (`menu_lib.py`, `m_batch1_d.py`, `m_batch2.py` 등)

---

## 3. 폴더 구조 및 주요 파일 맵

```text
PhuQuoc/
├── 00_사이트_정의서.md                # 기획/디자인/언어/카테고리 종합 정의서
├── 3_푸꾸옥_선셋타운_전체시설_마스터DB.json # 선셋타운 291곳 JSON
├── 4_푸꾸옥_선셋타운_관광시설_종합가이드.md # 선셋타운 시설별 상세 가이드
├── 5_메뉴번역_작업지시문.md           # 메뉴 수집·번역 원칙 및 스키마
├── app/                             # Next.js App Router (다국어/디렉토리/이벤트/어드민)
├── components/                      # UI 컴포넌트 라이브러리
├── lib/                             # 비즈니스 로직, i18n, 디렉토리 정의, Supabase 클라이언트
├── data/                            # 푸꾸옥 전역 추가 수집 데이터 (Photon)
│   ├── phuquoc-photon-candidates.json
│   └── phuquoc-photon-report.md
├── menus/                           # 메뉴 번역 결과 및 도구
│   ├── _progress.json               # 메뉴 수집 현황 메타데이터
│   ├── [place_id].json              # 업체별 개별 메뉴 데이터
│   └── tools/                       # 배치 처리 스크립트 (Python)
├── scripts/                         # 데이터 변환/수집 스크립트
│   └── generate_businesses_seed.js  # Supabase 시드 생성기
└── supabase/                        # DB 스키마 및 마이그레이션
    ├── 00_phase0_all_in_one.sql     # 기본 테이블/RLS 마이그레이션
    └── seed_phuquoc_businesses.sql  # 553개 비즈니스 시드 데이터
```

---

## 4. 클로드(Claude)에게 넘기는 다음 액션 플랜 (Next Steps)

클로드가 검수하고 순차적으로 지시할 항목들입니다.

### [트랙 1] 메뉴 수집 & 번역 작업 연속 실행 (선셋타운 식음업장)
- **현재 상황**: 선셋타운 식음료(식당 59곳, 카페 23곳, 바 13곳) 총 95곳 중 **20곳 완료(남은 대상 약 75곳)**.
- **클로드 지시 요청**:
  - `menus/tools/` 스크립트를 사용하여 다음 배치(Batch 3: 21번~30번 업체) 수집 및 한글 번역 진행 지시.
  - Grade D로 분류된 인도/터키 식당들의 구글맵 리뷰 최신 사진 추가 확인 여부 결정.

### [트랙 2] Supabase 인프라 연결 & 시드 반영
- **현재 상황**: `00_phase0_all_in_one.sql`과 `seed_phuquoc_businesses.sql` 준비 완료.
- **클로드 지시 요청**:
  - Ryan(사용자)의 Supabase 프로젝트 세팅 완료 여부 확인 후 SQL Editor 실행 가이드.
  - 메뉴 데이터(`menus/*.json`)를 비즈니스 상세 테이블과 어떻게 연결할지 스키마 설계 확정 (e.g. `business_menus` 테이블 신설 또는 JSONB 컬럼 활용).

### [트랙 3] 프론트엔드 UI 화면 점검 및 푸꾸옥 특화 컴포넌트 튜닝
- **현재 상황**: 타오디엔 코드 복제 후 기본 설정 교체 완료 상태.
- **클로드 지시 요청**:
  - 메인 히어로 카피 및 배너(선셋타운/키스브릿지/불꽃놀이 테마) 문구 확정.
  - 선셋타운 지도/구역 필터(소렌토, 베니스, 아말피, 포지타노, 힐사이드 등) 추가 여부 결정.
  - 뉴스/이벤트 기본 시드 데이터 등록 검토.
