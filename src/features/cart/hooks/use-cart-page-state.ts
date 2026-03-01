import { useMemo } from "react";
import { useGetCart } from "../api/use-get-cart";
import { calculateCartSummary } from "./use-cart-calculations";
import { usePromoLogic } from "./use-promo-logic";
import { useCartHandlers } from "./use-cart-handlers";
import { useWishlistOperations } from "./use-wishlist-operations";

export function useCartPageState() {
  const { data: cartData, isLoading, isError, error, refetch } = useGetCart();

  const cartItems = useMemo(() => cartData?.data.items || [], [cartData]);

  const itemCount = cartItems.length;

  const { wishlistData, isLoadingWishlist } = useWishlistOperations();

  const initialSummary = useMemo(
    () => calculateCartSummary(cartItems, null),
    [cartItems],
  );

  const {
    appliedPromo,
    appliedPromoCode,
    isValidating,
    applyPromo,
    removePromo,
  } = usePromoLogic({
    subtotal: initialSummary.subtotal,
    shipping: initialSummary.shipping,
  });

  const summary = useMemo(
    () => calculateCartSummary(cartItems, appliedPromo),
    [cartItems, appliedPromo],
  );

  const handlers = useCartHandlers();

  return {
    cartItems,
    itemCount,
    isLoading,
    isError,
    error,
    refetch,

    wishlistData,
    isLoadingWishlist,

    summary,

    appliedPromoCode,
    isValidatingPromo: isValidating,
    applyPromo,
    removePromo,

    ...handlers,
  };
}
