import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {BarChart} from 'react-native-chart-kit';
import {COLORS} from '../../constants';
import {useSelector} from 'react-redux';

let label = [];
let dataVal = [];

const BarChartComponent = () => {
  const chartData = useSelector(state => state.task.totalData);

  const data = {
    // labels: label,
    datasets: [
      {
        data: dataVal,
      },
    ],
  };

  useFocusEffect(
    React.useCallback(() => {
      chartData.map((item, index) => {
        label.push(item?.name);
        dataVal.push(item?.task.length);
      });
    }, [chartData]),
  );

  return (
    <View>
      <BarChart
        data={data}
        width={Dimensions.get('window').width * 0.89}
        height={250}
        verticalLabelRotation={-80}
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
      />
    </View>
  );
};

export default BarChartComponent;
