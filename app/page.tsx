import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function HomePage() {
  const t = await getTranslations();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <LanguageSwitcher />
        <LogoutButton />
      </header>

      <div className="mt-16">
        <h1 className="text-xl font-semibold">
          {t("home.greeting", { email: user?.email ?? "" })}
        </h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          {t("home.placeholder")}
        </p>
      </div>
    </main>
  );
}
