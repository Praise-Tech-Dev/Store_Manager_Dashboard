const ORDER_ID_OFFSET = 7300;

export const formatOrderId = (cartId: number): string =>
  `#ORD-${cartId + ORDER_ID_OFFSET}`;
