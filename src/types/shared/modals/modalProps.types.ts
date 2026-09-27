import type { ComponentType, SVGProps } from "react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  variant?: "default" | "delete" | "suspend";
  title?: string;
  subtitle?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconVariant?: "primary" | "danger";
  children: React.ReactNode;
  bodyClassName?: string;
  footerBg?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger";
  confirmLoading?: boolean;
  confirmFormId?: string;
  confirmIcon?: React.ReactNode;
  onDelete?: () => void;
  deleteText?: string;
  deleteLoading?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showCloseButton?: boolean;
  headerBorder?: string;
  footerBorder?: string;
};