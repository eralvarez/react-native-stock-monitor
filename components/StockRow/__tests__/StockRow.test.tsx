import React from "react";
import { render } from "@testing-library/react-native";
import StockRow from "@/components/StockRow/StockRow";
import type { Stock } from "@/types/stock";

describe("StockRow Component", () => {
  const mockStock: Stock = {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 150,
    daily_change: -2.5,
  };

  it("should render stock name and symbol correctly", () => {
    const { getByText } = render(<StockRow stock={mockStock} />);

    expect(getByText("Apple Inc.")).toBeTruthy();
    expect(getByText("(AAPL)")).toBeTruthy();
  });

  it("should display the formatted price correctly", () => {
    const { getByText } = render(<StockRow stock={mockStock} />);

    expect(getByText(`Price: $150`)).toBeTruthy();
  });

  it("should apply negative change style when daily_change is negative", () => {
    const { getByText } = render(<StockRow stock={mockStock} />);
    const dailyChangeText = getByText("(-2.5)");

    expect(dailyChangeText).toBeTruthy();
    expect(dailyChangeText.props.style).toContainEqual(
      expect.objectContaining({ color: "red" }),
    );
  });

  it("should apply positive change style when daily_change is positive", () => {
    const mockStockPositive: Stock = { ...mockStock, daily_change: 3.0 };
    const { getByText } = render(<StockRow stock={mockStockPositive} />);
    const dailyChangeText = getByText("(3)");

    expect(dailyChangeText).toBeTruthy();
    expect(dailyChangeText.props.style).toContainEqual(
      expect.objectContaining({ color: "green" }),
    );
  });

  it("should pass additional ViewProps correctly", () => {
    const { getByTestId } = render(
      <StockRow
        stock={mockStock}
        testID="stockRowComponent"
        accessibilityLabel="Stock Row"
      />,
    );

    expect(getByTestId("stockRowComponent")).toBeTruthy();
  });
});
