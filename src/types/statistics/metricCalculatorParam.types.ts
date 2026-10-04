import type { RevenueOrdersPoint } from "./revenueOrders.types";

export interface MetricCalculationParams {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  revenueOrders: RevenueOrdersPoint[];
}
