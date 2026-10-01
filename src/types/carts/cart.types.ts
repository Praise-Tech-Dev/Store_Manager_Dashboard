import type { CartProductItem } from "./cartProductItem";

export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: CartProductItem[];
}