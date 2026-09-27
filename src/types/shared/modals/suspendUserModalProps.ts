import type { DashboardUser } from "../../user.types";

export interface SuspendUserModalProps {
  user: DashboardUser;
  isOpen: boolean;
  onClose: () => void;
}
