# 번체 중국어(홍콩·대만) `/tw` 설계

7번째 데이터 로케일을 추가하지 않고, 간체 `/zh` 페이지를 서버에서 OpenCC(`cn -> twp`, 대만 어휘)로 변환해 `/tw` 로 서빙한다.

## 동작
- `app/tw/[[...path]]/route.ts` (GET): `${HANT_SOURCE_ORIGIN || SITE_URL}/zh/<path>?<query>` 를 `x-mpq-hant-source: 1` 헤더로 fetch (`revalidate: 300`, 5xx 는 no-store 재시도).
  - 404/410 은 상태 그대로, 3xx 는 Location 의 `/zh` -> `/tw` 로 바꿔 리다이렉트.
  - HTML: 문서 전체(RSC 페이로드 `self.__next_f` 포함)를 변환, `<html lang="zh-Hant">`, 내부 링크·canonical·og:url `/zh` -> `/tw`, `og:locale` zh_TW, 언어 선택기 현재 이름 `繁體中文`, 폰트 Noto Sans SC -> TC.
  - `hreflang="zh-Hans"` 대체 링크는 `/zh` 그대로 보호. 비 HTML(sitemap 등)은 바이트 그대로 프록시.
  - `x-mpq-hant-source` 헤더가 붙은 요청은 404 (루프 방지). RSC/prefetch 요청(`rsc`, `next-router-prefetch`)은 404 -> 클라이언트 라우터가 일반 페이지 이동으로 전환.
- `public/hant/opencc-cn2t.js` + `runtime.js`: 클라이언트 번들(사전 등)의 간체 문자열이 hydration 후 DOM 에 나타나므로 브라우저에서 같은 규칙으로 재변환(MutationObserver). `opencc-js` 버전을 올리면 `node_modules/opencc-js/dist/umd/cn2t.js` 를 다시 복사한다.
- `lib/i18n/config.ts`: `HANT_PREFIX`, `hantPath()`, `prefersTraditionalChinese()`, `buildAlternates` 에 `zh-Hant` 추가.
- `proxy.ts`: `/tw/*` 통과, `?lang=tw` -> 쿠키 `NEXT_LOCALE=tw` + 301, 루트(`/`) 첫 방문 시 Accept-Language 가 zh-TW/HK/MO/Hant 이면 `/tw` 307 (쿠키가 없을 때만, 기존 자동 리다이렉트와 동일 조건), 쿠키 `tw` 면 `/tw`.
- `LanguageSwitcher`: 简体中文 다음에 `繁體中文` 항목. `app/sitemap.ts`: zh 변형이 있는 모든 URL 에 `/tw` 추가.

## 한계
- POST/서버 액션은 `/tw` 에서 지원하지 않음(GET 전용).
- 클라이언트 사전 텍스트는 SSR(번체) 와 클라이언트(간체) 가 달라 React hydration 경고(#418)가 콘솔에 남을 수 있음. 런타임 스크립트가 직후 번체로 복구.
- 로컬 테스트: `HANT_SOURCE_ORIGIN=http://localhost:<port>` 로 자기 자신의 /zh 를 소스로 지정.
