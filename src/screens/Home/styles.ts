import { StyleSheet } from "react-native";
import { layout } from '../../constants/layout';
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: layout.padding.extraLarge,
        paddingBottom: layout.padding.huge,
        backgroundColor: colors.white,
        flex: 1
    }
});

export default styles;