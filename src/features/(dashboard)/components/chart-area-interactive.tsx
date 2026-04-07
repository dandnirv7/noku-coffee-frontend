"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, toRupiah } from "@/lib/utils";
import { useRevenueOrders } from "../api/get-revenue-orders";

const chartConfig = {
  revenue: {
    label: "Pendapatan",
    color: "#f9a01b",
  },
  orders: {
    label: "Pesanan",
    color: "#4ade80",
  },
} satisfies ChartConfig;

const timeFrameMap = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
} as const;

type TimeFrameUI = keyof typeof timeFrameMap;

export function ChartRevenueOrders() {
  const isMobile = useIsMobile();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeQuery = searchParams.get("periodRevenue");
  const isValidTimeFrame =
    timeQuery === "daily" || timeQuery === "weekly" || timeQuery === "monthly";
  const timeFrame: TimeFrameUI = isValidTimeFrame
    ? (timeQuery as TimeFrameUI)
    : "monthly";

  const handleTimeFrameChange = (val: TimeFrameUI) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("periodRevenue", val);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data: revenueOrder, isLoading } = useRevenueOrders({
    timeFrame: timeFrameMap[timeFrame],
  });

  const chartData = revenueOrder || [];

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
          <ToggleGroup
            type="single"
            value={timeFrame}
            onValueChange={(val) =>
              val && handleTimeFrameChange(val as TimeFrameUI)
            }
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
            disabled={isLoading}
          >
            <ToggleGroupItem value="daily">Harian</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Mingguan</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Bulanan</ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={timeFrame}
            onValueChange={handleTimeFrameChange}
            disabled={isLoading}
          >
            <SelectTrigger
              className="flex w-32 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
            >
              <SelectValue placeholder="Pilih..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="daily">Harian</SelectItem>
              <SelectItem value="weekly">Mingguan</SelectItem>
              <SelectItem value="monthly">Bulanan</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <span className="text-sm font-medium text-muted-foreground">
              Memuat data...
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
