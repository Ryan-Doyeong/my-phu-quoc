-- =============================================================================
-- Supabase Migration: 038_fix_gmaps_p2_standardization_20261115.sql
-- 변경 사유: 로컬 Chrome CDP 전수 실측 기반 P2 데이터 표준화 및 잔여 드리프트 해소
-- 선행 마이그레이션: 036_fix_gmaps_p0_p1_20261115.sql, 037_seed_khem_and_sparse_filters_20261115.sql
-- 작성 기준일: 2026-11-15
--
-- 대상 슬러그 목록 (Target Slugs):
--   [1] Search_List 및 임시 좌표 경로 호텔 -> CDP 실측 확정 Place 프로필 승격 (6개소)
--       - coastal-living-hotel-phu-quoc
--       - kl-hotel-phu-quoc
--       - palo-santo-hotel-phu-quoc
--       - catarina-hotel-phu-quoc
--       - solaro-hotel-spa-h84816481 (방어 별칭: solaro-hotel-spa)
--       - anna-hotel-free-cable-car-and-water-park-tickets (방어 별칭: anna-hotel-phu-quoc)
--   [2] P2 CDP 전수 검증 중 신규 적발된 Critical / 가짜 Place ID 교정 (2개소)
--       - premier-village-phu-quoc-resort (호치민 빈 지도 리다이렉트 ChIJr4pU... -> 공식 ChIJcSDG...)
--       - triland-hillside (draft 레코드 좌표 및 검증 ChIJOZ1p... 동기화)
--   [3] Banking 9개 공개 업소 + 1개 비공개 업소: CID URL 드리프트 해소 및 lib/mapsLink.ts 표준 URL 통일 (10개소)
--       - mb-atm-nop-rut-tien
--       - vietinbank-atm
--       - bidv-atm-machine
--       - exmoney-sunset-town-currency-exchange
--       - money-exchange-sunset-town
--       - g-g-money-exchange-sunset-town
--       - sunsettown-exchange
--       - exchange-money-sol-cosy-phu-quoc
--       - atm-vietcombank-bidv-atm
--       - king-kong-money-exchange-khem-beach (private)
--   [4] 비표준 S2 셀 접미사 실측 정상 확인 매장 정밀 좌표 동기화 (2개소)
--       - muoi-mini-mart-sunset-town
--       - phu-quoc-sunset-town-coffee-workshop-brew-design-the-art-of-vietnamese-coffee
-- =============================================================================

BEGIN;

-- 1. Search_List / 임시 좌표 경로 호텔 6개소 -> CDP 실측 확정 Place 프로필 승격
UPDATE public.businesses
SET google_place_id = 'ChIJ7WFKmwSVpzER8gm7K8E6wZQ',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJ7WFKmwSVpzER8gm7K8E6wZQ',
    lat = 10.0305671,
    lng = 104.0061225,
    updated_at = NOW()
WHERE slug = 'coastal-living-hotel-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJzwK0aw-XpzERxNMvFXY3aE4',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJzwK0aw-XpzERxNMvFXY3aE4',
    lat = 10.0279317,
    lng = 104.0085074,
    updated_at = NOW()
WHERE slug = 'kl-hotel-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJOZ2m40eNpzERS3t2dXx4wKc',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJOZ2m40eNpzERS3t2dXx4wKc',
    lat = 10.0310481,
    lng = 104.0057705,
    updated_at = NOW()
WHERE slug = 'palo-santo-hotel-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJvXlceNuXpzERCRyDqyTL93o',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJvXlceNuXpzERCRyDqyTL93o',
    lat = 10.0296225,
    lng = 104.0085035,
    updated_at = NOW()
WHERE slug = 'catarina-hotel-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJk3JMmVKXpzERdcBhMd_k9KY',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJk3JMmVKXpzERdcBhMd_k9KY',
    lat = 10.0271621,
    lng = 104.0088427,
    updated_at = NOW()
WHERE slug IN ('solaro-hotel-spa-h84816481', 'solaro-hotel-spa');

UPDATE public.businesses
SET google_place_id = 'ChIJxTnMPKCWpzERg7paQsHm-00',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJxTnMPKCWpzERg7paQsHm-00',
    lat = 10.0307562,
    lng = 104.007559,
    updated_at = NOW()
WHERE slug IN ('anna-hotel-free-cable-car-and-water-park-tickets', 'anna-hotel-phu-quoc');

-- 2. 신규 적발된 Critical 오연결(Premier Village) 및 Triland Hillside 검증 프로필 동기화
UPDATE public.businesses
SET google_place_id = 'ChIJcSDG-fqWpzERQkkxuLWDUyU',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJcSDG-fqWpzERQkkxuLWDUyU',
    lat = 10.0159773,
    lng = 104.0392224,
    updated_at = NOW()
WHERE slug = 'premier-village-phu-quoc-resort';

UPDATE public.businesses
SET google_place_id = 'ChIJOZ1p38-VpzERKC1kUSIrA4A',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJOZ1p38-VpzERKC1kUSIrA4A',
    lat = 10.033835,
    lng = 104.0050661,
    updated_at = NOW()
