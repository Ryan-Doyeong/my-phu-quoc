-- =============================================================================
-- Supabase Migration: 039_fix_pr119_seed_gmaps_20261115.sql
-- 변경 사유: PR #119(037_seed_khem_and_sparse_filters) 신규 편입 업종에 대한
--           빌트인 브라우저 전수 실측 기반 Place 프로필 승격, 빈 지도 리다이렉트 URL 제거,
--           영구 폐업(폐업함) 업소 비공개 전환 및 누락 좌표 SSOT 백필
-- 선행 마이그레이션:
--   - 037_seed_khem_and_sparse_filters_20261115.sql
--   - 038_fix_gmaps_p2_standardization_20261115.sql
-- 작성 기준일: 2026-11-15
--
-- 대상 슬러그 목록 (Target Slugs):
--   [1] PR #119 신규 편입 업소 중 확정 Google Place ID(`ChIJ...`) 승격 (6개소 + Khem 방어 2개소)
--       - maa-indian-sunset-town
--       - swad-kitchen-sunset-town
--       - apnaa-indian-dhaba-sunset-town
--       - lord-of-the-bao-sunset-town
--       - ngoc-hien-pearl-phu-quoc
--       - phung-hung-fish-sauce-an-thoi
--       - min-spa-melodia-khem-beach (DB 행 존재 시 동기화)
--       - sun-hotel-khem-beach (DB 행 존재 시 동기화)
--   [2] Google Maps 공식 엔티티 프로필(`!1s0x...:0x...`) 승격 — ChIJ 미발급 POI Zero Hallucination 준수 (2개소)
--       - phu-quoc-craft-link-vuifest
--       - cho-an-thoi-fresh-market
--   [3] Critical: Google Maps 영구 폐업(`폐업함 / Permanently closed`) 적발 업소 비공개 전환 (1개소)
--       - lau-tu-xuyen-an-thoi (`status = 'private'`, 데이터 삭제 없이 보존)
--   [4] 공개 업소 누락 좌표 백필 (1개소)
--       - casepia-kitchen-and-lounge
-- =============================================================================

BEGIN;

-- 1. PR #119 신규 편입 업소 확정 Google Place ID 및 실측 좌표 반영
UPDATE public.businesses
SET google_place_id = 'ChIJ4VVaNjOVpzERHr3Zajuks9w',
    google_maps_name = 'Maa Indian 100% Vegetarian Restaurant - Indian Restaurant in Sunset Town',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJ4VVaNjOVpzERHr3Zajuks9w',
    lat = 10.0303872,
    lng = 104.0066568,
    updated_at = NOW()
WHERE slug = 'maa-indian-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJV9MSawCVpzERXkk3kIRw9Fk',
    google_maps_name = 'Swad Kitchen -3',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJV9MSawCVpzERXkk3kIRw9Fk',
    lat = 10.0322639,
    lng = 104.0054858,
    updated_at = NOW()
WHERE slug = 'swad-kitchen-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJSUJb5mqXpzERz_eLitIIBRw',
    google_maps_name = 'APNAA INDIAN DHABA BISTRO',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJSUJb5mqXpzERz_eLitIIBRw',
    lat = 10.0319717,
    lng = 104.0060593,
    updated_at = NOW()
WHERE slug = 'apnaa-indian-dhaba-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJP7ucaeCVpzERhJvju25r54Y',
    google_maps_name = 'Lord of the Bao - Dimsum & Baozi',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJP7ucaeCVpzERhJvju25r54Y',
    lat = 10.0355412,
    lng = 104.0028694,
    updated_at = NOW()
WHERE slug = 'lord-of-the-bao-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJG0ygU8-NpzERXtcRcF0Av7k',
    google_maps_name = 'Ngọc Hiền Pearl Farm',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJG0ygU8-NpzERXtcRcF0Av7k',
    lat = 10.1701745,
    lng = 103.9700624,
    updated_at = NOW()
