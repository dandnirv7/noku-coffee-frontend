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
  settings: "Pengaturan",
};

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/dashboard")
  )
    return null;

  const paths = pathname.split("/").filter((p) => p !== "");

  return (
    <div className="px-4 pt-6 pb-2 mx-auto w-full">
      <Breadcrumb className="px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="flex gap-1 items-center transition-colors hover:text-primary"
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
                        className="transition-colors hover:text-primary"
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
