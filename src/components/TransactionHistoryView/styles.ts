import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { layout } from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    borderRadius: layout.borderRadius.large,
  },
  scrollContent: {
    padding: layout.padding.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: layout.padding.small,
  },
  type: {
    fontSize: 12,
    color: colors.black,
  },
  amount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
  },
  timestamp: {
    fontSize: 12,
    color: colors.black,
  },
});