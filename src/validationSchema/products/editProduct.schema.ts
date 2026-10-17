import { z } from "zod";
import { categoryField, priceField, titleField } from "./productFields";
import type { DashboardProduct } from "@/types/products";
import { PUBLISH_STATUS_VALUES } from "@/constants/products/publishStatus.constants";

export const editProductSchema = (
  existingProducts: DashboardProduct[] = [],
  currentId: DashboardProduct["id"],
) =>
  z.object({
    title: titleField(existingProducts.filter((p) => p.id !== currentId)),
    price: priceField,
    category: categoryField,
    description: z.string().trim().max(500, "Max 500 characters").optional(),
    stockCount: z
      .number({ message: "Stock must be a number" })
      .int("Stock must be a whole number")
      .min(0, "Stock count cannot be negative"),
    publishStatus: z.enum(PUBLISH_STATUS_VALUES),
  });

export const editProductBaseSchema = editProductSchema([], 0);
export type EditProductFormInput = z.input<typeof editProductBaseSchema>;
export type EditProductFormValues = z.infer<typeof editProductBaseSchema>;
