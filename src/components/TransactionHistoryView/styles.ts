import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { layout } from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    padding: layout.padding.medium,
    backgroundColor: colors.gray,
    borderRadius: layout.borderRadius.large,
    flex: 1
  },
  noTranasctionsContainer: {
    alignItems: 'center',
    padding: layout.padding.medium,
    backgroundColor: colors.gray,
    borderRadius: layout.borderRadius.large,
    flex: 1
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