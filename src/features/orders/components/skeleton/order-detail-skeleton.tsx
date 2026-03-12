import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <Skeleton className="h-20 w-20 rounded-md mr-4 shrink-0" />
                    <div className="grow">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-5 w-20 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-5 w-28 mb-2" />
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Skeleton className="h-4 w-4 mr-2 mt-0.5" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-28 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-1" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-1" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 ml-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <Skeleton className="absolute w-6 h-6 rounded-full -left-3" />
                    <div className="flex items-center mb-1">
                      <Skeleton className="h-5 w-24 mr-3" />
                      {index === 0 && <Skeleton className="h-5 w-12" />}
                    </div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>

                <div className="pt-2">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-start">
                    <Skeleton className="h-4 w-4 mr-2 mt-0.5" />
                    <div>
                      <Skeleton className="h-4 w-12 mb-1" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {}
          <Card className="bg-orange-50 border-orange-100">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
