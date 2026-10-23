import type { Order } from "./order.types";

export interface BuildOrdersParams {
  seedOrders: Order[];
  createdOrders: Order[];
  cancelledIds: number[];
}
