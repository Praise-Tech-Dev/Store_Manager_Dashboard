import type { ExportReportOptions } from "@/types/statistics/exportReport";
import { createCsvRow, triggerCsvDownload } from "../csv.utils";
import { REPORT_HEADERS } from "@/constants/statistics/reportHeaders.constants";

export const exportStatisticReport = ({data, timeRange, filename, }: ExportReportOptions): void => {
    const fileDate = new Date().toISOString().split("T")[0];
    const finalFilename = filename ?? `statistics_report_${fileDate}.csv`;

    const rows: string[] = [
      // Header section
      createCsvRow(["STORE PERFORMANCE REPORT"]),
      createCsvRow(["Generate At", new Date().toLocaleDateString()]),
      createCsvRow(["Select Range", timeRange]),
      "", // blank row separator

      // Key Performance Metrics
      createCsvRow(["--- KEY METRICS ---"]),
      createCsvRow(REPORT_HEADERS.METRICS),
      ...data.metrics.map((metric) =>
        createCsvRow([metric.title, metric.value, metric.change]),
      ),
      "",

      // Top Category Breakdown
      createCsvRow(["--- TOP CATEGORIES ---"]),
      createCsvRow(REPORT_HEADERS.CATEGORIES),
      ...(data.topCategories?.categories ?? []).map((cat) =>
        createCsvRow([cat.name, cat.value, `${cat.percentage}%`]),
      ),
      "",

      createCsvRow(["--- REVENUE & ORDERS TIMELINE ---"]),
      createCsvRow(REPORT_HEADERS.TIMELINE),
      ...(data.revenueOrders ?? []).map((entry) =>
        createCsvRow([ entry.day, entry.revenue, entry.orders]),
      ),
    ];

    triggerCsvDownload(rows.join("\r\n"), finalFilename)
}