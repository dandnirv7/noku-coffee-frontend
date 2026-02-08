"use client";

import { ProductCard } from "@/components/shared/product-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WishlistItem } from "@/features/cart/lib/wishlist-schema";
import { useEffect, useState } from "react";

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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Wishlist ({items.length})
        </h1>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
            setApi={setApi}
          >
            <div className="relative">
              {canScrollPrev && (
                <div className="w-32 absolute left-0 top-0 bottom-0 bg-linear-to-r from-gray-100/60 to-transparent z-10 pointer-events-none" />
              )}
              {canScrollNext && (
                <div className="w-32 absolute right-0 top-0 bottom-0 bg-linear-to-l from-gray-100/60 to-transparent z-10 pointer-events-none" />
              )}

              <CarouselContent>
                {items.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-[22.22%]"
                  >
                    <ProductCard
                      product={item.product}
                      viewMode="grid"
                      onAddToCart={(item) => onAddToCart(item)}
                      isWishlist={true}
                      onDelete={(item) => onRemoveFromWishlist(item.productId)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            {canScrollPrev && <CarouselPrevious className="left-4 z-99" />}
            {canScrollNext && <CarouselNext className="right-4 z-99" />}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
