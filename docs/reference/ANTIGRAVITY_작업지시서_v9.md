# Good Life in Phu Quoc — v9 작업 지시서 (Antigravity용)

> 대상 프로젝트: `good-life-in-thaodien-HOSTINGER-v8.8-SMART-EDITOR` (Next.js 16 / React 19 / Supabase / Hostinger Node 호스팅)
> 라이브 사이트: https://goodlifethaodien.online/
> 사이트 목적: 호치민 타오디엔 거주자를 위한 로컬 라이프 플랫폼(업체 디렉토리 + 로컬 뉴스/커뮤니티 + 광고/Analytics). 사업 소개서의 핵심은 "광고와 추천의 분리", "정확한 정보", "작은 업체도 공정하게 발견", "지역사회 환원"이다.

---

## 0. 작업 원칙 (반드시 지킬 것)

1. **운영(Production) Supabase DB와 라이브 서버에는 절대 직접 쓰지 않는다.** 모든 개발/테스트는 로컬 + 별도 Staging Supabase 프로젝트에서 한다. 운영 반영은 사용자(Ryan)가 확인한 뒤 마지막 Phase에서만 한다.
2. **Phase 단위로 작업하고, Phase가 끝날 때마다 git commit + `docs/progress/phase-N.md`에 (무엇을 바꿨는지 / 어떻게 테스트했는지 / 남은 문제) 10줄 이내로 기록한다.** 그리고 멈춰서 사용자 확인을 받는다.
3. **정보의 정확성이 최우선이다.** 업체 데이터에서 확인되지 않은 값(주소, 전화, 영업시간, 가격 등)은 추측해서 채우지 말고 `null`로 둔다. 모든 업체 레코드에 `source`(출처)와 `last_verified_at`(확인일)을 남긴다.
4. **Google Maps/Places 자동 수집(스크래핑)은 하지 않는다.** 베트남에서 Places API를 쓸 수 없고, 구글 사진/리뷰 복제는 약관 위반이다. 구글맵은 지금처럼 "외부 링크"로만 쓴다.
5. **크레딧 절약:** 파일 전체를 반복해서 읽지 말 것 (특히 `app/globals.css` 84KB, `app/actions.ts`, 한 줄짜리 거대 JSX 파일들). 필요한 부분만 검색해서 수정한다. 큰 파일은 한 번 구조를 파악한 뒤 부분 수정한다. 한 번에 여러 Phase를 하지 말 것.
6. API 키/비밀번호는 `.env.local`에만 두고 커밋하지 않는다 (`.gitignore` 확인). 현재 코드에 번들된 Supabase publishable key는 공개 키이므로 그대로 두되, **service_role 키는 어떤 경우에도 코드/클라이언트에 넣지 않는다.**
7. 기존 기능(Admin, Editor, 업체 제출, Analytics, Member 배지, Sponsor 배너)을 깨뜨리지 않는다. 변경 전후로 `npm run build`가 통과해야 한다.
8. 사용자는 비개발자다. UI 문구/관리 화면은 쉽고 짧게. 에러 메시지는 "무엇을 하면 되는지"를 알려준다.

---

## 1. 현재 상태 진단 (조사 결과)

- 스택: Next.js 16 App Router, Supabase(Auth/DB/Storage 버킷 `site-media`), Hostinger Node.js 배포(ZIP 업로드 방식). 공개 페이지는 쿠키 없는 Supabase 클라이언트 + `revalidate=300`(5분 ISR).
- **이미지가 무거운 주원인(확인됨):**
  - 업로드 이미지(`uploadImage()` in `app/actions.ts`, `app/api/editorial-upload/route.ts`)가 **원본 그대로(JPG/PNG/HEIC 등, 최대 5MB)** Supabase Storage에 올라가고, 화면에는 `<img src=원본URL>`로 그대로 표시된다. `lib/imageUrl.ts`의 리사이즈/품질 처리는 **Unsplash URL에만** 적용되고 업로드 이미지에는 적용되지 않는다.
  - 모든 이미지가 `<img>` 태그이며 `width/height`가 없어 레이아웃 흔들림(CLS)이 생긴다. `next/image`는 쓰지 않는다(Hostinger CPU 부담 때문에 그대로 쓰지 않는 것이 맞다 — 아래 해결책은 "업로드 시점에 한 번만 변환").
  - Unsplash 이미지는 `auto=format`으로 이미 WebP/AVIF 자동 협상됨 → 문제 아님.
  - 홈 히어로: 1800px 이미지 + CSS `filter: blur()` + `transform: scale()`을 전체 화면 이미지에 적용 → 모바일 GPU/페인트 비용이 큼.
