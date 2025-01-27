import { ScrollView, useColorScheme, View } from "react-native";
import AppChart from "../../components/AppChart";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
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

const HomeScreen = (): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';
    const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);

    // TEST DATA
    const testData: LineChartData = {
        labels: ['68700', '68800', '68900', '69000', '69100', '69200'],
        datasets: [
            {
                data: [68700, 68900, 69050, 68800, 69100, 68900],
                color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
                strokeWidth: 2
            }
        ]
    };

    const mockTransactions: Transaction[] = [
        {
            type: 'Buy',
            amount: '+0.0031 BTC',
            price: '-50.23 €',
            timestamp: '12:58:58'
        },
        {
            type: 'Sell',
            amount: '-0.00221 BTC',
            price: '+50 €',
            timestamp: '11:23:58'
        },
        {
            type: 'Buy',
            amount: '+0.00221 BTC',
            price: '-50 €',
            timestamp: '12:58:58'
        },
        {
            type: 'Sell',
            amount: '-0.00221 BTC',
            price: '+50 €',
            timestamp: '11:23:58'
        },
        {
            type: 'Buy',
            amount: '+0.00221 BTC',
            price: '-50 €',
            timestamp: '12:58:58'
        },
        {
            type: 'Sell',
            amount: '-0.00221 BTC',
            price: '+50 €',
            timestamp: '11:23:58'
        },
        {
            type: 'Buy',
            amount: '+0.00221 BTC',
            price: '-50 €',
            timestamp: '12:58:58'
        },
        {
            type: 'Sell',
            amount: '-0.00221 BTC',
            price: '+50 €',
            timestamp: '11:23:58'
        }
    ];

    const onTradePress = () => {
        setIsTradeModalVisible(true);
    };

    return (
        <View
            style={styles.container}>
            <AppHeader
                balance="2580"
                balanceInFiat="1245561" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={true}
            >
                <Spacer size={layout.padding.extraLarge} />
                <BTCAndPNLView price={69820} pnl={12.3} />
                <AppChart data={testData} />
                <Spacer size={layout.padding.extraLarge} />
                <AppButton title={"Trade"} onPress={onTradePress} />
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