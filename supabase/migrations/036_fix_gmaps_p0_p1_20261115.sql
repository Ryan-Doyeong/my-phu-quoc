-- =============================================================================
-- Supabase Migration: 036_fix_gmaps_p0_p1_20261115.sql
-- 변경 사유: PR #116 (myphuquoc.net 구글맵 외부 링크 및 비즈니스 프로필 전수 감사) 후속 P0 데이터 교정
-- 작성 기준일: 2026-11-15
--
-- 대상 슬러그 목록 (Target Slugs):
--   [1] 호치민시(10.7905, 106.6893) 빈 지도 이탈 교정 및 레지스트리 SSOT 동기화 (4개소)
--       - noska-hotel
--       - fella-hotel
--       - golden-sunset-hotel
--       - js-hotel-phu-quoc-sunset-town
--   [2] 타 숙소(Sunny Side Hotel) 오매핑 교정 (1개소, 방어용 별칭 포함)
--       - sunny-hotel-phu-quoc-ven-18-sunset-town
--       - sunny-hotel
--   [3] 가짜/비표준 google_place_id 제거 및 정확한 위치·프로필 URL 반영 (3개소 + 정규식 방어)
--       - coastal-living-hotel-phu-quoc (ChIJ_coastal_living_phuquoc -> NULL)
--       - mimi-fruits-mart (mimi_fruits_sunset_town -> NULL, unpublished)
--       - sun-group-sunset-town-electric-buggy-service (buggy_service_sunset_town -> NULL, unpublished)
--   [4] 호텔 인사이트 ↔ 레지스트리 Place ID 충돌 동기화 (3개소, 방어용 별칭 포함)
--       - sole-casa-phu-quoc
--       - casa-del-mar-boutique-hotel
--       - hoa-ng-hon-ti-m-boutique-hotel
--       - hoang-hon-hotel
--   [5] 단축 URL(maps.app.goo.gl) 정규화 및 실측 HTTP 200 검증 프로필 반영 (1개소)
--       - the-room-hotel
--   [6] /map 핵심 랜드마크 연동 비즈니스 레코드 SSOT 동기화 (9개소)
--       - kiss-bridge
--       - sunset-place-10
--       - thap-dong-ho
--       - sunworld-hon-thom-hon-thom-cable-car-phu-quoc
--       - cho-dem-vui-fest-bazaar-sunset-town
--       - sun-signature-gallery
--       - bai-bien-thi-tran-hoang-hon
--       - cot-da-co-pompeii-ancient-pompeii
--       - thang-rong
-- =============================================================================

BEGIN;

-- 1. 호치민시 빈 지도로 튕기던 호텔 4개소: 검증된 Place ID·푸꾸옥 좌표·정규 URL 동기화
UPDATE public.businesses
SET google_place_id = 'ChIJ9SwzZzeVpzERAz84CLvBLh8',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJ9SwzZzeVpzERAz84CLvBLh8',
    lat = 10.0301732,
    lng = 104.0060854,
    updated_at = NOW()
WHERE slug = 'noska-hotel';

UPDATE public.businesses
SET google_place_id = 'ChIJjZ-YVl6XpzERBev66-X35uQ',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJjZ-YVl6XpzERBev66-X35uQ',
    lat = 10.0256867,
    lng = 104.0076622,
    updated_at = NOW()
WHERE slug = 'fella-hotel';

UPDATE public.businesses
SET google_place_id = 'ChIJLYZRqS2VpzERBkJetwNxgg8',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJLYZRqS2VpzERBkJetwNxgg8',
    lat = 10.0305882,
    lng = 104.0061444,
    updated_at = NOW()
WHERE slug = 'golden-sunset-hotel';

UPDATE public.businesses
SET google_place_id = 'ChIJRSic4YOXpzERfVMlKoCM9v8',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJRSic4YOXpzERfVMlKoCM9v8',
    lat = 10.0317854,
    lng = 104.0060131,
    updated_at = NOW()
WHERE slug = 'js-hotel-phu-quoc-sunset-town';

-- 2. 타 숙소(Sunny Side Hotel) 오매핑 호텔 교정 (Venice 18 소재 Sunny Hotel)
UPDATE public.businesses
SET google_place_id = 'ChIJJyvaIBKXpzERPWxGoWlnWoc',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJJyvaIBKXpzERPWxGoWlnWoc',
    lat = 10.03049,
    lng = 104.005862,
    updated_at = NOW()
WHERE slug IN ('sunny-hotel-phu-quoc-ven-18-sunset-town', 'sunny-hotel');

-- 3. 가짜/비표준 google_place_id 제거 (Zero Hallucination 원칙 적용)
UPDATE public.businesses
SET google_place_id = NULL,
    google_maps_url = 'https://www.google.com/maps/place/Coastal+Living+Hotel+Phu+Quoc,+17+Positano,+Sunset+Town,+An+Th%E1%BB%9Bi,+Ph%C3%BA+Qu%E1%BB%91c/@10.0268,104.0079,18z',
    lat = 10.0268,
    lng = 104.0079,
    updated_at = NOW()
WHERE slug = 'coastal-living-hotel-phu-quoc';

UPDATE public.businesses
SET google_place_id = NULL,
    updated_at = NOW()
