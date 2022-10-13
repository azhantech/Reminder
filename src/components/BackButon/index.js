import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../constants';
import styles from './styles';

const BackButon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.mainView}>
      <Image source={icons.back} style={styles.backBtnImg} />
    </TouchableOpacity>
  );
};

export default BackButon;
