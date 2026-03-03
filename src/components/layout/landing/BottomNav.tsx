"use client";

import { authClient } from "@/features/auth/lib/auth-client";
import { useCartCount } from "@/features/cart/hooks/use-cart-count";
import { cn } from "@/lib/utils";
import { Home, Package, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const { count: cartCount, isLoading: isLoadingCart } = useCartCount();

  const loggedInTabs = [
    { label: "Beranda", href: "/", icon: Home },
    { label: "Cari", href: "/search", icon: Search },
    {
      label: "Keranjang",
      href: "/cart",
      icon: ShoppingBag,
      badge: !isLoadingCart && cartCount > 0 ? cartCount : undefined,
    },
    { label: "Pesanan", href: "/orders", icon: Package },
    { label: "Profil", href: "/user/profile", icon: User },
  ];

  const guestTabs = [
    { label: "Beranda", href: "/", icon: Home },
    { label: "Cari", href: "/search", icon: Search },
    { label: "Masuk", href: "/login", icon: User },
  ];

  const tabs = session?.user ? loggedInTabs : guestTabs;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur-md">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full py-2 transition-colors relative",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={cn(
                    "transition-all duration-200",
                    active && "scale-110",
                  )}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {"badge" in tab && tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[9px] font-bold px-1 py-0 rounded-full min-w-[16px] text-center leading-4">
                    {String(tab.badge)}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  active && "font-bold",
                )}
              >
                {tab.label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
