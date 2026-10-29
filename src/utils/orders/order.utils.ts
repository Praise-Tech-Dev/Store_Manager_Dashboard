import { DEFAULT_SHIPPING_STATUS, SHIPPING_OPTIONS_BY_PAYMENT, type CreatableShippingStatus } from "@/constants/orders";
import type {
  BuildNewOrderInputParams,
  FormatOrderDateParams,
  GetShippingOptionsParams,
  NewOrderInput,
  ResolveShippingStatusParams,
} from "@/types/orders";
import { getCustomerName } from "../user.utils";
import type { SelectOption } from "@/types/shared/select/selectOptions.types";

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

export const formatOrderDateTime = ({
  date,
}: FormatOrderDateParams): string => {
  const { day, time } = formatOrderDate({ date });
  return `${day} ${time}`;
};

export function buildNewOrderInput({
  values,
  user,
}: BuildNewOrderInputParams): NewOrderInput {
  return {
    userId: user.id,
    customerName: getCustomerName(user),
    date: new Date().toISOString(),
    total: values.total,
    paymentStatus: values.paymentStatus,
    shippingStatus: values.shippingStatus,
  };
}

export function getShippingOptions({
  paymentStatus,
}: GetShippingOptionsParams) {
  return SHIPPING_OPTIONS_BY_PAYMENT[paymentStatus];
}

export function getShippingSelectOptions({
  paymentStatus,
}: GetShippingOptionsParams): SelectOption<CreatableShippingStatus>[] {
  return getShippingOptions({ paymentStatus }).map((status) => ({
    value: status,
    label: status,
  }));
}


export function resolveShippingStatus({
  paymentStatus,
  shippingStatus,
}: ResolveShippingStatusParams): CreatableShippingStatus {
  const allowed = getShippingOptions({ paymentStatus });
  return allowed.includes(shippingStatus)
    ? shippingStatus
    : DEFAULT_SHIPPING_STATUS;
}

