import { Coffee, Package, Store } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const categories = [
  { label: "Biji Kopi", value: "BEAN", icon: <Coffee className="w-5 h-5" /> },
  { label: "Alat Seduh", value: "GEAR", icon: <Coffee className="w-5 h-5" /> },
  { label: "Merchandise", value: "MERCH", icon: <Store className="w-5 h-5" /> },
  { label: "Bundling", value: "BUNDLE", icon: <Package className="w-5 h-5" /> },
  {
    label: "Espresso Blends",
    value: "ESPRESSO_BLEND",
    icon: <Coffee className="w-5 h-5" />,
  },
  {
    label: "Single Origin",
    value: "SINGLE_ORIGIN",
    icon: <Coffee className="w-5 h-5" />,
  },
  {
    label: "Manual Brew",
    value: "MANUAL_BREW",
    icon: <Coffee className="w-5 h-5" />,
  },
];

export default function ScrollCategories({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <div
      className={cn(
        "flex overflow-x-auto gap-3 px-4 scrollbar-hide snap-x",
        className,
      )}
    >
      {categories.map((cat) => (
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
  );
}
