import { DEFAULT_PUBLISH_STATUS } from "@/constants/products/publishStatus.constants";
import type { DashboardProduct, UpdateProductDTO } from "@/types/products";
import type { ReconciliationStore } from "@/types/products/productReconciler.types";
import { calculateStatus } from "./productEnricher";

const withPublishDefault = (product: DashboardProduct): DashboardProduct => ({
  ...product,
  publishStatus: product.publishStatus ?? DEFAULT_PUBLISH_STATUS,
});

 /** Layers a user's saved edits over a product. `status` is derived from
 * stockCount and isn't saved with edits, so we recomputed here.
 */
const applyEdits = (
  product: DashboardProduct,
  edits?: UpdateProductDTO,
): DashboardProduct => {
  if (!edits) return product;
  const merged = { ...product, ...edits };
  return edits.stockCount === undefined
    ? merged
    : { ...merged, status: calculateStatus(edits.stockCount) };
};

export const reconcileProducts = (
  serverProducts: DashboardProduct[],
  store: ReconciliationStore,
): DashboardProduct[] => {
  const { userCreatedProducts, userEdits, deletedIds } = store;
  const deletedSet = new Set(deletedIds);

  // Reconcile locally created products (exclude deleted, apply edits if any)
  const reconciledCreated = userCreatedProducts
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => withPublishDefault(applyEdits(p, userEdits[p.id])));

  // Reconcile fetched server products (exclude deleted, apply edits if any)
  const reconciledServer = serverProducts
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => withPublishDefault(applyEdits(p, userEdits[p.id])));

  // User-created products prepended to the top of the catalog
  return [...reconciledCreated, ...reconciledServer];
};

export const reconcileSingleProduct = (
  serverProduct: DashboardProduct | null,
  store: ReconciliationStore,
): DashboardProduct | null => {
  const { userCreatedProducts, userEdits, deletedIds } = store;

  if (!serverProduct) return null;
  if (deletedIds.includes(serverProduct.id)) return null;

  // Check local created list first if not in server response
  const createdMatch = userCreatedProducts.find(
    (p) => p.id === serverProduct.id,
  );
  const baseProduct = createdMatch || serverProduct;

  return withPublishDefault(applyEdits(baseProduct, userEdits[baseProduct.id]));
};
