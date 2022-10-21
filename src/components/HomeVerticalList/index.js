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

import {icons} from '../../constants';
import {deleteTask} from '../../redux/reducers/taskReducer';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HomeVerticalList = props => {
  const {tasks} = props;
  const dispatch = useDispatch();
  const reduxDefaultData = useSelector(state => state.task.totalData);

  console.log('reduxDefaultData ----> ', JSON.stringify(reduxDefaultData));

  const [task, setTask] = useState();

  const onDelete = (id, category) => {
    console.log('dle', category);
    const data = {id, category};
    dispatch(deleteTask(data));
  };

  const renderItem = ({item}) => {
    console.log('item.category', item.category);
    if (
      item.data != '' &&
      item.start_time != '' &&
      item.end_time != '' &&
      item.desc != ''
    ) {
      return (
        <View style={styles.mainCont}>
          <Text style={styles.txtStyle}>{item.tname}</Text>
          <TouchableOpacity onPress={() => onDelete(item.tname, item.category)}>
            <Image source={icons.trash} style={styles.imgStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.mainCont}>
          <Text style={styles.txtStyle}>{item.tname}</Text>
          <TouchableOpacity>
            <Image source={icons.upArrow} style={styles.imgStyle} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  useEffect(() => {
    console.log('tasks---->', tasks);
    setTask(tasks);
  }, [tasks]);

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
