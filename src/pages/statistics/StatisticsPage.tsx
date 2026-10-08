import MetricCard from "@/components/statistics/metrics/MetricCard";
import RecentActivityList from "@/components/statistics/recentActivityList/RecentActivityList";
import { RevenueOrdersChart } from "@/components/statistics/revenueorders/RevenueOrdersChart";
import { StatisticsErrorState } from "@/components/statistics/StatisticsErrorState";
import { StatisticsLoader } from "@/components/statistics/StatisticsLoader";
import { TimeframeSelect } from "@/components/statistics/TimeframeSelect";
import { TopCategoriesChart } from "@/components/statistics/topCategories/TopCategoriesChart";
import { DEFAULT_TIMEFRAME } from "@/constants/statistics/defaultTimeFrame.constants";
import { useStatisticsQuery } from "@/hooks/statistics/useStatisticsQuery";
import type { TimeRangeOption } from "@/types/statistics/exportReport";
import { exportStatisticReport } from "@/utils/statistics/statisticsExport.utils";
import { Download } from "lucide-react";
import { useState } from "react";
// import { useState } from "react";

export const StatisticsPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>(DEFAULT_TIMEFRAME);
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useStatisticsQuery();

  if (isLoading) {
    return <StatisticsLoader />;
  }

  const handleExport = () => {
    if (!data) return;
    exportStatisticReport({data, timeRange});
  }

  if (isError) {
    return (
      <StatisticsErrorState
        error={error}
        refetch={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-[32px] font-bold tracking-[-0.64px] text-text-default leading-10 align-middle">
          Statistics
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Timeframe btn */}
          <TimeframeSelect value={timeRange} onChange={setTimeRange} />

          {/* Export Report btn */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white shadow-sm hover:bg-indigo-700 transition-colors "
          >
            <Download className="h-3 w-3" />
            <span className="font-inter text-sm font-normal leading-5 tracking-normal">
              Export Report
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data?.metrics.map((metric) => (
          <MetricCard key={metric.title} data={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {data?.revenueOrders && (
            <RevenueOrdersChart data={data.revenueOrders} />
          )}
        </div>
        <div className="lg:col-span-1">
          {data?.topCategories && (
            <TopCategoriesChart data={data.topCategories} />
          )}
        </div>
      </div>
      <div className="">
        {data?.recentActivities && (
          <RecentActivityList activities={data.recentActivities} />
        )}
      </div>
    </div>
  );
};
