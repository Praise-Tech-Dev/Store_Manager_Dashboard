import type { DashboardProduct } from "../dashboardProduct.types";
import type { BaseProductModalProps } from "./baseProductModalProps.types";

export interface DuplicateProductModalProps extends BaseProductModalProps {
  product: DashboardProduct | null;
}
