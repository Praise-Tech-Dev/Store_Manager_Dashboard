import type { Order } from "@/types/orders/order.types";
import type { OrderFilters } from "@/types/orders/orderFilters.types";

export interface filterOrderParams {
  orders: Order[];
  filters: OrderFilters;
  now?: Date;
}
