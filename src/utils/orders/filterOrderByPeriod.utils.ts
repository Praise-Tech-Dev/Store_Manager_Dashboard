import type { Order } from "@/types/orders";
import type { FilterOrdersByPeriodParams } from "@/types/orders/orderUtils.types";
import { filterOrders } from "./filterOrder";

export const filterOrdersByPeriod = ({
  orders,
  dateRange,
  now,
}: FilterOrdersByPeriodParams): Order[] =>
  filterOrders({
    orders,
    filters: { status: "all", dateRange },
    now,
  });
