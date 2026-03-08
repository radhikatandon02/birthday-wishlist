import { supabase } from "@/integrations/supabase/client";

export interface GiftItem {
  id: string;
  name: string;
  link: string;
  price?: string;
  note?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  birthday: string;
  message?: string;
  gifts: GiftItem[];
  createdAt: number;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export async function createWishlist(wishlist: Omit<Wishlist, "createdAt">, userId: string): Promise<string> {
  const { error: wError } = await supabase.from("wishlists").insert({
    id: wishlist.id,
    name: wishlist.name,
    birthday: wishlist.birthday || null,
    message: wishlist.message || null,
    user_id: userId,
  } as any);
  if (wError) throw wError;

  if (wishlist.gifts.length > 0) {
    const { error: gError } = await supabase.from("gift_items").insert(
      wishlist.gifts.map((g, i) => ({
        id: g.id,
        wishlist_id: wishlist.id,
        name: g.name,
        link: g.link || "",
        price: g.price || null,
        note: g.note || null,
        sort_order: i,
      }))
    );
    if (gError) throw gError;
  }

  return wishlist.id;
}

export async function getWishlistById(id: string): Promise<Wishlist | null> {
  const { data: w, error: wError } = await supabase
    .from("wishlists")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (wError || !w) return null;

  const { data: gifts } = await supabase
    .from("gift_items")
    .select("*")
    .eq("wishlist_id", id)
    .order("sort_order");

  return {
    id: w.id,
    name: w.name,
    birthday: w.birthday || "",
    message: w.message || undefined,
    gifts: (gifts || []).map((g) => ({
      id: g.id,
      name: g.name,
      link: g.link,
      price: g.price || undefined,
      note: g.note || undefined,
    })),
    createdAt: new Date(w.created_at).getTime(),
  };
}

export async function getAllWishlists(userId?: string): Promise<Wishlist[]> {
  const query: any = supabase
    .from("wishlists")
    .select("*, gift_items(*)");

  if (userId) {
    query.eq("user_id", userId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  return data.map((w) => ({
    id: w.id,
    name: w.name,
    birthday: w.birthday || "",
    message: w.message || undefined,
    gifts: (w.gift_items || []).map((g: any) => ({
      id: g.id,
      name: g.name,
      link: g.link,
      price: g.price || undefined,
      note: g.note || undefined,
    })),
    createdAt: new Date(w.created_at).getTime(),
  }));
}
