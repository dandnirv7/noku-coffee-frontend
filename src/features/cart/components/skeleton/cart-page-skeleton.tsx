import { Skeleton } from "@/components/ui/skeleton";
import { CartItemsListSkeleton } from "./cart-items-list-skeleton";
import { OrderSummarySkeleton } from "./order-summary-skeleton";
import { WishlistCarouselSkeleton } from "./wishlist-carousel-skeleton";

export function CartPageSkeleton() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-2  items-start mb-6">
          <Skeleton className="h-8 w-48 bg-gray-200" />
          <Skeleton className="h-5 w-32 bg-gray-200" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex-1">
            <CartItemsListSkeleton />
          </div>

          <OrderSummarySkeleton />
        </div>
      </main>

      <WishlistCarouselSkeleton />
    </div>
  );
}
