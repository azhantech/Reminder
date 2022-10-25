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

    data.forEach(item => {
      if (item.progress < 100) {
        counter += 1;
      }
    });

    data.forEach(element => {
      console.log('element', element);
      if (element.progress != 100) {
        setNonCompletedPercentage({
          color: COLORS.mainFg,
          progress:
            data.length > 0 ? Math.floor((counter / data.length) * 100) : 0,
        });
      } else {
        setCompletedPercentage({
          color: COLORS.mainFg,
          progress:
            data.length > 0
              ? 100 - Math.floor((counter / data.length) * 100)
              : 0,
        });
      }
    });
    console.log(completedPercentage);
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
