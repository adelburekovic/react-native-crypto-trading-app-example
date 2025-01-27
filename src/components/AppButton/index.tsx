import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

export interface AppButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
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
