// import type { CreateProductDTO } from "./createProduct.types";
import type { DashboardProduct } from "./dashboardProduct.types";

export type UpdateProductDTO = Partial<Omit<DashboardProduct, "id" | "rating" | "sku" | "status">>;