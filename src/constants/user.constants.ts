import type { UserRole, UserStatus } from "@/types/user.types";

export const USER_ROLES = [
  "Admin",
  "Customer",
  "Editor",
  "Viewer",
] as const satisfies readonly [UserRole, ...UserRole[]];

export const USER_STATUSES = [
  "Active",
  "Suspended",
  "Invited",
] as const satisfies readonly [UserStatus, ...UserStatus[]];
