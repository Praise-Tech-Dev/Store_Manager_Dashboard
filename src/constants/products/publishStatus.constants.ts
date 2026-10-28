import type { PublishedStatus } from "@/types/products";
import type { BadgeVariant } from "@/types/shared/badge/badgeVariant.types";

export const PUBLISH_STATUS_VALUES = [
  "Active",
  "Draft",
  "Archived",
  "Inactive",
] as const satisfies readonly PublishedStatus[];

export const PUBLISH_STATUS_OPTIONS = PUBLISH_STATUS_VALUES.map((status) => ({
  value: status,
  label: status,
}));

export const DEFAULT_PUBLISH_STATUS: PublishedStatus = "Active";

export const DUPLICATE_PUBLISH_STATUS: PublishedStatus = "Draft";

export const OUT_OF_STOCK_PUBLISH_STATUS: PublishedStatus = "Inactive";

export const PUBLISH_STATUS_BADGE_MAP: Record<PublishedStatus, BadgeVariant> = {
  Active: "active",
  Inactive: "error",
  Draft: "pending",
  Archived: "default",
};