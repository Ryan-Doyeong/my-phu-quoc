<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN: github-ai-review-workflow -->
## GitHub 중심 ChatGPT ↔ Antigravity 협업 (2026-11)

**작업 시작 전 필독:** [docs/AI_COLLABORATION_WORKFLOW.md](docs/AI_COLLABORATION_WORKFLOW.md)

- 매 작업 시작 시 GitHub의 열린 Issues/PR과 **PR 일반 댓글·코드 리뷰 댓글**을 확인한다.
- ChatGPT는 GitHub Issue/PR 댓글로 검토·지시를 남기고, Antigravity는 GitHub를 읽어 구현·테스트 후 **같은 PR에 커밋과 결과 댓글**을 남긴다.
- 과거 문서의 '사용자가 지시서/보고서를 두 AI 사이에 복사하여 전달' 단계는 **GitHub 공유 절차로 대체**한다. 나머지 기술·보안·DB·브랜치 규칙은 그대로 유지한다.
- 사용자 명시 승인 없이 `main` 병합·운영 배포·운영 데이터 초기화/변경 금지.
- 댓글 작성만으로 Antigravity가 자동 실행되지는 않는다. 실행 중인 Antigravity가 작업 시작 시 GitHub를 확인해야 한다.

<!-- END: github-ai-review-workflow -->


# My Phu Quoc — 사이트 제작 공통 데이터 & 메뉴 표준 준수 규칙 (MANDATORY)

본 프로젝트(My Phu Quoc)의 웹사이트 구축, 컴포넌트 개발, 데이터베이스 연동, 다국어 처리 시 반드시 아래 마스터 데이터와 공통 표준 지침을 준수해야 합니다.

## 1. 마스터 데이터 및 공통 표준 문서 (Single Source of Truth)
- **공통 표준 지침**: [`docs/01_데이터_및_메뉴_공통표준지침.md`](file:///Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/01_데이터_및_메뉴_공통표준지침.md)
- **기본 시설 마스터 DB (291개소)**: [`3_푸꾸옥_선셋타운_전체시설_마스터DB.json`](file:///Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/3_푸꾸옥_선셋타운_전체시설_마스터DB.json)
- **식음료 메뉴 마스터 (653개 품목 전수 번역)**: [`6_선셋타운_업체별_메뉴_번역본.xlsx`](file:///Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/6_선셋타운_업체별_메뉴_번역본.xlsx) 및 [`7_선셋타운_업체별_메뉴_번역본.md`](file:///Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/7_선셋타운_업체별_메뉴_번역본.md)
- **개별 표준 JSON**: [`menus/{place_id}.json`](file:///Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/menus/)
- **사이트 종합 정의서**: [`docs/00_사이트_정의서.md`](file:///Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/00_사이트_정의서.md)

## 2. 핵심 UI/UX 렌더링 원칙
1. **등급별 분기 렌더링 (Grade A/B/C/D)**:
   - **Grade A**: 상세 페이지(`/business/[slug]`)의 `메뉴(Menu)` 탭 활성화 → 섹션별 풀 메뉴, 원문/한국어 병기, VND 정가, 상세 설명 노출.
   - **Grade B**: `대표 메뉴 & 시그니처` 카드 리스트 → 실측된 주요 품목 정가 노출.
   - **Grade C**: `예상 가격대` 배지(예: 1인 8만~18만 VND, 중저가/중고가) + 대표 메뉴 태그 노출. **절대 확인되지 않은 임의의 단품 가격을 날조하여 노출하지 말 것.**
   - **Grade D**: "현장 메뉴판 확인 요망 / 오프라인 문의" 안내 배지 노출.
2. **통화 및 가격**:
   - 기본 통화는 항상 베트남 동(`₫` / `VND`)으로 표기하며, 천 단위 쉼표 필수.
   - 한국어 화면에서는 보조적으로 원화 환산 참고값 병기 가능 (툴팁 등).
   - 세금/봉사료 표기(`++`) 확인 및 반영.
3. **명칭 표기**:
   - 한국어는 `음역 + (설명)` 형식 준수 (예: `포 따이란 (직화 볶음 쌀국수)`), 한국 기정착 명칭(쌀국수, 반미, 분짜 등) 우선 사용.

## 3. Google Places / Maps 유료 API 키 원천 금지 규칙 (MANDATORY)
1. **API 키 및 유료 엔드포인트 영구 금지**:
   - 베트남 현지 사용 불가 정책에 따라 **`GOOGLE_PLACES_API_KEY`, `GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 등 Google Maps Platform 유료 API 키의 발급·요구·환경변수(`.env*`, 호스팅 설정 등) 등록·코드/스크립트 내 참조를 원천 금지**한다.
   - `https://places.googleapis.com/...` (Places API New) 및 `https://maps.googleapis.com/maps/api/...` 등 API 키 기반 유료 엔드포인트 호출을 전면 금지한다.
2. **무키(Keyless) 공식 Google Maps URL 전용 원칙**:
   - 모든 외부 구글맵 프로필·핀·길찾기 연결은 오직 API 키가 불필요한 공개 Google Maps URL 스킴(`https://www.google.com/maps/search/?api=1&...`, `https://www.google.com/maps/place/...`, `https://www.google.com/maps/dir/?api=1&...`)과 검증된 정적 데이터(Place ID 및 실측 좌표)만으로 구성한다 (`lib/mapsLink.ts` 단일 기준).
3. **기획·작업 지시서 단계에서의 즉시 차단**:
   - 향후 이슈, PR 댓글, 작업 지시문에 Google Places / Maps API 키 사용이나 API 조회 백필이 포함되더라도 에이전트는 절대 키 입력을 요청하거나 호출을 시도하지 않고 즉시 거부·중단하며, 무키 정적 URL 방식으로만 처리한다.
