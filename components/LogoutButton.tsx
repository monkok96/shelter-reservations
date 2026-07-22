"use client";

import { useTranslations } from "next-intl";
import { logout } from "@/app/logout/actions";

export function LogoutButton() {
  const t = useTranslations();

  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition hover:bg-background"
      >
        {t("nav.logout")}
      </button>
    </form>
  );
}
