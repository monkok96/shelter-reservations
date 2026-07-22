"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { login, type LoginState } from "@/app/login/actions";
import { inputClass, primaryButtonClass, linkClass } from "@/components/formClasses";

const initialState: LoginState = {};

export function LoginForm() {
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <>
      <h1 className="text-xl font-semibold">{t("login.title")}</h1>
      <p className="mt-2 text-sm text-muted">{t("login.subtitle")}</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">{t("login.email")}</span>
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
          <span className="font-medium">{t("login.password")}</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </label>

        {state.errorKey && (
          <p className="text-sm text-red-600 dark:text-red-400">{t(state.errorKey)}</p>
        )}

        <button type="submit" disabled={isPending} className={primaryButtonClass}>
          {isPending ? t("login.submitting") : t("login.submit")}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        {t("login.noAccount")}{" "}
        <Link href="/register" className={linkClass}>
          {t("login.registerLink")}
        </Link>
      </p>
    </>
  );
}
