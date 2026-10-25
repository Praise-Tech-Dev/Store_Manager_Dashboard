import type { PendingCart } from "../carts/pendingCart.types";
import type { OrderReturn } from "../returns/return.types";
import type { SelectOption } from "../shared/select/selectOptions.types";
import type { Order } from "./order.types";

export interface BuildOrdersParams {
  seedOrders: Order[];
  createdOrders: Order[];
  cancelledIds: number[];
}

export interface SortOrdersParams {
  orders: Order[];
}

export interface ParseSelectOptionParams<T extends string> {
  value: string | null;
  options: SelectOption<T>[];
  fallback: T;
}

export interface GetOrderCardValuesParams {
  orders: Order[];
  returns: OrderReturn[];
  pendingCarts: PendingCart[];
}

export interface FormatOrderDateParams {
  date: string;
}