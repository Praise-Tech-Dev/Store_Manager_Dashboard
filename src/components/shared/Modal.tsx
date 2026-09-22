import React, { useEffect, type ComponentType, type SVGProps } from "react";
import { Trash2, X } from "lucide-react";
import Button from "./Button";

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
};

export const Modal = ({
  isOpen,
  onClose,
  variant = "default",
  title,
  subtitle,
  icon: Icon,
  iconVariant,
  children,
  bodyClassName = "",
  footerBg = "bg-white",
  onConfirm,
  confirmText,
  cancelText = "Cancel",
  confirmVariant = "primary",
  confirmLoading = false,
  confirmFormId,
  confirmIcon,
  onDelete,
  deleteText = "Delete User",
  deleteLoading = false,
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
    sm: "max-w-[440px]",
    md: "max-w-[480px]",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const effectiveIconVariant =
    iconVariant || (variant === "default" ? "primary" : "danger");

  const badgeStyles = {
    primary: "bg-[#4F46E5]/10 text-primary",
    danger: "bg-[#FFDAD6] text-[#93000A]",
  };

  // const isAlertModal = variant === "delete" || variant === "suspend";
  const hasFooter = Boolean(confirmText || cancelText || onConfirm || onDelete);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all ${maxWidths[maxWidth]} ${className}`}
      >
        {/* Top red accent line for delete modal */}
        {variant === "delete" && <div className="h-1.5 w-full bg-rose-500" />}

        {/* Delete Modal Layout */}
        {variant === "delete" ? (
          <div className="flex items-start gap-4 p-6 pb-2">
            {Icon && (
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${badgeStyles[effectiveIconVariant]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            )}

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  {title && (
                    <h3 className="text-xl font-bold tracking-normal text-text-default align-middle leading-7">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="mt-0.5 text-xs text-slate-500text-text-gray leading-4 tracking-normal">
                      {subtitle}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Body flows directly under title */}
              <div className={`text-left ${bodyClassName}`}>{children}</div>
            </div>
          </div>
        ) : (
          // Modal for Edit
          <>
            {(title || Icon) && (
              <div className="flex items-start justify-between gap-4 border-b border-[#E0E3E5] px-6 py-5">
                <div className="flex items-center gap-3.5">
                  {Icon && (
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${badgeStyles[effectiveIconVariant]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    {title && (
                      <h3 className="text-xl font-bold tracking-normal text-text-default align-middle leading-7">
                        {title}
                      </h3>
                    )}
                    {subtitle && (
                      <p className="mt-0.5 text-xs text-slate-500text-text-gray leading-4 tracking-normal">
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
            )}
            {/* modal body  */}
            <div className={`flex-1 ${bodyClassName}`}>{children}</div>
          </>
        )}

        {/* Modal Actions Footer */}
        {hasFooter && (
          <div
            className={`flex flex-col sm:flex-row items-center gap-3 px-6 py-4 border-t border-[#E0E3E5] ${footerBg} ${
              onDelete ? "justify-between" : "justify-end"
            }`}
          >
            {onDelete && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onDelete}
                disabled={confirmLoading || deleteLoading}
                loading={deleteLoading}
                iconLeft={<Trash2 className="h-3.5 w-3.5 text-danger" />}
                className="w-full sm:w-auto border-slate-200 text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-danger"
              >
                {deleteText}
              </Button>
            )}

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {cancelText && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  disabled={confirmLoading || deleteLoading}
                  className="w-full sm:w-auto border-slate-200 text-slate-700"
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
                  className="w-full sm:w-auto"
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
