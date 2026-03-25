"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/lib/auth-client";
import { useCartCount } from "@/features/cart/hooks/use-cart-count";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  Heart,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GuestMenuItem = {
  label: string;
  id: string;
};

type UserMenuItem = {
  label: string;
  href: string;
};

const guestMenuItems: GuestMenuItem[] = [
  { label: "Beranda", id: "hero" },
  { label: "Produk", id: "products" },
  { label: "Tentang Kami", id: "about" },
];

const userMenuItems: UserMenuItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/search" },
  { label: "Pesanan", href: "/orders" },
];

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const { count: cartCount, isLoading: isLoadingCart } = useCartCount();

  const menuItems = session?.user ? userMenuItems : guestMenuItems;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-profile-dropdown]")) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isProfileOpen]);

  const scrollTo = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setIsProfileOpen(false);
    router.refresh();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center h-20 bg-background border-b border-border">
      <div className="container flex justify-between items-center px-4 mx-auto md:px-6">
        <div className="flex gap-2 items-center">
          <Button
            asChild
            variant="link"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center w-10 h-10 text-white rounded-xl bg-primary hover:no-underline"
          >
            <Link href="/">
              <span className="font-serif text-xl font-bold">N</span>
            </Link>
          </Button>

          <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline-block">
            Noku Coffee
          </span>
        </div>

        <div className="hidden gap-4 lg:gap-8 items-center md:flex">
          {menuItems.map((item) => {
            if ("href" in item) {
              const isActive = pathname === item.href;

              return (
                <Button
                  asChild
                  variant="link"
                  key={item.href}
                  className={cn(
                    "text-sm font-medium px-2 hover:no-underline",
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            }

            return (
              <Button
                variant="link"
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-foreground hover:text-primary px-2 hover:no-underline"
              >
                {item.label}
              </Button>
            );
          })}
        </div>

        <div className="flex gap-2 items-center">
          {session?.user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
              </Button>

              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
              >
                <Link href="/cart">
                  <ShoppingBag className="w-5 h-5" />
                  {!isLoadingCart && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              <div className="relative hidden md:block" data-profile-dropdown>
                <Button
                  variant="outline"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 h-10 pl-3 pr-2"
                >
                  <span className="text-xs font-semibold">
                    {session.user.name}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>

                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isProfileOpen && "rotate-180",
                    )}
                  />
                </Button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-background rounded-2xl shadow-lg border border-border py-2">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                        Akun Anda
                      </p>
                      <p className="text-sm font-semibold truncate mt-1">
                        {session.user.email}
                      </p>
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 h-9 font-normal"
                    >
                      <Link href="/profile">
                        <User className="w-4 h-4 mr-3 opacity-60" />
                        Profil Saya
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 h-9 font-normal"
                    >
                      <Link href="/orders">
                        <Package className="w-4 h-4 mr-3 opacity-60" />
                        Pesanan
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 h-9 font-normal"
                    >
                      <Link href="/favorites">
                        <Heart className="w-4 h-4 mr-3 opacity-60" />
                        Favorit
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 h-9 font-normal"
                    >
                      <Link href="/settings">
                        <Settings className="w-4 h-4 mr-3 opacity-60" />
                        Pengaturan
                      </Link>
                    </Button>

                    <div className="border-t border-border mt-2 pt-2 px-2">
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start px-4 h-9 font-normal text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Keluar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden md:inline-flex">
                <Link href="/login">Masuk</Link>
              </Button>

              <Button asChild className="hidden md:inline-flex">
                <Link href="/register">Daftar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
