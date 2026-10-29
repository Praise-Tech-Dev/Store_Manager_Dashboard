export type PaymentStatus = "PAID" | "PENDING" | "FAILED";
export type ShippingStatus =
  | "Processing"
  | "Shipped"
  | "Unfulfilled"
  | "Cancelled";

export interface Order {
  id: number;
  orderNumber: string; // "#ORD-7301", from formatOrderId
  userId: number;
  customerName: string; // from getCustomerName
  date: string; // ISO string, the display date (not cart.date)
  total: number; // raw number, formatted in the UI
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
}


export type NewOrderInput = Omit<Order, "id"| "orderNumber">;