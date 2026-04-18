import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryState } from "nuqs";

export const promoStatusOptions = ["all", "active", "inactive", "expired"] as const;
export type PromoStatusFilter = (typeof promoStatusOptions)[number];

const sharedOptions = { clearOnDefault: true, shallow: true } as const;

export function usePromosTable() {
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsStringEnum<PromoStatusFilter>(
      Object.values(promoStatusOptions) as PromoStatusFilter[],
    )
      .withDefault("all")
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
    search,
    pageIndex,
    pageSize,
    setStatusFilter,
    setSearch,
    setPageIndex,
    setPageSize,
  };
}
