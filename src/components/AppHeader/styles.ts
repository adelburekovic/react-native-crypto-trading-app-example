import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 52,
    },
    balanceContainer: {
        alignItems: 'flex-end'
    },
    label: {
        fontSize: 12,
        color: '#000',
        lineHeight: 16
    },
    balance: {
        fontSize: 12,
        color: '#000',
        lineHeight: 16
    },
    currency: {
        fontWeight: 'bold'
    }
});

export default styles;