import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {LocalNotification} from '../../services/LocalPushController';
import MainInputBar from '../../components/MainInputBar';
import styles from './styles';
import {COLORS, icons} from '../../constants';
import {addTask} from '../../redux/reducers/taskReducer';

const AddTask = () => {
  const DATA = useSelector(state => state.task.totalData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateAdv, setDateAdv] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [step, setStep] = useState({
    index: 0,
    value: '',
  });

  const showToast = text => {
    Toast.show({
      type: 'error',
      visibilityTime: 1000,
      text1: text,
    });
  };
  const handleSubmit = () => {
    const task = {
      category: step?.value,
      tname: title,
      date: dateAdv,
      desc: description,
      start_time: startTime,
      end_time: endTime,
      completed: false,
      notId: Math.floor(Math.random() * 255),
    };
    console.log('DATA addTask', typeof task.start_time);
    console.log('DATA addTask', typeof task.end_time);
    console.log('DATE adTask', typeof task.date);

    if (DATA.length != 0) {
      console.log('======', task.start_time);

      if (task.tname === undefined) {
        showToast('Kindly enter task name');
      } else if (task.date === undefined) {
        showToast('Kindly pick task date');
      } else if (task.start_time === undefined) {
        showToast('Kindly pick task start time');
      } else if (task.end_time === undefined) {
        showToast('Kindly pick task end time');
      } else if (task.desc === undefined) {
        showToast('Kindly enter task description');
      } else if (task.category == '') {
        showToast('Kindly select category');
      } else {
        if (
          task.start_time != task.end_time
          // &&
          // task.start_time[2] == task.end_time[2] &&
          // task.start_time[0] >= task.end_time[0]
        ) {
          console.log('TYPE', typeof task.start_time);

          LocalNotification(
            task?.notId,
            task?.date,
            task?.start_time,
            task?.tname,
          );

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
        } else {
          showToast('Kindly add proper timing');
        }
      }
    } else {
      showToast('Kindly create the categories first');
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
          <MainInputBar
            value={title}
            onChangeText={value => setTitle(value)}
            placeholder="Enter Title"
          />
        </View>

        <View>
          <Text style={styles.labelStyle}>Date</Text>

          <View style={styles.touchableCont}>
            {dateAdv ? (
              <TextInput style={styles.otherTextInputStyle} value={dateAdv} />
            ) : (
              <TextInput
                style={styles.otherTextInputStyle}
                editable={false}
                placeholder="Pick Date"
                placeholderTextColor={'grey'}
              />
            )}

            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.opacStyle}>
              <Image source={icons.calendar} style={styles.imgStyle} />
            </TouchableOpacity>
            <DatePicker
              modal
              theme="auto"
              open={open}
              date={date}
              mode="date"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDateAdv(moment(date).format('LL'));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>

        <View>
          <View style={styles.timeInpStyle}>
            <View>
              <Text style={styles.labelStyle}>Start Time</Text>

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
            </View>

            <View>
              <Text style={styles.labelStyle}>End Time</Text>

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
        </View>
        <View>
          <Text style={styles.labelStyle}>Description</Text>
          <MainInputBar
            value={description}
            onChangeText={value => setDescription(value)}
            placeholder="Enter Description"
          />
        </View>
        <Text style={styles.labelStyle}>Category</Text>

        {DATA.length != 0 ? (
          <FlatList
            data={DATA}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item?.index.toString()}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('AddCategories', {
                nav: 'AddTask',
              })
            }
            style={styles.addCatOpac}>
            <View>
              <Text style={styles.addTextOpac}>Add Category +</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.btnTwo}>
          <Text style={styles.subTitleTwo}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddTask;
