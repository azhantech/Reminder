import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import MainInputBar from '../../components/MainInputBar';
import styles from './styles';
import {COLORS, icons} from '../../constants';
import {addTask} from '../../redux/reducers/taskReducer';
import {HideKeyboard} from '../../util/HideKeyboard';
import {LocalNotification} from '../../services/LocalPushController';

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
    if (DATA.length != 0) {
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
      } else {
        // MAIN LOGIC HERE

        setIsLoading(true);

        LocalNotification(
          task?.notId,
          task?.date,
          task?.start_time,
          task?.tname,
        );
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
