import { Skeleton } from "@/components/ui/skeleton";

export function SearchProductListingTopBarSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-4 mb-6 border-b md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-md">
        <Skeleton className="w-full h-10 rounded-md" />
      </div>

      <div className="flex gap-3 items-center w-full md:w-auto">
        <Skeleton className="hidden w-12 h-4 sm:inline" />
        <Skeleton className="h-10 w-[180px] rounded-lg" />
        <div className="flex items-center p-1 space-x-1 rounded-lg border bg-muted/50">
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="w-8 h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
