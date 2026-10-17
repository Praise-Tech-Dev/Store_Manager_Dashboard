import type { DashboardProduct } from "@/types/products";
import { z } from "zod";
import { categoryField, priceField, titleField } from "./productFields";

export const addProductSchema = (existingProducts: DashboardProduct[] = []) =>
  z.object({
    title: titleField(existingProducts),
    price: priceField,
    category: categoryField,
    image: z.instanceof(Blob).optional(),
  });

export const addProductBaseSchema = addProductSchema([]);
export type AddProductFormInput = z.input<typeof addProductBaseSchema>;
export type AddProductFormValues = z.output<typeof addProductBaseSchema>;
