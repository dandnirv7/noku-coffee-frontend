"use client";

import { useState } from "react";
import { User, CreditCard, Settings, Shield, Award } from "lucide-react";

import { AccountTab } from "@/features/user/components/settings/account-tab";
import { PaymentMethodsTab } from "@/features/user/components/settings/payment-methods-tab";
import { PreferencesTab } from "@/features/user/components/settings/preferences-tab";
import { SecurityTab } from "@/features/user/components/settings/security-tab";
import { LoyaltyTab } from "@/features/user/components/settings/loyalty-tab";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");

  const menuItems = [
    { id: "account", label: "Profil & Alamat", icon: User },
    { id: "payment", label: "Metode Pembayaran", icon: CreditCard },
    { id: "preferences", label: "Pengaturan & Notifikasi", icon: Settings },
    { id: "security", label: "Keamanan & Privasi", icon: Shield },
    { id: "loyalty", label: "Loyalitas & Langganan", icon: Award },
  ];

  return (
    <div className="container px-4 py-4 mx-auto max-w-7xl md:py-8">
      <div className="flex flex-col gap-2 mb-4 md:mb-8">
        <p className="text-muted-foreground">
          Kelola profil, metode pembayaran, preferensi, dan keamanan akun Anda.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="mb-2 w-full md:hidden">
          <Select value={activeSection} onValueChange={setActiveSection}>
            <SelectTrigger className="w-full h-12 bg-background">
              <SelectValue placeholder="Pilih menu pengaturan" />
            </SelectTrigger>
            <SelectContent>
              {menuItems.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <div className="flex gap-2 items-center">
                    <item.icon className="w-4 h-4 opacity-70 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <aside className="hidden md:flex w-[250px] flex-col gap-1 shrink-0">
          <nav className="grid gap-1 items-start">
            <h4 className="px-4 py-2 text-sm font-semibold text-muted-foreground">
              Menu Pengaturan
            </h4>
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors text-left",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn("w-4 h-4", isActive ? "text-primary" : "")}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 w-full min-w-0">
          {activeSection === "account" && <AccountTab />}
          {activeSection === "payment" && <PaymentMethodsTab />}
          {activeSection === "preferences" && <PreferencesTab />}
          {activeSection === "security" && <SecurityTab />}
          {activeSection === "loyalty" && <LoyaltyTab />}
        </main>
      </div>
    </div>
  );
}
