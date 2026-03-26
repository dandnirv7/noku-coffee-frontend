import { toRupiah } from "@/lib/utils";
import Image from "next/image";

interface OrderItemRowProps {
  name?: string;
  quantity: number;
  price: number;
  image?: string | null;
  className?: string;
}

export const OrderItemRow = ({
  name = "Unknown Product",
  quantity,
  price,
  image,
  className = "",
}: OrderItemRowProps) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="flex items-center">
        <div className="flex justify-center items-center mr-3 w-10 h-10 bg-gray-100 rounded-md">
          <Image
            src={image || "/placeholder-product.png"}
            alt={name}
            width={40}
            height={40}
            className="object-cover rounded"
          />
        </div>
        <div>
          <div className="font-medium text-sm md:text-base line-clamp-1">
            {name}
          </div>
          <div className="text-sm text-gray-500">Jumlah: {quantity}</div>
        </div>
      </div>
      <div className="font-medium text-sm md:text-base">{toRupiah(price)}</div>
    </div>
  );
};
