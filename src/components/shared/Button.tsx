import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed tracking-[0px]";

  const sizes = {
    xs: "py-2 px-4 text-sm rounded-lg leading-[20px] ",
    sm: "py-2 px-4 text-xs rounded-lg leading-[24px] ",
    md: "px-4 py-3 text-base rounded-lg leading-[24px] ",
    lg: "px-6 py-4 text-sm rounded-xl leading-[20px] ",
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",

    secondary: "bg-surface-light text-text-default  hover:bg-slate-100",

    outline:
      "bg-none border border-border-subtle/30 text-text-default hover:bg-slate-50",

    danger: "bg-danger text-white hover:opacity-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </button>
  );
}