- 에디터: `components/ArticleEditor.tsx`(textarea 기반, Paste & Optimize, 템플릿, 인라인 사진 업로드, 라이브 프리뷰). 자동저장/붙여넣기 이미지/서식 도구 부족.
- 데이터: `businesses` 80곳 시드(Google Maps 파생 샘플, `verification_status=ai_checked`), 대표 이미지는 Unsplash 대체 이미지(`media_note`로 표시). 실제 업체 사진/좌표 없음.
- SEO/기본기: `sitemap.xml`, `robots.txt`, 페이지별 metadata/OG, 구조화 데이터(JSON-LD), `not-found`/`error`/`loading` 페이지가 **없음**. `/news`와 `/blog-news`가 동일 내용으로 중복. migrations 번호 중복(008 두 개)과 누락(011, 012).
- 성능/구조: 상세/목록에서 `select('*')` 사용, 디렉토리 목록은 전체 업체를 클라이언트로 내려보내 필터링(`DirectoryBrowser`) → 업체 수가 늘면 느려짐. `globals.css` 단일 84KB.
- 배포: ZIP 업로드 → 수정할 때마다 전체 재업로드. 이를 Git 기반으로 바꾸고, 로컬에서 먼저 검증한다.

---

## Phase 0 — 로컬 개발 환경 + 안전망 (먼저 할 것)

목표: Ryan의 Mac에서 `npm run dev`로 사이트가 뜨고, 운영과 분리된 테스트 DB를 쓴다.

1. Node 22 확인 (`node -v`), 프로젝트 폴더에서 `npm install`.
2. 현재 폴더 상태를 git으로 보존: `git init` → `.gitignore`(node_modules, .next, .env*, .DS_Store, *.zip) 확인 → 첫 커밋 `v8.8 baseline` → 태그 `v8.8`.
3. **Staging Supabase 프로젝트 사용** (Ryan이 새 무료 프로젝트를 만들어 URL/anon key를 준다 — 아직 없으면 이 단계에서 멈추고 Ryan에게 만드는 방법을 안내한다):
   - `supabase/migrations/001 ~ 014`를 번호 순서대로 적용 (008 중복 파일 주의: 어떤 것이 어떤 것에 의존하는지 확인 후 `008a/008b`로 이름 정리, 내용 변경 금지).
   - `lib/supabase/config.ts`가 하드코딩된 운영 URL/키를 쓰고 있다면 **`.env.local`의 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 있으면 우선 사용**하도록 수정한다 (없으면 기존 값으로 fallback하지 말고 에러를 내서 실수로 운영 DB를 건드리지 않게 한다 — 단, 운영 배포 환경변수는 Phase 6에서 설정).
   - Staging에 테스트 staff 계정 생성(owner 권한), Storage 버킷 `site-media` 생성 + public 정책(004, 005 migration 참고).
4. `.env.local.example` 작성. `README`에 "로컬 실행 방법(Mac)" 5줄로 정리.
5. 완료 기준: `npm run dev`로 홈/디렉토리/뉴스/`/login`→`/admin`, `/editor`가 로컬에서 동작. `npm run build` 통과. 한 번 테스트 업체 제출→승인→게시 흐름 확인.

---

## Phase 1 — 이미지 최적화 (WebP) ★최우선

목표: 사이트 체감 속도 개선. **업로드 시점에 한 번만 WebP로 변환/리사이즈**하고, 화면에서는 용도별 크기를 골라 쓴다. (런타임 변환 X → Hostinger CPU 부담 없음.)

