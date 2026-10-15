import type { DashboardProduct } from "../dashboardProduct.types";
import type { BaseProductModalProps } from "./baseProductModalProps.types";

export interface AddProductModalProps extends BaseProductModalProps {
  onSuccess?: () => void;
  existingProducts?: DashboardProduct[];
}
