import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import plMessages from "@/messages/pl.json";
import { RegisterForm } from "./RegisterForm";

// The real action pulls in server-only modules (next/headers); mock it out.
vi.mock("@/app/register/actions", () => ({
  register: vi.fn(async () => ({})),
}));

// LanguageSwitcher uses the app router, which isn't mounted in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

function renderWithIntl(ui: React.ReactNode, locale: "en" | "pl" = "en") {
  const messages = locale === "en" ? enMessages : plMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("RegisterForm", () => {
  it("shows the invite-code field on the manual form", () => {
    renderWithIntl(<RegisterForm />);
    expect(screen.getByText("Join the walk group")).toBeInTheDocument();
    expect(screen.getByText("Invite code")).toBeInTheDocument();
  });

  it("hides the invite-code field when the code comes from the link", () => {
    renderWithIntl(<RegisterForm initialCode="secret-code" />);
    expect(screen.queryByText("Invite code")).not.toBeInTheDocument();

    const hidden = document.querySelector<HTMLInputElement>('input[name="inviteCode"]');
    expect(hidden).not.toBeNull();
    expect(hidden!.value).toBe("secret-code");
  });

  it("renders Polish copy when the locale is Polish", () => {
    renderWithIntl(<RegisterForm />, "pl");
    expect(screen.getByText("Dołącz do grupy spacerowej")).toBeInTheDocument();
  });
});
