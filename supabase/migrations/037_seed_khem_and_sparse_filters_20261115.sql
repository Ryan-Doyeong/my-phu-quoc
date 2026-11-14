-- =============================================================================
-- Supabase Migration: 037_seed_khem_and_sparse_filters_20261115.sql
-- 목적: 선셋타운·안터이 희소 필터 카테고리 검증 업체 14개소 시드 반영,
--       레거시 중복 슬러그 6개소 아카이브(비노출) 동기화, Loop Jacuzzi Bar 필터 태그 보강
-- 참고: Khem Beach 존(khem-beach) 업체 및 호텔은 앱 아키텍처상
--       data/khem-beach-businesses.json 및 data/khem_beach_hotels.json 에서 직접 서빙됨
-- =============================================================================

BEGIN;

-- 1. 코드(HIDDEN_BUSINESS_SLUGS)에서 숨김 처리된 구형/비정규 슬러그 6개소 DB 상태 동기화 (삭제 금지, archived 처리)
UPDATE public.businesses
SET status = 'archived',
    updated_at = NOW()
WHERE slug IN (
  'maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town',
  'pharmacy-amalfi-67-sunset-town-phuong-an-thoi-dac-khu-phu-quoc',
  'nha-thuoc-fpt-long-chau',
  'nha-thuoc-an-khang-phu-quo-c-2',
  'sunset-place-5',
  'maison-kayser-phu-quoc'
) AND status = 'published';

-- 2. 기존 공개 중복 업체 Loop Jacuzzi Bar 필터 태그 보강 (Rooftop Bar / Cocktail Bar 필터 연동)
UPDATE public.businesses
SET tags = ARRAY['Bar', 'Rooftop Bar', 'Cocktail Bar', 'bar', 'Sunset Town']::text[],
    updated_at = NOW()
WHERE slug = 'loop-jacuzzi-bar';

