import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";
import { PRODUCT_KEYS } from "../productKeys";
import { productService } from "@/services/product.service";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const recordDeletion = useProductStore((state) => state.recordDeletion);

  return useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: (deletedId: number) => {
      // 1. Record deletion ID in Zustand
      recordDeletion(deletedId);

      // 2. Invalidate query cache
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.detail(deletedId),
      });
    },
  });
};
