import type { ActivityItem } from "./activity.types";
import type { TopCategoriesData } from "./category.types";
import type { MetricCardData } from "./metric.types";
import type { RevenueOrdersData } from "./revenueOrders.types";

export interface DashboardStatisticsResponse {
    metrics: MetricCardData[];
    topCategories: TopCategoriesData;
    revenueOrders: RevenueOrdersData;
    recentActivities: ActivityItem[];
}