-- 019_multilingual_en_vi_ko.sql
-- 목적: 타오디엔 사이트 다국어(EN·VI·KO) 전환을 위한 비파괴적 컬럼 추가 및 제약 확장
-- 주의: 기존 데이터 삭제·덮어쓰기 없음 (모두 ADD COLUMN IF NOT EXISTS 사용)
-- 상태: 3단계 지시서에 따라 SQL 파일만 작성 (라이브 Supabase 미적용, Ryan 승인 후 적용)

BEGIN;

-- ============================================================================
-- 1. public.stories (뉴스·가이드·이벤트·임팩트 다국어 컬럼 확장)
-- ============================================================================
-- 기존 컬럼: title, subtitle, excerpt, body_en, body_vi, body_ko, seo_title, seo_description, key_points, callout, hero_caption
ALTER TABLE public.stories
  ADD COLUMN IF NOT EXISTS title_vi text,
  ADD COLUMN IF NOT EXISTS title_ko text,
  ADD COLUMN IF NOT EXISTS subtitle_vi text,
  ADD COLUMN IF NOT EXISTS subtitle_ko text,
  ADD COLUMN IF NOT EXISTS excerpt_vi text,
  ADD COLUMN IF NOT EXISTS excerpt_ko text,
  ADD COLUMN IF NOT EXISTS seo_title_vi text,
  ADD COLUMN IF NOT EXISTS seo_title_ko text,
  ADD COLUMN IF NOT EXISTS seo_description_vi text,
  ADD COLUMN IF NOT EXISTS seo_description_ko text,
  ADD COLUMN IF NOT EXISTS key_points_vi text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS key_points_ko text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS callout_vi text,
  ADD COLUMN IF NOT EXISTS callout_ko text,
  ADD COLUMN IF NOT EXISTS hero_caption_vi text,
  ADD COLUMN IF NOT EXISTS hero_caption_ko text,
  -- 내부 검수 상태 표기용 (사이트 방문자에게 노출하지 않음)
  -- 값 예시: 'unverified' | 'ai_reviewed_native_unverified' ('AI 검수 완료 / 원어민 미확인') | 'native_verified' | 'ryan_approved'
  ADD COLUMN IF NOT EXISTS translation_status_vi text NOT NULL DEFAULT 'unverified'
    CHECK (translation_status_vi IN ('unverified', 'ai_reviewed_native_unverified', 'native_verified')),
  ADD COLUMN IF NOT EXISTS translation_status_ko text NOT NULL DEFAULT 'unverified'
    CHECK (translation_status_ko IN ('unverified', 'ryan_approved'));

COMMENT ON COLUMN public.stories.translation_status_vi IS
  '내부 관리용 베트남어 검수 상태 (방문자 비노출): unverified=미확인, ai_reviewed_native_unverified=AI 검수 완료 / 원어민 미확인, native_verified=원어민 확인 완료';
COMMENT ON COLUMN public.stories.translation_status_ko IS
  '내부 관리용 한국어 검수 상태 (방문자 비노출): unverified=미확인, ryan_approved=Ryan 승인 완료';

-- ============================================================================
-- 2. public.business_submissions (업체 직접 신청 시 다국어 소개 및 선택 항목 통합)
-- ============================================================================
-- 업체가 원할 경우 영어(description_en) 외에 베트남어(description_vi)·한국어(description_ko) 소개도 직접 입력 가능
-- 구 /kr/join 의 한국 업체 선택 입력 항목(카카오 오픈채팅, Zalo, 배달 여부 등)을 공통 폼에서 수용하도록 보장
ALTER TABLE public.business_submissions
  ADD COLUMN IF NOT EXISTS description_vi text,
  ADD COLUMN IF NOT EXISTS description_ko text,
  ADD COLUMN IF NOT EXISTS kakao_openchat_url text,
  ADD COLUMN IF NOT EXISTS zalo_phone text,
  ADD COLUMN IF NOT EXISTS messenger_url text,
  ADD COLUMN IF NOT EXISTS preferred_contact text
    CHECK (preferred_contact IS NULL OR preferred_contact IN ('kakao', 'zalo', 'messenger', 'phone')),
  ADD COLUMN IF NOT EXISTS delivery_available boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS delivery_mode text,
  ADD COLUMN IF NOT EXISTS delivery_area text,
  ADD COLUMN IF NOT EXISTS opening_hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS contact_kakao_id text;

-- 세금번호(tax_code) 선택화 보장
ALTER TABLE public.business_submissions
  ALTER COLUMN tax_code DROP NOT NULL;

-- ============================================================================
-- 3. public.sponsor_applications (커뮤니티 파트너 신청 언어 제약 'ko' 추가)
-- ============================================================================
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'sponsor_applications'
  ) THEN
    ALTER TABLE public.sponsor_applications
      DROP CONSTRAINT IF EXISTS sponsor_applications_lang_check;
    ALTER TABLE public.sponsor_applications
      ADD CONSTRAINT sponsor_applications_lang_check
      CHECK (lang IN ('en', 'vi', 'ko'));
  END IF;
END $$;

COMMIT;
