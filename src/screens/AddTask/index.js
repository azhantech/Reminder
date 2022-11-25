import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {MainInputBar} from '../../components/MainInputBar';
import styles from './styles';
import {COLORS, icons} from '../../constants';
import {addTask} from '../../redux/reducers/taskReducer';
import {HideKeyboard} from '../../util/HideKeyboard';
import {LocalNotification} from '../../services/LocalPushController';
import {iosLocalNotification} from '../../services/IosLocalPuchController';

const AddTask = () => {
  const DATA = useSelector(state => state.task.totalData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dateRef = useRef();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOne, setDateOne] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
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
      visibilityTime: 1500,
      text1: text,
    });
  };
  const handleSubmit = () => {
    try {
      if (DATA.length != 0) {
        const task = {
          category: step?.value,
          tname: title,
          date: dateAdv,
          desc: description,
          start_time: !startTime ? moment(new Date()).format('LT') : startTime,
          end_time: !endTime ? moment(new Date()).format('LT') : endTime,
          completed: false,
          notId: Math.floor(Math.random() * 255),
          notEndId: Math.floor(Math.random() * Math.random() * 255),
        };

        if (!task.tname || task.tname == '') {
          console.log('Kindly enter title');
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

        if (
          moment(task.date, 'LL').format('MMM Do YY') ==
          moment(new Date()).format('MMM Do YY')
        ) {
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

          // ------------

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

          if (task.start_time && task.end_time && task.start_time[0] == 1) {
            if (
              task.end_time?.length == 8 &&
              task?.start_time[6] == task?.end_time[6] &&
              task?.start_time > task?.end_time
            ) {
              console.log('Start time can not be greater than End Time');
              showToast('Start time can not be greater than End Time');
              return;
            }

            if (
              task.end_time?.length != 8 &&
              task?.start_time[6] == task?.end_time[5] &&
              task?.start_time > task?.end_time
            ) {
              console.log('Start time can not be greater than End Time');
              showToast('Start time can not be greater than End Time');
              return;
            }
          }

          if (task.start_time && task.end_time && task.end_time[0] == 1) {
            if (
              task.start_time?.length == 8 &&
              task?.start_time[6] == task?.end_time[6] &&
              task?.start_time > task?.end_time
            ) {
              console.log('Start time can not be greater than End Time');
              showToast('Start time can not be greater than End Time');
              return;
            }

            if (
              task.start_time?.length != 8 &&
              task?.start_time[5] == task?.end_time[6] &&
              task?.start_time > task?.end_time
            ) {
              console.log('Start time can not be greater than End Time');
              showToast('Start time can not be greater than End Time');
              return;
            }
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
        }

        if (
          moment(task.date, 'LL').format('MMM Do YY') !=
          moment(new Date()).format('MMM Do YY')
        ) {
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

        const dateVal = moment(task.date, 'LL');
        const startVal = moment(task.start_time, 'LT');
        const endVal = moment(task.end_time, 'LT');

        let updatedValStart = dateVal
          ?.hour(startVal ? startVal.hours() : dateVal.hours())
          .minute(startVal ? startVal.minutes() : dateVal.minutes());

        if (Platform.OS === 'android') {
          LocalNotification(
            task?.notId,
            updatedValStart,
            `Time to do ${task?.tname}`,
            `Start doing ${task?.tname}`,
          );
        }

        if (Platform.OS === 'ios') {
          iosLocalNotification(
            task?.notId,
            updatedValStart,
            `Time to do ${task?.tname}`,
            `Start doing ${task?.tname}`,
          );
        }
        let updatedValEnd = dateVal
          ?.hour(endVal ? endVal.hours() : dateVal.hours())
          .minute(endVal ? endVal.minutes() - 2 : dateVal.minutes());

        if (Platform.OS === 'android') {
          LocalNotification(
            task?.notEndId,
            updatedValEnd,
            `${task?.tname} is approaching to end in 2 minutes`,
            `${task?.tname} Ending Alert`,
          );
        }

        if (Platform.OS === 'ios') {
          iosLocalNotification(
            task?.notEndId,
            updatedValEnd,
            `${task?.tname} is approaching to end in 2 minutes`,
            `${task?.tname} Ending Alert`,
          );
        }

        dispatch(addTask(task));
        setIsLoading(false);

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
        showToast('Kindly create the categories first');
      }
    } catch (error) {
      console.log(error);
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

  console.log('STARTTIME', startTime);

  return (
    <HideKeyboard>
      <KeyboardAwareScrollView bounces={false} style={styles.mainCont}>
        <View style={styles.upperCont}>
          <Text style={styles.mainText}>Add Task</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.lowerCont}>
          <View>
            <Text style={styles.labelStyle}>Title</Text>
            <MainInputBar
              value={title}
              onChangeText={value => setTitle(value)}
              placeholder="Enter Title"
              onSubmitEditing={() => {
                setOpen(true);
                dateRef.current.focus();
              }}
              returnKeyType="next"
              enablesReturnKeyAutomatically
            />
          </View>

          <View>
            <Text style={styles.labelStyle}>Date</Text>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setOpen(true)}
              style={styles.touchableCont}>
              {dateAdv ? (
                <TextInput
                  ref={dateRef}
                  style={styles.otherTextInputStyle}
                  value={dateAdv}
                  editable={false}
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                />
              ) : (
                <TextInput
                  ref={dateRef}
                  style={styles.otherTTextInputStyle}
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
                  date={dateOne}
                  mode="time"
                  minimumDate={new Date(Date.now())}
                  theme="light"
                  style={styles.datePickerTxt}
                  onDateChange={val => {
                    setDateOne(val);
                    console.log('val', val);
                    console.log(moment(val).format('LT'));

                    setStartTime(moment(val).format('LT'));
                  }}
                />
              </View>

              <View>
                <Text style={styles.labelStyle}>End Time</Text>

                <DatePicker
                  date={dateTwo}
                  mode="time"
                  minimumDate={
                    !startTime ? new Date(Date.now()) : new Date(dateOne)
                  }
                  theme="light"
                  style={styles.datePickerTxt}
                  onDateChange={val => {
                    setDateTwo(val);
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

          {isLoading ? (
            <View style={styles.btnTwo}>
              <ActivityIndicator color={COLORS.mainBg} size={'large'} />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              style={styles.btnTwo}>
              <Text style={styles.subTitleTwo}>ADD</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </HideKeyboard>
  );
};

export default AddTask;
