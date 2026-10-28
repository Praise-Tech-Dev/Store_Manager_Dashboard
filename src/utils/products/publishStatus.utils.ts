import { OUT_OF_STOCK_PUBLISH_STATUS } from "@/constants/products/publishStatus.constants";
import type { PublishedStatus } from "@/types/products";

export const resolvePublishStatus = (
  stockCount: number,
  requested: PublishedStatus,
): PublishedStatus =>
  stockCount <= 0 && requested === "Active"
    ? OUT_OF_STOCK_PUBLISH_STATUS
    : requested;
