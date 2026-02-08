import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function FilterPanelSkeleton() {
  return (
    <div className="p-4 space-y-4 w-full rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-16 h-8" />
      </div>
      <Separator />

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-20 h-5" />
            <div className="pt-2 space-y-2">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center pl-1 space-x-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="w-28 h-4" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
