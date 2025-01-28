import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { ViewStyle } from 'react-native';
import { layout } from '../../constants/layout';
import { colors } from '../../theme/colors';
import { ProcessedPricePoint } from '../../types/bitcoinService.types';

interface AppChartProps {
  historicalPrices: ProcessedPricePoint[];
  width?: number;
  height?: number;
  chartConfig?: AbstractChartConfig;
  bezier?: boolean;
  style?: ViewStyle;
}

const AppChart: React.FC<AppChartProps> = ({
  historicalPrices,
  width = Dimensions.get('window').width - layout.padding.extraLarge * 2,
  height = layout.height.chart,
  bezier = false
}) => {
  const chartData = useMemo(() => ({
    labels: historicalPrices.map(point => point.price.toFixed(0)),
    datasets: [{
      data: historicalPrices.map(point => point.price),
      color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
      strokeWidth: 2
    }]
  }), [historicalPrices]);

  const yAxisLabels = useMemo(() => {
    if (!historicalPrices.length) return [];
    
    const values = historicalPrices.map(point => point.price);
    const lastValue = values[values.length - 1];
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    if (lastValue === maxValue || lastValue === minValue) {
      const step = (maxValue - minValue) / 5;
      return [
        maxValue,
        maxValue - step,
        maxValue - (step * 2),
        maxValue - (step * 3),
        maxValue - (step * 4),
        minValue
      ].map(val => val.toFixed(0));
    }

    const range = maxValue - minValue;
    const stepToLast = (lastValue - minValue) / 3;
    const closestBelow = lastValue - stepToLast;
    const upperRange = maxValue - lastValue;
    const upperStep = upperRange / 2;

    return [
      maxValue,
      lastValue + upperStep,
      lastValue,
      closestBelow,
      closestBelow - stepToLast,
      minValue
    ].map(val => val.toFixed(0));
  }, [historicalPrices]);

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

  if (!historicalPrices.length) {
    return null;
  }

  return (
    <LineChart
      data={chartData}
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
      fromZero={false}
      horizontalLabelRotation={0}
    />
  );
};

export default AppChart;