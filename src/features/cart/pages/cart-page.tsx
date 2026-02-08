import { CartPageInner } from "@/features/cart/components/cart-page-inner";
import { CartPageSkeleton } from "@/features/cart/components/skeleton/cart-page-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Keranjang Belanja | Noku Coffee",
    description: "Lihat dan kelola keranjang belanja Anda di Noku Coffee",
    keywords: ["keranjang", "belanja", "noku coffee", "checkout"],
    openGraph: {
      title: "Keranjang Belanja | Noku Coffee",
      description: "Lihat dan kelola keranjang belanja Anda di Noku Coffee",
    },
    twitter: {
      title: "Keranjang Belanja | Noku Coffee",
      description: "Lihat dan kelola keranjang belanja Anda di Noku Coffee",
    },
  };
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPageInner />
    </Suspense>
  );
}
