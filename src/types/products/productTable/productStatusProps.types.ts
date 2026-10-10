import type { BadgeSize } from "@/types/shared/badge/badgeSize.types";
import type { ProductStatus } from "../dashboardProduct.types";

export interface ProductStatusBadgeProps {
  status: ProductStatus;
  stockCount?: number;
  size?: BadgeSize;
}
