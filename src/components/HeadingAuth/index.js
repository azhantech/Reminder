import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
const HeadingAuth = ({type}) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{type}</Text>
    </View>
  );
};

export default HeadingAuth;
