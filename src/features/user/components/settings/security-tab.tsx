"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { authClient } from "@/features/auth/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Smartphone,
  Monitor,
  AlertTriangle,
  LogOut,
  Loader2,
} from "lucide-react";
import { Session } from "better-auth";
import { ChangePasswordDialog } from "@/features/user/components/change-password-dialog";
import { useConfirm } from "@/hooks/use-confirm";

export function SecurityTab() {
  const [ConfirmDialog, confirm] = useConfirm();
  const { data: session } = authClient.useSession();
  const currentToken = session?.session?.token;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoadingSessions(true);
      const { data, error } = await authClient.listSessions();
      if (error) {
        toast.error("Gagal memuat daftar sesi perangkat");
      } else if (data) {
        setSessions(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleRevokeSession = async (tokenToRevoke: string) => {
    try {
      setIsRevoking(tokenToRevoke);
      const { error } = await authClient.revokeSession({
        token: tokenToRevoke,
      });
      if (error) {
        toast.error("Gagal mengeluarkan perangkat");
      } else {
        toast.success("Perangkat berhasil dikeluarkan");
        fetchSessions();
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsRevoking(null);
    }
  };

  const handleRevokeOtherSessions = async () => {
    try {
      setIsRevoking("all-others");
      const { error } = await authClient.revokeOtherSessions();
      if (error) {
        toast.error("Gagal mengeluarkan perangkat lain");
      } else {
        toast.success("Semua perangkat lain berhasil dikeluarkan");
        fetchSessions();
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsRevoking(null);
    }
  };

  const handleDeleteAccount = async () => {
    const ok = await confirm({
      title: "Hapus Akun Permanen",
      description:
        "TINDAKAN INI TIDAK DAPAT DIBATALKAN. Apakah Anda sangat yakin ingin menghapus akun Anda secara permanen beserta seluruh datanya?",
      variant: "destructive",
      confirmText: "Hapus Akun",
    });

    if (ok) {
      try {
        const { error } = await authClient.deleteUser();
        if (error) {
          toast.error("Gagal menghapus akun: " + error.message);
        } else {
          toast.success("Akun berhasil dihapus.");
          window.location.href = "/";
        }
      } catch {
        toast.error("Terjadi kesalahan server saat mencoba menghapus akun.");
      }
    }
  };

  const getDeviceIcon = (userAgent?: string | null) => {
    const ua = (userAgent || "").toLowerCase();
    if (
      ua.includes("mobile") ||
      ua.includes("android") ||
      ua.includes("iphone") ||
      ua.includes("ipod")
    ) {
      return <Smartphone className="w-5 h-5 text-muted-foreground" />;
    }
    return <Monitor className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="m-0 space-y-6">
      <ConfirmDialog />
      <Card>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Kata Sandi</CardTitle>
          </div>
          <CardDescription>
            Perbarui kata sandi akun Anda secara berkala untuk keamanan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordDialog />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autentikasi Dua Faktor (2FA)</CardTitle>
          <CardDescription>
            Tambahkan lapisan keamanan ekstra ke akun Anda menggunakan kode
            verifikasi via Email atau Authenticator App.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center space-x-2">
            <div>
              <Label className="text-base">Gunakan 2FA</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                Melindungi akun Anda bahkan jika seseorang mengetahui kata sandi
                Anda.
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={(val) => {
                setTwoFactorEnabled(val);
                toast.success(
                  `2FA ${val ? "Diaktifkan" : "Dinonaktifkan"} (Mock)`,
                );
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <CardTitle>Sesi Aktif (Perangkat)</CardTitle>
              <CardDescription>
                Daftar perangkat yang sedang login menggunakan akun ini.
              </CardDescription>
            </div>
            {sessions.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRevokeOtherSessions}
                disabled={isRevoking !== null}
              >
                {isRevoking === "all-others" ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 w-4 h-4" />
                )}
                Keluar dari perangkat lain
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loadingSessions ? (
            <div className="flex justify-center items-center py-6">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Tidak ada data sesi.
            </p>
          ) : (
            <div className="space-y-4">
              {sessions.map((s) => {
                const isCurrent = s.token === currentToken;

                return (
                  <div
                    key={s.id}
                    className="flex gap-4 justify-between items-start pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="p-2 mt-1 rounded-full bg-secondary">
                        {getDeviceIcon(s.userAgent)}
                      </div>
                      <div>
                        <div className="flex gap-2 items-center">
                          <p className="font-medium text-sm line-clamp-1 max-w-[200px] sm:max-w-none">
                            {s.userAgent || "Unknown Device"}
                          </p>
                          {isCurrent && (
                            <Badge
                              variant="default"
                              className="text-[10px] h-5 px-1.5 font-medium bg-green-600 hover:bg-green-600"
                            >
                              Saat ini
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          IP: {s.ipAddress || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Login:{" "}
                          {format(new Date(s.createdAt), "dd MMM yyyy, HH:mm", {
                            locale: id,
                          })}
                        </p>
                      </div>
                    </div>

                    {!isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => handleRevokeSession(s.token)}
                        disabled={isRevoking !== null}
                      >
                        {isRevoking === s.token ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Keluar"
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader>
          <div className="flex gap-2 items-center text-red-600 dark:text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <CardTitle>Hapus Akun</CardTitle>
          </div>
          <CardDescription>
            Menghapus akun Anda akan menghapus semua data, pesanan, dan
            pengaturan secara permanen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Ini adalah tindakan yang tidak dapat dibatalkan. Harap pastikan Anda
            tidak memiliki pesanan yang sedang berlangsung sebelum menghapus
            akun Anda.
          </p>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Hapus Akun Secara Permanen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
