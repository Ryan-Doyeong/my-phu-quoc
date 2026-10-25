# My Phu Quoc 이미지 규칙 (Image Rules)

1. **상시 WebP 필수**: 사이트에 추가하는 모든 이미지는 원본을 보존한 상태에서 반드시 WebP(`.webp`, 품질 80~85)로 변환해 사용하며, 코드 참조는 오직 `.webp` 경로만 지정합니다.
2. **반응형 3종 규격 (히어로 등)**: 대형 배너/히어로는 640px, 1280px, 1920px 3개 너비로 생성하여 `<picture>` 및 `srcset`으로 제공하고, 용량은 1920px 기준 500KB 이하(일반 카드 300KB 이하)로 압축합니다.
3. **간편 변환 명령어**: 새 이미지는 `node scripts/convert_to_webp.mjs --hero <원본경로> public/hero` 또는 `node scripts/convert_to_webp.mjs --dir <폴더경로>`로 일괄 변환합니다.
