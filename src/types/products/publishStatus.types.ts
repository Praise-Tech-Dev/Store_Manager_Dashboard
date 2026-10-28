import type { BadgeProps } from "../shared/badge/badge.types";
import type { PublishedStatus } from "./dashboardProduct.types";

export interface PublishStatusBadgeProps {
  status?: PublishedStatus;
  size?: BadgeProps["size"];
}
