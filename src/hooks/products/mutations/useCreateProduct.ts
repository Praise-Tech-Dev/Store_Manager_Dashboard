import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { PRODUCT_KEYS } from "../productKeys";
import type { CreateProductInput, DashboardProduct } from "@/types/products";
import { productService } from "@/services/product.service";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const recordCreation = useProductStore((state) => state.recordCreation);

  return useMutation({
    networkMode: "always",
    mutationFn: async (payload: CreateProductInput) => {
      // Pass currently cached products so productService calculates maxId accurately
      const cached = queryClient
        .getQueriesData<DashboardProduct[]>({
          queryKey: PRODUCT_KEYS.lists(),
        })
        .flatMap(([, data]) => data ?? []);
      const { userCreatedProducts, deletedIds } = useProductStore.getState();

      return await productService.createProduct(payload, [
        ...cached,
        ...userCreatedProducts,
      ], deletedIds);
    },
    onSuccess: (newProduct: DashboardProduct) => {
      // Persist locally to Zustand
      recordCreation(newProduct);
      toast.success(`${newProduct.title} Product Added successfully `)

      // Invalidate query cache to trigger re-render via reconcileProducts
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add new product");
    }
  });
};
