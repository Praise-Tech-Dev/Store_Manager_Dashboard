import { Badge } from "../shared/Badge";
import { PRODUCT_STATUS_BADGE_MAP } from "@/constants/products/products.constants";
import type { ProductStatusBadgeProps } from "@/types/products/productTable/productStatusProps.types";



export const ProductStatusBadge = ({
  status,
  stockCount,
  size = "sm", 
}: ProductStatusBadgeProps) => {
  const variant = PRODUCT_STATUS_BADGE_MAP[status] ?? "default";

  const label =
    status === "Low Stock" && stockCount !== undefined
      ? `Low Stock (${stockCount})`
      : status;

  return (
    <Badge variant={variant} size={size}>
      {label}
    </Badge>
  );
};
