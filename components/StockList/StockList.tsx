import { FlatList } from "react-native";

import STOCK_DATA from "@/constants/dummy_stock_data.json";
import StockRow from "@/components/StockRow/StockRow";

interface StockListProps {
  stockData: typeof STOCK_DATA;
}

export default function StockList({ stockData }: StockListProps) {
  return stockData.stocks.map((stock, stockIndex) => (
    <StockRow key={`${stock.symbol}-${stockIndex}`} stock={stock} />
  ));
}

export type { StockListProps };
