import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton() {
  return (
    <div className="container px-4 py-8 mx-auto xl:max-w-7xl">
      <div className="mb-8 space-y-2">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-32 h-4" />
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-md" />
          ))}
        </div>

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border border-border shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-24 h-4" />
              </div>
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>

            <div className="pt-4 mt-4 space-y-4 border-t border-border">
              <div className="flex gap-4">
                <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-3/4 h-5" />
                  <Skeleton className="w-1/4 h-4" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
              <Skeleton className="w-32 h-6" />
              <div className="flex gap-2">
                <Skeleton className="w-24 h-9 rounded-xl" />
                <Skeleton className="w-32 h-9 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
