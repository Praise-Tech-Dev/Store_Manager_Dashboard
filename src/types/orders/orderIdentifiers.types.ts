import type { Order } from "./order.types";

export interface GetNextOrderIdentifiersParams {
  orders: Order[];
}

export interface ParseOrderNumberParams {
  orderNumber: string;
}

export interface FormatOrderNumberParams {
  value: number;
}
