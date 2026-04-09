"use client";

import { Coffee, Package, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function QuickCategories({
  classNames,
  isTitleHidden,
}: {
  classNames?: string;
  isTitleHidden?: boolean;
}) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="md:hidden">
      <div
        className={cn(
          "flex justify-between items-center mb-3",
          isTitleHidden && "hidden",
        )}
      >
        <h3 className="text-sm font-bold text-gray-800">Kategori Cepat</h3>
      </div>
      <div
        className={cn(
          "flex overflow-x-auto gap-3 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x",
          classNames,
        )}
      >
        {[
          {
            label: "Biji Kopi",
            value: "BEAN",
            icon: <Coffee className="w-5 h-5" />,
          },
          {
            label: "Alat Seduh",
            value: "GEAR",
            icon: <Coffee className="w-5 h-5" />,
          },
          {
            label: "Merchandise",
            value: "",
            icon: <Store className="w-5 h-5" />,
          },
          {
            label: "Bundling",
            value: "BUNDLE",
            icon: <Package className="w-5 h-5" />,
          },
        ].map((cat) => (
          <Button
            variant="outline"
            key={cat.label}
            className="flex gap-2 items-center px-4 py-2 whitespace-nowrap bg-white rounded-lg border border-gray-100 shadow-sm transition-transform snap-start active:scale-95"
            onClick={() => handleNavigate(`/search?type=${cat.value}`)}
          >
            {cat.icon}
            <span className="text-xs font-semibold text-gray-700">
              {cat.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
