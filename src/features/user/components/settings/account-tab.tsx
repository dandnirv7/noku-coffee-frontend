"use client";

import { useState } from "react";
import { authClient } from "@/features/auth/lib/auth-client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useGetAddresses } from "@/features/user/api/use-get-addresses";
import { useDeleteAddress } from "@/features/user/api/use-delete-address";
import { useSetDefaultAddress } from "@/features/user/api/use-update-address";
import { AddressForm } from "@/features/user/components/address-form";
import { User, Address } from "@/features/user/types";
import { useConfirm } from "@/hooks/use-confirm";

export function AccountTab() {
  const [ConfirmDialog, confirm] = useConfirm();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const user = session?.user as User;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { data: addresses, isLoading: isAddressesLoading } = useGetAddresses();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const { mutate: setDefaultAddress, isPending: isSettingDefault } =
    useSetDefaultAddress();

  const [prevUser, setPrevUser] = useState(user);
  if (user && user !== prevUser) {
    setPrevUser(user);
    setName(user.name || "");
    setPhone(user.phone || "");
  }

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const { error } = await (
        authClient.updateUser as (data: {
          name?: string;
          phone?: string;
        }) => Promise<{ error: { message?: string } | null }>
      )({
        name,
        phone,
      });
      if (error) {
        toast.error(error.message || "Gagal memperbarui profil");
      } else {
        toast.success("Profil berhasil diperbarui");
        await authClient.getSession();
      }
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const ok = await confirm({
      title: "Hapus Alamat",
      description: "Apakah Anda yakin ingin menghapus alamat ini?",
      variant: "destructive",
      confirmText: "Hapus",
    });
    if (ok) {
      deleteAddress(id, {
        onSuccess: () => toast.success("Alamat berhasil dihapus"),
        onError: () => toast.error("Gagal menghapus alamat"),
      });
    }
  };

  const handleSetDefaultAddress = (id: string) => {
    setDefaultAddress(id, {
      onSuccess: () => toast.success("Alamat utama berhasil diubah"),
      onError: () => toast.error("Gagal mengubah alamat utama"),
    });
  };

  return (
    <div className="m-0 space-y-6">
      <ConfirmDialog />
      <Card>
        <CardHeader>
          <CardTitle>Informasi Biodata</CardTitle>
          <CardDescription>
            Perbarui nama, email, dan nomor telepon Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSessionPending || isUpdating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled={true}
              />
              {user?.emailVerified && (
                <Badge
                  variant="secondary"
                  className="text-green-800 whitespace-nowrap bg-green-100 hover:bg-green-100"
                >
                  <CheckCircle2 className="mr-1 w-3 h-3" /> Terverifikasi
                </Badge>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">No. Telepon</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSessionPending || isUpdating}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpdateProfile}
            disabled={isSessionPending || isUpdating || !name}
          >
            {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-between items-center pt-6">
        <div>
          <h3 className="text-lg font-medium">Alamat Pengiriman</h3>
          <p className="text-sm text-muted-foreground">
            Kelola alamat pengiriman untuk pesanan Anda.
          </p>
        </div>
        {!isAddingAddress && !editingAddress && (
          <Button onClick={() => setIsAddingAddress(true)}>
            <Plus className="mr-2 w-4 h-4" /> Tambah Alamat
          </Button>
        )}
      </div>

      {isAddingAddress || editingAddress ? (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>
              {editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm
              initialData={editingAddress || undefined}
              onCancel={() => {
                setIsAddingAddress(false);
                setEditingAddress(null);
              }}
              onSuccess={() => {
                setIsAddingAddress(false);
                setEditingAddress(null);
              }}
              isFirstAddress={addresses?.length === 0}
            />
          </CardContent>
        </Card>
      ) : isAddressesLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : addresses?.length === 0 ? (
        <div className="py-12 text-center rounded-lg border border-dashed">
          <MapPin className="mx-auto mb-3 w-8 h-8 text-muted-foreground" />
          <h4 className="text-lg font-medium">Belum ada alamat</h4>
          <p className="mt-1 mb-4 text-sm text-muted-foreground">
            Anda belum menambahkan alamat pengiriman.
          </p>
          <Button variant="outline" onClick={() => setIsAddingAddress(true)}>
            Tambah Alamat Pertama
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses?.map((addr) => (
            <Card
              key={addr.id}
              className={addr.isDefault ? "border-primary" : ""}
            >
              <CardContent className="p-6">
                <div className="flex gap-4 justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex gap-2 items-center">
                      <h4 className="font-semibold">{addr.label}</h4>
                      {addr.isDefault && (
                        <Badge variant="default" className="text-xs">
                          Utama
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium">
                      {addr.receiverName}{" "}
                      <span className="font-normal text-muted-foreground">
                        ({addr.phone})
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {addr.streetLine1}
                      {addr.streetLine2 ? `, ${addr.streetLine2}` : ""},{" "}
                      {addr.city}, {addr.province}, {addr.postalCode}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        setEditingAddress(addr);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    {!addr.isDefault && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteAddress(addr.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {!addr.isDefault && (
                  <div className="pt-4 mt-4 border-t">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground"
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      disabled={isSettingDefault}
                    >
                      Set sebagai alamat utama
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
