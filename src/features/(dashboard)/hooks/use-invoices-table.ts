import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";

export const invoiceStatusOptions = [
  "all",
  "PAID",
  "PENDING",
  "EXPIRED",
] as const;
export type InvoiceStatusFilter = (typeof invoiceStatusOptions)[number];

export const invoiceSortOptions = ["latest", "oldest", "highest"] as const;
export type InvoiceSortBy = (typeof invoiceSortOptions)[number];

const sharedOptions = { clearOnDefault: true, shallow: true } as const;

export function useInvoicesTable() {
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsStringEnum<InvoiceStatusFilter>(
      Object.values(invoiceStatusOptions) as InvoiceStatusFilter[],
    )
      .withDefault("all")
      .withOptions(sharedOptions),
  );

  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringEnum<InvoiceSortBy>(
      Object.values(invoiceSortOptions) as InvoiceSortBy[],
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
