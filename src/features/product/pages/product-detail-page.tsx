import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createProductSchema } from "@/lib/seo/schemas";
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

    const title = `${product.name} — Beli Kopi Online`;
    const description =
      product.description?.slice(0, 155) ??
      `Beli ${product.name} dari Noku Coffee. Kopi premium Indonesia berkualitas tinggi dengan pilihan single origin dan house blend.`;

    return {
      title,
      description,
      keywords: [
        product.name,
        product.category.name,
        "kopi online",
        "beli kopi",
        "Noku Coffee",
        "specialty coffee Indonesia",
      ],
      openGraph: {
        type: "website",
        title,
        description,
        url: `/products/${slug}`,
        images: product.images.map((img) => ({
          url: img,
          width: 800,
          height: 800,
          alt: product.name,
        })),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: product.images,
      },
      alternates: {
        canonical: `/products/${slug}`,
      },
    };
  } catch {
    return {
      title: "Detail Produk",
      robots: { index: false, follow: false },
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

  const breadcrumbs = [
    { name: "Beranda", url: "/" },
    { name: "Produk", url: "/search" },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  return (
    <main className="container px-4 py-10 mx-auto max-w-7xl">
      <JsonLd data={createProductSchema(product)} />
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <ProductDetailView slug={product.slug} initialData={product} />
    </main>
  );
}