1. 이미지 처리 유틸 `lib/image/process.ts` 신규 (서버 전용, `sharp` 사용; `npm i sharp`):
   - 입력: `File`/Buffer. 출력: WebP 변환본 3종 — `thumb`(긴 변 480, q72), `card`(긴 변 960, q76), `full`(긴 변 1600, q80; 히어로용은 2000). 원본보다 커지지 않게(upscale 금지), EXIF 회전 보정(`rotate()`), 메타데이터 제거.
   - 파일명 규칙: `<base>-thumb.webp`, `<base>-card.webp`, `<base>-full.webp` (같은 폴더, 같은 base).
   - 허용 입력: jpeg/png/webp/avif/heic(heic는 sharp 빌드에서 지원 안 되면 클라이언트 변환 안내로 대체). 5MB 제한은 유지하되, 에러 문구를 친절하게.
2. `uploadImage()`(app/actions.ts)와 `app/api/editorial-upload/route.ts`를 위 유틸을 쓰도록 변경: 변환 후 3종을 Storage에 업로드하고 **DB에는 `full` URL 하나만 저장** (기존 컬럼 구조 유지 → 마이그레이션 최소화).
3. 렌더링용 `lib/imageUrl.ts` 확장: Supabase Storage URL이 `-full.webp`로 끝나면 요청 width에 따라 `-thumb`/`-card`/`-full` 중 가장 가까운 것을 선택. 기존 Unsplash 처리(`auto=format`)는 유지. 변환본이 아닌 레거시 URL은 그대로 반환.
4. 모든 `<img>`에 `width`/`height`(또는 `aspect-ratio` CSS) 지정해 CLS 제거. 첫 화면 이미지(히어로)만 `fetchPriority="high"` + `<link rel="preload" as="image">`, 나머지는 `loading="lazy" decoding="async"` 유지.
5. 히어로: CSS blur는 기본값 0으로 하고(Admin에서 켜면 적용), 전체 이미지 `scale/filter` 제거 또는 모바일에서 비활성화. 히어로 이미지는 모바일 800px / 데스크톱 1600px (`srcset`/`sizes` 또는 `<picture>`)로 분기.
6. **기존 이미지 일괄 변환 스크립트** `scripts/migrate-images.mjs`: Storage `site-media`의 기존 JPG/PNG를 읽어 WebP 3종으로 변환·업로드하고, `businesses.gallery_urls`, `stories.cover_image_url/gallery_urls`, 본문 내 `![](...)` 이미지, `site_settings.hero_image_url`, sponsor/category icon URL을 새 URL로 치환. **Staging에서 먼저 실행, `--dry-run` 옵션 필수, 실행 전 JSON 백업(`/api/admin/backup` 활용) 저장.** 운영 실행은 Phase 6.
7. 클라이언트 사전 압축(선택): 업로드 폼에서 선택한 사진을 브라우저에서 먼저 1600px로 줄여서 올리면 모바일 업로드가 빨라진다. 위 서버 변환이 안전망이므로 우선순위는 낮음.
8. 완료 기준(모바일 Lighthouse, 로컬 `npm run build && npm start` 기준): 홈 Performance 85+, LCP 2.5s 이하, 홈 첫 로드 이미지 전송량 1.5MB 이하, 카드 이미지 개당 150KB 이하, CLS 0.1 이하. 결과를 `docs/progress/phase-1.md`에 기록.

---

## Phase 2 — 글쓰기(Editor) 편의성

원칙: **본문 저장 형식(현재 Markdown 유사 포맷)은 유지**한다. `ArticleBody` 렌더러와 기존 기사 호환이 깨지면 안 된다. 무거운 라이브러리는 `/editor` 경로에서만 동적 import(공개 사이트 번들에 포함 금지).

