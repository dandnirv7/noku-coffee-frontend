import DashboardInnerPage from "../components/dashboard-inner-page";
import { Suspense } from "react";
import { DashboardSkeleton } from "../components/dashboard-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardInnerPage />
    </Suspense>
  );
}
