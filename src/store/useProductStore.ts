import { productService } from '@/services/product.service';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ProductStoreState } from '@/types/products/productStore.types'
import { create } from 'zustand'

export const useProductStore = create<ProductStoreState>()(
    persist(
        (set, get) => ({
            products: [],
            loading: false,
            error: null,

            fetchProducts: async () => {
                if (get().products.length > 0) return;

                set({ loading: true, error: null});
                try {
                    const products = await productService.fetchAllProducts();
                    set({ products, loading: false });
                } catch (err) {
                    const message = err instanceof Error ? err.message : "Failed to fetch products";
                    set({ error: message, loading: false });
                }
            },

            addProduct: async (payload) => {
                set({ loading: true, error: null });
                try {
                    const newProduct = await productService.createProduct(payload, get().products);
                    set((state) => ({
                        products: [newProduct, ...state.products],
                        loading: false,
                    }));
                } catch (err) {
                    const message = err instanceof Error ? err.message : "Failed to create product";
                    set({ error: message, loading: false });
                }
            },

            updateProduct: async (id, payload) => {
                set({ loading: true, error: null });
                try {
                    const existingProduct = get().products.find((p) => p.id === id);
                    if (!existingProduct) throw new Error("Product not found");

                    const updatedProduct = await productService.updateProduct(id, payload, existingProduct);

                    set((state) => ({
                        products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
                        loading: false,
                    }));
                } catch (err) {
                    const message = err instanceof Error ? err.message : "Failed to update product";
                    set({ error: message, loading: false });
                }
            },

            deleteProduct: async (id) => {
                set({ loading: true, error: null });
                try {
                    await productService.deleteProduct(id);
                    set((state) => ({
                        products: state.products.filter((p) => p.id !== id),
                        loading: false,
                    }))
                } catch (err) {
                    const message = err instanceof Error ? err.message : "Failed to delete product";
                    set({ error: message, loading: false });
                }
            }
        }),
        {
            name: "product-catalog-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ products: state.products }),
        }
    )
)