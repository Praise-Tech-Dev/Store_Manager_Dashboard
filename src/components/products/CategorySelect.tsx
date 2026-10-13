import { forwardRef } from "react";
import type { SelectProps } from "@/types/shared/select/select.types";
import type { ProductCategory } from "@/types/products/productCategory.types";
import { Select } from "../shared/Select";

export interface CategorySelectProps extends Omit<
  SelectProps,
  "options" | "value" | "onChange"
> {
  value?: ProductCategory | "Category";
  onChange?: (value: ProductCategory | "Category") => void;
}

const CATEGORY_OPTIONS = [
  { value: "Category", label: "Category" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
];

export const CategorySelect = forwardRef<
  HTMLSelectElement,
  CategorySelectProps
>(({ value, onChange, className = "", ...props }, ref) => {
  return (
    <Select
      ref={ref}
      value={value}
      onChange={(e) =>
        onChange?.(e.target.value as ProductCategory | "Category")
      }
      options={CATEGORY_OPTIONS}
      className={`bg-[#F2F4F6] border-none shadow-none text-gray-700 hover:bg-[#E5E7EB] ${className}`}
      {...props}
    />
  );
});

CategorySelect.displayName = "CategorySelect";
