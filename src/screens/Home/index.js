import {View, Text, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {Link} from '@react-navigation/native';

import HomeHorizontalCards from '../../components/HomeHorizontalCards';
import HomeVerticalList from '../../components/HomeVerticalList';
import styles from './styles';
import {icons} from '../../constants';

import {DATA} from '../../constants/data';
const NUM_TASKS = 6;

const Home = () => {
  const [task, setTask] = useState();

  const handleSelectedTask = value => {
    DATA.map((item, index) => {
      if (value.name == item.name) {
        console.log('sdjhdsjds', value.tasks);
        setTask(value.tasks);
      }
    });
  };

  const horizontalProps = {
    DATA,
    handleSelectedTask,
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.upContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.upperLevelTxtContainer}>
            <Text style={styles.helloTxtStyle}>Hello, Shan</Text>
            <Text>You have {NUM_TASKS} task today</Text>
          </View>
          <View style={styles.upperLevelImgContainer}>
            <Image source={icons.hand} style={styles.profileImgStyle} />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.middleTopContainer}>
            <Text style={styles.catTxtStyle}>My Categories</Text>
          </View>
          <HomeHorizontalCards {...horizontalProps} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomTopContainer}>
          <Text style={styles.catOneTxtStyle}>My Tasks</Text>
          <Link to={{screen: 'ViewTasks'}}>
            <Text style={styles.catTwoTxtStyle}>All Tasks</Text>
          </Link>
        </View>

        <HomeVerticalList task={task} />
      </View>
    </View>
  );
};

export default Home;
