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
        // backgroundColor: colors.white,
        backgroundColor: 'red',
        flex: 1,
    }
});

export default styles;