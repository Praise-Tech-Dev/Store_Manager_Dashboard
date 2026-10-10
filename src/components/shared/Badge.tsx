import { sizeStyles } from "@/constants/badge.constants";
import type { BadgeProps } from "@/types/shared/badge/badge.types";
import type { BadgeVariant } from "@/types/shared/badge/badgeVariant.types";

export const Badge = ({
  children,
  variant = "default",
  withDot = false,
  size= "md",
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
    success: {
      container: "bg-[#D0E1FB] text-[#54647A]",
      dot: "",
    },
    warning: {
      container: "bg-[#E0E3E5] text-text-gray",
      dot: "",
    },
    error: {
      container: "bg-[#FFDAD6]/80 text-[#93000A]",
      dot: "",
    },
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md
  const selected = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${selectedSize} ${selected.container} ${className}`}
    >
      {withDot && (
        <span className={`h-1.5 w-1.5 rounded-full ${selected.dot}`} />
      )}
      {children}
    </span>
  );
};
