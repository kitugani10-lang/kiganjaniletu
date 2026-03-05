
-- Allow authenticated users to upload to post-images bucket
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'post-images');

-- Allow public to read from post-images bucket
CREATE POLICY "Public can read post-images" ON storage.objects FOR SELECT USING (bucket_id = 'post-images');
