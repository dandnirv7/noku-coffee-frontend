"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;

          if (hasSubItems) {
            const isAnyChildActive = item.items?.some(
              (subItem) =>
                pathname === subItem.url ||
                pathname.startsWith(subItem.url + "/"),
            );

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
                      size={"md"}
                      tooltip={item.title}
                      className="text-slate-500 hover:text-slate-900 hover:bg-stone-50"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.url ||
                          pathname.startsWith(subItem.url + "/");

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton size="md" asChild>
                              <Link
                                href={subItem.url}
                                className={cn(
                                  "text-slate-500 hover:text-slate-900",
                                  isSubActive &&
                                    "bg-stone-100 text-slate-900 font-medium relative before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-orange-500 before:rounded-md",
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

          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size={"md"}
                asChild
                tooltip={item.title}
                className={cn(
                  "text-slate-500 hover:text-slate-900 hover:bg-stone-50",
                  isActive &&
                    "bg-stone-100 text-slate-900 font-medium relative before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-orange-500 before:rounded-md",
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
