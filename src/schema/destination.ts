import { z } from "zod";

export const createDestinationSchema = z.object({
  account_id: z.string().uuid("Invalid account ID"), // Assuming accountId is a UUID
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT"]),
  headers: z.record(z.string(), z.string()).optional(), // Optional field for headers
});

export const updateDestinationSchema = z.object({
  account_id: z.string().uuid("Invalid account ID"),
  url: z.string().url("Invalid URL").optional(),
  method: z.enum(["GET", "POST", "PUT"]).optional(),
  headers: z.record(z.string(), z.string()).optional(), // Optional field for headers
});
