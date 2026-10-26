# 정식 배포 전 체크리스트 (Pre-launch Checklist)

> 갱신일: 2026-10-26 | 기준: My Phu Quoc Phase 5 & Antigravity 전수 검수 완료

## 1. 이미지 및 라이선스 Chrome 전수 검증 결과 (Verified)
모든 위키미디어 공용(Wikimedia Commons) 상세 페이지를 **Google Chrome 헤드리스 브라우저로 직접 접속하여 DOM을 렌더링하고 저작권 표시를 전수 실측 검증** 완료했습니다.

| 번호 | 대상 | 원본 위키미디어 파일 및 접속 URL | 작성자 | 라이선스 | Chrome 검증 시각 | 라이선스 의무 사항 |
|:---:|:---|:---|:---:|:---:|:---:|:---|
| **02** | **홈 히어로 (확정)** | [File:Kiss Bridge Phu Quoc aerial sunset view.jpg](https://commons.wikimedia.org/wiki/File:Kiss_Bridge_Phu_Quoc_aerial_sunset_view.jpg) | **Vivu Vietnam** | **CC BY 4.0** | 2026-10-25 23:13 | **저작자 표시 의무** (동일조건 의무 없음) · 홈 화면 출처 표기 완료 |
| 01 | 일반 관광 (석양) | [File:Kiss Bridge at sunset Phu Quoc Island Vietnam.jpg](https://commons.wikimedia.org/wiki/File:Kiss_Bridge_at_sunset_Phu_Quoc_Island_Vietnam.jpg) | Vivu Vietnam | CC BY-SA 4.0 | 2026-10-25 23:13 | 저작자 표시 + **동일조건변경허락(ShareAlike)** |
| 03 | 호텔 / 언덕 마을 | [File:Sunset-town-phu-quoc-1.jpg](https://commons.wikimedia.org/wiki/File:Sunset-town-phu-quoc-1.jpg) | Vivu Vietnam | CC BY-SA 4.0 | 2026-10-25 23:13 | 저작자 표시 + **동일조건변경허락(ShareAlike)** |
| 04 | 야간 불꽃놀이 쇼 | [File:Kiss of the Sea fireworks show...jpg](https://commons.wikimedia.org/wiki/File:Kiss_of_the_Sea_fireworks_show_Sunset_Town_Sun_World_Phu_Quoc_night_Vietnam.jpg) | Vivu Vietnam | CC BY-SA 4.0 | 2026-10-25 23:13 | 저작자 표시 + **동일조건변경허락(ShareAlike)** |
| 05 | 다이닝 / 카페 거리 | [File:Apollo Cafe daytime street view...jpg](https://commons.wikimedia.org/wiki/File:Apollo_Cafe_daytime_street_view_Sunset_Town_Phu_Quoc_Vietnam.jpg) | Vivu Vietnam | CC BY-SA 4.0 | 2026-10-25 23:13 | 저작자 표시 + **동일조건변경허락(ShareAlike)** |
| 06 | 액티비티 / 케이블카 | [File:Hòn Thơm cable car above the An Thới...jpg](https://commons.wikimedia.org/wiki/File:H%C3%B2n_Th%C6%A1m_cable_car_above_the_An_Th%E1%BB%9Bi_township.jpg) | Klientos | CC BY-SA 4.0 | 2026-10-25 23:13 | 저작자 표시 + **동일조건변경허락(ShareAlike)** |
| 07 | 선셋타운 조명 야경 | [File:Sunset Town Phu Quoc at night.jpg](https://commons.wikimedia.org/wiki/File:Sunset_Town_Phu_Quoc_at_night.jpg) | Vivu Vietnam | CC BY-SA 4.0 | 2026-10-25 23:13 | 저작자 표시 + **동일조건변경허락(ShareAlike)** |

- **CC BY-SA 4.0 라이선스 메모**: 사진을 크롭·리사이즈하거나 개작하여 재배포하는 경우 원본 저작자 표시와 함께 동일한 CC BY-SA 4.0 조건으로 제공해야 합니다.
- **차단(Blocking) 항목 유무**: 7종 전수 Chrome 접속 성공 및 저작자·라이선스 공식 확인 완료되어 **라이선스 미확인으로 인한 배포 차단 항목은 없음(0건)**.

---

## 2. 데이터 및 플랫폼 핵심 점검 현황

- [x] **선셋타운 마스터 시설 291개소 전수 등록 & 게시 (`status: 'published'`)**
- [x] **선셋타운 F&B 메뉴 마스터 95개소 (701개 품목) 전수 번역 및 등급 부여 완료**
- [x] **필수 관광 가이드 3편 실측 연동 (`024_seed_essential_guides.sql`)**
- [x] **푸꾸옥 전역 시설 262개소 전수 검수 및 클린 POI 247개소 분리 (`025_seed_island_candidates_staged.sql`)**
- [x] **다국어 (ja, zh, ru, hi) 누락 UI 번역 대조표 완비 (`docs/translation_completed_terms_v3.md`)**
- [x] **Next.js 16.3.8 (Turbopack) 프로덕션 빌드 0 에러 통과 (`npm run build`)**
- [x] **SEO / 메타데이터 (`robots.txt`, `sitemap.xml`, Schema.org JSON-LD) 실측 검증 완료**
- [x] **구글 드라이브 작업 폴더와 개발 환경(`~/dev/my-phu-quoc`) 100% 양방향 동기화 완료**

---

## 3. 배포(Hostinger/GitHub) 준비 사항

1. **GitHub 리포지토리 푸시 (사용자 승인 후)**:
   - 커밋 정리 후 `git push origin main` 실행.
2. **원격 Supabase 최신 시드 반영 (선택 실행)**:
   - `supabase/seed_menus.sql`: 95개소 F&B 최신 메뉴 동기화
   - `supabase/migrations/025_seed_island_candidates_staged.sql`: 전역 247개소 `review` 상태 스테이징
