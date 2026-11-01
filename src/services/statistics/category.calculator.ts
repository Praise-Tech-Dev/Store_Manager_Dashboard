import { CategoryColor } from "@/constants/statistics/statistics.constants";
import type { CategoryDistributionItem } from "@/types/statistics";
import type { CategoryCalculationParams } from "@/types/statistics/calculatorParams.types";
import { countsAsRevenue } from "@/utils/orders";
import { formatPercentage } from "@/utils/statistics.utils";

export const calculateCategoryDistribution = ({
  orders,
  productMap,
}: CategoryCalculationParams) => {
  const categoryCounts: Record<string, number> = {};
  let totalItems = 0;

  orders.filter(countsAsRevenue).forEach((order) => {
    order.items.forEach((item) => {
      const product = productMap.get(item.productId);
      if (!product) return; // product no longer exists: skip it
      categoryCounts[product.category] =
        (categoryCounts[product.category] ?? 0) + item.quantity;
      totalItems += item.quantity;
    });
  });

  const categories: CategoryDistributionItem[] = Object.entries(
    categoryCounts,
  ).map(([catName, count]) => ({
    id: catName,
    name: catName.charAt(0).toUpperCase() + catName.slice(1),
    value: count,
    percentage: formatPercentage(count, totalItems),
    color: CategoryColor[catName] || "#94A3B8",
  }));

  return { totalItems, categories };
};
