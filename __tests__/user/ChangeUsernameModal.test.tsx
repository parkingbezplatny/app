import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangeUsernameModal from "@/components/user/change-username-modal";

// Mock useSession and useUpdateUsername hooks
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { email: "test@example.com", username: "testuser" } },
  })),
}));
jest.mock("../../lib/hooks/userHooks", () => ({
  useUpdateUsername: jest.fn(() => ({ mutate: jest.fn(), isLoading: false })),
}));
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {}, isSubmitting: false },
    reset: jest.fn(),
  })),
}));

describe("ChangeUsernameModal", () => {
  it("renders ChangeUsernameModal correctly", async () => {
    // Render the ChangeUsernameModal component
    render(<ChangeUsernameModal isOpen={true} onClose={jest.fn()} />);

    // Check if the ChangeUsernameModal content is displayed correctly
    expect(screen.getByText("Zmień nazwę użytkownika")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Nazwa użytkownika")
    ).toBeInTheDocument();

    // Click on the "Zapisz" button
    fireEvent.click(screen.getByText("Zapisz"));

    // Check if the useUpdateUsername hook is called
    await waitFor(() =>
      expect(
        require("../../lib/hooks/userHooks").useUpdateUsername
      ).toHaveBeenCalled()
    );
  });
});
