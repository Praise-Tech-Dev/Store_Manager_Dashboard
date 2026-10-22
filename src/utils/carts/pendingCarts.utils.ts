import type { BuildPendingCartsParams } from "@/types/carts/cartUtils.types";
import { createUserMap, getCustomerName } from "../user.utils";
import type { PendingCart } from "@/types/carts/pendingCart.types";
import { createProductMap } from "../products/product.utils";
import { calculateCartTotal } from "./cart.utils";

export const buildingPendingCarts = ({
    carts,
    users,
    products,
}: BuildPendingCartsParams ): PendingCart[] => {
    const userMap = createUserMap(users);
    const productMap = createProductMap(products);

    return carts.map((cart) => {
        const user = userMap.get(cart.userId);

        return {
            id: cart.id,
            userId: cart.userId,
            customerName: getCustomerName(user),
            date: cart.date,
            itemCount: cart.products.reduce((sum, item) => sum + item.quantity, 0),
            total: calculateCartTotal({ cart, productMap }),
        }
    })

}