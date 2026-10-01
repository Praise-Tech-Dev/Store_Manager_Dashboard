import { cartsApi } from "@/api/carts.api";
import type { Cart } from "@/types/carts/cart.types";
import type { CreateCartDTO } from "@/types/carts/createCartDTO.types";

export const cartService = {
    async fetchAllCarts(): Promise<Cart[]> {
        return await cartsApi.getAll();
    },

    async fetchCartById(id: number): Promise<Cart> {
        return await cartsApi.getById(id);
    },

    async fetchCartsByUserId(userId: number): Promise<Cart[]> {
        return await cartsApi.getUserId(userId);
    },

    async createCart(payload: CreateCartDTO): Promise<Cart> {
        return await cartsApi.create(payload);
    },

    async updateCart(id: number, payload: CreateCartDTO): Promise<Cart> {
        const updated = await cartsApi.update(id, payload);
        return {
          ...updated,
          id,
        };
    },

    async deleteCart(id: number): Promise<Cart> {
        return await cartsApi.delete(id);
    }
}