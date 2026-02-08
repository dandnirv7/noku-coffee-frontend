import { WishlistItem } from "./wishlist-schema";

export const isInWishlist = (
  wishlist: WishlistItem[],
  productId: string,
): boolean => {
  return wishlist.some((item) => item.productId === productId);
};
