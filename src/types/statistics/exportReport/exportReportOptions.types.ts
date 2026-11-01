import type { OrderDateRange } from "@/types/orders";
import type { DashboardStatisticsResponse } from "../dashboardStatisticsResponse.types";

export interface ExportReportOptions {
  data: DashboardStatisticsResponse;
  timeRange: OrderDateRange;
  filename?: string;
}
