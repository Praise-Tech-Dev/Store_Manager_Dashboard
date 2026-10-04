import { useQuery } from "@tanstack/react-query";
import type { DashboardStatisticsResponse } from "@/types/statistics";
import { statisticsService } from "@/services/statistics/statistics.service";
import { statisticsKeys } from "./statistics.keys";


export const useStatisticsQuery = () => {
  return useQuery<DashboardStatisticsResponse, Error>({
    queryKey: statisticsKeys.overview(),
    queryFn: () => statisticsService.getDashboardStatistics(),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
  });
};
