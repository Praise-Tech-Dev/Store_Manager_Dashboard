import { useProductStore } from "@/store/useProductStore";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_KEYS } from "../productKeys";
import { productService } from "@/services/product.service";
import type { DashboardProduct } from "@/types/products";
import { reconcileSingleProduct } from "@/utils/products/productReconciler";

export const useProductDetail = (id: number) => {
  const userCreatedProducts = useProductStore(
    (state) => state.userCreatedProducts,
  );
  const userEdits = useProductStore((state) => state.userEdits);
  const deletedIds = useProductStore((state) => state.deletedIds);

  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => productService.fetchProductById(id),
    enabled: !!id && !deletedIds.includes(id),
    staleTime: 1000 * 60 * 5,
    select: (serverProduct: DashboardProduct) =>
      reconcileSingleProduct(serverProduct, {
        userCreatedProducts,
        userEdits,
        deletedIds,
      }),
  });
};
