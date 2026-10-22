import type { PaymentStatus } from "@/types/orders/order.types";
import type { BadgeVariant } from "@/types/shared/badge/badgeVariant.types";

export const PAYMENT_BADGE_STYLES: Record<PaymentStatus, BadgeVariant> = {
  PAID: "active",
  PENDING: "pending",
  FAILED: "suspended",
};