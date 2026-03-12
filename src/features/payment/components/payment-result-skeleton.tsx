import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PaymentResultSkeleton() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-pattern -z-20" />
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-muted/20 blur-[120px] -z-10 animate-float" />

      <div className="relative w-full max-w-md">
        <Card className="w-full shadow-2xl border-border/50 bg-surface backdrop-blur-sm relative overflow-hidden">
          <CardHeader className="text-center pb-2 pt-8 space-y-4">
            <div className="flex justify-center mb-2">
              <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
            </div>
            <div className="h-6 w-48 bg-muted animate-pulse mx-auto rounded" />
            <div className="h-4 w-64 bg-muted animate-pulse mx-auto rounded" />
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="h-24 w-full bg-muted animate-pulse rounded-xl" />
            <Separator className="bg-border/60" />
            <div className="h-32 w-full bg-muted animate-pulse rounded-xl" />
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pb-8">
            <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
            <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
