import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

export const CustomTabBarButton = ({children, onPress}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.touchStyle}
        onPress={onPress}>
        <View style={styles.containerStyle}>{children}</View>
      </TouchableOpacity>
    </>
  );
};
