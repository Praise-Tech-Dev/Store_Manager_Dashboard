import { forwardRef } from "react";
import type { ProductStatus } from "@/types/products";
import { Select } from "../shared/Select";
import type { StatusSelectProps } from "@/types/products/productStatus.types";
import { PRODUCT_STATUS_OPTIONS } from "@/constants/products/productStatus.constants";

export const StatusSelect = forwardRef<HTMLSelectElement, StatusSelectProps>(
  ({ value, onChange, className = "", ...props }, ref) => {
    return (
      <Select
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(e.target.value as ProductStatus | "Status")}
        options={PRODUCT_STATUS_OPTIONS}
        className={`bg-[#F3F4F6] border-none shadow-none text-text-default hover:bg-[#E5E7EB] ${className}`}
        {...props}
      />
    );
  },
);

StatusSelect.displayName = "StatusSelect";
