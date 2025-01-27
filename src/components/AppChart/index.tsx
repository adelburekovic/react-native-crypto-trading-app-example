import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { ViewStyle } from 'react-native';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { layout } from '../../constants/layout';
import { colors } from '../../theme/colors';

interface AppChartProps {
  data: LineChartData;
  width?: number;
  height?: number;
  chartConfig?: AbstractChartConfig;
  bezier?: boolean;
  style?: ViewStyle;
}

const AppChart: React.FC<AppChartProps> = ({
  data,
  width = Dimensions.get('window').width - layout.padding.extraLarge * 2,
  height = layout.height.chart,
  chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(144, 218, 217, ${opacity})`, // Light teal for the line
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradient: 'rgba(144, 218, 217, 0.2)', // Fill color
    fillShadowGradientFrom: 'rgba(144, 218, 217, 0.2)', // Very light teal fill
    fillShadowGradientTo: colors.white,
    fillShadowGradientOpacity: 0.3,
    propsForDots: {
      r: '0',
      strokeWidth: '0',
    },
    style: {
      borderRadius: 16
    }
  },
  bezier = false,
  style = {
    padding: 0,
    borderRadius: 16,
    paddingRight: 64
  }
}) => {
  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      bezier={bezier}
      style={style}
      withInnerLines={false}
      withDots={false}
      withShadow={true}
      verticalLabelRotation={0}
      withVerticalLabels={false}
      withVerticalLines={false}
      withHorizontalLines={false}
    />
  );
};

export default AppChart;