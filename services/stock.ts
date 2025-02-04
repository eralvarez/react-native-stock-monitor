import STOCK_DATA from "@/constants/dummy_stock_data.json";

export default class StockService {
  public getStocks = async (): Promise<typeof STOCK_DATA> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(STOCK_DATA);
      }, 2000);
    });
  };
}
