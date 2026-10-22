import type { Product } from "../products";
import type { Cart } from "./cart.types";

export interface CalculateCartTotalParams {
  cart: Cart;
  productMap: Map<number, Product>;
}
