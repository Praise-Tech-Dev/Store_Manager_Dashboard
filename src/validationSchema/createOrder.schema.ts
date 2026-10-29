import { CREATABLE_SHIPPING_STATUSES, PAYMENT_STATUSES } from "@/constants/orders";
import { getShippingOptions } from "@/utils/orders";
import z from "zod";

export const createOrderSchema = z
  .object({
    userId: z.string().min(1, "Select a customer"),
    total: z
      .string()
      .trim()
      .min(1, "Total is required")
      .transform(Number)
      .pipe(
        z
          .number({ message: "Enter a valid amount" })
          .gt(0, "Total must be greater than 0"),
      ),
    paymentStatus: z.enum(PAYMENT_STATUSES),
    shippingStatus: z.enum(CREATABLE_SHIPPING_STATUSES),
  })
  .superRefine(({ paymentStatus, shippingStatus }, ctx) => {
    const allowed = getShippingOptions({ paymentStatus });
    if (!allowed.includes(shippingStatus)) {
      ctx.addIssue({
        code: "custom",
        path: ["shippingStatus"],
        message:
          "This shipping status isn't available for the selected payment status",
      });
    }
  });

export type CreateOrderFormInput = z.input<typeof createOrderSchema>;  
export type CreateOrderFormValues = z.output<typeof createOrderSchema>;