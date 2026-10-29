import type { CreateOrderFormInput } from "@/validationSchema/createOrder.schema";
import { DEFAULT_PAYMENT_STATUS } from "./paymentStatus.constants";
import { DEFAULT_SHIPPING_STATUS } from "./shipping.constants";

export const CREATE_ORDER_DEFAULT_VALUES: CreateOrderFormInput = {
  userId: "",
  items: [{ productId: "", quantity: "1" }],
  paymentStatus: DEFAULT_PAYMENT_STATUS,
  shippingStatus: DEFAULT_SHIPPING_STATUS,
};
