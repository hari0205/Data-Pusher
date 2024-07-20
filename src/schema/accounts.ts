import { z } from "zod";

const notEmpty = z.string().trim().min(1, { message: "Required" });

export const createAccountSchema = z.object({
  email: z.string().email("Invalid email address").pipe(notEmpty),
  account_name: z.string().min(1, "Account name is required").pipe(notEmpty),
  website: z.string().url("Invalid URL").optional().pipe(notEmpty),
});

export const updateAccountSchema = z.object({
  email: z.string().email("Invalid email address").optional().pipe(notEmpty),
  account_name: z
    .string()
    .min(1, "Account name is required")
    .optional()
    .pipe(notEmpty),
  website: z.string().url("Invalid URL").optional().pipe(notEmpty),
});
