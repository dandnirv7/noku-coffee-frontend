import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsArrayOf,
} from "nuqs";

export type SortType = "price_asc" | "price_desc" | "name_asc" | "name_desc";
export type ProductType = "BEAN" | "GEAR" | "BUNDLE";

export const searchParamsSchema = {
  search: parseAsString.withDefault(""),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  type: parseAsStringLiteral<ProductType>(["BEAN", "GEAR", "BUNDLE"]),
  sort: parseAsStringLiteral<SortType>([
    "price_asc",
    "price_desc",
    "name_asc",
    "name_desc",
  ]).withDefault("name_asc"),
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(1000000),
  viewMode: parseAsStringLiteral(["grid", "list"]).withDefault("grid"),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(9),
};
