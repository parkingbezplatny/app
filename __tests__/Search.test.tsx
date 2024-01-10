import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Search from "../components/search";

// Mock useMapContext and useDebounce hooks
jest.mock("../lib/hooks/useMapContext", () => ({
  useMapContext: jest.fn(() => ({ handleSetSelectedPointOnMap: jest.fn() })),
}));
jest.mock("../lib/hooks/useDebounce", () => jest.fn((value) => value));

// Mock Axios library
jest.mock("axios");

describe("Search", () => {
  it("renders Search correctly", async () => {
    // Mock Axios response
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            geometry: { coordinates: [10.123456, 20.654321] },
            properties: { address: { label: "Test Address" } },
          },
        ],
      },
    });

    // Render the Search component
    render(<Search />);

    // Check if the Search content is rendered correctly
    expect(screen.getByText("Wyszukaj")).toBeInTheDocument();

    // Type in the input field
    fireEvent.change(screen.getByPlaceholderText("Wyszukaj parking..."), {
      target: { value: "Test City" },
    });

    // Wait for debouncing to complete
    await waitFor(() => {});

    // Check if the axios.get function is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith("/api/parkings?city=Test City");

    // Wait for the API call to complete
    await waitFor(() => {});

    // Check if the search results are rendered correctly
    expect(screen.getByText("Test Address")).toBeInTheDocument();
  });

  it("handles error correctly", async () => {
    // Mock Axios error response
    axios.get.mockRejectedValue({
      response: { data: { message: "Error Message" } },
    });

    // Render the Search component
    render(<Search />);

    // Type in the input field
    fireEvent.change(screen.getByPlaceholderText("Wyszukaj parking..."), {
      target: { value: "Test City" },
    });

    // Wait for debouncing to complete
    await waitFor(() => {});

    // Check if the axios.get function is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith("/api/parkings?city=Test City");

    // Wait for the API call to complete
    await waitFor(() => {});

    // Check if the error message is rendered correctly
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
});
