import MetricCard from "@/components/statistics/metrics/MetricCard";
import RecentActivityList from "@/components/statistics/recentActivityList/RecentActivityList";
import { RevenueOrdersChart } from "@/components/statistics/revenueorders/RevenueOrdersChart";
import { StatisticsErrorState } from "@/components/statistics/StatisticsErrorState";
import { StatisticsLoader } from "@/components/statistics/StatisticsLoader";
import { TopCategoriesChart } from "@/components/statistics/topCategories/TopCategoriesChart";
import { useStatisticsQuery } from "@/hooks/statistics/useStatisticsQuery";
// import { useState } from "react";

export const StatisticsPage = () => {
  // const [timeRange, setTimeRange] = useState("Last 30 Days");
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useStatisticsQuery();

  if (isLoading) {
    return <StatisticsLoader />;
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
      {/* header  */}
      <h1 className="text-xl font-bold">Statistics</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data?.metrics.map((metric) => (
          <MetricCard key={metric.title} data={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {data?.revenueOrders && <RevenueOrdersChart data={data.revenueOrders} />}
        </div>
        <div className="lg:col-span-1">
          {data?.topCategories && <TopCategoriesChart data={data.topCategories} />}
        </div>
      </div>
      <div className="">
        {data?.recentActivities && <RecentActivityList activities={data.recentActivities} />}
        
      </div>
    </div>
  );
};
