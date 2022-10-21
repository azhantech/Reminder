import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import React from 'react';
import styles from './style';
import {COLORS, icons} from '../../constants';

const HomeHorizontalCards = props => {
  const {DATA, handleSelectedTask} = props;

  console.log('DATA', DATA);
  const renderItem = ({item}) => {
    if (item.name != 'Nothing to show yet 🎖️') {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleSelectedTask(item);
          }}
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
              <Text style={styles.upContOneText}>{item.progress}%</Text>
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
              progress={Number(item.progress / 100)}
              unfilledColor={COLORS.transparentWhite}
            />

            <View style={styles.bottomBelowContainer}>
              <Text style={styles.progressText}>progress</Text>
              <Text style={styles.progressText}>{item.progress}%</Text>
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
              indeterminate={item.color != COLORS.mainFg ? false : true}
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
          DATA.length > 0
            ? DATA
            : [
                {
                  index: Math.floor(Math.random()),
                  name: 'Nothing to show yet 🎖️',
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
