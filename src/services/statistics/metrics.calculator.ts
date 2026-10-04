import type { MetricCardData } from "@/types/statistics";
import type { MetricCalculationParams } from "@/types/statistics/metricCalculatorParam.types";
import { formatCurrency } from "@/utils/statistics.utils";

export const calculateDashboardMetrics = ({
    totalRevenue,
    totalOrders,
    totalUsers,
    revenueOrders,
}: MetricCalculationParams): MetricCardData[] => {
    const conversationRate = totalOrders > 0 ? (totalUsers / totalOrders) * 100 : 0;

    return [
      {
        id: "revenue",
        title: "TOTAL REVENUE",
        value: formatCurrency(totalRevenue),
        change: "+14.2%",
        isPositive: true,
        color: "#3525CD1A",
        trend: revenueOrders.map((d) => ({ value: d.revenue || 5 })),
      },
      {
        id: "users",
        title: "ACTIVE USERS",
        value: totalUsers.toLocaleString(),
        change: "+5.8%",
        isPositive: true,
        color: "#505F76",
        trend: [
          { value: 3 },
          { value: 5 },
          { value: 6 },
          { value: 8 },
          { value: totalUsers },
        ],
      },
      {
        id: "orders",
        title: "TOTAL ORDERS",
        value: totalOrders.toLocaleString(),
        change: "+12.1%",
        isPositive: true,
        color: "#3525CD",
        trend: revenueOrders.map((d) => ({ value: d.revenue || 1 })),
      },
      {
        id: "conversion",
        title: "CONVERSION RATE",
        value: `${conversationRate.toFixed(2)}%`,
        change: "+8.3%",
        isPositive: true,
        color: "#BA1A1A",
        trend: revenueOrders.map((d) => ({ value: d.revenue || 5 })),
      },
    ];
}