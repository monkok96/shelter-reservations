import { z } from "zod";

// Messages are translation keys (see messages/*.json), resolved in the UI.
export const registerSchema = z.object({
  email: z.email("errors.invalidEmail"),
  password: z.string().min(8, "errors.passwordTooShort"),
  inviteCode: z.string().min(1, "errors.inviteRequired"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("errors.invalidEmail"),
  password: z.string().min(1, "errors.passwordRequired"),
});

export type LoginInput = z.infer<typeof loginSchema>;
