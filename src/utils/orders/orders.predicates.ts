import type { Order } from "@/types/orders";

export const isCancelled = (order: Order) =>
  order.shippingStatus === "Cancelled";
export const countsAsOrder = (order: Order) => !isCancelled(order);
export const countsAsRevenue = (order: Order) =>
  order.paymentStatus === "PAID" && !isCancelled(order);
