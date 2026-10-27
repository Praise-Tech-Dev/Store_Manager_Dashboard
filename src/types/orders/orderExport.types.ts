import type { PendingCart } from "../carts/pendingCart.types";
import type { OrderReturn } from "../returns/return.types";
import type { Order } from "./order.types";
import type { OrderTab } from "./orderFilters.types";

export type ExportOrdersParams = {
  tab: OrderTab;
  orders: Order[];
  carts: PendingCart[];
  returns: OrderReturn[]; 
};
