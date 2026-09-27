import type { DashboardUser } from "../../user.types";

export interface EditUserModalProps {
  user: DashboardUser;
  isOpen: boolean;
  onClose: () => void;
  onRequestDelete: (user: DashboardUser) => void;
  existingEmails: string[];
}
