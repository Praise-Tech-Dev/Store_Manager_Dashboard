import { productsApi } from "@/api/products.api";
import { productImageStorage } from "@/storage/productImageStorage";
import type { CreateProductInput, DashboardProduct, UpdateProductDTO } from "@/types/products";
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

  async createProduct(
    input: CreateProductInput,
    existingProducts: DashboardProduct[] = [],
  ): Promise<DashboardProduct> {
    const { sku, stockCount, image, ...fields } = input;
    // Uploaded images live in IndexedDB; the product keeps only a small reference.
    const imageRef = image ? await productImageStorage.save(image) : "";

    try {
      // Fake Store API persists nothing and rejects large bodies (HTTP 413),
      // so it never receives image data.
      const created = await productsApi.create({ ...fields, image: "" });

      const maxId = existingProducts.reduce(
        (max, p) => (typeof p.id === "number" && p.id > max ? p.id : max),
        0,
      );
      const assignedId =
        created?.id && created.id > maxId ? created.id : maxId + 1;

      return enrichProduct(
        { ...created, ...fields, image: imageRef, id: assignedId },
        { sku, stockCount: stockCount ?? 20 },
      );
    } catch (error) {
      // Don't leave an orphaned image behind when the product wasn't created
      if (imageRef) await productImageStorage.remove(imageRef);
      throw error;
    }
  },

  async updateProduct(
    id: number,
    payload: UpdateProductDTO,
    existingProduct?: DashboardProduct,
  ): Promise<DashboardProduct> {
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
