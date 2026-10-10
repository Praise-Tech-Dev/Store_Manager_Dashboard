import type { PaginationConfig } from "@/types/table/PaginationConfig.types";
import type { DashboardProduct } from "../dashboardProduct.types";

export interface ProductTableProps {
  products: DashboardProduct[];
  loading?: boolean;
  pagination?: PaginationConfig;
  onEdit?: (product: DashboardProduct) => void;
  onDelete?: (product: DashboardProduct) => void;
  onClearFilters?: () => void;
}