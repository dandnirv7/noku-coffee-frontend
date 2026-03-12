import { parseAsString, createSearchParamsCache } from "nuqs/server";

export const orderParamsSchema = {
  search: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
};

export const orderParamsCache = createSearchParamsCache(orderParamsSchema);
