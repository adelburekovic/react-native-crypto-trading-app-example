import { useColorScheme, View } from "react-native";
import AppChart from "../../components/AppChart";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import AppHeader from "../../components/AppHeader";
import styles from "./styles";
import { AppButton } from "../../components/AppButton";
import React from "react";
import { TransactionHistoryView } from "../../components/TransactionHistoryView";
import { Transaction } from "../../types/transaction";
import { BTCAndPNLView } from "../../components/BTCAndPNLView";

const HomeScreen = (): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

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
        // TODO: Handle trade
    };

    return (
        <View
            style={styles.container}>
            <AppHeader
                balance="2580"
                balanceInFiat="1245561" />
            <BTCAndPNLView price={69820} pnl={12.3} />
            <AppChart data={testData} />
            <AppButton title={"Trade"} onPress={onTradePress} />
            <TransactionHistoryView transactions={mockTransactions} />
        </View>
    );
};

export default HomeScreen;