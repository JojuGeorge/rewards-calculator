import { render, screen } from "@testing-library/react";
import CustomerTransactionDetails from "../components/CustomerTransactionDetails";

describe("Test Customer Transaction Details component", () => {
  test("Test Customer Transaction Details component properly loaded", () => {
    render(<CustomerTransactionDetails />);
    const element = screen.getByText("Loading...");
    expect(element).toBeInTheDocument();
  });
});
