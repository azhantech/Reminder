import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {BarChart} from 'react-native-chart-kit';
import {COLORS} from '../../constants';
import {useSelector} from 'react-redux';
import AnimatedTyping from '../../util/AnimatedTyping';

let label = [];
let dataVal = [];

const BarChartComponent = () => {
  const chartData = useSelector(state => state.task.totalData);

  console.log('LABEL', label);
  const data = {
    labels: label,
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

  if (dataVal.length == 0) {
    return (
      <View
        style={{
          backgroundColor: COLORS.mainFg,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
          borderRadius: 10,
          width: '100%',
        }}>
        <AnimatedTyping text={['No Data to present !']} />
      </View>
    );
  } else {
    return (
      <View>
        <BarChart
          data={data}
          width={Dimensions.get('window').width * 0.89}
          height={250}
          verticalLabelRotation={-50}
          chartConfig={{
            backgroundColor: COLORS.mainFg,
            backgroundGradientFrom: '#4b51d7',
            backgroundGradientTo: '#b6b9f3',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              marginBottom: 10,
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
            marginBottom: 16,
            borderRadius: 16,
          }}
          showBarTops={true}
          showValuesOnTopOfBars={true}
        />
      </View>
    );
  }
};

export default BarChartComponent;
