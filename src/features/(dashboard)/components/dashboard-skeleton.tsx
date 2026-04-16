"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SectionCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="py-2 w-full">
          <CardHeader className="flex flex-row items-center justify-between px-4 pb-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </CardHeader>
          <CardContent className="px-4">
            <Skeleton className="h-8 w-24 mb-1" />
          </CardContent>
          <div className="flex items-center justify-between px-4 text-sm mt-4 mb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function ChartsStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      <div className="col-span-1 lg:col-span-2">
        <Card className="h-[430px]">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="h-[430px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-24" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-8">
            <Skeleton className="h-44 w-44 rounded-full mb-8" />
            <div className="flex justify-center gap-4 w-full">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function RecentOrdersSkeleton() {
  return (
    <Card className="flex flex-col h-full w-full overflow-hidden">
      <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div className="flex flex-col space-y-1 w-full sm:w-auto">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60 max-w-full" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <Skeleton className="h-10 w-full sm:w-[400px] rounded-md" />
          <Skeleton className="h-10 w-full sm:w-[180px] rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="rounded-md border w-full overflow-hidden">
          <div className="border-b p-4 bg-muted/20">
            <div className="grid grid-cols-5 gap-4 min-w-[600px]">
              <Skeleton className="h-4 w-full max-w-[120px]" />
              <Skeleton className="h-4 w-full max-w-[150px]" />
              <Skeleton className="h-4 w-full max-w-[100px]" />
              <Skeleton className="h-4 w-full max-w-[100px]" />
              <div className="flex justify-end">
                <Skeleton className="h-4 w-full max-w-[80px]" />
              </div>
            </div>
          </div>

          <div className="p-4 space-y-5 overflow-x-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-4 items-center min-w-[600px]"
              >
                <Skeleton className="h-4 w-full max-w-[120px]" />
                <Skeleton className="h-4 w-full max-w-[150px]" />
                <Skeleton className="h-4 w-full max-w-[100px]" />
                <Skeleton className="h-4 w-full max-w-[100px]" />
                <div className="flex justify-end w-full">
                  <Skeleton className="h-6 w-[80px] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TopProductsSkeleton() {
  return (
    <Card className="h-[430px]">
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="space-y-2 flex flex-col items-end">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function LowStockSkeleton() {
  return (
    <Card className="py-0 flex h-[430px] w-full flex-col border-red-100 shadow-sm">
      <CardHeader className="bg-red-50/50 py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-4 w-56 mt-2" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6 pt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function BottomGridsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <TopProductsSkeleton />
      <LowStockSkeleton />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCardsSkeleton />
        <ChartsStatsSkeleton />
        <RecentOrdersSkeleton />
        <BottomGridsSkeleton />
      </div>
    </div>
  );
}
