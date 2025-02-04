import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  RefreshControl,
  View,
  TextInput,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import QUERY_KEYS from "@/constants/queryKeys";
import { stockService } from "@/services";
import StockList from "@/components/StockList/StockList";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const { data: stockData, isFetching: isStockDataFetching } = useQuery({
    queryKey: [QUERY_KEYS.fetchStocks],
    queryFn: () => stockService.getStocks({ query }),
  });

  useEffect(() => {
    if (query) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchStocks] });
    }
  }, [query]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchStocks] });
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: "white" }}>
      <SafeAreaView>
        <ScrollView
          style={{ padding: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Stock Monitor</ThemedText>
          </ThemedView>

          <View id="controlsContainer">
            <TextInput
              placeholder="Search by name"
              style={styles.input}
              onChangeText={setQuery}
              value={query}
            />
          </View>

          <View>
            {isStockDataFetching || refreshing ? (
              <ThemedText>loading</ThemedText>
            ) : (
              <StockList stockData={stockData!} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
