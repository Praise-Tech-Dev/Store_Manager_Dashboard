import { CREATABLE_SHIPPING_STATUSES, PAYMENT_STATUSES } from "@/constants/orders";
import { getShippingOptions } from "@/utils/orders";
import z from "zod";

const orderItemSchema = z.object({
  productId: z.string().min(1, "Select a product").transform(Number),
  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .transform(Number)
    .pipe(
      z
        .number({ message: "Enter a valid quantity" })
        .int("Whole numbers only")
        .min(1, "Minimum is 1"),
    ),
});

export const createOrderSchema = z
  .object({
    userId: z.string().min(1, "Select a customer"),
    items: z.array(orderItemSchema).min(1, "Add at least one item"),
    paymentStatus: z.enum(PAYMENT_STATUSES),
    shippingStatus: z.enum(CREATABLE_SHIPPING_STATUSES),
  })
  .superRefine(({ paymentStatus, shippingStatus, items }, ctx) => {
    const allowed = getShippingOptions({ paymentStatus });
    if (!allowed.includes(shippingStatus)) {
      ctx.addIssue({
        code: "custom",
        path: ["shippingStatus"],
        message:
          "This shipping status isn't available for the selected payment status",
      });
    }

    // new: no product twice
    const seen = new Set<number>();
    items.forEach((item, index) => {
      if (seen.has(item.productId)) {
        ctx.addIssue({
          code: "custom",
          path: ["items", index, "productId"],
          message: "This product is already added",
        });
      }
      seen.add(item.productId);
    });
  });

export type CreateOrderFormInput = z.input<typeof createOrderSchema>;  
export type CreateOrderFormValues = z.output<typeof createOrderSchema>;