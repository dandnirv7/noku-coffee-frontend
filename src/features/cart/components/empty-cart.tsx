"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Keranjang Belanja Kosong
          </h1>
          <p className="text-gray-600 mb-6">
            Anda belum menambahkan produk ke keranjang belanja.
          </p>
          <Button asChild>
            <Link href="/shop">Mulai Belanja</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
