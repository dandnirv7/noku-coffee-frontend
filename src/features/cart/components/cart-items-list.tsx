"use client";

import { useOptimistic, startTransition, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItem } from "./cart-item";
import { CartItem as CartItemType } from "../lib/cart-schema";
import { motion, AnimatePresence } from "motion/react";

interface CartItemsListProps {
  items: CartItemType[];
  onClearCart: () => Promise<void>;
  onMoveToWishlist?: (productId: string) => Promise<void>;
  onUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  onDeleteItem: (productId: string) => Promise<void>;
}

export function CartItemsList({
  items,
  onClearCart,
  onMoveToWishlist,
  onUpdateQuantity,
  onDeleteItem,
}: CartItemsListProps) {
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [isClearingCart, setIsClearingCart] = useState(false);

  type OptimisticAction =
    | { type: "REMOVE"; id: string }
    | { type: "UPDATE"; id: string; quantity: number };

  const [optimisticItems, dispatchOptimistic] = useOptimistic(
    items,
    (state: CartItemType[], action: OptimisticAction) => {
      switch (action.type) {
        case "REMOVE":
          return state.filter((item) => item.productId !== action.id);
        case "UPDATE":
          return state.map((item) =>
            item.productId === action.id
              ? { ...item, quantity: action.quantity }
              : item,
          );
        default:
          return state;
      }
    },
  );

  const handleDeleteItem = async (productId: string) => {
    startTransition(() => {
      dispatchOptimistic({ type: "REMOVE", id: productId });
    });
    try {
      setPendingItemId(productId);
      await onDeleteItem(productId);
    } finally {
      setPendingItemId(null);
    }
  };

  const handleMoveToWishlist = async (productId: string) => {
    if (!onMoveToWishlist) return;
    startTransition(() => {
      dispatchOptimistic({ type: "REMOVE", id: productId });
    });
    try {
      setPendingItemId(productId);
      await onMoveToWishlist(productId);
    } finally {
      setPendingItemId(null);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    startTransition(() => {
      dispatchOptimistic({ type: "UPDATE", id: productId, quantity });
    });
    try {
      setPendingItemId(productId);
      await onUpdateQuantity(productId, quantity);
    } finally {
      setPendingItemId(null);
    }
  };

  const handleConfirmClearCart = async () => {
    try {
      setIsClearingCart(true);
      await onClearCart();
      setIsClearingCart(false);
    } catch {
      setIsClearingCart(false);
    }
  };

  return (
    <>
      <Card className="py-4 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {optimisticItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                height: 0,
                overflow: "hidden",
                marginTop: 0,
                marginBottom: 0,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <CardContent>
                <CartItem
                  item={item}
                  updateQuantity={handleUpdateQuantity}
                  onDeleteItem={handleDeleteItem}
                  onMoveToWishlist={handleMoveToWishlist}
                  isPending={pendingItemId === item.productId}
                />
                <Separator className="bg-gray-200 mt-4" />
              </CardContent>
            </motion.div>
          ))}
        </AnimatePresence>
        <CardFooter className="pt-4">
          <Button
            variant="link"
            className="w-auto underline underline-offset-4 underline-primary p-0"
            onClick={() => setIsClearingCart(true)}
            disabled={isClearingCart || optimisticItems.length === 0}
          >
            {isClearingCart ? "Menghapus..." : "Hapus semua dari keranjang"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isClearingCart} onOpenChange={setIsClearingCart}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Semua Item?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus semua item dari keranjang?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsClearingCart(false)}
              disabled={isClearingCart}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmClearCart}
              disabled={isClearingCart}
            >
              {isClearingCart ? "Menghapus..." : "Hapus Semua"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
