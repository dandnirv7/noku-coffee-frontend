import { ReactNode } from "react";

interface CartPageLayoutProps {
  children: ReactNode;
}

export function CartPageLayout({ children }: CartPageLayoutProps) {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
