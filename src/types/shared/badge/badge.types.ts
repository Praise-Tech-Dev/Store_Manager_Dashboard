import type { BadgeVariant } from "./badgeVariant.types";


export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  withDot?: boolean;
  className?: string;
};