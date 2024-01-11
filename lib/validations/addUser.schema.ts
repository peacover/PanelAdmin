import { Role } from "@prisma/client";
import { z } from "zod";

export const AddUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required")
    .max(20, "Name must be less than 20 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  role: z.enum([Role.ADMIN, Role.SUPERADMIN]),
});

export type TAddUserInput = z.infer<typeof AddUserSchema>;
