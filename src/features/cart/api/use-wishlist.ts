import { queryClient } from "@/lib/react-query";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { ToggleWishlistResponse } from "../lib/wishlist-schema";
import { getWishlist, toggleWishlist } from "./wishlist";

export const WISHLIST_QUERY_KEY = ["wishlist"];

export const useWishlist = () => {
  return useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: getWishlist,
  });
};

type UseToggleWishlistParams = {
  mutationConfig?: UseMutationOptions<ToggleWishlistResponse, unknown, string>;
};

export const useToggleWishlist = ({
  mutationConfig,
}: UseToggleWishlistParams = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: toggleWishlist,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