-- 3. 선셋타운 및 안터이/즈엉떠(인근 권역) 검증 신규 업체 14개소 Upsert
-- [local-sunset-301] Maa Indian Restaurant (maa-indian-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'maa-indian-sunset-town', '마 인디안 레스토랑 (Maa Indian Restaurant)', 'dining', 'indian',
  'Pure vegetarian and Jain-friendly Indian restaurant at A172 Amalfi Street in Sunset Town serving North and South Indian curries, paneer specialties, dal tadka, and freshly baked tandoori naan.', 'Nhà hàng Ấn Độ thuần chay (có phục vụ món Jain) tại A172 đường Amalfi, Thị trấn Hoàng Hôn, chuyên các món cà ri phô mai paneer, đậu lăng dal và bánh naan nướng lò đất.', '선셋타운 아말피 거리(A172)에 위치한 순수 채식(Pure Veg) 및 자이나교(Jain) 맞춤 조리가 가능한 인도 전문 레스토랑입니다. 파니르 커리와 달 타드카, 갓 구운 탄두리 난 등 정통 인도 채식 요리를 제공합니다.',
  'A172 Đường Amalfi, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Maa Indian Restaurant Sunset Town', 'https://www.google.com/maps/place/Maa+Indian+Restaurant,+A172+Amalfi,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.0327376,104.0052499,18z', NULL,
  NULL, NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Indian', 'Vegetarian', 'Sunset Town']::text[], '{}'::text[], 10.0327376, 104.0052499,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-302] Swad Kitchen (swad-kitchen-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'swad-kitchen-sunset-town', '스와드 키친 (Swad Kitchen)', 'dining', 'indian',
  'Indian restaurant at 55 Amalfi Street in Sunset Town offering a full menu of both non-vegetarian classics (butter chicken, tandoori chicken, lamb curry, biryani) and traditional vegetarian Indian dishes.', 'Nhà hàng Ấn Độ tại số 55 đường Amalfi, Thị trấn Hoàng Hôn phục vụ đầy đủ cả thực đơn mặn (gà bơ, gà nướng tandoori, cơm biryani) lẫn các món chay Ấn Độ truyền thống.', '선셋타운 아말피 거리 55번지에 자리한 인도 레스토랑으로, 버터 치킨·탄두리 치킨·비리야니 등 육류 메뉴와 전통 인도 채식 커리를 모두 폭넓게 갖추고 있습니다.',
  '55 Đường Amalfi, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Swad Kitchen -3', 'https://www.google.com/maps/place/Swad+Kitchen+-3/@10.0322639,104.0054858,17z/data=!3m1!4b1!4m6!3m5!1s0x31a795006b12d357:0x59f470849037495e!8m2!3d10.0322639!4d104.0054858!16s%2Fg%2F11mrlhrz0r', NULL,
  NULL, NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Indian', 'Sunset Town']::text[], '{}'::text[], 10.0322639, 104.0054858,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-303] Apnaa Indian Dhaba Bistro (apnaa-indian-dhaba-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'apnaa-indian-dhaba-sunset-town', '압나 인디안 다바 비스트로 (Apnaa Indian Dhaba Bistro)', 'dining', 'indian',
  'Casual Indian dhaba-style bistro on Amalfi Street (No. 148) within walking distance of Kiss Bridge in Sunset Town, serving spiced biryanis, garlic naan, tandoori platters, and masala chai.', 'Quán bistro Ấn Độ phong cách dhaba bình dân tại 148 đường Amalfi gần Cầu Hôn (Sunset Town), phục vụ cơm biryani, bánh naan bơ tỏi, đồ nướng tandoori và trà sữa masala.', '선셋타운 키스브릿지 인근 아말피 거리(148번지)에 위치한 캐주얼 인디안 다바(Dhaba) 비스트로로, 향신료 풍미의 비리야니와 갈릭 난, 탄두리 플래터, 마살라 차이를 부담 없이 즐길 수 있습니다.',
  '148 Đường Amalfi, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Apnaa Indian Dhaba Bistro', 'https://www.google.com/maps/place/Apnaa+Indian+Dhaba+Bistro,+148+Amalfi,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.032056,104.005973,18z', NULL,
  NULL, NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Indian', 'Sunset Town']::text[], '{}'::text[], 10.032056, 104.005973,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-304] Maharaja Lounge Sunset Town (maharaja-lounge-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'maharaja-lounge-sunset-town', '마하라자 라운지 선셋타운 (Maharaja Lounge Sunset Town)', 'dining', 'indian',
  '100% pure vegetarian and Jain Indian restaurant at VEN57 Venice Street right beside the Kiss Bridge drop-off plaza in Sunset Town, serving thalis, paneer curries, dosa, and chaat until late evening.', 'Nhà hàng Ấn Độ 100% thuần chay và phục vụ thực đơn Jain tại căn VEN57 đường Venice (cạnh điểm đón trả khách Cầu Hôn, Sunset Town), mở cửa đến tối muộn.', '선셋타운 베니스 거리(VEN57, 키스브릿지 승하차 광장 옆)에 자리한 100% 순수 채식(Pure Veg) 및 자이나교 인도 레스토랑으로, 탈리 세트와 파니르 커리, 도사 등을 늦은 저녁까지 제공합니다.',
  'VEN57 Đường Venice, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Maharaja Lounge - 100% Pure Veg Authentic Indian Restaurant Sunset Town', 'https://www.google.com/maps/place/?q=place_id:ChIJR4_RrzuVpzERTNZI9HaezLk', 'ChIJR4_RrzuVpzERTNZI9HaezLk',
  '+84 971 115 560', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  ARRAY['/covers-photo/maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town-1.webp', '/covers-photo/maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town-2.webp', '/covers-photo/maharaja-lounge-100-pure-veg-authentic-indian-restaurant-sunset-town-3.webp']::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Indian', 'Vegetarian', 'Sunset Town']::text[], '{}'::text[], 10.031921, 104.0045234,
  'high', true, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-305] Lord of the Bao (lord-of-the-bao-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'lord-of-the-bao-sunset-town', '로드 오브 더 바오 (Lord of the Bao)', 'dining', 'chinese',
  'Handcrafted bao bun and dim sum eatery operating at 69 Positano Street and Kiosk P24 inside VuiFest Bazaar in Sunset Town, serving steamed baozi, har gow, siu mai, and quick Chinese-style bites.', 'Quán bánh bao thủ công và dimsum tại số 69 đường Positano cùng gian hàng P24 chợ đêm VuiFest (Sunset Town), phục vụ bánh bao nóng, há cảo và xíu mại hấp tại chỗ.', '선셋타운 포지타노 거리(69번지)와 부이페스트 야시장(P24 부스)에서 만날 수 있는 수제 바오번·딤섬 전문점으로, 갓 쪄낸 폭신한 바오즈와 하가우·샤오마이 등 간편한 중식 딤섬을 선보입니다.',
  '69 Đường Positano & Kiosk P24 VuiFest Bazaar, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Lord of the Bao', 'https://www.google.com/maps/place/Lord+of+the+Bao,+69+Positano,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.032145,104.004916,18z', NULL,
  '+84 56 200 6688', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Chinese', 'Street Food', 'Sunset Town']::text[], '{}'::text[], 10.032145, 104.004916,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-306] Lẩu Tứ Xuyên Chinese Hotpot (lau-tu-xuyen-an-thoi)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'lau-tu-xuyen-an-thoi', '러우 뜨 쑤옌 사천 훠궈 (Lẩu Tứ Xuyên Chinese Hotpot)', 'dining', 'chinese',
  'Neighborhood Sichuan-style Chinese hotpot restaurant in An Thới town (1 Lê Quý Đôn, about 5–8 minutes by taxi from Sunset Town) serving spicy mala and dual-broth hotpots with sliced meats, local seafood, and vegetables.', 'Quán lẩu Tứ Xuyên tại số 1 Lê Quý Đôn, Khu phố 2, An Thới (cách Sunset Town khoảng 5–8 phút đi taxi), phục vụ lẩu cay mala và lẩu uyên ương hai ngăn với thịt bò, hải sản tươi.', '선셋타운에서 택시로 약 5~8분 거리인 안터이 시내(1 Lê Quý Đôn)에 위치한 정통 사천식 훠궈 식당으로, 얼얼한 마라 육수와 반반 훠궈에 신선한 해산물·육류·채소를 곁들여 저녁 식사로 즐기기 좋습니다.',
  '1 Đường Lê Quý Đôn, Khu phố 2, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Lẩu Tứ Xuyên An Thới', 'https://www.google.com/maps/place/L%E1%BA%A9u+T%E1%BB%A9+Xuy%C3%AAn,+1+L%C3%AA+Qu%C3%BD+%C4%90%C3%B4n,+Khu+2,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.01815,104.01412,18z', NULL,
  '+84 346 518 916', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Chinese', 'Nearby (An Thoi)']::text[], ARRAY['Nearby (An Thoi)']::text[], 10.01815, 104.01412,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-307] Maison Kayser Sunset Town (maison-kayser-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'maison-kayser-sunset-town', '메종 카이저 선셋타운 (Maison Kayser Sunset Town)', 'bars', 'cafe',
  'French artisan bakery and breakfast cafe located near Hon Thom Cable Car Station in Sunset Town, serving sourdough breads, butter croissants, tarts, sandwiches, and espresso drinks from early morning.', 'Tiệm bánh nghệ nhân Pháp và cà phê ăn sáng nằm gần Ga cáp treo Hòn Thơm tại Thị trấn Hoàng Hôn, phục vụ bánh sừng bò bơ Pháp, bánh mì sourdough, bánh ngọt và cà phê từ sáng sớm.', '선셋타운 혼똔 케이블카 탑승장 인근 중앙 광장에 자리한 프랑스 아티장 베이커리 카페입니다. 이른 아침부터 사워도우 바게트와 버터 크루아상, 타르트, 샌드위치 및 커피로 가벼운 조식을 해결하기 좋습니다.',
  'Central Square (Near Cable Car Station), Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Maison Kayser Phu Quoc', 'https://www.google.com/maps/place/?q=place_id:ChIJ51OpPgCVpzER-TzMZtCOk0o', 'ChIJ51OpPgCVpzER-TzMZtCOk0o',
  NULL, NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  ARRAY['/covers-photo/maison-kayser-phu-quoc-1.webp', '/covers-photo/maison-kayser-phu-quoc-2.webp', '/covers-photo/maison-kayser-phu-quoc-3.webp', '/covers-photo/maison-kayser-phu-quoc-4.webp', '/covers-photo/maison-kayser-phu-quoc-5.webp']::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Cafe', 'Dessert Cafe', 'Sunset Town']::text[], '{}'::text[], 10.0300125, 104.0068281,
  'high', true, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-308] Ngọc Hiền Pearl Farm & Showroom (ngoc-hien-pearl-phu-quoc)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'ngoc-hien-pearl-phu-quoc', '응옥 히엔 진주 농장 & 쇼룸 (Ngọc Hiền Pearl Farm & Showroom)', 'shopping', 'pearls',
  'Established Phu Quoc cultured pearl farm and showroom on Trần Hưng Đạo Road in Dương Tơ (along the route between the airport and South Island), providing pearl-cultivation displays and certified jewelry with authenticity warranties.', 'Cơ sở nuôi cấy và showroom trưng bày ngọc trai Ngọc Hiền trên đường Trần Hưng Đạo, Dương Tơ (trục đường sân bay đi Nam đảo), cung cấp trang sức ngọc trai kèm giấy chứng nhận và bảo hành chính hãng.', '공항과 남부(선셋타운) 이동 경로인 즈엉떠(Dương Tơ) 쩐흥다오 대로변에 위치한 푸꾸옥 대표 진주 양식장 겸 대형 쇼룸입니다. 진주 양식 과정 관람이 가능하며 정품 보증서가 포함된 진주 주얼리를 정찰제로 판매합니다.',
  'Đường Trần Hưng Đạo, Tổ 1, Ấp Dương Tơ, Dương Tơ, Phú Quốc, Kiên Giang, Vietnam', 'Ngọc Hiền Pearl Farm', 'https://www.google.com/maps/place/Ng%E1%BB%8Dc+Hi%E1%BB%81n+Pearl+Farm+%26+Showroom,+%C4%90%C6%B0%E1%BB%9Dng+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o,+D%C6%B0%C6%A1ng+T%C6%A1,+Ph%C3%BA+Qu%E1%BB%91c/@10.1700915,103.9702375,17z', NULL,
  '+84 933 221 221', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Pearls', 'Souvenirs', 'Nearby (An Thoi)']::text[], ARRAY['Nearby (An Thoi)']::text[], 10.1700915, 103.9702375,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-309] Nhà Thùng Nước Mắm Phụng Hưng (phung-hung-fish-sauce-an-thoi)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'phung-hung-fish-sauce-an-thoi', '풍흥 느억맘 전통 발효장 (Nhà Thùng Nước Mắm Phụng Hưng)', 'shopping', 'local_specialties',
  'Traditional wooden-barrel anchovy fish sauce house on Nguyễn Văn Cừ Road directly opposite Phú Quốc Coconut Prison in An Thới, selling Phu Quoc pepper, sim wine, dried seafood, and specialty gift sets (note airline carry-on restrictions on bottled fish sauce).', 'Nhà thùng nước mắm truyền thống nằm đối diện Di tích Nhà tù Phú Quốc trên đường Nguyễn Văn Cừ (An Thới), trưng bày thùng gỗ ủ chượp cá cơm và bán hồ tiêu Phú Quốc, rượu sim, đặc sản đóng gói.', '안터이 코코넛 수용소(푸꾸옥 감옥) 바로 맞은편 응우옌반꾸 대로에 자리한 전통 목조 발효통 느억맘(멸치 액젓) 제조장 겸 특산품 매장입니다. 푸꾸옥 통후추, 심 와인, 건어물 기념품을 함께 구매할 수 있습니다(액젓 병은 항공 기내 반입 제한 유의).',
  '471 Đường Nguyễn Văn Cừ (Opposite Phú Quốc Prison), Khu phố 4, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Nhà thùng nước mắm Phụng Hưng', 'https://www.google.com/maps/place/Nh%C3%A0+Th%C3%B9ng+N%C6%B0%E1%BB%9Bc+M%E1%BA%AFm+Ph%E1%BB%A5ng+H%C6%B0ng,+471+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.04358,104.01835,17z', NULL,
  '+84 297 3844 063', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Local Specialties', 'Souvenirs', 'Nearby (An Thoi)']::text[], ARRAY['Nearby (An Thoi)']::text[], 10.04358, 104.01835,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-310] Phu Quoc Craft Link (phu-quoc-craft-link-vuifest)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'phu-quoc-craft-link-vuifest', '푸꾸옥 크래프트 링크 (Phu Quoc Craft Link)', 'shopping', 'souvenirs',
  'Fair-trade handicraft boutique inside VuiFest Bazaar in Sunset Town open daily from 16:00 to midnight, offering handwoven ethnic minority textiles, embroidered bags, ceramics, and eco-friendly coastal decor.', 'Cửa hàng thủ công mỹ nghệ thương mại công bằng nằm trong chợ đêm VuiFest Bazaar (Sunset Town), mở cửa 16:00–24:00 với các sản phẩm thổ cẩm dân tộc, gốm sứ và quà lưu niệm thân thiện môi trường.', '선셋타운 부이페스트 야시장(VuiFest Bazaar) 내에서 매일 오후 4시부터 자정까지 운영되는 공정무역 수공예 기프트숍으로, 베트남 소수민족 수직물 가방·파우치, 도자기, 친환경 바다 테마 소품을 판매합니다.',
  'VuiFest Bazaar, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Phú Quốc Craft Link', 'https://www.google.com/maps/place/Ph%C3%BA+Qu%E1%BB%91c+Craft+Link,+VuiFest+Bazaar,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.0351871,104.0026051,18z', NULL,
  NULL, NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Souvenirs', 'Local Specialties', 'Sunset Town']::text[], '{}'::text[], 10.0351871, 104.0026051,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-311] Chợ An Thới (An Thoi Market) (cho-an-thoi-fresh-market)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'cho-an-thoi-fresh-market', '안터이 재래시장 (Chợ An Thới)', 'shopping', 'fresh_market',
  'Bustling local daytime wet and fruit market near An Thới Port (about 5–10 minutes by taxi from Sunset Town), best visited in the morning for seasonal tropical fruits, dried squid and shrimp, cashews, and everyday local snacks.', 'Chợ dân sinh truyền thống sầm uất nhất khu vực Nam đảo gần cảng An Thới (cách Sunset Town 5–10 phút đi xe), bày bán trái cây nhiệt đới theo mùa, hải sản tươi và khô mực, tôm khô.', '선셋타운에서 차량 약 5~10분 거리인 안터이 항구 인근 남부 최대 로컬 재래시장입니다. 오전 시간대에 방문하면 망고·망고스틴 등 제철 열대과일과 건오징어·건새우, 캐슈넛 등 현지 먹거리를 저렴하게 구입할 수 있습니다(소액 현금 지참 권장).',
  'Đường Nguyễn Văn Cừ (Near An Thới Port), Khu phố 1, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Chợ An Thới', 'https://www.google.com/maps/place/Ch%E1%BB%A3+An+Th%E1%BB%9Bi,+%C4%90%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.0176177,104.0137681,18z', NULL,
  NULL, NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  '{}'::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Fresh Market', 'Local Specialties', 'Nearby (An Thoi)']::text[], ARRAY['Nearby (An Thoi)']::text[], 10.0176177, 104.0137681,
  'high', false, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-312] Pharmacy Amalfi 67 (pharmacy-amalfi-67-sunset-town)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'pharmacy-amalfi-67-sunset-town', '아말피 67 약국 (Pharmacy Amalfi 67)', 'shopping', 'pharmacy',
  'Walkable retail pharmacy right inside Sunset Town at unit Amalfi 67 stocking over-the-counter pain relievers, digestive and motion-sickness medicine, bandages, mosquito repellent, and sunburn ointment until late night.', 'Nhà thuốc nằm ngay trung tâm Thị trấn Hoàng Hôn tại căn Amalfi 67, mở cửa đến khuya, cung cấp thuốc hạ sốt, giảm đau, tiêu hóa, chống say tàu xe, xịt muỗi và kem bôi dịu nắng.', '선셋타운 중심부 아말피 67호에 위치해 도보로 바로 방문할 수 있는 약국입니다. 해열진통제, 소화제·지사제, 멀미약, 모기 기피제, 화상·상처 연고 등 여행자 상비약을 늦은 밤까지 구비하고 있습니다.',
  'Căn Amalfi 67, Sunset Town, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Pharmacy Amalfi 67 sunset town phường an thới đặc khu phú quốc', 'https://www.google.com/maps/place/?q=place_id:ChIJgeZqD5SVpzERoy7NGQ43Sy8', 'ChIJgeZqD5SVpzERoy7NGQ43Sy8',
  '+84 868 681 994', NULL, '{"raw": "08:00–23:00"}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  ARRAY['/covers-photo/pharmacy-amalfi-67-sunset-town-phuong-an-thoi-dac-khu-phu-quoc-1.webp', '/covers-photo/pharmacy-amalfi-67-sunset-town-phuong-an-thoi-dac-khu-phu-quoc-2.webp', '/covers-photo/pharmacy-amalfi-67-sunset-town-phuong-an-thoi-dac-khu-phu-quoc-3.webp']::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Pharmacy', 'Essentials', 'Sunset Town']::text[], '{}'::text[], 10.0325402, 104.0051013,
  'high', true, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-313] Nhà Thuốc FPT Long Châu An Thới (fpt-long-chau-an-thoi)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'fpt-long-chau-an-thoi', 'FPT 롱쩌우 약국 안터이점 (Nhà Thuốc FPT Long Châu An Thới)', 'shopping', 'pharmacy',
  'Branch of Vietnam''s largest nationwide pharmacy chain at 46 Nguyễn Văn Cừ in An Thới, offering transparent fixed barcode pricing, licensed pharmacists, international brand medications, and card payment.', 'Chi nhánh hệ thống nhà thuốc lớn hàng đầu Việt Nam tại số 46 Nguyễn Văn Cừ, An Thới, bán đúng giá niêm yết toàn hệ thống, có dược sĩ tư vấn và hỗ trợ thanh toán thẻ.', '안터이 중심 대로(46 Nguyễn Văn Cừ)에 위치한 베트남 최대 전국 프랜차이즈 약국 체인점입니다. 전 품목 바코드 정찰제로 투명하게 운영되며 전문 약사 상담과 해외 신용카드 결제가 가능합니다.',
  '46 Đường Nguyễn Văn Cừ, Khu phố 3, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Nhà Thuốc FPT Long Châu', 'https://www.google.com/maps/place/?q=place_id:ChIJY5o0asSXpzERJEewEY1Dy9U', 'ChIJY5o0asSXpzERJEewEY1Dy9U',
  '1800 6928', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  ARRAY['/covers-photo/nha-thuoc-fpt-long-chau-1.webp', '/covers-photo/nha-thuoc-fpt-long-chau-2.webp', '/covers-photo/nha-thuoc-fpt-long-chau-3.webp', '/covers-photo/nha-thuoc-fpt-long-chau-4.webp', '/covers-photo/nha-thuoc-fpt-long-chau-5.webp']::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Pharmacy', 'Essentials', 'Nearby (An Thoi)']::text[], ARRAY['Nearby (An Thoi)']::text[], 10.0182266, 104.0146462,
  'high', true, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- [local-sunset-314] Nhà Thuốc An Khang An Thới (nha-thuoc-an-khang-an-thoi)
