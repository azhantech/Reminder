import {View} from 'react-native';
import React, {useState} from 'react';
import {BarChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {COLORS} from '../../constants';
import AnimatedTyping from '../../util/AnimatedTyping';

let label = [];
let dataVal = [];

const BarChartComponent = () => {
  const chartData = useSelector(state => state.task.totalData);

  const [labelVal, setLabelVal] = useState();
  const [dataS, setDataS] = useState();

  console.log('LABEL', labelVal);
  console.log('dataS', dataS);
  const data = {
    labels: labelVal,
    datasets: [
      {
        data: dataS,
      },
    ],
  };

  useFocusEffect(
    React.useCallback(() => {
      chartData.map((item, index) => {
        label.push(item?.name);
        dataVal.push(item?.task.length);
      });

      setLabelVal(label);
      setDataS(dataVal);

      label = [];
      dataVal = [];
    }, [chartData]),
  );

  if (dataS === undefined) {
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
          marginBottom: 10,
        }}>
        <AnimatedTyping text={['No Data to present !']} />
      </View>
    );
  } else {
    return (
      <View>
        <BarChart
          data={data}
          width={365}
          height={220}
          verticalLabelRotation={-50}
          chartConfig={{
            backgroundColor: COLORS.mainFg,
            backgroundGradientFrom: COLORS.mainFg,
            backgroundGradientTo: COLORS.mainFg,
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
