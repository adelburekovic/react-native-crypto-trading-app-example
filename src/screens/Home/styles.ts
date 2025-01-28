import { StyleSheet } from "react-native";
import { layout } from '../../constants/layout';
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1
    },
    container: {
        paddingHorizontal: layout.padding.extraLarge,
        paddingBottom: layout.padding.huge,
        backgroundColor: colors.white,
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
});

export default styles;