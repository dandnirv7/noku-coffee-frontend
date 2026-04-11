import { useCartMutations } from "./use-cart-mutations";
import { useWishlistOperations } from "./use-wishlist-operations";

export function useCartHandlers() {
  const { updateQuantity, deleteItem, clearCart, checkoutProduct, isCheckout } =
    useCartMutations();

  const { moveToWishlist, addToCartFromWishlist, toggleWishlist } =
    useWishlistOperations();

  const handleUpdateQuantity = async (
    productId: string,
    quantity: number,
  ): Promise<void> => {
    await updateQuantity({ productId, quantity });
  };

  const handleDeleteItem = async (productId: string): Promise<void> => {
    await deleteItem({ productId });
  };

  const handleClearCart = async (): Promise<void> => {
    await clearCart();
  };

  const handleMoveToWishlist = async (productId: string): Promise<void> => {
    await moveToWishlist(productId, handleDeleteItem);
  };

  const handleAddToCart = async (item: {
    productId: string;
    quantity: number;
  }): Promise<void> => {
    await addToCartFromWishlist(item);
  };

  const handleRemoveFromWishlist = async (productId: string): Promise<void> => {
    await toggleWishlist(productId);
  };

  const handleCheckout = async (
    addressId: string,
    promoCode?: string,
    courier?: string,
  ): Promise<void> => {
    await checkoutProduct({ addressId, promoCode, shippingMethod: courier });
  };

  return {
    handleUpdateQuantity,
    handleDeleteItem,
    handleClearCart,
    handleMoveToWishlist,
    handleAddToCart,
    handleRemoveFromWishlist,
    handleCheckout,
    isCheckout,
  };
}
