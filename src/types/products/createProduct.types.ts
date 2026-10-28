import type { DashboardProduct } from "./dashboardProduct.types";
import type { Product } from "./product.types";

export type CreateProductDTO = Omit<Product, "id" | "rating"> & {
  stockCount?: number;
};

export type CreateDashboardProductDTO = CreateProductDTO & Pick<DashboardProduct, "sku" | "stockCount" | "publishStatus">;

/** Add-product input from the UI: the image is the Blob the user picked, not a reference. */
export type CreateProductInput = Omit<CreateDashboardProductDTO, "image"> & {
  image?: Blob | string;
};