import type { ActivityItem } from "./activity.types";

export interface RecentActivityListProps {
  activities: ActivityItem[];
  onViewAll?: () => void;
}
