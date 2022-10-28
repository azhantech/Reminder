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
import {useSelector} from 'react-redux';
import moment from 'moment';

import ScheduleVerticalList from '../../components/ScheduleVerticalList';
import styles from './styles';
import {COLORS} from '../../constants';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Schedule = () => {
  const DATA = useSelector(state => state.task.totalData);

  const [selectedDate, setSelectedDate] = useState();
  const [pressedValue, setPressedValue] = useState();
  const [allData, setAllData] = useState();
  const [ongoingData, setOngoingData] = useState();
  const [completedData, setCompletedData] = useState();

  console.log('selectedDate ==> ', selectedDate);

  const handleOnDateSelected = selectedDateVal => {
    setSelectedDate(moment(selectedDateVal).format('dddd[,] MMM Do'));

    const date = moment(selectedDateVal, 'dddd, MMM Do').format('LL');

    console.log('date ===>', date);

    const dataMain = DATA && DATA.filter(item => item.date == date);

    console.log('dataMain ===>', JSON.stringify(dataMain));

    const onData =
      dataMain && dataMain.filter(item => item.progress == 'Ongoing');

    const compData =
      dataMain && dataMain.filter(item => item.progress == 'Completed');

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setOngoingData(onData);
    console.log('onData', JSON.stringify(onData));

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCompletedData(compData);
    console.log('compData', JSON.stringify(compData));

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setAllData(dataMain);
    console.log('alData', JSON.stringify(allData));

    console.log('Pressed value', pressedValue);
  };

  useFocusEffect(
    React.useCallback(() => {
      setPressedValue('All');
      let currentDate = new Date();
      currentDate = moment(currentDate, 'dddd, MMM Do');
      handleOnDateSelected(currentDate);
    }, [DATA]),
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
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

              setPressedValue('All');
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
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

              setPressedValue('Ongoing');
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
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

              setPressedValue('Completed');
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
        <ScheduleVerticalList
          category={
            (pressedValue == 'All' && allData) ||
            (pressedValue == 'Ongoing' && ongoingData) ||
            (pressedValue == 'Completed' && completedData)
          }
        />
      </View>
    </View>
  );
};

export default Schedule;

// console.log('seletecDate', selectedDate);
// const date = moment(selectedDate, 'dddd, MMM Do').format('LL');
// console.log('date', date);
// switch (value) {
//   case 'Ongoing':
//     if (selectedDate === undefined) {
//       const dat = DATA && DATA.filter(item => item.progress == 'Ongoing');
//       console.log('item.progress', item.progress);
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//       setCurrentTab(dat);
//     } else {
//       // const dat =
//       // defaultData &&
//       // defaultData.filter(
//       //   item => item.progress == 'Ongoing' && item.date == date ,
//       // );
//       defaultData.map((item, index) => {
//         console.log('item.progress', item.progress);
//         console.log('item.date', item.date);
//         if (item.progress == 'Ongoing' && item.date == date) {
//           console.log('ITEM', item);
//         }
//       });
//       // console.log('dat', dat);
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//       // setCurrentTab(dat);
//     }
//     break;
//   case 'Completed':
//     if (selectedDate == 'undefined') {
//       const val = DATA && DATA.filter(item => item.progress == 'Completed');
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//       setCurrentTab(val);
//     } else {
//       const val =
//         defaultData &&
//         defaultData.filter(
//           item => item.progress == 'Completed' && item.date == date,
//         );
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//       setCurrentTab(val);
//     }
//     break;
//   case 'All':
//     if (selectedDate == 'undefined') {
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//       setCurrentTab(DATA);
//     } else {
//       const valv =
//         defaultData && defaultData.filter(item => item.date == date);
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//       setCurrentTab(valv);
//     }
//     break;
//   default:
//     console.log(`Sorry, we are out.`);
// }
