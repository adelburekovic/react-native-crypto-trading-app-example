import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Pressable,
    Alert,
} from 'react-native';
import styles from './styles';
import { DecimalPadInput } from '../../components/DecimalPadInput';
import { AppButton } from '../../components/AppButton';
import CloseIcon from '../../assets/images/CloseIcon';
import { useAppDispatch, useAppSelector } from '../../store/slices';
import { useBitcoinData } from '../../hooks/useBitcoinData';
import { executeTrade } from '../../store/slices/thunks';

interface TradeModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
    isVisible,
    onClose
}) => {
    const [eurAmount, setEurAmount] = useState('');
    const [btcAmount, setBtcAmount] = useState('');
    const balance = useAppSelector(state => state.portfolio.balance);
    const dispatch = useAppDispatch();
    const { currentPrice } = useBitcoinData();

    useEffect(() => {
        if (!isVisible) {
            setEurAmount(String(balance.fiat));
            setBtcAmount(String(balance.btc));
        }
    }, [isVisible]);

    const convertEurToBtc = (eur: string): string => {
        if (!currentPrice || !eur) return '';
        const btc = parseFloat(eur) / currentPrice;
        return btc.toFixed(8);
    };

    const convertBtcToEur = (btc: string): string => {
        if (!currentPrice || !btc) return '';
        const eur = parseFloat(btc) * currentPrice;
        return eur.toFixed(2);
    };

    const handleEurChange = (value: string) => {
        setEurAmount(value);
        setBtcAmount(convertEurToBtc(value));
    };

    const handleBtcChange = (value: string) => {
        setBtcAmount(value);
        setEurAmount(convertBtcToEur(value));
    };

    const showInsufficientFundsAlert = (currency: string) => {
        Alert.alert(
            'Insufficient Funds',
            `You don't have enough ${currency} balance for this transaction.`,
            [{ text: 'OK', onPress: () => { } }]
        );
    };

    const onBuyPress = () => {
        const amount = parseFloat(eurAmount);
        if (!amount || !currentPrice) return;

        if (amount > balance.fiat) {
            showInsufficientFundsAlert('EUR');
            return;
        }

        dispatch(executeTrade({
            type: 'Buy',
            amount,
            price: currentPrice
        }));
        onClose();
    };

    const onSellPress = () => {
        const amount = parseFloat(btcAmount);
        if (!amount || !currentPrice) return;

        if (amount > balance.btc) {
            showInsufficientFundsAlert('BTC');
            return;
        }

        dispatch(executeTrade({
            type: 'Sell',
            amount,
            price: currentPrice
        }));
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.modalContainer}>
                    <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
                        <Pressable
                            style={styles.closeButtonContainer}
                            onPress={onClose}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                            <CloseIcon />
                        </Pressable>
                        <View style={styles.inputViewsContainer}>
                            <DecimalPadInput
                                autoFocus
                                value={eurAmount}
                                onChangeText={handleEurChange}
                                symbol="EUR"
                                placeholder="0.00"
                            />

                            <DecimalPadInput
                                value={btcAmount}
                                onChangeText={handleBtcChange}
                                symbol="BTC"
                                placeholder="0.00000000"
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <AppButton
                                title="Buy"
                                containerStyle={{ flexGrow: 1 }}
                                onPress={onBuyPress}
                                disabled={!eurAmount || parseFloat(eurAmount) <= 0}
                            />
                            <AppButton
                                title="Sell"
                                containerStyle={{ flexGrow: 1 }}
                                onPress={onSellPress}
                                disabled={!btcAmount || parseFloat(btcAmount) <= 0}
                            />
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};