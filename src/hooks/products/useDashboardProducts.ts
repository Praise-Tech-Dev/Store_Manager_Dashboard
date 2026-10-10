import { useQuery } from "@tanstack/react-query"
import { PRODUCT_KEYS } from "./productKeys"
import { productService } from "@/services/product.service"


export const useDashboardProducts = () => {
    return useQuery({
        queryKey: PRODUCT_KEYS.all,
        queryFn: productService.fetchAllProducts,
        staleTime: 1000 * 60 * 5,
    });
};