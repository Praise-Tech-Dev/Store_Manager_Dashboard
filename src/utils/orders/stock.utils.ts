import type {
  BuildStockUpdatesParams,
  FindInsufficientStockParams,
  ReservesStockParams,
  StockUpdate,
} from "@/types/orders";
import { resolvePublishStatus } from "../products/publishStatus.utils";
import { DEFAULT_PUBLISH_STATUS } from "@/constants/products/publishStatus.constants";

export const findInsufficientStock = ({
  items,
  productMap,
}: FindInsufficientStockParams) =>
  items.flatMap((item, index) => {
    const available = productMap.get(item.productId)?.stockCount ?? 0;
    return item.quantity > available ? [{ index, available }] : [];
  });

export const reservesStock = ({
  paymentStatus,
}: ReservesStockParams): boolean => paymentStatus !== "FAILED";

export const buildStockUpdates = ({
  items,
  productMap,
}: BuildStockUpdatesParams): StockUpdate[] =>
  items.flatMap(({ productId, quantity }) => {
    const product = productMap.get(productId);
    if (!product) return [];

    const stockCount = Math.max(0, (product.stockCount ?? 0) - quantity);
    const update: StockUpdate = { productId, stockCount };

    if (stockCount === 0) {
      update.publishStatus = resolvePublishStatus(
        stockCount,
        product.publishStatus ?? DEFAULT_PUBLISH_STATUS,
      );
    }
    return [update];
  });