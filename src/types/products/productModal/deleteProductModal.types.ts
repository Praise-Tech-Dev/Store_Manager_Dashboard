import type { DashboardProduct } from "../dashboardProduct.types";
import type { BaseProductModalProps } from "./baseProductModalProps.types";

export interface DeleteProductModalProps extends BaseProductModalProps {
  product: DashboardProduct | null;
  onConfirmDelete: (id: number) => void;
  isLoading?: boolean;
}
