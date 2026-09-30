import { EMAIL_REGEX, INTERNATIONAL_PHONE_REGEX, NAME_REGEX } from "@/constants/regex.constants";
import { USER_ROLES, USER_STATUSES } from "@/constants/user.constants";
import z from "zod";


export const createUserSchema = (existingEmails: string[] = []) =>
  z.object({
    firstname: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(35, "First name cannot exceed 35 characters")
      .refine(
        (val) => NAME_REGEX.test(val),
        "First name cannot contain numbers or special characters",
      ),
    lastname: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(35, "Last name cannot exceed 35 characters")
      .refine(
        (val) => NAME_REGEX.test(val),
        "Last name cannot contain numbers or special characters",
      ),
    email: z
      .string()
      .trim()
      .min(1, "Email address is required")
      .refine((val) => EMAIL_REGEX.test(val), {
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

    phone: z
      .string()
      .trim()
      .optional()
      .refine((val) => {
        if (!val) return true; // Optional field
        const digitsOnly = val.replace(/\D/g, "");
        return (
          INTERNATIONAL_PHONE_REGEX.test(val) &&
          digitsOnly.length >= 7 &&
          digitsOnly.length <= 15
        );
      }, "Please enter a valid international phone number (e.g. +234 801 234 5678)"),

    role: z.enum(USER_ROLES, {
      message: "Please select a valid role",
    }),
    status: z.enum(USER_STATUSES, {
      message: "Please select a valid status",
    }),
    avatar: z
      .string()
      .url({ message: "Must be a valid image URL" })
      .or(z.literal(""))
      .optional(),
  });


export type CreateUserSchemaType = z.infer<ReturnType<typeof createUserSchema>>;