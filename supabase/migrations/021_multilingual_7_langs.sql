-- 021_multilingual_7_langs.sql
-- 목적: My Phu Quoc 7개 언어(en·vi·hi·zh·ru·ko·ja) — 신규 4개 언어(hi, zh, ru, ja) 컬럼 추가
-- 주의: 비파괴. 전부 ADD COLUMN IF NOT EXISTS / 제약 교체뿐이며 기존 데이터는 건드리지 않는다.
-- 상태: 파일만 작성 (Supabase 미적용)

BEGIN;

-- 1. stories (뉴스·이벤트·임팩트) 다국어 컬럼
ALTER TABLE public.stories
  ADD COLUMN IF NOT EXISTS title_hi text,
  ADD COLUMN IF NOT EXISTS subtitle_hi text,
  ADD COLUMN IF NOT EXISTS excerpt_hi text,
  ADD COLUMN IF NOT EXISTS body_hi text,
  ADD COLUMN IF NOT EXISTS seo_title_hi text,
  ADD COLUMN IF NOT EXISTS seo_description_hi text,
  ADD COLUMN IF NOT EXISTS key_points_hi text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS callout_hi text,
  ADD COLUMN IF NOT EXISTS hero_caption_hi text,
  ADD COLUMN IF NOT EXISTS source_name_hi text,
  ADD COLUMN IF NOT EXISTS event_location_hi text,
  ADD COLUMN IF NOT EXISTS title_zh text,
  ADD COLUMN IF NOT EXISTS subtitle_zh text,
  ADD COLUMN IF NOT EXISTS excerpt_zh text,
  ADD COLUMN IF NOT EXISTS body_zh text,
  ADD COLUMN IF NOT EXISTS seo_title_zh text,
  ADD COLUMN IF NOT EXISTS seo_description_zh text,
  ADD COLUMN IF NOT EXISTS key_points_zh text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS callout_zh text,
  ADD COLUMN IF NOT EXISTS hero_caption_zh text,
  ADD COLUMN IF NOT EXISTS source_name_zh text,
  ADD COLUMN IF NOT EXISTS event_location_zh text,
  ADD COLUMN IF NOT EXISTS title_ru text,
  ADD COLUMN IF NOT EXISTS subtitle_ru text,
  ADD COLUMN IF NOT EXISTS excerpt_ru text,
  ADD COLUMN IF NOT EXISTS body_ru text,
  ADD COLUMN IF NOT EXISTS seo_title_ru text,
  ADD COLUMN IF NOT EXISTS seo_description_ru text,
  ADD COLUMN IF NOT EXISTS key_points_ru text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS callout_ru text,
  ADD COLUMN IF NOT EXISTS hero_caption_ru text,
  ADD COLUMN IF NOT EXISTS source_name_ru text,
  ADD COLUMN IF NOT EXISTS event_location_ru text,
  ADD COLUMN IF NOT EXISTS title_ja text,
  ADD COLUMN IF NOT EXISTS subtitle_ja text,
  ADD COLUMN IF NOT EXISTS excerpt_ja text,
  ADD COLUMN IF NOT EXISTS body_ja text,
  ADD COLUMN IF NOT EXISTS seo_title_ja text,
  ADD COLUMN IF NOT EXISTS seo_description_ja text,
  ADD COLUMN IF NOT EXISTS key_points_ja text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS callout_ja text,
  ADD COLUMN IF NOT EXISTS hero_caption_ja text,
  ADD COLUMN IF NOT EXISTS source_name_ja text,
  ADD COLUMN IF NOT EXISTS event_location_ja text,
  ADD COLUMN IF NOT EXISTS source_name_vi text,
  ADD COLUMN IF NOT EXISTS event_location_vi text,
  ADD COLUMN IF NOT EXISTS source_name_ko text,
  ADD COLUMN IF NOT EXISTS event_location_ko text,
  ADD COLUMN IF NOT EXISTS translation_status_hi text NOT NULL DEFAULT 'unverified' CHECK (translation_status_hi IN ('unverified','ai_reviewed_native_unverified','native_verified')),
  ADD COLUMN IF NOT EXISTS translation_status_zh text NOT NULL DEFAULT 'unverified' CHECK (translation_status_zh IN ('unverified','ai_reviewed_native_unverified','native_verified')),
  ADD COLUMN IF NOT EXISTS translation_status_ru text NOT NULL DEFAULT 'unverified' CHECK (translation_status_ru IN ('unverified','ai_reviewed_native_unverified','native_verified')),
  ADD COLUMN IF NOT EXISTS translation_status_ja text NOT NULL DEFAULT 'unverified' CHECK (translation_status_ja IN ('unverified','ai_reviewed_native_unverified','native_verified'));

COMMENT ON COLUMN public.stories.translation_status_hi IS '내부 관리용 (방문자 비노출): unverified=미확인, ai_reviewed_native_unverified=AI 검수 완료 / 원어민 미확인, native_verified=원어민 확인 완료';

-- 2. businesses / business_submissions 업체 소개글
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS description_vi text,
  ADD COLUMN IF NOT EXISTS description_ko text,
  ADD COLUMN IF NOT EXISTS description_hi text,
  ADD COLUMN IF NOT EXISTS description_zh text,
  ADD COLUMN IF NOT EXISTS description_ru text,
  ADD COLUMN IF NOT EXISTS description_ja text;

ALTER TABLE public.business_submissions
  ADD COLUMN IF NOT EXISTS description_hi text,
  ADD COLUMN IF NOT EXISTS description_zh text,
  ADD COLUMN IF NOT EXISTS description_ru text,
  ADD COLUMN IF NOT EXISTS description_ja text;

-- 3. sponsor_applications 언어 제약을 7개 언어로 확장
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='sponsor_applications') THEN
    ALTER TABLE public.sponsor_applications DROP CONSTRAINT IF EXISTS sponsor_applications_lang_check;
    ALTER TABLE public.sponsor_applications
      ADD CONSTRAINT sponsor_applications_lang_check CHECK (lang IN ('en','vi','hi','zh','ru','ko','ja'));
  END IF;
END $$;

COMMIT;
