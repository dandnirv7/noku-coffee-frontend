import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";

export const orderStatusOptions = [
  "all",
  "PENDING",
  "PAID",
  "COMPLETED",
  "CANCELLED",
  "REFUND_REQUESTED",
] as const;
export type OrderStatusFilter = (typeof orderStatusOptions)[number];

export const orderSortOptions = ["latest", "oldest", "highest"] as const;
export type OrderSortBy = (typeof orderSortOptions)[number];

const sharedOptions = { clearOnDefault: true, shallow: true } as const;

export function useOrdersTable() {
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsStringEnum<OrderStatusFilter>(
      Object.values(orderStatusOptions) as OrderStatusFilter[],
    )
      .withDefault("all")
      .withOptions(sharedOptions),
  );

  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringEnum<OrderSortBy>(
      Object.values(orderSortOptions) as OrderSortBy[],
    )
      .withDefault("latest")
      .withOptions(sharedOptions),
  );

  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions(sharedOptions),
  );

  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsInteger.withDefault(0).withOptions(sharedOptions),
  );

  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10).withOptions(sharedOptions),
  );

  return {
    statusFilter,
    sortBy,
    search,
    pageIndex,
    pageSize,
    setStatusFilter,
    setSortBy,
    setSearch,
    setPageIndex,
    setPageSize,
  };
}
