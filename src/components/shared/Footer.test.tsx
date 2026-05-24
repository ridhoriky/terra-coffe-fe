import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders brand name and description", () => {
    render(<Footer />);
    expect(screen.getByText("Terra Coffee")).toBeInTheDocument();
    expect(screen.getAllByText(/Sanctuary in every sip/i)).toHaveLength(2);
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Journal")).toBeInTheDocument();
    expect(screen.getByText("Sustainability")).toBeInTheDocument();
    expect(screen.getByText("Locations")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("displays the current year in copyright", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