1. **사진 붙여넣기/드래그&드롭:** 본문 textarea에 이미지를 붙여넣거나 끌어다 놓으면 Phase 1 파이프라인으로 업로드 → 커서 위치에 `![캡션](url)` 자동 삽입. 업로드 중 진행 표시.
2. **자동저장:** 30초마다 + 입력 멈춤 3초 후 브라우저에 임시저장(`localStorage`), 새로고침/실수로 닫아도 복구 안내. (선택) 서버 Draft 자동저장은 기존 draft 상태 업데이트로.
3. **서식 도구 모음:** 굵게/제목(H2/H3)/목록/인용/링크/구분선 버튼 + 단축키(Cmd/Ctrl+B, K). 모바일에서도 쓰기 편한 큰 버튼.
4. **"붙여넣기 정리":** Google Docs/Word/ChatGPT/웹페이지에서 복사한 HTML 서식을 깨끗한 Markdown으로 변환(`turndown` 등 경량 라이브러리, 에디터에서만 로드). 기존 Paste & Optimize는 유지하고 통합.
5. **저장 시 자동 채움:** Excerpt(첫 문단 요약 160자), SEO title/description, 읽기 시간, 슬러그(영문 소문자·하이픈, 중복 시 번호) 자동 제안. 사용자가 수정 가능.
6. **미리보기:** 데스크톱은 좌우 분할, 모바일은 탭 전환. 게시 전 체크리스트(커버 사진 있음? 제목 길이? 출처 표기? 사진 alt 입력?)를 경고로 표시(차단 아님).
7. **예약 게시(선택):** `scheduled_at` 컬럼 추가 시 migration 필요 → Staging에서만 먼저 적용하고 마이그레이션 파일은 `015_...`로 추가.
8. **AI 보조(선택, 기본 꺼짐):** 비용 통제를 위해 "자동"이 아니라 **버튼을 눌렀을 때만** 동작: ① 제목 후보 3개 ② 요약문 생성 ③ 맞춤법/문장 다듬기. 사용 모델/키는 환경변수(`AI_ASSIST_ENABLED`, 기존 OpenAI 키 코드 재사용 가능)로 제어하고 월 호출 상한(예: Admin 설정값)을 둔다. 사실을 새로 만들어내지 않도록 프롬프트에 "제공된 내용만 정리" 규칙을 명시.
9. 완료 기준: 비개발자가 스마트폰에서 글 작성 → 사진 3장 붙여넣기 → 미리보기 → 게시까지 막힘 없이 가능. 기존 기사 3개 이상이 동일하게 렌더링되는지 확인.

---

## Phase 3 — 업체 데이터 확보 & 정확도 (Google 이외 소스)

목표: 업체들에게 영업하기 전에 보여줄 "충분히 채워진 디렉토리"(카테고리당 25~30곳, 총 120~150곳, 그중 30곳은 완성 페이지).

1. **스키마 보강 (Staging 먼저, migration `016_...`):** `businesses`에 `source`(osm/manual/owner/foursquare 등), `source_url`, `source_id`, `lat`, `lng`, `facebook_url`(있으면 유지), `last_verified_at`(이미 있으면 활용), `data_confidence`(low/medium/high), `phone_verified`, `hours_verified` 같은 최소 필드. 기존 컬럼은 건드리지 않는다.
2. **OpenStreetMap(Overpass) 후보 수집 스크립트** `scripts/collect-osm.mjs`:
   - 영역: 타오디엔 (대략 bbox 10.795,106.720 ~ 10.825,106.760 — 정확한 경계는 실행 후 지도로 확인하고 조정), 태그: `amenity=restaurant|cafe|fast_food|bar`, `leisure=fitness_centre|sports_centre|yoga|swimming_pool`, `shop=beauty|hairdresser|massage`, `amenity=spa` 등.
   - 출력: `data/candidates-osm.csv` (name, category 후보, address, lat, lng, phone, website, opening_hours, osm_id, osm_url). **OSM 라이선스(ODbL) 출처 표기 문구**를 사이트 푸터/About에 추가 (`© OpenStreetMap contributors`).
   - 기존 80곳과 이름+좌표 근접도로 **중복 매칭**해 `matched / new` 구분 리포트(`data/osm-report.md`) 생성: 카테고리별 부족 수 포함.
