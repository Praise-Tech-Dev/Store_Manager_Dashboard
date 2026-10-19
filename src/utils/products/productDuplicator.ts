import { DUPLICATE_NAME_SUFFIX } from "@/constants/products/productDuplicate.constants";
import type { CreateProductInput, DashboardProduct } from "@/types/products";
import { generateSku } from "./productEnricher";

export const buildDuplicateInput = (
  source: DashboardProduct,
  nextId: number,
  image: CreateProductInput["image"],
): CreateProductInput => ({
  title: `${source.title}${DUPLICATE_NAME_SUFFIX}`,
  price: source.price,
  description: source.description,
  category: source.category,
  stockCount: source.stockCount,
  sku: generateSku(nextId, source.title),
  image,
});
