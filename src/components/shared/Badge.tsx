import React from "react";

export type BadgeVariant =
  | "active"
  | "suspended"
  | "invited"
  | "admin"
  | "customer"
  | "default";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  withDot?: boolean;
  className?: string;
};

export const Badge = ({
  children,
  variant = "default",
  withDot = false,
  className = "",
}: BadgeProps) => {
  const variantStyles: Record<
    BadgeVariant,
    { container: string; dot: string }
  > = {
    active: {
      container: "bg-[#ECFDF3] text-[#027A48]",
      dot: "bg-[#12B76A]",
    },
    suspended: {
      container: "bg-[#FEF3F2] text-[#B42318]",
      dot: "bg-[#F04438]",
    },
    invited: {
      container: "bg-[#F2F4F7] text-[#344054]",
      dot: "bg-[#667085]",
    },
    admin: {
      container: "bg-[#F2F4F7] text-[#344054]",
      dot: "",
    },
    customer: {
      container: "bg-[#F8F9FA] text-[#475467] border border-gray-200/60",
      dot: "",
    },
    default: {
      container: "bg-gray-100 text-gray-700",
      dot: "bg-gray-500",
    },
  };

  const selected = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${selected.container} ${className}`}
    >
      {withDot && (
        <span className={`h-1.5 w-1.5 rounded-full ${selected.dot}`} />
      )}
      {children}
    </span>
  );
};
