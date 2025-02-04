import { View, ViewProps, Text, StyleSheet } from "react-native";

import type { Stock } from "@/types/stock";
import { formatPrice } from "@/utils/price";

interface StockRowProps extends ViewProps {
  stock: Stock;
}

export default function StockRow({ stock, ...restProps }: StockRowProps) {
  // console.log({ stock });
  return (
    <View {...restProps} style={{ paddingVertical: 8 }}>
      <View
        id="dataContainer"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          // paddingVertical: 8,
        }}
      >
        <Text style={{ fontSize: 20 }}>{stock.name}</Text>
        <Text style={{ fontSize: 16, color: "gray" }}>({stock.symbol})</Text>
      </View>
      <View
        id="analyticsContainer"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          // paddingVertical: 8,
        }}
      >
        <Text style={{ fontSize: 16 }}>Price: {formatPrice(stock.price)}</Text>
        <Text
          style={{
            fontSize: 16,
            color: stock.daily_change < 0 ? "red" : "green",
          }}
        >
          ({stock.daily_change})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
