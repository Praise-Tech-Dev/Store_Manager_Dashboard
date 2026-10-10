import type { Product } from "@/types/products";

//  Helper to index products by ID for O(1) lookups during cart and statistics calculations   
export const createProductMap = (products: Product[]): Map<number, Product> => {
    const map = new Map<number, Product>();
    products.forEach((product) => map.set(product.id, product));
    return map;
};