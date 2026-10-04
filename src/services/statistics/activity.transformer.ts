import type { Cart } from "@/types/carts";
import type { Product } from "@/types/products";
import type { ActivityItem } from "@/types/statistics/activity.types";
import type { DashboardUser } from "@/types/user.types";
import { formatCurrency } from "@/utils/statistics.utils";

export const transformRecentActivities = (
    carts: Cart[],
    users: DashboardUser[],
    productMap: Map<number, Product>,
): ActivityItem[] => {
    const userMap = new Map<number, DashboardUser>();
    users.forEach((user) => userMap.set(user.id, user));

    return carts.slice(0, 4).map((cart, index) => {
        const user = userMap.get(cart.userId);
        const firstProduct = productMap.get(cart.products[0]?.productId);

        const totalCost = cart.products.reduce((sum, item) => {
            const price = productMap.get(item.productId)?.price ?? 0;

            return sum + price * item.quantity;
        }, 0);

        const customerName = user ? `${user.name.firstname} ${user.name.lastname}` : "Guest Customer";

        return {
          id: `act-cart-${cart.id}-${index}`,
          type: "order",
          title: `New Order #ORD-${cart.id + 7300}`,
          description: `${customerName} purchased '${firstProduct?.title.slice(0, 22) ?? "Item"}...'`,
          amount: formatCurrency(totalCost),
          timestamp: `${(index + 1) * 20} mins ago`,
        };
        });
    
}