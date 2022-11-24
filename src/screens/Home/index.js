import {View, Text, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {Link, useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import HomeHorizontalCards from '../../components/HomeHorizontalCards';
import HomeVerticalList from '../../components/HomeVerticalList';
import styles from './styles';
import {icons} from '../../constants';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Home = () => {
  const DATA = useSelector(state => state.task.totalData);
  const [dataVal, setDataVal] = useState();
  const [task, setTask] = useState();
  const [newTask, setNewTasks] = useState();

  const handleSelectedTask = value => {
    dataVal.map((item, index) => {
      if (value.name == item.name) {
        setNewTasks(value.name);
        setTask(value);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setDataVal(DATA);

      if (Platform.OS === 'ios') {
        PushNotificationIOS.getPendingNotificationRequests(nots => {
          console.log('nots ===>', nots);
        });
      }

      if (Platform.OS === 'android') {
        PushNotification.getScheduledLocalNotifications(nots => {
          console.log('nots', nots);
        });
      }
    }, [dataVal, DATA]),
  );
  const horizontalProps = {
    handleSelectedTask,
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.upContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.upperLevelTxtContainer}>
            <Text style={styles.helloTxtStyle}>Hello!</Text>
          </View>
          <View style={styles.upperLevelImgContainer}>
            <Image source={icons.hand} style={styles.profileImgStyle} />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.middleTopContainer}>
            <Text style={styles.catTxtStyle}>My Categories</Text>
            <Link to={{screen: 'AddCategories', params: {nav: 'Home'}}}>
              <Text style={styles.opacTxt}> Add Category </Text>
            </Link>
          </View>
          <HomeHorizontalCards {...horizontalProps} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomTopContainer}>
          <Text style={styles.catOneTxtStyle}>My Tasks</Text>
        </View>

        <HomeVerticalList tasks={newTask} />
      </View>
    </View>
  );
};

export default Home;
