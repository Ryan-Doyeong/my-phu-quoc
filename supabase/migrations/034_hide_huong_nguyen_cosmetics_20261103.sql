--
-- Supabase Migration: 034_hide_huong_nguyen_cosmetics_20261103.sql
-- 근거: 사용자 지시 (2026-11-03) "HƯỜNG NGUYỄN COSMETICS 비공개로"
-- 내용: 삭제 없이 status = 'private' 비공개 전환 (데이터·사진 파일 보존)
--
BEGIN;

UPDATE public.businesses
SET status = 'private', updated_at = NOW()
WHERE slug = 'huong-nguyen-cosmetics';

COMMIT;

-- 추가 (2026-11-03): Em Spa Sunset Town — 사진이 스파와 맞지 않아 비공개 (삭제 아님)
BEGIN;
UPDATE public.businesses
SET status = 'private', updated_at = NOW()
WHERE slug = 'em-spa-sunset-town-hair-wash-massage-body-foot';
COMMIT;
