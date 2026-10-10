import type { DashboardProduct } from "./dashboardProduct.types";

export type CreateProductDTO = Omit<DashboardProduct, "id" | "rating" | "sku"> & {
  stockCount?: number;
};