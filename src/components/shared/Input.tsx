import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  // Accepts a Lucide icon component, <img />, or a direct string URL/path
  iconLeft?: React.ReactNode | string;
  iconRight?: React.ReactNode | string;
  isPassword?: boolean;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      type = "text",
      error,
      helperText,
      iconLeft,
      iconRight,
      isPassword = false,
      disabled = false,
      required = false,
      className = "",
      containerClassName = "",
      id,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name;
    const computedType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    // Helper to render either an <img> tag (if string URL) or raw ReactNode/SVG
    const renderIcon = (icon: React.ReactNode | string) => {
      if (!icon) return null;
      if (typeof icon === "string") {
        return (
          <img
            src={icon}
            alt=""
            className="h-4 w-4 object-contain opacity-60"
          />
        );
      }
      return icon;
    };

    return (
      <div className={`flex w-full flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-gray-700 tracking-tight"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Leading Icon (Lucide or Custom SVG) */}
          {iconLeft && (
            <span className="pointer-events-none absolute left-3.5 flex items-center justify-center text-gray-400">
              {renderIcon(iconLeft)}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={computedType}
            disabled={disabled}
            className={`
              w-full rounded-xl border bg-[#F3F4F6]/80 text-sm text-gray-900 placeholder-gray-400
              transition-all duration-200 outline-none
              py-3.5
              ${iconLeft ? "pl-11" : "pl-4"}
              ${iconRight || isPassword ? "pr-11" : "pr-4"}
              ${
                error
                  ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-transparent hover:border-gray-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              }
              ${disabled ? "cursor-not-allowed bg-gray-100 text-gray-400 opacity-60" : ""}
              ${className}
            `}
            {...rest}
          />

          {/* Password Toggle or Trailing Icon */}
          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          ) : (
            iconRight && (
              <span className="pointer-events-none absolute right-3.5 flex items-center justify-center text-gray-400">
                {renderIcon(iconRight)}
              </span>
            )
          )}
        </div>

        {error ? (
          <p className="text-xs font-medium text-red-500">{error}</p>
        ) : (
          helperText && <p className="text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
