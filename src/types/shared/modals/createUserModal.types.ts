export interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingEmails: string[];
}
