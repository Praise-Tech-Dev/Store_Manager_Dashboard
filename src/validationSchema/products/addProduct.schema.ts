import type { DashboardProduct } from "@/types/products";
import { z } from "zod";

export const addProductSchema = (existingProducts: DashboardProduct[] = []) =>
  z.object({
    title: z
      .string()
      .min(1, "Product name is required")
      .refine(
        (name) =>
          !existingProducts.some(
            (p) => p.title.trim().toLowerCase() === name.trim().toLowerCase(),
          ),
        { message: "A product with this name already exists" },
      ),
    sku: z
      .string()
      .min(1, "SKU is required")
      .refine(
        (skuVal) =>
          !existingProducts.some(
            (p) => p.sku?.trim().toLowerCase() === skuVal.trim().toLowerCase(),
          ),
        { message: "A product with this SKU already exists" },
      ),
    price: z.coerce
      .number({ message: "Price must be a valid number" })
      .gt(0, "Price must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    image: z.instanceof(Blob).optional(),
  });

export const addProductBaseSchema = addProductSchema([]);
export type AddProductFormInput = z.input<typeof addProductBaseSchema>;
export type AddProductFormValues = z.output<typeof addProductBaseSchema>;
