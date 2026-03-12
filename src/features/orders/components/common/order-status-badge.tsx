import { getStatusBadge } from "@/features/orders/lib/constants";

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

export const OrderStatusBadge = ({
  status,
  className,
}: OrderStatusBadgeProps) => {
  return <div className={className}>{getStatusBadge(status)}</div>;
};
