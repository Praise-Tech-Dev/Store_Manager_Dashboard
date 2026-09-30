import { userApi } from "../api/userApi";
import type {
  ApiUser,
  CreateUserDTO,
  DashboardUser,
  UpdateUserDTO,
  UserRole,
  UserStatus,
} from "../types/user.types";

const ROLES: UserRole[] = ["Admin", "Customer", "Editor", "Viewer"];
const STATUSES: UserStatus[] = ["Active", "Active", "Active", "Suspended"];

const enrichUserData = (
  user: ApiUser,
  overrides?: Partial<DashboardUser>,
): DashboardUser => {
  const defaultAvatar =
    user.id === 2
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
      : user.id === 1
        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250"
        : null;

  return {
    ...user,
    avatar: overrides?.avatar !== undefined ? overrides.avatar : defaultAvatar,
    role: overrides?.role ?? ROLES[user.id % ROLES.length],
    status: overrides?.status ?? STATUSES[user.id % STATUSES.length],
    joinedDate: overrides?.joinedDate ?? "2023-01-15",
    lastLogin:
      overrides?.lastLogin ??
      (overrides?.status === "Invited" ? "Pending Invite" : "2 hours ago"),
  };
};

export const userService = {
  fetchDashboardUsers: async (): Promise<DashboardUser[]> => {
    const apiUsers = await userApi.getAll();

    return apiUsers.map((u) => enrichUserData(u));
  },

  fetchDashboardUserById: async (id: number): Promise<DashboardUser> => {
    const apiUser = await userApi.getById(id);

    return enrichUserData(apiUser);
  },

  createUser: async (payload: CreateUserDTO, existingUsers: DashboardUser[] = []): Promise<DashboardUser> => {
    const today = new Date().toISOString().split("T")[0];

    const createdUser = await userApi.create(payload);

    // Find the highest ID currently loaded in the system
    const maxExistingId = existingUsers.reduce(
      (max, user) =>
        typeof user.id === "number" && user.id > max ? user.id : max,
      0,
    );

    // use backend highest id or maxId
    const assignedId =
    createdUser?.id && createdUser.id > maxExistingId
      ? createdUser.id
      : maxExistingId + 1;

    const baseApiUser: ApiUser = {
      id: assignedId,
      email: payload.email,
      username: payload.username,
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
    };

    return enrichUserData(baseApiUser, {
      role: payload.role ?? "Customer",
      status: payload.status ?? "Invited",
      avatar: payload.avatar ?? null,
      joinedDate: today,
      lastLogin: "Pending Invite",
    });
  },
  
  updateUser: async (
    id: number,
    payload: UpdateUserDTO,
  ): Promise<DashboardUser> => {
    const updatedUser = await userApi.update(id, payload);

    return enrichUserData({
      ...updatedUser,
      id,
    });
  },

  deleteUser: async (id: number): Promise<number> => {
    await userApi.delete(id);

    return id;
  },
};
