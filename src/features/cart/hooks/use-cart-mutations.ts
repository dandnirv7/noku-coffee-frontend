import { toast } from "sonner";
import { useCreateCart } from "../api/use-create-cart";
import { useUpdateQuantity } from "../api/use-update-quantity";
import { useDeleteItem } from "../api/use-delete-item";
import { useClearCart } from "../api/use-clear-cart";
import { useCheckoutProduct } from "../api/use-checkout";

export function useCartMutations() {
  const { mutate: addToCart, isPending: isAdding } = useCreateCart({
    mutationConfig: {
      onSuccess: () => toast.success("Item berhasil ditambahkan ke keranjang"),
      onError: () => toast.error("Gagal menambahkan item"),
    },
  });

  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateQuantity({
    mutationConfig: {
      onSuccess: () => toast.success("Jumlah berhasil diubah"),
    },
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteItem({
    mutationConfig: {
      onSuccess: () => toast.success("Item berhasil dihapus"),
    },
  });

  const { mutate: clearCart, isPending: isClearing } = useClearCart({
    mutationConfig: {
      onSuccess: () =>
        toast.success("Seluruh item di dalam keranjang berhasil dihapus"),
    },
  });

  const { mutate: checkoutProduct, isPending: isCheckout } = useCheckoutProduct(
    {
      mutationConfig: {
        onSuccess: (data) => {
          toast.success("Checkout berhasil");
          if (data.data.paymentUrl) {
            window.location.href = data.data.paymentUrl;
          }
        },
        onError: (error) => {
          toast.error("Checkout gagal");
        },
      },
    },
  );

  return {
    addToCart,
    updateQuantity,
    deleteItem,
    clearCart,
    checkoutProduct,
    isCheckout,
    isLoading: isAdding || isUpdating || isDeleting || isClearing || isCheckout,
  };
}
