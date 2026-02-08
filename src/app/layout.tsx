import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Noku Coffee",
  description:
    "Menyediakan pengalaman kopi terbaik dari hulu ke hilir. Temukan rasa otentik di setiap seduhan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
