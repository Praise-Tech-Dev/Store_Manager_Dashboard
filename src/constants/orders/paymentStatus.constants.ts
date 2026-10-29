import type { PaymentStatus } from "@/types/orders/order.types";
import type { BadgeVariant } from "@/types/shared/badge/badgeVariant.types";
import type { SelectOption } from "@/types/shared/select/selectOptions.types";

export const PAYMENT_BADGE_STYLES: Record<PaymentStatus, BadgeVariant> = {
  PAID: "active",
  PENDING: "pending",
  FAILED: "suspended",
};

export const PAYMENT_STATUSES = [
  "PAID",
  "PENDING",
  "FAILED",
] as const satisfies readonly PaymentStatus[];

export const PAYMENT_STATUS_OPTIONS: SelectOption<PaymentStatus>[] = [
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
];

export const DEFAULT_PAYMENT_STATUS: PaymentStatus = "PENDING";