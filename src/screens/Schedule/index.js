import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import React, {useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import ScheduleVerticalList from '../../components/ScheduleVerticalList';
import styles from './styles';
import {COLORS} from '../../constants';
import {DATA} from '../../constants/data';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [pressedValue, setPressedValue] = useState();
  const [currentTab, setCurrentTab] = useState();

  const handlePressedValue = value => {
    console.log('value', value);

    setPressedValue(value);
    switch (value) {
      case 'Ongoing':
        const dat = DATA.filter(item => item.progress < 100);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        setCurrentTab(dat);
        break;
      case 'Completed':
        const val = DATA.filter(item => item.progress == 100);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        setCurrentTab(val);
        break;
      case 'All':
        setCurrentTab(DATA);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
  };

  const handleOnDateSelected = selectedDateVal => {
    console.log(
      'selectedDate',
      moment(selectedDateVal).format('dddd[,] MMM Do'),
    );
    setSelectedDate(moment(selectedDateVal).format('dddd[,] MMM Do'));
  };

  useFocusEffect(
    React.useCallback(() => {
      setPressedValue('All');
      setCurrentTab(DATA);
    }, []),
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.upperContainer}>
          <View>
            <Text style={styles.upperText}>
              {selectedDate ? selectedDate : ''}
            </Text>
          </View>

          <CalendarStrip
            scrollable
            // minDate={new Date()}
            // selectedDate={
            //   selectedDate ? moment(selectedDate).format('dddd') : new Date()
            // }
            scrollToOnSetSelectedDate={true}
            style={styles.calendarStripStyle}
            onDateSelected={handleOnDateSelected}
            calendarColor={COLORS.mainBg}
            calendarHeaderStyle={styles.calendarHeaderStyle}
            dateNumberStyle={styles.dateNumberStyle}
            dateNameStyle={styles.dateNameStyle}
            highlightDateNameStyle={styles.highlightDateNameStyle}
            highlightDateNumberStyle={styles.highlightDateNumberStyle}
            calendarAnimation={{type: 'sequence', duration: 5}}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomUpContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handlePressedValue('All');
            }}
            style={
              pressedValue == 'All'
                ? styles.TouchViewStyle
                : styles.offTouchViewStyle
            }>
            <Text
              style={
                pressedValue == 'All'
                  ? styles.bottomUpTxt
                  : styles.offBottomUpTxt
              }>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handlePressedValue('Ongoing');
            }}
            style={
              pressedValue == 'Ongoing'
                ? styles.TouchViewStyle
                : styles.offTouchViewStyle
            }>
            <Text
              style={
                pressedValue == 'Ongoing'
                  ? styles.bottomUpTxt
                  : styles.offBottomUpTxt
              }>
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handlePressedValue('Completed');
            }}
            style={
              pressedValue == 'Completed'
                ? styles.TouchViewStyle
                : styles.offTouchViewStyle
            }>
            <Text
              style={
                pressedValue == 'Completed'
                  ? styles.bottomUpTxt
                  : styles.offBottomUpTxt
              }>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        <ScheduleVerticalList category={currentTab} />
      </View>
    </View>
  );
};

export default Schedule;
