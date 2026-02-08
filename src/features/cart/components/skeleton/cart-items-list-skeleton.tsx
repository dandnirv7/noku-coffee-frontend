import { Skeleton } from "@/components/ui/skeleton";

export function CartItemsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="w-full sm:w-24 h-24 rounded-lg shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Skeleton className="h-8 w-24" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
