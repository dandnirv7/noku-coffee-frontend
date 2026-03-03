"use client";

import { useState } from "react";
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

  const handleDeleteItem = async (productId: string) => {
    try {
      setPendingItemId(productId);
      await onDeleteItem(productId);
    } finally {
      setPendingItemId(null);
    }
  };

  const handleMoveToWishlist = async (productId: string) => {
    if (!onMoveToWishlist) return;
    try {
      setPendingItemId(productId);
      await onMoveToWishlist(productId);
    } finally {
      setPendingItemId(null);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
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
      <Card className="py-4">
        {items.map((item) => (
          <CardContent key={item.id}>
            <CartItem
              item={item}
              updateQuantity={handleUpdateQuantity}
              onDeleteItem={handleDeleteItem}
              onMoveToWishlist={handleMoveToWishlist}
              isPending={pendingItemId === item.productId}
            />
            <Separator className="bg-gray-200 mt-4" />
          </CardContent>
        ))}
        <CardFooter>
          <Button
            variant="link"
            className="w-auto underline underline-offset-4 underline-primary"
            onClick={() => setIsClearingCart(true)}
            disabled={isClearingCart}
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
              Apakah Anda yakin ingin menghapus semua item ({items.length}) dari
              keranjang?
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
