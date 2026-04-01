import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

export function OrderListSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Card className="overflow-hidden p-0">
            <CardHeader className="py-4 bg-gray-50/50">
              <div className="flex flex-col gap-4 justify-between md:flex-row md:items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-24 h-5 ml-2" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-1.5" />
                    <Skeleton className="w-28 h-4" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-24 h-6 rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent">
                    <Skeleton className="w-16 h-16 rounded-md md:w-20 md:h-20 shrink-0" />
                    <div className="flex flex-col flex-1 gap-1 min-w-0">
                      <Skeleton className="w-3/4 h-5 mb-1" />
                      <Skeleton className="w-12 h-4" />
                    </div>
                    <div className="text-right shrink-0">
                      <Skeleton className="w-24 h-5 mb-1" />
                    </div>
                  </div>
                </div>

                <Separator className="opacity-50" />

                <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
                  <div className="space-y-1.5">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-32 h-6" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="w-20 h-9 rounded-md" />
                    <Skeleton className="w-24 h-9 rounded-md" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
