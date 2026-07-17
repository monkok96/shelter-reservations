"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { register, type RegisterState } from "@/app/register/actions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const initialState: RegisterState = {};

const inputClass =
  "rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-100";

export function RegisterForm({ initialCode }: { initialCode?: string }) {
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(register, initialState);
  const hasCodeFromLink = Boolean(initialCode);

  if (state.success) {
    return (
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-xl font-semibold">{t("register.successTitle")}</h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          {t("register.successBody")}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <div className="mb-8 flex justify-end">
        <LanguageSwitcher />
      </div>

      <h1 className="text-xl font-semibold">{t("register.title")}</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {hasCodeFromLink
          ? t("register.subtitleWithCode")
          : t("register.subtitleManual")}
      </p>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">{t("register.email")}</span>
          <input type="email" name="email" required autoComplete="email" className={inputClass} />
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
            <input type="text" name="inviteCode" required className={inputClass} />
          </label>
        )}

        {state.errorKey && (
          <p className="text-sm text-red-600 dark:text-red-400">{t(state.errorKey)}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {isPending ? t("register.submitting") : t("register.submit")}
        </button>
      </form>
    </main>
  );
}
