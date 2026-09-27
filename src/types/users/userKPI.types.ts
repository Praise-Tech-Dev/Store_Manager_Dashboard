import type { DashboardUser } from "../user.types";

export interface UserKPIProps {
  users: DashboardUser[];
  isLoading?: boolean;
}
