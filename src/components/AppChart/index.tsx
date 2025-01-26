import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { ViewStyle } from 'react-native';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

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
  width = Dimensions.get('window').width - 20,
  height = 220,
  chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(144, 218, 217, ${opacity})`, // Light teal for the line
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradient: 'rgba(144, 218, 217, 0.2)', // Fill color
    fillShadowGradientFrom: 'rgba(144, 218, 217, 0.2)', // Very light teal fill
    fillShadowGradientTo: '#ffffff', // Fade to white
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
    marginVertical: 8,
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