import type { CardTone, OrderCardId, OrderCardTheme, OrderDateRange } from "@/types/orders";

import CartIcon from "@/assets/icons/orders/cart-icon.svg?react";
import CartWatermark from "@/assets/icons/orders/cart-watermark.svg?react";
import RevenueIcon from "@/assets/icons/orders/revenue-icon.svg?react";
import RevenueWatermark from "@/assets/icons/orders/revenue-watermark.svg?react";
import AbandonedCartIcon from "@/assets/icons/orders/abandoned-cart.svg?react";
import AbandonedCartWatermark from "@/assets/icons/orders/abandoned-cart-watermark.svg?react";
import ReturnsIcon from "@/assets/icons/orders/pending-returns.svg?react";
import ReturnsWatermark from "@/assets/icons/orders/returns-watermark.svg?react";

export const ORDER_CARD_THEMES: Record<OrderCardId, OrderCardTheme> = {
  totalOrders: {
    Icon: CartIcon,
    iconWrapperClass: "bg-[#D0E1FB] text-[#54647A]",
    Watermark: CartWatermark,
    watermarkClass: "text-[#505F76]",
  },
  revenue: {
    Icon: RevenueIcon,
    iconWrapperClass: "bg-[#FFDBCC] text-[#7B2F00]",
    Watermark: RevenueWatermark,
    watermarkClass: "text-[#7E3000]",
  },
  abandonedCarts: {
    Icon: AbandonedCartIcon,
    iconWrapperClass: "bg-[#FFDBCC] text-[#7B2F00]",
    Watermark: AbandonedCartWatermark,
    watermarkClass: "text-[#BA1A1A]",
  },
  pendingReturns: {
    Icon: ReturnsIcon,
    iconWrapperClass: "bg-[#E0E3E5] text-[#191C1E]",
    Watermark: ReturnsWatermark,
    watermarkClass: "text-[#777587]",
  },
};

export const CARD_TONE_STYLES: Record<CardTone, string> = {
  positive: "text-emerald-600",
  negative: "text-rose-600",
  neutral: "text-text-gray",
};

export const ORDER_DATE_SHORT_LABELS: Record<OrderDateRange, string> = {
  all: "All time",
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
};

