import { formatPrice } from "../price";

describe("formatPrice", () => {
  it("should format positive numbers correctly", () => {
    expect(formatPrice(100)).toBe("$100");
    expect(formatPrice(999.99)).toBe("$999.99");
  });

  it("should format zero correctly", () => {
    expect(formatPrice(0)).toBe("$0");
  });

  it("should format negative numbers correctly", () => {
    expect(formatPrice(-50)).toBe("$-50");
    expect(formatPrice(-0.99)).toBe("$-0.99");
  });

  it("should format decimal numbers correctly", () => {
    expect(formatPrice(12.5)).toBe("$12.5");
    expect(formatPrice(0.1)).toBe("$0.1");
  });
});
