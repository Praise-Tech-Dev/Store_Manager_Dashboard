import React from "react";
import Button from "./Button";

export type CardProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const Card = ({
  title,
  subtitle,
  icon,
  actionLabel,
  onAction,
  children,
  footer,
  className = "",
  ...rest
}: CardProps) => {
  const hasHeader = Boolean(title || subtitle || icon || actionLabel);

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 ${className}`}
      {...rest}
    >
      {hasHeader && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {icon && (
              <div className="flex shrink-0 items-center justify-center">
                {icon}
              </div>
            )}
            <div>
              {typeof title === "string" ? (
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  {title}
                </h3>
              ) : (
                title
              )}
              {typeof subtitle === "string" ? (
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
              ) : (
                subtitle
              )}
            </div>
          </div>

          {actionLabel && (
            <Button variant="outline" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-6 border-t border-gray-100 pt-4">{footer}</div>
      )}
    </div>
  );
};
