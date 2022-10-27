import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import ScheduleDataCards from '../../components/ScheduleDataCards';
import LineChartComponent from '../../components/LineChartComponent';
import styles from './styles';
import {COLORS, icons} from '../../constants';
import BarChartComponent from '../../components/BarChartComponent';
import {useSelector} from 'react-redux';

const Report = () => {
  const DATA = useSelector(state => state.task.totalData);
  const [nonCompletedPercentage, setNonCompletedPercentage] = useState({
    color: '',
    progress: '',
  });
  const [completedPercentage, setCompletedPercentage] = useState({
    color: '',
    progress: '',
  });

  const handlePercentageCount = data => {
    let counter = 0;
    let totalLength = 0;

    console.log('ARRAY', JSON.stringify(data));

    data.forEach(item => {
      item.task.forEach(element => {
        if (!element.completed) {
          counter += 1;
        }
      });
      totalLength += item.task.length;
    });

    console.log('counter', counter); // total non completed tasks
    console.log('totalLength', totalLength); // total tasks

    setCompletedPercentage({
      color: COLORS.mainFg,
      progress: isNaN(Math.floor(((totalLength - counter) / totalLength) * 100))
        ? 0
        : Math.floor(((totalLength - counter) / totalLength) * 100),
    });

    setNonCompletedPercentage({
      color: COLORS.mainFg,
      progress:
        totalLength != 0 && counter != 0
          ? Math.floor((counter / totalLength) * 100)
          : 0,
    });

    console.log(
      'nonCompletedPercentage.progress',
      (totalLength - counter / totalLength) * 100,
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      handlePercentageCount(DATA);
    }, [DATA]),
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCont}>
      <View style={styles.upMainCont}>
        <View style={styles.upperContainer}>
          <Text style={styles.mainText}>Report</Text>
        </View>
        <View>
          <View style={styles.contView}>
            <ScheduleDataCards
              title="Completed Projects"
              imgSrc={icons.checked}
              progress={completedPercentage && completedPercentage}
            />
            <ScheduleDataCards
              title="Ongoing Projects"
              imgSrc={icons.clock}
              progress={nonCompletedPercentage && nonCompletedPercentage}
            />
          </View>
        </View>
        <View>
          <BarChartComponent />

          <LineChartComponent />
        </View>
      </View>
    </ScrollView>
  );
};

export default Report;
