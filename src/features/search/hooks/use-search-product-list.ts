import { useState } from "react";
import { useSearchProducts } from "../api/search-products";
import { useSearchFilters } from "./use-search-filters";
import { useCreateCart } from "@/features/cart/api/use-create-cart";
import { useUpdateQuantity } from "@/features/cart/api/use-update-quantity";
import { useDeleteItem } from "@/features/cart/api/use-delete-item";
import {
  useToggleWishlist,
  useWishlist,
} from "@/features/cart/api/use-wishlist";
import { useGetCart } from "@/features/cart/api/use-get-cart";
import { toast } from "sonner";

export function useSearchProductList() {
  const { params, reset } = useSearchFilters();

  const { data, isLoading, isError, refetch, isPlaceholderData } =
    useSearchProducts(params);
  const { data: cartData } = useGetCart();
  const { data: wishlistData } = useWishlist();

  const [updatingQuantityItemId, setUpdatingQuantityItemId] = useState<
    string | null
  >(null);
  const [creatingCartItemId, setCreatingCartItemId] = useState<string | null>(
    null,
  );
  const [togglingWishlistItemId, setTogglingWishlistItemId] = useState<
    string | null
  >(null);

  const { mutate: createCart } = useCreateCart({
    mutationConfig: {
      onSuccess: () =>
        toast.success("Produk berhasil ditambahkan ke keranjang"),
    },
  });

  const { mutate: updateQuantity } = useUpdateQuantity({
    mutationConfig: {
      onSuccess: () => toast.success("Jumlah berhasil diperbarui"),
    },
  });

  const { mutate: deleteItem } = useDeleteItem({
    mutationConfig: {
      onSuccess: () => toast.success("Dihapus dari keranjang"),
    },
  });

  const { mutate: toggleWishlist } = useToggleWishlist({
    mutationConfig: {
      onSuccess: (data) =>
        toast.success(
          data.data.isAdded
            ? "Ditambahkan ke wishlist"
            : "Dihapus dari wishlist",
        ),
    },
  });

  const getCartQuantity = (productId: string) =>
    cartData?.data.items.find((i) => i.productId === productId)?.quantity ?? 0;

  const isInWishlist = (productId: string) =>
    wishlistData?.data.some((item) => item.productId === productId) ?? false;

  const handleAddToCart = (item: { productId: string; quantity: number }) => {
    setCreatingCartItemId(item.productId);
    createCart(item, {
      onSettled: () => setCreatingCartItemId(null),
    });
  };

  const handleUpdateQuantity = (data: {
    productId: string;
    quantity: number;
  }) => {
    setUpdatingQuantityItemId(data.productId);
    updateQuantity(data, {
      onSettled: () => setUpdatingQuantityItemId(null),
    });
  };

  const handleRemoveFromCart = (productId: string) => deleteItem({ productId });
  const handleToggleWishlist = (productId: string) => {
    setTogglingWishlistItemId(productId);
    toggleWishlist(productId, {
      onSettled: () => setTogglingWishlistItemId(null),
    });
  };

  return {
    data,
    isLoading,
    isError,
    refetch,
    isPlaceholderData,
    params,
    reset,
    cartData,
    wishlistData,
    getCartQuantity,
    isInWishlist,
    updatingQuantityItemId,
    creatingCartItemId,
    togglingWishlistItemId,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleToggleWishlist,
  };
}
