import { useQuery } from "@tanstack/react-query";
import { PRODUCT_KEYS } from "../productKeys";
import { productService } from "@/services/product.service";
import { useProductStore } from "@/store/useProductStore";
import type { DashboardProduct } from "@/types/products";
import { reconcileProducts } from "@/utils/products/productReconciler";

export const useDashboardProducts = () => {
    const userCreatedProducts = useProductStore((state) => state.userCreatedProducts);
    const userEdits = useProductStore((state) => state.userEdits);
    const deletedIds = useProductStore((state) => state.deletedIds);
  return useQuery({
    queryKey: PRODUCT_KEYS.all,
    queryFn: productService.fetchAllProducts,
    staleTime: 1000 * 60 * 5,
    select: (serverProducts: DashboardProduct[]) => 
        reconcileProducts(serverProducts, {
            userCreatedProducts,
            userEdits,
            deletedIds,
        })
  });
};
