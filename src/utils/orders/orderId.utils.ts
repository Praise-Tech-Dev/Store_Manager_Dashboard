import type { FormatOrderDateParams } from "@/types/orders";

const ORDER_ID_OFFSET = 7300;

export const formatOrderId = (cartId: number): string =>
  `#ORD-${cartId + ORDER_ID_OFFSET}`;

export const formatOrderDate = ({ date }: FormatOrderDateParams) => {
  const value = new Date(date);
  return {
    day: value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: value.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
};