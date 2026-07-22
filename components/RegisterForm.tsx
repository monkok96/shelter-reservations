"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { register, type RegisterState } from "@/app/register/actions";
import { inputClass, primaryButtonClass, linkClass } from "@/components/formClasses";

const initialState: RegisterState = {};

export function RegisterForm({ initialCode }: { initialCode?: string }) {
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(register, initialState);
  const hasCodeFromLink = Boolean(initialCode);

  if (state.success) {
    return (
      <>
        <h1 className="text-xl font-semibold">{t("register.successTitle")}</h1>
        <p className="mt-3 text-sm text-muted">{t("register.successBody")}</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-semibold">{t("register.title")}</h1>
      <p className="mt-2 text-sm text-muted">
        {hasCodeFromLink ? t("register.subtitleWithCode") : t("register.subtitleManual")}
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">{t("register.email")}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={state.email ?? ""}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">{t("register.password")}</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            className={inputClass}
          />
        </label>

        {hasCodeFromLink ? (
          <input type="hidden" name="inviteCode" value={initialCode} />
        ) : (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">{t("register.inviteCode")}</span>
            <input
              type="text"
              name="inviteCode"
              required
              defaultValue={state.inviteCode ?? ""}
              className={inputClass}
            />
          </label>
        )}

        {state.errorKey && (
          <p className="text-sm text-red-600 dark:text-red-400">{t(state.errorKey)}</p>
        )}

        <button type="submit" disabled={isPending} className={primaryButtonClass}>
          {isPending ? t("register.submitting") : t("register.submit")}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        {t("register.haveAccount")}{" "}
        <Link href="/login" className={linkClass}>
          {t("register.loginLink")}
        </Link>
      </p>
    </>
  );
}
