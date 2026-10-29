import type { NewOrderInput, Order } from "./order.types";

export interface OrderStoreState {
  createdOrders: Order[];
  cancelledIds: number [];
  createOrder: (newOrder: NewOrderInput) => void;
  cancelOrder: (id: number) => void;
  resetOrders: () => void;
}