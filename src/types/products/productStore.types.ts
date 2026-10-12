import type { DashboardProduct } from "./dashboardProduct.types";
import type { UpdateProductDTO } from "./updateProductDTO.types";

export interface ProductStoreState {
  // products: DashboardProduct[];
  userEdits: Record<number, Partial<DashboardProduct>>;
  userCreatedProducts: DashboardProduct[];
  deletedIds: number[];
  recordEdit: (id: number, payload: UpdateProductDTO) => void;
  recordCreation: (newProduct: DashboardProduct) => void;
  recordDeletion: (id: number) => void;
}
