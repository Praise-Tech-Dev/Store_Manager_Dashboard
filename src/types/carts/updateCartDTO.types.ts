import type { CartProductItem } from "./cartProductItem";

export interface UpdateCartDTO {
    userId?: number;
    date?: string;
    products?: CartProductItem;
}