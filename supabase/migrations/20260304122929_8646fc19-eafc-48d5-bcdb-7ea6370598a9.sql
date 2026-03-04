
-- Remove views column from posts
ALTER TABLE public.posts DROP COLUMN IF EXISTS views;

-- Drop the increment_post_views function
DROP FUNCTION IF EXISTS public.increment_post_views(uuid[]);

-- Update RLS policies: moderators can delete any post/comment
DROP POLICY IF EXISTS "Moderators can delete any post" ON public.posts;
CREATE POLICY "Moderators can delete any post" ON public.posts FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'moderator'::app_role));

DROP POLICY IF EXISTS "Moderators can delete any comment" ON public.comments;
CREATE POLICY "Moderators can delete any comment" ON public.comments FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'moderator'::app_role));

-- Moderators can update any post/comment (no time limit)
DROP POLICY IF EXISTS "Moderators can update any post" ON public.posts;
CREATE POLICY "Moderators can update any post" ON public.posts FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

DROP POLICY IF EXISTS "Moderators can update any comment" ON public.comments;
CREATE POLICY "Moderators can update any comment" ON public.comments FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

-- Update normal user delete policies: 48h window instead of unlimited for posts
DROP POLICY IF EXISTS "Authors can delete own posts" ON public.posts;
CREATE POLICY "Authors can delete own posts" ON public.posts FOR DELETE TO authenticated
USING (auth.uid() = author_id AND created_at > (now() - interval '48 hours'));

DROP POLICY IF EXISTS "Authors can delete own comments" ON public.comments;
CREATE POLICY "Authors can delete own comments" ON public.comments FOR DELETE TO authenticated
USING (auth.uid() = author_id AND created_at > (now() - interval '48 hours'));

-- Update normal user edit policy: keep 12h window (edit count tracked client-side)
-- Already exists for posts, update for comments to match
DROP POLICY IF EXISTS "Authors can update own comments within 12h" ON public.comments;
CREATE POLICY "Authors can update own comments within 12h" ON public.comments FOR UPDATE TO authenticated
USING (auth.uid() = author_id AND created_at > (now() - interval '12 hours'));
