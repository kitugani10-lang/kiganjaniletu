
-- Add IP address tracking to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ip_address inet;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login_ip inet;

-- Add parent_comment_id for threaded replies, media_url for comment media
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS parent_comment_id uuid REFERENCES public.comments(id) ON DELETE CASCADE;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS media_url text;

-- Create RLS policy for users to view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
