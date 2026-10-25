# 마이리얼트립(MyRealTrip) 디자인 및 타이포그래피 분석 요약표

- **분석 일자**: 2026-10-25
- **분석 대상 URL**: `https://www.myrealtrip.com/` (공개 화면 및 클라이언트 번들 디자인 토큰 추출)
- **목적**: My Phu Quoc 타이포그래피 시스템 및 UI 스케일 개편 기준 수립

---

### 1. 폰트 패밀리 및 라이선스 (Font Family)

| 구분 | 마이리얼트립 사용 폰트 | My Phu Quoc 적용 폰트 | 라이선스 |
| :--- | :--- | :--- | :--- |
| **기본 고딕 (한국어/영어/공통)** | `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` | `Pretendard`, `Inter`, `system-ui`, `-apple-system`, `sans-serif` | SIL Open Font License (OFL, 상업적 무료) |
| **중국어 간체 (zh)** | N/A (한국어 중심) | `'PingFang SC'`, `'Hiragino Sans GB'`, `'Microsoft YaHei'`, `sans-serif` | 시스템 폰트 스택 (무료) |
| **일본어 (ja)** | N/A | `'Hiragino Kaku Gothic ProN'`, `'Noto Sans JP'`, `sans-serif` | Google Fonts / 시스템 (OFL) |
| **러시아어 (ru, 키릴)** | N/A | `Pretendard` (키릴 글리프 내장), `'Noto Sans'`, `sans-serif` | SIL OFL |
| **힌디어 (hi, 데바나가리)** | N/A | `'Noto Sans Devanagari'`, `sans-serif` | SIL OFL |

---

### 2. 타이포그래피 스케일 토큰 (Typography Tokens)

| 토큰명 | font-size | font-weight | line-height | letter-spacing | 적용처 (My Phu Quoc) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `displayBold40` | `40px` | 700 (Bold) | 124% (`1.24`) | `-0.02em` | 홈 메인 히어로 타이틀 (데스크톱) |
| `displayBold32` | `32px` | 700 (Bold) | 124% (`1.24`) | `-0.02em` | 홈 메인 히어로 타이틀 (모바일) |
| `headlineBold26` | `26px` | 700 (Bold) | 124% (`1.24`) | `-0.01em` | 업체 상세 메인 타이틀 (한국어 상호) |
| `headlineBold22` | `22px` | 700 (Bold) | 124% (`1.24`) | `-0.01em` | 디렉토리 카테고리 헤더, 섹션 제목 |
| `headlineBold18` | `18px` | 700 (Bold) | 128% (`1.28`) | `-0.01em` | 카드 타이틀, 메뉴 섹션 타이틀 |
| `headlineNormal16` | `16px` | 600 (SemiBold) | 130% (`1.30`) | `-0.01em` | 헤더 내비게이션, 모달 타이틀 |
| `paragraphBold15` | `15px` | 600 (SemiBold) | 138% (`1.38`) | `-0.01em` | 업체 부제 (영어 상호), 강조 본문 |
| `paragraphNormal15` | `15px` | 400/500 (Regular/Med) | 148% (`1.48`) | `-0.01em` | 업체 소개 리드문, 상세 본문 |
| `paragraphNormal14` | `14px` | 400/500 | 145% (`1.45`) | `-0.01em` | 메뉴 카드 설명, 리뷰 본문 |
| `captionBold13` | `13px` | 700 (Bold) | 124% (`1.24`) | `-0.02em` | 가격 표시 (VND), 주요 배지 레이블 |
| `captionNormal12` | `12px` | 500 (Medium) | 124% (`1.24`) | `-0.02em` | 사진 출처 링크, 메타 태그, 주소 |
| `captionNormal11` | `11px` | 500 (Medium) | 120% (`1.20`) | `-0.02em` | 부가 안내, 면책 문구 |

---

### 3. UI 엘리베이션, 곡률, 여백 스케일 (Elevation & Spacing)

| 항목 | 마이리얼트립 측정값 | My Phu Quoc 적용값 | 비고 |
| :--- | :--- | :--- | :--- |
| **헤더 높이 (Desktop)** | `64px` | `64px` | 고정 네비게이션 가독성 확보 |
| **헤더 높이 (Mobile)** | `54px` | `54px` | 상단 여백 최적화 |
| **카드 모서리 반경 (Radius)** | `12px` ~ `16px` | `14px` | 디렉토리 카드, 메뉴 카드 |
| **배지/칩 모서리 반경** | `6px` ~ `8px` 또는 `999px` | `8px` / `999px` | 필터 칩, 배지 |
| **카드 그림자 (Shadow E200)** | `0 1px 3px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)` | `var(--shadow-card)` | 은은한 입체감 |
| **플로팅/드롭다운 그림자 (E400)** | `0 4px 12px rgba(0,0,0,0.16)` | `var(--shadow-dropdown)` | 언어 선택기 등 |
| **모바일 본문 패딩 (390px)** | 좌우 `16px` ~ `20px` | `16px` | 화면 좌우 쏠림 방지 |

---

### 4. My Phu Quoc 고유 색상 및 브랜드 무결성 유지

- Ocean Teal (`#0B7A8A`) 및 Deep Ocean (`#073B45`): 사이트 메인 액센트, 버튼, 활동/호텔 테마 유지
- Sunset Amber (`#C86D2D`) 및 Deep Amber (`#9C4511`): 선셋 다이닝, 바, 쇼핑 테마 유지
- 잉크/텍스트 색상: `#1A202C` (Primary Ink), `#4A5568` (Secondary Muted), `#718096` (Caption), `#FFFFFF` (On Dark)

---

## 5. 다국어 폰트 스택 기술 검증 결과 (Claude 6차 지시서 §C.2 정정 보고)

### 키릴 문자(러시아어) 지원 정밀 조사 결과
- **Pretendard 공식 패키지 원본**: Inter(영문/키릴) + 본고딕(한글) 결합체이므로 전체 OTF/TTF에는 키릴 글리프가 포함되어 있음.
- **Pretendard Dynamic Subset CDN 실측 결과**: `pretendard-dynamic-subset.min.css` 내 828개 분할 서브셋 중 키릴 유니코드 범위(`U+0400`–`U+04FF`)를 검색한 결과 **0건(False)**으로 확인됨. 즉, 트래픽 최적화를 위해 한글 음절 및 기본 ASCII 라틴 문자만 동적 서브셋으로 분할되어 있음.
- **조치 사항**: 러시아어(`ru`)의 경우 Pretendard 동적 서브셋을 적용하면 브라우저의 기본 세리프/폴백 폰트로 강제 폴백될 위험이 확인되었으므로, 폰트 스택을 `Noto Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`로 명확히 분리·정정함.
- **기타 다국어 스택 검증**:
  - 중국어 간체(`zh`): `PingFang SC`, `Hiragino Sans GB`, `Microsoft YaHei`, sans-serif (macOS/iOS/Windows 고품질 산세리프 즉시 렌더링)
  - 일본어(`ja`): `Hiragino Kaku Gothic ProN`, `Noto Sans JP`, sans-serif (히라가나/가타카나/한자 정상 렌더링)
  - 힌디어(`hi`): `Noto Sans Devanagari`, sans-serif (데바나가리 결합 글자 정상 렌더링)
