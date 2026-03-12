import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrderTrackingPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Skeleton className="h-4 w-36" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-36 mb-2" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                  <Skeleton className="h-5 w-5 mt-0.5 mr-3 shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="w-full h-2.5 rounded-full" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-4 w-24 mb-1" />
                    <div className="flex items-center">
                      <Skeleton className="h-3 w-3 mr-1" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-64 rounded-lg" />
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 ml-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <Skeleton className="absolute w-6 h-6 rounded-full -left-3" />
                    <div className="flex items-center mb-1">
                      <Skeleton className="h-5 w-24 mr-3" />
                      {index === 3 && <Skeleton className="h-5 w-12" />}
                    </div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
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
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-5 w-28 mb-2" />
                  <div className="flex items-start">
                    <Skeleton className="h-4 w-4 mr-2 mt-0.5" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Skeleton className="h-4 w-4 mr-2 mt-0.5" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="flex items-start">
                      <Skeleton className="h-4 w-4 mr-2 mt-0.5" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Skeleton className="h-5 w-28 mb-2" />
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
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
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}

                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
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
