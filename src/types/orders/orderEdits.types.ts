import type { Order, PaymentStatus, ShippingStatus } from "./order.types";

export interface OrderEdit {
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
}
export interface OrdersEditsState {
  edits: Record<number, OrderEdit>;
  createdOrders: Order[];
}
