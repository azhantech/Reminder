import {View, Text, Dimensions} from 'react-native';
import React from 'react';

import styles from './styles';
import {BarChart} from 'react-native-chart-kit';
import {COLORS} from '../../constants';

const BarChartComponent = props => {
  //   const {data} = props;

  const chartConfig = {};
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  return (
    <View>
      <BarChart
        data={data}
        width={Dimensions.get('window').width * 0.89}
        height={250}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: COLORS.mainFg,
          backgroundGradientFrom: '#4b51d7',
          backgroundGradientTo: '#b6b9f3',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          fillShadowGradient: COLORS.lightGreen, // THIS
          fillShadowGradientOpacity: 1, // THIS
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          barPercentage: 0.4,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        showBarTops={true}
        showValuesOnTopOfBars={true}
        verticalLabelRotation={15}
      />
    </View>
  );
};

export default BarChartComponent;
