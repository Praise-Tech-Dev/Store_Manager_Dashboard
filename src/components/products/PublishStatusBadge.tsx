import { DEFAULT_PUBLISH_STATUS, PUBLISH_STATUS_BADGE_MAP } from "@/constants/products/publishStatus.constants";
import type { PublishStatusBadgeProps } from "@/types/products";
import { Badge } from "../shared/Badge";

export const PublishStatusBadge = ({
  status = DEFAULT_PUBLISH_STATUS,
  size = "sm",
}: PublishStatusBadgeProps) => (
  <Badge variant={PUBLISH_STATUS_BADGE_MAP[status]} size={size}>
    {status}
  </Badge>
);
