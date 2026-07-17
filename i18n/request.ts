import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isSupported, type Locale } from "./config";

function resolveLocale(cookieLocale: string | undefined, acceptLanguage: string | null): Locale {
  if (isSupported(cookieLocale)) return cookieLocale;

  const preferred = acceptLanguage?.split(",")[0]?.split("-")[0]?.trim();
  if (isSupported(preferred)) return preferred;

  return DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const locale = resolveLocale(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headerStore.get("accept-language"),
  );

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
