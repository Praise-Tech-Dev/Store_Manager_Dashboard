import type { ProductStatus } from "@/types/products/dashboardProduct.types";
import type { BadgeVariant } from "@/types/shared/badge/badgeVariant.types";

export const PRODUCT_STATUS_BADGE_MAP: Record<ProductStatus, BadgeVariant> = {
  "In Stock": "success",
  "Low Stock": "error",
  "Out of Stock": "warning",
};
