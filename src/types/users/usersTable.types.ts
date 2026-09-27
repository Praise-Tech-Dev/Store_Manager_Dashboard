import type { PaginationConfig } from "../table/PaginationConfig.types";
import type { DashboardUser } from "../user.types";

export interface UserTableProps {
  users: DashboardUser[];
  loading: boolean;
  pagination?: PaginationConfig;
  onEdit: (user: DashboardUser) => void;
  onSuspend: (user: DashboardUser) => void;
  onUnsuspend: (user: DashboardUser) => void;
  onDelete: (user: DashboardUser) => void;
  onClearFilters?: () => void;
}
