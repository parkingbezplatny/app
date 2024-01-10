import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MapTooltip from "@/components/map-tooltip";

// Mock next-auth/react to provide a mock session
jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { favoriteParkings: [] } } }),
}));

describe("MapTooltip", () => {
  const parkingId = 1;
  const parkingLabel = "Test Parking";
  const parkingCoordinates = [10.123456, 20.654321];

  it("renders MapTooltip correctly", () => {
    const addParkingToFavorite = jest.fn();
    const removeParkingFromFavorite = jest.fn();

    // Render the MapTooltip component
    render(
      <MapTooltip
        parkingId={parkingId}
        parkingLabel={parkingLabel}
        parkingCoordinates={parkingCoordinates}
        addParkingToFavorite={addParkingToFavorite}
        removeParkingFromFavorite={removeParkingFromFavorite}
        session={{ user: { favoriteParkings: [] } }}
      />
    );

    // Check if the MapTooltip content is rendered correctly
    expect(screen.getByText(parkingLabel)).toBeInTheDocument();
    expect(screen.getByText(parkingCoordinates.join(" "))).toBeInTheDocument();
  });
});
