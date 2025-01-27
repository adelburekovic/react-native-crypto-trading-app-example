import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Transaction } from '../../types/transaction';
import { styles } from './styles';

interface BuySellHistoryProps {
    transactions: Transaction[];
}

export const TransactionHistoryView: React.FC<BuySellHistoryProps> = ({
    transactions,
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {transactions.map((transaction, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.type}>{transaction.type}</Text>
                        <Text style={styles.amount}>{`${transaction.amount} / ${transaction.price}`}</Text>
                        <Text style={styles.timestamp}>{transaction.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>

    );
};
