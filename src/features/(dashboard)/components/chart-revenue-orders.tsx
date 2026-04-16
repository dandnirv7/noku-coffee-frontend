// components/charts/chart-revenue-orders.tsx
"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, toRupiah } from "@/lib/utils";

import { useRevenueOrders } from "../api/get-revenue-orders";
import { useRevenueFilter } from "../hooks/use-revenue-filter";
import { RevenueOrdersFilter } from "./revenue-orders-filter";

const chartConfig = {
  revenue: { label: "Pendapatan", color: "#f9a01b" },
  orders: { label: "Pesanan", color: "#4ade80" },
} satisfies ChartConfig;

export function ChartRevenueOrders() {
  const isMobile = useIsMobile();
  const [timeFrame] = useRevenueFilter();

  const {
    data: revenueOrder,
    isLoading,
    isFetching,
  } = useRevenueOrders({
    timeFrame,
  });

  const chartData = revenueOrder || [];

  if (isLoading) {
    return (
      <Card className="h-[430px]">
        <CardHeader>
          <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle>Pendapatan & Pesanan</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-sm bg-[#f9a01b]" />
              <span>Pendapatan (Rp)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-[#4ade80]" />
              <span>Pesanan (Qty)</span>
            </div>
          </div>
        </div>

        <CardAction>
          <RevenueOrdersFilter disabled={isLoading} />
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 relative">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-all">
            <span className="text-sm font-medium text-muted-foreground">
              Memperbarui data...
            </span>
          </div>
        )}

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <ComposedChart data={chartData} margin={{ left: -20, right: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              yAxisId="revenue"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${value / 1000000}Jt`;
                if (value >= 1000) return `${value / 1000}k`;
                return value.toString();
              }}
            />
            <YAxis
              yAxisId="orders"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className={isMobile ? "hidden" : "block"}
            />

            <ChartTooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex items-center gap-2 w-full justify-between min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "size-2",
                            name === "revenue" ? "rounded-sm" : "rounded-full",
                          )}
                          style={{
                            backgroundColor:
                              chartConfig[name as keyof typeof chartConfig]
                                .color,
                          }}
                        />
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig].label}:
                        </span>
                      </div>
                      <span className="font-semibold tabular-nums text-right">
                        {name === "revenue"
                          ? toRupiah(value as number)
                          : `${value} trx`}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Bar
              yAxisId="revenue"
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Line
              yAxisId="orders"
              dataKey="orders"
              type="monotone"
              stroke="var(--color-orders)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--color-orders)",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
