import type { DashboardUser } from "@/types/user.types";

export type ActiveModal =
  | { type: "create" }
  | { type: "edit"; user: DashboardUser }
  | { type: "suspend"; user: DashboardUser }
  | { type: "delete"; user: DashboardUser }
  | null;