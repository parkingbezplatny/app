import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "@/components/navbar";

// Mock next-auth/react to provide a mock session
jest.mock("next-auth/react");

describe("Navbar", () => {
  it("renders Navbar correctly", () => {
    // Mock the useSession hook to return a mock session
    require("next-auth/react").useSession.mockReturnValue({
      data: {
        user: {
          username: "testuser",
          isAdmin: true,
        },
      },
    });

    // Render the Navbar component
    render(<Navbar />);

    // Check if the Navbar content is rendered correctly
    expect(screen.getByText("PARKING")).toBeInTheDocument();
    expect(screen.getByText("BEZPŁATNY")).toBeInTheDocument();
  });

  it("handles click event correctly", async () => {
    // Mock the useSession hook to return a mock session
    require("next-auth/react").useSession.mockReturnValue({
      data: {
        user: {
          username: "testuser",
          isAdmin: true,
        },
      },
    });

    // Mock the signOut function
    require("next-auth/react").signOut = jest.fn();

    // Render the Navbar component
    render(<Navbar />);

    // Click on the "Logout" button
    fireEvent.click(screen.getByText("Wyloguj się"));

    // Check if the signOut function is called
    await waitFor(() =>
      expect(require("next-auth/react").signOut).toHaveBeenCalled()
    );
  });
});
