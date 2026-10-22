import { useQuery } from "@tanstack/react-query"
import { PENDING_CART_KEYS } from "./pendingCart.keys"
import { pendingCartsService } from "@/services/pendingCarts.service"

export const usePendingCarts = () => {
    
    return useQuery({
      queryKey: PENDING_CART_KEYS.all,
      queryFn: pendingCartsService.getPendingCarts,
      staleTime: 1000 * 60 * 5,
    });
}