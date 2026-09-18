import type { MetricSummary } from "@/types/metricCardData.types";
import type { DashboardUser } from "@/types/user.types";
import { useMemo } from "react";

export const useUserMetrics = (users: DashboardUser[]): MetricSummary[] => {
    return useMemo(() => {
        let activeCount = 0;
        let suspendedCount = 0;

        for (const user of users){
            if (user.status === "Active"){
                activeCount ++;
            } else if (user.status === "Suspended"){
                suspendedCount ++;
            }
        }

        return [
          {
            type: "total",
            label: "Total USers",
            value: users.length,
            subtext: "+12% this month",
          },
          {
            type: "active",
            label: "Active Accounts",
            value: activeCount,
            subtext: "Operational",
          },
          {
            type: "suspended",
            label: "Suspended",
            value: suspendedCount,
            subtext: "Requires attention",
            
          },
        ];
    }, [users])
} 