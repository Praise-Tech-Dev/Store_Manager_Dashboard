import type { SelectProps } from "../shared/select/select.types";
import type { ProductStatus } from "./dashboardProduct.types";

export interface StatusSelectProps extends Omit<
  SelectProps,
  "options" | "value" | "onChange"
> {
  value?: ProductStatus | "Status";
  onChange?: (value: ProductStatus | "Status") => void;
}
