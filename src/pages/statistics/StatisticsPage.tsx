import MetricCard from "@/components/statistics/metrics/MetricCard";
import { RevenueOrdersChart } from "@/components/statistics/revenueorders/RevenueOrdersChart";
import { StatisticsErrorState } from "@/components/statistics/StatisticsErrorState";
import { StatisticsLoader } from "@/components/statistics/StatisticsLoader";
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
    <div className="flex flex-col gap-3 sm:gap-6">
      {/* header  */}
      <h1 className="text-xl font-bold">Statistics</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.metrics.map((metric) => (
          <MetricCard key={metric.title} data={metric} />
        ))}
      </div>
      <div className="flex">
        <div className="w-full sm:w-2/3">
          {data?.revenueOrders && <RevenueOrdersChart data={data.revenueOrders} />}
        </div>
        <div className="w-full sm:w-1/3"></div>
      </div>
    </div>
  );
};
