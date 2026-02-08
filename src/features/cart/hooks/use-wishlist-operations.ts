import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";
import { useCreateCart } from "../api/use-create-cart";
import { useToggleWishlist, useWishlist } from "../api/use-wishlist";

export function useWishlistOperations() {
  const { data: wishlistData, isLoading: isLoadingWishlist } = useWishlist();

  const { mutate: toggleWishlist, isPending: isTogglingWishlist } =
    useToggleWishlist({
      mutationConfig: {
        onSuccess: (data) => {
          if (data.data.isAdded) {
            toast.success("Item berhasil ditambahkan ke wishlist");
          } else {
            toast.success("Item berhasil dihapus dari wishlist");
          }
        },
        onError: (error) => {
          const errorMessage = getErrorMessage(
            error,
            "Gagal mengubah wishlist",
          );
          toast.error(errorMessage);
        },
      },
    });

  const { mutate: addToCart, isPending: isAddingToCart } = useCreateCart({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Item berhasil ditambahkan ke keranjang");
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(
          error,
          "Gagal menambahkan item ke keranjang",
        );
        toast.error(errorMessage);
      },
    },
  });

  const addToCartFromWishlist = (item: {
    productId: string;
    quantity: number;
  }) => {
    addToCart(item, {
      onSuccess: () => {
        toggleWishlist(item.productId);
      },
    });
  };

  const moveToWishlist = (
    productId: string,
    onDeleteFromCart: (productId: string) => void,
  ) => {
    toggleWishlist(productId, {
      onSuccess: (data) => {
        if (data.data.isAdded) {
          onDeleteFromCart(productId);
        }
      },
    });
  };

  return {
    wishlistData: wishlistData?.data || [],
    isLoadingWishlist,
    isTogglingWishlist,
    isAddingToCart,
    toggleWishlist,
    addToCartFromWishlist,
    moveToWishlist,
  };
}
