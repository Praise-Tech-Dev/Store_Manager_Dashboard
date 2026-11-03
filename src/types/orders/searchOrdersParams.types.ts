import type { Order } from "./order.types";

export interface SearchOrdersParams {
  orders: Order[];
  search: string;
}
