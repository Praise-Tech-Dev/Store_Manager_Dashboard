import type { GetOrderCardValuesParams } from "@/types/orders";


export const getOrderCardValues = ({
  orders,
  returns,
  pendingCarts,
}: GetOrderCardValuesParams ) => {
  const revenue = orders
    .filter(
      (o) => o.paymentStatus === "PAID" && o.shippingStatus !== "Cancelled",
    )
    .reduce((sum, o) => sum + o.total, 0);

  const pendingReturns = returns.filter((r) => r.status !== "Refunded");

  return {
    totalOrders: orders.length,
    revenue,
    abandonedCarts: pendingCarts.length,
    pendingReturnsCount: pendingReturns.length,
    pendingReturnsAmount: pendingReturns.reduce((sum, r) => sum + r.amount, 0),
  };
};
