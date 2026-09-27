import type { DashboardUser } from "../../user.types";

export interface DeleteUserModalProps {
  user: DashboardUser;
  isOpen: boolean;
  onClose: () => void;
}
