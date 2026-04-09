import { getDetailOrder } from "../../api/use-get-detail-order.server";
import { OrderDetailProvider } from "../../context/order-detail-context";
import { OrderDetail } from "../../lib/order-schema";
import HelpCard from "../common/help-card";
import CustomerInformation from "./customer-information";
import OrderDetailHeader from "./order-detail-header";
import OrderItems from "./order-items";
import OrderSummary from "./order-summary";
import OrderTimeline from "./order-timeline";
import ShippingInformation from "./shipping-information";

export default async function OrderDetailInnerPage({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const order: OrderDetail = await getDetailOrder(orderNumber);

  return (
    <OrderDetailProvider order={order}>
      <div className="min-h-screen bg-gray-50">
        <main className=" mx-auto px-4 md:px-8 py-8">
          <OrderDetailHeader />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <OrderItems />
              <ShippingInformation />
              <OrderTimeline />
            </div>

            <div className="space-y-6">
              <OrderSummary />
              <CustomerInformation />
              <HelpCard />
            </div>
          </div>
        </main>
      </div>
    </OrderDetailProvider>
  );
}
