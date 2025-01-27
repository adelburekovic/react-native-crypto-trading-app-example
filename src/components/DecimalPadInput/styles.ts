import { StyleSheet } from "react-native";
import { layout } from "../../constants/layout";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  container: {
    height: layout.height.textInput,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textBackground,
    borderRadius: layout.borderRadius.small,
    paddingVertical: layout.padding.medium,
    paddingHorizontal: layout.padding.medium,
  },
  input: {
    flex: 1,
    fontSize: layout.fontSize.medium,
    color: colors.black,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  symbol: {
    marginLeft: layout.padding.medium,
    fontSize: layout.fontSize.extraSmall,
    color: colors.lightGreen,
    fontWeight: '700',
  },
});

export default styles;