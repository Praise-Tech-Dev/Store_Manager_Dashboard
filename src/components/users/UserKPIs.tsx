import { useUserMetrics } from "@/hooks/users/useUserMetrics";
import type { DashboardUser } from "@/types/user.types"
import { Skeleton } from "../shared/Skeleton";
import { Card } from "../shared/Card";
import { Ban, UserCheck, Users } from "lucide-react";
import type { MetricType } from "@/types/metricCardData.types";

interface UserKPIProps {
    users: DashboardUser[];
    isLoading?: boolean;
}

const SKELETON_SLOTS = [0, 1, 2] as const;

export const UserKPIs = ({ users, isLoading = false}: UserKPIProps) => {
    const METRIC_CONFIG: Record<
      MetricType,
      { icon: React.ReactNode; bg: string }
    > = {
      total: {
        icon: <Users className="h-5 w-5 text-indigo-600" />,
        bg: "bg-indigo-50",
      },
      active: {
        icon: <UserCheck className="h-5 w-5 text-emerald-600" />,
        bg: "bg-emerald-50",
      },
      suspended: {
        icon: <Ban className="h-5 w-5 text-rose-600" />,
        bg: "bg-rose-50",
      },
    };

    const metrics = useUserMetrics(users);

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SKELETON_SLOTS.map((slot) => (
            <Card key={slot} className="p-5!">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
              <Skeleton className="mt-3 h-8 w-16" />
              <Skeleton className="mt-2 h-3 w-28" />
            </Card>
          ))}
        </div>
      );
    }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((metric) => {
        const visual = METRIC_CONFIG[metric.type];
        return (
          <Card
            key={metric.type}
            className="p-5! transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {metric.label}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${visual.bg}`}
              >
                {visual.icon}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold tracking-tight text-slate-900">
                {metric.value.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-slate-400">{metric.subtext}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
