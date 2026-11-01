--
-- Supabase Migration: 030_cleanup_sns_and_google_maps_alignment_20261101.sql
-- 근거: Ryan 지시 (2026-11-01 14:19/14:57/14:58/15:01) 및 Claude 지침 (검수 반영 v2)
-- 목적: SNS 출처 배제, 구글맵 상호명 및 데이터 우선 정제, 미검증/SNS 의존 업체 비공개(unpublished) 처리
-- ※ 규칙: 본 파일은 마이그레이션 정의 파일이며 직접 SQL 실행 금지 준수
--
BEGIN;

-- 1. 확신도 '상' 24개소 비공개(unpublished) 처리 (SNS 단독 출처, 구글맵 상호/핀 불일치, 구글맵 무근거 메뉴)
UPDATE public.businesses
SET status = 'unpublished', updated_at = NOW()
WHERE slug IN ('sorrento-restaurant-bar', 'madam-khanh-restaurant-phu-quoc-2', 'banh-canh-ghe-by-restaurant-seafood', 'oc-dao-an-thoi', 'quan-nhau-binh-dan-hoang-hon-hoang-hon-quan', 'nha-hang-com-nieu-viet-xua-an-thoi', 'wave-cafe-pub-3f-sunset-town', 'eric-kayser-vietnam', 'mixue-ice-cream-and-tea', 'draft-beer-sunset-town-phu-quoc', 'sieu-thi-dat-phuong-nam', 'mimi-fruits-mart', 'at-108-new-an-thoi', 'bloom-spa-phu-quoc-sunset-town', 'gl90s-phu-quoc-laundry-services-sunsetown-ama47-24-24', 'herbal-spa-nail-sunset-town', 'venice-spamedica-phu-quoc', 'sun-group-sunset-town-electric-buggy-service', 'sunset-place-6', 'sunset-place-4', 'sunset-place-8', 'ang-spa-nail', 'lumi-spa-massage', 'wave-spa-2f-sunset-town');

-- 2. 확신도 '중' 27개소 SNS 웹사이트 URL 제거 (호텔 7개소 아고다 작업 보류 제외)
UPDATE public.businesses
SET website_url = NULL, updated_at = NOW()
WHERE slug IN ('bbq-house-for-you', 'trung-nguyen-e-coffee-jenben-hotel', 'nambo-kitchen', 'blue-table-italian-restaurant', 'venice-cafe', 'delhi-darbaar-indian-restaurant-indian-food-in-sunset-town-phu-quoc', 'lagoon-bbq-vietnamese-cuisine', 'mai-huong-restaurant-sunset-town', 'hai-san-ham-ninh', 'wow-que-toi', 'one-boat-restaurant-bar', 'sunset-tiger-tea', 'the-fern-coffee-sea', 'santo-cafe', 'hien-nha-veranda-sunset-town-phu-quoc', 'mango-mango', '68mart-local-mart-for-tourists-dac-san-phu-quoc', 'muoi-mini-mart-sunset-town', 'huong-nguyen-cosmetics', 'dugong-mart', 'pharmacy-amalfi-67-sunset-town-phuong-an-thoi-dac-khu-phu-quoc', 'sunset-bloom-spa', 'candle-spa', 'sunset-spa-phu-quoc', 'cho-dem-vui-fest-bazaar-sunset-town', 'phu-quoc-laundry-giat-say', 'sunset-bazaar-phu-quoc')
  AND (website_url ILIKE '%facebook%' OR website_url ILIKE '%instagram%' OR website_url ILIKE '%tiktok%');

-- 3. 확신도 '하' 16개소 SNS 필드(instagram_url) null 처리 (구글맵 시설 유지)
UPDATE public.businesses
SET instagram_url = NULL, updated_at = NOW()
WHERE slug IN ('starbucks-beach-house-sun-primavera', 'mediterran-sunset-town-greek-italian-restaurant-pizza-pasta-souvlaki', 'mare', 'pho-thin-phu-quoc-top-3-pho-hot-pot', 'the-merchant', 'il-salone-afternoon-tea-lounge-bar', 'cielo', 'sun-bavaria-gastropub', 'gion-bar', 'teatro-club-phu-quo-c', 'sunset-place-7', 'chip-s-spa-nail-58-venice-sunset-town-phu-quoc', 'sunset-place-10', 'sunworld-hon-thom-hon-thom-cable-car-phu-quoc', 'venice-hotel-phu-quoc', 'roma-hotel-phu-quoc');

