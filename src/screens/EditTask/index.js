import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {addTask, editTask} from '../../redux/reducers/taskReducer';
import PushNotification from 'react-native-push-notification';

const EditTask = ({route}) => {
  const {data} = route.params;

  console.log(data);

  const DATA = useSelector(state => state.task.totalData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState(data.tname);
  const [description, setDescription] = useState(data.desc);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [dateAdv, setDateAdv] = useState(data.date);
  const [startTime, setStartTime] = useState(data.start_time);
  const [endTime, setEndTime] = useState(data.end_time);

  const [id, setId] = useState();
  const [isFlag, setIsFlag] = useState(true);

  const getNotificationValue = () => {
    PushNotification.getScheduledLocalNotifications(nots => {
      setId(nots);
    });
  };

  const checkLoader = () => {
    if (isFlag && (title == '') & (description == '')) {
      return <ActivityIndicator color="black" />;
    }
  };

  const handleSubmit = () => {
    try {
      const task = {
        category: data.category,
        tname: title,
        date: dateAdv,
        desc: description,
        start_time: startTime,
        end_time: endTime,
        completed: data.completed,
        notId: data.notId,
      };

      console.log('DATA addTask', DATA.length);

      if (DATA.length != 0) {
        if (
          task.tname == '' ||
          task.desc == '' ||
          task.start_time == '' ||
          task.end_time == '' ||
          task.category == '' ||
          task.date == undefined
        ) {
          Toast.show({
            type: 'error',
            visibilityTime: 1000,
            text1: 'Kindly fill all the fields',
          });
        } else {
          if (task.start_time != task.end_time) {
            console.log('task', task);

            console.log('==============================');

            checkLoader();

            setTimeout(() => {
              id.map((item, index) => {
                console.log('--------------------');
                if (item.id == id) {
                  console.log('item', item.id);
                  PushNotification.cancelLocalNotification(id);
                }
              });

              console.log('now they');

              // LocalNotification(
              //   task?.notId,
              //   task?.date,
              //   task?.start_time,
              //   task?.tname,
              // );

              console.log('****', task);
              dispatch(editTask(task));
              setIsFlag(false);
              navigation.navigate('Home');
            }, 2000);

            setTitle('');
            setDescription('');
            setDateAdv('');
            // setStartTime('');
            // setEndTime('');
          } else {
            Toast.show({
              type: 'error',
              visibilityTime: 2000,
              text1: 'Kindly add proper timing',
            });
          }
        }
      } else {
        Toast.show({
          type: 'error',
          visibilityTime: 2000,
          text1: 'Kindly create the Categories first',
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    getNotificationValue();
    console.log('id', id);
  }, []);

  console.log(endTime, 'end time');

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainCont}>
      <View style={styles.upperCont}>
        <Text style={styles.mainText}>Edit Task</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.lowerCont}>
        <View>
          <Text style={styles.labelStyle}>Title</Text>
          <MainInputBar value={title} onChangeText={value => setTitle(value)} />
        </View>

        <View>
          <Text style={styles.labelStyle}>Date</Text>

          <View style={styles.touchableCont}>
            {dateAdv ? (
              <TextInput style={styles.otherTextInputStyle} value={dateAdv} />
            ) : (
              <View style={styles.otherTwoTextInputStyle}></View>
            )}

            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.opacStyle}>
              <Image source={icons.calendar} style={styles.imgStyle} />
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              theme="light"
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
          {/* <Text style={styles.labelStyle}>Time</Text> */}
          <View style={styles.timeInpStyle}>
            <View>
              <Text style={styles.labelStyle}>Start Time</Text>

              <DatePicker
                date={moment(startTime, 'hh:mm A').toDate()}
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
                date={moment(endTime, 'hh:mm A').toDate()}
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
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.btnTwo}>
          <Text style={styles.subTitleTwo}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnThree}>
          <Text style={styles.subTitleTwo}>CANCEL</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default EditTask;
