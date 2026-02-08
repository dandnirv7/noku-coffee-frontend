"use client";

import { getSession } from "better-auth/api";
import { useCartPageState } from "../hooks/use-cart-page-state";
import { CartEmpty } from "./cart-empty";
import { CartError } from "./cart-error";
import { CartItemsList } from "./cart-items-list";
import { CartPageLayout } from "./cart-page-layout";
import { OrderSummary } from "./order-summary";
import { CartPageSkeleton } from "./skeleton/cart-page-skeleton";
import { WishlistCarouselClient } from "./wishlist-carousel-client";

export function CartPageInner() {
  const {
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
    isValidatingPromo,
    applyPromo,
    removePromo,
    handleUpdateQuantity,
    handleDeleteItem,
    handleClearCart,
    handleMoveToWishlist,
    handleAddToCart,
    handleRemoveFromWishlist,
    handleCheckout,
    isCheckout,
  } = useCartPageState();

  if (isError) {
    return (
      <CartPageLayout>
        <CartError
          reset={() => refetch()}
          message={error?.message || undefined}
        />
      </CartPageLayout>
    );
  }

  if (isLoading) {
    return <CartPageSkeleton />;
  }

  if (itemCount === 0) {
    return (
      <CartPageLayout>
        <CartEmpty />
      </CartPageLayout>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Keranjang Belanja
          </h1>
          <p className="text-gray-600">{itemCount} item di keranjang</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex-1 space-y-4">
            <CartItemsList
              items={cartItems}
              onClearCart={handleClearCart}
              onMoveToWishlist={handleMoveToWishlist}
              onUpdateQuantity={handleUpdateQuantity}
              onDeleteItem={handleDeleteItem}
            />
          </div>

          <OrderSummary
            summary={summary}
            onCheckout={handleCheckout}
            onApplyPromo={applyPromo}
            onRemovePromo={removePromo}
            appliedPromo={appliedPromoCode}
            isValidatingPromo={isValidatingPromo}
            isCheckingOut={isCheckout}
          />
        </div>
      </main>

      {!isLoadingWishlist && wishlistData.length > 0 && (
        <WishlistCarouselClient
          items={wishlistData}
          onAddToCart={handleAddToCart}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      )}
    </div>
  );
}
