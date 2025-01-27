import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { layout } from '../../constants/layout';

export const styles = StyleSheet.create({
    container: {
        height: layout.height.button,
        borderRadius: layout.borderRadius.small,
        paddingHorizontal: layout.padding.large,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});