import type { DashboardProduct } from "@/types/products";
import type { ReconciliationStore } from "@/types/products/productReconciler.types";

export const reconcileProducts = (
  serverProducts: DashboardProduct[],
  store: ReconciliationStore,
): DashboardProduct[] => {
  const { userCreatedProducts, userEdits, deletedIds } = store;
  const deletedSet = new Set(deletedIds);

  // Reconcile locally created products (exclude deleted, apply edits if any)
  const reconciledCreated = userCreatedProducts
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => (userEdits[p.id] ? { ...p, ...userEdits[p.id] } : p));

  // Reconcile fetched server products (exclude deleted, apply edits if any)
  const reconciledServer = serverProducts
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => (userEdits[p.id] ? { ...p, ...userEdits[p.id] } : p));

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

  const localEdits = userEdits[baseProduct.id];
  return localEdits ? { ...baseProduct, ...localEdits } : baseProduct;
};
