import { Skeleton } from "@/components/ui/skeleton";

export function OrderSummarySkeleton() {
  return (
    <div className="w-full lg:w-96 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
        <Skeleton className="h-6 w-40 mb-6" />

        <div className="mb-6">
          <Skeleton className="h-3 w-20 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-16" />
          </div>
        </div>

        <div className="space-y-3 pb-6 border-b border-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center py-4 mb-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex gap-2 flex-col">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>

        <Skeleton className="h-3 w-full mt-4" />
      </div>
    </div>
  );
}
