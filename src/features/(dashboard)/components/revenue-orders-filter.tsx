"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeFrameUI, useRevenueFilter } from "../hooks/use-revenue-filter";

interface RevenueOrdersFilterProps {
  disabled?: boolean;
}

export function RevenueOrdersFilter({ disabled }: RevenueOrdersFilterProps) {
  const [timeFrame, setTimeFrame] = useRevenueFilter();

  return (
    <>
      <ToggleGroup
        type="single"
        value={timeFrame}
        onValueChange={(val) => val && setTimeFrame(val as TimeFrameUI)}
        variant="outline"
        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
        disabled={disabled}
      >
        <ToggleGroupItem value="daily">Harian</ToggleGroupItem>
        <ToggleGroupItem value="weekly">Mingguan</ToggleGroupItem>
        <ToggleGroupItem value="monthly">Bulanan</ToggleGroupItem>
      </ToggleGroup>

      <Select
        value={timeFrame}
        onValueChange={(val) => setTimeFrame(val as TimeFrameUI)}
        disabled={disabled}
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
    </>
  );
}
