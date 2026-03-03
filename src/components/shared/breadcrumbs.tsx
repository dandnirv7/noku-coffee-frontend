"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pathMap: Record<string, string> = {
  products: "Produk",
  search: "Belanja",
  cart: "Keranjang",
  orders: "Pesanan",
  tracking: "Lacak Pesanan",
  user: "Pengguna",
  profile: "Profil",
  login: "Masuk",
  register: "Daftar",
};

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/products/")) return null;

  const paths = pathname.split("/").filter((p) => p !== "");

  return (
    <div className="container mx-auto px-4 pt-6 pb-2">
      <Breadcrumb className="px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-primary transition-colors"
                aria-label="Beranda"
              >
                <Home className="w-4 h-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;

            let formattedPath = pathMap[path];
            if (!formattedPath) {
              formattedPath = path
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            }

            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-semibold text-foreground">
                      {formattedPath}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={href}
                        className="hover:text-primary transition-colors"
                      >
                        {formattedPath}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
