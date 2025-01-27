import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

export interface AppButtonProps extends TouchableOpacityProps {
    title: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            {...props}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
