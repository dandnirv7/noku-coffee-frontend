import { ProductDetailView } from "@/features/product/components/product-detail-inner";
import { Metadata } from "next";
import { getProductBySlug } from "../api/get-product-by-slug";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return {
      title: `${product.name} | Noku Coffee`,
    };
  } catch {
    return {
      title: `Detail Produk | Noku Coffee`,
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (product.slug !== slug) {
    redirect(`/products/${product.slug}`);
  }

  return (
    <main className="container px-4 py-10 mx-auto max-w-7xl">
      <ProductDetailView slug={product.slug} initialData={product} />
    </main>
  );
}
