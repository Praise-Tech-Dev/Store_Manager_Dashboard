import type { ApiUser, DashboardUser } from "@/types/user.types";

/**
 * Returns an avatar image URL if the user has one,
 * or generates a consistent avatar placeholder using their name/seed.
 */
export const getUserAvatarUrl = (
  name: string,
  customSrc?: string | null,
): string => {
  if (customSrc) return customSrc;

  // Uses a free, consistent avatar service based on the person's name
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
};

/**
 * Safely formats full name from an object or string
 */
export const formatFullName = (
  firstname?: string,
  lastname?: string,
): string => {
  if (!firstname && !lastname) return "Unknown User";
  return `${firstname ?? ""} ${lastname ?? ""}`.trim();
};

export const getCustomerName = (user?: Pick<ApiUser, "name">): string =>
  user ? `${user.name.firstname} ${user.name.lastname}` : "Guest Customer";

export const createUserMap = (users: DashboardUser[]): Map<number, DashboardUser> => {
    const map = new Map<number, DashboardUser>();
    users.forEach((user) => map.set(user.id, user));
    return map;
};