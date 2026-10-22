import type { PendingCart } from "@/types/carts/pendingCart.types";
import { cartService } from "./cart.service";
import { userService } from "./user.service";
import { productService } from "./product.service";
import { buildingPendingCarts } from "@/utils/carts/pendingCarts.utils";

export const pendingCartsService = {
    async getPendingCarts(): Promise<PendingCart[]> {
        const [carts, users, products] = await Promise.all([
            cartService.fetchAllCarts(),
            userService.fetchDashboardUsers(),
            productService.fetchAllProducts(),
        ]);

        return buildingPendingCarts({ carts, users, products });
    }
}