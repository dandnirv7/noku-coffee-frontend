"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "Beranda", id: "hero" },
  { label: "Produk", id: "products" },
  { label: "Tentang Kami", id: "about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [_, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        "flex items-center h-20",
        "bg-background",
      )}
    >
      <div className="container flex justify-between items-center px-4 mx-auto md:px-6">
        <Button
          variant="link"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex gap-2.5 items-center focus:outline-none"
        >
          <div className="flex justify-center items-center w-10 h-10 text-white rounded-xl shadow-lg bg-primary shadow-primary/30">
            <span className="font-serif text-xl font-bold">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Noku Coffee
          </span>
        </Button>

        <div className="hidden gap-8 items-center md:flex">
          {menuItems.map((item) => (
            <Button
              variant="link"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium transition-colors text-foreground hover:text-primary underline-offset-0 hover:no-underline"
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <Button variant="ghost" className="hidden md:inline-flex">
            <Link href="/login">Masuk</Link>
          </Button>
          <Button className="hidden md:inline-flex">
            <Link href="/register">Daftar</Link>
          </Button>

          <Button
            variant="link"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute top-0 right-0 w-72 h-full shadow-xl bg-surface animate-in slide-in-from-right">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <span className="font-bold text-foreground">Menu</span>
              <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-4 p-4">
              {menuItems.map((menu) => (
                <button
                  key={menu.id}
                  className="py-2 font-medium text-left transition-colors text-foreground hover:text-primary"
                  onClick={() => {
                    document
                      .getElementById(menu.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {menu.label}
                </button>
              ))}

              <div className="my-2 border-t border-border" />

              <Button
                variant="ghost"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="flex gap-2 items-center py-2 font-medium text-foreground"
              >
                <Link href="/login">Masuk</Link>
              </Button>

              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="flex gap-2 items-center py-2 font-medium text-background"
              >
                <Link href="/register">Daftar</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
