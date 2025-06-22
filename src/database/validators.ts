import type { IssueData } from "zod";

import { z } from "zod";

const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/\d/, {
    message: "Password must contain at least one number",
  })
  .regex(/[^A-Z0-9]/i, {
    message: "Password must contain at least one special character",
  });

export const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(30, "Name must be at most 30 characters."),
    email: z.string().email(),
    password,
    confirmPassword: password,
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.confirmPassword) {
      ctx.addIssue({
        path: ["password", "confirmPassword"],
        message: "Password and ConfirmPassword must be the same",
      } as IssueData);
    }
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
