import { parseAsStringEnum, useQueryState } from "nuqs";

export const orderPeriodOptions = ["daily", "weekly", "monthly"] as const;
export type OrderPeriodUI = (typeof orderPeriodOptions)[number];

export function useOrdersFilter() {
  return useQueryState(
    "periodOrder",
    parseAsStringEnum<OrderPeriodUI>(Object.values(orderPeriodOptions))
      .withDefault("monthly")
      .withOptions({
        clearOnDefault: true,
        shallow: true,
      }),
  );
}
