import type {
  CategoryDistributionItem,
  DashboardStatisticsResponse,
} from "@/types/statistics";
import { productService } from "../product.service";
import { cartService } from "../cart.service";
import { userService } from "../user.service";
import { createProductMap } from "@/utils/products/product.utils";
import { formatPercentage } from "@/utils/statistics.utils";
import { CategoryColor } from "@/constants/statistics/statistics.constants";
import { calculateRevenueTimeline } from "./timeline.calculator";
import { calculateDashboardMetrics } from "./metrics.calculator";
import { transformRecentActivities } from "./activity.transformer";

export const statisticsService = {
  async getDashboardStatistics(): Promise<DashboardStatisticsResponse> {
    const [products, carts, users] = await Promise.all([
      // fetch data from different services concurrently
      productService.fetchAllProducts(),
      cartService.fetchAllCarts(),
      userService.fetchDashboardUsers(),
    ]);

    // hash map of products for quick lookup
    const productMap = createProductMap(products);

    let totalRevenue = 0;
    let totalItemsSold = 0;
    const categoryCounts: Record<string, number> = {};

    carts.forEach((cart) => {
      cart.products.forEach((item) => {
        const product = productMap.get(item.productId);
        if (product) {
          totalRevenue += product.price * item.quantity;
          totalItemsSold += item.quantity;
          categoryCounts[product.category] =
            (categoryCounts[product.category] || 0) + item.quantity;
        }
      });
    });

    const categories: CategoryDistributionItem[] = Object.entries(
      categoryCounts,
    ).map(([catName, count]) => ({
      id: catName,
      name: catName.charAt(0).toUpperCase() + catName.slice(1),
      value: count,
      percentage: formatPercentage(count, totalItemsSold),
      color: CategoryColor[catName] || "#94A3B8",
    }));

    const revenueOrders = calculateRevenueTimeline(carts, productMap);
    const activeUsers = users.filter((u) => u.status === "Active" || !u.status);
    const metrics = calculateDashboardMetrics({
      totalRevenue,
      totalOrders: carts.length,
      totalUsers: activeUsers.length,
      revenueOrders,
    });

    const recentActivities = transformRecentActivities(
      carts,
      users,
      productMap,
    );

    return {
      metrics,
      topCategories: {
        totalItems: totalItemsSold,
        categories,
      },
      revenueOrders,
      recentActivities,
    };
  },
};
