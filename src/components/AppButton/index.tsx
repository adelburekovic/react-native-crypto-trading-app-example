import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface AppButtonProps extends TouchableOpacityProps {
    title: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    containerStyle,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            activeOpacity={0.8}
            {...props}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