WHERE slug = 'triland-hillside';

-- 3. Banking 9개 공개 업소 + 1개 비공개 업소: CID URL 포맷 드리프트 해소 (lib/mapsLink.ts 표준 일치)
UPDATE public.businesses
SET google_place_id = 'ChIJ1R0-b6eVpzERP9dGI5QcYFk',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=MB%20ATM%20(N%E1%BB%99p%2Fr%C3%BAt%20ti%E1%BB%81n)%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJ1R0-b6eVpzERP9dGI5QcYFk',
    lat = 10.0354681,
    lng = 104.0047262,
    updated_at = NOW()
WHERE slug = 'mb-atm-nop-rut-tien';

UPDATE public.businesses
SET google_place_id = 'ChIJc4dmHQCVpzEROaH0u4lrt6A',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=VietinBank%20ATM%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJc4dmHQCVpzEROaH0u4lrt6A',
    lat = 10.0356939,
    lng = 104.0030911,
    updated_at = NOW()
WHERE slug = 'vietinbank-atm';

UPDATE public.businesses
SET google_place_id = 'ChIJ_YsvGwCXpzERHyfTAx4dejg',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=BIDV%20ATM%20machine%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJ_YsvGwCXpzERHyfTAx4dejg',
    lat = 10.0276568,
    lng = 104.0073166,
    updated_at = NOW()
WHERE slug = 'bidv-atm-machine';

UPDATE public.businesses
SET google_place_id = 'ChIJsY4JY3iXpzEREnF4DG6QX0Q',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=EXMoney%20Sunset%20Town%20%7C%20Currency%20Exchange%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJsY4JY3iXpzEREnF4DG6QX0Q',
    lat = 10.0311981,
    lng = 104.0062552,
    updated_at = NOW()
WHERE slug = 'exmoney-sunset-town-currency-exchange';

UPDATE public.businesses
SET google_place_id = 'ChIJVzqFZ6eVpzERaAEnyrzAM7w',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Money%20Exchange%20Sunset%20Town%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJVzqFZ6eVpzERaAEnyrzAM7w',
    lat = 10.0307205,
    lng = 104.0064964,
    updated_at = NOW()
WHERE slug = 'money-exchange-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJ7aTxLR2VpzERAztBqz__Cew',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=G%26G%20Money%20Exchange%20Sunset%20Town%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJ7aTxLR2VpzERAztBqz__Cew',
    lat = 10.0285625,
    lng = 104.0083125,
    updated_at = NOW()
WHERE slug = 'g-g-money-exchange-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJK4MK9QeXpzER3_XWA20nk4M',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Sunset%20Town%20Exchange%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJK4MK9QeXpzER3_XWA20nk4M',
    lat = 10.0289939,
    lng = 104.0083389,
    updated_at = NOW()
WHERE slug = 'sunsettown-exchange';

UPDATE public.businesses
SET google_place_id = 'ChIJX_dQ80WVpzERt4kcSkTbC6I',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Exchange%20Money%20-%20Sol%20Cosy%20Phu%20Quoc%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJX_dQ80WVpzERt4kcSkTbC6I',
    lat = 10.0363354,
    lng = 104.0069754,
    updated_at = NOW()
WHERE slug = 'exchange-money-sol-cosy-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJHb8567mWpzER64OgWXrzHkc',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=ATM%20Vietcombank%2C%20BIDV%20ATM%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJHb8567mWpzER64OgWXrzHkc',
    lat = 10.035788,
    lng = 104.024647,
    updated_at = NOW()
WHERE slug = 'atm-vietcombank-bidv-atm';

UPDATE public.businesses
SET google_place_id = 'ChIJ1cpuHmuXpzERw8wrSgfoymY',
    google_maps_url = 'https://www.google.com/maps/search/?api=1&query=King%20Kong%20Money%20Exchange%20-%20Khem%20Beach%20Sunset%20Town%20Phu%20Quoc&query_place_id=ChIJ1cpuHmuXpzERw8wrSgfoymY',
    lat = 10.035838,
    lng = 104.0268677,
    updated_at = NOW()
WHERE slug = 'king-kong-money-exchange-khem-beach';

-- 4. 비표준 S2 셀 접미사 실측 정상 확인 매장 2개소 정밀 좌표 동기화
UPDATE public.businesses
SET google_place_id = 'ChIJZxIdKxnB9WYR0OpNKEcReFQ',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJZxIdKxnB9WYR0OpNKEcReFQ',
    lat = 10.03261,
    lng = 104.0047753,
    updated_at = NOW()
WHERE slug = 'muoi-mini-mart-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJy_hxHgCrNTERoIcGv_opdSI',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJy_hxHgCrNTERoIcGv_opdSI',
    lat = 10.0348874,
    lng = 104.0035749,
    updated_at = NOW()
WHERE slug = 'phu-quoc-sunset-town-coffee-workshop-brew-design-the-art-of-vietnamese-coffee';

COMMIT;
