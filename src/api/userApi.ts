import type {
  ApiUser,
  CreateUserDTO,
  UpdateUserDTO,
} from "../types/user.types";
import { apiClient } from "./axiosInstance";

export const userApi = {
  async getAll(): Promise<ApiUser[]> {
    const { data } = await apiClient.get<ApiUser[]>("/users");

    return data;
  },

  async getById(id: number): Promise<ApiUser> {
    const { data } = await apiClient.get<ApiUser>(`/users/${id}`);

    return data;
  },
  async create(payload: CreateUserDTO): Promise<ApiUser> {
    const { data } = await apiClient.post<ApiUser>("/users", payload);

    return data;
  },
  async update(id: number, payload: UpdateUserDTO): Promise<ApiUser> {
    const { data } = await apiClient.put<ApiUser>(`/users/${id}`, payload);

    return data;
  },
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
