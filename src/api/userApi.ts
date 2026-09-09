import type { ApiUser, CreateUserDTO, UpdateUserDTO } from "../types/user";
import { apiClient } from "./axiosInstance";


export const userApi = {
    getAll: async (): Promise<ApiUser []> => {
        const { data } = await apiClient.get<ApiUser []>('/users');

        return data;
    },

    getById: async (id: number): Promise<ApiUser > => {
        const { data } = await apiClient.get<ApiUser>(`/users/${id}`);

        return data;
    },
    create: async (payload: CreateUserDTO): Promise<ApiUser> => {
        const { data } = await apiClient.post<ApiUser>('/users', payload);

        return data;
    },
    update: async (id: number, payload: UpdateUserDTO): Promise<ApiUser> => {
        const { data } = await apiClient.put<ApiUser>(`/users/${id}`, payload);

        return data;
    },
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/users/${id}`)
    },
};