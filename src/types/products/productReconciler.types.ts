import type { ProductStoreState } from "./productStore.types";

export type ReconciliationStore = Pick<
  ProductStoreState,
  "userCreatedProducts" | "userEdits" | "deletedIds"
>;
