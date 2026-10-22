import type { ReturnStatus } from "@/types/returns/return.types";
import type { BadgeVariant } from "@/types/shared/badge/badgeVariant.types";

export const RETURN_BADGE_VARIANTS: Record<ReturnStatus, BadgeVariant> = {
  Requested: "pending",
  Approved: "info",
  Refunded: "active",
};