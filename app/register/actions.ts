"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyInviteCode } from "@/lib/domain/inviteCode";
import { registerSchema } from "@/lib/validation/auth";

export type RegisterState = {
  errorKey?: string;
  success?: boolean;
  email?: string;
  inviteCode?: string;
};

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const rawEmail = formData.get("email")?.toString() ?? "";
  const rawInviteCode = formData.get("inviteCode")?.toString() ?? "";
  const filled = { email: rawEmail, inviteCode: rawInviteCode };

  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    inviteCode: formData.get("inviteCode"),
  });

  if (!parsed.success) {
    return { errorKey: parsed.error.issues[0].message, ...filled };
  }

  const { email, password, inviteCode } = parsed.data;

  if (!verifyInviteCode(inviteCode)) {
    return { errorKey: "errors.invalidInvite", ...filled };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { errorKey: "errors.signupFailed", ...filled };
  }

  return { success: true };
}
