import type { Product } from "../products";
import type { DashboardUser } from "../user.types";
import type { Cart } from "./cart.types";

export interface CalculateCartTotalParams {
  cart: Cart;
  productMap: Map<number, Product>;
}

export interface BuildPendingCartsParams {
  carts: Cart[];
  users: DashboardUser[];
  products: Product[]
}