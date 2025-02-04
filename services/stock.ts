import STOCK_DATA from "@/constants/dummy_stock_data.json";

export default class StockService {
  public getStocks = async ({
    query,
  }: {
    query?: string;
  }): Promise<typeof STOCK_DATA> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let filteredData = STOCK_DATA.stocks;

        if (query) {
          filteredData = STOCK_DATA.stocks.filter((stock) =>
            stock.name.toLowerCase().includes(query),
          );
        }
        console.log({ query });
        resolve({ stocks: filteredData });
      }, 2000);
    });
  };
}