WHERE slug = 'ngoc-hien-pearl-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJP1Wau62WpzERTHG2ZMqIK7Q',
    google_maps_name = 'Nước Mắm Phụng Hưng - Phú Quốc',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJP1Wau62WpzERTHG2ZMqIK7Q',
    lat = 10.0448818,
    lng = 104.0169601,
    updated_at = NOW()
WHERE slug = 'phung-hung-fish-sauce-an-thoi';

-- 방어 동기화: Khem Beach 시드 2개소가 DB 테이블에 존재하는 경우 함께 정규화
UPDATE public.businesses
SET google_place_id = 'ChIJtRK5PRuXpzERGNqgW9-r2OA',
    google_maps_name = 'MIN Spa Phú Quốc - Massage & Nail ( M.I.N Spa)',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJtRK5PRuXpzERGNqgW9-r2OA',
    lat = 10.0358429,
    lng = 104.0265382,
    updated_at = NOW()
WHERE slug = 'min-spa-melodia-khem-beach';

UPDATE public.businesses
SET google_place_id = 'ChIJseXhorWXpzERrZEosod6EGQ',
    google_maps_name = 'Sun Hotel Khem Beach - Phu Quoc',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJseXhorWXpzERrZEosod6EGQ',
    lat = 10.0358408,
    lng = 104.0272998,
    updated_at = NOW()
WHERE slug = 'sun-hotel-khem-beach';

-- 2. 공식 Google Maps 엔티티 프로필(`!1s0x...:0x...`) 승격 (ChIJ 문자열 미노출 POI — Zero Hallucination)
UPDATE public.businesses
SET google_place_id = NULL,
    google_maps_name = 'Phuquoc Craft Link',
    google_maps_url = 'https://www.google.com/maps/place/Phuquoc+Craft+Link/@10.0351548,104.0001323,17z/data=!3m1!4b1!4m6!3m5!1s0x31a795005486de01:0x52beb5ffbf08682f!8m2!3d10.0351548!4d104.0027126!16s%2Fg%2F11vk6572fz',
    phone = COALESCE(phone, '+84 946 383 998'),
    lat = 10.0351548,
    lng = 104.0027126,
    updated_at = NOW()
WHERE slug = 'phu-quoc-craft-link-vuifest';

UPDATE public.businesses
SET google_place_id = NULL,
    google_maps_name = 'Chợ An Thới',
    google_maps_url = 'https://www.google.com/maps/place/Ch%E1%BB%A3+An+Th%E1%BB%9Bi/@10.0168232,104.0138771,17z/data=!3m1!4b1!4m6!3m5!1s0x31a7969b70921a97:0xf0f847286e2a9251!8m2!3d10.0168232!4d104.0138771!16s%2Fg%2F11cs29011f',
    lat = 10.0168232,
    lng = 104.0138771,
    updated_at = NOW()
WHERE slug = 'cho-an-thoi-fresh-market';

-- 3. Critical: Google Maps 영구 폐업(폐업함 / Permanently closed) 확인 업소 비공개 전환 (데이터 보존)
UPDATE public.businesses
SET google_place_id = 'ChIJ9Wt2ewCXpzERyVdi6z6IfCo',
    google_maps_name = 'Lẩu Tứ Xuyên',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJ9Wt2ewCXpzERyVdi6z6IfCo',
    lat = 10.0191331,
    lng = 104.0141095,
    status = 'private',
    verification_note = 'Google Maps 내장 브라우저 실측 결과 영구 폐업(폐업함 / Permanently closed) 확인되어 비공개(private) 전환 (2026-11-15)',
    updated_at = NOW()
WHERE slug = 'lau-tu-xuyen-an-thoi';

-- 4. 공개 업소 누락 좌표 백필
UPDATE public.businesses
SET google_place_id = 'ChIJRxYLYomXpzERCi3mFgoiNp4',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJRxYLYomXpzERCi3mFgoiNp4',
    lat = 10.0245108,
    lng = 104.00787,
    updated_at = NOW()
WHERE slug = 'casepia-kitchen-and-lounge';

COMMIT;
