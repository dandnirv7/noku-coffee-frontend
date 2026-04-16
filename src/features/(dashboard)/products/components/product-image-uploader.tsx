import { IconUpload, IconX } from "@tabler/icons-react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImagePreview from "./image-preview";

interface ProductImageUploaderProps {
  images: (string | File)[];
  isPending: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

export function ProductImageUploader({
  images,
  isPending,
  onUpload,
  onRemove,
}: ProductImageUploaderProps) {
  const hasImages = images && images.length > 0;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Gambar Produk</h3>
        <span className="text-xs text-slate-500">
          {images?.length || 0} / 6 gambar
        </span>
      </div>

      <FormItem>
        {hasImages ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((imgSrc, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50"
              >
                <ImagePreview
                  src={imgSrc}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] py-1.5 px-2 text-center">
                    Thumbnail Utama
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => onRemove(e, index)}
                  className="absolute top-2 right-2 bg-white/90 text-slate-600 hover:text-red-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition"
                >
                  <IconX size={16} />
                </button>
              </div>
            ))}
            <FormLabel
              htmlFor="product-images-upload"
              className="cursor-pointer aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              <IconUpload size={24} className="mb-2" />
              <span className="text-xs font-semibold">Tambah</span>
            </FormLabel>
          </div>
        ) : (
          <FormLabel
            htmlFor="product-images-upload"
            className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-8 flex flex-col items-center justify-center text-center transition-colors hover:bg-slate-100 cursor-pointer min-h-[240px]"
          >
            <div className="mb-4 text-slate-400">
              <IconUpload size={32} />
            </div>
            <span className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium text-sm mb-4 hover:bg-orange-600 transition-colors inline-block">
              Pilih Gambar
            </span>
            <p className="text-sm font-semibold text-slate-700 mb-1">
              Letakkan beberapa gambar di sini, atau klik untuk memilih
            </p>
          </FormLabel>
        )}

        <FormControl>
          <Input
            id="product-images-upload"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={onUpload}
            disabled={isPending}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </div>
  );
}
