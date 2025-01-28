import { ScrollView, View, ActivityIndicator, Text, RefreshControl } from "react-native";
import AppChart from "../../components/AppChart";
import AppHeader from "../../components/AppHeader";
import styles from "./styles";
import { AppButton } from "../../components/AppButton";
import React, { useState, useCallback } from "react";
import { TransactionHistoryView } from "../../components/TransactionHistoryView";
import { BTCAndPNLView } from "../../components/BTCAndPNLView";
import { TradeModal } from "../TradeModal";
import { layout } from "../../constants/layout";
import { Spacer } from "../../components/Spacer";
import { useBitcoinData } from "../../hooks/useBitcoinData";
import { RootState } from "../../types/store";
import { useAppSelector } from "../../store/slices";

const HomeScreen = (): React.JSX.Element => {
  const {
    historicalPrices,
    currentPrice,
    loading,
    error,
    refetch
  } = useBitcoinData();
  
  const portfolio = useAppSelector((state: RootState) => state.portfolio);
  const transactions = useAppSelector(state => state.trades.trades);
  
  const formattedBTC = portfolio.balance.btc.toFixed(8);
  const formattedFiat = portfolio.balance.fiat.toFixed(2);
  
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onTradePress = () => {
    setIsTradeModalVisible(true);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Refresh failed', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>{error.message}</Text>
        <AppButton title="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        balance={formattedBTC}
        balanceInFiat={formattedFiat}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Spacer size={layout.padding.extraLarge} />
        <BTCAndPNLView price={currentPrice} pnl={portfolio.pnl} />
        {historicalPrices && <AppChart historicalPrices={historicalPrices} />}
        <AppButton title="Trade" onPress={onTradePress} />
        <Spacer size={layout.padding.extraLarge} />
        <TransactionHistoryView transactions={transactions} />
        <TradeModal
          isVisible={isTradeModalVisible}
          onClose={() => setIsTradeModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;