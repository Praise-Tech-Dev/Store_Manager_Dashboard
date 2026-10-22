import type { Cart } from "@/types/carts";
import type { Product } from "@/types/products";
import type { ActivityItem } from "@/types/statistics/recentActivity/activity.types";
import type { DashboardUser } from "@/types/user.types";
import { calculateCartTotal } from "@/utils/carts/cart.utils";
import { formatCurrency } from "@/utils/statistics.utils";
import { createUserMap, getCustomerName } from "@/utils/user.utils";

export const transformRecentActivities = (
  carts: Cart[],
  users: DashboardUser[],
  productMap: Map<number, Product>,
): ActivityItem[] => {
  const userMap = createUserMap(users);

  return carts.slice(0, 4).map((cart, index) => {
    // const user = userMap.get(cart.userId);
    const firstProduct = productMap.get(cart.products[0]?.productId);

    const totalCost = calculateCartTotal({cart, productMap});

    const customerName = getCustomerName(userMap.get(cart.userId))

    return {
      id: `act-cart-${cart.id}-${index}`,
      type: "order",
      title: `New Order #ORD-${cart.id + 7300}`,
      description: `${customerName} purchased '${firstProduct?.title.slice(0, 40) ?? "Item"}...'`,
      amount: formatCurrency(totalCost),
      timestamp: `${(index + 1) * 20} mins ago`,
    };
  });
};
