import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { PRODUCT_KEYS } from "../productKeys";
import type { DashboardProduct } from "@/types/products";
import { productService } from "@/services/product.service";
import type { UpdateProductParams } from "@/types/products/mutationParams.types";

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
    onSuccess: (_, { id, payload }) => {
      // Save edit override to Zustand
      recordEdit(id, payload);

      // Synchronize TanStack Query caches
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(id) });
    },
  });
};
