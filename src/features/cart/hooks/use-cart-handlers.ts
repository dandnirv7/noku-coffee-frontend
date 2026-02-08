import { useCartMutations } from "./use-cart-mutations";
import { useWishlistOperations } from "./use-wishlist-operations";

export function useCartHandlers() {
  const { updateQuantity, deleteItem, clearCart, checkoutProduct, isCheckout } =
    useCartMutations();
  const { moveToWishlist, addToCartFromWishlist, toggleWishlist } =
    useWishlistOperations();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity({ productId, quantity });
  };

  const handleDeleteItem = (productId: string) => {
    deleteItem({ productId });
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleMoveToWishlist = (productId: string) => {
    moveToWishlist(productId, handleDeleteItem);
  };

  const handleAddToCart = (item: { productId: string; quantity: number }) => {
    addToCartFromWishlist(item);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    toggleWishlist(productId);
  };

  const handleCheckout = (addressId: string) => {
    checkoutProduct({ addressId });
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
