import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {COLORS, icons} from '../../constants';
import {deleteTask, onTaskStatusChange} from '../../redux/reducers/taskReducer';
import {ImageLoader} from '../ImageLoader/index';
import styles from './styles';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HomeVerticalList = props => {
  const {tasks} = props;

  const dispatch = useDispatch();
  const reduxDefaultData = useSelector(state => state.task.totalData);

  console.log('reduxDefaultData ----> ', reduxDefaultData);

  const [task, setTask] = useState();

  const onDelete = (id, category) => {
    console.log('dle', category);
    const data = {id, category};
    dispatch(deleteTask(data));
  };

  const renderItem = ({item}) => {
    console.log('item.category', item);

    const leftSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      return (
        <TouchableOpacity
          onPress={() => onDelete(item.tname, item.category)}
          activeOpacity={0.6}
          style={styles.slideOpac}>
          <Animated.Image
            source={icons.trash}
            style={[styles.imgStyle, {transform: [{scale: scale}]}]}
          />
        </TouchableOpacity>
      );
    };

    if (
      item.tname != 'No Tasks to show' &&
      item.start_time != '' &&
      item.end_time != ''
    ) {
      return (
        <Swipeable renderLeftActions={leftSwipe}>
          <View style={styles.mainCont}>
            <BouncyCheckbox
              size={25}
              fillColor={!item.completed ? COLORS.mainFg : COLORS.lightGreen}
              text={item.tname}
              // unfillColor={item.completed ? COLORS.lightGreen : COLORS.mainBg}
              innerIconStyle={{borderWidth: 10}}
              textStyle={styles.txtStyle}
              onPress={isChecked => {
                dispatch(
                  onTaskStatusChange({
                    isChecked,
                    item,
                  }),
                );
              }}
              bouncinessIn={40}
              bounceVelocityIn={0.6}
              bounceEffectIn={0.9}
            />
          </View>
        </Swipeable>
      );
    } else {
      return (
        <View style={styles.mainCont}>
          <Text style={styles.txtStyle}>{item.tname}</Text>
          <TouchableOpacity>
            <ImageLoader source={icons.upArrow} style={styles.img2Style} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  useEffect(() => {
    reduxDefaultData.forEach(element => {
      if (element.name == tasks) {
        setTask(element.task);
      }
    });
  }, [reduxDefaultData, tasks]);

  return (
    <View style={styles.listCont}>
      {reduxDefaultData.length > 0 ? (
        <AnimatedFlatlist
          scrollEventThrottle={16}
          data={task ? task : reduxDefaultData[0].task}
          bounces={true}
          horizontal={false}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <AnimatedFlatlist
          scrollEventThrottle={16}
          data={[
            {
              tname: 'No Tasks to show',
              date: '',
              start_time: '',
              end_time: '',
              desc: '',
            },
          ]}
          bounces={true}
          horizontal={false}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default HomeVerticalList;
