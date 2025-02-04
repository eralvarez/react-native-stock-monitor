import StockService from "@/services/stock";
import STOCK_DATA from "@/constants/dummy_stock_data.json";

jest.useFakeTimers();

describe("StockService", () => {
  let stockService: StockService;

  beforeEach(() => {
    stockService = new StockService();
  });

  it("should return all stocks when no query is provided", async () => {
    const promise = stockService.getStocks({});

    jest.runAllTimers();

    await expect(promise).resolves.toEqual({ stocks: STOCK_DATA.stocks });
  });

  it("should return filtered stocks when a query is provided", async () => {
    const query = STOCK_DATA.stocks[0].name.substring(0, 3).toLowerCase();
    const expectedFilteredStocks = STOCK_DATA.stocks.filter((stock) =>
      stock.name.toLowerCase().includes(query),
    );

    const promise = stockService.getStocks({ query });

    jest.runAllTimers();

    await expect(promise).resolves.toEqual({ stocks: expectedFilteredStocks });
  });

  it("should return an empty array when no stocks match the query", async () => {
    const promise = stockService.getStocks({ query: "nonexistentstock" });

    jest.runAllTimers();

    await expect(promise).resolves.toEqual({ stocks: [] });
  });
});
