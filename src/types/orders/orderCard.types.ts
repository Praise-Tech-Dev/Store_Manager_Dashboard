import type { ComponentType, SVGProps } from "react";

export type CardTone = "positive" | "negative" | "neutral";

export type OrderCardId =
  | "totalOrders"
  | "revenue"
  | "abandonedCarts"
  | "pendingReturns";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface OrderCardTheme {
  Icon: SvgIcon;
  iconWrapperClass: string;
  Watermark: SvgIcon;
  watermarkClass: string;
}

export interface OrderCardData {
  id: OrderCardId;
  label: string;
  value: string | number;
  subtext: string;
  tone: CardTone;
  // icon: ReactNode;
  // iconClassName: string;
  loading?: boolean;
}

export type OrderCardProps = OrderCardData;

export interface OrderCardValues {
  totalOrders: number;
  revenue: number;
  abandonedCarts: number;
  pendingReturnsCount: number;
  pendingReturnsAmount: number;
}