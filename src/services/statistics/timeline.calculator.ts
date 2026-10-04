import { WEEKDAYS } from "@/constants/statistics.constants";
import type { Cart } from "@/types/carts";
import type { Product } from "@/types/products";
import type { RevenueOrdersPoint } from "@/types/statistics";

export const calculateRevenueTimeline = (
    carts: Cart[],
    productMap: Map<number, Product>,
): RevenueOrdersPoint [] => {
    const dayLookup: Record<number, (typeof WEEKDAYS)[number]> = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
    };

    const dayTotals: Record<string, { revenue: number; orders: number }> = {
      Mon: { revenue: 0, orders: 0 },
      Tue: { revenue: 0, orders: 0 },
      Wed: { revenue: 0, orders: 0 },
      Thu: { revenue: 0, orders: 0 },
      Fri: { revenue: 0, orders: 0 },
      Sat: { revenue: 0, orders: 0 },
      Sun: { revenue: 0, orders: 0 },
    };

    carts.forEach((cart) => {
        const dayName = dayLookup[new Date(cart.date).getDay()];
        if (dayTotals[dayName]) {
            dayTotals[dayName].orders += 1;
            const cartCost = cart.products.reduce((acc, item) => {
                const product = productMap.get(item.productId);
                return acc + (product ?.price ?? 0) * item.quantity;
            }, 0);
            dayTotals[dayName].revenue += Math.round(cartCost);
        }
    });

    return WEEKDAYS.map((day) => ({
        day,
        revenue: dayTotals[day].revenue ,
        orders: dayTotals[day].orders ,
    }));
}