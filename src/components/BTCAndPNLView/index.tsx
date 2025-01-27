import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { formatBTCPrice, formatPnL } from '../../utils/currency';

export interface BTCAndPNLViewProps {
  price: number;
  pnl: number;
}

export const BTCAndPNLView: React.FC<BTCAndPNLViewProps> = ({
  price,
  pnl,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.btc}>BTC{'\n'}{formatBTCPrice(price)}</Text>
      <View style={styles.pnlContainer}>
        <Text style={styles.pnlLabel}>PnL:</Text>
        <Text style={styles.pnlValue}>{formatPnL(pnl)}</Text>
      </View>
    </View>
  );
};
