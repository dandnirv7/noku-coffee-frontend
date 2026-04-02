import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { Providers } from "@/components/providers";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://noku-coffee.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Noku Coffee — Kopi Premium Indonesia, Dari Hulu ke Hilir",
    template: "%s | Noku Coffee",
  },

  description:
    "Noku Coffee menyediakan kopi premium Indonesia dari hulu ke hilir. Nikmati biji kopi single origin, house blend, dan peralatan seduh berkualitas tinggi.",

  keywords: [
    "kopi premium Indonesia",
    "beli kopi online",
    "kopi single origin",
    "house blend",
    "specialty coffee",
    "Noku Coffee",
    "kopi arabika",
    "kopi robusta",
    "peralatan seduh kopi",
  ],

  authors: [{ name: "Noku Coffee" }],
  creator: "Noku Coffee",
  publisher: "Noku Coffee",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Noku Coffee",
    title: "Noku Coffee — Kopi Premium Indonesia",
    description:
      "Temukan rasa otentik kopi Indonesia. Single origin, house blend, dan peralatan seduh berkualitas tinggi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noku Coffee — Kopi Premium Indonesia",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Noku Coffee — Kopi Premium Indonesia",
    description:
      "Temukan rasa otentik kopi Indonesia. Single origin, house blend, dan peralatan seduh berkualitas tinggi.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/favicon_io/android-chrome-192x192.png",
      },
    ],
  },

  manifest: "/favicon_io/site.webmanifest",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  category: "e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
