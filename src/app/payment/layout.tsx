import { Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

const year = new Date().getFullYear();

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/help", label: "Contact Support" },
];

function Logo() {
  return (
    <Link
      href="/"
      className="flex gap-2 items-center transition-opacity hover:opacity-80"
    >
      <div className="flex justify-center items-center w-8 h-8 rounded bg-primary text-primary-foreground">
        <span className="font-serif font-bold">N</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Noku Coffee
      </span>
    </Link>
  );
}

export default function CheckoutLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/95 supports-backdrop-filter:bg-background/60">
        <div className="container flex justify-between items-center px-4 mx-auto h-16 md:px-8">
          <Logo />
          <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline-block">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col flex-1">{children}</main>

      <footer className="py-6 border-t md:py-0">
        <div className="container flex flex-col gap-4 justify-between items-center px-4 mx-auto md:h-16 md:flex-row md:px-8">
          <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
            &copy; {year} Noku Coffee. All rights reserved.
          </p>

          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
