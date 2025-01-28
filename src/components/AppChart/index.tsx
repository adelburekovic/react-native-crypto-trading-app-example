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
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    fillShadowGradient: 'red',
    fillShadowGradientFrom: 'red',
    fillShadowGradientTo: colors.white,
    fillShadowGradientOpacity: 1,
    propsForDots: {
      r: '0',
      strokeWidth: '0',
    },
    style: {
      borderRadius: layout.borderRadius.extraLarge
    }
  },
  bezier = false
}) => {
  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      bezier={bezier}
      withInnerLines={false}
      withDots={false}
      withShadow={true}
      withVerticalLabels={false}
      withVerticalLines={false}
      withHorizontalLines={false}
      segments={5}
    />
  );
};

export default AppChart;