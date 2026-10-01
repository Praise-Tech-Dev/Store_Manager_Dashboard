import type { CartProductItem } from "./cartProductItem";

export interface CreateCartDTO {
    userId: number;
    date?: string;
    products: CartProductItem;
}