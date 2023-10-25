import React from "react";
import { render, screen } from "@testing-library/react";
import WelcomePage from "@/app/page";

describe("WelcomePage", () => {
  it("renders the welcome text", () => {
    render(<WelcomePage />);
    const welcomeText = screen.getByText(
      "Witaj w naszym serwisie z darmowymi parkingami!"
    );
    expect(welcomeText).toBeInTheDocument();
  });

  it("renders login and register buttons", () => {
    render(<WelcomePage />);
    const loginButton = screen.getByText("Zaloguj się");
    const registerButton = screen.getByText("Zarejestruj się");
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
