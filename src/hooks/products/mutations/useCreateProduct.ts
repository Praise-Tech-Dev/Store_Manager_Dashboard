import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { PRODUCT_KEYS } from "../productKeys";
import type { CreateProductDTO, DashboardProduct } from "@/types/products";
import { productService } from "@/services/product.service";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const recordCreation = useProductStore((state) => state.recordCreation);

  return useMutation({
    mutationFn: async (payload: CreateProductDTO) => {
      // Pass currently cached products so productService calculates maxId accurately
      const existingProducts =
        queryClient.getQueryData<DashboardProduct[]>(PRODUCT_KEYS.all) ?? [];
      return await productService.createProduct(payload, existingProducts);
    },
    onSuccess: (newProduct: DashboardProduct) => {
      // Persist locally to Zustand
      recordCreation(newProduct);

      // Invalidate query cache to trigger re-render via reconcileProducts
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};
