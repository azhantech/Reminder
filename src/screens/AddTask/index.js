import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import Toast from 'react-native-toast-message';

import MainInputBar from '../../components/MainInputBar';

import styles from './styles';
import {COLORS, icons} from '../../constants';

import {DATA} from '../../constants/data';

const AddTask = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());
  const [dateAdv, setDateAdv] = useState();
  const [open, setOpen] = useState(false); // flag
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainCont}>
      <View style={styles.upperCont}>
        <Text style={styles.mainText}>Add Task</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.lowerCont}>
        <View>
          <Text style={styles.labelStyle}>Title</Text>
          <MainInputBar
            placeholder="Enter Title"
            value={title}
            onChangeText={value => setTitle(value)}
          />
        </View>
        <View>
          <Text style={styles.labelStyle}>Date</Text>

          <View style={styles.touchableCont}>
            <TextInput
              style={styles.otherTextInputStyle}
              placeholder="Choose Date"
              value={dateAdv ? dateAdv : ''}
            />

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
          <Text style={styles.labelStyle}>Time</Text>
          <View style={styles.timeInpStyle}>
            <DatePicker
              date={date}
              mode="time"
              theme="light"
              style={{
                width: 90,
                height: 100,
              }}
              onDateChange={val => {
                console.log(moment(val).format('LT'));
                setStartTime(moment(val).format('LT'));
              }}
            />

            <DatePicker
              date={date}
              mode="time"
              theme="light"
              style={{
                width: 90,
                height: 100,
              }}
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
            placeholder="Enter Task Description"
            value={description}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <View>
          <Text style={styles.labelStyle}>Category</Text>
          <MainInputBar
            placeholder="Enter Task Description"
            value={description}
            onChangeText={value => setDescription(value)}
          />
        </View>

        <TouchableOpacity style={styles.btnTwo}>
          <Text style={styles.subTitleTwo}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddTask;
