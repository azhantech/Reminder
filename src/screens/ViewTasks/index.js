import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import BackButon from '../../components/BackButon';
import {useNavigation} from '@react-navigation/native';

import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {COLORS, icons} from '../../constants';

const ViewTasks = ({route}) => {
  const navigation = useNavigation();

  const DATA = useSelector(state => state.task.totalData);
  const {id} = route.params;
  console.log('id', id);

  const [data, setData] = useState();

  const renderItem = ({item}) => {
    console.log('render', item);
    return (
      <View style={styles.renderMain}>
        <View>
          <Text style={styles.txtFt}>{item.tname}</Text>
          <Text style={styles.txtFtd}>{item.desc}</Text>
        </View>
        <View style={styles.contUpStyle}>
          <Text style={styles.timeTxt}>{item.start_time}</Text>
          <Text style={styles.timeTxt}>{item.end_time}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditTask', {
              data: item,
            });
          }}
          style={styles.btnView}>
          <Image source={icons.pencil} style={styles.imgView} />
        </TouchableOpacity>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      DATA.map((item, index) => {
        if (item.name == id) {
          setData(item.task);
        }
      });
    }, [data]),
  );

  return (
    <View style={styles.mainCont}>
      <View style={styles.upperCont}>
        <View
          style={{
            left: -35,
          }}>
          <BackButon />
        </View>
        <Text style={styles.mainText}>TASKS</Text>
      </View>
      <View style={styles.flatStyle}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ViewTasks;
