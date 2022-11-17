import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {LocalNotification} from '../../services/LocalPushController';
import {MainInputBar} from '../../components/MainInputBar';
import {COLORS, icons} from '../../constants';
import {editTask} from '../../redux/reducers/taskReducer';
import styles from './styles';

const EditTask = ({route}) => {
  const {data, nav} = route.params;

  console.log(data);

  const DATA = useSelector(state => state.task.totalData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dateRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(data.tname);
  const [description, setDescription] = useState(data.desc);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateAdv, setDateAdv] = useState(data.date);
  const [startTime, setStartTime] = useState(data.start_time);
  const [endTime, setEndTime] = useState(data.end_time);
  const [id, setId] = useState();

  const showToast = text => {
    Toast.show({
      type: 'error',
      visibilityTime: 1000,
      text1: text,
    });
  };

  const getNotificationValue = () => {
    PushNotification.getScheduledLocalNotifications(nots => {
      console.log('nots', nots);
      setId(nots);
    });
  };

  const handleSubmit = () => {
    try {
      if (DATA.length != 0) {
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
        if (task.tname === undefined) {
          showToast('Kindly enter task name');
        } else if (task.date === undefined) {
          showToast('Kindly pick task date');
        } else if (
          moment(task.date, 'LL').format('MMM Do YY') <
          moment(new Date()).format('MMM Do YY')
        ) {
          showToast('Tasks can not be created in passed days');
        } else if (task.start_time === undefined) {
          showToast('Kindly pick task start time');
        } else if (task.end_time === undefined) {
          showToast('Kindly pick task end time');
        } else if (
          task.start_time &&
          task.end_time &&
          task.start_time == task.end_time
        ) {
          showToast('Start Time & End Time can not be same');
        } else if (
          task.start_time &&
          task.start_time < moment(new Date()).format('LT')
        ) {
          showToast('Start time should not be less than passed time');
        } else if (
          task.start_time &&
          task.end_time &&
          task?.start_time[5] == task?.end_time[5] &&
          task?.start_time > task?.end_time
        ) {
          showToast('Start time can not be greater than End Time');
        }

        // ------------
        else if (
          task.start_time &&
          task.end_time &&
          task.start_time[5] == 'P' &&
          task.end_time[5] == 'A'
        ) {
          showToast('End Time can not proceed to next day');
        }

        // ------------
        else if (task.start_time && task.end_time && task.end_time[0] == 1) {
          if (
            task?.start_time?.length == 8 &&
            task.start_time[6] == 'P' &&
            task.end_time[6] == 'A'
          ) {
            showToast('End Time can not proceed to next day');
          } else if (
            task?.start_time?.length != 8 &&
            task.start_time[5] == 'P' &&
            task.end_time[6] == 'A'
          ) {
            showToast('End Time can not proceed to next day ');
          }
        }

        // ------------
        else if (task.start_time && task.end_time && task.start_time[0] == 1) {
          if (
            task?.end_time?.length == 8 &&
            task.start_time[6] == 'A' &&
            task.end_time[6] == 'P'
          ) {
            showToast('End Time can not proceed to next day ');
          } else if (
            task?.end_time?.length != 8 &&
            task.start_time[5] == 'A' &&
            task.end_time[6] == 'P'
          ) {
            showToast('End Time can not proceed to next day');
          }
        }

        // ---------
        else if (task.end_time && task.end_time == '12:00 AM') {
          showToast('End time can not proceed to next day');
        } else if (
          task.end_time &&
          task.start_time &&
          task.end_time > moment(new Date()).format('LT') &&
          task?.start_time[5] != task?.end_time[5]
        ) {
          showToast('End time should not not proceed to next day');
        } else if (task.desc === undefined) {
          showToast('Kindly enter task description');
        } else if (task.category == '') {
          showToast('Kindly select category');
        } else if (task.desc === undefined) {
          showToast('Kindly enter task description');
        } else if (task.category == '') {
          showToast('Kindly select category');
        } else {
          setIsLoading(true);
          console.log('task', task);

          setTimeout(() => {
            id.map((item, index) => {
              if (item.notId == id) {
                console.log('item', item.notId);
                PushNotification.cancelLocalNotification(item.notId);
              }
            });

            LocalNotification(
              task?.notId,
              task?.date,
              task?.start_time,
              task?.tname,
            );

            dispatch(editTask(task));
            setIsLoading(false);
            navigation.navigate(nav);
          }, 2000);
        }
      } else {
        showToast('Kindly create the Categories first');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getNotificationValue();
    }, []),
  );

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainCont}>
      <View style={styles.upperCont}>
        <Text style={styles.mainText}>Edit Task</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.lowerCont}>
        <View>
          <Text style={styles.labelStyle}>Title</Text>
          <MainInputBar
            value={title}
            onChangeText={value => setTitle(value)}
            placeholder="Enter Title"
            onSubmitEditing={() => {
              dateRef.current.focus();
            }}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
        </View>

        <View>
          <Text style={styles.labelStyle}>Date</Text>

          <View style={styles.touchableCont}>
            {dateAdv ? (
              <TextInput
                ref={dateRef}
                style={styles.otherTextInputStyle}
                value={dateAdv}
                returnKeyType="next"
                enablesReturnKeyAutomatically
              />
            ) : (
              <TextInput
                ref={dateRef}
                style={styles.otherTextInputStyle}
                editable={false}
                placeholder="Pick Date"
                placeholderTextColor={'grey'}
                returnKeyType="next"
                enablesReturnKeyAutomatically
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
              androidVariant="iosClone"
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
            placeholder="Enter Description"
            returnKeyType="default"
            enablesReturnKeyAutomatically
          />
        </View>

        {isLoading ? (
          <View style={styles.btnTwo}>
            <ActivityIndicator color={COLORS.mainBg} size={'large'} />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit}
            style={styles.btnTwo}>
            <Text style={styles.subTitleTwo}>SUBMIT</Text>
          </TouchableOpacity>
        )}
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
