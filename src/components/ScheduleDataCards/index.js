import {View, Text, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './style';
import {COLORS} from '../../constants';

const ScheduleDataCards = props => {
  console.log('props', props);
  if (props.title != '') {
    return (
      <View style={[styles.mainCont, {backgroundColor: props.progress.color}]}>
        <View style={styles.upperCont}>
          <Image source={props.imgSrc} style={styles.imgStyle} />
          <Text style={styles.progTxt}>{props.progress?.progress}%</Text>
        </View>
        <View style={styles.lowerCont}>
          <Text style={styles.titleTxt}>{props.title}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.mainCont, {backgroundColor: COLORS.black}]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default ScheduleDataCards;
