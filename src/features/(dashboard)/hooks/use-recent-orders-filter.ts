import { useQueryState } from "nuqs";

export const orderStatusOptions = [
  "all",
  "COMPLETED",
  "PENDING",
  "CANCELLED",
] as const;

export type OrderStatusFilter = (typeof orderStatusOptions)[number];

const statusMap: Record<string, OrderStatusFilter> = {
  all: "all",
  completed: "COMPLETED",
  pending: "PENDING",
  cancelled: "CANCELLED",
};

export function useOrderStatusFilter() {
  return useQueryState<OrderStatusFilter>("orderStatus", {
    defaultValue: "all",

    parse: (value) => {
      return statusMap[value] ?? "all";
    },

    serialize: (value) => value.toLowerCase(),

    clearOnDefault: true,
    shallow: true,
  });
}

export const sortOptions = ["latest", "oldest", "highest"] as const;
export type SortBy = (typeof sortOptions)[number];

export function useOrderSort() {
  return useQueryState<SortBy>("orderSort", {
    defaultValue: "latest",

    parse: (value) => {
      if (sortOptions.includes(value as SortBy)) {
        return value as SortBy;
      }
      return "latest";
    },

    serialize: (value) => value.toLowerCase(),

    clearOnDefault: true,
    shallow: true,
  });
}
