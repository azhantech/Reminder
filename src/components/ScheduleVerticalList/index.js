import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';

import React from 'react';
import styles from './style';
import {COLORS, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ScheduleVerticalList = props => {
  const {category} = props;
  console.log('CATEGORY => ', category);
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    let counter = 0;

    if (item.task.length != 0) {
      item?.task?.map((data, ind) => {
        if (data.completed) {
          counter = counter + 1;
        }
      });
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('CategoryDetail', {
              data: item,
              progress:
                counter != 0 && item.task.length != 0
                  ? (counter / item.task.length) * 100
                  : 0,
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
                    progress={
                      counter != 0 && item.task.length != 0
                        ? Number(counter / item.task.length)
                        : Number(0)
                    }
                    formatText={() => {
                      const valCount =
                        counter != 0 && item.task.length != 0
                          ? Math.floor((counter / item.task.length) * 100)
                          : 0;
                      return valCount + '%';
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
                  <Text style={styles.extraTxt}>{item?.date}</Text>
                </View>
                <View style={styles.checkMain}>
                  <Image source={icons.checkbox} style={styles.calendarStyle} />

                  <Text style={styles.extraTxt}>
                    {counter}/{item.task.length}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View activeOpacity={0.7} style={styles.listCont}>
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
                <View style={styles.circleStyle}></View>
              </View>
              <View></View>
            </View>

            <View>
              <View style={styles.calendarMain}>
                <View style={styles.calendarIconView}>
                  <Text style={styles.extraTxt}>Add tasks please!</Text>
                </View>
                <View style={styles.checkMain}>
                  <Text style={styles.extraTxt}></Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.mainCont2}>
        <Text style={styles.emptyText}>Nothing to show</Text>
      </View>
    );
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
                  desc: '',
                  index: Math.floor(Math.random()),
                  name: 'Nothing to show',
                  progress: '0ngoing',
                  task: [],
                },
              ]
        }
        bounces={true}
        horizontal={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{
          paddingBottom: 550,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ScheduleVerticalList;
