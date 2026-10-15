import type { DashboardProduct } from "../dashboardProduct.types";
import type { BaseProductModalProps } from "./baseProductModalProps.types";

export interface EditProductModalProps extends BaseProductModalProps {
  product: DashboardProduct | null;
  onRequestDelete?: (product: DashboardProduct) => void;
}
