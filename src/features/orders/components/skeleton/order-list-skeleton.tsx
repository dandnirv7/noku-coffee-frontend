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
          className="p-6 bg-white rounded-2xl border border-border shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>

          <div className="pt-4 mt-4 space-y-4 border-t border-border">
            <div className="flex gap-4">
              <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-5" />
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
            <Skeleton className="w-32 h-6" />
            <div className="flex gap-2">
              <Skeleton className="w-24 h-9 rounded-xl" />
              <Skeleton className="w-32 h-9 rounded-xl" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
