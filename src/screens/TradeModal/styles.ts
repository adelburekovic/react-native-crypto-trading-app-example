import { Platform, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { layout } from "../../constants/layout";

const styles = StyleSheet.create({
  closeButtonContainer: {
    alignSelf: 'flex-end'
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: layout.width.modal,
    maxWidth: layout.width.maxModal,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.large,
    paddingHorizontal: layout.padding.extraLarge,
    paddingBottom: layout.padding.extraLarge,
    paddingTop: layout.padding.medium
  },
  inputViewsContainer: {
    gap: layout.padding.medium,
    paddingBottom: layout.padding.extraLarge,
    paddingTop: layout.padding.medium
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: layout.padding.extraLarge,
    width: '100%',
  }
});

export default styles;