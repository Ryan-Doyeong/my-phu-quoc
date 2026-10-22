-- Allow public business owners to upload only to the business-intake folder.
create policy "site media public business intake insert" on storage.objects
for insert to anon, authenticated
with check (
  bucket_id='site-media'
  and (storage.foldername(name))[1]='business-intake'
);
