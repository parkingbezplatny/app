import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SidePanel from "@/components/sidepanel";

// Mock useFavorite and useMapContext hooks
jest.mock("../lib/hooks/useFavorite", () => ({
  useFavorite: jest.fn(() => ({
    data: {
      data: [
        {
          id: 1,
          parking: {
            geometry: { coordinates: [10.123456, 20.654321] },
            properties: { address: { label: "Test Address" } },
          },
        },
      ],
    },
    status: "success",
  })),
}));
jest.mock("../lib/hooks/useMapContext", () => ({
  useMapContext: jest.fn(() => ({ handleSetSelectedPointOnMap: jest.fn() })),
}));

describe("SidePanel", () => {
  it("renders SidePanel correctly", async () => {
    // Render the SidePanel component
    render(<SidePanel />);

    // Check if the SidePanel content is rendered correctly
    expect(screen.getByTestId("ulubione")).toBeInTheDocument();
    expect(screen.getByTestId("wyszukaj")).toBeInTheDocument();

    // Click on the "Wyszukaj" tab
    fireEvent.click(screen.getByText("Wyszukaj"));

    // Check if the Search component is rendered
    expect(
      screen.getByPlaceholderText("Wyszukaj parking...")
    ).toBeInTheDocument();
  });

  it("handles click event correctly", async () => {
    // Render the SidePanel component
    render(<SidePanel />);

    // Click on the "Ulubione" tab
    fireEvent.click(screen.getByTestId("ulubione"));

    // Check if the useFavorite hook is called
    await waitFor(() =>
      expect(require("../lib/hooks/useFavorite").useFavorite).toHaveBeenCalled()
    );

    // Check if the favorite parking is rendered
    expect(screen.getByText("Test Address")).toBeInTheDocument();
  });
});
