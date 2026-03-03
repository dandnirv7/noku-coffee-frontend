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

const menuItems = [
  { label: "Beranda", id: "hero" },
  { label: "Produk", id: "products" },
  { label: "Tentang Kami", id: "about" },
];

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const { count: cartCount, isLoading: isLoadingCart } = useCartCount();

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
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    setIsProfileOpen(false);
    router.refresh();
    router.push("/");
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        "flex items-center h-20",
        "bg-background",
        "border-b border-border",
      )}
    >
      <div className="container flex justify-between items-center px-4 mx-auto md:px-6">
        <div className="flex gap-2 items-center">
          <Button
            asChild
            variant="link"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center w-10 h-10 text-white rounded-xl bg-primary hover:no-underline"
          >
            <Link href="/">
              <span className="font-serif text-xl font-bold">N</span>
            </Link>
          </Button>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Noku Coffee
          </span>
        </div>

        {pathname === "/" && (
          <div className="hidden gap-8 items-center md:flex">
            {menuItems.map((item) => (
              <Button
                variant="link"
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium transition-colors text-foreground hover:text-primary underline-offset-0 hover:no-underline focus-visible:outline-none focus-visible:ring-0 focus-visible:text-primary"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {/* Right-side actions — desktop only */}
        <div className="flex gap-2 items-center">
          {isPending ? (
            <div className="hidden gap-2 md:flex">
              <div className="w-20 h-9 rounded-2xl bg-muted animate-pulse" />
              <div className="w-20 h-9 rounded-2xl bg-muted animate-pulse" />
            </div>
          ) : session?.user ? (
            <>
              {/* Bell */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
              </Button>

              {/* Cart */}
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
                aria-label="Shopping cart"
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

              {/* Profile dropdown */}
              <div className="relative hidden md:block" data-profile-dropdown>
                <Button
                  variant="outline"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 h-10 pl-3 pr-2"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold leading-none">
                      {session.user.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      Member
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isProfileOpen && "rotate-180",
                    )}
                  />
                </Button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-background rounded-2xl shadow-lg border border-border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Akun Anda
                      </p>
                      <p className="text-sm font-semibold text-foreground truncate mt-1">
                        {session.user.email}
                      </p>
                    </div>
                    <div className="py-2">
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
                    </div>
                    <div className="border-t border-border pt-2 px-2">
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start px-4 h-9 font-normal text-destructive hover:text-destructive hover:bg-destructive/10"
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
              <Button
                asChild
                variant="ghost"
                className="hidden font-semibold md:inline-flex"
              >
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
