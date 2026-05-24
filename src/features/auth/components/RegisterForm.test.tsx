import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RegisterForm } from "./RegisterForm";
import { useRegister } from "../hooks/useRegister";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: never) => <div {...props}>{children}</div>,
  },
}));

// Mock useRegister hook
vi.mock("../hooks/useRegister", () => ({
  useRegister: vi.fn(),
}));

const mockOnSubmit = vi.fn();
const mockForm = {
  register: vi.fn(),
  formState: { errors: {} },
};

describe("RegisterForm", () => {
  it("renders register form elements", () => {
    vi.mocked(useRegister).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: null,
    });

    render(<RegisterForm />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("calls onSubmit when create account button is clicked", () => {
    vi.mocked(useRegister).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: null,
    });

    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("displays error message when error prop is provided", () => {
    vi.mocked(useRegister).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: "Email already exists",
    });

    render(<RegisterForm />);
    expect(screen.getByText("Email already exists")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    vi.mocked(useRegister).mockReturnValue({
      form: mockForm as never,
      onSubmit: mockOnSubmit,
      isLoading: true,
      error: null,
    });

    render(<RegisterForm />);
    expect(screen.getByText(/creating account/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /creating account/i }),
    ).toBeDisabled();
  });
});
