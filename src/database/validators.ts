import type { IssueData } from "zod";

import { subYears } from "date-fns";
import { z } from "zod";

import type { Gender } from "@/database/enums";

import { genderEnum } from "@/database/enums";

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

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const OnboardingSchema = z.object({
  birthday: z
    .date()
    .max(
      subYears(new Date(), 16),
      "You have to be at least 16 years old to use our service!",
    ),
  gender: z
    .string()
    .refine(arg => genderEnum.enumValues.includes(arg as Gender)),
  bio: z.string().optional(),
});

export type OnboardingSchemaType = z.infer<typeof OnboardingSchema>;

export const horoscopeDaily = z.object({
  data: z.object({
    horoscope_data: z.string().min(10),
    date: z.string().min(5),
  }),
  status: z.number().positive(),
  success: z.boolean(),
});

export type THoroscopeDaily = z.infer<typeof horoscopeDaily>;

export const horoscopeWeekly = z.object({
  data: z.object({
    horoscope_data: z.string().min(10),
    week: z.string().min(5),
  }),
  status: z.number().positive(),
  success: z.boolean(),
});

export type THoroscopeWeekly = z.infer<typeof horoscopeWeekly>;

export const horoscopeMonthly = z.object({
  data: z.object({
    horoscope_data: z.string().min(10),
    month: z.string().min(5),
    challenging_days: z.string().min(5),
    standout_days: z.string().min(5),
  }),
  status: z.number().positive(),
  success: z.boolean(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  subject: z.string().min(10),
  message: z.string().min(150),
});

export type TContactFormSchema = z.infer<typeof ContactFormSchema>;
