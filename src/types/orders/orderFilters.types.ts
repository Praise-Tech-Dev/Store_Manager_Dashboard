import type { PaymentStatus } from "./order.types";

export type OrderTab = "all" | "pending" | "returns";

export type OrderStatusFilter = PaymentStatus | "all";

export type OrderDateRange = "7d" | "30d" | "90d" | "all";

export interface OrderFilters {
  status: OrderStatusFilter;
  dateRange: OrderDateRange;
}
