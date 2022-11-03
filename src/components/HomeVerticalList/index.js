import {View, Text, FlatList, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {COLORS, icons} from '../../constants';
import {
  deleteTask,
  onTaskStatusChange,
  onCategoryProgressChange,
} from '../../redux/reducers/taskReducer';
import {ImageLoader} from '../ImageLoader/index';
import styles from './styles';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HomeVerticalList = props => {
  const {tasks} = props;

  const dispatch = useDispatch();
  const reduxDefaultData = useSelector(state => state.task.totalData);

  const [task, setTask] = useState();

  const onDelete = (id, category) => {
    console.log('dle', category);
    const data = {id, category};
    dispatch(deleteTask(data));
  };

  const renderItem = ({item}) => {
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
              innerIconStyle={{borderWidth: 10}}
              textStyle={styles.txtStyle}
              onPress={isChecked => {
                dispatch(
                  onTaskStatusChange({
                    isChecked,
                    item,
                  }),
                );

                setTimeout(() => {
                  dispatch(onCategoryProgressChange(item));
                }, 3000);
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

  const renderEmptyComponent = () => {
    return (
      <View style={styles.mainCont2}>
        <Text style={styles.emptyText}>No Tasks to show</Text>
      </View>
    );
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
      <AnimatedFlatlist
        scrollEventThrottle={16}
        data={task ? task : reduxDefaultData[0]?.task}
        bounces={true}
        horizontal={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HomeVerticalList;
