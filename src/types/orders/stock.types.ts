import type { DashboardProduct,  PublishedStatus } from "../products";
import type { OrderItem, PaymentStatus } from "./order.types";

export interface FindInsufficientStockParams {
  items: OrderItem[];
  productMap: Map<number, DashboardProduct>;
}

export interface ReservesStockParams {
  paymentStatus: PaymentStatus;
}

export interface BuildStockUpdatesParams {
  items: OrderItem[];
  productMap: Map<number, DashboardProduct>;
}

export interface StockUpdate {
  productId: number;
  stockCount: number;
  // status: ProductStatus;
  publishStatus?: PublishedStatus;
}