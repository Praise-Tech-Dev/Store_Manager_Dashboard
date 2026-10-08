import type { DashboardStatisticsResponse } from "../dashboardStatisticsResponse.types";
import type { TimeRangeOption } from "./timeRangeOption.types";

export interface ExportReportOptions {
  data: DashboardStatisticsResponse;
  timeRange: TimeRangeOption | string;
  filename?: string;
}
