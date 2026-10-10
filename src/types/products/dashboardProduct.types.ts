import type { Product } from "./product.types";

export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";
export interface DashboardProduct extends Product {
  avatar?: string | null;
  status: ProductStatus;
  sku: string;
  stockCount?: number;
}
