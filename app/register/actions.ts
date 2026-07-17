"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyInviteCode } from "@/lib/domain/inviteCode";
import { registerSchema } from "@/lib/validation/auth";

export type RegisterState = {
  errorKey?: string;
  success?: boolean;
};

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    inviteCode: formData.get("inviteCode"),
  });

  if (!parsed.success) {
    return { errorKey: parsed.error.issues[0].message };
  }

  const { email, password, inviteCode } = parsed.data;

  if (!verifyInviteCode(inviteCode)) {
    return { errorKey: "errors.invalidInvite" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { errorKey: "errors.signupFailed" };
  }

  return { success: true };
}
