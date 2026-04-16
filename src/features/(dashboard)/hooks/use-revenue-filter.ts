import { parseAsStringEnum, useQueryState } from "nuqs";

export const timeFrameOptions = ["daily", "weekly", "monthly"] as const;
export type TimeFrameUI = (typeof timeFrameOptions)[number];

export function useRevenueFilter() {
  return useQueryState(
    "periodRevenue",
    parseAsStringEnum<TimeFrameUI>(Object.values(timeFrameOptions))
      .withDefault("monthly")
      .withOptions({
        clearOnDefault: true,
        shallow: true,
      }),
  );
}
