
-- Add user_id column to wishlists (nullable for existing rows)
ALTER TABLE public.wishlists ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Wishlists are publicly readable" ON public.wishlists;
DROP POLICY IF EXISTS "Anyone can create wishlists" ON public.wishlists;
DROP POLICY IF EXISTS "Gift items are publicly readable" ON public.gift_items;
DROP POLICY IF EXISTS "Anyone can create gift items" ON public.gift_items;

-- New RLS policies for wishlists
CREATE POLICY "Users can view own wishlists" ON public.wishlists
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Public can view wishlists by id" ON public.wishlists
  FOR SELECT TO anon USING (true);

CREATE POLICY "Authenticated users can view any wishlist" ON public.wishlists
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create own wishlists" ON public.wishlists
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Gift items: anyone can read, authenticated can insert for their wishlists
CREATE POLICY "Gift items are publicly readable" ON public.gift_items
  FOR SELECT USING (true);

CREATE POLICY "Users can create gift items for own wishlists" ON public.gift_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.wishlists WHERE id = wishlist_id AND user_id = auth.uid())
  );
