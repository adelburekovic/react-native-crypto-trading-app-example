import React, { useMemo } from 'react';
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
  bezier = false
}) => {

  const yAxisLabels = useMemo(() => {
    if (!data.datasets?.[0]?.data) return [];

    const values = data.datasets[0].data;
    const lastValue = values[values.length - 1];
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const topRange = maxValue - lastValue;
    const bottomRange = lastValue - minValue;
    const maxRange = Math.max(topRange, bottomRange);

    return [
      maxValue,
      lastValue + (maxRange * 2 / 3),
      lastValue + (maxRange * 1 / 3),
      lastValue,
      lastValue - (maxRange * 1 / 3),
      lastValue - (maxRange * 2 / 3),
    ].map(val => val.toFixed(0));
  }, [data]);

  const formatYLabel = (value: string): string => {
    if (!yAxisLabels.length) return value;
    const numValue = parseFloat(value);
    const closest = yAxisLabels.reduce((prev, curr) => {
      return Math.abs(parseFloat(curr) - numValue) <
        Math.abs(parseFloat(prev) - numValue) ? curr : prev;
    });
    return closest;
  };

  const chartConfig: AbstractChartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
    fillShadowGradient: 'rgba(32, 178, 170, 0.2)',
    fillShadowGradientFrom: 'rgba(32, 178, 170, 0.2)',
    fillShadowGradientTo: 'rgba(255, 255, 255, 0)',
    fillShadowGradientOpacity: 0.6,
    propsForDots: {
      r: '0',
      strokeWidth: '0',
    },
    propsForLabels: {
      fontSize: 10,
      alignmentBaseline: 'middle',
      textAnchor: 'end',
    },
    formatYLabel,
    style: {
      borderRadius: layout.borderRadius.extraLarge,
      paddingRight: 0,
    },
    propsForBackgroundLines: {
      strokeDasharray: "6 6",
      strokeWidth: 1,
      stroke: "rgba(128, 128, 128, 0.2)",
    }
  };

  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      bezier={false}
      withInnerLines={false}
      withDots={false}
      withShadow={true}
      withVerticalLabels={false}
      withVerticalLines={false}
      withHorizontalLines={true}
      segments={5}
      fromZero={false}
      horizontalLabelRotation={0}
    />
  );
};

export default AppChart;