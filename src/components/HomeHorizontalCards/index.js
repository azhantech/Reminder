import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import React from 'react';
import styles from './style';
import {COLORS, icons} from '../../constants';

const DATA = [
  {
    name: 'Dashboard Design',
    progress: '59',
    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  },
  {
    name: 'Dashboard Design',
    progress: '70',
    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  },
  {
    name: 'Dashboard Design',
    progress: '54',
    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  },
  {
    name: 'Dashboard Design',
    progress: '20',
    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  },
  {
    name: 'Dashboard Design',
    progress: '54',
    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  },
  {
    name: 'Dashboard Design',
    progress: '20',
    color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  },
];

const HomeHorizontalCards = props => {
  // data would come through props

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={[styles.mainContainer, {backgroundColor: item.color}]}>
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default HomeHorizontalCards;
