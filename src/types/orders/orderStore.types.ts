import type { Order } from "./order.types";

export interface OrderStoreState {
  createdOrders: Order[];
  cancelledIds: number [];
  createOrder: (newOrder: Order) => void;
  cancelOrder: (id: number) => void;
  resetOrders: () => void;
}