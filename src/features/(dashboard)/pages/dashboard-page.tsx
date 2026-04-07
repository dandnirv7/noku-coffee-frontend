// app/dashboard/page.tsx
import DashboardInnerPage from "../components/dashboard-inner-page";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardFallback() {
  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <Skeleton className="h-8 w-48 rounded-md" />
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-[230px] p-2 border rounded-lg">
            <Skeleton className="h-5 w-24 rounded-md mb-2" />
            <Skeleton className="h-8 w-32 rounded-md mb-2" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardInnerPage />
    </Suspense>
  );
}
