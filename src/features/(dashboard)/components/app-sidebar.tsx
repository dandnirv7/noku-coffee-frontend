"use client";

import {
  IconCashBanknote,
  IconCoffee,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconLogout,
  IconSettings,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/features/(dashboard)/components/nav-main";
import { NavSecondary } from "@/features/(dashboard)/components/nav-secondary";
import { authClient } from "@/features/auth/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Produk",
      url: "/dashboard/products",
      icon: IconCoffee,
      items: [
        { title: "Katalog", url: "/dashboard/products" },
        { title: "Kategori", url: "/dashboard/products/categories" },
        { title: "Stok", url: "/dashboard/products/stock" },
      ],
    },
    {
      title: "Pesanan",
      url: "/dashboard/orders",
      icon: IconFolder,
      items: [
        { title: "Semua Pesanan", url: "/dashboard/orders" },
        { title: "Menunggu", url: "/dashboard/orders?status=PENDING" },
        { title: "Proses", url: "/dashboard/orders?status=PAID" },
        { title: "Selesai", url: "/dashboard/orders?status=COMPLETED" },
      ],
    },
    {
      title: "Invoice",
      url: "/dashboard/invoices",
      icon: IconListDetails,
      items: [
        { title: "Semua Invoice", url: "/dashboard/invoices" },
        { title: "Belum Dibayar", url: "/dashboard/invoices?status=PENDING" },
      ],
    },
    {
      title: "Pelanggan",
      url: "/dashboard/customers",
      icon: IconUsers,
      items: [
        { title: "Semua Pelanggan", url: "/dashboard/customers" },
        { title: "Ulasan", url: "/dashboard/customers?tab=reviews" },
      ],
    },
    {
      title: "Promo & Diskon",
      url: "/dashboard/promos",
      icon: IconTicket,
      items: [{ title: "Semua Promo", url: "/dashboard/promos" }],
    },
    {
      title: "Laporan",
      url: "/dashboard/earnings",
      icon: IconCashBanknote,
    },
  ],
  navSecondary: [
    {
      title: "Pusat Bantuan",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Pengaturan",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" className="bg-stone-50 border-none" {...props}>
      <SidebarHeader className="pt-6 pb-4 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent"
            >
              <Link href="#">
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
                  <IconCoffee className="size-5" />
                </div> */}
                <h1 className="text-2xl font-extrabold font-sans text-slate-900 uppercase">
                  Noku
                </h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="pb-6 px-2 text-slate-500">
        <NavSecondary items={data.navSecondary} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 font-medium mt-2"
            >
              <Button
                variant="ghost"
                className="justify-start hover:cursor-pointer"
                onClick={handleLogout}
              >
                <IconLogout className="size-5" />
                <span>Log Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
