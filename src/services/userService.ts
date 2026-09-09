import { userApi } from "../api/userApi";
import type { ApiUser, CreateUserDTO, DashboardUser, UpdateUserDTO, UserRole, UserStatus } from "../types/user";

const ROLES: UserRole[] = ["Admin", "Customer", "Editor"];
const STATUSES: UserStatus[] = ["Active", "Active", "Active", "Suspended"];

const enrichUserData = (user: ApiUser): DashboardUser => ({
  ...user,
  role: ROLES[user.id % ROLES.length],
  status: STATUSES[user.id % STATUSES.length],
  joinedDate: "2023-01-15",
  lastLogin: "2 hours ago",
});

export const userService = {
    fetchDashboardUsers : async (): Promise<DashboardUser[]> => {
        const apiUsers = await userApi.getAll();

        return apiUsers.map(enrichUserData);
    },

    fetchDashboardUserById: async (id: number): Promise<DashboardUser> => {
        const apiUser = await userApi.getById(id);

        return enrichUserData(apiUser);
    },

    createUser: async (payload: CreateUserDTO): Promise<DashboardUser> => {
        const createdUser = await userApi.create(payload);

        return enrichUserData({
            ...payload,
            id: createdUser.id || Date.now(),
        })
    },

    updateUser: async (id: number, payload: UpdateUserDTO): Promise<DashboardUser> => {
        const updatedUser = await userApi.update(id, payload);

        return enrichUserData({
            ...updatedUser,
            id,
        });
    },

    deleteUser: async (id: number): Promise<number> => {
        await userApi.delete(id);

        return id;
    }
}