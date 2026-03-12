import PaymentResultCard from "../components/payment-result-card";

type Props = {
  orderId: string;
};

export default function PaymentPage({ orderId }: Props) {
  return <PaymentResultCard orderId={orderId} />;
}