3. **Admin CSV 가져오기:** 후보 CSV를 업로드하면 바로 게시되지 않고 `draft` + `verification_status='unverified'`로 들어간다. 중복 경고, 필수값 검증, 카테고리 매핑 UI. 에디터가 하나씩 열어서 사실 확인(주소/영업시간/전화) 후 `last_verified_at`을 찍고 게시.
4. **업체 상세 페이지:** 값이 없는 필드는 줄 자체를 숨긴다("—" 표시 대신). "Details updated <날짜>"와 출처를 작게 표시. 지도 링크는 좌표 또는 구글맵 검색 URL(`https://www.google.com/maps/search/?api=1&query=...`)로 자동 생성 가능하게(API 불필요).
5. **사진 정책:** 구글 사진 복제 금지. 대표 사진은 ① 업체 제출 사진 ② 에디터 방문 촬영 ③ 허락받은 SNS 사진(허락 기록 필드 `photo_permission` 추가) 순으로 채우고, 없으면 현재처럼 "Representative photo" 표시된 대체 이미지 사용.
6. **영업용 "미리 만들어둔 페이지" 흐름:** 업체 상세 페이지에 `Claim this listing / Update info` 링크(기존 Submit Your Business 폼으로 연결, 업체명/주소 사전 입력) 추가.
7. 완료 기준: 카테고리별 후보 수 리포트, Staging에 120곳 이상 draft 적재, 샘플 10곳 수동 검증 완료.

---

## Phase 4 — "온라인에서 직접 편집" + Git 배포

목표: 매번 ZIP을 올리지 않아도 콘텐츠/문구/섹션을 Admin에서 바꿀 수 있고, 코드 변경은 `git push` 한 번으로 배포.

1. **콘텐츠는 이미 Admin/Editor에서 온라인 편집 가능**(업체/기사/히어로/배너/아이콘). 여기에 추가:
   - 홈페이지 섹션(문구, 순서, 표시/숨김, CTA 링크)을 DB(`site_settings` 확장 또는 `page_blocks` 신규 테이블)에서 읽도록 변경하고 Admin에 "Homepage sections" 편집 화면 추가. **자유로운 페이지 빌더는 만들지 않는다**(복잡도/무게 증가) — 정해진 블록의 텍스트/이미지/순서만 편집.
   - 푸터, About, For Businesses 페이지의 주요 문구도 같은 방식으로 편집 가능하게(우선순위 낮음).
   - 변경 시 `revalidatePath`/`revalidateTag`로 즉시 반영, "저장하고 미리보기" 버튼.
2. **배포 파이프라인:** GitHub private repo 생성 → Hostinger hPanel의 Git 배포(Node.js Web App) 연결 방식 확인(Hostinger 현재 지원 방식을 공식 문서로 확인하고, 안 되면 GitHub Actions로 빌드 → 산출물 업로드 방식 제안). 환경변수는 hPanel에서 설정. `main` = 운영, `dev` = 로컬 작업 브랜치.
3. 배포 체크리스트 `DEPLOY_CHECKLIST.md` 갱신: 로컬 build 통과 → Lighthouse → Staging 확인 → DB 백업 → migration 적용 → push → 라이브 확인 → 롤백 방법(`git revert`/이전 태그).
4. 완료 기준: Admin에서 홈 문구/섹션 순서 변경 → 로컬에서 즉시 반영, 코드 수정 → git push만으로 배포되는 절차 문서화(실제 운영 배포는 Phase 6).

---

## Phase 5 — 전반 개선 (우선순위순)

