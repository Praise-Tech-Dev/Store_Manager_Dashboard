import type { PublishedStatus } from "@/types/products";

export const PUBLISH_STATUS_VALUES = [
  "Active",
  "Draft",
  "Archived",
] as const satisfies readonly PublishedStatus[];

export const PUBLISH_STATUS_OPTIONS = PUBLISH_STATUS_VALUES.map((status) => ({
  value: status,
  label: status,
}));

export const DEFAULT_PUBLISH_STATUS: PublishedStatus = "Active";
