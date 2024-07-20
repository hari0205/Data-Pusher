import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().email("Invalid email address"),
  account_name: z.string().min(1, "Account name is required"),
  website: z.string().url("Invalid URL").optional(),
});

export const updateAccountSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  account_name: z.string().min(1, "Account name is required").optional(),
  website: z.string().url("Invalid URL").optional(),
});
