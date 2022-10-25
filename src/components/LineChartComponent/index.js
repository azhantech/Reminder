import {View, Text, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import styles from './style';
import {COLORS} from '../../constants';

let label = [];
let dataVal = [];

const LineChartComponent = () => {
  const chartData = useSelector(state => state.task.totalData);

  const data = {
    labels: label,
    data: dataVal,
  };

  useFocusEffect(
    React.useCallback(() => {
      chartData.map((item, index) => {
        label.push(item?.name);
        dataVal.push(item?.task.length);
      });
    }, [chartData]),
  );

  console.log('linedata', data);

  return (
    <View>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width * 0.89}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: COLORS.mainFg,
          backgroundGradientFrom: '#4b51d7',
          backgroundGradientTo: '#b6b9f3',
          color: (opacity = 1) => `rgba(75, 238, 112, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(75, 238, 112, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          fillShadowGradient: COLORS.lightGreen, // THIS
          fillShadowGradientOpacity: 1, // THIS
          propsForDots: {
            r: '6',
            strokeWidth: '1',
            stroke: '#ffa726',
          },
          barPercentage: 0.4,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
        hideLegend={true}
      />
      {/* <LineChart
        data={data}
        width={Dimensions.get('window').width * 0.89} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: COLORS.mainFg,
          backgroundGradientFrom: '#4b51d7',
          backgroundGradientTo: '#b6b9f3',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: COLORS.lightGreen,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    </View>
  );
};

export default LineChartComponent;
