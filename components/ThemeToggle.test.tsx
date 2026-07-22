import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import { ThemeToggle } from "./ThemeToggle";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

function renderToggle(current: "light" | "dark") {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <ThemeToggle current={current} />
    </NextIntlClientProvider>,
  );
}

describe("ThemeToggle", () => {
  it("renders a light and a dark option", () => {
    renderToggle("light");
    expect(screen.getByLabelText("Light")).toBeInTheDocument();
    expect(screen.getByLabelText("Dark")).toBeInTheDocument();
  });

  it("disables the currently active theme", () => {
    renderToggle("light");
    expect(screen.getByLabelText("Light")).toBeDisabled();
    expect(screen.getByLabelText("Dark")).not.toBeDisabled();
  });
});
