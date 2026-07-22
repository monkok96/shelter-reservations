"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { THEME_COOKIE, THEMES, type Theme } from "@/lib/theme";

function Icon({ theme }: { theme: Theme }) {
  if (theme === "light") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function ThemeToggle({ current }: { current: Theme }) {
  const router = useRouter();
  const t = useTranslations("theme");
  const [isPending, startTransition] = useTransition();

  function choose(next: Theme) {
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000`;
    document.documentElement.classList.toggle("dark", next === "dark");
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex gap-1">
      {THEMES.map((theme) => (
        <button
          key={theme}
          type="button"
          aria-label={t(theme)}
          title={t(theme)}
          onClick={() => choose(theme)}
          disabled={isPending || current === theme}
          className={`rounded p-1.5 transition ${
            current === theme ? "text-accent" : "text-muted hover:text-foreground"
          }`}
        >
          <Icon theme={theme} />
        </button>
      ))}
    </div>
  );
}
