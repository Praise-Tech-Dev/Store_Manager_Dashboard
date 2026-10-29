import type { PaymentStatus, ShippingStatus } from "@/types/orders/order.types";

export const SHIPPING_DOT_COLORS: Record<ShippingStatus, string> = {
  Processing: "#475569",
  Shipped: "#22C55E",
  Unfulfilled: "#CBD5E1",
  Cancelled: "#EF4444",
};

export const CREATABLE_SHIPPING_STATUSES = [
  "Unfulfilled",
  "Processing",
  "Shipped",
] as const satisfies readonly ShippingStatus[];

export type CreatableShippingStatus =
  (typeof CREATABLE_SHIPPING_STATUSES)[number];

export const DEFAULT_SHIPPING_STATUS: CreatableShippingStatus = "Unfulfilled";

export const SHIPPING_OPTIONS_BY_PAYMENT: Record<
  PaymentStatus,
  readonly CreatableShippingStatus[]
> = {
  PAID: ["Unfulfilled", "Processing", "Shipped"],
  PENDING: ["Unfulfilled", "Processing"], 
  FAILED: ["Unfulfilled"],
};