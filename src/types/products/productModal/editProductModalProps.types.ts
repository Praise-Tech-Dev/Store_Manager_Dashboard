import type { DashboardProduct } from "../dashboardProduct.types";
import type { BaseProductModalProps } from "./baseProductModalProps.types";

export interface EditProductModalProps extends BaseProductModalProps {
  product: DashboardProduct | null;
  existingProducts?: DashboardProduct[];
  onRequestDelete?: (product: DashboardProduct) => void;
  onSuccess?: () => void;
}

export interface EditProductFormProps
  extends Omit<EditProductModalProps, "product"> {
  product: DashboardProduct; 
}