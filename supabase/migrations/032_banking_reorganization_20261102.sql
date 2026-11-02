--
-- Supabase Migration: 032_banking_reorganization_20261102.sql
-- 근거: Claude(총괄) 지시 및 사용자 승인
-- 내용:
--   1. 선셋타운 외곽/비공개 대상 8곳 ATM status = 'private' 처리 (삭제 금지)
--   2. 켐비치 JW 메리어트 ATM(local-sunset-288) status = 'published', zone = 'khem-beach', 구글맵 CID 직결
--   3. 켐비치 King Kong Money Exchange(khem-banking-king-kong) 신규 공개 반영
--   4. 선셋타운 공개 8개소(ATM 3, 환전소 5) 구글맵 CID 직결 반영
--
BEGIN;

-- 1. 비공개 ATM 8곳
UPDATE public.businesses
SET status = 'private', updated_at = NOW()
WHERE slug IN (
  'tpbank-livebank-347-nguyen-van-cu',
  'acb-atm',
  'pgd-an-thoi-cn-phu-quoc-ngan-hang-tmcp-dau-tu-phat-trien-viet-nam-bidv',
  'cay-atm-bidv',
  'mb-atm-rut-tien',
  'atm-vietcombank',
  'atm-sacombank',
  'atm-kienlongbank-an-thoi'
);

-- 2. 선셋타운 8곳 구글맵 CID 링크 업데이트
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=6440178889712391999', updated_at = NOW() WHERE slug = 'mb-atm-nop-rut-tien';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=11580843206114582841', updated_at = NOW() WHERE slug = 'vietinbank-atm';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=4069597228033058591', updated_at = NOW() WHERE slug = 'bidv-atm-machine';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=4926815319696634130', updated_at = NOW() WHERE slug = 'exmoney-sunset-town-currency-exchange';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=13561394820020633960', updated_at = NOW() WHERE slug = 'money-exchange-sunset-town';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=17008406116662590211', updated_at = NOW() WHERE slug = 'g-g-money-exchange-sunset-town';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=9480964989714363871', updated_at = NOW() WHERE slug = 'sunsettown-exchange';
UPDATE public.businesses SET google_maps_url = 'https://www.google.com/maps?cid=11676667545235786167', updated_at = NOW() WHERE slug = 'exchange-money-sol-cosy-phu-quoc';

-- 3. 켐비치 2곳 (JW 메리어트 입구 ATM 공개 전환 및 King Kong 환전소 반영)
UPDATE public.businesses
SET status = 'published',
    google_maps_url = 'https://www.google.com/maps?cid=5124801132809454571',
    updated_at = NOW()
WHERE slug = 'atm-vietcombank-bidv-atm';

INSERT INTO public.businesses (
  id, slug, public_name, category, subcategory, address, google_maps_name, google_maps_url, status, lat, lng, created_at, updated_at
) VALUES (
  'khem-banking-king-kong',
  'king-kong-money-exchange-khem-beach',
  'King Kong Money Exchange - Khem Beach',
  'banking',
  'exchange',
  'Kem Beach, 59 Diamond 1',
  'King Kong Money Exchange - Khem Beach',
  'https://www.google.com/maps?cid=7406987655171001539',
  'published',
  10.038,
  104.032,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  status = 'published',
  google_maps_url = 'https://www.google.com/maps?cid=7406987655171001539',
  updated_at = NOW();

COMMIT;
