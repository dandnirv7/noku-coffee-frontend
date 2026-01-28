import { ProductDetailView } from "@/features/product/components/product-detail-inner";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Detail Produk | Noku Coffee`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container px-4 py-10 mx-auto max-w-7xl">
      <ProductDetailView slug={slug} />
    </main>
  );
}
