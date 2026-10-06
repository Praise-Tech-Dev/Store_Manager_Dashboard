import type { MetricCardData } from "@/types/statistics";
import type { MetricCalculationParams } from "@/types/statistics/metricCalculatorParam.types";
import { formatCurrency } from "@/utils/statistics.utils";
import { generateZigzagTrend } from "@/utils/statistics/sparkline.utils";

export const calculateDashboardMetrics = (params: MetricCalculationParams): MetricCardData[] => {
  const { totalRevenue, totalOrders, totalUsers } = params;
    const conversionRate = totalOrders > 0 ? (totalOrders / totalUsers) * 100 : 0;

    return [
      {
        id: "revenue",
        title: "TOTAL REVENUE",
        value: formatCurrency(totalRevenue),
        change: "14.2%",
        isPositive: true,
        color: "#3525CD1A",
        trend: generateZigzagTrend(totalRevenue, "upward"),
      },
      {
        id: "users",
        title: "ACTIVE USERS",
        value: totalUsers.toLocaleString(),
        change: "5.8%",
        isPositive: true,
        color: "#505F76",
        trend: generateZigzagTrend(totalUsers, "neutral"),
      },
      {
        id: "orders",
        title: "TOTAL ORDERS",
        value: totalOrders.toLocaleString(),
        change: "12.1%",
        isPositive: true,
        color: "#3525CD",
        trend: generateZigzagTrend(totalUsers, "neutral"),
      },
      {
        id: "conversion",
        title: "CONVERSION RATE",
        value: `${conversionRate.toFixed(2)}%`,
        change: "-2.4%",
        isPositive: false,
        color: "#BA1A1A",
        trend: generateZigzagTrend(conversionRate, "downward"),
      },
    ];
}