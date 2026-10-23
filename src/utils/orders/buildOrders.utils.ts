import type { Order } from "@/types/orders";
import type { BuildOrdersParams } from "@/types/orders/orderUtils.types";

export const buildOrders = ({
  seedOrders,
  createdOrders,
  cancelledIds,
}: BuildOrdersParams): Order[] => {
  const cancelled = new Set(cancelledIds);

  return [...createdOrders, ...seedOrders].map(
    (order): Order =>
      cancelled.has(order.id)
        ? { ...order, shippingStatus: "Cancelled" }
        : order,
  );
};
