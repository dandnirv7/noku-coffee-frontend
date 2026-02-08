import { Skeleton } from "@/components/ui/skeleton";

export function WishlistCarouselSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-hidden  lg:px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="shrink-0 w-64 bg-white rounded-2xl border border-gray-100 p-4"
            >
              <Skeleton className="w-full h-48 rounded-lg mb-4" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-24 mt-3" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
