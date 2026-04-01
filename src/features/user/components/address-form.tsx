"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CreateAddressInput,
  createAddressSchema,
  useCreateAddress,
} from "../api/use-create-address";
import { useUpdateAddress } from "../api/use-update-address";

interface AddressFormProps {
  onSuccess?: (addressId?: string) => void;
  onCancel?: () => void;
  isFirstAddress?: boolean;
  initialData?: CreateAddressInput & { id?: string };
}

export function AddressForm({
  onSuccess,
  onCancel,
  isFirstAddress = false,
  initialData,
}: AddressFormProps) {
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();
  const isPending = isCreating || isUpdating;

  const form = useForm<CreateAddressInput>({
    resolver: zodResolver(createAddressSchema) as Resolver<CreateAddressInput>,
    defaultValues: initialData || {
      label: "",
      receiverName: "",
      phone: "",
      streetLine1: "",
      streetLine2: "",
      city: "",
      province: "",
      postalCode: "",
      isDefault: isFirstAddress,
    },
  });

  const onSubmit = (data: CreateAddressInput) => {
    if (initialData && initialData.id) {
      updateAddress(
        { id: initialData.id, data },
        {
          onSuccess: () => {
            toast.success("Alamat berhasil diperbarui");
            onSuccess?.(initialData.id);
          },
          onError: (error: unknown) => {
            const errorMsg =
              error instanceof Error ? error.message : "Terjadi kesalahan";
            toast.error("Gagal memperbarui alamat", {
              description: errorMsg,
            });
          },
        },
      );
    } else {
      createAddress(data, {
        onSuccess: (res) => {
          toast.success("Alamat berhasil ditambahkan");
          const newId =
            res?.data?.id ||
            res?.id ||
            (typeof res === "string" ? res : undefined);
          onSuccess?.(newId);
        },
        onError: (error: unknown) => {
          const errorMsg =
            error instanceof Error ? error.message : "Terjadi kesalahan";
          toast.error("Gagal menambahkan alamat", {
            description: errorMsg,
          });
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label Alamat (Rumah, Kantor, dll)</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Rumah" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Penerima</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap penerima" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Pos</FormLabel>
                <FormControl>
                  <Input placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="streetLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Lengkap</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nama jalan, gedung, nomor rumah"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detail Tambahan (Opsional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Blok, Patokan, atau detail lainnya"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kota/Kabupaten</FormLabel>
                <FormControl>
                  <Input placeholder="Jakarta Selatan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <FormControl>
                  <Input placeholder="DKI Jakarta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!isFirstAddress && (
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center p-3 rounded-lg border shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Jadikan Alamat Utama</FormLabel>
                  <div className="text-[0.8rem] text-muted-foreground">
                    Alamat ini akan otomatis terpilih saat checkout.
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-2 justify-end pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
            >
              Batal
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            Simpan Alamat
          </Button>
        </div>
      </form>
    </Form>
  );
}
