import type { Order } from "@/types/orders";
import type { SortOrdersParams } from "@/types/orders/orderUtils.types";

export const sortOrdersByDate = ({ orders }: SortOrdersParams): Order[] =>
  [...orders].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
