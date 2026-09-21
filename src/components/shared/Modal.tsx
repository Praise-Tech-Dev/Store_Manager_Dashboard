import React, { useEffect, type ComponentType, type SVGProps } from "react";
import { Trash2, X } from "lucide-react";
import Button from "./Button";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconVariant?: "primary" | "danger";
  children: React.ReactNode;
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
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  iconVariant = "primary",
  children,
  onConfirm,
  confirmText,
  cancelText = "Cancel",
  confirmVariant = "primary",
  confirmLoading = false,
  confirmFormId,
  confirmIcon,
  onDelete,
  deleteText,
  deleteLoading,
  maxWidth = "md",
  className = "",
  showCloseButton = true,
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

  const badgeStyles = {
    primary: "bg-[#4F46E51A] text-primary",
    danger: "bg-[#FFDAD6] text-[#93000A]",
  };

  const hasFooter = Boolean(confirmText || cancelText || onConfirm)

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center p-4">
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
        className={`relative z-10 w-full ${maxWidths[maxWidth]} rounded-2xl bg-white  shadow-xl transition-all overflow-hidden ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-3 md:px-6 md:py-5 ">
          <div className="flex items-center gap-3.5">
            {Icon && (
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${badgeStyles[iconVariant]}`}
              >
                <Icon className="h-full w-full " />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-xl font-bold tracking-normal text-text-default align-middle leading-7">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-text-gray leading-4 tracking-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5 text-text-gray" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="">{children}</div>

        {/* Modal Actions Footer */}
        {hasFooter && (
          <div
            className={`bg-white flex items-center px-7 pt-4 pb-7 ${
              onDelete ? "justify-between" : "justify-end"
            }`}
          >
            {/* Left Action (Delete) */}
            {onDelete && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onDelete}
                disabled={confirmLoading || deleteLoading}
                loading={deleteLoading}
                iconLeft={<Trash2 className="h-3.5 w-3.5 text-danger" />}
                className="cursor-pointer border-slate-200 text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-danger"
              >
                {deleteText}
              </Button>
            )}

            {/* Right Actions (Cancel & Confirm) */}
            <div className="flex items-center gap-2.5">
              {cancelText && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  disabled={confirmLoading || deleteLoading}
                  className="cursor-pointer border-slate-200 text-slate-700"
                >
                  {cancelText}
                </Button>
              )}

              {confirmText && (
                <Button
                  type={confirmFormId ? "submit" : "button"}
                  form={confirmFormId}
                  variant={confirmVariant}
                  size="sm"
                  onClick={!confirmFormId ? onConfirm : undefined}
                  loading={confirmLoading}
                  disabled={deleteLoading}
                  iconRight={confirmIcon}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
