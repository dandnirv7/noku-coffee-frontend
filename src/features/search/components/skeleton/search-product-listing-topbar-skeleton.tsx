import { Skeleton } from "@/components/ui/skeleton";

export function SearchProductListingTopBarSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-4 mb-6 border-b lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-xl">
        <Skeleton className="w-full h-10 rounded-md" />
      </div>

      <div className="flex gap-3 items-center w-full lg:w-auto">
        <Skeleton className="hidden w-12 h-4 lg:inline" />
        <Skeleton className="block w-full h-10 rounded-lg lg:hidden" />
        <Skeleton className="w-44 h-10 rounded-lg md:20" />
        <Skeleton className="hidden w-24 h-4 md:inline lg:hidden" />
        <Skeleton className="block w-44 h-10 rounded-lg md:20 lg:hidden" />
        <div className="hidden items-center p-1 space-x-1 rounded-lg border md:flex bg-muted/50">
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="w-8 h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
