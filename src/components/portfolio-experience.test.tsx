import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { fallbackContent } from "@/content/fallback";

import { PortfolioExperience } from "./portfolio-experience";

describe("PortfolioExperience", () => {
  it("renders the supplied portfolio structure", () => {
    render(<PortfolioExperience content={fallbackContent} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /myo myat thiha/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Judged, then hired.")).toBeInTheDocument();
    expect(screen.getByText("What I build with.")).toBeInTheDocument();
  });

  it("filters projects and opens a case study", async () => {
    const user = userEvent.setup();
    render(<PortfolioExperience content={fallbackContent} />);

    await user.click(screen.getByRole("button", { name: "Web3" }));
    const workSection = screen.getByText("Six systems,").closest("section");
    expect(workSection).not.toBeNull();
    expect(within(workSection!).getByText("VeriLoan")).toBeInTheDocument();
    expect(within(workSection!).queryByText("NutriShield")).not.toBeInTheDocument();

    await user.click(within(workSection!).getByRole("button", { name: /veriloan/i }));
    expect(
      screen.getByRole("heading", { level: 1, name: "VeriLoan" }),
    ).toBeInTheDocument();
    expect(screen.getByText("The problem")).toBeInTheDocument();
  });

  it("opens an accessible contact dialog", async () => {
    const user = userEvent.setup();
    render(<PortfolioExperience content={fallbackContent} />);

    await user.click(screen.getByRole("button", { name: "Email me" }));
    expect(
      screen.getByRole("dialog", { name: "Start a conversation." }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
