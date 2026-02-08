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
  onClearCart: () => void;
  onMoveToWishlist?: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onDeleteItem: (productId: string) => void;
}

export function CartItemsList({
  items,
  onClearCart,
  onMoveToWishlist,
  onUpdateQuantity,
  onDeleteItem,
}: CartItemsListProps) {
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

  const handleClearCartClick = () => {
    setIsClearCartModalOpen(true);
  };

  const handleConfirmClearCart = () => {
    onClearCart();
    setIsClearCartModalOpen(false);
  };

  const handleCancelClearCart = () => {
    setIsClearCartModalOpen(false);
  };

  return (
    <>
      <Card className="py-4">
        {items.map((item) => (
          <CardContent key={item.id}>
            <CartItem
              item={item}
              updateQuantity={onUpdateQuantity}
              onDeleteItem={onDeleteItem}
              onMoveToWishlist={onMoveToWishlist}
            />
            <Separator className="bg-gray-200 mt-4" />
          </CardContent>
        ))}
        <CardFooter>
          <Button
            variant="link"
            className="w-auto underline underline-offset-4 underline-primary"
            onClick={handleClearCartClick}
          >
            Hapus semua dari keranjang
          </Button>
        </CardFooter>
      </Card>

      <Dialog
        open={isClearCartModalOpen}
        onOpenChange={setIsClearCartModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Semua Item?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <span className="font-semibold text-gray-900">
                semua item ({items.length} item)
              </span>{" "}
              dari keranjang belanja?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelClearCart}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmClearCart}
            >
              Hapus Semua
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
