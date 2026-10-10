import type { BadgeSize } from "./badgeSize.types";
import type { BadgeVariant } from "./badgeVariant.types";


export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  withDot?: boolean;
  size?: BadgeSize;
  className?: string;
};