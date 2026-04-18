"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getAdminProducts } from "@/features/(dashboard)/products/api/get-admin-products";
import { getCategories } from "@/features/(dashboard)/products/api/get-categories";
import { getAdminOrders } from "@/features/(dashboard)/orders/api/get-admin-orders";
import { getAdminInvoices } from "@/features/(dashboard)/invoices/api/get-admin-invoices";
import { getAdminCustomers } from "@/features/(dashboard)/customers/api/get-customers";
import { getAdminPromos } from "@/features/(dashboard)/promos/api/promos-api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

const isExactPath = (pathname: string, url: string) => pathname === url;

const isSubPath = (pathname: string, url: string) =>
  pathname.startsWith(url + "/");

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handlePrefetch = (url: string) => {
    try {
      if (url === "/dashboard/products") {
        queryClient.prefetchQuery({
          queryKey: ["admin-products", {}],
          queryFn: () => getAdminProducts(),
        });
      } else if (url === "/dashboard/products/categories") {
        queryClient.prefetchQuery({
          queryKey: ["categories", {}],
          queryFn: () => getCategories(),
        });
      } else if (
        url === "/dashboard/orders" ||
        url.startsWith("/dashboard/orders?")
      ) {
        queryClient.prefetchQuery({
          queryKey: ["admin-orders", {}],
          queryFn: () => getAdminOrders(),
        });
      } else if (
        url === "/dashboard/invoices" ||
        url.startsWith("/dashboard/invoices?")
      ) {
        queryClient.prefetchQuery({
          queryKey: ["admin-invoices", {}],
          queryFn: () => getAdminInvoices(),
        });
      } else if (url === "/dashboard/customers") {
        queryClient.prefetchQuery({
          queryKey: ["admin-customers", {}],
          queryFn: () => getAdminCustomers(),
        });
      } else if (url === "/dashboard/promos") {
        queryClient.prefetchQuery({
          queryKey: ["admin-promos", {}],
          queryFn: () => getAdminPromos(),
        });
      }
    } catch (e) {}
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = !!item.items?.length;

          if (hasSubItems) {
            const isAnyChildActive = item.items?.some((subItem) =>
              isSubPath(pathname, subItem.url),
            );

            const isRoot = item.url === "/dashboard";
            const isParentActive = isRoot
              ? pathname === item.url
              : item.items?.some((sub) => isSubPath(pathname, sub.url));

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isAnyChildActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      size="md"
                      tooltip={item.title}
                      onMouseEnter={() => handlePrefetch(item.url)}
                      className={cn(
                        "text-slate-500 hover:text-slate-900 hover:bg-stone-50",
                        isParentActive && "text-slate-900 font-medium",
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubActive = isExactPath(pathname, subItem.url);

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton size="md" asChild>
                              <Link
                                href={subItem.url}
                                onMouseEnter={() => handlePrefetch(subItem.url)}
                                className={cn(
                                  "text-slate-500 hover:text-slate-900",
                                  isSubActive &&
                                    "bg-stone-100 text-slate-900 font-medium relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-orange-500 before:rounded-md",
                                )}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          const isActive = isExactPath(pathname, item.url);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size="md"
                asChild
                tooltip={item.title}
                onMouseEnter={() => handlePrefetch(item.url)}
                className={cn(
                  "text-slate-500 hover:text-slate-900 hover:bg-stone-50",
                  isActive &&
                    "text-slate-900 font-medium relative before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-orange-500 before:rounded-md",
                )}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
