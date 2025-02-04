import { Image, StyleSheet, Platform, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import STOCK_DATA from "@/constants/dummy_stock_data.json";
import QUERY_KEYS from "@/constants/queryKeys";

export default function HomeScreen() {
  const stockQuery = useQuery({
    queryKey: [QUERY_KEYS.fetchStocks],
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stock Monitor</ThemedText>
      </ThemedView>

      <FlatList
        data={STOCK_DATA.stocks}
        renderItem={({ item: stock }) => (
          <ThemedText key={stock.symbol}>{stock.name}</ThemedText>
        )}
      />
    </ParallaxScrollView>
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
