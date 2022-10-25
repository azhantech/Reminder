import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';

import React from 'react';
import styles from './style';
import {COLORS, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ScheduleVerticalList = props => {
  const {category} = props;

  const navigation = useNavigation();
  console.log('dihatsu', category);

  const renderItem = ({item}) => {
    console.log('item', item);
    if (item.name != 'Nothing to show' && item.task.length != 0) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('CategoryDetail', {
              data: item,
            });
          }}
          style={styles.listCont}>
          <View
            style={[
              styles.absoluteView,
              {
                backgroundColor: item.color,
              },
            ]}></View>
          <View style={styles.subView}>
            <View>
              <View style={styles.progressStyle}>
                <View>
                  <Text style={styles.nameStyle}>{item.name}</Text>
                  <Text style={styles.descStyle}>{item.desc}</Text>
                </View>
                <View style={styles.circleStyle}>
                  <ProgressCircle
                    size={60}
                    color="white"
                    showsText={true}
                    animated={true}
                    thickness={5}
                    strokeCap="round"
                    progress={Number(item.progress / 100)}
                    formatText={() => {
                      return item.progress + '%';
                    }}
                    textStyle={styles.progressTxt}
                    borderWidth={0.4}
                  />
                </View>
              </View>
              <View></View>
            </View>

            <View>
              <View style={styles.calendarMain}>
                <View style={styles.calendarIconView}>
                  <Image source={icons.calendar} style={styles.calendarStyle} />
                  {/* <Text style={styles.extraTxt}>{item.tasks[0].date}</Text> */}
                </View>
                <View style={styles.checkMain}>
                  <Image source={icons.checkbox} style={styles.calendarStyle} />

                  <Text style={styles.extraTxt}>
                    {Math.floor(item.task.length * (item.progress / 100))}/
                    {item.task.length}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7} style={styles.listCont}>
          <View
            style={[
              styles.absoluteView,
              {
                backgroundColor: item.color,
              },
            ]}></View>
          <View style={styles.subView}>
            <View>
              <View style={styles.progressStyle}>
                <View>
                  <Text style={styles.nameStyle}>{item.name}</Text>
                  <Text style={styles.descStyle}>{item.desc}</Text>
                </View>
                <View style={styles.circleStyle}>
                  <ProgressCircle
                    size={60}
                    color="white"
                    showsText={true}
                    animated={true}
                    thickness={5}
                    strokeCap="round"
                    progress={Number(item.progress / 100)}
                    formatText={() => {
                      return item.progress + '%';
                    }}
                    textStyle={styles.progressTxt}
                    borderWidth={0.4}
                  />
                </View>
              </View>
              <View></View>
            </View>

            <View>
              <View style={styles.calendarMain}>
                <View style={styles.calendarIconView}>
                  <Image source={icons.calendar} style={styles.calendarStyle} />
                  <Text style={styles.extraTxt}></Text>
                </View>
                <View style={styles.checkMain}>
                  <Image source={icons.checkbox} style={styles.calendarStyle} />

                  <Text style={styles.extraTxt}></Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.mainCont}>
      <FlatList
        data={
          category
            ? category
            : [
                {
                  color: COLORS.mainFg,
                  desc: 'Add Categories to get started !',
                  index: Math.floor(Math.random()),
                  name: 'Nothing to show',
                  progress: '0',
                  tasks: [],
                },
              ]
        }
        bounces={true}
        horizontal={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 550,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ScheduleVerticalList;
