--
-- Supabase Migration: 033_hide_khem_king_kong_20261102.sql
-- 근거: Claude(총괄) 지시 및 사용자 피드백 (구글 평점 3.0, 리뷰 4개로 신뢰도 미달)
-- 내용: 켐비치 King Kong Money Exchange(khem-banking-king-kong) 삭제 없이 status = 'private' 비공개 전환
--
BEGIN;

UPDATE public.businesses
SET status = 'private', updated_at = NOW()
WHERE id = 'khem-banking-king-kong' OR slug = 'king-kong-money-exchange-khem-beach';

COMMIT;
