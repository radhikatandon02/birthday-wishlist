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

export function getWishlists(): Wishlist[] {
  const data = localStorage.getItem("wishlists");
  return data ? JSON.parse(data) : [];
}

export function saveWishlists(wishlists: Wishlist[]) {
  localStorage.setItem("wishlists", JSON.stringify(wishlists));
}

export function getWishlistById(id: string): Wishlist | undefined {
  return getWishlists().find((w) => w.id === id);
}
