import type { MetadataRoute } from "next";
import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nokucoffee.me";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductItemSchema = z.object({
  slug: z.string(),
  updatedAt: z.string().optional(),
  images: z.array(z.string()),
});

const ProductListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    data: z.array(ProductItemSchema),
  }),
});

async function getAllProductSlugs() {
  try {
    if (!API_URL) return [];
    const res = await fetch(`${API_URL}/products?perPage=1000`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const parsed = ProductListResponseSchema.safeParse(json);
    if (!parsed.success) return [];
    return parsed.data.data.data;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProductSlugs();

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: product.images,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/earnings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...productUrls];
}
