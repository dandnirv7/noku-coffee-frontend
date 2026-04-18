"use client";

import {
  IconCashBanknote,
  IconCoffee,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconHistory,
  IconLogout,
  IconPlug,
  IconSettings,
  IconTicket,
  IconUsers,
  IconWebhook,
} from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
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

export const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    {
      title: "Produk",
      url: "/dashboard/products",
      icon: IconCoffee,
      items: [
        { title: "Katalog", url: "/dashboard/products" },
        { title: "Kategori", url: "/dashboard/products/categories" },
      ],
    },
    {
      title: "Pesanan",
      url: "/dashboard/orders",
      icon: IconFolder,
      items: [
        { title: "Semua Pesanan", url: "/dashboard/orders" },
        { title: "Retur / Komplain", url: "/dashboard/orders/returns" },
      ],
    },
    { title: "Pelanggan", url: "/dashboard/customers", icon: IconUsers },
    { title: "Promo & Diskon", url: "/dashboard/promos", icon: IconTicket },
    {
      title: "Laporan",
      url: "/dashboard/earnings",
      icon: IconCashBanknote,
      items: [
        { title: "Pendapatan", url: "/dashboard/earnings" },
        { title: "Produk Terjual", url: "/dashboard/earnings/products" },
      ],
    },
    { title: "Webhook Logs", url: "/dashboard/webhooks", icon: IconWebhook },
    { title: "Aktivitas", url: "/dashboard/activity", icon: IconHistory },
    { title: "Integrasi", url: "/dashboard/integrations", icon: IconPlug },
  ],
  navSecondary: [
    { title: "Pengaturan", url: "/dashboard/settings", icon: IconSettings },
    { title: "Pusat Bantuan", url: "/help", icon: IconHelp },
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
                  <IconCoffee className="size-5" />
                </div>
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
