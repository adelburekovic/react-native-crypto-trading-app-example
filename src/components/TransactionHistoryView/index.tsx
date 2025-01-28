import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { useAppSelector } from '../../store/slices';
import { formatTimeFromTimestamp } from '../../utils/date';
import { formatAmount } from '../../utils/currency';
import { Trade } from '../../types/store';

interface TransactionHistoryViewProps {
    transactions?: Trade[];
}

export const TransactionHistoryView: React.FC<TransactionHistoryViewProps> = ({
    transactions = []
}) => {
    if (!transactions.length) {

        return (
            <View style={styles.noTranasctionsContainer}>
                <Text> No transactions :(</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {transactions.map((transaction) => (
                    <View key={transaction.id} style={styles.row}>
                        <Text style={styles.type}>{transaction.type}</Text>
                        <Text style={styles.amount}>{formatAmount(transaction)}</Text>
                        <Text style={styles.timestamp}>{formatTimeFromTimestamp(transaction.timestamp)}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
