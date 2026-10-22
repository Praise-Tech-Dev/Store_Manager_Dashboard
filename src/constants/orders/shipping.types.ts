import type { ShippingStatus } from "@/types/orders/order.types";

export const SHIPPING_DOT_COLORS: Record<ShippingStatus, string> = {
  Processing: "#475569",
  Shipped: "#22C55E",
  Unfulfilled: "#CBD5E1",
  Cancelled: "#EF4444",
};