INSERT INTO public.businesses (
  slug, public_name, category, subcategory,
  description_en, description_vi, description_ko,
  address, google_maps_name, google_maps_url, google_place_id,
  phone, website_url, opening_hours,
  status, verification_status, verification_note,
  gallery_urls, price_level, highlights, services,
  source_label, tags, badges, lat, lng,
  data_confidence, photo_permission, published_at, updated_at
) VALUES (
  'nha-thuoc-an-khang-an-thoi', '안캉 약국 안터이점 (Nhà Thuốc An Khang An Thới)', 'shopping', 'pharmacy',
  'Fixed-price Mobile World Group chain pharmacy on Nguyễn Văn Cừ Street in An Thới offering verified origin OTC medicines, pediatric fever reducers, rehydration salts, sunscreen, and international card payments.', 'Nhà thuốc chuỗi chính hãng thuộc tập đoàn Thế Giới Di Động trên đường Nguyễn Văn Cừ, An Thới, cam kết thuốc rõ nguồn gốc, giá niêm yết minh bạch và chấp nhận thanh toán thẻ quốc tế.', '안터이 응우옌반꾸 거리(더저이이동 매장 옆)에 위치한 대기업 계열 정찰제 체인 약국으로, 정품 일반의약품·어린이 해열제·전해질 보충제·선케어 제품을 정가에 구매할 수 있으며 해외 카드 결제를 지원합니다.',
  'Đường Nguyễn Văn Cừ, Khu phố 3, An Thới, Phú Quốc, Kiên Giang, Vietnam', 'Nhà thuốc An Khang', 'https://www.google.com/maps/place/?q=place_id:ChIJuYW74Y2XpzERIbXTGTiotEU', 'ChIJuYW74Y2XpzERIbXTGTiotEU',
  '1900 1572', NULL, '{}'::jsonb,
  'published', 'verified', 'Validated directory expansion seed 2026-11-15',
  ARRAY['/covers-photo/sunset-place-5-1.webp', '/covers-photo/sunset-place-5-2.webp', '/covers-photo/sunset-place-5-3.webp', '/covers-photo/sunset-place-5-4.webp', '/covers-photo/sunset-place-5-5.webp']::text[], NULL, '[]'::jsonb, '[]'::jsonb,
  NULL, ARRAY['Pharmacy', 'Essentials', 'Nearby (An Thoi)']::text[], ARRAY['Nearby (An Thoi)']::text[], 10.0188201, 104.0152307,
  'high', true, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  google_place_id = COALESCE(EXCLUDED.google_place_id, public.businesses.google_place_id),
  phone = COALESCE(EXCLUDED.phone, public.businesses.phone),
  website_url = COALESCE(EXCLUDED.website_url, public.businesses.website_url),
  opening_hours = EXCLUDED.opening_hours,
  status = 'published',
  verification_status = 'verified',
  gallery_urls = CASE WHEN array_length(EXCLUDED.gallery_urls, 1) > 0 THEN EXCLUDED.gallery_urls ELSE public.businesses.gallery_urls END,
  price_level = EXCLUDED.price_level,
  highlights = EXCLUDED.highlights,
  services = EXCLUDED.services,
  tags = EXCLUDED.tags,
  badges = EXCLUDED.badges,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  photo_permission = EXCLUDED.photo_permission OR public.businesses.photo_permission,
  updated_at = NOW();

-- 4. 선택적 다국어 컬럼(021_multilingual_7_langs 적용 환경용) 조건부 반영
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'businesses' AND column_name = 'description_zh'
  ) THEN
    UPDATE public.businesses SET description_zh = '位于日落小镇阿马尔菲街（A172）的纯素食及耆那教友好印度餐厅，供应北印与南印咖喱、印度奶酪（Paneer）、扁豆咖喱及现烤馕饼。', description_ru = 'Вегетарианский индийский ресторан (включая меню джайн) на улице Amalfi, A172 в Сансет-Тауне: карри с паниром, дал тадка и свежие лепёшки наан из тандыра.', description_ja = 'サンセットタウンのアマルフィ通り（A172）にあるピュアベジタリアン＆ジャイナ教対応のインド料理店。パニールカレーやダル、焼きたてタンドリーナンを提供しています。', description_hi = 'सनसेट टाउन के अमाल्फ़ी स्ट्रीट (A172) पर स्थित शुद्ध शाकाहारी (Pure Veg) और जैन भोजन उपलब्ध कराने वाला भारतीय रेस्तरां, जहाँ पनीर करी, दाल तड़का और ताज़ा तंदूरी नान परोसे जाते हैं।' WHERE slug = 'maa-indian-sunset-town';
    UPDATE public.businesses SET description_zh = '位于日落小镇阿马尔菲街55号的印度餐厅，同时提供黄油鸡、坦都里烤鸡、印度香饭等荤食经典菜品以及丰富的传统素食印度料理。', description_ru = 'Индийский ресторан на улице Amalfi, 55 в Сансет-Тауне: в меню представлены как мясные блюда (баттер-чикен, цыплёнок тандури, бирьяни), так и вегетарианская классика.', description_ja = 'サンセットタウンのアマルフィ通り55番地にあるインドレストラン。バターチキンやタンドリーチキン、ビリヤニなどの肉料理と伝統的なベジタリアン料理の両方を揃え、幅広い好みに応えます。', description_hi = 'सनसेट टाउन में 55 अमाल्फ़ी स्ट्रीट पर स्थित भारतीय रेस्तरां, जहाँ नॉन-वेज (बटर चिकन, तंदूरी चिकन, बिरयानी) और शाकाहारी दोनों तरह के प्रामाणिक भारतीय व्यंजन मिलते हैं।' WHERE slug = 'swad-kitchen-sunset-town';
    UPDATE public.businesses SET description_zh = '位于日落小镇阿马尔菲街（148号）、邻近接吻桥的休闲印度小馆（Dhaba 风格），供应印度香饭、蒜香烤馕、坦都里拼盘与玛萨拉奶茶。', description_ru = 'Демократичное индийское бистро в стиле дхаба на улице Amalfi (д. 148) недалеко от Моста Поцелуев в Сансет-Тауне: бирьяни, чесночный наан, блюда из тандыра и масала-чай.', description_ja = 'サンセットタウンのキスブリッジ近く、アマルフィ通り（148番）にあるカジュアルなインディアン・ダバ（大衆食堂）風ビストロ。ビリヤニやナン、タンドリー料理を気軽に楽しめます。', description_hi = 'सनसेट टाउन में किस ब्रिज के पास अमाल्फ़ी स्ट्रीट (148) पर स्थित कैज़ुअल इंडियन ढाबा बिस्ट्रो, जहाँ बिरयानी, गार्लिक नान, तंदूरी प्लैटर और मसाला चाय परोसी जाती है।' WHERE slug = 'apnaa-indian-dhaba-sunset-town';
    UPDATE public.businesses SET description_zh = '位于日落小镇威尼斯街（VEN57，紧邻接吻桥上下车广场）的100%纯素及耆那教正宗印度餐厅，供应印式拼盘（Thali）、奶酪咖喱与南印薄饼至深夜。', description_ru = 'На 100% вегетарианский и джайнский индийский ресторан на улице Venice (VEN57, рядом с площадкой у Моста Поцелуев): тхали, карри с паниром и закуски чаат допоздна.', description_ja = 'サンセットタウンのヴェニス通り（VEN57、キスブリッジ乗降場横）にある100%ピュアベジタリアン＆ジャイナ教対応の本格インド料理店。ターリーやパニールカレーを夜遅くまで提供しています。', description_hi = 'सनसेट टाउन के वेनिस स्ट्रीट (VEN57, किस ब्रिज ड्रॉप-ऑफ़ के पास) पर स्थित 100% शुद्ध शाकाहारी और जैन भारतीय रेस्तरां, जहाँ थाली, पनीर व्यंजन, डोसा और चाट देर शाम तक मिलते हैं।' WHERE slug = 'maharaja-lounge-sunset-town';
    UPDATE public.businesses SET description_zh = '位于日落小镇波西塔诺街69号及 VuiFest 夜市 P24 摊位的手工刈包与广式点心专门店，现蒸包点、虾饺、烧卖等中式小吃堂食外带皆宜。', description_ru = 'Закусочная ручных паровых булочек бао и димсамов на улице Positano, 69 и в павильоне P24 ночного рынка VuiFest в Сансет-Тауне.', description_ja = 'サンセットタウンのポジターノ通り69番地およびVuiFestナイトマーケット（P24）で営業する手作りパオ（中華まん）・点心専門店。蒸したてのバオや海老餃子・焼売を気軽に味わえます。', description_hi = 'सनसेट टाउन में 69 पोसिटानो स्ट्रीट और VuiFest बाज़ार (P24) पर स्थित हैंडक्राफ़्टेड बाओ बन और डिम सम रेस्तरां, जहाँ ताज़ा स्टीम्ड बाओज़ी और चाइनीज़ स्नैक्स मिलते हैं।' WHERE slug = 'lord-of-the-bao-sunset-town';
    UPDATE public.businesses SET description_zh = '位于安泰镇（1 Lê Quý Đôn，距日落小镇乘车约5至8分钟）的川味中式火锅店，主打麻辣锅与鸳鸯锅底，搭配现切肉类、当地海鲜与时令蔬菜。', description_ru = 'Ресторан китайского сычуаньского хого в городке Ан Тхой (1 Lê Quý Đôn, 5–8 минут на такси от Сансет-Тауна): острый бульон мала и двойные котлы с мясом и морепродуктами.', description_ja = 'サンセットタウンからタクシーで約5〜8分のアントイ市街（1 Lê Quý Đôn）にある四川風中華火鍋店。麻辣スープや二色鍋で肉・地元産魚介・野菜を堪能できます。', description_hi = 'सनसेट टाउन से टैक्सी द्वारा लगभग 5–8 मिनट दूर अन थोई कस्बे (1 Lê Quý Đôn) में स्थित सिचुआन चाइनीज़ हॉटपॉट रेस्तरां, जहाँ मसालेदार माला और डबल-ब्रॉथ हॉटपॉट परोसा जाता है।' WHERE slug = 'lau-tu-xuyen-an-thoi';
    UPDATE public.businesses SET description_zh = '位于日落小镇跨海缆车站旁中央广场的法国手工烘焙咖啡馆，清晨起供应天然酵母法棍、黄油牛角包、法式挞点、三明治与意式咖啡，适合早餐小憩。', description_ru = 'Французская ремесленная пекарня и кафе для завтраков рядом со станцией канатной дороги в Сансет-Тауне: круассаны на сливочном масле, хлеб на закваске, сэндвичи и кофе с утра.', description_ja = 'サンセットタウンのケーブルカー駅近くに構えるフランスのアルティザン・ベーカリーカフェ。朝早くからクロワッサンやバゲットサンド、タルト、コーヒーを味わえます。', description_hi = 'सनसेट टाउन में केबल कार स्टेशन के पास स्थित फ़्रेंच आर्टिज़न बेकरी और ब्रेकफ़ास्ट कैफ़े, जहाँ सुबह से ही ताज़ा क्रोसां, ब्रेड, सैंडविच और कॉफ़ी उपलब्ध रहती है।' WHERE slug = 'maison-kayser-sunset-town';
    UPDATE public.businesses SET description_zh = '位于杨丝社（Dương Tơ，机场前往南岛日落小镇必经干道）的富国岛知名珍珠养殖场与展厅，可了解海水珍珠培育过程，并提供附正品鉴定证书的珍珠首饰。', description_ru = 'Известная жемчужная ферма и шоурум на улице Trần Hưng Đạo в районе Dương Tơ (по пути из аэропорта на юг острова): знакомство с выращиванием жемчуга и украшения с сертификатом подлинности.', description_ja = '空港と南部サンセットタウンを結ぶズオントー地区（Trần Hưng Đạo通り）にあるフーコック代表的な真珠養殖場＆ショールーム。養殖工程の見学ができ、品質保証書付きの真珠ジュエリーを購入できます。', description_hi = 'दुओंग तो (एयरपोर्ट और साउथ आइलैंड के मार्ग पर Trần Hưng Đạo रोड) में स्थित प्रमाणित फू क्वोक पर्ल फ़ार्म और शोरूम, जहाँ प्रामाणिकता वारंटी के साथ असली मोती के आभूषण मिलते हैं।' WHERE slug = 'ngoc-hien-pearl-phu-quoc';
    UPDATE public.businesses SET description_zh = '位于安泰镇阮文渠路（富国岛椰子监狱正对面）的传统木桶鱼露酿造坊兼特产店，可参观巨大木制发酵桶并选购富国胡椒、桃金娘酒与海味干货（注意瓶装鱼露不可随身登机）。', description_ru = 'Традиционная фабрика рыбного соуса в деревянных бочках на улице Nguyễn Văn Cừ напротив Кокосовой тюрьмы в Ан Тхое: фукуокский перец, миртовое вино и местные деликатесы (учитывайте правила авиаперевозки соуса).', description_ja = 'アントイのココナッツ収容所（フーコック刑務所）向かいにある伝統的な木樽ヌクマム（魚醤）醸造所兼特産品店。フーコック胡椒やシムワインも揃います（魚醤ボトルの航空機持ち込み制限に注意）。', description_hi = 'अन थोई में कोकोनट प्रिज़न के ठीक सामने स्थित पारंपरिक फ़िश सॉस बैरल हाउस और स्थानीय विशेषता दुकान, जहाँ फू क्वोक काली मिर्च और स्थानीय उपहार मिलते हैं।' WHERE slug = 'phung-hung-fish-sauce-an-thoi';
    UPDATE public.businesses SET description_zh = '位于日落小镇 VuiFest 海滨夜市内的公平贸易手工艺礼品店（每日16:00至午夜营业），售卖越南少数民族手工织锦包袋、陶瓷器皿与海洋环保文创纪念品。', description_ru = 'Магазин ремесленных сувениров честной торговли на ночном рынке VuiFest в Сансет-Тауне (16:00–24:00): домотканый текстиль малых народов Вьетнама, керамика и эко-декор.', description_ja = 'サンセットタウンのVuiFestナイトマーケット内にあるフェアトレード手工芸ショップ（16:00〜24:00営業）。ベトナム少数民族の手織り布バッグや陶器、海モチーフのエコ雑貨が揃います。', description_hi = 'सनसेट टाउन के VuiFest नाइट मार्केट में स्थित फ़ेयर-ट्रेड हैंडीक्राफ़्ट दुकान (शाम 4 बजे से मध्यरात्रि तक खुली), जहाँ पारंपरिक हथकरघा बैग, सिरेमिक और स्मृति-चिह्न मिलते हैं।' WHERE slug = 'phu-quoc-craft-link-vuifest';
    UPDATE public.businesses SET description_zh = '靠近安泰港的南岛最大本地日间菜市场与水果市场（距日落小镇乘车约5至10分钟），适合上午前往选购当季热带水果、鱿鱼干、虾干与腰果（建议备好越南盾现金）。', description_ru = 'Колоритный дневной местный рынок у порта Ан Тхой (5–10 минут на такси от Сансет-Тауна): свежие тропические фрукты, сушёные морепродукты и орехи кешью по местным ценам.', description_ja = 'アントイ港近くにある南部最大のローカル市場（サンセットタウンから車で約5〜10分）。午前中の訪問がおすすめで、旬の南国フルーツやスルメ・干しエビ、カシューナッツを手頃に購入できます。', description_hi = 'अन थोई पोर्ट के पास स्थित स्थानीय ताज़ा फल और सीफ़ूड बाज़ार (सनसेट टाउन से टैक्सी द्वारा 5–10 मिनट), जहाँ मौसमी उष्णकटिबंधीय फल और सूखे समुद्री उत्पाद मिलते हैं।' WHERE slug = 'cho-an-thoi-fresh-market';
    UPDATE public.businesses SET description_zh = '位于日落小镇中心阿马尔菲街67号、步行即可到达的药房，营业至深夜，备有退烧止痛药、肠胃药、晕船晕车药、驱蚊液及晒伤烫伤药膏等旅行常备药品。', description_ru = 'Аптека в самом центре Сансет-Тауна (Amalfi 67) в пешей доступности от отелей: безрецептурные обезболивающие, средства от расстройства желудка и укачивания, репелленты и мази от ожогов.', description_ja = 'サンセットタウン中心部のアマルフィ67番にあり徒歩で立ち寄れる薬局。解熱鎮痛剤や胃腸薬、酔い止め、虫除け、日焼け・傷薬などの旅行用常備薬を夜遅くまで取り扱っています。', description_hi = 'सनसेट टाउन के भीतर अमाल्फ़ी 67 में पैदल दूरी पर स्थित फ़ार्मेसी, जहाँ देर रात तक दर्द निवारक, पाचन व मोशन-सिकनेस की दवाइयाँ, मच्छर रोधी स्प्रे और प्राथमिक उपचार सामग्री मिलती है।' WHERE slug = 'pharmacy-amalfi-67-sunset-town';
    UPDATE public.businesses SET description_zh = '位于安泰镇阮文渠路46号的越南最大全国连锁药房分店，全店商品实行透明条码明码标价，配有执业药师，备齐国际品牌常备药并支持国际信用卡支付。', description_ru = 'Филиал крупнейшей всевьетнамской аптечной сети на улице Nguyễn Văn Cừ, 46 в Ан Тхое: фиксированные цены по штрихкоду, лицензированные фармацевты и оплата банковскими картами.', description_ja = 'アントイ中心部のグエン・ヴァン・クー通り46番地にあるベトナム最大手薬局チェーン店。全品バーコードによる明朗な定価販売で、薬剤師が常駐し国際クレジットカード決済にも対応しています。', description_hi = 'अन थोई में 46 Nguyễn Văn Cừ पर स्थित वियतनाम की प्रमुख फ़ार्मेसी चेन की शाखा, जहाँ पारदर्शी तय कीमतों पर प्रमाणित दवाइयाँ मिलती हैं और कार्ड भुगतान स्वीकार किया जाता है।' WHERE slug = 'fpt-long-chau-an-thoi';
    UPDATE public.businesses SET description_zh = '位于安泰镇阮文渠路（紧邻 Thế Giới Di Động 门店）的大型集团直营明码标价连锁药房，供应正品非处方药、儿童退烧药、口服补液盐及防晒护肤品，支持国际银行卡付款。', description_ru = 'Сетевая аптека с фиксированными ценами на улице Nguyễn Văn Cừ в Ан Тхое: сертифицированные препараты, детские жаропонижающие, электролиты, солнцезащитные средства и оплата международными картами.', description_ja = 'アントイのグエン・ヴァン・クー通りにある大手グループ運営の定価制チェーン薬局。市販薬や子ども用解熱剤、経口補水塩、日焼け止めを明朗価格で販売し、海外カード決済に対応しています。', description_hi = 'अन थोई में Nguyễn Văn Cừ रोड पर स्थित तय कीमतों वाली प्रतिष्ठित चेन फ़ार्मेसी, जहाँ प्रमाणित ओटीसी दवाइयाँ और प्राथमिक उपचार उत्पाद अंतरराष्ट्रीय कार्ड भुगतान सुविधा के साथ उपलब्ध हैं।' WHERE slug = 'nha-thuoc-an-khang-an-thoi';
  END IF;
END $$;

COMMIT;
