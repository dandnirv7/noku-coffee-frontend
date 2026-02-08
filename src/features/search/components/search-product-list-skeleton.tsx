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
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          : "grid-cols-1",
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-xl border border-border p-4 space-y-4",
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
          <div className="flex-1 space-y-2">
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <div className="flex justify-between pt-4">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-24 h-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
