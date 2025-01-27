import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  style?: ViewStyle;
}

export const Spacer: React.FC<SpacerProps> = ({
  size,
  horizontal = false,
  style
}) => {
  const spacerStyle = horizontal 
    ? { width: size, height: '100%' as const}
    : { height: size, width: '100%' as const};

  return <View style={[spacerStyle, style]} />;
};