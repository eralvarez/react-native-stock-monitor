import { View, ViewProps, Text, StyleSheet } from "react-native";

import type { Stock } from "@/types/stock";
import { formatPrice } from "@/utils/price";

interface StockRowProps extends ViewProps {
  stock: Stock;
}

export default function StockRow({ stock, ...restProps }: StockRowProps) {
  return (
    <View {...restProps} style={styles.root}>
      <View id="dataContainer" style={styles.dataContainer}>
        <Text style={styles.nameLabel}>{stock.name}</Text>
        <Text style={styles.symbolLabeL}>({stock.symbol})</Text>
      </View>
      <View id="analyticsContainer" style={styles.analyticsContainer}>
        <Text style={styles.priceLabeL}>Price: {formatPrice(stock.price)}</Text>
        <Text
          style={[
            styles.dailyChange,
            stock.daily_change < 0
              ? styles.dailyChangeNegative
              : styles.dailyChangePositive,
          ]}
        >
          ({stock.daily_change})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  analyticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nameLabel: {
    fontSize: 20,
  },
  symbolLabeL: {
    fontSize: 16,
    color: "gray",
  },
  priceLabeL: {
    fontSize: 16,
  },
  dailyChange: {
    fontSize: 16,
  },
  dailyChangePositive: {
    color: "green",
  },
  dailyChangeNegative: {
    color: "red",
  },
});
