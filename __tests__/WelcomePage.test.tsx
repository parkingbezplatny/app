import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getSession, useSession } from "next-auth/react";
import WelcomePage from "@/app/page";

// Mock next-auth/react to provide a mock session
jest.mock("next-auth/react");

// Mock next/navigation to provide a mock router
jest.mock("next/navigation");

describe("WelcomePage", () => {
  it("redirects to dashboard if user is authenticated", async () => {
    // Mock a session indicating that the user is authenticated
    useSession.mockReturnValue({ data: { user: { name: "John Doe" } } });

    // Mock the useRouter push function
    const pushMock = jest.fn();
    require("next/navigation").useRouter.mockReturnValue({ push: pushMock });

    // Render the WelcomePage component
    render(<WelcomePage />);

    // Wait for useEffect to be called
    await waitFor(() => {});

    // Expect the router push function to be called with the correct route
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("renders the WelcomePage component correctly", () => {
    // Mock a session indicating that the user is not authenticated
    useSession.mockReturnValue({ data: null });

    // Render the WelcomePage component
    render(<WelcomePage />);

    // Check if the WelcomePage content is rendered correctly
    expect(
      screen.getByText(/witaj w naszym serwisie z darmowymi parkingami/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cieszymy się, że jesteś tutaj/i)
    ).toBeInTheDocument();

    // Simulate button clicks
    userEvent.click(screen.getByText(/zaloguj się/i));
    userEvent.click(screen.getByText(/zarejestruj się/i));

    // Check if buttons are clicked correctly
    expect(screen.getByText(/zaloguj się/i)).toBeInTheDocument();
    expect(screen.getByText(/zarejestruj się/i)).toBeInTheDocument();
  });
});