-- 4. 상호명 구글맵 일치 업데이트 (주요 정제 대상)
UPDATE public.businesses SET public_name = '푸꾸옥 뚱보집 선셋타운 (Phu Quoc Ttungbojip Sunset Town)', google_maps_name = 'Phu Quoc Ttungbojip Sunset Town', updated_at = NOW() WHERE slug = 'sunset-place';
UPDATE public.businesses SET public_name = '하이산캉 푸꾸옥 (Hải Sản Cảng Phú Quốc - Seafood Restaurant)', google_maps_name = 'Hải Sản Cảng Phú Quốc - Seafood Restaurant', updated_at = NOW() WHERE slug = 'sunset-place-1';
UPDATE public.businesses SET public_name = '카페 루남 선셋타운 (RuNam Sunset Town)', google_maps_name = 'RuNam Sunset Town', updated_at = NOW() WHERE slug = 'sunset-place-2';
UPDATE public.businesses SET public_name = '솔라나 스파 선셋타운 (SOLANA Spa Sunset Town Phú Quốc)', google_maps_name = 'SOLANA Spa Sunset Town Phú Quốc', updated_at = NOW() WHERE slug = 'sunset-place-9';
UPDATE public.businesses SET public_name = '선셋타운 아파트먼트 푸꾸옥 (Sunset Town Apartment Phu Quoc)', google_maps_name = 'Sunset Town Apartment Phu Quoc', updated_at = NOW() WHERE slug = 'sunset-town-apartment-phu-quoc';
UPDATE public.businesses SET public_name = '킹 스파 & 마사지 (KING Spa & Massage Sunset Town Phú Quốc)', google_maps_name = 'KING Spa & Massage Sunset Town Phú Quốc', updated_at = NOW() WHERE slug = 'king-spa-massage-sunset-town-phu-quoc-spa-phu-quoc';
UPDATE public.businesses SET public_name = '사쿠라쿄 스파 푸꾸옥 (Sakurakyo Spa Phu Quoc)', google_maps_name = 'Sakurakyo Spa Phu Quoc', updated_at = NOW() WHERE slug = 'sakurakyo-spa-phu-quoc-massage-body-massage-foot';
UPDATE public.businesses SET public_name = '오아시스 스파 (OASIS Spa Massage & Nail (Sunset Town Phu Quoc))', google_maps_name = 'OASIS Spa Massage & Nail (Sunset Town Phu Quoc)', updated_at = NOW() WHERE slug = 'oasis-spa-massage-nail-sunset-town-phu-quoc';
UPDATE public.businesses SET public_name = '미스 띠엔 스파 & 홈스테이 (Miss Tiên Spa & Homestay Phú Quốc Sunset Town)', google_maps_name = 'Miss Tiên Spa & Homestay Phú Quốc Sunset Town', updated_at = NOW() WHERE slug = 'miss-tien-spa-homestay-phu-quoc-sunset-town';
UPDATE public.businesses SET public_name = 'Kem Tràng Tiền - Milan, Thị Trấn Hoàng hôn', google_maps_name = 'Kem Tràng Tiền - Milan, Thị Trấn Hoàng hôn', updated_at = NOW() WHERE slug = 'kem-trang-tien-sunset-town-phu-quoc';
UPDATE public.businesses SET public_name = 'Casa Limone Hotel & Café - Specialty Coffee & Matcha', google_maps_name = 'Casa Limone Hotel & Café - Specialty Coffee & Matcha', updated_at = NOW() WHERE slug = 'casa-limone-phu-quoc-hotel-cafe-specialty-coffee-matcha-bar';
UPDATE public.businesses SET public_name = '투안 끼에우 2 해산물 식당 (Nhà hàng hải sản Thuận Kiều 2 | Seafood & Grill)', google_maps_name = 'Nhà hàng hải sản Thuận Kiều 2 | Seafood & Grill', updated_at = NOW() WHERE slug = 'nha-hang-hai-san-thuan-kieu-2-seafood-grill';

COMMIT;
