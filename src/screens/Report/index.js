import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import ScheduleDataCards from '../../components/ScheduleDataCards';
import LineChartComponent from '../../components/LineChartComponent';
import styles from './styles';
import {DATA} from '../../constants/data';
import {icons} from '../../constants';
import BarChartComponent from '../../components/BarChartComponent';

const Report = () => {
  const [completedPercentage, setCompletedPercentage] = useState({
    color: '',
    progress: '',
  });
  const [nonCompletedPercentage, setNonCompletedPercentage] = useState({
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
      if (element.progress == 100) {
        setCompletedPercentage({
          color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256,
          )}, ${Math.floor(Math.random() * 256)})`,
          progress: Math.floor((counter / data.length) * 100),
        });
      } else {
        setNonCompletedPercentage({
          color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256,
          )}, ${Math.floor(Math.random() * 256)})`,
          progress: 100 - Math.floor((counter / data.length) * 100),
        });
      }
    });
    console.log(completedPercentage);
  };

  useFocusEffect(
    React.useCallback(() => {
      handlePercentageCount(DATA);
    }, []),
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCont}>
      <View
        style={{
          marginHorizontal: 15,
          marginBottom: 120,
        }}>
        <View style={styles.upperContainer}>
          <Text style={styles.mainText}>Report</Text>
        </View>
        <View>
          <View>
            {/* <Text style={styles.projTxt}>Statistical Overview</Text> */}
          </View>
          <View style={{flexDirection: 'row'}}>
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

        <BarChartComponent data={DATA && DATA} />

        <LineChartComponent data={DATA && DATA} />
      </View>
    </ScrollView>
  );
};

export default Report;
