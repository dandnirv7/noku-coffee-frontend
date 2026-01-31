import SearchProductList from "@/features/search/components/search-product-list";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductPageSkeleton from "../components/skeleton/product-page-skeleton";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Belanja | Noku Coffee",
    description: "Temukan produk kopi favoritmu di Noku Coffee",
    keywords: ["belanja", "noku coffee", "produk kopi", "belanja kopi"],
    openGraph: {
      title: "Belanja | Noku Coffee",
      description: "Temukan produk kopi favoritmu di Noku Coffee",
    },
    twitter: {
      title: "Belanja | Noku Coffee",
      description: "Temukan produk kopi favoritmu di Noku Coffee",
    },
  };
}

export default function SearchProductPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh] space-y-6">
      <div className="flex flex-col gap-4 px-4">
        <h1 className="text-5xl font-black tracking-tight">Belanja</h1>
        <p className="text-muted-foreground">
          Temukan peralatan dan biji kopi terbaik untuk seduhanmu.
        </p>
      </div>
      <Suspense fallback={<ProductPageSkeleton />}>
        <SearchProductList />
      </Suspense>
    </div>
  );
}
