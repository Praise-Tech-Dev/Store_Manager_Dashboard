import { USER_ROLES, USER_STATUSES } from "@/constants/user.constants";
import z from "zod";

export const createUserSchema = (
    existingEmails: string[] = []
) => 
    z
        .object({
            firstname: z
                .string()
                .trim()
                .min(2, "First name must be at least 2 characters")
                .max(35, "First name cannot exceed 35 characters"),
            lastname: z
                .string()
                .trim()
                .min(2, "Last name must be at least 2 characters")
                .max(35, "Last name cannot exceed 35 characters"),
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

            phone: z
                .string()
                .trim()
                .optional()
                .refine(
                    (val) => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val),
                    "Invalid phone number format"
                ),

            role: z.enum(USER_ROLES, {
                message: "Please select a valid role",
            }),
            status: z.enum(USER_STATUSES, {
                message: "Please select a valid status",
            }),
            avatar: z.string().url("Must be a valid image URL").or(z.literal("")).optional(),
  
        });


export type CreateUserSchemaType = z.infer<ReturnType<typeof createUserSchema>>;