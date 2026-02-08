import { useGetCart } from "../api/use-get-cart";

export function useCartCount() {
  const { data: cartData, isLoading } = useGetCart();

  const count = cartData?.data.items.length ?? 0;

  return {
    count,
    isLoading,
  };
}
