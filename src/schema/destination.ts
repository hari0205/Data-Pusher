import { z } from "zod";

const notEmpty = z.string().trim().min(1, { message: "Required" });

export const createDestinationSchema = z.object({
  account_id: z.string().uuid("Invalid account ID").pipe(notEmpty), // Assuming accountId is a UUID
  url: z.string().url("Invalid URL").pipe(notEmpty),
  method: z.enum(["GET", "POST", "PUT"]).pipe(notEmpty),
  headers: z.record(z.string(), z.string()).optional(), // Optional field for headers
});

export const updateDestinationSchema = z.object({
  account_id: z.string().uuid("Invalid account ID").pipe(notEmpty),
  url: z.string().url("Invalid URL").optional().pipe(notEmpty),
  method: z.enum(["GET", "POST", "PUT"]).optional().pipe(notEmpty),
  headers: z.record(z.string(), z.string()).optional(), // Optional field for headers
});
