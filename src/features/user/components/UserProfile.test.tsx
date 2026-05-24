import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserProfile } from "./UserProfile";
import { useProfile } from "../hooks/useProfile";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => (
      <div {...props}>{children as React.ReactNode}</div>
    ),
  },
}));

// Mock useProfile hook
vi.mock("../hooks/useProfile", () => ({
  useProfile: vi.fn(),
}));

const mockProfile = {
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  isVerified: true,
  authProvider: "email",
  avatarUrl: null,
};

describe("UserProfile", () => {
  it("renders profile information when loaded", () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: mockProfile as never,
      isLoading: false,
      isUpdating: false,
      error: null,
      success: false,
      updateProfile: vi.fn(),
      refetch: vi.fn(),
    });

    render(<UserProfile />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText(/verified/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: null,
      isLoading: true,
      isUpdating: false,
      error: null,
      success: false,
      updateProfile: vi.fn(),
      refetch: vi.fn(),
    });

    render(<UserProfile />);
    // UserProfile shows Loader2 when loading
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("displays success message when update is successful", () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: mockProfile as never,
      isLoading: false,
      isUpdating: false,
      error: null,
      success: true,
      updateProfile: vi.fn(),
      refetch: vi.fn(),
    });

    render(<UserProfile />);
    expect(
      screen.getByText(/profile updated successfully/i),
    ).toBeInTheDocument();
  });
});
