import type { CalculateCartTotalParams } from "@/types/carts/cartUtils.types";

export const calculateCartTotal = ({
    cart,
    productMap,
}: CalculateCartTotalParams): number =>
  cart.products.reduce(
    (sum, item) =>
      sum + (productMap.get(item.productId)?.price ?? 0) * item.quantity,
    0,
  );
