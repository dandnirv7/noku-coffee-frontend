const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://noku-coffee.com";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Noku Coffee",
  url: BASE_URL,
  description:
    "Noku Coffee menyediakan kopi premium Indonesia dari hulu ke hilir. Temukan rasa otentik di setiap seduhan.",
  inLanguage: "id",
  publisher: {
    "@type": "Organization",
    name: "Noku Coffee",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Noku Coffee",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  sameAs: [
    "https://instagram.com/dandnirv",
    "https://linkedin.com/in/dandnirv",
    "https://github.com/dandnirv",
    "https://instagram.com/nokucoffee",
    "https://tiktok.com/@nokucoffee",
    "https://noku-coffee.vercel.app",
  ],
};

type ProductSchemaInput = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sku: string;
  images: string[];
  stock: number;
  category: { name: string };
};

export function createProductSchema(product: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description:
      product.description ?? `${product.name} — kopi premium dari Noku Coffee.`,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Noku Coffee",
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/products/${product.slug}`,
      priceCurrency: "IDR",
      price: product.price.toString(),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Noku Coffee",
      },
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList Schema
// ---------------------------------------------------------------------------
type BreadcrumbItem = {
  name: string;
  url: string;
};

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

type FAQItem = {
  question: string;
  answer: string;
};

export function createFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
