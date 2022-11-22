import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {MainInputBar} from '../../components/MainInputBar';
import {COLORS, icons} from '../../constants';
import {editTask} from '../../redux/reducers/taskReducer';
import styles from './styles';
import {LocalNotification} from '../../services/LocalPushController';
import {iosLocalNotification} from '../../services/IosLocalPuchController';

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
    if (Platform.OS === 'android') {
      PushNotification.getScheduledLocalNotifications(nots => {
        console.log('nots', nots);
        setId(nots);
      });
    }

    if (Platform.OS === 'ios') {
      PushNotificationIOS.getPendingNotificationRequests(nots => {
        console.log('nots', nots);
        setId(nots);
      });
    }
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
          notEndId: data.notEndId,
        };

        if (!task.tname || task.tname == '') {
          console.log('Kindly enter task name');
          showToast('Kindly enter task name');

          return;
        }

        if (!task.date) {
          console.log('Kindly pick task date');
          showToast('Kindly pick task date');
          return;
        }

        if (
          moment(task.date, 'LL').format('MMM Do YY') <
          moment(new Date()).format('MMM Do YY')
        ) {
          console.log('Tasks can not be created in passed days');
          showToast('Tasks can not be created in passed days');
          return;
        }

        if (!task.start_time) {
          console.log('Kindly pick task start time');
          showToast('Kindly pick task start time');
          return;
        }
        if (!task.end_time) {
          console.log('Kindly pick task end time');
          showToast('Kindly pick task end time');
          return;
        }
        if (
          task.start_time &&
          task.end_time &&
          task.start_time == task.end_time
        ) {
          console.log('Start Time & End Time can not be same');
          showToast('Start Time & End Time can not be same');
          return;
        }

        if (
          task.start_time &&
          task.start_time < moment(new Date()).format('LT')
        ) {
          console.log('Start time should be graeter than passed time');
          showToast('Start time should be greater than passed time');

          return;
        }

        if (task.start_time.length == 8 && task.start_time[6] == 'A') {
          if (
            moment(new Date()).format('LT').length == 8 &&
            moment(new Date()).format('LT').length[6] == 'P'
          ) {
            showToast('Start time can not exceed to next day!');

            return;
          }

          if (
            moment(new Date()).format('LT').length != 8 &&
            moment(new Date()).format('LT').length[5] == 'P'
          ) {
            showToast('Start time can not exceed to next day!');

            return;
          }
        }

        // -----
        if (task.start_time.length != 8 && task.start_time[5] == 'A') {
          if (
            moment(new Date()).format('LT').length == 7 &&
            moment(new Date()).format('LT').length[5] == 'P'
          ) {
            showToast('Start time can not exceed to next day!');

            return;
          }

          if (
            moment(new Date()).format('LT').length != 7 &&
            moment(new Date()).format('LT').length[4] == 'P'
          ) {
            showToast('Start time can not exceed to next day!');

            return;
          }
        }
        // ------
        if (
          task.start_time.length == 8 &&
          task.start_time[6] == 'A' &&
          task.end_time[6] == 'A'
        ) {
          console.log('End Time can not proceed to next day');
          showToast('End Time can not proceed to next day');
          return;
        }

        // ------
        if (
          task.start_time[0] != 8 &&
          task.start_time[5] == 'A' &&
          task.end_time[5] == 'A'
        ) {
          console.log('End Time can not proceed to next day');
          showToast('End Time can not proceed to next day');
          return;
        }

        if (
          task.start_time &&
          task.end_time &&
          task?.start_time[5] == task?.end_time[5] &&
          task?.start_time > task?.end_time
        ) {
          console.log('Start time can not be greater than End Time');
          showToast('Start time can not be greater than End Time');
          return;
        }

        // ------------
        if (
          task.start_time &&
          task.end_time &&
          task.start_time[5] == 'P' &&
          task.end_time[5] == 'A'
        ) {
          console.log('End Time can not proceed to next day');
          showToast('End Time can not proceed to next day');
          return;
        }

        // ------------

        if (task.start_time && task.end_time && task.end_time[0] == 1) {
          if (
            task?.start_time?.length == 8 &&
            task.start_time[6] == 'P' &&
            task.end_time[6] == 'A'
          ) {
            console.log('End Time can not proceed to next day');
            showToast('End Time can not proceed to next day');
            return;
          }

          if (
            task?.start_time?.length != 8 &&
            task.start_time[5] == 'P' &&
            task.end_time[6] == 'A'
          ) {
            console.log('End Time can not proceed to next day');
            showToast('End Time can not proceed to next day');
            return;
          }
        }

        // ---------
        if (task.end_time && task.end_time == '12:00 AM') {
          console.log('End time can not proceed to next day');
          showToast('End time can not proceed to next day');
          return;
        }

        if (
          task.end_time &&
          task.start_time &&
          task.end_time > moment(new Date()).format('LT') &&
          task?.start_time[5] != task?.end_time[5] &&
          task?.start_time[5] == 'P'
        ) {
          console.log('End time should not not proceed to next day');
          showToast('End time should not not proceed to next day');
          return;
        }

        if (!task.desc) {
          console.log('Kindly enter task description');
          showToast('Kindly enter task description');
          return;
        }

        if (task.category == '') {
          console.log('Kindly select category');
          showToast('Kindly select category');
          return;
        }

        // MAIN LOGIC HERE
        console.log('Main logic ?');

        setIsLoading(true);
        console.log('task', task);

        setTimeout(() => {
          id.map((item, index) => {
            if (item.notId == id) {
              console.log('item', item.notId);
              Platform.OS === 'android'
                ? PushNotification.cancelLocalNotification(item.notId)
                : PushNotificationIOS.removePendingNotificationRequests(
                    item.notId,
                  );
              return;
            }

            if (item.notEndId == id) {
              console.log('item', item.notEndId);
              Platform.OS === 'android'
                ? PushNotification.cancelLocalNotification(item.notEndId)
                : PushNotificationIOS.removePendingNotificationRequests(
                    item.notEndId,
                  );
              return;
            }
          });

          const dateVal = moment(task.date, 'LL');
          const startVal = moment(task.start_time, 'LT');
          const endVal = moment(task.end_time, 'LT');

          console.log('START =============>', startVal);
          console.log('END ================>', endVal);

          let updatedValStart = dateVal
            ?.hour(startVal ? startVal.hours() : dateVal.hours())
            .minute(startVal ? startVal.minutes() : dateVal.minutes());

          console.log('updatedValStart', updatedValStart);
          Platform.OS === 'android'
            ? LocalNotification(
                task?.notId,
                updatedValStart,
                `Time to do ${task?.tname}`,
                `Start doing ${task?.tname}`,
              )
            : iosLocalNotification(
                task?.notId,
                updatedValStart,
                `Time to do ${task?.tname}`,
                `Start doing ${task?.tname}`,
              );

          let updatedValEnd = dateVal
            ?.hour(endVal ? endVal.hours() : dateVal.hours())
            .minute(endVal ? endVal.minutes() - 2 : dateVal.minutes());

          console.log('updatedValEnd', updatedValEnd);
          Platform.OS === 'android'
            ? LocalNotification(
                task?.notEndId,
                updatedValEnd,
                `${task?.tname} is approaching to end in 2 minutes`,
                `${task?.tname} Ending Alert`,
              )
            : iosLocalNotification(
                task?.notEndId,
                updatedValEnd,
                `${task?.tname} is approaching to end in 2 minutes`,
                `${task?.tname} Ending Alert`,
              );

          dispatch(editTask(task));
          setIsLoading(false);
          navigation.navigate(nav);
        }, 2000);
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

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOpen(true)}
            style={styles.touchableCont}>
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

            <View style={styles.opacStyle}>
              <Image source={icons.calendar} style={styles.imgStyle} />
            </View>
            <DatePicker
              modal
              theme="auto"
              open={open}
              date={date}
              mode="date"
              minimumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDateAdv(moment(date).format('LL'));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.timeInpStyle}>
            <View>
              <Text style={styles.labelStyle}>Start Time</Text>

              <DatePicker
                date={moment(startTime, 'hh:mm A').toDate()}
                mode="time"
                minimumDate={new Date()}
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
                minimumDate={new Date()}
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
