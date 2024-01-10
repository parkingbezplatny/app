import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePasswordModal from "@/components/user/change-password-modal";

// Mock useSession, useUpdatePassword, and useForm hooks
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { email: "test@example.com" } },
  })),
}));
jest.mock("../../lib/hooks/userHooks", () => ({
  useUpdatePassword: jest.fn(() => ({ mutate: jest.fn(), isLoading: false })),
}));
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {}, isSubmitting: false },
    reset: jest.fn(),
  })),
}));

describe("ChangePasswordModal", () => {
  it("renders ChangePasswordModal correctly", async () => {
    // Render the ChangePasswordModal component
    render(<ChangePasswordModal isOpen={true} onClose={jest.fn()} />);

    // Check if the ChangePasswordModal content is rendered correctly
    expect(screen.getByText("Zmień hasło")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Podaj aktualne hasło")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Podaj nowe hasło")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Powtórz nowe hasło")
    ).toBeInTheDocument();

    // Click on the "Zapisz" button
    fireEvent.click(screen.getByText("Zapisz"));

    // Check if the useUpdatePassword hook is called
    await waitFor(() =>
      expect(
        require("../../lib/hooks/userHooks").useUpdatePassword
      ).toHaveBeenCalled()
    );
  });
});
