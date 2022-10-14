import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';

const ScheduleDataCards = props => {
  console.log(props);
  const {title, imgSrc, progress} = props;

  return (
    <View style={[styles.mainCont, {backgroundColor: progress.color}]}>
      <View style={styles.upperCont}>
        <Image source={imgSrc} style={styles.imgStyle} />
        <Text style={styles.progTxt}>{progress.progress}%</Text>
      </View>
      <View style={styles.lowerCont}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
    </View>
  );
};

export default ScheduleDataCards;
