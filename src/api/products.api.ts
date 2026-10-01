import { apiClient } from "./axiosInstance";
import type { Product, UpdateProductDTO } from "@/types/products";
import type { CreateProductDTO } from "@/types/products/createProduct.types";

export const productsApi = {
  async getAll(): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>("/products");
    return data;
  },

  async getById(id: number): Promise<Product> {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  async getCategories(): Promise<string[]> {
    const { data } = await apiClient.get<string[]>("/products/categories");
    return data;
  },

  async getByCategory(category: string): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>(
      `/products/category/${category}`,
    );
    return data;
  },

  async create(newProduct: CreateProductDTO): Promise<Product> {
    const { data } = await apiClient.post<Product>("/products", newProduct);
    return data;
  },

  async update(id: number, payload: UpdateProductDTO): Promise<Product> {
    const { data } = await apiClient.put<Product>(`/products/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<Product> {
    const { data } = await apiClient.delete<Product>(`/products/${id}`); 
    return data;
  },
};
