import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { THEME_COOKIE, isTheme, DEFAULT_THEME } from "@/lib/theme";

export default async function HomePage() {
  const t = await getTranslations();
  const cookieStore = await cookies();
  const themeRaw = cookieStore.get(THEME_COOKIE)?.value;
  const theme = isTheme(themeRaw) ? themeRaw : DEFAULT_THEME;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-tight text-accent">
            Shelter Walks
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle current={theme} />
            <LanguageSwitcher />
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-6 py-12">
        <h1 className="text-2xl font-semibold">
          {t("home.greeting", { email: user?.email ?? "" })}
        </h1>
        <p className="mt-3 text-sm text-muted">{t("home.placeholder")}</p>
      </main>
    </div>
  );
}
