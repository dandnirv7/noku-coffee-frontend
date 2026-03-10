import { useState, useMemo, useCallback } from "react";
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
import { useRequireAuth } from "@/hooks/use-require-auth";

export function useSearchProductList() {
  const { params, reset } = useSearchFilters();
  const { requireAuth } = useRequireAuth();

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

  const cartLookup = useMemo(() => {
    const map = new Map<string, number>();
    cartData?.data.items.forEach((item) =>
      map.set(item.productId, item.quantity),
    );
    return map;
  }, [cartData]);

  const wishlistSet = useMemo(() => {
    return new Set(wishlistData?.data.map((item) => item.productId));
  }, [wishlistData]);

  const getCartQuantity = useCallback(
    (productId: string) => {
      return cartLookup.get(productId) ?? 0;
    },
    [cartLookup],
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistSet.has(productId);
    },
    [wishlistSet],
  );

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
      onSuccess: (res) =>
        toast.success(
          res.data.isAdded
            ? "Ditambahkan ke wishlist"
            : "Dihapus dari wishlist",
        ),
    },
  });

  const handleAddToCart = useCallback(
    (item: { productId: string; quantity: number }) => {
      requireAuth(() => {
        setCreatingCartItemId(item.productId);
        createCart(item, { onSettled: () => setCreatingCartItemId(null) });
      });
    },
    [createCart, requireAuth],
  );

  const handleUpdateQuantity = useCallback(
    (data: { productId: string; quantity: number }) => {
      setUpdatingQuantityItemId(data.productId);
      updateQuantity(data, {
        onSettled: () => setUpdatingQuantityItemId(null),
      });
    },
    [updateQuantity],
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      deleteItem({ productId });
    },
    [deleteItem],
  );

  const handleToggleWishlist = useCallback(
    (productId: string) => {
      requireAuth(() => {
        setTogglingWishlistItemId(productId);
        toggleWishlist(productId, {
          onSettled: () => setTogglingWishlistItemId(null),
        });
      });
    },
    [toggleWishlist, requireAuth],
  );

  return useMemo(
    () => ({
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
    }),
    [
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
    ],
  );
}
