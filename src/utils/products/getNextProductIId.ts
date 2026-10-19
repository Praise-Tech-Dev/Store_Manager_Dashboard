import type { DashboardProduct } from "@/types/products";

export const getNextProductId = (
  products: Pick<DashboardProduct, "id">[],
  deletedIds: number[],
) => Math.max(0, ...products.map((p) => p.id), ...deletedIds) + 1;