WHERE slug IN ('mimi-fruits-mart', 'sun-group-sunset-town-electric-buggy-service')
  AND google_place_id IN ('mimi_fruits_sunset_town', 'buggy_service_sunset_town');

-- 방어 업데이트: 혹시 남아 있을 수 있는 언더스코어 슬러그형 가짜 Place ID 일괄 NULL 처리
UPDATE public.businesses
SET google_place_id = NULL,
    updated_at = NOW()
WHERE google_place_id ~ '^ChIJ_[a-z0-9_]+$';

-- 4. 레지스트리 불일치 고위험 호텔 3개소 동기화
UPDATE public.businesses
SET google_place_id = 'ChIJCzU1h7OXpzER6BRzBKSqRks',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJCzU1h7OXpzER6BRzBKSqRks',
    lat = 10.0290612,
    lng = 104.0098077,
    updated_at = NOW()
WHERE slug = 'sole-casa-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJL0J55ZiXpzERbAGmlh0s12I',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJL0J55ZiXpzERbAGmlh0s12I',
    lat = 10.0307485,
    lng = 104.0072895,
    updated_at = NOW()
WHERE slug = 'casa-del-mar-boutique-hotel';

UPDATE public.businesses
SET google_place_id = 'ChIJe4CLfRKXpzERL0ZvGC778Bk',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJe4CLfRKXpzERL0ZvGC778Bk',
    lat = 10.0257322,
    lng = 104.0076549,
    updated_at = NOW()
WHERE slug IN ('hoa-ng-hon-ti-m-boutique-hotel', 'hoang-hon-hotel');

-- 5. 단축 URL(maps.app.goo.gl/kDva8BBXaBeUxBvi8) 실측 검증 Place ID 정규화
UPDATE public.businesses
SET google_place_id = 'ChIJazttI-mVpzER0S79ZGkYs78',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJazttI-mVpzER0S79ZGkYs78',
    lat = 10.0320914,
    lng = 104.0043098,
    updated_at = NOW()
WHERE slug = 'the-room-hotel';

-- 6. /map 핵심 랜드마크 연동 레코드 SSOT 동기화
UPDATE public.businesses
SET google_place_id = 'ChIJG-HZ4ZaRpzERhjtO1_1kObg',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJG-HZ4ZaRpzERhjtO1_1kObg',
    lat = 10.0280346,
    lng = 104.0037872,
    updated_at = NOW()
WHERE slug = 'kiss-bridge';

UPDATE public.businesses
SET google_place_id = 'ChIJtSQ7ywmVpzERvzagy4sWZus',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJtSQ7ywmVpzERvzagy4sWZus',
    lat = 10.0276968,
    lng = 104.0060548,
    updated_at = NOW()
WHERE slug = 'sunset-place-10';

UPDATE public.businesses
SET google_place_id = 'ChIJGz2yTr6XpzERw3f-8LpV0PM',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJGz2yTr6XpzERw3f-8LpV0PM',
    lat = 10.0292527,
    lng = 104.0074202,
    updated_at = NOW()
WHERE slug = 'thap-dong-ho';

UPDATE public.businesses
SET google_place_id = 'ChIJvxdKNoKWpzERAWSyG5rABsg',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJvxdKNoKWpzERAWSyG5rABsg',
    lat = 10.0268905,
    lng = 104.0085686,
    updated_at = NOW()
WHERE slug = 'sunworld-hon-thom-hon-thom-cable-car-phu-quoc';

UPDATE public.businesses
SET google_place_id = 'ChIJe-XGILOVpzERFUpU0tLXMoY',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJe-XGILOVpzERFUpU0tLXMoY',
    lat = 10.0356275,
    lng = 104.0031156,
    updated_at = NOW()
WHERE slug = 'cho-dem-vui-fest-bazaar-sunset-town';

UPDATE public.businesses
SET google_place_id = 'ChIJb5dRi2aVpzER5yka1zrbkLM',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJb5dRi2aVpzER5yka1zrbkLM',
    lat = 10.0304409,
    lng = 104.0068911,
    updated_at = NOW()
WHERE slug = 'sun-signature-gallery';

UPDATE public.businesses
SET google_place_id = 'ChIJZXM2cdOVpzERTz6J6CvWVwg',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJZXM2cdOVpzERTz6J6CvWVwg',
    lat = 10.0289714,
    lng = 104.0064217,
    updated_at = NOW()
WHERE slug = 'bai-bien-thi-tran-hoang-hon';

UPDATE public.businesses
SET google_place_id = 'ChIJR1rvoz6XpzERak7X8IIpK7Q',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJR1rvoz6XpzERak7X8IIpK7Q',
    lat = 10.0265838,
    lng = 104.0079771,
    updated_at = NOW()
WHERE slug = 'cot-da-co-pompeii-ancient-pompeii';

UPDATE public.businesses
SET google_place_id = 'ChIJlxCWdMWXpzER1uHLQ3OpVkI',
    google_maps_url = 'https://www.google.com/maps/place/?q=place_id:ChIJlxCWdMWXpzER1uHLQ3OpVkI',
    lat = 10.0300494,
    lng = 104.0077286,
    updated_at = NOW()
WHERE slug = 'thang-rong';

COMMIT;
