import { useMemo, useState } from "react";
import type { DashboardStatisticsResponse } from "@/types/statistics";
import type { OrderDateRange } from "@/types/orders/orderFilters.types";
import { useAllOrders } from "@/hooks/orders/useAllOrders";
import { createProductMap } from "@/utils/products/product.utils";
import { filterOrdersByPeriod } from "@/utils/orders";
import { calculateDashboardMetrics } from "@/services/statistics/metrics.calculator";
import { calculateRevenueTimeline } from "@/services/statistics/timeline.calculator";
import { calculateCategoryDistribution } from "@/services/statistics/category.calculator";
import { transformRecentActivities } from "@/services/statistics/activity.transformer";
import { useDashboardProducts } from "../products";
import { useDashboardUsers } from "../users";

export const useDashboardStatistics = (dateRange: OrderDateRange) => {
   const productsQuery = useDashboardProducts();
   const usersQuery = useDashboardUsers();
  const orders = useAllOrders();
  const [now] = useState(() => new Date());

  const products = productsQuery.data;
  const users = usersQuery.data;

  const data = useMemo<DashboardStatisticsResponse | undefined>(() => {
    if (!products || !users) return undefined;

    // const { products, users } = query.data;
    const productMap = createProductMap(products);
    const periodOrders = filterOrdersByPeriod({ orders, dateRange, now });
    const activeUsers = users.filter((u) => u.status === "Active" || !u.status);

    return {
      metrics: calculateDashboardMetrics({
        orders: periodOrders,
        totalUsers: activeUsers.length,
      }),
      topCategories: calculateCategoryDistribution({
        orders: periodOrders,
        productMap,
      }),
      revenueOrders: calculateRevenueTimeline(periodOrders),
      recentActivities: transformRecentActivities({
        orders: periodOrders,
        productMap,
      }),
    };
  }, [products, users, orders, dateRange, now]);

  return {
    data,
    isLoading: productsQuery.isLoading || usersQuery.isLoading,
    isError: productsQuery.isError || usersQuery.isError,
    error: productsQuery.error ?? usersQuery.error,
    isRefetching: productsQuery.isRefetching || usersQuery.isRefetching,
    refetch: () => {
      void productsQuery.refetch();
      void usersQuery.refetch();
    },
  };
};
