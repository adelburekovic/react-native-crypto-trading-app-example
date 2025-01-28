import { ScrollView, useColorScheme, View, ActivityIndicator, Text } from "react-native";
import AppChart from "../../components/AppChart";
import AppHeader from "../../components/AppHeader";
import styles from "./styles";
import { AppButton } from "../../components/AppButton";
import React, { useState } from "react";
import { TransactionHistoryView } from "../../components/TransactionHistoryView";
import { Transaction } from "../../types/transaction";
import { BTCAndPNLView } from "../../components/BTCAndPNLView";
import { TradeModal } from "../TradeModal";
import { layout } from "../../constants/layout";
import { Spacer } from "../../components/Spacer";
import { useBitcoinData } from "../../hooks/useBitcoinData";

const HomeScreen = (): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';
    const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);

    const {
        chartData,
        currentPrice,
        formattedPrice,
        loading,
        error,
        refetch
    } = useBitcoinData();

    const mockTransactions: Transaction[] = [
        {
            type: 'Buy',
            amount: '+0.0031 BTC',
            price: '-50.23 €',
            timestamp: '12:58:58'
        },
    ];

    const onTradePress = () => {
        setIsTradeModalVisible(true);
    };

    if (loading) {
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
                balance="2580"
                balanceInFiat={formattedPrice}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={true}
            >
                <Spacer size={layout.padding.extraLarge} />
                <BTCAndPNLView price={currentPrice} pnl={12.3} />
                {chartData && <AppChart data={chartData} />}
                <AppButton title="Trade" onPress={onTradePress} />
                <Spacer size={layout.padding.extraLarge} />
                <TransactionHistoryView transactions={mockTransactions} />
                <TradeModal
                    isVisible={isTradeModalVisible}
                    onClose={() => setIsTradeModalVisible(false)}
                    onBuy={(amount) => console.log('Buy:', amount)}
                    onSell={(amount) => console.log('Sell:', amount)}
                />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;