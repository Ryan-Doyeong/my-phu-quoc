create policy "site media editorial staff insert" on storage.objects
for insert to authenticated
with check (
  bucket_id='site-media'
  and public.is_staff()
  and (storage.foldername(name))[1] in ('editorial','editorial-gallery')
);
