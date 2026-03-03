import { ProductDetailSkeleton } from "@/features/product/components/product-detail-skeleton";

export default function ProductDetailLoading() {
  return (
    <main className="container px-4 py-10 mx-auto max-w-7xl">
      <ProductDetailSkeleton />
    </main>
  );
}
