import ProductEditPage from "@/features/(dashboard)/products/pages/edit-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <ProductEditPage slug={slug} />;
}
