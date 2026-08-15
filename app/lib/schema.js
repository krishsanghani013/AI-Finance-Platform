import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.enum(["CURRENT", "SAVINGS"], {
    required_error: "Account type is required",
  }),
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean().default(false),
});
