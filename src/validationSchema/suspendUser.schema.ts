import z from "zod";

// suspend user schema 
export const suspendUserSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(5, "Reason must be at least 5 characters long")
    .max(300, "Reason cannot exceed 300 characters"),
    

  notifyUser: z.boolean(),
});



export type SuspendUserSchemaType = z.infer<typeof suspendUserSchema>