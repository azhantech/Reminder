import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../constants';
import styles from './styles';

const BackButon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[
        styles.mainView,
        {
          justifyContent: 'center',
          alignItems: 'center',
          height: 38,
          width: 38,
          marginTop: 15,
        },
      ]}>
      <Image source={icons.back} style={styles.backBtnImg} />
    </TouchableOpacity>
  );
};

export default BackButon;
