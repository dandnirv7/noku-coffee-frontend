import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="space-y-8">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>

        <div className="grid gap-8 md:grid-cols-12 lg:gap-12">
          <div className="space-y-4 md:col-span-7">
            <Skeleton className="w-full rounded-3xl aspect-square" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full rounded-xl aspect-square" />
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6 md:col-span-5">
            <div className="space-y-4">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-1/3 h-8" />
            </div>
            <div className="pt-6 space-y-4 border-t">
              <Skeleton className="w-full h-14 rounded-2xl" />
              <div className="flex gap-4">
                <Skeleton className="w-28 h-12 rounded-xl" />
                <Skeleton className="flex-1 h-12 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 space-y-6 border-t border-border">
        <div className="space-y-2">
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-48 h-4" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full rounded-2xl aspect-square" />

              <div className="space-y-2">
                <Skeleton className="w-20 h-3" />
                <Skeleton className="w-full h-6" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
