import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navbar } from "./Navbar";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => (
      <div {...props}>{children as React.ReactNode}</div>
    ),
  },
  AnimatePresence: ({ children }: Record<string, unknown>) => (
    <>{children as React.ReactNode}</>
  ),
}));

// Mock ReservationDialog
vi.mock("@/features/reservation/components/ReservationDialog", () => ({
  ReservationDialog: ({ children }: Record<string, unknown>) => (
    <div data-testid="reservation-dialog">{children as React.ReactNode}</div>
  ),
}));

describe("Navbar", () => {
  it("renders brand logo", () => {
    render(<Navbar />);
    expect(screen.getByText("Terra Coffee")).toBeInTheDocument();
  });

  it("renders navigation links in desktop view", () => {
    render(<Navbar />);
    expect(screen.getByText("Reserve")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("toggles mobile menu when button is clicked", () => {
    render(<Navbar />);

    // Find mobile menu toggle button (it's the one with the material icon)
    const toggleButton = screen.getByRole("button", { name: /menu/i });

    fireEvent.click(toggleButton);

    // After clicking, the icon should change to 'close'
    expect(screen.getByText("close")).toBeInTheDocument();

    // Mobile links should now be visible
    const mobileLinks = screen.getAllByText("Menu");
    expect(mobileLinks.length).toBeGreaterThan(1); // One for desktop, one for mobile
  });
});
