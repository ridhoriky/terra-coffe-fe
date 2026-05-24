import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "./LoginForm";
import { useLogin } from "../hooks/useLogin";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => (
      <div {...props}>{children as React.ReactNode}</div>
    ),
  },
}));

// Mock useLogin hook
vi.mock("../hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));

const mockOnSubmit = vi.fn();
const mockForm = {
  register: vi.fn(),
  formState: { errors: {} },
};

describe("LoginForm", () => {
  it("renders login form elements", () => {
    vi.mocked(useLogin).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: null,
    });

    render(<LoginForm />);
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("calls onSubmit when sign in button is clicked", () => {
    vi.mocked(useLogin).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: null,
    });

    render(<LoginForm />);
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("displays error message when error prop is provided", () => {
    vi.mocked(useLogin).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: "Invalid credentials",
    });

    render(<LoginForm />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    vi.mocked(useLogin).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: true,
      error: null,
    });

    render(<LoginForm />);
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });
});
