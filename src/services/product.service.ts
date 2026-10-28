import { productsApi } from "@/api/products.api";
import { productImageStorage } from "@/storage/productImageStorage";
import type { CreateProductInput, DashboardProduct, UpdateProductDTO } from "@/types/products";
import { getNextProductId } from "@/utils/products/getNextProductIId";
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
    deletedIds: number[] = []
  ): Promise<DashboardProduct> {
    const { sku, stockCount, image, publishStatus, ...fields } = input;
    // Uploaded images live in IndexedDB; the product keeps only a small reference.
    const imageRef =
      image instanceof Blob
        ? await productImageStorage.save(image)
        : (image ?? "");

    try {
      // Fake Store API persists nothing and rejects large bodies (HTTP 413),
      // so it never receives image data.
      const created = await productsApi.create({ ...fields, image: "" });

      // const maxId = Math.max(
      //   0,
      //   ...existingProducts.map((p) => p.id),
      //   ...deletedIds,
      // );
      
      const assignedId = getNextProductId(existingProducts, deletedIds);

      return enrichProduct(
        { ...created, ...fields, image: imageRef, id: assignedId },
        { sku, stockCount: stockCount ?? 20, publishStatus },
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
    // Fields the API doesn't know about stay in our local store 
    const { title, price, description, category } = payload;
    const updated = await productsApi.update(id, {
      title,
      price,
      description,
      category,
    });
    return enrichProduct(
      { ...existingProduct, ...updated, ...payload, id },
      {
        sku:existingProduct?.sku,
        stockCount: payload.stockCount ?? existingProduct?.stockCount,
        publishStatus: payload.publishStatus ?? existingProduct?.publishStatus,
      },
    );
  },

  async deleteProduct(product: DashboardProduct): Promise<number> {
    await productsApi.delete(product.id);
    await productImageStorage.remove(product.image)
    return product.id;
  },
};
