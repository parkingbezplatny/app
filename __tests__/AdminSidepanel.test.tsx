import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import AdminSidePanel from "@/components/admin-sidepanel";

// Mock next/navigation to provide a mock usePathname
jest.mock("next/navigation");

describe("AdminSidePanel", () => {
  it("renders AdminSidePanel correctly", () => {
    // Mock the usePathname hook to return "/admin" for testing the active state
    usePathname.mockReturnValue("/admin");

    // Render the AdminSidePanel component
    render(<AdminSidePanel />);

    // Check if the AdminSidePanel content is rendered correctly
    expect(screen.getByLabelText("Dashboard")).toBeInTheDocument();
    expect(screen.getByLabelText("Users")).toBeInTheDocument();
    expect(screen.getByLabelText("Parkings")).toBeInTheDocument();

    // Check if the active state is applied to the correct link
    expect(screen.getByLabelText("Dashboard")).toHaveStyle(
      "border-bottom: 2px solid #ED8936"
    );
    expect(screen.getByLabelText("Users")).not.toHaveStyle(
      "border-bottom: 2px solid #ED8936"
    );
    expect(screen.getByLabelText("Parkings")).not.toHaveStyle(
      "border-bottom: 2px solid #ED8936"
    );
  });
});
