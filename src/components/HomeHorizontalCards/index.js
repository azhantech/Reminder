import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import React, {useEffect, useState} from 'react';
import styles from './style';
import {COLORS, icons} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HomeHorizontalCards = props => {
  const {handleSelectedTask} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const reduxDefaultData = useSelector(state => state.task.totalData);

  useEffect(() => {
    setData(reduxDefaultData);
  }, [reduxDefaultData]);

  const renderItem = ({item}) => {
    let counter = 0;

    if (item.name != 'Nothing to show yet') {
      item?.task?.map((data, ind) => {
        if (data.completed) {
          counter = counter + 1;
        }
      });

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleSelectedTask(item);
            navigation.navigate('CategoryDetail', {
              data: item,
              progress:
                counter != 0 && item.task.length != 0
                  ? (counter / item.task.length) * 100
                  : 0,
            });
          }}
          style={[
            styles.mainContainer,
            {
              backgroundColor: item.color,
              shadowColor: item.color,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 0.1,
            },
          ]}>
          <View style={styles.upperContainer}>
            <Text style={styles.upContText}>{item.name}</Text>
            <View style={styles.upContInnerView}>
              <Image
                style={([styles.upContOneImg], {tintColor: COLORS.mainBg})}
                source={icons.clock}
              />
              <Text style={styles.upContOneText}>
                {counter != 0 && item.task.length != 0
                  ? Math.floor((counter / item.task.length) * 100)
                  : 0}
                %
              </Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <ProgressBar
              animated={true}
              width={250}
              height={8}
              indeterminate={item.color != COLORS.mainFg ? false : true}
              animationType="spring"
              color="#FFFFFF"
              borderWidth={0.5}
              borderColor={item.color}
              progress={
                counter != 0 && item.task.length != 0
                  ? Number(counter / item.task.length)
                  : Number(0)
              }
              unfilledColor={COLORS.transparentWhite}
            />

            <View style={styles.bottomBelowContainer}>
              <Text style={styles.progressText}>{item.date}</Text>
              <Text style={styles.progressText}>
                {counter != 0 && item.task.length != 0
                  ? Math.floor((counter / item.task.length) * 100)
                  : 0}
                %
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: item.color,
              shadowColor: item.color,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 1,
            },
          ]}>
          <View style={styles.upperContainer}>
            <Text style={styles.upContText}>{item.name}</Text>
            <View style={styles.upContInnerView}>
              <Image
                style={([styles.upContOneImg], {tintColor: COLORS.mainBg})}
                source={icons.clock}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <ProgressBar
              animated={true}
              width={250}
              height={8}
              // indeterminate={item.color != COLORS.mainFg ? false : true}
              animationType="spring"
              color="#FFFFFF"
              borderWidth={0.5}
              borderColor={item.color}
              progress={Number(item.progress / 100)}
              unfilledColor={COLORS.transparentWhite}
            />

            <View style={styles.bottomBelowContainer}></View>
          </View>
        </View>
      );
    }
  };

  return (
    <>
      <FlatList
        data={
          data?.length > 0
            ? data
            : [
                {
                  index: Math.floor(Math.random()),
                  name: 'Nothing to show yet',
                  progress: 100,
                  desc: '',

                  color: COLORS.mainFg,
                },
              ]
        }
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default HomeHorizontalCards;
