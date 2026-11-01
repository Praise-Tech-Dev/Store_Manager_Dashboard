// types/statistics/calculatorParams.types.ts
import type { Order } from "@/types/orders";
import type { Product } from "@/types/products";

export interface MetricCalculationParams {
  orders: Order[]; // orders already filtered to the selected period
  totalUsers: number; // active users; users have no date, so no period filter
}

export interface CategoryCalculationParams {
  orders: Order[];
  productMap: Map<number, Product>;
}

export interface ActivityTransformParams {
  orders: Order[];
  productMap: Map<number, Product>;
}
