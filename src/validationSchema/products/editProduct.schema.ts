import { z } from "zod";

export const editProductSchema = z.object({
  title: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive("Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  stockCount: z.coerce.number().min(0, "Stock count cannot be negative"),
  status: z.enum(["Active", "Draft", "Archived"]).default("Active"),
});

export type EditProductFormValues = z.infer<typeof editProductSchema>;
