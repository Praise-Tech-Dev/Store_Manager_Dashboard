import type { Product } from "./product.types";

export type CreateProductDTO = Omit<Product, "id" | "rating">;