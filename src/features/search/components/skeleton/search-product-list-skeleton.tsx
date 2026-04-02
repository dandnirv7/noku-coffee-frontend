import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const SearchProductListSkeleton = ({
  viewMode,
}: {
  viewMode: "grid" | "list";
}) => {
  return (
    <div
      className={cn(
        "grid gap-4",
        viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-xl border border-border p-4 space-y-2 md:space-y-4",
            viewMode === "list" && "flex gap-4 space-y-0",
          )}
        >
          <Skeleton
            className={cn(
              viewMode === "grid"
                ? "aspect-square w-full"
                : "h-32 w-32 shrink-0",
            )}
          />
          <div className="flex-1 space-y-1 md:space-y-2">
            <Skeleton className="w-full h-4 md:w-1/2" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="hidden w-full h-4 md:block" />
            <Skeleton className="hidden w-full h-4 md:block" />
            <div className="flex flex-col gap-2 md:justify-between md:items-end md:flex-row md:gap-2">
              <div className="flex-col-reverse justify-between pt-4 space-y-2 md:flex-col md:flex">
                <Skeleton className="w-16 h-4 md:h-6 md:w-24" />
                <Skeleton className="w-24 h-4 md:h-6 md:w-32" />
              </div>
              <Skeleton className="w-full h-8 md:w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
