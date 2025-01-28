import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import styles from './styles';
import { formatEUR } from '../../utils/currency';

type DecimalPadInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    symbol: string;
} & Omit<TextInputProps, 'keyboardType'>; // This allows all TextInput props except keyboardType

export const DecimalPadInput = ({
    value,
    onChangeText,
    placeholder = '0.00',
    symbol,
    ...textFieldProps
}: DecimalPadInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                keyboardType="decimal-pad"
                textAlign="right"
                selectTextOnFocus
                placeholder={placeholder}
                {...textFieldProps}
            />
            <Text style={styles.symbol}>{symbol}</Text>
        </View>
    );
};