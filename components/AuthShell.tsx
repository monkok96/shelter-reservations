import { cookies } from "next/headers";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { THEME_COOKIE, isTheme, DEFAULT_THEME } from "@/lib/theme";

export async function AuthShell({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(THEME_COOKIE)?.value;
  const theme = isTheme(raw) ? raw : DEFAULT_THEME;

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-accent">
          Shelter Walks
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle current={theme} />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        {children}
      </div>
    </main>
  );
}
