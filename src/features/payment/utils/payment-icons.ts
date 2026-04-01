export const getPaymentIcon = (channel: string | undefined | null): string => {
  if (!channel) return "/images/payments/default.svg";

  const normalizedChannel = channel.toUpperCase();

  const baseIconUrl = "https://assets.xendit.co/payment-channels/logos/";

  const icons: Record<string, string> = {
    BCA: baseIconUrl + "bca-logo.svg",
    MANDIRI: baseIconUrl + "mandiri-logo.svg",
    BRI: baseIconUrl + "bri-logo.svg",
    BNI: baseIconUrl + "bni-logo.svg",
    PERMATA: baseIconUrl + "permata-logo.svg",

    OVO: baseIconUrl + "ovo-logo.svg",
    DANA: baseIconUrl + "dana-logo.svg",
    LINKAJA: baseIconUrl + "linkaja-logo.svg",
    SHOPEEPAY: baseIconUrl + "shopeepay-logo.svg",

    ALFAMART: baseIconUrl + "alfamart-logo.svg",
    INDOMARET: baseIconUrl + "indomaret-logo.svg",

    QRIS: baseIconUrl + "qris-logo.svg",
  };

  return icons[normalizedChannel] || "/images/payments/default.svg";
};
