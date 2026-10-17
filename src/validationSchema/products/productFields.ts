import type { DashboardProduct } from "@/types/products";
import { z } from "zod";

export const titleField = (others: DashboardProduct[]) =>
  z
    .string()
    .trim()
    .min(4, "Product name must be at least 4 characters")
    .max(100, "Product name must be 100 characters or less")
    .regex(/[a-zA-Z0-9]/, "Product name must include letters or numbers")
    .refine(
      (name) =>
        !others.some(
          (p) => p.title.trim().toLowerCase() === name.toLowerCase(),
        ),
      { message: "A product with this name already exists" },
    );

export const priceField = z
  .number({ message: "Price must be a valid number" })
  .gt(0, "Price must be greater than 0")
  .max(1_000_000, "Price is too large")
  .refine((v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6, {
    message: "Price can have at most 2 decimal places",
  });

export const categoryField = z.string().min(1, "Category is required");
