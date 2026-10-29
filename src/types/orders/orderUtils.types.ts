import type { CreatableShippingStatus } from "@/constants/orders";
import type { PendingCart } from "../carts/pendingCart.types";
import type { OrderReturn } from "../returns/return.types";
import type { SelectOption } from "../shared/select/selectOptions.types";
import type { Order, PaymentStatus } from "./order.types";
import type { OrderCardValues } from "./orderCard.types";
import type { CreateOrderFormValues } from "@/validationSchema/createOrder.schema";
import type { ApiUser } from "../user.types";

export interface BuildOrdersParams {
  seedOrders: Order[];
  createdOrders: Order[];
  cancelledIds: number[];
}

export interface BuildOrderCardsParams {
  kpis: OrderCardValues;
  periodLabel: string;
  cartsLoading: boolean;
  cartsError: boolean;
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

export interface GetShippingOptionsParams {
  paymentStatus: PaymentStatus;
}

export interface ResolveShippingStatusParams {
  paymentStatus: PaymentStatus;
  shippingStatus: CreatableShippingStatus;
}

export interface BuildNewOrderInputParams {
  values: CreateOrderFormValues;
  user: Pick<ApiUser, "id" | "name">;
}