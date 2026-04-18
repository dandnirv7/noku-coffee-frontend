import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";

export const customerSortOptions = [
  "newest",
  "oldest",
  "most-orders",
  "highest-spend",
] as const;
export type CustomerSortBy = (typeof customerSortOptions)[number];

const sharedOptions = { clearOnDefault: true, shallow: true } as const;

export function useCustomersTable() {
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringEnum<CustomerSortBy>(
      Object.values(customerSortOptions) as CustomerSortBy[],
    )
      .withDefault("newest")
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
    sortBy,
    search,
    pageIndex,
    pageSize,
    setSortBy,
    setSearch,
    setPageIndex,
    setPageSize,
  };
}

export const reviewRatingOptions = ["all", "1", "2", "3", "4", "5"] as const;
export type ReviewRatingFilter = (typeof reviewRatingOptions)[number];

export const reviewSortOptions = [
  "latest",
  "oldest",
  "highest",
  "lowest",
] as const;
export type ReviewSortBy = (typeof reviewSortOptions)[number];

export function useReviewsTable() {
  const [ratingFilter, setRatingFilter] = useQueryState(
    "rating",
    parseAsStringEnum<ReviewRatingFilter>(
      Object.values(reviewRatingOptions) as ReviewRatingFilter[],
    )
      .withDefault("all")
      .withOptions(sharedOptions),
  );

  const [sortBy, setSortBy] = useQueryState(
    "reviewSort",
    parseAsStringEnum<ReviewSortBy>(
      Object.values(reviewSortOptions) as ReviewSortBy[],
    )
      .withDefault("latest")
      .withOptions(sharedOptions),
  );

  const [search, setSearch] = useQueryState(
    "reviewQ",
    parseAsString.withDefault("").withOptions(sharedOptions),
  );

  const [pageIndex, setPageIndex] = useQueryState(
    "reviewPage",
    parseAsInteger.withDefault(0).withOptions(sharedOptions),
  );

  const [pageSize, setPageSize] = useQueryState(
    "reviewLimit",
    parseAsInteger.withDefault(10).withOptions(sharedOptions),
  );

  return {
    ratingFilter,
    sortBy,
    search,
    pageIndex,
    pageSize,
    setRatingFilter,
    setSortBy,
    setSearch,
    setPageIndex,
    setPageSize,
  };
}
