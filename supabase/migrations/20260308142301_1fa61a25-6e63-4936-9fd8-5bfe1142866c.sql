
-- Wishlists table (public, no auth required)
CREATE TABLE public.wishlists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  birthday TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gift items table
CREATE TABLE public.gift_items (
  id TEXT PRIMARY KEY,
  wishlist_id TEXT NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  link TEXT NOT NULL DEFAULT '',
  price TEXT,
  note TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_items ENABLE ROW LEVEL SECURITY;

-- Public read access (wishlists are meant to be shared)
CREATE POLICY "Wishlists are publicly readable" ON public.wishlists FOR SELECT USING (true);
CREATE POLICY "Anyone can create wishlists" ON public.wishlists FOR INSERT WITH CHECK (true);

CREATE POLICY "Gift items are publicly readable" ON public.gift_items FOR SELECT USING (true);
CREATE POLICY "Anyone can create gift items" ON public.gift_items FOR INSERT WITH CHECK (true);

-- Index for faster lookups
CREATE INDEX idx_gift_items_wishlist_id ON public.gift_items(wishlist_id);