1. **SEO:** `app/sitemap.ts`, `app/robots.ts`, 페이지별 `generateMetadata`(title/description/OG 이미지/canonical), 업체 상세에 JSON-LD `LocalBusiness`, 기사에 `Article`. `/blog-news` ↔ `/news` 중복은 하나로 통합하고 301 리다이렉트.
2. **디렉토리 확장성:** 현재는 전체 업체를 내려보내 클라이언트 필터링. 서버에서 카테고리/서브카테고리/라벨 필터 + 페이지네이션(또는 "더 보기")로 변경, 필요한 컬럼만 `select`. 검색(`/search`)은 `ilike` → 인덱스(`pg_trgm`) 적용 검토. 랜덤 정렬은 공정성 정책(작은 업체도 노출)을 유지하되, 캐시 가능한 방식(시간 단위 seed)으로.
3. **스팸/보안:** 공개 폼(업체 제출, 제안, 봉사 신청, 뉴스레터)에 honeypot + 간단한 rate limit, 파일 업로드 MIME/확장자 이중 확인, Storage 업로드 경로 규칙 점검, RLS 정책 재점검(staff 전용 테이블).
4. **UX 기본기:** `not-found.tsx`, `error.tsx`, `loading.tsx`, 이미지 `alt` 입력 필드(접근성), 모바일 메뉴/검색 점검, 폼 성공/실패 메시지 일관화.
5. **다국어 준비:** `description_vi/ko` 컬럼이 이미 있음. UI 문자열을 한곳(`lib/i18n`)으로 모으는 구조만 먼저 만들고 번역은 이후(지금 전체 번역하지 말 것).
6. **Analytics:** 봇/크롤러 제외, 개인정보 안내 문구(쿠키/로컬 저장 고지) 추가, 업체별 30일 리포트(조회수·지도/예약/웹사이트 클릭)를 PDF/이미지/링크로 내보내는 기능 → 영업 도구로 사용.
7. **코드 정리:** `globals.css` 84KB를 공개용/Admin용으로 분리(Admin CSS는 `/admin`,`/editor`에서만 로드) → 공개 페이지 CSS 크기 감소. 한 줄로 압축된 JSX 파일은 건드릴 때 포맷팅.

---

## Phase 6 — 최종 테스트 & 운영 반영 (Ryan 확인 후에만)

1. 로컬 `npm run build && npm start`에서 전체 시나리오 점검: 홈/디렉토리/상세/뉴스/이벤트/검색/업체 제출/로그인/Admin/Editor/글 작성·사진 삽입/배너/배지/Analytics.
2. 모바일 실기기(또는 DevTools) + Lighthouse 모바일 점수 기록(Phase 1 목표 달성 여부).
3. 운영 DB **백업(JSON + Supabase 백업)** → migration 순서대로 적용 → 이미지 마이그레이션 스크립트 `--dry-run` 후 실제 실행 → 샘플 확인.
4. 배포(git push) → 라이브 스모크 테스트 → 문제 시 즉시 롤백.
5. 결과를 `docs/progress/release-v9.md`에 기록.

---

## 사용자(Ryan)가 해줘야 하는 것 (Antigravity가 필요 시점에 안내할 것)

- Staging용 Supabase 새 프로젝트 만들기 (무료 플랜 가능) → URL과 anon key를 `.env.local`에 입력
- GitHub 계정/private repo 생성
- 샘플 업체 몇 곳 직접 방문 시 찍은 사진, 업체 사진 사용 허락 DM 템플릿 사용
- 각 Phase 완료 후 결과 확인 → "다음 Phase 진행" 승인

---

## 부록 A — 작업 폴더 안내 (Phase 0 시작 전에 읽을 것)

- 작업 폴더는 `thaodien-v9/` 이다. 원본 `good-life-in-thaodien-HOSTINGER-v8.8-SMART-EDITOR/`와 ZIP은 **수정 금지(백업용)**.
- `thaodien-v9/.git`은 임시로 만들어진 것이라 잠금 파일(`.git/HEAD.lock`)과 임시 객체가 남아 있을 수 있다. **Mac 터미널에서 `rm -rf .git` 후 `git init -b main` → 첫 커밋 `v8.8 baseline` → 태그 `v8.8`로 새로 만든다.**
- `scripts/collect-osm.mjs`는 이미 작성되어 있다(Phase 3용). Phase 3에서 `node scripts/collect-osm.mjs`로 실행하고 `data/osm-report.md`를 확인한다. 실행 전 BBOX가 타오디엔을 정확히 덮는지 지도로 확인하고 필요하면 `BBOX` 환경변수로 조정한다.
- `data/` 폴더는 데이터 작업 전용이다. 코드 수정과 섞지 않는다.
