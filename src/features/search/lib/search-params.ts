import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsArrayOf,
} from "nuqs";

export const searchParamsSchema = {
  q: parseAsString.withDefault(""),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  origin: parseAsArrayOf(parseAsString).withDefault([]),
  sortBy: parseAsStringLiteral([
    "relevance",
    "price-asc",
    "price-desc",
    "rating-desc",
  ]).withDefault("relevance"),
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(1000000),
  viewMode: parseAsStringLiteral(["grid", "list"]).withDefault("grid"),
};
