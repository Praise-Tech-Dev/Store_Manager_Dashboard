import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { PRODUCT_KEYS } from "../productKeys";
import type { DashboardProduct } from "@/types/products";
import { productService } from "@/services/product.service";
import type { UpdateProductParams } from "@/types/products/mutationParams.types";
import { toast } from "react-toastify";
import { enrichProduct } from "@/utils/products/productEnricher";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const recordEdit = useProductStore((state) => state.recordEdit);

  return useMutation({
    mutationFn: async ({ id, payload }: UpdateProductParams) => {
      const existingProducts =
        queryClient.getQueryData<DashboardProduct[]>(PRODUCT_KEYS.all) ?? [];
      const existingProduct = existingProducts.find((p) => p.id === id);

      return await productService.updateProduct(id, payload, existingProduct);
    },
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: PRODUCT_KEYS.all });
      const previousProducts = queryClient.getQueryData<DashboardProduct[]>(PRODUCT_KEYS.all);
      queryClient.setQueryData<DashboardProduct[]>(PRODUCT_KEYS.all, (old = []) =>
        old.map((product) => 
          (product.id === id 
          ? enrichProduct(
            { ...product, ...payload },
          {
            sku: product.sku,
            stockCount: payload.stockCount ?? product.stockCount,
          }) : product)),
      );
      return { previousProducts };
    },
    onSuccess: (_, { id, payload }) => {
      // Save edit override to Zustand
      recordEdit(id, payload);

      // Synchronize TanStack Query caches
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(id) });
      toast.success("Product updated successfully");
    },
    onError: (err: Error, _variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(PRODUCT_KEYS.all, context.previousProducts);
      }
      toast.error(err.message || "Failed to update product");
    }
  });
};
