"use client";

import { useTranslations } from "next-intl";
import { logout } from "@/app/logout/actions";

export function LogoutButton() {
  const t = useTranslations();

  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
      >
        {t("nav.logout")}
      </button>
    </form>
  );
}
