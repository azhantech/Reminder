import {Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import MainInputBar from '../../components/MainInputBar';
import styles from './styles';
import {COLORS} from '../../constants';
import {addTask} from '../../redux/reducers/taskReducer';

const AddTask = () => {
  const DATA = useSelector(state => state.task.totalData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());
  const [dateAdv, setDateAdv] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [step, setStep] = useState({
    index: 0,
    value: '',
  });

  const handleSubmit = () => {
    const task = {
      category: step?.value,
      tname: title,
      desc: description,
      start_time: startTime,
      end_time: endTime,
      completed: false,
    };
    console.log('DATA addTask', DATA.length);
    if (DATA.length != 0) {
      if (
        task.tname == '' ||
        task.desc == '' ||
        task.start_time == '' ||
        task.end_time == '' ||
        task.category == ''
      ) {
        Toast.show({
          type: 'error',
          visibilityTime: 2000,
          text1: 'Kindly fill all the fields 👋',
        });
      } else {
        console.log('task', task);

        dispatch(addTask(task));

        navigation.navigate('HomeStack');

        setTitle('');
        setDescription('');
        setDateAdv('');
        setStartTime('');
        setEndTime('');
        setStep({
          index: 0,
          value: '',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        visibilityTime: 2000,
        text1: 'Kindly create the Categories first 👋',
      });
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          setStep({
            index: item.index,
            value: item.name,
          })
        }
        style={[
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: COLORS.mainBg,
            borderWidth: 2,
            borderColor: item.color,
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 12,
          },

          item?.index == step.index && {
            backgroundColor: item.color,
          },
        ]}>
        <View>
          <Text
            style={[
              {
                color: item.color,
              },
              item?.index == step.index && {
                color: COLORS.mainBg,
                fontWeight: 'bold',
              },
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainCont}>
      <View style={styles.upperCont}>
        <Text style={styles.mainText}>Add Task</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.lowerCont}>
        <View>
          <Text style={styles.labelStyle}>Title</Text>
          <MainInputBar value={title} onChangeText={value => setTitle(value)} />
        </View>

        <View>
          <Text style={styles.labelStyle}>Time</Text>
          <View style={styles.timeInpStyle}>
            <DatePicker
              date={date}
              mode="time"
              theme="light"
              style={styles.datePickerTxt}
              onDateChange={val => {
                console.log(moment(val).format('LT'));
                setStartTime(moment(val).format('LT'));
              }}
            />

            <DatePicker
              date={date}
              mode="time"
              theme="light"
              style={styles.datePickerTxt}
              onDateChange={val => {
                console.log(moment(val).format('LT'));
                setEndTime(moment(val).format('LT'));
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.labelStyle}>Description</Text>
          <MainInputBar
            value={description}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <Text style={styles.labelStyle}>Category</Text>

        <FlatList
          data={DATA}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item?.index.toString()}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.btnTwo}>
          <Text style={styles.subTitleTwo}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddTask;
