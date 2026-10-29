import type { DashboardProduct } from "./dashboardProduct.types";

export const isSellableProduct = (product: DashboardProduct): boolean =>
  (product.publishStatus ?? "Active") === "Active" &&
  product.status !== "Out of Stock";
