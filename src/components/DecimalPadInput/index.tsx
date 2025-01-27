import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import styles from './styles';

type DecimalPadInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  symbol: string;
};

export const DecimalPadInput = ({
  value,
  onChangeText,
  placeholder = '0.00',
  symbol,
}: DecimalPadInputProps) => {
  const formatValue = (val: string) => {
    const cleanValue = val.replace(/[^0-9.]/g, '');
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={formatValue(value)}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType="decimal-pad"
        textAlign="right"
        selectTextOnFocus
        placeholder={placeholder}
      />
      <Text style={styles.symbol}>{symbol}</Text>
    </View>
  );
};