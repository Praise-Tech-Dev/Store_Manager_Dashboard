// src/validationSchema/editUser.schema.ts
import { USER_ROLES, USER_STATUSES } from "@/constants/user.constants";
import { z } from "zod";

export const createEditUserSchema = (
  existingEmails: string[] = [],
  isSelf: boolean = false,
) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(70, "Full name cannot exceed 70 characters")
        .refine(
          (val) => val.split(" ").filter(Boolean).length >= 2,
          "Please provide both a first and last name",
        ),
      email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
          message: "Please enter a valid email address",
        })
        .superRefine((val, ctx) => {
          const lowerVal = val.toLowerCase();
          const hasConflict = existingEmails.some(
            (email) => email.toLowerCase() === lowerVal,
          );
          if (hasConflict) {
            ctx.addIssue({
              code: "custom",
              message: "This email address is already in use by another user",
            });
          }
        }),

      role: z.enum(USER_ROLES, {
        message: "Please select a valid role",
      }),
      status: z.enum(USER_STATUSES, {
        message: "Please select a valid status",
      }),
    })
    .refine((data) => !(isSelf && data.role !== "Admin"), {
      message: "You cannot revoke your own Admin role",
      path: ["role"],
    })
    .refine((data) => !(isSelf && data.status === "Suspended"), {
      message: "You cannot suspend your own account",
      path: ["status"],
    });

export type EditUserSchemaType = z.infer<
  ReturnType<typeof createEditUserSchema>
>;
