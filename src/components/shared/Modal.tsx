import React, { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger";
  confirmLoading?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  onConfirm,
  confirmText,
  cancelText = "Cancel",
  confirmVariant = "primary",
  confirmLoading = false,
  maxWidth = "md",
  className = "",
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay Scrim Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${maxWidths[maxWidth]} rounded-2xl bg-white p-6 shadow-xl transition-all sm:p-7 ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {icon && <div className="shrink-0">{icon}</div>}
            <div>
              {title && (
                <h3 className="text-lg font-bold tracking-tight text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">{children}</div>

        {/* Modal Actions Footer */}
        {(onConfirm || cancelText) && (
          <div className="mt-6 flex items-center justify-end gap-3">
            {cancelText && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
                disabled={confirmLoading}
              >
                {cancelText}
              </Button>
            )}

            {onConfirm && confirmText && (
              <Button
                type="button"
                variant={confirmVariant}
                size="md"
                onClick={onConfirm}
                loading={confirmLoading}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
