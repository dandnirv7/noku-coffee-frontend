import { CartItem } from "../lib/cart-schema";

export const ProductCartMeta = (product: CartItem["product"]) => {
  const typeLabel =
    product.type[0]?.charAt(0).toUpperCase() +
    product.type[0]?.slice(1).toLowerCase();

  const items = product.type.includes("BEAN")
    ? [typeLabel, product.roastLevel, product.weight && `${product.weight}g`]
    : product.type.includes("GEAR")
      ? [typeLabel, product.category?.name]
      : product.type.includes("BUNDLE")
        ? [
            typeLabel,
            product.description && (
              <span className="line-clamp-1">{product.description}</span>
            ),
          ]
        : [];

  const meta = items.filter(Boolean);

  return meta.map((item, index) => (
    <span key={index} className="flex items-center gap-2">
      <p className="text-sm  text-gray-600">{item}</p>
      {index < meta.length - 1 && (
        <span className="h-1 w-1 rounded-full bg-gray-400 shrink-0" />
      )}
    </span>
  ));
};
