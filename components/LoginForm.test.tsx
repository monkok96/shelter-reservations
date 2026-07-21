import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import plMessages from "@/messages/pl.json";
import { LoginForm } from "./LoginForm";

vi.mock("@/app/login/actions", () => ({
  login: vi.fn(async () => ({})),
}));

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

describe("LoginForm", () => {
  it("renders email + password fields and a link to register", () => {
    renderWithIntl(<LoginForm />);
    expect(screen.getByText("Log in", { selector: "h1" })).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create account" })).toHaveAttribute(
      "href",
      "/register",
    );
  });

  it("renders Polish copy when the locale is Polish", () => {
    renderWithIntl(<LoginForm />, "pl");
    expect(screen.getByText("Zaloguj się", { selector: "h1" })).toBeInTheDocument();
  });
});
