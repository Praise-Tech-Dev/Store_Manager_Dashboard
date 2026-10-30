import type { Product } from "@/types/products";

export const createProductMap = <T extends  Product>(products: T[]): Map<number, T> => {
    const map = new Map<number, T>();
    products.forEach((product) => map.set(product.id, product));
    return map;
};