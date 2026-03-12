"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/features/auth/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/features/user/types";

export function PreferencesTab() {
  const { data: session } = authClient.useSession();
  const user = session?.user as User;

  const [notifOrder, setNotifOrder] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [grindSize, setGrindSize] = useState("whole");
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("id");

  const [prevUser, setPrevUser] = useState(user);
  if (user && user !== prevUser) {
    setPrevUser(user);
    if (typeof user.notifOrder === "boolean") setNotifOrder(user.notifOrder);
    if (typeof user.notifPromo === "boolean") setNotifPromo(user.notifPromo);
  }

  const handleUpdateNotif = async (
    key: "notifOrder" | "notifPromo",
    value: boolean,
  ) => {
    if (!user) return;
    if (key === "notifOrder") setNotifOrder(value);
    if (key === "notifPromo") setNotifPromo(value);

    try {
      await authClient.updateUser({
        [key]: value,
      });
      toast.success("Preferensi notifikasi diperbarui");
    } catch {
      toast.error("Gagal memperbarui notifikasi");
      if (key === "notifOrder") setNotifOrder(!value);
      if (key === "notifPromo") setNotifPromo(!value);
    }
  };

  const handleMockSave = <T,>(
    setter: (val: T) => void,
    value: T,
    name: string,
  ) => {
    setter(value);
    toast.success(`${name} diperbarui (Mock)`);
  };

  return (
    <div className="m-0 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tampilan & Bahasa</CardTitle>
          <CardDescription>
            Sesuaikan antarmuka Noku Coffee sesuai preferensi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tema Aplikasi</Label>
              <Select
                value={theme}
                onValueChange={(val: string) =>
                  handleMockSave(setTheme, val, "Tema")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Terang (Light)</SelectItem>
                  <SelectItem value="dark">Gelap (Dark)</SelectItem>
                  <SelectItem value="system">Mengikuti Sistem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Bahasa (Language)</Label>
              <Select
                value={language}
                onValueChange={(val: string) =>
                  handleMockSave(setLanguage, val, "Bahasa")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferensi Kopi</CardTitle>
          <CardDescription>
            Tentukan setelan default pesanan biji kopi Anda untuk menghemat
            waktu saat checkout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-w-sm">
            <Label>Ukuran Gilingan (Grind Size) Default</Label>
            <Select
              value={grindSize}
              onValueChange={(val: string) =>
                handleMockSave(setGrindSize, val, "Grind Size")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih grind size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whole">Biji Utuh (Whole Bean)</SelectItem>
                <SelectItem value="coarse">
                  Kasar (Cold Brew / French Press)
                </SelectItem>
                <SelectItem value="medium">
                  Sedang (Pour Over / Drip)
                </SelectItem>
                <SelectItem value="fine">Halus (Espresso / Mokapot)</SelectItem>
                <SelectItem value="tubruk">
                  Sangat Halus (Kopi Tubruk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferensi Notifikasi</CardTitle>
          <CardDescription>
            Pilih notifikasi apa saja yang ingin Anda terima.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base">Update Pesanan</Label>
              <p className="mr-4 text-sm text-muted-foreground">
                Terima email saat status pesanan Anda berubah (Diproses,
                Dikirim, Selesai).
              </p>
            </div>
            <Switch
              checked={notifOrder}
              onCheckedChange={(val) => handleUpdateNotif("notifOrder", val)}
            />
          </div>
          <div className="flex justify-between items-center pt-6 space-x-2 border-t">
            <div className="space-y-0.5">
              <Label className="text-base">Promo & Newsletter</Label>
              <p className="mr-4 text-sm text-muted-foreground">
                Terima info diskon, promo terbaru, dan berita dari Noku Coffee.
              </p>
            </div>
            <Switch
              checked={notifPromo}
              onCheckedChange={(val) => handleUpdateNotif("notifPromo", val)}
            />
          </div>
          <div className="flex justify-between items-center pt-6 space-x-2 border-t">
            <div className="space-y-0.5">
              <Label className="flex gap-2 items-center text-base">
                Notifikasi WhatsApp
                <Badge
                  variant="outline"
                  className="text-[10px] h-5 tracking-tight px-1 font-normal bg-orange-50 text-orange-600 border-orange-200"
                >
                  SEGERA
                </Badge>
              </Label>
              <p className="mr-4 text-sm text-muted-foreground">
                Terima notifikasi instan melalui WhatsApp untuk pesanan Anda.
              </p>
            </div>
            <Switch disabled={true} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
