import type { Cart } from "@/types/carts";
import { apiClient } from "./axiosInstance";
import type { CreateCartDTO } from "@/types/carts/createCartDTO.types";
import type { UpdateCartDTO } from "@/types/carts/updateCartDTO.types";

export const cartsApi = {
    async getAll(): Promise<Cart[]> {
        const { data } = await apiClient.get<Cart []>("/carts");

        return data;
    },

    async getById(id: number): Promise<Cart> {
        const { data } = await apiClient.get<Cart>(`/carts/${id}`);

        return data;
    },

    async getUserId(userId: number): Promise<Cart []> {
        const { data } = await apiClient.get<Cart []>(`/carts/user/${userId}`);

        return data;
    },

    async create(newCart: CreateCartDTO): Promise<Cart> {
        const { data } = await apiClient.post<Cart>("/carts", newCart);
        return data;
    },

    async update(id: number, payload: UpdateCartDTO): Promise<Cart> {
        const { data } = await apiClient.put<Cart>(`/carts/${id}`, payload);
        return data;
    },

    async delete(id: number): Promise<Cart> {
        const { data } = await apiClient.delete<Cart>(`/carts/${id}`);
        return data;
    }
}