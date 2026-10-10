import { productsApi } from "@/api/products.api";
import type { CreateProductDTO, DashboardProduct, UpdateProductDTO } from "@/types/products";
import { enrichProduct } from "@/utils/products/productEnricher";

export const productService = {
  async fetchAllProducts(): Promise<DashboardProduct[]> {
    const apiProducts = await productsApi.getAll();
    return apiProducts.map((product) => enrichProduct(product));
  },

  async fetchProductById(id: number): Promise<DashboardProduct> {
    const apiProduct = await productsApi.getById(id);
    return enrichProduct(apiProduct);
  },

  async fetchProductCategories(): Promise<string[]> {
    return await productsApi.getCategories();
  },

  async fetchProductsByCategory(category: string): Promise<DashboardProduct[]> {
    const apiProducts = await productsApi.getByCategory(category);
    return apiProducts.map((product) => enrichProduct(product));
  },

  async createProduct(payload: CreateProductDTO, existingProducts: DashboardProduct[] = []): Promise<DashboardProduct> {
    const created = await productsApi.create(payload);

    const maxId = existingProducts.reduce(
      (max, p) => (typeof p.id === "number" && p.id > max ? p.id : max),
      0,
    );

    const assignedId =
      created?.id && created.id > maxId ? created.id : maxId + 1;

    return enrichProduct(
      { ...created, id: assignedId },
      { stockCount: 20 }, // Initial stock count for new items
    );
  },

  async updateProduct(id: number, payload: UpdateProductDTO, existingProduct?: DashboardProduct): Promise<DashboardProduct> {
    const updated = await productsApi.update(id, payload);
    return enrichProduct(
      { ...existingProduct, ...updated, id },
      {
        stockCount: payload.stockCount ?? existingProduct?.stockCount,
        status: payload.status ?? existingProduct?.status,
      },
    );
  },

  async deleteProduct(id: number): Promise<number> {
    await productsApi.delete(id);
    return id;
  },
};
