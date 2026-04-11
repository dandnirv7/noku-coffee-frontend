import { useMemo } from "react";
import { useSearchProducts } from "../api/search-products";
import { useSearchFilters } from "./use-search-filters";
import { useProductActions } from "@/features/product/hooks/use-product-actions";

export function useSearchProductList() {
  const { params, reset } = useSearchFilters();
  const {
    getCartQuantity,
    isInWishlist,
    updatingQuantityItemId,
    creatingCartItemId,
    togglingWishlistItemId,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleToggleWishlist,
  } = useProductActions();

  const { data, isLoading, isError, refetch, isPlaceholderData } =
    useSearchProducts(params);

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
      refetch,
      isPlaceholderData,
      params,
      reset,
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
