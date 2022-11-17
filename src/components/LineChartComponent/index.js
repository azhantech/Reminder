import {View} from 'react-native';
import React, {useState} from 'react';
import {ProgressChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {COLORS} from '../../constants';
import AnimatedTyping from '../../util/AnimatedTyping';

let label = [];
let dataVal = [];
const LineChartComponent = () => {
  const chartData = useSelector(state => state.task.totalData);

  const [labelVal, setLabelVal] = useState();
  const [dataS, setDataS] = useState();

  const data = {
    labels: labelVal,
    data: dataS,
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

  if (dataS === undefined || dataS?.length == 0) {
    return (
      <View
        style={{
          backgroundColor: COLORS.mainFg,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          borderRadius: 10,
          width: '100%',
        }}>
        <AnimatedTyping text={['No Data to present !']} />
      </View>
    );
  } else {
    return (
      <View>
        <ProgressChart
          data={data}
          width={384}
          height={220}
          strokeWidth={12}
          radius={32}
          chartConfig={{
            backgroundColor: COLORS.mainFg,
            backgroundGradientFrom: COLORS.mainFg,
            backgroundGradientTo: COLORS.mainFg,
            // backgroundGradientFrom: '#7277f7',
            // backgroundGradientTo: '#3c3f97',
            color: (opacity = 1) => `rgba(75, 238, 112, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
          hideLegend={false}
        />
      </View>
    );
  }
};

export default LineChartComponent;
