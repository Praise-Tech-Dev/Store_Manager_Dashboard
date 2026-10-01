import { productsApi } from "@/api/products.api";
import type { CreateProductDTO, Product, UpdateProductDTO } from "@/types/products";

export const productService = {
  async fetchAllProducts(): Promise<Product[]> {
    return await productsApi.getAll();
  },

  async fetchProductById(id: number): Promise<Product> {
    return await productsApi.getById(id);
  },

  async fetchProductCategories(): Promise<string[]> {
    return await productsApi.getCategories();
  },

  async fetchProductsByCategory(category: string): Promise<Product[]> {
    return await productsApi.getByCategory(category);
  },

  async createProduct(payload: CreateProductDTO): Promise<Product> {
    return await productsApi.create(payload);
  },

  async updateProduct(id: number, payload: UpdateProductDTO): Promise<Product> {
    const updated = await productsApi.update(id, payload);
    return {
      ...updated,
      id,
    };
  },

  async deleteProduct(id: number): Promise<number> {
    await productsApi.delete(id);
    return id;
  },
};
