import { render, screen } from "@testing-library/react";
import AdminCard from "@/components/admin-card";

describe("AdminCard", () => {
  it("renders AdminCard component correctly", () => {
    const headerText = "Test Header";
    const bodyText = "Test Body";
    const footerText = "Test Footer";

    // Render the AdminCard component
    render(
      <AdminCard
        header={headerText}
        body={<div>{bodyText}</div>}
        footer={<div>{footerText}</div>}
      />
    );

    // Check if the AdminCard content is rendered correctly
    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getByText(bodyText)).toBeInTheDocument();
    expect(screen.getByText(footerText)).toBeInTheDocument();
  });

  it("renders AdminCard component without footer", () => {
    const headerText = "Test Header";
    const bodyText = "Test Body";

    // Render the AdminCard component without footer
    render(<AdminCard header={headerText} body={<div>{bodyText}</div>} />);

    // Check if the AdminCard content is rendered correctly without footer
    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getByText(bodyText)).toBeInTheDocument();
    expect(screen.queryByText("Test Footer")).toBeNull();
  });
});
