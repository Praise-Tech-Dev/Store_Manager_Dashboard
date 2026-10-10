import type { CreateProductDTO } from "./createProduct.types";
import type { DashboardProduct } from "./dashboardProduct.types";
import type { UpdateProductDTO } from "./updateProductDTO.types";

export interface ProductStoreState {
  products: DashboardProduct[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: CreateProductDTO) => Promise<void>;
  updateProduct: (id: number, payload: UpdateProductDTO) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}
