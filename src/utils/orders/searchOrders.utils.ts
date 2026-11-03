import type { Order, SearchOrdersParams } from "@/types/orders";
import { matchesOrder } from "@/utils/globalsearch.matchers";

export const searchOrders = ({
  orders,
  search,
}: SearchOrdersParams): Order[] => {
  const term = search.trim();
  if (!term) return orders;
  return orders.filter((order) => matchesOrder(order, term));
};
