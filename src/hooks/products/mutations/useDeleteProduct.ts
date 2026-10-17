import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { PRODUCT_KEYS } from "../productKeys";
import { productService } from "@/services/product.service";
import type { DashboardProduct } from "@/types/products";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const recordDeletion = useProductStore((state) => state.recordDeletion);

  return useMutation({
    mutationFn: (product: DashboardProduct) => productService.deleteProduct(product),
    onMutate: async (product) => {
      await queryClient.cancelQueries({ queryKey: PRODUCT_KEYS.lists() });
      const previousLists = queryClient.getQueriesData<DashboardProduct[]>({
        queryKey: PRODUCT_KEYS.lists(),
      });
      queryClient.setQueriesData<DashboardProduct[]>(
        { queryKey: PRODUCT_KEYS.lists() },
        (old) => old?.filter((p) => p.id !== product.id),
      );

      return { previousLists };
    },
    onError: (err: Error, _variables, context) => {
      // Put each list back under its own key
      context?.previousLists.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      toast.error(err.message || "Failed to delete product");
    },
    onSuccess: (deletedId: number) => {
      //  Record deletion ID in Zustand
      recordDeletion(deletedId);
      queryClient.removeQueries({
        queryKey: PRODUCT_KEYS.detail(deletedId),
      });
      // Invalidate query cache
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      toast.success("Product deleted successfully");
    },
  });
};
