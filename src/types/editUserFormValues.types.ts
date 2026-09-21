import type { UserRole, UserStatus } from "./user.types";

export interface EditUserFormValues {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
