import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Pressable,
    TextInput,
} from 'react-native';
import styles from './styles';
import { DecimalPadInput } from '../../components/DecimalPadInput';
import { AppButton } from '../../components/AppButton';
import CloseIcon from '../../assets/images/CloseIcon';

interface TradeModalProps {
    isVisible: boolean;
    onBuy: (amount: string) => void;
    onSell: (amount: string) => void;
    onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
    isVisible,
    onClose,
    onBuy,
    onSell,
}) => {
    const [eurAmount, setEurAmount] = useState('');
    const [btcAmount, setBtcAmount] = useState('');

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
                                value={eurAmount}
                                onChangeText={setEurAmount}
                                symbol="EUR"
                                placeholder="0.00"
                            />

                            <DecimalPadInput
                                value={btcAmount}
                                onChangeText={setBtcAmount}
                                symbol="BTC"
                                placeholder="0.00"
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <AppButton
                                title="Buy"
                                onPress={() => onBuy(eurAmount)}
                            />
                            <AppButton
                                title="Sell"
                                onPress={() => onSell(eurAmount)}
                            />
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};