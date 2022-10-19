import {
  View,
  Text,
  FlatList,
  Alert,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {COLORS, icons} from '../../constants';
import styles from './styles';
import {DATA} from '../../constants/data';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HomeVerticalList = props => {
  const {tasks} = props;
  const [task, setTask] = useState();

  const onDelete = id => {
    console.log('dle');
    setTask(task?.tasks.filter(val => val.tname !== id));
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.mainCont}>
        <Text style={styles.txtStyle}>{item.tname}</Text>
        <TouchableOpacity
          onPress={() => {
            onDelete(item.tname);
          }}>
          <Image source={icons.trash} style={styles.imgStyle} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    console.log('tasks', tasks);
    setTask(tasks);
  }, [tasks]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log(tasks);
  //     setTask(tasks);
  //   }, []),
  // );

  return (
    <View style={styles.listCont}>
      <AnimatedFlatlist
        scrollEventThrottle={16}
        data={task ? task : DATA[0].tasks}
        bounces={true}
        horizontal={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HomeVerticalList;
