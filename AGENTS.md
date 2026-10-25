<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


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
