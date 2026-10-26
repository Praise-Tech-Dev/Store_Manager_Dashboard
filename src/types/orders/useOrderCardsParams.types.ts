import type { Order } from "./order.types";
import type { OrderDateRange } from "./orderFilters.types";

export interface UseOrderCardsParams {
  orders: Order[];
  dateRange: OrderDateRange;
}
