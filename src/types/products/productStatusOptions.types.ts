import type { ProductStatus } from "./dashboardProduct.types";

export interface StatusOption {
  value: ProductStatus | "Status";
  label: string;
}
