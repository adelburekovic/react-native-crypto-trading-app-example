import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { layout } from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  btc: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28
  },
  pnlContainer: {
    paddingTop: layout.padding.extraSmall,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pnlLabel: {
    fontSize: 12,
  },
  pnlValue: {
    fontSize: 12,
    color: colors.green,
    marginLeft: layout.padding.extraSmall,
  },
});