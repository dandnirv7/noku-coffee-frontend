import { api } from "@/lib/axios";
import {
  WishlistResponse,
  WishlistResponseSchema,
  ToggleWishlistResponse,
  ToggleWishlistResponseSchema,
} from "../lib/wishlist-schema";

export const getWishlist = async (): Promise<WishlistResponse> => {
  const { data } = await api.get("/wishlist");

  const validated = WishlistResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Wishlist Schema Error:", validated.error);
    throw new Error("Format data wishlist dari server tidak valid");
  }

  return validated.data;
};

export const toggleWishlist = async (
  productId: string,
): Promise<ToggleWishlistResponse> => {
  const { data } = await api.post(`/wishlist/${productId}`);

  const validated = ToggleWishlistResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Toggle Wishlist Schema Error:", validated.error);
    throw new Error("Format response toggle wishlist tidak valid");
  }

  return validated.data;
};
