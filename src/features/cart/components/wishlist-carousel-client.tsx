"use client";

import { ProductCard } from "@/components/shared/product-card";
import { WishlistItem } from "@/features/cart/lib/wishlist-schema";

interface WishlistCarouselClientProps {
  items: WishlistItem[];
  onAddToCart: (item: { productId: string; quantity: number }) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export function WishlistCarouselClient({
  items,
  onAddToCart,
  onRemoveFromWishlist,
}: WishlistCarouselClientProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Wishlist ({items.length})
        </h1>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.map((item) => (
              <div
                key={item.id}
                className="shrink-0 snap-start w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)]"
              >
                <ProductCard
                  product={item.product}
                  viewMode="grid"
                  onAddToCart={(item) => onAddToCart(item)}
                  isInWishlist={true}
                  onToggleWishlist={(productId) =>
                    onRemoveFromWishlist(productId)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
