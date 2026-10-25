-- 022_site_media_storage.sql
-- 목적: 사이트 미디어(배너, 스토리 대표 이미지, 시설 사진 등) 업로드용 site-media 스토리지 버킷 생성 및 RLS 정책
-- 파일 크기 제한: 10MB (10,485,760 bytes)
-- 허용 MIME: image/jpeg, image/png, image/webp, image/avif

BEGIN;

INSERT INTO storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
VALUES ('site-media', 'site-media', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/avif'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "site media public read" ON storage.objects;
CREATE POLICY "site media public read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "site media admin insert" ON storage.objects;
CREATE POLICY "site media admin insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.is_admin());

DROP POLICY IF EXISTS "site media admin update" ON storage.objects;
CREATE POLICY "site media admin update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'site-media' AND public.is_admin());

DROP POLICY IF EXISTS "site media admin delete" ON storage.objects;
CREATE POLICY "site media admin delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.is_admin());

COMMIT;
