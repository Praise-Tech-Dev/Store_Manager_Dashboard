import type { GetOrderCardValuesParams } from "@/types/orders";
import { countsAsOrder, countsAsRevenue } from "./orders.predicates";


export const getOrderCardValues = ({
  orders,
  returns,
  pendingCarts,
}: GetOrderCardValuesParams ) => {
  const revenue = orders
    .filter(countsAsRevenue)
    .reduce((sum, o) => sum + o.total, 0);

  const pendingReturns = returns.filter((r) => r.status !== "Refunded");

  return {
    totalOrders: orders.filter(countsAsOrder).length,
    revenue,
    abandonedCarts: pendingCarts.length,
    pendingReturnsCount: pendingReturns.length,
    pendingReturnsAmount: pendingReturns.reduce((sum, r) => sum + r.amount, 0),
  };
};
