import { DEFAULT_LOW_STOCK_THRESHOLD } from "@/constants/products/productCategory.constants"
import type { DashboardProduct, Product, ProductStatus } from "@/types/products";

export const generateSku = (id: number, title: string): string => {
  const words = title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const lastChar =
    words.length > 2 ? `-${words[words.length - 1][0].toUpperCase()}` : "";
  const paddedId = String(id).padStart(3, "0");

  return `${initials}${lastChar}-${paddedId}`;
};

export const calculateStatus = (stockCount: number): ProductStatus => {
    if (stockCount <= 0) return "Out of Stock";
    if (stockCount < DEFAULT_LOW_STOCK_THRESHOLD) return "Low Stock";
    return "In Stock";
};

export const enrichProduct = (
    product: Product,
    overrides?: Partial<DashboardProduct>
): DashboardProduct => {
    const stockCount = overrides?.stockCount ?? (product.id * 7) % 51;
    const status = overrides?.status ?? calculateStatus(stockCount);
    const sku = overrides?.sku ?? generateSku(product.id, product.title);

    return {
        ...product,
        sku,
        stockCount,
        status,
        avatar: overrides?.avatar ?? product.image,
    }
}